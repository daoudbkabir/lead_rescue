import { describe, expect, it } from "vitest";

import { formatBDT, leads, recoveryStages } from "../lib/leadrescue-data";

describe("LeadRescue recovery data", () => {
  it("formats recovered revenue in Bangladeshi taka", () => {
    expect(formatBDT(482500)).toBe("৳4,82,500");
  });

  it("keeps the recovery funnel ordered from total leads to recovered revenue", () => {
    expect(recoveryStages.map((stage) => stage.label)).toEqual([
      "Total Leads",
      "At Risk",
      "High Intent",
      "Followed Up",
      "Recovered",
    ]);
    expect(recoveryStages[0].width).toBeGreaterThan(recoveryStages[4].width);
  });

  it("contains high-intent opportunities for the priority queue", () => {
    const highIntentLeads = leads.filter((lead) => lead.intent === "HIGH");
    expect(highIntentLeads.length).toBeGreaterThan(2);
    expect(highIntentLeads.every((lead) => lead.intentScore >= 85)).toBe(true);
  });

  it("surfaces only active recovery work in the overview queue", () => {
    const priorityQueue = leads.filter((lead) => lead.status === "At Risk" || lead.status === "Hot");
    expect(priorityQueue).toHaveLength(3);
    expect(priorityQueue.every((lead) => lead.status !== "Recovered" && lead.status !== "Lost")).toBe(true);
  });
});
