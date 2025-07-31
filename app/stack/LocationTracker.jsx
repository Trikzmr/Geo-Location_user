import * as Location from 'expo-location';
import { baseurl } from '../config/path';


export const trackcontinousLocation = async (userName) => {
  try {
    const attendanceResult = await markedAttendance(userName);
    if (attendanceResult==0) {
      
      await startLiveTracking(userName);
    }
  } catch (err) {
    console.error("❌ Error in tracking function:", err.message);
  }
};

/**
 * Checks if the user has marked attendance today
 * @param {string} userName 
 * @returns {Array | null} attendance result data
 */
const markedAttendance = async (userName) => {
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

    const response = await fetch(`${baseurl}/api/getAttendanceByUsernameWithDayMonthAndYear`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    console.log(result);

    if (result.locationLogs.length > 0) {
      return 0;
    }

    return 1;
  } catch (error) {
    console.error("❌ Error in markedAttendance:", error.message);
    return 1;
  }
};
const startLiveTracking = async (userName) => {
  try {
    // Request permission
    const { status: permission } = await Location.requestForegroundPermissionsAsync();
    if (permission !== 'granted') {
      throw new Error('Location permission denied');
    }

    console.log('📍 Starting live location tracking...');

    // Get location
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = location.coords;
    const now = new Date();

    // Format user data
    const user = {
      userName,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0], // HH:MM:SS
      locationLogs: [{ latitude, longitude }],
    };

    console.log("🕒 Time:", user.time);

    // Send to server
    const res = await fetch(`${baseurl}/api/liveTracking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const liveResult = await res.json();
    if (!res.ok) throw new Error(liveResult.message || 'Tracking failed');

    console.log('✔️ Live location pushed successfully');
  } catch (err) {
    console.error('❌ Live tracking error:', err.message);
  }
};
