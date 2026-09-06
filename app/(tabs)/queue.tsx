import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import { AssignSheet, FilterChips, LeadCard, SectionHeader, TopBar } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";
import { leads, Lead } from "@/lib/leadrescue-data";

const COLORS = { ink: "#071A2F", slate: "#617083", cyan: "#12B8D6", green: "#1F9D68", amber: "#D68A18", surface: "#FFFFFF", line: "#DCE4EC" };
const queueFilters = ["All priority", "Follow-up due", "Unassigned", "Hot leads"];

export default function QueueScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState("All priority");
  const [assignVisible, setAssignVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const queue = useMemo(() => leads.filter((lead) => lead.status !== "Cold" && lead.status !== "Lost"), []);
  const filtered = useMemo(() => {
    if (filter === "Follow-up due") return queue.filter((lead) => lead.status === "At Risk");
    if (filter === "Unassigned") return queue.filter((lead) => lead.agent === "Unassigned");
    if (filter === "Hot leads") return queue.filter((lead) => lead.status === "Hot");
    return queue;
  }, [filter, queue]);
  const openLead = (lead: Lead) => router.push({ pathname: "/lead/[id]", params: { id: lead.id } });
  const assignLead = (lead: Lead) => { setSelectedLead(lead); setAssignVisible(true); };

  return (
    <ScreenContainer className="flex-1" edges={["top", "left", "right"]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <TopBar title="Recovery queue" subtitle="The work most likely to create revenue today." onSearch={() => router.push("/(tabs)/leads" as never)} onNotification={() => Alert.alert("Queue updates", "3 leads changed priority since your last visit.")} />
            <View style={styles.queueHero}><View style={styles.queueHeroIcon}><MaterialIcons name="bolt" size={21} color={COLORS.cyan} /></View><View style={styles.queueHeroCopy}><Text style={styles.queueHeroTitle}>৳1,24,000 is within reach</Text><Text style={styles.queueHeroBody}>84 high-intent leads have gone more than 48 hours without a follow-up.</Text></View></View>
            <SectionHeader title="Focus the queue" />
            <FilterChips options={queueFilters} selected={filter} onChange={setFilter} />
            <View style={styles.statsRow}><View style={styles.stat}><Text style={styles.statValue}>{filtered.length}</Text><Text style={styles.statLabel}>active tasks</Text></View><View style={styles.stat}><Text style={styles.statValue}>18h</Text><Text style={styles.statLabel}>oldest follow-up</Text></View><View style={styles.stat}><Text style={[styles.statValue, { color: COLORS.green }]}>78%</Text><Text style={styles.statLabel}>agent capacity</Text></View></View>
            <View style={styles.listHeader}><Text style={styles.listTitle}>Next best actions</Text><Text style={styles.listMeta}>Priority score ↓</Text></View>
          </View>
        }
        renderItem={({ item, index }) => <View><LeadCard lead={item} onPress={() => openLead(item)} onAssign={() => assignLead(item)} />{index === 0 ? <View style={styles.aiNote}><MaterialIcons name="auto-awesome" size={14} color={COLORS.cyan} /><Text style={styles.aiNoteText}>AI prioritizes intent, recency, and potential value.</Text></View> : null}</View>}
      />
      <AssignSheet visible={assignVisible} lead={selectedLead} onClose={() => setAssignVisible(false)} onAssign={(agent) => Alert.alert("Task assigned", `${selectedLead?.name ?? "Lead"} is now assigned to ${agent}.`)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 30 },
  queueHero: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#EAF7FA", borderRadius: 16, padding: 15, marginBottom: 21 },
  queueHeroIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: "#D7F4F8", alignItems: "center", justifyContent: "center" },
  queueHeroCopy: { flex: 1 },
  queueHeroTitle: { color: COLORS.ink, fontSize: 16, fontWeight: "800" },
  queueHeroBody: { color: COLORS.slate, fontSize: 11, lineHeight: 17, marginTop: 4 },
  statsRow: { flexDirection: "row", gap: 9, marginTop: 16, marginBottom: 21 },
  stat: { flex: 1, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 13, padding: 11 },
  statValue: { color: COLORS.ink, fontSize: 18, fontWeight: "800" },
  statLabel: { color: COLORS.slate, fontSize: 9, marginTop: 3 },
  listHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  listTitle: { color: COLORS.ink, fontSize: 15, fontWeight: "800" },
  listMeta: { color: COLORS.slate, fontSize: 10 },
  aiNote: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: -4, marginBottom: 10, paddingLeft: 8 },
  aiNoteText: { color: COLORS.slate, fontSize: 10 },
});
