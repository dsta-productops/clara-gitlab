export type Phase = "research" | "design" | "test";

export interface Artefact {
  slug: string;
  title: string;
  phase: Phase;
  tagline: string;
  filesTo: string;
}

export const phases: Record<Phase, { label: string; description: string }> = {
  research: {
    label: "Research",
    description:
      "Surface what's known, gather fresh evidence, and translate it into structured specs — personas, journeys, syntheses, PRDs, and capability specs.",
  },
  design: {
    label: "Design",
    description:
      "Turn specs into artefacts that operators can react to before any platform is built.",
  },
  test: {
    label: "Test",
    description:
      "Plan how to validate that the design meets the operational success criteria — in usability sessions, walk-throughs, or rehearsals.",
  },
};

export const artefacts: Artefact[] = [
  {
    slug: "prior-knowledge-summariser",
    title: "Prior-knowledge summariser",
    phase: "research",
    tagline:
      "Surface what past programmes already learned about a topic — before starting fresh research.",
    filesTo: "Knowledge Base/{track}/Prior-knowledge/{topic}",
  },
  {
    slug: "heuristic-evaluator",
    title: "Heuristic evaluator",
    phase: "research",
    tagline:
      "Run a Nielsen heuristic usability evaluation of an existing or competitor product — from screenshots, a URL, or a deck — into a scored, evidence-anchored report.",
    filesTo: "Knowledge Base/{track}/Heuristic-evaluations/{product-name}",
  },
  {
    slug: "interview-guide-generator",
    title: "Interview-guide generator",
    phase: "research",
    tagline:
      "Generate a field-ready interview guide targeted at the data the team actually needs to surface.",
    filesTo: "Knowledge Base/{track}/Interview-guides/{topic}",
  },
  {
    slug: "research-synthesiser",
    title: "Research synthesiser",
    phase: "research",
    tagline:
      "Turn interview transcripts and field notes into a synthesis of themes, friction, problem statement, and success criteria.",
    filesTo: "Knowledge Base/{track}/Research-synthesis",
  },
  {
    slug: "persona-generator",
    title: "Persona generator",
    phase: "research",
    tagline: "Draft a persona from research evidence — every claim sourced.",
    filesTo: "Knowledge Base/{track}/Personas/{persona-name}",
  },
  {
    slug: "journey-map-drafter",
    title: "Journey-map drafter",
    phase: "research",
    tagline:
      "Draft a current-state journey for a persona — stages, touchpoints, emotions, friction, opportunities.",
    filesTo: "Knowledge Base/{track}/Journeys/{journey-scope}",
  },
  {
    slug: "service-blueprint-drafter",
    title: "Service-blueprint drafter",
    phase: "research",
    tagline:
      "Extend a journey into a service blueprint — making the back-stage systems, processes, and teams visible.",
    filesTo: "Knowledge Base/{track}/Service-blueprints/{journey-scope}",
  },
  {
    slug: "operational-scenario-generator",
    title: "Operational-scenario generator",
    phase: "research",
    tagline:
      "Draft an operational scenario from operator research and a capability brief — operator, environment, decisions, failure modes.",
    filesTo: "Knowledge Base/{track}/Operational-scenarios/{scenario-title}",
  },
  {
    slug: "capability-spec-generator",
    title: "Capability-spec generator",
    phase: "research",
    tagline:
      "Turn an operational scenario into measurable capability requirements — functional, performance, environmental.",
    filesTo: "Knowledge Base/{track}/Capability-specs/{capability-name}",
  },
  {
    slug: "mission-thread-mapper",
    title: "Mission-thread mapper",
    phase: "research",
    tagline:
      "Map the end-to-end mission thread — actors, systems, and data flows that produce an operational outcome.",
    filesTo: "Knowledge Base/{track}/Mission-threads/{mission-task}",
  },
  {
    slug: "problem-impact-ranker",
    title: "Problem-impact ranker",
    phase: "research",
    tagline:
      "Rank captured problems by impact — reach, severity, evidence, and leverage — into a tiered queue that says which problem to build for first.",
    filesTo: "Knowledge Base/{track}/Problem-impact-analysis",
  },
  {
    slug: "prd-generator",
    title: "PRD generator",
    phase: "research",
    tagline:
      "Draft a first-pass PRD from research synthesis and stakeholder context — clarifying questions where inputs are thin.",
    filesTo: "Knowledge Base/{track}/PRDs/{prd-title}",
  },
  {
    slug: "product-strategy-one-pager",
    title: "Product strategy one-pager",
    phase: "research",
    tagline:
      "Turn the PRD into the PMP product strategy one-pager — filled from the Knowledge Base, with CLARA asking you for costs, owners, and other gaps.",
    filesTo: "Knowledge Base/{track}/One-pagers/{product-name}",
  },
  {
    slug: "before-after-journey-mapper",
    title: "Before/after journey mapper",
    phase: "design",
    tagline:
      "Lay today's journey beside the future-state with the product — phase by phase, each tagged with the ranked problems it addresses.",
    filesTo: "Knowledge Base/{track}/Before-after-journeys/{journey-scope}",
  },
  {
    slug: "capability-storyboard-scripter",
    title: "Capability-storyboard scripter",
    phase: "design",
    tagline:
      "Script a visual storyboard of a capability in use — beat-by-beat panels that turn an operational scenario into something operators can react to before any platform is acquired.",
    filesTo: "Knowledge Base/{track}/Capability-storyboards/{storyboard-title}",
  },
  {
    slug: "test-plan-generator",
    title: "Test-plan generator",
    phase: "test",
    tagline:
      "Draft a complete test plan — objective, scenarios, participants, measurement, analysis, and validity risks — from a PRD and its success criteria.",
    filesTo: "Knowledge Base/{track}/Test-plans/{test-name}",
  },
];
