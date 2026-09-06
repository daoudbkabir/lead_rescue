import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { IconButton, SectionHeader, TopBar } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";

const COLORS = { ink: "#071A2F", slate: "#617083", cyan: "#12B8D6", green: "#1F9D68", amber: "#D68A18", red: "#CF4C4C", surface: "#FFFFFF", line: "#DCE4EC" };
const insights = [
  { eyebrow: "RECOVERY OPPORTUNITY", title: "84 high-intent leads need a follow-up", body: "These leads asked a product question or revisited a product page in the last 48 hours.", value: "৳1,24,000 estimated", icon: "bolt", tone: COLORS.cyan, action: "Review queue" },
  { eyebrow: "CHANNEL SIGNAL", title: "WhatsApp replies convert 1.8× better", body: "Move your first follow-up to WhatsApp when a phone number is available.", value: "+18% reply rate", icon: "forum", tone: COLORS.green, action: "View conversations" },
  { eyebrow: "TEAM CAPACITY", title: "Nusrat can take 6 more priority tasks", body: "Her response time is 12 minutes and her recovery rate is above the team average.", value: "6 slots available", icon: "groups", tone: COLORS.amber, action: "Assign tasks" },
] as const;

export default function InsightsScreen() {
  const router = useRouter();
  return <ScreenContainer className="flex-1" edges={["top", "left", "right"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}><View style={styles.backRow}><IconButton name="arrow-back" label="Go back" onPress={() => router.back()} /><Text style={styles.backLabel}>INTELLIGENCE</Text></View><TopBar title="AI Insights" subtitle="Signals translated into your next best action." onNotification={() => Alert.alert("Insights refreshed", "LeadRescue checked 12,480 leads for new recovery signals.")} /><View style={styles.aiHero}><View style={styles.aiHeroTop}><View style={styles.aiHeroBadge}><MaterialIcons name="auto-awesome" size={16} color={COLORS.cyan} /><Text style={styles.aiHeroBadgeText}>LEADRESCUE INTELLIGENCE</Text></View><View style={styles.pulse} /></View><Text style={styles.aiHeroTitle}>AI identifies the signal. Your team creates the recovery.</Text><Text style={styles.aiHeroBody}>Recommendations are based on intent, recency, channel behavior, and the value of each opportunity.</Text></View><SectionHeader title="Actionable now" action="Refresh" onPress={() => Alert.alert("Insights refreshed", "No new signals since your last refresh.")} />{insights.map((insight) => <InsightCard key={insight.title} {...insight} onPress={() => Alert.alert(insight.action, "This action is ready from the relevant workspace.")} />)}<View style={styles.methodCard}><MaterialIcons name="verified" size={19} color={COLORS.green} /><View style={styles.methodCopy}><Text style={styles.methodTitle}>Designed for responsible recovery</Text><Text style={styles.methodBody}>AI suggestions stay reviewable by your team. Every action shows why a lead was prioritized.</Text></View></View></ScrollView></ScreenContainer>;
}

function InsightCard({ eyebrow, title, body, value, icon, tone, action, onPress }: { eyebrow: string; title: string; body: string; value: string; icon: keyof typeof MaterialIcons.glyphMap; tone: string; action: string; onPress: () => void }) { return <View style={styles.insightCard}><View style={styles.insightTop}><View style={[styles.insightIcon, { backgroundColor: `${tone}16` }]}><MaterialIcons name={icon} size={19} color={tone} /></View><Text style={[styles.insightEyebrow, { color: tone }]}>{eyebrow}</Text></View><Text style={styles.insightTitle}>{title}</Text><Text style={styles.insightBody}>{body}</Text><View style={styles.insightBottom}><Text style={styles.insightValue}>{value}</Text><Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.insightAction, pressed && styles.pressed]}><Text style={styles.insightActionText}>{action}</Text><MaterialIcons name="arrow-forward" size={15} color={COLORS.cyan} /></Pressable></View></View>; }

const styles = StyleSheet.create({
  content: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 35 },
  backRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 13 },
  backLabel: { color: COLORS.slate, fontSize: 10, fontWeight: "900", letterSpacing: 1.2 },
  aiHero: { backgroundColor: COLORS.ink, borderRadius: 20, padding: 18, marginBottom: 22 },
  aiHeroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  aiHeroBadge: { flexDirection: "row", alignItems: "center", gap: 7 },
  aiHeroBadgeText: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 1.3 },
  pulse: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.green },
  aiHeroTitle: { color: "#fff", fontSize: 20, lineHeight: 26, fontWeight: "800", marginTop: 17, letterSpacing: -0.5 },
  aiHeroBody: { color: "#B9C7D4", fontSize: 12, lineHeight: 18, marginTop: 9 },
  insightCard: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 18, padding: 16, marginBottom: 10 },
  insightTop: { flexDirection: "row", alignItems: "center", gap: 9 },
  insightIcon: { width: 34, height: 34, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  insightEyebrow: { fontSize: 9, fontWeight: "900", letterSpacing: 1.15 },
  insightTitle: { color: COLORS.ink, fontSize: 16, lineHeight: 21, fontWeight: "800", marginTop: 13 },
  insightBody: { color: COLORS.slate, fontSize: 12, lineHeight: 18, marginTop: 6 },
  insightBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#EEF2F6" },
  insightValue: { color: COLORS.ink, fontSize: 11, fontWeight: "800" },
  insightAction: { flexDirection: "row", alignItems: "center", gap: 4 },
  insightActionText: { color: COLORS.cyan, fontSize: 11, fontWeight: "800" },
  methodCard: { flexDirection: "row", gap: 9, padding: 14, borderRadius: 15, backgroundColor: "#EAF7FA", marginTop: 8 },
  methodCopy: { flex: 1 },
  methodTitle: { color: COLORS.ink, fontSize: 12, fontWeight: "800" },
  methodBody: { color: COLORS.slate, fontSize: 11, lineHeight: 17, marginTop: 4 },
  pressed: { opacity: 0.7 },
});
