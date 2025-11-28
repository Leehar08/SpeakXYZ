import { AnalysisResult } from "./types";

export const SAMPLE_TRANSCRIPT = `
[00:00:00] Mark: Alright everyone, let's get started. The main goal today is to finalize the Q3 marketing budget.
[00:00:15] Sarah: I've reviewed the numbers. We're currently overspending on social media ads by about 15%. I think we need to cut back there.
[00:00:30] David: I disagree, Sarah. Social media is our biggest driver of leads right now. If we cut the budget, we risk missing our revenue targets.
[00:00:45] Mark: Okay, valid points. David, do we have data on the ROI for the Instagram campaign specifically?
[00:00:55] David: Yes, it's performing at a 4x ROAS. LinkedIn is lagging behind at 1.5x.
[00:01:05] Sarah: That helps. Maybe we shift the LinkedIn budget to Instagram? That way we optimize without increasing the total spend.
[00:01:15] Mark: I like that idea. Let's make that a decision. Sarah, can you draft the reallocation plan by Friday?
[00:01:25] Sarah: Sure thing. I'll have it ready.
[00:01:30] Mark: Great. Also, are there any risks with the new vendor for print materials?
[00:01:35] David: Yeah, they missed the deadline last week. I'm worried about the upcoming trade show.
[00:01:45] Mark: Okay, David, please follow up with them today. If they can't guarantee delivery, we stick with the old vendor.
`;

export const EMPTY_RESULT: AnalysisResult = {
  clean_transcript: "",
  speakers: {},
  summary: {
    purpose: "",
    key_points: [],
    decisions: [],
    action_items: [],
    risks: [],
    next_steps: []
  },
  dashboard: {
    participants: 0,
    talk_time_distribution: {},
    sentiment_overview: { positive: 0, neutral: 0, negative: 0 },
    topics_discussed: [],
    decision_points: [],
    action_items: [],
    keywords: [],
    meeting_summary_score: 0
  }
};
