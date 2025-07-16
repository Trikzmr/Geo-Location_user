import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseurl from '../config/path';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });


 const handleSubmit = async () => {
  if (!user.email || !user.password) {
    Alert.alert('Validation', 'Please fill in both email and password.');
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3005/api/login",
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      }
    );

    const data = await response.json();

    if (response.ok && data.token) {
  await AsyncStorage.setItem('authToken', data.token);
  await AsyncStorage.setItem('userData', JSON.stringify(data.user));

  Alert.alert('Login', 'Login Successful');
  console.log('User:', data.user, data.token);

  // Navigate if needed
  // router.replace('/home') or use navigation.navigate('Home')
} else {
      Alert.alert('Login failed', data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('API call failed:', error.message);
    Alert.alert('Network Error', 'Could not connect to server.');
  }
};


  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 bg-white px-6 justify-center py-12">
          {/* Logo */}
          <View className="items-center mb-8">
            <Image
              source={require('../../assets/images/favicon.png')}
              className="w-16 h-16"
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <Text className="text-2xl font-bold text-center text-black mb-1">
            Welcome Back 👋
          </Text>
          <Text className="text-xl font-semibold text-center text-blue-600 mb-1">
            Geo-Location based Attendee
          </Text>
          <Text className="text-center text-gray-500 mb-6">
            Hello there, login to continue
          </Text>

          {/* Email */}
          <Text className="text-xl text-blue-500 mb-1">Email Address</Text>
          <View className="flex-row items-center border border-blue-500 rounded-xl px-4 py-3 mb-4">
            <TextInput
              placeholder="AmanSingh@8292gmail.com"
              value={user.email}
              onChangeText={(text) =>
                setUser((prev) => ({ ...prev, email: text }))
              }
              className="flex-1 text-sm"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <Text className="text-xl text-blue-500 mb-1">Password</Text>
          <View className="flex-row items-center border border-blue-500 rounded-xl px-4 py-3 mb-2">
            <TextInput
              placeholder="********"
              value={user.password}
              onChangeText={(text) =>
                setUser((prev) => ({ ...prev, password: text }))
              }
              secureTextEntry={!showPassword}
              className="flex-1 text-sm"
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className="mb-6">
            <Text className="text-right text-sm text-blue-500">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-600 py-3 rounded-xl mb-6 items-center"
          >
            <Text className="text-white text-base font-semibold">Login</Text>
          </TouchableOpacity>

          {/* Divider */}
          <Text className="text-center text-gray-400 mb-4">
            Or continue with social account
          </Text>

          {/* Google Login */}
          <TouchableOpacity className="flex-row border border-gray-300 rounded-xl py-3 justify-center items-center">
            <Icon name="google" size={20} color="#EA4335" />
            <Text className="ml-2 text-black text-base font-semibold">
              Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
