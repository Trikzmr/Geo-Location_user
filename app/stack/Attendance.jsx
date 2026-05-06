import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MarkAttendance() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const cameraRef = useRef(null);
  const router = useRouter();

  // ✅ Define your backend base URL here
  const baseurl = "https://geoserver-ph8p.onrender.com";

  // 📍 Handle marking attendance (location + DB update)
  const handleCheckIn = async () => {
    console.log("Starting check-in process...");
    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem("userData");
      const user = JSON.parse(userData);
      const userName = user.userName;

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") throw new Error("Location permission denied");

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const locationData = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const locationName = locationData[0]?.name || "Unknown";

      const now = new Date();
      const date = now.toISOString().split("T")[0];
      const time = now.toTimeString().split(" ")[0];
      const month = now.toLocaleString("default", { month: "long" });
      const year = now.getFullYear().toString();

      const body = {
        userName,
        date,
        time,
        locationLogs: [{ latitude, longitude }],
        locationName,
        month,
        year,
      };
      console.log("Check-in data:", body);
      const response = await fetch(
        `https://geoserver-ph8p.onrender.com/api/markAttendance`,
        {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      console.log("Check-in request sent");
      const result = await response.json();
      console.log(result);
      console.log("Check-in response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Check-in failed");
      }

      alert("Check-in successful");
      return true;
    } catch (err) {
      alert(err.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission denied.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true);
      const photoData = await cameraRef.current.takePictureAsync({
        base64: true,
      });
      setPhoto(photoData.uri);
      setLoading(false);
    }
  };

  const markAttendance = async () => {
    if (!photo) return;
    setMarking(true);

    const formData = new FormData();
    formData.append("File", {
      uri: photo.startsWith("file://") ? photo : `file://${photo}`,
      type: "image/jpeg",
      name: "attendance.jpg",
    });

    try {
      // const res = await fetch(`${baseurl}/api/checkuser`, {
      //   method: 'POST',
      //   body: formData,
      //   credentials: 'include',
      // });

      // const data = await res.json();

      const success = await handleCheckIn();
      console.log("Check-in result:", success);
      if (success) {
        Alert.alert("✅ Success", "Attendance marked successfully!");
        router.replace("/(tabs)");
      } else {
        Alert.alert(
          "❌Location Error",
        );
      }

      // if (res.ok) {
      //   if (data?.flaskResult?.match === true) {
      //     const success = await handleCheckIn();
      //     if (success) {
      //       Alert.alert('✅ Success', 'Attendance marked successfully!');
      //       router.replace('/(tabs)');
      //     }
      //   } else {
      //     Alert.alert('❌ Face Mismatch', 'Face not recognized. Please try again.');
      //   }
      // } else {
      //   Alert.alert('❌ Error', data?.message || 'Failed to mark attendance.');
      // }
    } catch (err) {
      console.error("Upload failed:", err);
      Alert.alert("❌ Network Error", "Unable to connect to the server.");
    } finally {
      setMarking(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {!photo ? (
        <>
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing="front"
            autofocus="on"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.captureButton}
            >
              {loading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : (
                <Text style={styles.captureText}>📸</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.previewImage} />

          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => setPhoto(null)}
              style={[styles.button, { backgroundColor: "#555" }]}
              disabled={marking}
            >
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={markAttendance}
              style={styles.button}
              disabled={marking}
            >
              {marking ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Mark Attendance</Text>
              )}
            </TouchableOpacity>
          </View>

          {marking && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  captureText: { fontSize: 30 },
  previewContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "90%",
    height: "70%",
    borderRadius: 12,
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 25,
    gap: 15,
  },
  button: {
    backgroundColor: "#FF6B00",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
