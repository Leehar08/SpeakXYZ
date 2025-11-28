
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";
import { EMPTY_RESULT } from "../constants";

const SYSTEM_INSTRUCTION = `
You are a high-performance Meeting Intelligence Engine for 'Speak XYZ'. 
Your goal is to process meeting inputs (Audio or Text) into structured, professional JSON data.

You must perform the following tasks simultaneously:
1. **Transcription & Diarization:** 
   - If audio is provided, transcribe it accurately.
   - Identify unique speakers based on voice characteristics. 
   - Label them consistently (e.g., "Speaker 1", "Speaker 2") or use names if spoken.
   - Output the full transcript in the 'clean_transcript' field with speaker labels.
2. **Structured Meeting Summary:** 
   - Extract purpose, key points, decisions, risks, and next steps.
   - Ensure 'action_items' is an array of objects with 'task', 'assigned_to', and 'deadline_if_any'.
3. **Analytics:** 
   - Calculate talk time percentage (approximate).
   - specific sentiment analysis (positive/neutral/negative count).
   - meeting quality score (0-100).

**Output Rules:**
- Return ONLY valid JSON.
- Follow the structure provided exactly.
- Do NOT include markdown code blocks (e.g., \`\`\`json ... \`\`\`).
- Ensure all arrays and objects are initialized, even if empty.
`;

const JSON_SCHEMA_EXAMPLE = `
{
  "clean_transcript": "[00:00] Speaker 1: Hello... [00:05] Speaker 2: Hi there...",
  "speakers": {
     "Speaker 1": "Name or Description of voice",
     "Speaker 2": "Name or Description of voice"
  },
  "summary": {
     "purpose": "The purpose of the meeting...",
     "key_points": ["Point 1", "Point 2"],
     "decisions": ["Decision 1"],
     "action_items": [
        {"task": "Task description", "assigned_to": "Name", "deadline_if_any": "Next Friday"}
     ],
     "risks": ["Risk 1"],
     "next_steps": ["Step 1"]
  },
  "dashboard": {
     "participants": 2,
     "talk_time_distribution": {
        "Speaker 1": 40,
        "Speaker 2": 60
     },
     "sentiment_overview": {
        "positive": 10,
        "neutral": 5,
        "negative": 2
     },
     "topics_discussed": ["Topic A", "Topic B"],
     "decision_points": ["Decision 1"],
     "action_items": [
        {"task": "Task description", "assigned_to": "Name", "deadline_if_any": "Next Friday"}
     ],
     "keywords": ["Keyword1", "Keyword2"],
     "meeting_summary_score": 85
  }
}
`;

// Helper to deep merge partial data with the empty result structure
// to ensure no missing keys cause UI crashes.
const sanitizeData = (data: any): AnalysisResult => {
  const safeData = JSON.parse(JSON.stringify(EMPTY_RESULT)); // Clone default

  if (!data) return safeData;

  // Merge top level fields
  safeData.clean_transcript = data.clean_transcript || "";
  safeData.speakers = data.speakers || {};

  // Merge Summary
  if (data.summary) {
    safeData.summary.purpose = data.summary.purpose || "No purpose detected.";
    safeData.summary.key_points = Array.isArray(data.summary.key_points) ? data.summary.key_points : [];
    safeData.summary.decisions = Array.isArray(data.summary.decisions) ? data.summary.decisions : [];
    safeData.summary.risks = Array.isArray(data.summary.risks) ? data.summary.risks : [];
    safeData.summary.next_steps = Array.isArray(data.summary.next_steps) ? data.summary.next_steps : [];
    safeData.summary.action_items = Array.isArray(data.summary.action_items) ? data.summary.action_items : [];
  }

  // Merge Dashboard
  if (data.dashboard) {
    safeData.dashboard.participants = typeof data.dashboard.participants === 'number' ? data.dashboard.participants : 0;
    safeData.dashboard.talk_time_distribution = data.dashboard.talk_time_distribution || {};
    
    if (data.dashboard.sentiment_overview) {
      safeData.dashboard.sentiment_overview.positive = data.dashboard.sentiment_overview.positive || 0;
      safeData.dashboard.sentiment_overview.neutral = data.dashboard.sentiment_overview.neutral || 0;
      safeData.dashboard.sentiment_overview.negative = data.dashboard.sentiment_overview.negative || 0;
    }

    safeData.dashboard.topics_discussed = Array.isArray(data.dashboard.topics_discussed) ? data.dashboard.topics_discussed : [];
    safeData.dashboard.decision_points = Array.isArray(data.dashboard.decision_points) ? data.dashboard.decision_points : [];
    safeData.dashboard.action_items = Array.isArray(data.dashboard.action_items) ? data.dashboard.action_items : [];
    safeData.dashboard.keywords = Array.isArray(data.dashboard.keywords) ? data.dashboard.keywords : [];
    safeData.dashboard.meeting_summary_score = typeof data.dashboard.meeting_summary_score === 'number' ? data.dashboard.meeting_summary_score : 50;
  }

  return safeData;
};

export const analyzeMeeting = async (input: { text?: string; audioData?: string; mimeType?: string }): Promise<AnalysisResult> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key not found");

    const ai = new GoogleGenAI({ apiKey });
    
    // gemini-2.5-flash is excellent for multimodal (audio) processing and faster than pro
    const model = "gemini-2.5-flash"; 

    let promptParts: any[] = [];
    
    if (input.audioData) {
      promptParts.push({
        inlineData: {
          mimeType: input.mimeType || 'audio/wav',
          data: input.audioData
        }
      });
      promptParts.push({
        text: `Listen to this meeting recording. Transcribe it speaker-by-speaker, then analyze it to generate the requested JSON structure.
        
        Output format (JSON ONLY):
        ${JSON_SCHEMA_EXAMPLE}`
      });
    } else if (input.text) {
      promptParts.push({
        text: `Analyze the following meeting transcript text.
      
        TRANSCRIPT:
        ${input.text}

        Output the result in the following JSON format (JSON ONLY):
        ${JSON_SCHEMA_EXAMPLE}`
      });
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: promptParts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.2,
      }
    });

    let responseText = response.text;
    if (!responseText) throw new Error("No response generated");

    // Robust JSON cleaning: remove markdown blocks if present
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    const rawData = JSON.parse(responseText);
    const sanitizedData = sanitizeData(rawData);
    
    return sanitizedData;

  } catch (error) {
    console.error("Analysis Failed:", error);
    throw error;
  }
};
