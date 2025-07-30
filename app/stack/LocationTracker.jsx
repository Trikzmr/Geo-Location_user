import * as Location from 'expo-location';

export const startLiveTracking = async (userName) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') throw new Error('Location permission denied');

    console.log('📍 Starting live location tracking');

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 60000, // 1 minute
        distanceInterval: 0, // report even if not moved
      },
      async (location) => {
        const { latitude, longitude } = location.coords;
        const now = new Date().toISOString();

        const body = {
          userName,
          date: now.split('T')[0],
          time: now.split(' ')[0],
          locationLogs: [{ latitude, longitude }],
        };
        console.log(body.date);
        console.log(body.userName);
        console.log(body.time);
        console.log(body.locationLogs);
        try {
          const response = await fetch('http://localhost:3005/api/liveTracking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });

          const result = await response.json();
          if (!response.ok) throw new Error(result.message || 'Tracking failed');
          console.log('✔️ Live location pushed');
        } catch (err) {
          console.error('Live tracking error:', err.message);
        }
      }
    );

    return subscription; // so you can stop later: subscription.remove()
  } catch (err) {
    console.error('Live tracking setup failed:', err.message);
  }
};
