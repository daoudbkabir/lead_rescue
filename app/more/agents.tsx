import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Avatar, IconButton, SectionHeader, StatusChip, TopBar, money } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";
import { agents } from "@/lib/leadrescue-data";

const COLORS = { ink: "#071A2F", slate: "#617083", cyan: "#12B8D6", green: "#1F9D68", surface: "#FFFFFF", line: "#DCE4EC" };

export default function AgentsScreen() {
  const router = useRouter();
  return <ScreenContainer className="flex-1" edges={["top", "left", "right"]}><FlatList data={agents} keyExtractor={(item) => item.name} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content} ListHeaderComponent={<View><View style={styles.backRow}><IconButton name="arrow-back" label="Go back" onPress={() => router.back()} /><Text style={styles.backLabel}>PEOPLE</Text></View><TopBar title="Recovery agents" subtitle="Equip the people who turn intent into revenue." onNotification={() => Alert.alert("Agent updates", "Nusrat and Mim are available for new tasks.")} /><View style={styles.teamHero}><View><Text style={styles.teamEyebrow}>TEAM RECOVERY VALUE</Text><Text style={styles.teamValue}>৳3,30,400</Text><Text style={styles.teamHelper}>recovered this month</Text></View><View style={styles.teamIcon}><MaterialIcons name="groups" size={25} color={COLORS.cyan} /></View></View><SectionHeader title="Team roster" action="Invite agent" onPress={() => Alert.alert("Invite an agent", "An invitation link can be generated from workspace settings.")} /></View>} renderItem={({ item }) => <AgentCard {...item} onPress={() => Alert.alert(item.name, `${item.queue} active tasks · ${money(item.recovered)} recovered this month.`)} />} /></ScreenContainer>;
}

function AgentCard({ name, initials, status, queue, recovered, response, color, onPress }: { name: string; initials: string; status: string; queue: number; recovered: number; response: string; color: string; onPress: () => void }) { return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.agentCard, pressed && styles.pressed]}><View style={styles.agentTop}><View style={styles.agentIdentity}><Avatar initials={initials} size={45} background={color} /><View><Text style={styles.agentName}>{name}</Text><View style={styles.agentStatus}><StatusChip status={status as "Available" | "On follow-up" | "In training"} /></View></View></View><MaterialIcons name="chevron-right" size={19} color={COLORS.slate} /></View><View style={styles.agentStats}><Stat label="ACTIVE QUEUE" value={`${queue} leads`} /><Stat label="RECOVERED" value={money(recovered)} /><Stat label="AVG. REPLY" value={response} /></View><View style={styles.capacityRow}><Text style={styles.capacityLabel}>Queue capacity</Text><Text style={styles.capacityValue}>{Math.min(100, queue * 3)}%</Text></View><View style={styles.capacityTrack}><View style={[styles.capacityFill, { width: `${Math.min(100, queue * 3)}%`, backgroundColor: queue > 20 ? COLORS.cyan : COLORS.green }]} /></View></Pressable>; }
function Stat({ label, value }: { label: string; value: string }) { return <View style={styles.stat}><Text style={styles.statLabel}>{label}</Text><Text style={styles.statValue}>{value}</Text></View>; }

const styles = StyleSheet.create({
  content: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 35 },
  backRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 13 },
  backLabel: { color: COLORS.slate, fontSize: 10, fontWeight: "900", letterSpacing: 1.2 },
  teamHero: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: COLORS.ink, borderRadius: 19, padding: 17, marginBottom: 23 },
  teamEyebrow: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 1.25 },
  teamValue: { color: "#fff", fontSize: 28, fontWeight: "800", marginTop: 7 },
  teamHelper: { color: "#B9C7D4", fontSize: 11, marginTop: 3 },
  teamIcon: { width: 52, height: 52, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "#193752" },
  agentCard: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 18, padding: 15, marginBottom: 10 },
  agentTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  agentIdentity: { flexDirection: "row", alignItems: "center", gap: 10 },
  agentName: { color: COLORS.ink, fontSize: 14, fontWeight: "800" },
  agentStatus: { alignSelf: "flex-start", marginTop: 5 },
  agentStats: { flexDirection: "row", gap: 10, borderTopWidth: 1, borderTopColor: "#EEF2F6", marginTop: 14, paddingTop: 13 },
  stat: { flex: 1 },
  statLabel: { color: COLORS.slate, fontSize: 8, fontWeight: "800", letterSpacing: 0.6 },
  statValue: { color: COLORS.ink, fontSize: 12, fontWeight: "800", marginTop: 4 },
  capacityRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 14 },
  capacityLabel: { color: COLORS.slate, fontSize: 10 },
  capacityValue: { color: COLORS.ink, fontSize: 10, fontWeight: "800" },
  capacityTrack: { height: 7, borderRadius: 4, backgroundColor: "#EEF2F6", marginTop: 6, overflow: "hidden" },
  capacityFill: { height: 7, borderRadius: 4 },
  pressed: { opacity: 0.74 },
});
