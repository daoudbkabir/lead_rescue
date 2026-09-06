import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Avatar, IconButton, StatusChip, TopBar } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";

const COLORS = { ink: "#071A2F", slate: "#617083", cyan: "#12B8D6", green: "#1F9D68", amber: "#D68A18", surface: "#FFFFFF", line: "#DCE4EC" };

const destinations = [
  { title: "Revenue", description: "Recovered value and deal performance", icon: "payments", route: "/more/revenue" },
  { title: "Analytics", description: "Funnel, velocity, and team performance", icon: "bar-chart", route: "/more/analytics" },
  { title: "AI Insights", description: "Signals and next-best actions", icon: "auto-awesome", route: "/more/insights" },
  { title: "Recovery agents", description: "Assignments, availability, and impact", icon: "groups", route: "/more/agents" },
] as const;

export default function MoreScreen() {
  const router = useRouter();
  return (
    <ScreenContainer className="flex-1" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TopBar title="More" subtitle="The full operating system for revenue recovery." onNotification={() => Alert.alert("Notifications", "You have 3 recovery updates waiting for review.")} />
        <View style={styles.profileCard}><View style={styles.profileRow}><Avatar initials="RA" size={50} background="#D6F7F1" /><View style={styles.profileCopy}><Text style={styles.profileName}>Rahim Ahmed</Text><Text style={styles.profileRole}>Business Owner · Dhaka, Bangladesh</Text></View><IconButton name="chevron-right" label="Open profile" onPress={() => Alert.alert("Profile", "Profile management is ready for the next release.")} /></View><View style={styles.planRow}><View><Text style={styles.planLabel}>CURRENT PLAN</Text><Text style={styles.planName}>Growth Plan</Text></View><StatusChip status="Available" /></View></View>
        <View style={styles.sectionLabel}><Text style={styles.sectionEyebrow}>PERFORMANCE</Text><Text style={styles.sectionTitle}>Measure what gets recovered.</Text></View>
        <View style={styles.destinationList}>{destinations.map((item) => <DestinationRow key={item.title} {...item} onPress={() => router.push(item.route as never)} />)}</View>
        <View style={styles.sectionLabel}><Text style={styles.sectionEyebrow}>SYSTEM</Text><Text style={styles.sectionTitle}>Keep your workspace in sync.</Text></View>
        <View style={styles.destinationList}><DestinationRow title="Settings" description="Workspace, notifications, and preferences" icon="settings" route="/more/settings" onPress={() => router.push("/more/settings" as never)} /><DestinationRow title="Help & feedback" description="Guides, support, and feature requests" icon="help-outline" route="" onPress={() => Alert.alert("Help center", "Your account team is ready to help. Email support@leadrescue.co for assistance.")} /></View>
        <View style={styles.footer}><Text style={styles.footerBrand}>LEADRESCUE</Text><Text style={styles.footerTagline}>AI identifies. Youth recovers. Business earns.</Text><Text style={styles.footerVersion}>v1.0 prototype · Built for Bangladesh SMEs</Text></View>
      </ScrollView>
    </ScreenContainer>
  );
}

function DestinationRow({ title, description, icon, onPress }: { title: string; description: string; icon: keyof typeof MaterialIcons.glyphMap; route: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.destinationRow, pressed && styles.pressed]}><View style={styles.destinationIcon}><MaterialIcons name={icon} size={19} color={COLORS.cyan} /></View><View style={styles.destinationCopy}><Text style={styles.destinationTitle}>{title}</Text><Text style={styles.destinationDescription}>{description}</Text></View><MaterialIcons name="chevron-right" size={19} color={COLORS.slate} /></Pressable>;
}

const styles = StyleSheet.create({
  content: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 34 },
  profileCard: { backgroundColor: COLORS.ink, borderRadius: 20, padding: 16, marginBottom: 25 },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 11 },
  profileCopy: { flex: 1 },
  profileName: { color: "#fff", fontSize: 16, fontWeight: "800" },
  profileRole: { color: "#B9C7D4", fontSize: 11, marginTop: 4 },
  planRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#29445A", paddingTop: 13, marginTop: 14 },
  planLabel: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 1.25 },
  planName: { color: "#fff", fontSize: 13, fontWeight: "800", marginTop: 3 },
  sectionLabel: { marginBottom: 11 },
  sectionEyebrow: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 1.3 },
  sectionTitle: { color: COLORS.ink, fontSize: 17, fontWeight: "800", marginTop: 5 },
  destinationList: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 17, overflow: "hidden", marginBottom: 25 },
  destinationRow: { flexDirection: "row", alignItems: "center", gap: 11, padding: 13, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  destinationIcon: { width: 36, height: 36, borderRadius: 11, backgroundColor: "#E4F8FC", alignItems: "center", justifyContent: "center" },
  destinationCopy: { flex: 1 },
  destinationTitle: { color: COLORS.ink, fontSize: 13, fontWeight: "800" },
  destinationDescription: { color: COLORS.slate, fontSize: 10, marginTop: 3 },
  footer: { alignItems: "center", paddingVertical: 11 },
  footerBrand: { color: COLORS.cyan, fontSize: 10, fontWeight: "900", letterSpacing: 2 },
  footerTagline: { color: COLORS.slate, fontSize: 11, marginTop: 7 },
  footerVersion: { color: "#97A5B3", fontSize: 9, marginTop: 5 },
  pressed: { opacity: 0.7 },
});
