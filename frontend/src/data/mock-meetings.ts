import type { Meeting } from "@/types/analysis";

export const mockMeetings: Meeting[] = [
  {
    id: "mtg-001",
    title: "Weekly Engineering Standup",
    date: "June 21, 2026",
    time: "10:00 AM",
    duration: "45 min",
    participants: ["Alice Chen", "Bob Martinez", "Sarah Kim", "David Park"],
    summary:
      "The engineering team reviewed sprint progress on the report generator project. Backend endpoints are complete and testing has begun. Frontend dashboard components are on track for end of week. The team identified a blocking dependency on the auth service that needs resolution before the next sprint.",
    tasks: [
      {
        task: "Resolve auth service blocking dependency",
        priority: "High",
        description:
          "Investigate and fix the authentication service issue blocking the API integration pipeline.",
        date: "June 23, 2026",
        time: "9:00 AM",
        duration: "3 hours",
      },
      {
        task: "Complete frontend dashboard component tests",
        priority: "Medium",
        description:
          "Write and run integration tests for the new dashboard widget components.",
        date: "June 22, 2026",
        time: "2:00 PM",
        duration: "2 hours",
      },
      {
        task: "Update sprint board with current status",
        priority: "Low",
        description: "Move completed tickets to done and update remaining estimates.",
        date: "June 21, 2026",
        time: "5:00 PM",
        duration: "30 min",
      },
    ],
  },
  {
    id: "mtg-002",
    title: "Product Roadmap Q3 Planning",
    date: "June 18, 2026",
    time: "2:00 PM",
    duration: "1 hour 30 min",
    participants: ["Alice Chen", "Mark Thompson", "Lisa Wang", "Bob Martinez"],
    summary:
      "Product and engineering leadership aligned on Q3 priorities. The focus will be on launching the AI insights feature, improving onboarding flow, and addressing technical debt. Three major epics were defined with tentative timelines. Resource allocation was discussed, with two engineers being reassigned to the insights feature team.",
    tasks: [
      {
        task: "Draft Q3 roadmap document for stakeholder review",
        priority: "High",
        description:
          "Compile the agreed-upon epics, timelines, and resource allocation into a formal roadmap doc.",
        date: "June 20, 2026",
        time: "10:00 AM",
        duration: "4 hours",
      },
      {
        task: "Create Jira epics for Q3 initiatives",
        priority: "High",
        description:
          "Set up the three main epics with descriptions, labels, and assigned team members.",
        date: "June 19, 2026",
        time: "11:00 AM",
        duration: "1 hour",
      },
      {
        task: "Schedule onboarding flow audit session",
        priority: "Medium",
        description:
          "Book a cross-functional session to audit the current onboarding experience and identify friction points.",
        date: "June 24, 2026",
        time: "3:00 PM",
        duration: "1 hour",
      },
    ],
  },
  {
    id: "mtg-003",
    title: "Client Onboarding — Acme Corp",
    date: "June 15, 2026",
    time: "11:00 AM",
    duration: "1 hour",
    participants: ["Sarah Kim", "John Davis", "Emily Rodriguez"],
    summary:
      "Kickoff call with Acme Corp to onboard them onto the Brievo platform. Walked through key features, integration options, and the implementation timeline. Client expressed interest in the calendar sync and custom summary templates. A follow-up demo was scheduled for next week to showcase the AI task extraction in action.",
    tasks: [
      {
        task: "Prepare custom demo environment for Acme Corp",
        priority: "High",
        description:
          "Set up a branded demo workspace with sample meeting transcripts relevant to Acme's use case.",
        date: "June 19, 2026",
        time: "9:00 AM",
        duration: "3 hours",
      },
      {
        task: "Send welcome email with onboarding checklist",
        priority: "Medium",
        description:
          "Email the client a step-by-step onboarding guide including setup instructions and support contacts.",
        date: "June 16, 2026",
        time: "10:00 AM",
        duration: "30 min",
      },
    ],
  },
  {
    id: "mtg-004",
    title: "Design Review — Dashboard v2",
    date: "June 12, 2026",
    time: "4:00 PM",
    duration: "1 hour",
    participants: ["Lisa Wang", "David Park", "Alice Chen"],
    summary:
      "Design team presented the v2 dashboard mockups. Key changes include a redesigned summary card layout, new task priority visualization, and a collapsible sidebar. Feedback was generally positive with requests for darker accent colors and improved mobile responsiveness. Final designs are expected by end of next week.",
    tasks: [
      {
        task: "Revise dashboard mockups with darker accent palette",
        priority: "Medium",
        description:
          "Update the accent color scheme to use deeper tones aligned with the brand guidelines.",
        date: "June 16, 2026",
        time: "1:00 PM",
        duration: "3 hours",
      },
      {
        task: "Create mobile-responsive breakpoints for dashboard",
        priority: "Medium",
        description:
          "Define and implement responsive layouts for tablet and mobile views of the v2 dashboard.",
        date: "June 18, 2026",
        time: "10:00 AM",
        duration: "4 hours",
      },
      {
        task: "Share final mockups with engineering for handoff",
        priority: "Low",
        description:
          "Export final Figma frames and schedule a design-engineering handoff session.",
        date: "June 20, 2026",
        time: "2:00 PM",
        duration: "1 hour",
      },
    ],
  },
  {
    id: "mtg-005",
    title: "Sprint 24 Retrospective",
    date: "June 10, 2026",
    time: "5:00 PM",
    duration: "1 hour",
    participants: ["Alice Chen", "Bob Martinez", "Sarah Kim", "David Park", "Mark Thompson"],
    summary:
      "Team reflected on Sprint 24. Wins include shipping the transcript input feature and completing the auth refactor. Areas for improvement: estimation accuracy on frontend tasks and reducing context switching between sprints. Action items were assigned to address the estimation gap and introduce a mid-sprint check-in.",
    tasks: [
      {
        task: "Introduce mid-sprint check-in meeting",
        priority: "Medium",
        description:
          "Add a 15-minute mid-sprint sync to surface blockers early and adjust scope if needed.",
        date: "June 12, 2026",
        time: "10:00 AM",
        duration: "30 min",
      },
      {
        task: "Create estimation guidelines document",
        priority: "Low",
        description:
          "Document best practices for estimating frontend and backend task complexity to improve accuracy.",
        date: "June 14, 2026",
        time: "11:00 AM",
        duration: "2 hours",
      },
    ],
  },
];
