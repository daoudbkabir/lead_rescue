import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { IconButton, SectionHeader, TopBar } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";

const COLORS = { ink: "#071A2F", slate: "#617083", cyan: "#12B8D6", green: "#1F9D68", amber: "#D68A18", surface: "#FFFFFF", line: "#DCE4EC" };

export default function AnalyticsScreen() {
  const router = useRouter();
  return <ScreenContainer className="flex-1" edges={["top", "left", "right"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}><View style={styles.backRow}><IconButton name="arrow-back" label="Go back" onPress={() => router.back()} /><Text style={styles.backLabel}>PERFORMANCE</Text></View><TopBar title="Analytics" subtitle="See where recovery momentum is building." onNotification={() => Alert.alert("Analytics updated", "Your latest lead activity is included.")} /><View style={styles.periodRow}><Text style={styles.periodLabel}>AUG 1 – AUG 31, 2026</Text><Pressable accessibilityRole="button" onPress={() => Alert.alert("Period", "Choose a reporting period in the next release.")} style={styles.periodButton}><Text style={styles.periodButtonText}>30 days</Text><MaterialIcons name="keyboard-arrow-down" size={15} color={COLORS.ink} /></Pressable></View><View style={styles.kpiGrid}><AnalyticsKpi value="2.6%" label="recovery rate" trend="↑ 0.4%" tone={COLORS.green} icon="track-changes" /><AnalyticsKpi value="18m" label="avg. response time" trend="↓ 6m" tone={COLORS.cyan} icon="timer" /><AnalyticsKpi value="51.4%" label="high-intent share" trend="↑ 8.2%" tone={COLORS.amber} icon="bolt" /><AnalyticsKpi value="4.8/5" label="agent quality" trend="↑ 0.3" tone="#6E61C7" icon="stars" /></View><View style={styles.card}><SectionHeader title="Recovery funnel" action="See details" onPress={() => Alert.alert("Funnel details", "The highest drop-off is between high intent and first follow-up.")} /><FunnelRow label="All leads" value="12,480" percent={100} color={COLORS.ink} /><FunnelRow label="At risk" value="1,284" percent={72} color="#1C6D90" /><FunnelRow label="High intent" value="642" percent={56} color={COLORS.cyan} /><FunnelRow label="Followed up" value="418" percent={41} color="#2BB58A" /><FunnelRow label="Recovered" value="326" percent={32} color={COLORS.green} /></View><View style={styles.card}><SectionHeader title="Team productivity" action="View agents" onPress={() => router.push("/more/agents" as never)} /><MetricLine label="Tasks completed" value="418" helper="of 512 assigned" percent={82} color={COLORS.cyan} /><MetricLine label="Replies within 1 hour" value="76%" helper="target 70%" percent={76} color={COLORS.green} /><MetricLine label="Follow-up quality" value="91%" helper="based on outcomes" percent={91} color={COLORS.amber} /></View><View style={styles.insight}><MaterialIcons name="lightbulb" size={20} color={COLORS.amber} /><View style={styles.insightCopy}><Text style={styles.insightTitle}>Your fastest channel is WhatsApp</Text><Text style={styles.insightBody}>Leads contacted within 30 minutes on WhatsApp convert 1.8× more often than email-originated leads.</Text></View></View></ScrollView></ScreenContainer>;
}

function AnalyticsKpi({ value, label, trend, tone, icon }: { value: string; label: string; trend: string; tone: string; icon: keyof typeof MaterialIcons.glyphMap }) { return <View style={styles.kpi}><View style={[styles.kpiIcon, { backgroundColor: `${tone}16` }]}><MaterialIcons name={icon} size={17} color={tone} /></View><Text style={styles.kpiValue}>{value}</Text><Text style={styles.kpiLabel}>{label}</Text><Text style={[styles.kpiTrend, { color: tone }]}>{trend}</Text></View>; }
function FunnelRow({ label, value, percent, color }: { label: string; value: string; percent: number; color: string }) { return <View style={styles.funnelRow}><View style={styles.funnelLabel}><Text style={styles.funnelName}>{label}</Text><Text style={styles.funnelValue}>{value}</Text></View><View style={styles.funnelTrack}><View style={[styles.funnelFill, { width: `${percent}%`, backgroundColor: color }]} /></View></View>; }
function MetricLine({ label, value, helper, percent, color }: { label: string; value: string; helper: string; percent: number; color: string }) { return <View style={styles.metricLine}><View style={styles.metricLineTop}><View><Text style={styles.metricLabel}>{label}</Text><Text style={styles.metricHelper}>{helper}</Text></View><Text style={styles.metricValue}>{value}</Text></View><View style={styles.metricTrack}><View style={[styles.metricFill, { width: `${percent}%`, backgroundColor: color }]} /></View></View>; }

const styles = StyleSheet.create({
  content: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 34 },
  backRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 13 },
  backLabel: { color: COLORS.slate, fontSize: 10, fontWeight: "900", letterSpacing: 1.2 },
  periodRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 },
  periodLabel: { color: COLORS.slate, fontSize: 10, fontWeight: "800", letterSpacing: 0.6 },
  periodButton: { flexDirection: "row", alignItems: "center", gap: 5, borderWidth: 1, borderColor: COLORS.line, borderRadius: 9, paddingHorizontal: 9, paddingVertical: 7 },
  periodButtonText: { color: COLORS.ink, fontSize: 10, fontWeight: "800" },
  kpiGrid: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginBottom: 14 },
  kpi: { width: "48.3%", minHeight: 116, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 16, padding: 13 },
  kpiIcon: { width: 30, height: 30, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  kpiValue: { color: COLORS.ink, fontSize: 21, fontWeight: "800", marginTop: 9 },
  kpiLabel: { color: COLORS.slate, fontSize: 10, marginTop: 2 },
  kpiTrend: { fontSize: 10, fontWeight: "800", marginTop: 7 },
  card: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 18, padding: 16, marginBottom: 14 },
  funnelRow: { marginTop: 13 },
  funnelLabel: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  funnelName: { color: COLORS.slate, fontSize: 11 },
  funnelValue: { color: COLORS.ink, fontSize: 11, fontWeight: "800" },
  funnelTrack: { height: 10, borderRadius: 5, backgroundColor: "#EEF2F6", overflow: "hidden" },
  funnelFill: { height: 10, borderRadius: 5 },
  metricLine: { marginTop: 14 },
  metricLineTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  metricLabel: { color: COLORS.ink, fontSize: 12, fontWeight: "800" },
  metricHelper: { color: COLORS.slate, fontSize: 10, marginTop: 3 },
  metricValue: { color: COLORS.ink, fontSize: 15, fontWeight: "800" },
  metricTrack: { height: 8, borderRadius: 4, backgroundColor: "#EEF2F6", overflow: "hidden", marginTop: 7 },
  metricFill: { height: 8, borderRadius: 4 },
  insight: { flexDirection: "row", gap: 10, backgroundColor: "#FFF8EA", borderRadius: 16, padding: 14 },
  insightCopy: { flex: 1 },
  insightTitle: { color: COLORS.ink, fontSize: 12, fontWeight: "800" },
  insightBody: { color: COLORS.slate, fontSize: 11, lineHeight: 17, marginTop: 4 },
});
