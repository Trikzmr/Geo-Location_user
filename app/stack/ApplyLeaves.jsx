import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ApplyLeavs = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    userId: '',
    userName: '',
    title: '',
    leaveType: '',
    startingDate: '',
    endingDate: '',
    message: '',
    number: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const reasonString = await AsyncStorage.getItem('userData');
      if (reasonString) {
        const reason = JSON.parse(reasonString);
        setUser(prev => ({
          ...prev,
          userId: reason.id,
          userName: reason.userName,
        }));
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://geo-location-based-attendence-tracking.onrender.com/api/addLeaveRequest', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Leave request submitted');
        Alert.alert('Success', 'Leave request submitted successfully');
      } else {
        Alert.alert('Failed', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('API call failed:', error.message);
      Alert.alert('Network Error', 'Could not connect to server.');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}>
        {/* Back Arrow */}
        <View className="relative items-center mb-6">
          <Pressable
            className="absolute left-0"
            onPress={() => router.replace('/(tabs)/leave')}
          >
            <Icon name="arrow-left" size={26} color="#000" />
          </Pressable>
          <Text className="text-2xl font-bold text-black">Apply Leave</Text>
        </View>
        
        {/* Title */}
        <Text className="text-base text-blue-500 mb-1">Title</Text>
        <TextInput
           value={user.title}
           onChangeText={(text) => setUser({ ...user, title: text })}
          className="border border-blue-300 rounded-xl px-4 py-3 mb-4 text-lg text-black"
        />

        {/* Leave Type */}
         <Text className="text-base text-blue-500 mb-1">Leave Type</Text>
        <TextInput
           value={user.leaveType}
           onChangeText={(text) => setUser({ ...user, leaveType: text })}
          className="border border-blue-300 rounded-xl px-4 py-3 mb-4 text-lg text-black"
        />

        {/* Contact Number */}
        <Text className="text-base text-blue-500 mb-1">Contact Number</Text>
        <TextInput
          keyboardType="phone-pad"
          value={user.number}
           onChangeText={(text) => setUser({ ...user, number: text })}
          className="border border-blue-300 rounded-xl px-4 py-3 mb-4 text-lg text-black"
        />

        {/* Start Date */}
        <Text className="text-base text-blue-500 mb-1">Start Date</Text>
        <View className="border border-blue-300 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center">
          <TextInput 
          placeholder='April 18, 2023'
          value={user.startingDate}
           onChangeText={(text) => setUser({ ...user, startingDate: text })}
          className="text-lg text-black"/>
          <Icon name="calendar" size={20} color="#4B5563" />
        </View>

        {/* End Date */}
        <Text className="text-base text-blue-500 mb-1">End Date</Text>
        <View className="border border-blue-300 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center">
           <TextInput 
          placeholder='April 18, 2023'
          value={user.endingDate}
           onChangeText={(text) => setUser({ ...user, endingDate: text })}
          className="text-lg text-black"/>
          <Icon name="calendar" size={20} color="#4B5563" />
        </View>

        {/* Reason for Leave */}
        <Text className="text-base text-blue-500 mb-1">Reason for Leave</Text>
        <TextInput
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={user.message}
           onChangeText={(text) => setUser({ ...user, message: text })}
          
          className="border border-blue-300 rounded-xl px-4 py-3 mb-6 text-lg text-black"
        />

        {/* Submit Button */}
        <TouchableOpacity className="bg-blue-600 rounded-xl py-4 items-center" onPress={handleSubmit}>
          <Text className="text-white text-lg font-semibold">Apply Leave</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ApplyLeavs;
