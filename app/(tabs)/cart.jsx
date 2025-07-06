import { View, Text } from 'react-native';
import LeaveStatsSection from '../components/leave/LeaveStatsSection';
import AllLeaveSection from '../components/leave/AllLeaveSection';

export default function Cart() {
  return (
    <View className="pt-10">
      <LeaveStatsSection/>
      <AllLeaveSection/>
    </View>
  );
}
