import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AssignSheet, Avatar, IconButton, IntentPill, StatusChip, money } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";
import { leads, Lead } from "@/lib/leadrescue-data";

const COLORS = { ink: "#071A2F", slate: "#617083", cyan: "#12B8D6", green: "#1F9D68", amber: "#D68A18", red: "#CF4C4C", surface: "#FFFFFF", line: "#DCE4EC", canvas: "#F6F8FB" };

export default function LeadDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const sourceLead = useMemo(() => leads.find((item) => item.id === id) ?? leads[0], [id]);
  const [lead, setLead] = useState<Lead>(sourceLead);
  const [assignVisible, setAssignVisible] = useState(false);

  const markRecovered = () => {
    setLead((current) => ({ ...current, status: "Recovered", lastActivity: "Just now", lastMessage: "Recovery recorded by Rahim." }));
    Alert.alert("Recovery recorded", `${lead.name} is now counted in recovered revenue.`);
  };

  return (
    <ScreenContainer className="flex-1" edges={["top", "left", "right", "bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.navRow}><IconButton name="arrow-back" label="Go back" onPress={() => router.back()} /><View style={styles.navActions}><IconButton name="more-horiz" label="More actions" onPress={() => Alert.alert("Lead actions", "Export, mute, or mark this lead as lost.")} /></View></View>
        <View style={styles.profileHeader}><Avatar initials={lead.initials} size={64} background={lead.status === "Recovered" ? "#D6F7E8" : "#DCEBFF"} /><View style={styles.profileCopy}><Text style={styles.profileName}>{lead.name}</Text><Text style={styles.profileContact}>{lead.phone}</Text><Text style={styles.profileContact}>{lead.email}</Text></View><StatusChip status={lead.status} /></View>
        <View style={styles.productCard}><View style={styles.productTop}><View><Text style={styles.cardEyebrow}>RECOVERY OPPORTUNITY</Text><Text style={styles.productName}>{lead.product}</Text></View><Text style={styles.productValue}>{money(lead.potentialRevenue)}</Text></View><View style={styles.productMeta}><Text style={styles.productMetaText}>{lead.source} source</Text><Text style={styles.productMetaText}>Last contact {lead.lastActivity}</Text><Text style={styles.productMetaText}>Agent: {lead.agent}</Text></View></View>
        <View style={styles.actionGrid}><ActionButton icon="chat-bubble-outline" label="Message" onPress={() => Alert.alert("Message ready", "The conversation composer is ready with an AI-suggested opener.")} /><ActionButton icon="phone" label="Call" onPress={() => Alert.alert("Call", `Calling ${lead.name} at ${lead.phone}.`)} /><ActionButton icon="person-add-alt-1" label="Assign" onPress={() => setAssignVisible(true)} /><ActionButton icon="auto-awesome" label="AI plan" onPress={() => Alert.alert("Suggested plan", "Send a product-specific message now, then follow up again in 6 hours if there is no reply.")} /></View>

        <View style={styles.scoreCard}><View style={styles.scoreHeader}><View><Text style={styles.cardEyebrow}>AI INTENT SCORE</Text><Text style={styles.scoreTitle}>{lead.intentScore} / 100</Text></View><IntentPill score={lead.intentScore} intent={lead.intent} /></View><View style={styles.scoreTrack}><View style={[styles.scoreFill, { width: `${lead.intentScore}%` }]} /></View><Text style={styles.scoreExplanation}>Very high intent because the lead asked about availability, returned to the product page, and has potential value above this segment’s average.</Text><View style={styles.signalRow}><Signal icon="visibility" label="Viewed 4 times" /><Signal icon="schedule" label="18h since reply" /><Signal icon="shopping-bag" label="Price shared" /></View></View>

        <View style={styles.section}><View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Recovery timeline</Text><Text style={styles.sectionMeta}>4 signals</Text></View><TimelineItem time="Today · 09:42" title="AI flagged the lead as at risk" body="No follow-up was detected for more than 18 hours." icon="auto-awesome" accent={COLORS.cyan} /><TimelineItem time="Yesterday · 15:18" title="Lead asked about availability" body={lead.lastMessage} icon="chat-bubble-outline" accent={COLORS.green} /><TimelineItem time="Yesterday · 14:56" title="Product details shared" body={`Premium ${lead.product} details were sent from ${lead.source}.`} icon="send" accent={COLORS.amber} last /></View>

        <View style={styles.noteCard}><MaterialIcons name="lightbulb-outline" size={19} color={COLORS.amber} /><View style={styles.noteCopy}><Text style={styles.noteTitle}>Best next step</Text><Text style={styles.noteBody}>Lead with a direct answer and a time-bound reason to act. Keep the first message under 3 lines.</Text></View></View>
        <Pressable accessibilityRole="button" onPress={markRecovered} style={({ pressed }) => [styles.recoverButton, pressed && styles.pressed]}><MaterialIcons name="check-circle" size={20} color="#fff" /><Text style={styles.recoverButtonText}>{lead.status === "Recovered" ? "Recovery recorded" : "Mark as recovered"}</Text></Pressable>
      </ScrollView>
      <AssignSheet visible={assignVisible} lead={lead} onClose={() => setAssignVisible(false)} onAssign={(agent) => { setLead((current) => ({ ...current, agent, agentInitials: agent.slice(0, 2).toUpperCase() })); Alert.alert("Task assigned", `${lead.name} is now assigned to ${agent}.`); }} />
    </ScreenContainer>
  );
}

function ActionButton({ icon, label, onPress }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}><View style={styles.actionIcon}><MaterialIcons name={icon} size={19} color={COLORS.cyan} /></View><Text style={styles.actionLabel}>{label}</Text></Pressable>;
}

function Signal({ icon, label }: { icon: keyof typeof MaterialIcons.glyphMap; label: string }) {
  return <View style={styles.signal}><MaterialIcons name={icon} size={14} color={COLORS.slate} /><Text style={styles.signalText}>{label}</Text></View>;
}

function TimelineItem({ time, title, body, icon, accent, last = false }: { time: string; title: string; body: string; icon: keyof typeof MaterialIcons.glyphMap; accent: string; last?: boolean }) {
  return <View style={styles.timelineItem}><View style={styles.timelineRail}><View style={[styles.timelineIcon, { backgroundColor: `${accent}18` }]}><MaterialIcons name={icon} size={15} color={accent} /></View>{!last ? <View style={styles.timelineLine} /> : null}</View><View style={styles.timelineCopy}><Text style={styles.timelineTime}>{time}</Text><Text style={styles.timelineTitle}>{title}</Text><Text style={styles.timelineBody}>{body}</Text></View></View>;
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 34 },
  navRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 19 },
  navActions: { flexDirection: "row", gap: 8 },
  profileHeader: { flexDirection: "row", alignItems: "center", gap: 13, marginBottom: 18 },
  profileCopy: { flex: 1 },
  profileName: { color: COLORS.ink, fontSize: 22, fontWeight: "800", letterSpacing: -0.4 },
  profileContact: { color: COLORS.slate, fontSize: 11, marginTop: 3 },
  productCard: { backgroundColor: COLORS.ink, borderRadius: 18, padding: 16, marginBottom: 13 },
  productTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cardEyebrow: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 1.25, marginBottom: 6 },
  productName: { color: "#fff", fontSize: 18, fontWeight: "800" },
  productValue: { color: "#fff", fontSize: 17, fontWeight: "800" },
  productMeta: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#29445A" },
  productMetaText: { color: "#B9C7D4", fontSize: 10 },
  actionGrid: { flexDirection: "row", gap: 8, marginBottom: 13 },
  actionButton: { flex: 1, alignItems: "center", paddingVertical: 10, borderWidth: 1, borderColor: COLORS.line, borderRadius: 13, backgroundColor: COLORS.surface },
  actionIcon: { width: 32, height: 32, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#E4F8FC", marginBottom: 6 },
  actionLabel: { color: COLORS.ink, fontSize: 10, fontWeight: "800" },
  scoreCard: { borderWidth: 1, borderColor: COLORS.line, borderRadius: 18, padding: 16, backgroundColor: COLORS.surface, marginBottom: 14 },
  scoreHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  scoreTitle: { color: COLORS.ink, fontSize: 27, fontWeight: "800", letterSpacing: -0.8 },
  scoreTrack: { height: 9, borderRadius: 5, backgroundColor: "#EEF2F6", marginTop: 16, overflow: "hidden" },
  scoreFill: { height: 9, borderRadius: 5, backgroundColor: COLORS.green },
  scoreExplanation: { color: COLORS.slate, fontSize: 12, lineHeight: 18, marginTop: 12 },
  signalRow: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 13 },
  signal: { flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 8, backgroundColor: "#F2F5F8", paddingHorizontal: 8, paddingVertical: 6 },
  signalText: { color: COLORS.slate, fontSize: 10 },
  section: { marginBottom: 14 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 13 },
  sectionTitle: { color: COLORS.ink, fontSize: 16, fontWeight: "800" },
  sectionMeta: { color: COLORS.slate, fontSize: 10 },
  timelineItem: { flexDirection: "row", gap: 12, minHeight: 73 },
  timelineRail: { width: 25, alignItems: "center" },
  timelineIcon: { width: 27, height: 27, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  timelineLine: { width: 1, backgroundColor: COLORS.line, flex: 1, marginVertical: 4 },
  timelineCopy: { flex: 1, paddingBottom: 13 },
  timelineTime: { color: COLORS.slate, fontSize: 10 },
  timelineTitle: { color: COLORS.ink, fontSize: 12, fontWeight: "800", marginTop: 4 },
  timelineBody: { color: COLORS.slate, fontSize: 11, lineHeight: 16, marginTop: 3 },
  noteCard: { flexDirection: "row", gap: 10, padding: 14, backgroundColor: "#FFF8EA", borderRadius: 15, marginBottom: 13 },
  noteCopy: { flex: 1 },
  noteTitle: { color: COLORS.ink, fontSize: 12, fontWeight: "800" },
  noteBody: { color: COLORS.slate, fontSize: 11, lineHeight: 17, marginTop: 3 },
  recoverButton: { minHeight: 50, borderRadius: 14, backgroundColor: COLORS.green, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  recoverButtonText: { color: "#fff", fontSize: 13, fontWeight: "800" },
  pressed: { opacity: 0.76, transform: [{ scale: 0.985 }] },
});
