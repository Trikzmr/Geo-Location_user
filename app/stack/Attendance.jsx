import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function MarkAttendance() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
      const photoData = await cameraRef.current.takePictureAsync({ base64: true });
      setPhoto(photoData.uri);
      setLoading(false);

      // Upload to backend (example)
      const formData = new FormData();
      formData.append('photo', {
        uri: photoData.uri,
        type: 'image/jpeg',
        name: 'attendance.jpg',
      });

      try {
        const res = await fetch('https://your-backend-url.com/api/attendance', {
          method: 'POST',
          body: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Upload success:', await res.json());
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {!photo ? (
        <>
          <CameraView
            ref={cameraRef}
            style={{ flex: 1, height: '60%' }}
            facing="front"
            autofocus="on"
            enableTorch={false}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
              <Text style={styles.captureText}>{loading ? '⏳' : '📸'}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.previewImage} />
          <TouchableOpacity onPress={() => setPhoto(null)} style={styles.button}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureText: {
    fontSize: 30,
  },
  previewContainer: {
    flex: 1,
    height: '40%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '90%',
    height: '70%',
    borderRadius: 12,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF6B00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
