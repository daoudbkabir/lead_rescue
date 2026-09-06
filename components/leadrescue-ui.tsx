import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Lead, LeadStatus, formatBDT, recoveryStages, revenueBars } from "@/lib/leadrescue-data";

const COLORS = {
  ink: "#071A2F",
  navy: "#0A2948",
  canvas: "#F6F8FB",
  surface: "#FFFFFF",
  slate: "#617083",
  line: "#DCE4EC",
  cyan: "#12B8D6",
  green: "#1F9D68",
  amber: "#D68A18",
  red: "#CF4C4C",
  violet: "#6E61C7",
};

export const money = (value: number) => formatBDT(value);

export function Avatar({ initials, size = 42, background = "#DCEBFF" }: { initials: string; size?: number; background?: string }) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: background }]}>
      <Text style={[styles.avatarText, { fontSize: size > 36 ? 13 : 11 }]}>{initials}</Text>
    </View>
  );
}

export function IconButton({ name, onPress, label, tone = "default" }: { name: keyof typeof MaterialIcons.glyphMap; onPress: () => void; label: string; tone?: "default" | "dark" | "cyan" }) {
  const backgroundColor = tone === "dark" ? COLORS.ink : tone === "cyan" ? "#E4F8FC" : COLORS.surface;
  const iconColor = tone === "dark" ? "#FFFFFF" : tone === "cyan" ? COLORS.cyan : COLORS.ink;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [styles.iconButton, { backgroundColor }, pressed && styles.pressed]}>
      <MaterialIcons name={name} size={19} color={iconColor} />
    </Pressable>
  );
}

export function StatusChip({ status }: { status: LeadStatus | "Follow-up Due" | "Available" | "On follow-up" | "In training" }) {
  const palette: Record<string, { bg: string; text: string; dot: string }> = {
    Hot: { bg: "#FDE7E7", text: COLORS.red, dot: COLORS.red },
    Warm: { bg: "#FFF1D8", text: COLORS.amber, dot: COLORS.amber },
    Cold: { bg: "#EEF2F6", text: COLORS.slate, dot: COLORS.slate },
    "At Risk": { bg: "#FFF1D8", text: COLORS.amber, dot: COLORS.amber },
    Recovered: { bg: "#E4F6EE", text: COLORS.green, dot: COLORS.green },
    Lost: { bg: "#F3E6E6", text: COLORS.red, dot: COLORS.red },
    "Follow-up Due": { bg: "#FFF1D8", text: COLORS.amber, dot: COLORS.amber },
    Available: { bg: "#E4F6EE", text: COLORS.green, dot: COLORS.green },
    "On follow-up": { bg: "#E4F8FC", text: COLORS.cyan, dot: COLORS.cyan },
    "In training": { bg: "#EEEAFE", text: COLORS.violet, dot: COLORS.violet },
  };
  const style = palette[status] ?? palette.Cold;
  return (
    <View style={[styles.statusChip, { backgroundColor: style.bg }]}>
      <View style={[styles.statusDot, { backgroundColor: style.dot }]} />
      <Text style={[styles.statusText, { color: style.text }]}>{status}</Text>
    </View>
  );
}

export function IntentPill({ score, intent }: { score: number; intent: string }) {
  const color = score >= 85 ? COLORS.green : score >= 70 ? COLORS.amber : COLORS.slate;
  return (
    <View style={[styles.intentPill, { borderColor: `${color}55`, backgroundColor: `${color}12` }]}>
      <Text style={[styles.intentScore, { color }]}>{score}</Text>
      <Text style={[styles.intentLabel, { color }]}>{intent} INTENT</Text>
    </View>
  );
}

export function TopBar({ title, subtitle, onSearch, onNotification }: { title: string; subtitle?: string; onSearch?: () => void; onNotification?: () => void }) {
  return (
    <View style={styles.topBar}>
      <View style={styles.topBarText}>
        <Text style={styles.pageEyebrow}>LEADRESCUE</Text>
        <Text style={styles.pageTitle}>{title}</Text>
        {subtitle ? <Text style={styles.pageSubtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.topBarActions}>
        {onSearch ? <IconButton name="search" label="Search" onPress={onSearch} /> : null}
        {onNotification ? <IconButton name="notifications-none" label="Notifications" onPress={onNotification} /> : null}
      </View>
    </View>
  );
}

export function SectionHeader({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && onPress ? (
        <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function MetricCard({ label, value, trend, helper, tone = "cyan", icon }: { label: string; value: string; trend: string; helper: string; tone?: "cyan" | "green" | "amber" | "navy"; icon: keyof typeof MaterialIcons.glyphMap }) {
  const accent = tone === "green" ? COLORS.green : tone === "amber" ? COLORS.amber : tone === "navy" ? COLORS.navy : COLORS.cyan;
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIcon, { backgroundColor: `${accent}14` }]}><MaterialIcons name={icon} size={17} color={accent} /></View>
        <Text style={styles.metricLabel}>{label}</Text>
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <View style={styles.metricFooter}>
        <Text style={[styles.metricTrend, { color: accent }]}>{trend}</Text>
        <Text style={styles.metricHelper}>{helper}</Text>
      </View>
      <View style={styles.sparkline}>
        {[0.3, 0.45, 0.36, 0.68, 0.57, 0.8, 0.72, 0.96].map((height, index) => <View key={index} style={[styles.sparkBar, { height: 8 + height * 18, backgroundColor: `${accent}${index > 4 ? "AA" : "45"}` }]} />)}
      </View>
    </View>
  );
}

export function RevenueChart() {
  const [range, setRange] = useState("30D");
  return (
    <View style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <View>
          <Text style={styles.cardEyebrow}>RECOVERED REVENUE</Text>
          <Text style={styles.chartTitle}>Revenue recovery</Text>
        </View>
        <View style={styles.rangeSelector}>
          {["7D", "30D", "90D", "12M"].map((item) => (
            <Pressable key={item} accessibilityRole="button" onPress={() => setRange(item)} style={[styles.rangeItem, range === item && styles.rangeItemActive]}>
              <Text style={[styles.rangeText, range === item && styles.rangeTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.chartLegend}>
        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.green }]} /><Text style={styles.legendText}>Recovered</Text></View>
        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.cyan }]} /><Text style={styles.legendText}>Potential</Text></View>
        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.line }]} /><Text style={styles.legendText}>Lost</Text></View>
      </View>
      <View style={styles.chartArea}>
        <View style={styles.chartGrid}>
          {[1, 2, 3, 4].map((item) => <View key={item} style={styles.gridLine} />)}
        </View>
        <View style={styles.barRow}>
          {revenueBars.map((bar, index) => (
            <View key={index} style={styles.barGroup}>
              <View style={[styles.barPotential, { height: bar * 0.55 }]} />
              <View style={[styles.barRecovered, { height: bar * 0.38 }]} />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.chartLabels}><Text style={styles.axisLabel}>01 Aug</Text><Text style={styles.axisLabel}>15 Aug</Text><Text style={styles.axisLabel}>31 Aug</Text></View>
    </View>
  );
}

export function RecoveryInsight({ onReview, onPlan }: { onReview: () => void; onPlan: () => void }) {
  return (
    <View style={styles.insightCard}>
      <View style={styles.insightTopRow}>
        <View style={styles.aiBadge}><MaterialIcons name="auto-awesome" size={15} color={COLORS.cyan} /><Text style={styles.aiBadgeText}>AI RECOVERY INSIGHT</Text></View>
        <View style={styles.liveDot} />
      </View>
      <Text style={styles.insightTitle}>84 high-intent leads are waiting for a follow-up.</Text>
      <Text style={styles.insightBody}>They showed buying signals in the last 48 hours. Estimated recoverable value is <Text style={styles.insightEmphasis}>৳1,24,000</Text>.</Text>
      <View style={styles.insightActions}>
        <Pressable accessibilityRole="button" onPress={onReview} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>Review 84 leads</Text><MaterialIcons name="arrow-forward" size={17} color="#fff" /></Pressable>
        <Pressable accessibilityRole="button" onPress={onPlan} style={({ pressed }) => [styles.secondaryButtonDark, pressed && styles.pressed]}><Text style={styles.secondaryButtonDarkText}>Generate plan</Text></Pressable>
      </View>
    </View>
  );
}

export function RecoveryFunnel() {
  return (
    <View style={styles.funnelCard}>
      <View style={styles.funnelIntro}><View><Text style={styles.cardEyebrow}>THE RECOVERY LOOP</Text><Text style={styles.chartTitle}>From signal to revenue</Text></View><MaterialIcons name="south-east" size={22} color={COLORS.cyan} /></View>
      <View style={styles.funnelList}>
        {recoveryStages.map((stage, index) => (
          <View key={stage.label} style={styles.funnelRow}>
            <View style={styles.funnelLabel}><Text style={styles.funnelValue}>{stage.value}</Text><Text style={styles.funnelStage}>{stage.label}</Text></View>
            <View style={styles.funnelTrack}><View style={[styles.funnelFill, { width: `${stage.width}%`, backgroundColor: stage.color }]} /></View>
            {index < recoveryStages.length - 1 ? <MaterialIcons name="south" size={15} color={COLORS.line} style={styles.funnelArrow} /> : null}
          </View>
        ))}
      </View>
      <View style={styles.funnelFooter}><Text style={styles.funnelFootLabel}>Recovery rate</Text><Text style={styles.funnelFootValue}>2.6% <Text style={styles.funnelFootTrend}>↑ 0.4%</Text></Text></View>
    </View>
  );
}

export function LeadCard({ lead, compact = false, onPress, onAssign }: { lead: Lead; compact?: boolean; onPress?: () => void; onAssign?: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Open ${lead.name}`} onPress={onPress} style={({ pressed }) => [styles.leadCard, compact && styles.leadCardCompact, pressed && styles.cardPressed]}>
      <View style={styles.leadCardTop}>
        <View style={styles.leadIdentity}><Avatar initials={lead.initials} size={compact ? 36 : 42} background={lead.status === "Recovered" ? "#D6F7E8" : "#DCEBFF"} /><View style={styles.leadNameBlock}><Text style={styles.leadName}>{lead.name}</Text><Text style={styles.leadProduct}>{lead.product} · {lead.source}</Text></View></View>
        <StatusChip status={lead.status} />
      </View>
      <View style={styles.leadCardMeta}>
        <IntentPill score={lead.intentScore} intent={lead.intent} />
        <View style={styles.leadMetaItem}><Text style={styles.leadMetaLabel}>POTENTIAL</Text><Text style={styles.leadMetaValue}>{money(lead.potentialRevenue)}</Text></View>
        <View style={styles.leadMetaItem}><Text style={styles.leadMetaLabel}>LAST CONTACT</Text><Text style={styles.leadMetaValue}>{lead.lastActivity}</Text></View>
      </View>
      {!compact ? <View style={styles.leadCardBottom}><View style={styles.assignee}><Avatar initials={lead.agentInitials} size={23} background="#EEF2F6" /><Text style={styles.assigneeText}>{lead.agent}</Text></View><Pressable accessibilityRole="button" onPress={onAssign} style={({ pressed }) => [styles.cardAction, pressed && styles.pressed]}><Text style={styles.cardActionText}>{lead.status === "Recovered" ? "View deal" : "Take action"}</Text><MaterialIcons name="chevron-right" size={17} color={COLORS.cyan} /></Pressable></View> : null}
    </Pressable>
  );
}

export function FilterChips({ options, selected, onChange }: { options: string[]; selected: string; onChange: (value: string) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
      {options.map((option) => <Pressable key={option} accessibilityRole="button" onPress={() => onChange(option)} style={[styles.filterChip, selected === option && styles.filterChipActive]}><Text style={[styles.filterChipText, selected === option && styles.filterChipTextActive]}>{option}</Text></Pressable>)}
    </ScrollView>
  );
}

export function SearchField({ value, onChangeText, placeholder = "Search leads, phone, or email" }: { value: string; onChangeText: (value: string) => void; placeholder?: string }) {
  return (
    <View style={styles.searchField}><MaterialIcons name="search" size={19} color={COLORS.slate} /><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#8A98A8" style={styles.searchInput} returnKeyType="search" /></View>
  );
}

export function AssignSheet({ visible, lead, onClose, onAssign }: { visible: boolean; lead: Lead | null; onClose: () => void; onAssign: (agent: string) => void }) {
  const [selected, setSelected] = useState("Nusrat");
  const options = [{ name: "Nusrat", initials: "NS", load: "18 active leads", status: "Available" }, { name: "Rafi", initials: "RF", load: "24 active leads", status: "On follow-up" }, { name: "Mim", initials: "MA", load: "11 active leads", status: "Available" }];
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}><View style={styles.sheet}><View style={styles.sheetHandle} /><View style={styles.sheetHeader}><View><Text style={styles.sheetEyebrow}>ASSIGN RECOVERY TASK</Text><Text style={styles.sheetTitle}>{lead?.name ?? "Lead"}</Text></View><IconButton name="close" label="Close" onPress={onClose} /></View><Text style={styles.sheetDescription}>Choose the best available agent for this follow-up.</Text>{options.map((option) => <Pressable key={option.name} accessibilityRole="button" onPress={() => setSelected(option.name)} style={[styles.agentOption, selected === option.name && styles.agentOptionActive]}><Avatar initials={option.initials} size={38} /><View style={styles.agentOptionCopy}><Text style={styles.agentOptionName}>{option.name}</Text><Text style={styles.agentOptionMeta}>{option.load}</Text></View><StatusChip status={option.status as "Available" | "On follow-up"} />{selected === option.name ? <MaterialIcons name="check-circle" size={21} color={COLORS.cyan} /> : null}</Pressable>)}<Pressable accessibilityRole="button" onPress={() => { onAssign(selected); onClose(); }} style={({ pressed }) => [styles.primaryButton, styles.sheetCta, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>Assign to {selected}</Text><MaterialIcons name="arrow-forward" size={17} color="#fff" /></Pressable></View></View>
    </Modal>
  );
}

export function EmptyState({ title, body, action, onPress }: { title: string; body: string; action?: string; onPress?: () => void }) {
  return <View style={styles.emptyState}><View style={styles.emptyIcon}><MaterialIcons name="inbox" size={26} color={COLORS.cyan} /></View><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyBody}>{body}</Text>{action && onPress ? <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}><Text style={styles.secondaryButtonText}>{action}</Text></Pressable> : null}</View>;
}

export function useLeadNavigation() {
  const router = useRouter();
  return (leadId: string) => router.push({ pathname: "/lead/[id]", params: { id: leadId } });
}

const styles = StyleSheet.create({
  avatar: { alignItems: "center", justifyContent: "center" },
  avatarText: { color: COLORS.ink, fontWeight: "800", letterSpacing: 0.3 },
  iconButton: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.line },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
  cardPressed: { opacity: 0.82, transform: [{ scale: 0.995 }] },
  topBar: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 4, paddingBottom: 16 },
  topBarText: { flex: 1, paddingRight: 14 },
  pageEyebrow: { color: COLORS.cyan, fontSize: 10, fontWeight: "800", letterSpacing: 1.7, marginBottom: 7 },
  pageTitle: { color: COLORS.ink, fontSize: 28, lineHeight: 34, fontWeight: "800", letterSpacing: -0.6 },
  pageSubtitle: { color: COLORS.slate, fontSize: 13, lineHeight: 19, marginTop: 4 },
  topBarActions: { flexDirection: "row", gap: 8, paddingTop: 3 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  sectionTitle: { color: COLORS.ink, fontSize: 16, fontWeight: "800", letterSpacing: -0.2 },
  sectionAction: { color: COLORS.cyan, fontSize: 12, fontWeight: "800" },
  metricCard: { width: 164, minHeight: 142, backgroundColor: COLORS.surface, borderRadius: 18, borderWidth: 1, borderColor: COLORS.line, padding: 15, marginRight: 10 },
  metricHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  metricIcon: { width: 28, height: 28, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  metricLabel: { flex: 1, color: COLORS.slate, fontSize: 11, fontWeight: "700" },
  metricValue: { color: COLORS.ink, fontSize: 22, fontWeight: "800", marginTop: 12, letterSpacing: -0.7 },
  metricFooter: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 5 },
  metricTrend: { fontSize: 11, fontWeight: "800" },
  metricHelper: { flex: 1, color: COLORS.slate, fontSize: 10 },
  sparkline: { flexDirection: "row", alignItems: "flex-end", gap: 3, height: 25, marginTop: 10 },
  sparkBar: { width: 8, borderRadius: 4 },
  chartCard: { backgroundColor: COLORS.surface, borderRadius: 20, borderWidth: 1, borderColor: COLORS.line, padding: 17, marginBottom: 14 },
  chartHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cardEyebrow: { color: COLORS.slate, fontSize: 9, fontWeight: "800", letterSpacing: 1.35, marginBottom: 6 },
  chartTitle: { color: COLORS.ink, fontSize: 19, fontWeight: "800", letterSpacing: -0.4 },
  rangeSelector: { flexDirection: "row", backgroundColor: COLORS.canvas, borderRadius: 9, padding: 3 },
  rangeItem: { paddingHorizontal: 6, paddingVertical: 5, borderRadius: 6 },
  rangeItemActive: { backgroundColor: COLORS.ink },
  rangeText: { color: COLORS.slate, fontSize: 9, fontWeight: "800" },
  rangeTextActive: { color: "#fff" },
  chartLegend: { flexDirection: "row", gap: 13, marginTop: 17 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { color: COLORS.slate, fontSize: 10 },
  chartArea: { height: 132, marginTop: 12, position: "relative", justifyContent: "flex-end" },
  chartGrid: { ...StyleSheet.absoluteFillObject, justifyContent: "space-between", paddingVertical: 5 },
  gridLine: { height: 1, backgroundColor: "#EEF2F6", width: "100%" },
  barRow: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 4, height: 125 },
  barGroup: { width: 13, alignItems: "center", justifyContent: "flex-end", height: 125, gap: 2 },
  barPotential: { width: 9, borderRadius: 5, backgroundColor: "#BEEEF4" },
  barRecovered: { width: 9, borderRadius: 5, backgroundColor: COLORS.green, marginTop: -7 },
  chartLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  axisLabel: { color: COLORS.slate, fontSize: 10 },
  insightCard: { backgroundColor: COLORS.ink, borderRadius: 20, padding: 18, marginBottom: 14 },
  insightTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  aiBadge: { flexDirection: "row", alignItems: "center", gap: 6 },
  aiBadgeText: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 1.25 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.green },
  insightTitle: { color: "#fff", fontSize: 20, lineHeight: 25, fontWeight: "800", letterSpacing: -0.5, marginTop: 15 },
  insightBody: { color: "#B9C7D4", fontSize: 13, lineHeight: 20, marginTop: 9 },
  insightEmphasis: { color: "#fff", fontWeight: "800" },
  insightActions: { flexDirection: "row", alignItems: "center", gap: 9, marginTop: 18 },
  primaryButton: { minHeight: 44, paddingHorizontal: 13, borderRadius: 12, backgroundColor: COLORS.cyan, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7 },
  primaryButtonText: { color: "#fff", fontSize: 12, fontWeight: "800" },
  secondaryButtonDark: { minHeight: 44, paddingHorizontal: 12, borderRadius: 12, backgroundColor: "#193752", alignItems: "center", justifyContent: "center" },
  secondaryButtonDarkText: { color: "#D8E4ED", fontSize: 12, fontWeight: "800" },
  funnelCard: { backgroundColor: COLORS.surface, borderRadius: 20, borderWidth: 1, borderColor: COLORS.line, padding: 17, marginBottom: 14 },
  funnelIntro: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  funnelList: { gap: 9 },
  funnelRow: { minHeight: 33, flexDirection: "row", alignItems: "center", gap: 10 },
  funnelLabel: { width: 85 },
  funnelValue: { color: COLORS.ink, fontSize: 13, fontWeight: "800" },
  funnelStage: { color: COLORS.slate, fontSize: 9, marginTop: 2 },
  funnelTrack: { flex: 1, height: 12, backgroundColor: "#EEF2F6", borderRadius: 6, overflow: "hidden" },
  funnelFill: { height: 12, borderRadius: 6 },
  funnelArrow: { width: 16 },
  funnelFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: COLORS.line, paddingTop: 12, marginTop: 12 },
  funnelFootLabel: { color: COLORS.slate, fontSize: 11 },
  funnelFootValue: { color: COLORS.ink, fontSize: 12, fontWeight: "800" },
  funnelFootTrend: { color: COLORS.green, fontSize: 11 },
  leadCard: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 18, padding: 15, marginBottom: 10 },
  leadCardCompact: { padding: 13 },
  leadCardTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10 },
  leadIdentity: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  leadNameBlock: { flex: 1 },
  leadName: { color: COLORS.ink, fontSize: 14, fontWeight: "800" },
  leadProduct: { color: COLORS.slate, fontSize: 11, marginTop: 3 },
  statusChip: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8 },
  statusDot: { width: 5, height: 5, borderRadius: 3 },
  statusText: { fontSize: 9, fontWeight: "800" },
  leadCardMeta: { flexDirection: "row", alignItems: "center", gap: 12, borderTopWidth: 1, borderTopColor: "#EEF2F6", marginTop: 13, paddingTop: 12 },
  intentPill: { borderWidth: 1, borderRadius: 9, paddingHorizontal: 8, paddingVertical: 6 },
  intentScore: { fontSize: 14, fontWeight: "900" },
  intentLabel: { fontSize: 8, fontWeight: "800", marginTop: 1 },
  leadMetaItem: { flex: 1 },
  leadMetaLabel: { color: COLORS.slate, fontSize: 8, fontWeight: "800", letterSpacing: 0.6 },
  leadMetaValue: { color: COLORS.ink, fontSize: 11, fontWeight: "800", marginTop: 4 },
  leadCardBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#EEF2F6", marginTop: 12, paddingTop: 11 },
  assignee: { flexDirection: "row", alignItems: "center", gap: 6 },
  assigneeText: { color: COLORS.slate, fontSize: 10, fontWeight: "700" },
  cardAction: { flexDirection: "row", alignItems: "center", gap: 3 },
  cardActionText: { color: COLORS.cyan, fontSize: 11, fontWeight: "800" },
  filterContent: { gap: 8, paddingBottom: 5 },
  filterChip: { borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.surface, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  filterChipActive: { backgroundColor: COLORS.ink, borderColor: COLORS.ink },
  filterChipText: { color: COLORS.slate, fontSize: 11, fontWeight: "700" },
  filterChipTextActive: { color: "#fff" },
  searchField: { height: 46, borderRadius: 13, borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.surface, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 13 },
  searchInput: { flex: 1, color: COLORS.ink, fontSize: 13 },
  modalBackdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(7,26,47,0.38)" },
  sheet: { backgroundColor: COLORS.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 28 },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.line, alignSelf: "center", marginBottom: 18 },
  sheetHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  sheetEyebrow: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 1.3, marginBottom: 6 },
  sheetTitle: { color: COLORS.ink, fontSize: 21, fontWeight: "800" },
  sheetDescription: { color: COLORS.slate, fontSize: 13, lineHeight: 19, marginTop: 10, marginBottom: 14 },
  agentOption: { borderWidth: 1, borderColor: COLORS.line, borderRadius: 14, padding: 11, flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  agentOptionActive: { borderColor: COLORS.cyan, backgroundColor: "#F1FCFE" },
  agentOptionCopy: { flex: 1 },
  agentOptionName: { color: COLORS.ink, fontSize: 13, fontWeight: "800" },
  agentOptionMeta: { color: COLORS.slate, fontSize: 10, marginTop: 3 },
  sheetCta: { marginTop: 12, minHeight: 50 },
  secondaryButton: { minHeight: 44, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.surface, alignItems: "center", justifyContent: "center" },
  secondaryButtonText: { color: COLORS.ink, fontSize: 12, fontWeight: "800" },
  emptyState: { alignItems: "center", paddingHorizontal: 30, paddingVertical: 50 },
  emptyIcon: { width: 54, height: 54, borderRadius: 18, backgroundColor: "#E4F8FC", alignItems: "center", justifyContent: "center", marginBottom: 14 },
  emptyTitle: { color: COLORS.ink, fontSize: 17, fontWeight: "800", textAlign: "center" },
  emptyBody: { color: COLORS.slate, fontSize: 13, lineHeight: 19, textAlign: "center", marginTop: 7, marginBottom: 16 },
});
