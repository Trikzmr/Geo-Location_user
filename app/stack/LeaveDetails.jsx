import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const statusStyles = {
  Approved: { bg: "bg-emerald-100", text: "text-emerald-700" },
  Pending: { bg: "bg-amber-100", text: "text-amber-700" },
  Cancelled: { bg: "bg-red-100", text: "text-red-700" },
  Default: { bg: "bg-slate-100", text: "text-slate-700" },
};

const LeaveDetails = () => {
  const { data } = useLocalSearchParams();
  const user = data ? JSON.parse(data) : {};
  const {
    title,
    leaveType,
    startingDate,
    endingDate,
    message,
    requestedDate,
    number,
    approvalStatus,
  } = user;

  const statusTag = statusStyles[approvalStatus] || statusStyles.Default;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const detailRows = [
    { label: "Leave Type", value: leaveType || "General" },
    {
      label: "Date Range",
      value: `${formatDate(startingDate)} - ${formatDate(endingDate)}`,
    },
    { label: "Applied On", value: formatDate(requestedDate) },
    { label: "Contact", value: number || "Not provided" },
    { label: "Approved By", value: approvalStatus || "Pending" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="px-5 pt-10"
      >
        <View className="bg-white rounded-[40px] p-8 mb-8 shadow-2xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden">
          <View className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-indigo-50" />
          <View className="flex-row items-center justify-between relative z-10">
            <View className="flex-1 pr-4">
              <View className="flex-row items-center gap-2 mb-2">
                <View className="w-8 h-[2px] bg-indigo-500" />
                <Text className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  Request Details
                </Text>
              </View>
              <Text className="text-3xl font-black text-slate-900 tracking-tight">
                Leave Info
              </Text>
              <Text className="mt-3 text-xs leading-5 text-slate-400 font-medium max-w-[200px]">
                Detailed view of your leave application and status.
              </Text>
            </View>
            <View 
              className="px-4 py-2 rounded-2xl border"
              style={{ 
                backgroundColor: `${statusStyles[approvalStatus]?.bg || '#F8FAFC'}`,
                borderColor: `${statusStyles[approvalStatus]?.text + '20' || '#E2E8F0'}`
              }}
            >
              <Text className="text-[10px] font-black uppercase tracking-widest" style={{ color: statusStyles[approvalStatus]?.text || '#64748B' }}>
                {approvalStatus || "Pending"}
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-50 mb-8">
          <View className="flex-row items-center gap-3 mb-8">
            <View className="w-1.5 h-6 rounded-full bg-blue-500" />
            <Text className="text-lg font-black text-slate-900 tracking-tight">Timeline Overview</Text>
          </View>

          <View className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 mb-8">
            <View className="flex-row items-center justify-between mb-6">
              <View>
                <Text className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Departure</Text>
                <Text className="text-sm font-black text-slate-900">{formatDate(startingDate)}</Text>
              </View>
              <View className="flex-1 h-[2px] bg-slate-200 mx-4 relative">
                <View className="absolute inset-0 bg-blue-500" style={{ width: '100%' }} />
                <View className="absolute -top-1.5 left-0 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
                <View className="absolute -top-1.5 right-0 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
              </View>
              <View className="items-end">
                <Text className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Return</Text>
                <Text className="text-sm font-black text-slate-900">{formatDate(endingDate)}</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between px-2">
               <View className="items-center">
                 <View className="w-1 h-3 bg-slate-200 rounded-full mb-1" />
                 <Text className="text-[8px] font-bold text-slate-300 uppercase">First</Text>
               </View>
               <View className="items-center">
                 <View className="w-1 h-3 bg-slate-200 rounded-full mb-1" />
                 <Text className="text-[8px] font-bold text-slate-300 uppercase">Mid</Text>
               </View>
               <View className="items-center">
                 <View className="w-1 h-3 bg-slate-200 rounded-full mb-1" />
                 <Text className="text-[8px] font-bold text-slate-300 uppercase">Last</Text>
               </View>
            </View>
          </View>

          <View className="flex-row flex-wrap gap-4 mb-8">
            <ColorCard
              label="Leave type"
              value={leaveType || "General"}
              color="from-blue-50 to-indigo-50"
              icon="tag"
            />
            <ColorCard
              label="Applied on"
              value={formatDate(requestedDate)}
              color="from-purple-50 to-fuchsia-50"
              icon="clock-o"
            />
            <ColorCard
              label="Contact"
              value={number || "N/A"}
              color="from-emerald-50 to-teal-50"
              icon="phone"
            />
            <ColorCard
              label="Approver"
              value={approvalStatus === 'Approved' ? 'Manager' : 'System'}
              color="from-amber-50 to-orange-50"
              icon="user-circle-o"
            />
          </View>

          <View className="bg-slate-900 rounded-[32px] p-7 shadow-xl shadow-slate-900/10 mb-8">
            <View className="flex-row items-center gap-3 mb-4">
              <FontAwesome name="quote-left" size={14} color="#6366F1" />
              <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee Remark</Text>
            </View>
            <Text className="text-sm leading-6 text-slate-200 font-medium">
              "{message || "No reason specified for this request."}"
            </Text>
          </View>

          <View className="bg-blue-600 rounded-[32px] p-7 flex-row items-center justify-between shadow-2xl shadow-blue-200">
            <View>
              <Text className="text-blue-100 text-[10px] font-black uppercase tracking-widest mb-1">Current Balance</Text>
              <Text className="text-white text-2xl font-black tracking-tight">20 Days Available</Text>
            </View>
            <View className="w-12 h-12 rounded-2xl bg-white/10 items-center justify-center border border-white/20">
               <FontAwesome name="pie-chart" size={20} color="white" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ColorCard = ({ label, value, icon, color }) => (
  <View
    className={`flex-1 min-w-[45%] rounded-[24px] border border-slate-100 bg-gradient-to-br ${color} p-4 shadow-sm shadow-slate-100/30`}
  >
    <View className="flex-row items-center justify-between mb-2">
      <View className="w-6 h-6 rounded-lg bg-white/50 items-center justify-center">
        <FontAwesome name={icon} size={10} color="#475569" />
      </View>
    </View>
    <Text className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
      {label}
    </Text>
    <Text className="mt-1 text-sm font-black text-slate-900 tracking-tight">{value}</Text>
  </View>
);

export default LeaveDetails;
