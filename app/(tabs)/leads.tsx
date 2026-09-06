import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import { AssignSheet, FilterChips, LeadCard, SearchField, SectionHeader, TopBar } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";
import { leads, Lead } from "@/lib/leadrescue-data";

const filters = ["All", "Hot", "Warm", "At Risk", "Recovered", "Lost"];
const COLORS = { canvas: "#F6F8FB", slate: "#617083", ink: "#071A2F" };

export default function LeadsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [assignVisible, setAssignVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filtered = useMemo(() => leads.filter((lead) => {
    const matchesFilter = filter === "All" || lead.status === filter;
    const haystack = `${lead.name} ${lead.phone} ${lead.email} ${lead.product} ${lead.source}`.toLowerCase();
    return matchesFilter && haystack.includes(query.toLowerCase());
  }), [filter, query]);

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
            <TopBar title="All leads" subtitle={`${filtered.length} of 12,480 leads · updated just now`} onSearch={() => {}} onNotification={() => Alert.alert("Notifications", "You have 3 recovery updates waiting for review.")} />
            <View style={styles.headerIntro}><Text style={styles.introTitle}>Find the next recovery opportunity.</Text><Text style={styles.introBody}>AI intent scoring helps your team focus where the likelihood and value are highest.</Text></View>
            <SearchField value={query} onChangeText={setQuery} />
            <View style={styles.filterBlock}><SectionHeader title="Filter by status" /><FilterChips options={filters} selected={filter} onChange={setFilter} /></View>
            <View style={styles.resultRow}><Text style={styles.resultLabel}>{filter === "All" ? "Priority view" : `${filter} leads`}</Text><Text style={styles.resultCount}>{filtered.length} records</Text></View>
          </View>
        }
        renderItem={({ item }) => <LeadCard lead={item} onPress={() => openLead(item)} onAssign={() => assignLead(item)} />}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>No leads match this view</Text><Text style={styles.emptyBody}>Try another status or search by name, product, or source.</Text></View>}
      />
      <AssignSheet visible={assignVisible} lead={selectedLead} onClose={() => setAssignVisible(false)} onAssign={(agent) => Alert.alert("Task assigned", `${selectedLead?.name ?? "Lead"} is now assigned to ${agent}.`)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 30 },
  headerIntro: { padding: 16, borderRadius: 16, backgroundColor: "#EAF7FA", marginBottom: 13 },
  introTitle: { color: COLORS.ink, fontSize: 16, fontWeight: "800" },
  introBody: { color: COLORS.slate, fontSize: 12, lineHeight: 18, marginTop: 5 },
  filterBlock: { marginTop: 21, marginBottom: 15 },
  resultRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  resultLabel: { color: COLORS.ink, fontSize: 15, fontWeight: "800" },
  resultCount: { color: COLORS.slate, fontSize: 11 },
  empty: { alignItems: "center", paddingVertical: 60, paddingHorizontal: 25 },
  emptyTitle: { color: COLORS.ink, fontSize: 16, fontWeight: "800" },
  emptyBody: { color: COLORS.slate, fontSize: 13, textAlign: "center", lineHeight: 19, marginTop: 7 },
});
