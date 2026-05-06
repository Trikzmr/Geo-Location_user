import { ScrollView, Text } from 'react-native';
import LeaveStatsSection from '../Components/leave/LeaveStatsSection';
import AllLeaveSection from '../Components/leave/AllLeaveSection';


export default function leave() {
  return (
    <ScrollView >
      <LeaveStatsSection className="rounded-b-7xl"/>
      <AllLeaveSection/>
    </ScrollView>
  );
}
