export type LeadStatus = "Hot" | "Warm" | "Cold" | "At Risk" | "Recovered" | "Lost";
export type IntentLevel = "HIGH" | "MEDIUM" | "LOW";

export type Lead = {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  source: string;
  product: string;
  intentScore: number;
  intent: IntentLevel;
  lastActivity: string;
  potentialRevenue: number;
  status: LeadStatus;
  agent: string;
  agentInitials: string;
  lastMessage: string;
};

export const leads: Lead[] = [
  {
    id: "sarah-ahmed",
    name: "Sarah Ahmed",
    initials: "SA",
    phone: "+880 1712 334 920",
    email: "sarah.ahmed@email.com",
    source: "Facebook",
    product: "Premium Abaya",
    intentScore: 94,
    intent: "HIGH",
    lastActivity: "18h ago",
    potentialRevenue: 4500,
    status: "At Risk",
    agent: "Nusrat",
    agentInitials: "NS",
    lastMessage: "Is the black abaya available in medium?",
  },
  {
    id: "tanvir-hasan",
    name: "Tanvir Hasan",
    initials: "TH",
    phone: "+880 1819 772 104",
    email: "tanvir.hasan@email.com",
    source: "Website",
    product: "Galaxy S24",
    intentScore: 91,
    intent: "HIGH",
    lastActivity: "7h ago",
    potentialRevenue: 28000,
    status: "Hot",
    agent: "Rafi",
    agentInitials: "RF",
    lastMessage: "Can you confirm delivery to Uttara?",
  },
  {
    id: "mahi-rahman",
    name: "Mahi Rahman",
    initials: "MR",
    phone: "+880 1622 450 116",
    email: "mahi.rahman@email.com",
    source: "Instagram",
    product: "Digital Marketing Course",
    intentScore: 76,
    intent: "MEDIUM",
    lastActivity: "3d ago",
    potentialRevenue: 8000,
    status: "Warm",
    agent: "Unassigned",
    agentInitials: "UA",
    lastMessage: "I will check with my team and get back to you.",
  },
  {
    id: "fahim-karim",
    name: "Fahim Karim",
    initials: "FK",
    phone: "+880 1911 830 522",
    email: "fahim.karim@email.com",
    source: "WhatsApp",
    product: "Office Chair Pro",
    intentScore: 88,
    intent: "HIGH",
    lastActivity: "1d ago",
    potentialRevenue: 12500,
    status: "At Risk",
    agent: "Nusrat",
    agentInitials: "NS",
    lastMessage: "Please send the warranty details.",
  },
  {
    id: "nadia-islam",
    name: "Nadia Islam",
    initials: "NI",
    phone: "+880 1555 120 907",
    email: "nadia.islam@email.com",
    source: "Facebook",
    product: "Skincare Bundle",
    intentScore: 68,
    intent: "MEDIUM",
    lastActivity: "5d ago",
    potentialRevenue: 3200,
    status: "Cold",
    agent: "Rafi",
    agentInitials: "RF",
    lastMessage: "Thanks, I will think about it.",
  },
  {
    id: "arif-chowdhury",
    name: "Arif Chowdhury",
    initials: "AC",
    phone: "+880 1777 905 438",
    email: "arif.chowdhury@email.com",
    source: "Website",
    product: "Executive Desk",
    intentScore: 96,
    intent: "HIGH",
    lastActivity: "2h ago",
    potentialRevenue: 42000,
    status: "Recovered",
    agent: "Rafi",
    agentInitials: "RF",
    lastMessage: "Payment completed. Thank you for the quick response.",
  },
];

export const agents = [
  { name: "Nusrat Jahan", initials: "NS", status: "Available", queue: 18, recovered: 124500, response: "12m", color: "#D6F7F1" },
  { name: "Rafi Hasan", initials: "RF", status: "On follow-up", queue: 24, recovered: 98300, response: "18m", color: "#DCEBFF" },
  { name: "Mim Akter", initials: "MA", status: "Available", queue: 11, recovered: 76400, response: "21m", color: "#FCE8C7" },
  { name: "Sabbir Rahman", initials: "SR", status: "In training", queue: 7, recovered: 31200, response: "34m", color: "#E9E1FF" },
];

export const recoveryStages = [
  { label: "Total Leads", value: "12,480", width: 100, color: "#0A2948" },
  { label: "At Risk", value: "1,284", width: 82, color: "#1C6D90" },
  { label: "High Intent", value: "642", width: 66, color: "#12B8D6" },
  { label: "Followed Up", value: "418", width: 50, color: "#2BB58A" },
  { label: "Recovered", value: "326", width: 38, color: "#1F9D68" },
];

export const revenueBars = [62, 42, 70, 54, 78, 66, 92, 74, 86, 68, 88, 96];
export const monthlyRevenue = [218000, 248000, 276500, 310000, 356500, 482500];

export const formatBDT = (value: number) => `৳${value.toLocaleString("en-IN")}`;
