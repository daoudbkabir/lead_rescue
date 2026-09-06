import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AssignSheet, IconButton, LeadCard, MetricCard, RecoveryFunnel, RecoveryInsight, RevenueChart, SectionHeader, TopBar } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";
import { leads, Lead } from "@/lib/leadrescue-data";

const COLORS = { ink: "#071A2F", slate: "#617083", cyan: "#12B8D6", green: "#1F9D68", surface: "#FFFFFF", line: "#DCE4EC", canvas: "#F6F8FB" };

export default function HomeScreen() {
  const router = useRouter();
  const [assignVisible, setAssignVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const queueLeads = leads.filter((lead) => lead.status === "At Risk" || lead.status === "Hot").slice(0, 3);

  const openQueue = () => router.push("/(tabs)/queue" as never);
  const openLead = (leadId: string) => router.push({ pathname: "/lead/[id]", params: { id: leadId } });
  const startAssign = (lead: Lead) => { setSelectedLead(lead); setAssignVisible(true); };

  return (
    <ScreenContainer className="flex-1" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TopBar title="Good morning, Rahim" subtitle="Here’s what LeadRescue recovered for your business this month." onSearch={() => router.push("/(tabs)/leads" as never)} onNotification={() => Alert.alert("Notifications", "You have 3 recovery updates waiting for review.")} />

        <View style={styles.heroRow}>
          <View style={styles.heroMessage}><Text style={styles.heroKicker}>AUGUST 2026 · GROWTH PLAN</Text><Text style={styles.heroTitle}>Recover revenue from the leads you already have.</Text><Text style={styles.heroBody}>AI identifies the signal. Your recovery team creates the opportunity.</Text></View>
          <View style={styles.heroMark}><MaterialIcons name="north-east" size={28} color={COLORS.cyan} /><Text style={styles.heroMarkText}>AI → HUMAN</Text></View>
        </View>

        <View style={styles.actionRow}>
          <Pressable accessibilityRole="button" onPress={() => router.push("/import-leads" as never)} style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}><MaterialIcons name="add" size={18} color="#fff" /><Text style={styles.primaryActionText}>Import leads</Text></Pressable>
          <Pressable accessibilityRole="button" onPress={openQueue} style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}><Text style={styles.secondaryActionText}>View queue</Text><MaterialIcons name="arrow-forward" size={17} color={COLORS.ink} /></Pressable>
        </View>

        <SectionHeader title="This month at a glance" action="View analytics" onPress={() => router.push("/(tabs)/more" as never)} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.metricsRow}>
          <MetricCard label="Total leads" value="12,480" trend="↑ 12.4%" helper="vs last month" tone="navy" icon="people-alt" />
          <MetricCard label="Leads at risk" value="1,284" trend="10.3%" helper="of all leads" tone="amber" icon="warning-amber" />
          <MetricCard label="Recovered leads" value="326" trend="↑ 18.6%" helper="this month" tone="green" icon="check-circle" />
          <MetricCard label="Recovered revenue" value="৳4,82,500" trend="↑ 23.8%" helper="৳92k more" tone="cyan" icon="trending-up" />
        </ScrollView>

        <RevenueChart />
        <RecoveryInsight onReview={openQueue} onPlan={() => Alert.alert("Follow-up plan ready", "LeadRescue created a 3-step plan for your 84 highest-intent leads.")} />
        <RecoveryFunnel />

        <SectionHeader title="Priority recovery queue" action="See all" onPress={openQueue} />
        <View style={styles.queueHeader}><Text style={styles.queueHint}>Sorted by intent and potential value</Text><IconButton name="tune" label="Filter queue" onPress={openQueue} tone="cyan" /></View>
        {queueLeads.map((lead) => <LeadCard key={lead.id} lead={lead} compact onPress={() => openLead(lead.id)} onAssign={() => startAssign(lead)} />)}
        <Pressable accessibilityRole="button" onPress={openQueue} style={({ pressed }) => [styles.fullQueueButton, pressed && styles.pressed]}><Text style={styles.fullQueueButtonText}>Open full recovery queue</Text><MaterialIcons name="arrow-forward" size={17} color={COLORS.cyan} /></Pressable>
      </ScrollView>
      <AssignSheet visible={assignVisible} lead={selectedLead} onClose={() => setAssignVisible(false)} onAssign={(agent) => Alert.alert("Task assigned", `${selectedLead?.name ?? "Lead"} is now assigned to ${agent}.`)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 16, paddingBottom: 34 },
  heroRow: { marginHorizontal: 20, marginBottom: 14, padding: 18, borderRadius: 20, backgroundColor: COLORS.ink, flexDirection: "row", gap: 12, overflow: "hidden" },
  heroMessage: { flex: 1 },
  heroKicker: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 1.4, marginBottom: 9 },
  heroTitle: { color: "#fff", fontSize: 22, lineHeight: 27, fontWeight: "800", letterSpacing: -0.6 },
  heroBody: { color: "#B9C7D4", fontSize: 12, lineHeight: 18, marginTop: 9 },
  heroMark: { width: 61, alignItems: "center", justifyContent: "center", borderLeftWidth: 1, borderLeftColor: "#28445B", paddingLeft: 10 },
  heroMarkText: { color: "#B9C7D4", fontSize: 8, fontWeight: "900", textAlign: "center", lineHeight: 12, marginTop: 7 },
  actionRow: { flexDirection: "row", gap: 9, marginHorizontal: 20, marginBottom: 23 },
  primaryAction: { flex: 1, height: 46, borderRadius: 13, backgroundColor: COLORS.cyan, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 7 },
  primaryActionText: { color: "#fff", fontSize: 12, fontWeight: "800" },
  secondaryAction: { flex: 1, height: 46, borderRadius: 13, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 7 },
  secondaryActionText: { color: COLORS.ink, fontSize: 12, fontWeight: "800" },
  metricsRow: { paddingLeft: 20, paddingBottom: 18 },
  queueHeader: { marginHorizontal: 20, marginTop: -3, marginBottom: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  queueHint: { color: COLORS.slate, fontSize: 11 },
  fullQueueButton: { marginHorizontal: 20, minHeight: 48, borderWidth: 1, borderColor: COLORS.line, borderRadius: 13, backgroundColor: COLORS.surface, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 7, marginTop: 2 },
  fullQueueButtonText: { color: COLORS.cyan, fontSize: 12, fontWeight: "800" },
  pressed: { opacity: 0.76, transform: [{ scale: 0.985 }] },
});
