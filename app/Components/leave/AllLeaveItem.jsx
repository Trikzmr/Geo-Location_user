import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const statusStyles = {
  Approved: { bg: "#DCFCE7", text: "#047857" },
  Pending: { bg: "#FEF3C7", text: "#B45309" },
  Cancelled: { bg: "#FEE2E2", text: "#B91C1C" },
  Default: { bg: "#E2E8F0", text: "#334155" },
};

const AllLeaveItem = ({ user }) => {
  const { startingDate, endingDate, approvalStatus, adminName, leaveType } =
    user;
  const router = useRouter();

  const start = new Date(startingDate);
  const end = new Date(endingDate);
  const applyDays = Math.max(
    Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1,
    0,
  );

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const statusColor = statusStyles[approvalStatus] || statusStyles.Default;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/stack/LeaveDetails",
          params: { data: JSON.stringify(user) },
        })
      }
      className="mb-4"
    >
      <View className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-xl shadow-slate-200/40 relative overflow-hidden">
        {/* Status indicator bar */}
        <View 
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{ backgroundColor: statusColor.text }}
        />

        <View className="flex-row items-center justify-between mb-5">
          <View className="flex-row items-center gap-3">
            <View 
              className="w-10 h-10 rounded-2xl items-center justify-center"
              style={{ backgroundColor: `${statusColor.text}10` }}
            >
              <FontAwesome name="calendar-o" size={16} color={statusColor.text} />
            </View>
            <View>
              <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                Leave Schedule
              </Text>
              <Text className="text-base font-black text-slate-900 tracking-tight">
                {applyDays} Day{applyDays > 1 ? 's' : ''} • {leaveType || "General"}
              </Text>
            </View>
          </View>

          <View 
            className="px-3 py-1 rounded-full border"
            style={{ 
              backgroundColor: `${statusColor.text}08`,
              borderColor: `${statusColor.text}20`
            }}
          >
            <Text 
              className="text-[9px] font-black uppercase tracking-widest"
              style={{ color: statusColor.text }}
            >
              {approvalStatus}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between pt-5 border-t border-slate-50">
          <View>
            <Text className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Start Date
            </Text>
            <Text className="text-sm font-black text-slate-700">
              {formatDate(startingDate)}
            </Text>
          </View>

          <View className="items-center px-4">
             <FontAwesome name="long-arrow-right" size={14} color="#CBD5E1" />
          </View>

          <View className="items-end">
            <Text className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              End Date
            </Text>
            <Text className="text-sm font-black text-slate-700">
              {formatDate(endingDate)}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center gap-2">
          <View className="w-5 h-5 rounded-full bg-slate-100 items-center justify-center">
            <FontAwesome name="user-o" size={8} color="#94A3B8" />
          </View>
          <Text className="text-[10px] font-bold text-slate-400 uppercase">
            Approver: <Text className="text-slate-600">{adminName || "System Pending"}</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default AllLeaveItem;
