import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { IconButton, LeadCard, SectionHeader, TopBar } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";
import { leads, monthlyRevenue } from "@/lib/leadrescue-data";

const COLORS = { ink: "#071A2F", slate: "#617083", cyan: "#12B8D6", green: "#1F9D68", amber: "#D68A18", surface: "#FFFFFF", line: "#DCE4EC" };

export default function RevenueScreen() {
  const router = useRouter();
  const recovered = leads.filter((lead) => lead.status === "Recovered");
  return (
    <ScreenContainer className="flex-1" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.backRow}><IconButton name="arrow-back" label="Go back" onPress={() => router.back()} /><Text style={styles.backLabel}>PERFORMANCE</Text></View>
        <TopBar title="Revenue" subtitle="The commercial impact of every recovered conversation." onNotification={() => Alert.alert("Revenue update", "Revenue totals are synced through August 31, 2026.")} />
        <View style={styles.heroCard}><Text style={styles.heroEyebrow}>RECOVERED REVENUE · AUGUST</Text><Text style={styles.heroValue}>৳4,82,500</Text><View style={styles.heroRow}><Text style={styles.heroTrend}>↑ 23.8% vs last month</Text><Text style={styles.heroHelper}>৳92,000 more</Text></View><View style={styles.heroMiniChart}>{monthlyRevenue.map((value, index) => <View key={value} style={styles.miniBarWrap}><View style={[styles.miniBar, { height: 11 + (value / 500000) * 48, backgroundColor: index === monthlyRevenue.length - 1 ? COLORS.cyan : "#80DCE8" }]} /></View>)}</View><View style={styles.monthLabels}><Text>Mar</Text><Text>Apr</Text><Text>May</Text><Text>Jun</Text><Text>Jul</Text><Text>Aug</Text></View></View>
        <View style={styles.kpiRow}><Kpi value="326" label="recovered leads" icon="check-circle" tone={COLORS.green} /><Kpi value="৳1,480" label="avg. recovery value" icon="trending-up" tone={COLORS.cyan} /></View>
        <SectionHeader title="Recovered deals" action="Export" onPress={() => Alert.alert("Export ready", "Your August revenue report is ready to download.")} />
        {recovered.length > 0 ? recovered.map((lead) => <LeadCard key={lead.id} lead={lead} compact onPress={() => router.push({ pathname: "/lead/[id]", params: { id: lead.id } })} />) : <Text style={styles.empty}>Recovered deals will appear here after your first conversion.</Text>}
        <View style={styles.sourceCard}><SectionHeader title="Revenue by source" /><SourceRow label="Facebook" value="৳2,14,500" percent={44} color={COLORS.cyan} /><SourceRow label="Website" value="৳1,83,000" percent={38} color={COLORS.green} /><SourceRow label="WhatsApp" value="৳85,000" percent={18} color={COLORS.amber} /></View>
      </ScrollView>
    </ScreenContainer>
  );
}

function Kpi({ value, label, icon, tone }: { value: string; label: string; icon: keyof typeof MaterialIcons.glyphMap; tone: string }) { return <View style={styles.kpi}><View style={[styles.kpiIcon, { backgroundColor: `${tone}16` }]}><MaterialIcons name={icon} size={18} color={tone} /></View><Text style={styles.kpiValue}>{value}</Text><Text style={styles.kpiLabel}>{label}</Text></View>; }
function SourceRow({ label, value, percent, color }: { label: string; value: string; percent: number; color: string }) { return <View style={styles.sourceRow}><View style={styles.sourceTop}><Text style={styles.sourceLabel}>{label}</Text><Text style={styles.sourceValue}>{value}</Text></View><View style={styles.sourceTrack}><View style={[styles.sourceFill, { width: `${percent}%`, backgroundColor: color }]} /></View></View>; }

const styles = StyleSheet.create({
  content: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 35 },
  backRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 13 },
  backLabel: { color: COLORS.slate, fontSize: 10, fontWeight: "900", letterSpacing: 1.2 },
  heroCard: { backgroundColor: COLORS.ink, borderRadius: 20, padding: 18, marginBottom: 13 },
  heroEyebrow: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 1.3 },
  heroValue: { color: "#fff", fontSize: 33, lineHeight: 41, fontWeight: "800", letterSpacing: -1.2, marginTop: 8 },
  heroRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  heroTrend: { color: "#77D9C0", fontSize: 11, fontWeight: "800" },
  heroHelper: { color: "#B9C7D4", fontSize: 10 },
  heroMiniChart: { flexDirection: "row", alignItems: "flex-end", gap: 14, height: 71, marginTop: 18, borderBottomWidth: 1, borderBottomColor: "#29445A", paddingHorizontal: 5 },
  miniBarWrap: { flex: 1, alignItems: "center", justifyContent: "flex-end", height: 71 },
  miniBar: { width: 16, borderRadius: 8 },
  monthLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 7 },
  kpiRow: { flexDirection: "row", gap: 10, marginBottom: 22 },
  kpi: { flex: 1, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 16, padding: 14 },
  kpiIcon: { width: 33, height: 33, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  kpiValue: { color: COLORS.ink, fontSize: 20, fontWeight: "800", marginTop: 10 },
  kpiLabel: { color: COLORS.slate, fontSize: 10, marginTop: 3 },
  empty: { color: COLORS.slate, fontSize: 12, marginBottom: 18 },
  sourceCard: { backgroundColor: COLORS.surface, borderRadius: 18, borderWidth: 1, borderColor: COLORS.line, padding: 16, marginTop: 7 },
  sourceRow: { marginTop: 14 },
  sourceTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sourceLabel: { color: COLORS.slate, fontSize: 11 },
  sourceValue: { color: COLORS.ink, fontSize: 12, fontWeight: "800" },
  sourceTrack: { height: 8, backgroundColor: "#EEF2F6", borderRadius: 4, marginTop: 7, overflow: "hidden" },
  sourceFill: { height: 8, borderRadius: 4 },
});
