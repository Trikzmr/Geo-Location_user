import * as Location from 'expo-location';
import { baseurl } from '../config/path'; 

export const startLiveTracking = async (userName) => {
  try {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear().toString();

    const body = {
      userName,
      month,
      year,
      date,
    };

    // Step 1: Check if user is checked-in
    const response = await fetch(`${baseurl}/api/getAttendanceByUsernameWithDayMonthAndYear`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Attendance not found');

    const status = result.status;
    const lastStatus = status[status.length - 1];

    if (lastStatus !== 'check-in') {
      console.log('User is not checked in. Tracking will not start.');
      return;
    }

    // Step 2: Ask for location permission
    const { status: permission } = await Location.requestForegroundPermissionsAsync();
    if (permission !== 'granted') throw new Error('Location permission denied');

    console.log('📍 Starting live location tracking');

    // Step 3: Start watching location
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 60000, // every 1 minute
        distanceInterval: 0,
      },
      async (location) => {
        const { latitude, longitude } = location.coords;
        const now = new Date();

        const user = {
          userName,
          date: now.toISOString().split('T')[0],
          time: now.toTimeString().split(' ')[0], // HH:MM:SS
          locationLogs: [{ latitude, longitude }],
        };

        try {
          const res = await fetch('http://localhost:3005/api/liveTracking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
          });

          const liveResult = await res.json();
          if (!res.ok) throw new Error(liveResult.message || 'Tracking failed');

          console.log('✔️ Live location pushed');
        } catch (err) {
          console.error('Live tracking error:', err.message);
        }
      }
    );

    return subscription; // You can stop it later using: subscription.remove()

  } catch (err) {
    console.error('Live tracking setup failed:', err.message);
  }
};
