import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { IconButton } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";

const COLORS = { ink: "#071A2F", slate: "#617083", cyan: "#12B8D6", green: "#1F9D68", amber: "#D68A18", surface: "#FFFFFF", line: "#DCE4EC" };
const sources = [
  { label: "Facebook", icon: "public", count: "1,248 leads" },
  { label: "WhatsApp", icon: "forum", count: "486 leads" },
  { label: "Shopify", icon: "shopping-bag", count: "892 leads" },
  { label: "CSV file", icon: "upload-file", count: "Your file" },
] as const;

export default function ImportLeadsScreen() {
  const router = useRouter();
  const [source, setSource] = useState("Facebook");
  const [confirmed, setConfirmed] = useState(false);
  const selected = sources.find((item) => item.label === source) ?? sources[0];

  return <ScreenContainer className="flex-1" edges={["top", "left", "right", "bottom"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}><View style={styles.header}><IconButton name="arrow-back" label="Go back" onPress={() => router.back()} /><View style={styles.headerCopy}><Text style={styles.eyebrow}>WORKSPACE</Text><Text style={styles.title}>Import leads</Text></View><View style={styles.stepBadge}><Text style={styles.stepText}>{confirmed ? "DONE" : "1 OF 2"}</Text></View></View>{confirmed ? <View style={styles.successState}><View style={styles.successIcon}><MaterialIcons name="check" size={31} color="#fff" /></View><Text style={styles.successTitle}>Import is ready for recovery.</Text><Text style={styles.successBody}>1,248 leads were added from {source}. LeadRescue is scoring them now and will surface the highest-intent opportunities first.</Text><Pressable accessibilityRole="button" onPress={() => router.replace("/(tabs)/queue" as never)} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>Open recovery queue</Text><MaterialIcons name="arrow-forward" size={17} color="#fff" /></Pressable></View> : <><View style={styles.hero}><View style={styles.heroIcon}><MaterialIcons name="cloud-upload" size={24} color={COLORS.cyan} /></View><Text style={styles.heroTitle}>Bring your existing leads back into focus.</Text><Text style={styles.heroBody}>Connect a source and LeadRescue will find neglected, high-intent opportunities without creating more lead volume.</Text></View><Text style={styles.sectionTitle}>Choose a source</Text><View style={styles.sourceGrid}>{sources.map((item) => <Pressable key={item.label} accessibilityRole="button" onPress={() => setSource(item.label)} style={({ pressed }) => [styles.sourceCard, source === item.label && styles.sourceCardActive, pressed && styles.pressed]}><View style={[styles.sourceIcon, source === item.label && styles.sourceIconActive]}><MaterialIcons name={item.icon} size={18} color={source === item.label ? COLORS.cyan : COLORS.slate} /></View><Text style={styles.sourceLabel}>{item.label}</Text><Text style={styles.sourceCount}>{item.count}</Text>{source === item.label ? <MaterialIcons name="check-circle" size={18} color={COLORS.cyan} style={styles.sourceCheck} /> : null}</Pressable>)}</View><View style={styles.previewCard}><View style={styles.previewHeader}><Text style={styles.previewTitle}>Import preview</Text><View style={styles.previewReady}><View style={styles.readyDot} /><Text style={styles.readyText}>READY</Text></View></View><PreviewRow label="New leads" value={selected.label === "CSV file" ? "—" : selected.count.split(" ")[0]} /><PreviewRow label="Potential duplicates" value="34" warning /><PreviewRow label="Fields detected" value="Name · Phone · Product · Source" /></View><Pressable accessibilityRole="button" onPress={() => { setConfirmed(true); Alert.alert("Import confirmed", "Lead scoring has started."); }} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>Confirm import</Text><MaterialIcons name="arrow-forward" size={17} color="#fff" /></Pressable><Text style={styles.helper}>Your original lead source stays unchanged. You can review and remove imported records from Settings.</Text></>}</ScrollView></ScreenContainer>;
}

function PreviewRow({ label, value, warning = false }: { label: string; value: string; warning?: boolean }) { return <View style={styles.previewRow}><Text style={styles.previewLabel}>{label}</Text><Text style={[styles.previewValue, warning && styles.previewWarning]}>{value}</Text></View>; }

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 34 },
  header: { flexDirection: "row", alignItems: "center", gap: 11, marginBottom: 22 },
  headerCopy: { flex: 1 },
  eyebrow: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 1.3, marginBottom: 4 },
  title: { color: COLORS.ink, fontSize: 23, fontWeight: "800", letterSpacing: -0.4 },
  stepBadge: { backgroundColor: "#EAF7FA", borderRadius: 8, paddingHorizontal: 9, paddingVertical: 7 },
  stepText: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 0.9 },
  hero: { backgroundColor: COLORS.ink, borderRadius: 20, padding: 18, marginBottom: 24 },
  heroIcon: { width: 46, height: 46, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#193752", marginBottom: 15 },
  heroTitle: { color: "#fff", fontSize: 21, lineHeight: 27, fontWeight: "800", letterSpacing: -0.5 },
  heroBody: { color: "#B9C7D4", fontSize: 12, lineHeight: 18, marginTop: 8 },
  sectionTitle: { color: COLORS.ink, fontSize: 16, fontWeight: "800", marginBottom: 11 },
  sourceGrid: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginBottom: 21 },
  sourceCard: { width: "48.5%", minHeight: 105, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 15, padding: 12, position: "relative" },
  sourceCardActive: { borderColor: COLORS.cyan, backgroundColor: "#F1FCFE" },
  sourceIcon: { width: 31, height: 31, borderRadius: 10, backgroundColor: "#F2F5F8", alignItems: "center", justifyContent: "center", marginBottom: 9 },
  sourceIconActive: { backgroundColor: "#D7F4F8" },
  sourceLabel: { color: COLORS.ink, fontSize: 12, fontWeight: "800" },
  sourceCount: { color: COLORS.slate, fontSize: 10, marginTop: 4 },
  sourceCheck: { position: "absolute", top: 11, right: 11 },
  previewCard: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 17, padding: 15, marginBottom: 15 },
  previewHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  previewTitle: { color: COLORS.ink, fontSize: 14, fontWeight: "800" },
  previewReady: { flexDirection: "row", alignItems: "center", gap: 5 },
  readyDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.green },
  readyText: { color: COLORS.green, fontSize: 9, fontWeight: "900", letterSpacing: 0.8 },
  previewRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 12 },
  previewLabel: { color: COLORS.slate, fontSize: 11 },
  previewValue: { color: COLORS.ink, fontSize: 11, fontWeight: "800", maxWidth: "56%", textAlign: "right" },
  previewWarning: { color: COLORS.amber },
  primaryButton: { minHeight: 50, borderRadius: 14, backgroundColor: COLORS.cyan, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  primaryButtonText: { color: "#fff", fontSize: 13, fontWeight: "800" },
  helper: { color: COLORS.slate, fontSize: 10, lineHeight: 15, textAlign: "center", marginTop: 12, paddingHorizontal: 13 },
  successState: { alignItems: "center", paddingTop: 64 },
  successIcon: { width: 68, height: 68, borderRadius: 24, backgroundColor: COLORS.green, alignItems: "center", justifyContent: "center", marginBottom: 17 },
  successTitle: { color: COLORS.ink, fontSize: 21, fontWeight: "800", textAlign: "center" },
  successBody: { color: COLORS.slate, fontSize: 13, lineHeight: 20, textAlign: "center", marginTop: 8, marginBottom: 23 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.985 }] },
});
