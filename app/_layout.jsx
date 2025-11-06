import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, Slot } from "expo-router";
import * as SplashScreenExpo from "expo-splash-screen";
import SplashScreen from "./SplashScreen";
import "../global.css";

export default function RootLayout() {
  const [appState, setAppState] = useState({
    loading: true,
    firstLaunch: false,
    loggedIn: false,
    ready: false,
  });

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        await SplashScreenExpo.preventAutoHideAsync();

        const alreadyLaunched = await AsyncStorage.getItem("alreadyLaunched");
        const token = await AsyncStorage.getItem("authToken"); // 👈 use correct key

        if (isMounted) {
          setAppState({
            loading: false,
            firstLaunch: !alreadyLaunched,
            loggedIn: !!token, // 👈 true if token exists
            ready: true,
          });
        }

        // Mark as launched
        if (!alreadyLaunched) await AsyncStorage.setItem("alreadyLaunched", "true");

        // Hide splash after small delay
        setTimeout(async () => {
          await SplashScreenExpo.hideAsync();
        }, 1000);
      } catch (err) {
        console.warn("Init error:", err);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const { loading, ready, firstLaunch, loggedIn } = appState;

  if (loading || !ready) return <SplashScreen />;

  // 🧭 Navigation Logic
  
  if (firstLaunch) return <Redirect href="/stack/LoginPage" />;
  //if (5===5) return <Redirect href="stack/LoginPage" />;

  // Logged in — show main app
  return <Slot />;
}
