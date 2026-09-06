import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";

import { Avatar, IconButton, SectionHeader, TopBar } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";

const COLORS = { ink: "#071A2F", slate: "#617083", cyan: "#12B8D6", green: "#1F9D68", surface: "#FFFFFF", line: "#DCE4EC" };

export default function SettingsScreen() {
  const router = useRouter();
  const [push, setPush] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [sound, setSound] = useState(false);
  return <ScreenContainer className="flex-1" edges={["top", "left", "right"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}><View style={styles.backRow}><IconButton name="arrow-back" label="Go back" onPress={() => router.back()} /><Text style={styles.backLabel}>SYSTEM</Text></View><TopBar title="Settings" subtitle="Tune the workspace around how your team recovers revenue." onNotification={() => Alert.alert("Settings saved", "Your notification preferences are up to date.")} /><View style={styles.workspaceCard}><Avatar initials="RA" size={48} background="#D6F7F1" /><View style={styles.workspaceCopy}><Text style={styles.workspaceName}>Rahim Ahmed</Text><Text style={styles.workspaceMeta}>Rahim’s Commerce · Growth Plan</Text></View><Pressable accessibilityRole="button" onPress={() => Alert.alert("Workspace profile", "Workspace profile editing is ready for the next release.")} style={styles.editButton}><Text style={styles.editText}>Edit</Text></Pressable></View><SectionHeader title="Notifications" /><View style={styles.settingsGroup}><ToggleRow label="Priority recovery alerts" description="Be notified when high-intent leads become overdue." value={push} onValueChange={setPush} /><ToggleRow label="Daily recovery digest" description="Receive a morning snapshot of revenue recovered." value={dailyDigest} onValueChange={setDailyDigest} /><ToggleRow label="Sound and haptics" description="Use subtle feedback for completed recovery tasks." value={sound} onValueChange={setSound} /></View><SectionHeader title="Workspace" /><View style={styles.settingsGroup}><ActionRow icon="business" label="Business profile" value="Rahim’s Commerce" onPress={() => Alert.alert("Business profile", "Business details are ready to edit.")} /><ActionRow icon="language" label="Language & currency" value="English · BDT ৳" onPress={() => Alert.alert("Language & currency", "Currency is locked to BDT for this workspace.")} /><ActionRow icon="download" label="Export workspace data" value="CSV, JSON" onPress={() => Alert.alert("Export started", "Your data export will be available shortly.")} /></View><SectionHeader title="Plan" /><View style={styles.planCard}><View style={styles.planTop}><View><Text style={styles.planName}>Growth Plan</Text><Text style={styles.planBody}>For teams recovering revenue at scale.</Text></View><Text style={styles.planStatus}>ACTIVE</Text></View><View style={styles.planDivider} /><View style={styles.planStats}><PlanStat value="12,480" label="leads this month" /><PlanStat value="4" label="team members" /><PlanStat value="৳4.8L" label="recovered" /></View></View><Pressable accessibilityRole="button" onPress={() => Alert.alert("Sign out", "Sign out is disabled in this prototype.")} style={styles.signOut}><Text style={styles.signOutText}>Sign out of workspace</Text></Pressable><Text style={styles.version}>LeadRescue v1.0 prototype</Text></ScrollView></ScreenContainer>;
}

function ToggleRow({ label, description, value, onValueChange }: { label: string; description: string; value: boolean; onValueChange: (value: boolean) => void }) { return <View style={styles.toggleRow}><View style={styles.rowCopy}><Text style={styles.rowLabel}>{label}</Text><Text style={styles.rowDescription}>{description}</Text></View><Switch value={value} onValueChange={onValueChange} trackColor={{ false: "#DCE4EC", true: "#9BE6EF" }} thumbColor={value ? COLORS.cyan : "#fff"} /> </View>; }
function ActionRow({ icon, label, value, onPress }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string; onPress: () => void }) { return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.actionRow, pressed && styles.pressed]}><View style={styles.actionIcon}><MaterialIcons name={icon} size={17} color={COLORS.cyan} /></View><View style={styles.rowCopy}><Text style={styles.rowLabel}>{label}</Text><Text style={styles.rowDescription}>{value}</Text></View><MaterialIcons name="chevron-right" size={19} color={COLORS.slate} /></Pressable>; }
function PlanStat({ value, label }: { value: string; label: string }) { return <View style={styles.planStat}><Text style={styles.planStatValue}>{value}</Text><Text style={styles.planStatLabel}>{label}</Text></View>; }

const styles = StyleSheet.create({
  content: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 35 },
  backRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 13 },
  backLabel: { color: COLORS.slate, fontSize: 10, fontWeight: "900", letterSpacing: 1.2 },
  workspaceCard: { flexDirection: "row", alignItems: "center", gap: 11, backgroundColor: COLORS.ink, borderRadius: 18, padding: 14, marginBottom: 23 },
  workspaceCopy: { flex: 1 },
  workspaceName: { color: "#fff", fontSize: 14, fontWeight: "800" },
  workspaceMeta: { color: "#B9C7D4", fontSize: 10, marginTop: 4 },
  editButton: { borderWidth: 1, borderColor: "#456078", borderRadius: 8, paddingHorizontal: 9, paddingVertical: 6 },
  editText: { color: "#fff", fontSize: 10, fontWeight: "800" },
  settingsGroup: { borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.surface, borderRadius: 17, overflow: "hidden", marginBottom: 23 },
  toggleRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  rowCopy: { flex: 1 },
  rowLabel: { color: COLORS.ink, fontSize: 12, fontWeight: "800" },
  rowDescription: { color: COLORS.slate, fontSize: 10, lineHeight: 15, marginTop: 3 },
  actionRow: { flexDirection: "row", alignItems: "center", gap: 11, padding: 13, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  actionIcon: { width: 34, height: 34, borderRadius: 11, backgroundColor: "#E4F8FC", alignItems: "center", justifyContent: "center" },
  planCard: { backgroundColor: COLORS.ink, borderRadius: 18, padding: 16, marginBottom: 17 },
  planTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  planName: { color: "#fff", fontSize: 16, fontWeight: "800" },
  planBody: { color: "#B9C7D4", fontSize: 10, marginTop: 4 },
  planStatus: { color: "#77D9C0", fontSize: 9, fontWeight: "900", letterSpacing: 1.1 },
  planDivider: { height: 1, backgroundColor: "#29445A", marginVertical: 14 },
  planStats: { flexDirection: "row", gap: 12 },
  planStat: { flex: 1 },
  planStatValue: { color: "#fff", fontSize: 14, fontWeight: "800" },
  planStatLabel: { color: "#B9C7D4", fontSize: 9, marginTop: 3 },
  signOut: { alignItems: "center", paddingVertical: 14 },
  signOutText: { color: "#B04C4C", fontSize: 12, fontWeight: "800" },
  version: { color: "#97A5B3", fontSize: 9, textAlign: "center", marginTop: 2 },
  pressed: { opacity: 0.7 },
});
