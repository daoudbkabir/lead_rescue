# LeadRescue Mobile Interface Design

## Product intent

LeadRescue is a focused revenue recovery workspace for Bangladesh-based SMEs. The mobile experience prioritizes the shortest path from a high-intent lead to a meaningful recovery action: identify the opportunity, understand why it is at risk, assign or contact the right person, and record the outcome. The app should feel like an operational iOS product rather than a generic CRM.

The central mobile message is **Recover Revenue. Create Opportunity.** The product loop is represented throughout the interface as **AI identifies → Youth recovers → Business earns**.

## Design principles

The app is designed for portrait orientation and one-handed usage. Primary actions sit within comfortable thumb reach, lists use large tap targets, and dense desktop tables become stacked lead cards with progressive disclosure. Navigation follows mainstream iOS conventions: a compact bottom tab bar for the highest-frequency destinations, native-feeling sheets for detail and creation flows, restrained motion, clear hierarchy, and visible state feedback.

The visual system uses a deep navy foundation, warm white surfaces, electric cyan for intelligence, green for recovered value, amber for due work, and red only for urgent or lost states. Cards use modest corner radii and crisp borders; depth is created with spacing and tonal contrast rather than heavy shadows or glass effects.

## Screen list

| Screen | Primary content and functionality |
|---|---|
| Overview | Greeting, recovered-revenue headline, KPI cards, revenue recovery chart, AI recovery insight, recovery funnel, and priority queue preview. CTA buttons open Import Leads and the full Recovery Queue. |
| Leads | Searchable lead list with status chips, intent score, source/product metadata, potential value, last activity, and assigned agent. Filter chips cover All, Hot, Warm, Cold, At Risk, Recovered, and Lost. |
| Lead detail | Lead identity, contact information, product/value, AI score explanation, activity timeline, follow-up history, assigned agent, and action bar for calling, messaging, assigning, marking recovered, or marking lost. |
| Recovery Queue | Ordered work queue for high-intent and overdue leads. Supports status filtering, assignment, due-time context, and a swipe-friendly action flow. |
| Conversations | Conversation list grouped by attention state with unread markers, latest message preview, channel label, and quick reply entry. |
| Conversation detail | Chat-style thread for a selected lead, lead context header, suggested AI follow-up message, composer, and status update actions. |
| Revenue | Recovered revenue summary, monthly trend, revenue by source/product, average recovery value, and recent recovered deals. |
| Analytics | Funnel conversion, intent distribution, response-time performance, agent productivity, and recovery-rate insights with period selector. |
| AI Insights | Actionable insight cards including neglected high-intent leads, predicted recoverable value, stale follow-ups, and suggested next-best actions. |
| Recovery Agents | Agent roster with availability, assigned queue, recovered value, response time, and performance ranking. |
| Agent detail | Agent profile, active assignments, completed recoveries, and reassign action. |
| Import Leads | Simple sheet with source selection, import summary, file picker affordance, and confirmation state. |
| Settings | Workspace profile, notification preferences, appearance, data/export, and account plan summary. |

## Primary navigation

The bottom tab bar contains **Overview**, **Queue**, **Leads**, **Conversations**, and **More**. The More screen exposes Revenue, Analytics, AI Insights, Recovery Agents, and Settings in a grouped list. This keeps the core daily workflow reachable with one hand while retaining the full product scope.

The top of each screen has a compact title row with a leading back control where appropriate, optional search, and a trailing action or notification button. The Overview screen uses a profile button and notification affordance. Detail screens are presented as pushed routes or bottom sheets, depending on the depth of the task.

## Key user flows

### Review and act on a high-intent lead

1. User opens **Overview** and sees the AI Recovery Insight card.
2. User taps **Review 84 Leads** and lands on **Recovery Queue** filtered to neglected high-intent leads.
3. User taps a lead card to open **Lead detail**.
4. User reviews the AI score explanation, value estimate, and last-contact timeline.
5. User taps **Message** or **Call**; the action is acknowledged with haptic/visual feedback.
6. User marks the follow-up complete or assigns the lead to a recovery agent.
7. The lead status changes in the queue and the dashboard recovered-work count updates.

### Assign a lead to a youth recovery agent

1. User opens **Recovery Queue** or **Lead detail**.
2. User taps **Assign agent**.
3. A bottom sheet lists available agents with availability, queue load, and recent recovery rate.
4. User selects an agent and confirms.
5. The lead shows the new assignee and the queue returns focus to the next highest-priority opportunity.

### Generate a follow-up plan

1. User opens the AI insight card.
2. User taps **Generate Follow-up Plan**.
3. A plan sheet shows recommended timing, channel, message angle, and expected recovery value.
4. User edits or accepts the suggested message.
5. User schedules the task or sends it immediately.

### Import leads

1. User taps **Import Leads** from Overview.
2. User selects a source such as Facebook, Shopify, WhatsApp, or CSV.
3. The app shows a preview count and duplicate-risk summary.
4. User confirms the import.
5. A success state reports the number of leads added and offers a direct route to the new recovery queue.

### Mark a lead recovered

1. User opens Lead detail from any lead card.
2. User taps **Mark recovered**.
3. A compact form asks for recovered value and optional product/order reference.
4. User confirms.
5. Success feedback updates the lead status and revenue totals and returns to the previous list.

## Component language

Reusable components include `MetricCard`, `StatusChip`, `IntentScore`, `LeadCard`, `InsightCard`, `RecoveryFunnel`, `RevenueChart`, `AgentRow`, `ConversationRow`, `FilterChip`, `SectionHeader`, `PrimaryButton`, `SecondaryButton`, `BottomSheet`, and `EmptyState`. Each component exposes a clear pressed, loading, empty, error, and completed state where relevant.

Lead cards should prioritize the name, potential value, intent, last activity, and next action. Secondary details such as source and product appear below in a compact metadata row. Use semantic labels and sufficient contrast for all chips and charts.

## Color choices

| Token | Color | Use |
|---|---|---|
| Ink navy | `#071A2F` | Brand, hero surfaces, navigation emphasis |
| Canvas | `#F6F8FB` | Main light background |
| Surface | `#FFFFFF` | Cards, sheets, list rows |
| Slate | `#617083` | Secondary text and metadata |
| Line | `#DCE4EC` | Dividers and card outlines |
| Intelligence cyan | `#12B8D6` | AI indicators, active navigation, score highlights |
| Recovery green | `#1F9D68` | Recovered revenue, success states |
| Priority amber | `#D68A18` | Follow-up due and medium-priority states |
| Urgent red | `#CF4C4C` | Lost, overdue, and destructive states only |

Typography uses a modern system-friendly sans-serif with strong editorial headings, compact numeric metrics, and line heights large enough to remain legible on small screens. Currency is displayed in Bangladeshi taka using `৳`, with thousands separators.

## Accessibility and ergonomics

All actionable controls use at least a 44pt visual/touch target. Color is never the only indicator of state; chips and labels include text. Charts include a short textual summary. Content remains readable with larger system font settings, and all interactive controls have accessibility labels. Primary bottom actions remain above the home indicator and are not hidden by the tab bar.
