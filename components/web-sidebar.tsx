import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const COLORS = {
  ink: "#071A2F",
  cyan: "#12B8D6",
  muted: "#91A5B7",
  line: "#173651",
  white: "#FFFFFF",
};

type NavItem = {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
};

const primaryItems: NavItem[] = [
  { label: "Overview", icon: "dashboard", route: "/(tabs)" },
  { label: "Recovery queue", icon: "sync-alt", route: "/(tabs)/queue" },
  { label: "All leads", icon: "people-outline", route: "/(tabs)/leads" },
  { label: "Conversations", icon: "chat-bubble-outline", route: "/(tabs)/conversations" },
];

const toolItems: NavItem[] = [
  { label: "Revenue", icon: "trending-up", route: "/more/revenue" },
  { label: "Analytics", icon: "bar-chart", route: "/more/analytics" },
  { label: "AI insights", icon: "auto-awesome", route: "/more/insights" },
  { label: "Recovery agents", icon: "group", route: "/more/agents" },
];

export function WebSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const renderItem = (item: NavItem) => {
    const active = item.route === "/(tabs)" ? pathname === "/" || pathname === "/(tabs)" : pathname.includes(item.route.replace("/(tabs)", ""));
    return (
      <Pressable
        key={item.label}
        accessibilityRole="button"
        accessibilityLabel={`Open ${item.label}`}
        onPress={() => router.push(item.route as never)}
        style={({ pressed }) => [styles.navItem, active && styles.navItemActive, pressed && styles.pressed]}
      >
        <MaterialIcons name={item.icon} size={18} color={active ? COLORS.cyan : COLORS.muted} />
        <Text style={[styles.navLabel, active && styles.navLabelActive]}>{item.label}</Text>
        {active ? <View style={styles.activeMark} /> : null}
      </Pressable>
    );
  };

  return (
    <View style={styles.sidebar}>
      <View style={styles.brandRow}>
        <View style={styles.brandMark}><MaterialIcons name="north-east" size={19} color={COLORS.ink} /></View>
        <View><Text style={styles.brandName}>LeadRescue</Text><Text style={styles.brandTag}>REVENUE WORKSPACE</Text></View>
      </View>

      <View style={styles.workspaceCard}>
        <View style={styles.workspaceAvatar}><Text style={styles.workspaceAvatarText}>RA</Text></View>
        <View style={styles.workspaceCopy}><Text style={styles.workspaceTitle}>Rahim’s workspace</Text><Text style={styles.workspaceMeta}>Growth plan · Bangladesh</Text></View>
        <MaterialIcons name="unfold-more" size={17} color={COLORS.muted} />
      </View>

      <Text style={styles.groupLabel}>WORKSPACE</Text>
      <View>{primaryItems.map(renderItem)}</View>
      <Text style={[styles.groupLabel, styles.toolsLabel]}>INSIGHTS & TEAM</Text>
      <View>{toolItems.map(renderItem)}</View>

      <View style={styles.sidebarFooter}>
        <Pressable accessibilityRole="button" onPress={() => router.push("/import-leads" as never)} style={({ pressed }) => [styles.importButton, pressed && styles.pressed]}>
          <MaterialIcons name="add" size={18} color={COLORS.ink} />
          <Text style={styles.importLabel}>Import leads</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => router.push("/more/settings" as never)} style={({ pressed }) => [styles.settingsRow, pressed && styles.pressed]}>
          <MaterialIcons name="settings" size={17} color={COLORS.muted} />
          <Text style={styles.settingsLabel}>Settings</Text>
        </Pressable>
        <View style={styles.helpRow}><MaterialIcons name="help-outline" size={16} color={COLORS.muted} /><Text style={styles.helpText}>Need help? <Text style={styles.helpAccent}>Talk to us</Text></Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: { position: "absolute", left: 0, top: 0, bottom: 0, width: 232, backgroundColor: COLORS.ink, paddingHorizontal: 16, paddingTop: 22, zIndex: 20 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 4, marginBottom: 27 },
  brandMark: { width: 30, height: 30, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.cyan },
  brandName: { color: COLORS.white, fontSize: 15, fontWeight: "800", letterSpacing: -0.3 },
  brandTag: { color: COLORS.cyan, fontSize: 7, fontWeight: "900", letterSpacing: 1.1, marginTop: 3 },
  workspaceCard: { flexDirection: "row", alignItems: "center", gap: 8, borderWidth: 1, borderColor: COLORS.line, borderRadius: 12, padding: 9, marginBottom: 25 },
  workspaceAvatar: { width: 29, height: 29, borderRadius: 9, alignItems: "center", justifyContent: "center", backgroundColor: "#D6F7E8" },
  workspaceAvatarText: { color: COLORS.ink, fontSize: 9, fontWeight: "900" },
  workspaceCopy: { flex: 1 },
  workspaceTitle: { color: COLORS.white, fontSize: 10, fontWeight: "800" },
  workspaceMeta: { color: COLORS.muted, fontSize: 8, marginTop: 3 },
  groupLabel: { color: "#5E7890", fontSize: 8, fontWeight: "900", letterSpacing: 1.2, paddingHorizontal: 10, marginBottom: 8 },
  toolsLabel: { marginTop: 24 },
  navItem: { minHeight: 42, borderRadius: 10, flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 10, position: "relative", marginBottom: 3 },
  navItemActive: { backgroundColor: "#0E304D" },
  navLabel: { color: COLORS.muted, fontSize: 11, fontWeight: "700" },
  navLabelActive: { color: COLORS.white },
  activeMark: { position: "absolute", right: 0, top: 10, bottom: 10, width: 3, borderRadius: 2, backgroundColor: COLORS.cyan },
  sidebarFooter: { marginTop: "auto" as never, paddingTop: 20 },
  importButton: { minHeight: 42, borderRadius: 10, backgroundColor: COLORS.cyan, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 },
  importLabel: { color: COLORS.ink, fontSize: 11, fontWeight: "900" },
  settingsRow: { minHeight: 36, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 10 },
  settingsLabel: { color: COLORS.muted, fontSize: 10, fontWeight: "700" },
  helpRow: { flexDirection: "row", alignItems: "center", gap: 7, paddingHorizontal: 10, marginTop: 13 },
  helpText: { color: COLORS.muted, fontSize: 9 },
  helpAccent: { color: COLORS.cyan, fontWeight: "800" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
});
