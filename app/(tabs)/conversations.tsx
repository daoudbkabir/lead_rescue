import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Avatar, IconButton, IntentPill, SectionHeader, StatusChip, TopBar } from "@/components/leadrescue-ui";
import { ScreenContainer } from "@/components/screen-container";
import { leads, Lead } from "@/lib/leadrescue-data";

const COLORS = { ink: "#071A2F", slate: "#617083", cyan: "#12B8D6", green: "#1F9D68", amber: "#D68A18", surface: "#FFFFFF", line: "#DCE4EC", canvas: "#F6F8FB" };
const conversationLeads = leads.filter((lead) => lead.status !== "Cold");

export default function ConversationsScreen() {
  const [selected, setSelected] = useState<Lead | null>(null);
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <ScreenContainer className="flex-1" edges={["top", "left", "right"]}>
      <FlatList
        data={conversationLeads}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={<View><TopBar title="Conversations" subtitle="Every reply is a chance to recover revenue." onSearch={() => Alert.alert("Search inbox", "Search is ready for names, products, phone numbers, and message content.")} onNotification={() => Alert.alert("Inbox updates", "You have 2 unread high-intent conversations.")} /><View style={styles.inboxHero}><View style={styles.inboxHeroIcon}><MaterialIcons name="forum" size={20} color={COLORS.cyan} /></View><View style={styles.inboxHeroCopy}><Text style={styles.inboxHeroTitle}>2 urgent replies need attention</Text><Text style={styles.inboxHeroBody}>Respond within the next hour to protect conversion momentum.</Text></View></View><SectionHeader title="Needs a response" action="Mark all read" onPress={() => Alert.alert("Inbox updated", "All conversations are marked as read.")} /></View>}
        renderItem={({ item, index }) => <ConversationRow lead={item} unread={index < 2} onPress={() => { setSelected(item); setSent(false); setReply(""); }} />}
        ListFooterComponent={<View style={styles.footer}><Text style={styles.footerLabel}>ALL CAUGHT UP</Text><Text style={styles.footerText}>Older conversations are safely archived after 30 days.</Text></View>}
      />
      <Modal visible={Boolean(selected)} animationType="slide" onRequestClose={() => setSelected(null)}>
        {selected ? <View style={styles.modalScreen}><View style={styles.modalHeader}><IconButton name="arrow-back" label="Close conversation" onPress={() => setSelected(null)} /><View style={styles.modalHeaderCopy}><Text style={styles.modalTitle}>{selected.name}</Text><Text style={styles.modalMeta}>{selected.product} · {selected.phone}</Text></View><StatusChip status={selected.status} /></View><View style={styles.thread}><View style={styles.threadDate}><Text style={styles.threadDateText}>TODAY · AI SUMMARY</Text></View><View style={styles.aiBubble}><Text style={styles.aiBubbleLabel}>AI CONTEXT</Text><Text style={styles.aiBubbleText}>Lead has shown high intent. Answer the product question directly, then offer a low-friction next step.</Text></View><Bubble mine={false} text={selected.lastMessage} time="09:42" /><Bubble mine={true} text={sent ? "Thanks for the details. I’d like to confirm the order." : "I can share the full details if you still have questions."} time={sent ? "09:45" : "Yesterday"} /></View><View style={styles.suggestion}><MaterialIcons name="auto-awesome" size={15} color={COLORS.cyan} /><Text style={styles.suggestionText}>Suggested: “Hi {selected.name.split(" ")[0]}, yes, we have this ready. Would you like me to reserve it for you today?”</Text></View><View style={styles.composer}><TextInput value={reply} onChangeText={setReply} placeholder="Write a follow-up..." placeholderTextColor="#8A98A8" style={styles.composerInput} multiline /><Pressable accessibilityRole="button" onPress={() => { setSent(true); setReply(""); }} style={({ pressed }) => [styles.sendButton, pressed && styles.pressed]}><MaterialIcons name="send" size={18} color="#fff" /></Pressable></View></View> : null}
      </Modal>
    </ScreenContainer>
  );
}

function ConversationRow({ lead, unread, onPress }: { lead: Lead; unread: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`Open conversation with ${lead.name}`} onPress={onPress} style={({ pressed }) => [styles.conversationRow, pressed && styles.pressed]}><Avatar initials={lead.initials} size={44} /><View style={styles.conversationCopy}><View style={styles.conversationTitleRow}><Text style={[styles.conversationName, unread && styles.unreadText]}>{lead.name}</Text><Text style={styles.conversationTime}>{lead.lastActivity}</Text></View><Text style={styles.conversationProduct}>{lead.product}</Text><Text numberOfLines={1} style={[styles.conversationPreview, unread && styles.unreadText]}>{lead.lastMessage}</Text><View style={styles.conversationMeta}><IntentPill score={lead.intentScore} intent={lead.intent} /><Text style={styles.channelLabel}>{lead.source}</Text></View></View>{unread ? <View style={styles.unreadDot} /> : <MaterialIcons name="chevron-right" size={18} color={COLORS.line} />}</Pressable>;
}

function Bubble({ mine, text, time }: { mine: boolean; text: string; time: string }) { return <View style={[styles.bubbleWrap, mine && styles.bubbleWrapMine]}><View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleThem]}><Text style={[styles.bubbleText, mine && styles.bubbleTextMine]}>{text}</Text><Text style={[styles.bubbleTime, mine && styles.bubbleTimeMine]}>{time}</Text></View></View>; }

const styles = StyleSheet.create({
  content: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 30 },
  inboxHero: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 16, padding: 15, backgroundColor: "#EAF7FA", marginBottom: 22 },
  inboxHeroIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: "#D7F4F8", alignItems: "center", justifyContent: "center" },
  inboxHeroCopy: { flex: 1 },
  inboxHeroTitle: { color: COLORS.ink, fontSize: 15, fontWeight: "800" },
  inboxHeroBody: { color: COLORS.slate, fontSize: 11, lineHeight: 17, marginTop: 4 },
  conversationRow: { flexDirection: "row", alignItems: "flex-start", gap: 11, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  conversationCopy: { flex: 1 },
  conversationTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  conversationName: { color: COLORS.ink, fontSize: 13, fontWeight: "700" },
  unreadText: { fontWeight: "800" },
  conversationTime: { color: COLORS.slate, fontSize: 10 },
  conversationProduct: { color: COLORS.cyan, fontSize: 10, fontWeight: "700", marginTop: 3 },
  conversationPreview: { color: COLORS.slate, fontSize: 11, marginTop: 5 },
  conversationMeta: { flexDirection: "row", alignItems: "center", gap: 9, marginTop: 7 },
  channelLabel: { color: COLORS.slate, fontSize: 10 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.cyan, marginTop: 17 },
  footer: { alignItems: "center", paddingVertical: 30 },
  footerLabel: { color: COLORS.green, fontSize: 9, fontWeight: "900", letterSpacing: 1.2 },
  footerText: { color: COLORS.slate, fontSize: 11, marginTop: 6 },
  modalScreen: { flex: 1, backgroundColor: COLORS.canvas, paddingTop: 55, paddingHorizontal: 20, paddingBottom: 20 },
  modalHeader: { flexDirection: "row", alignItems: "center", gap: 10, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  modalHeaderCopy: { flex: 1 },
  modalTitle: { color: COLORS.ink, fontSize: 17, fontWeight: "800" },
  modalMeta: { color: COLORS.slate, fontSize: 10, marginTop: 3 },
  thread: { flex: 1, paddingTop: 18 },
  threadDate: { alignItems: "center", marginBottom: 16 },
  threadDateText: { color: COLORS.slate, fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  aiBubble: { alignSelf: "stretch", backgroundColor: "#EAF7FA", borderRadius: 14, padding: 12, marginBottom: 17 },
  aiBubbleLabel: { color: COLORS.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  aiBubbleText: { color: COLORS.ink, fontSize: 12, lineHeight: 18, marginTop: 5 },
  bubbleWrap: { alignItems: "flex-start", marginBottom: 10 },
  bubbleWrapMine: { alignItems: "flex-end" },
  bubble: { maxWidth: "83%", borderRadius: 16, paddingHorizontal: 13, paddingVertical: 10 },
  bubbleThem: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderBottomLeftRadius: 5 },
  bubbleMine: { backgroundColor: COLORS.ink, borderBottomRightRadius: 5 },
  bubbleText: { color: COLORS.ink, fontSize: 12, lineHeight: 18 },
  bubbleTextMine: { color: "#fff" },
  bubbleTime: { color: COLORS.slate, fontSize: 9, marginTop: 5 },
  bubbleTimeMine: { color: "#B9C7D4" },
  suggestion: { flexDirection: "row", gap: 7, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 13, padding: 11, marginBottom: 10 },
  suggestionText: { flex: 1, color: COLORS.slate, fontSize: 10, lineHeight: 15 },
  composer: { flexDirection: "row", alignItems: "flex-end", gap: 8, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line, borderRadius: 15, padding: 7 },
  composerInput: { flex: 1, minHeight: 38, maxHeight: 90, color: COLORS.ink, fontSize: 12, paddingHorizontal: 8, paddingTop: 9 },
  sendButton: { width: 38, height: 38, borderRadius: 12, backgroundColor: COLORS.cyan, alignItems: "center", justifyContent: "center" },
  pressed: { opacity: 0.76, transform: [{ scale: 0.985 }] },
});
