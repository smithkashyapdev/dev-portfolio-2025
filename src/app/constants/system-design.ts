/** Data model for the UPI system-design showcase animation. */

export type FlowNode = {
  id: string;
  label: string;
  sub: string;
  group: 'frontend' | 'edge' | 'backend' | 'messaging' | 'data' | 'external';
  lane: 'frontend' | 'backend';
  icon: string; // emoji glyph
};

export type TimelineStep = {
  t: string; // relative time marker
  title: string;
  detail: string;
};

/** Left-to-right layered flow: Frontend -> Edge -> Backend -> Messaging/Data -> NPCI. */
export const FLOW_NODES: FlowNode[] = [
  // --- Frontend lane (client request) ---
  { id: 'app', label: 'Mobile App', sub: 'React Native · Storybook UI · cloud-driven JSON screens', group: 'frontend', lane: 'frontend', icon: '📱' },
  { id: 'security', label: 'Device Security', sub: 'Root/tamper check · Play Integrity · SSL pinning · encryption', group: 'frontend', lane: 'frontend', icon: '🔐' },
  { id: 'token', label: 'Token & Session', sub: 'Access/refresh tokens · request signing', group: 'frontend', lane: 'frontend', icon: '🪙' },
  { id: 'dns', label: 'DNS', sub: 'Route resolution', group: 'edge', lane: 'frontend', icon: '🧭' },
  { id: 'cdn', label: 'CloudFront', sub: 'CDN edge caching · TLS', group: 'edge', lane: 'frontend', icon: '🌐' },
  // --- Backend lane (server processing) ---
  { id: 'gw', label: 'API Gateway', sub: 'Auth · token validation · rate limiting', group: 'edge', lane: 'backend', icon: '🚪' },
  { id: 'lb', label: 'Load Balancer', sub: 'Traffic distribution', group: 'edge', lane: 'backend', icon: '⚖️' },
  { id: 'svc', label: 'Microservices', sub: 'Node.js + Spring Boot · Docker · Kubernetes', group: 'backend', lane: 'backend', icon: '⚙️' },
  { id: 'npci', label: 'NPCI', sub: 'UPI switch · CL integration', group: 'external', lane: 'backend', icon: '🏦' },
  { id: 'kafka', label: 'Kafka', sub: 'Payment confirmation · event-driven', group: 'messaging', lane: 'backend', icon: '📨' },
  { id: 'db', label: 'Data Layer', sub: 'PostgreSQL + MongoDB · CQRS · sharding', group: 'data', lane: 'backend', icon: '🗄️' },
  { id: 'sqs', label: 'SQS + Workers', sub: 'Bulk writes · async notifications', group: 'messaging', lane: 'backend', icon: '📥' },
];

/** Horizontal payment timeline (what happens after the user taps "Pay"). */
export const TIMELINE: TimelineStep[] = [
  { t: '0 ms', title: 'Tap Pay', detail: 'User confirms with biometric/UPI PIN on the React Native app.' },
  { t: '15 ms', title: 'Device integrity', detail: 'Root/tamper check, Play Integrity + Talsec, payload encrypted & SSL-pinned.' },
  { t: '40 ms', title: 'Edge + Auth', detail: 'DNS → CloudFront → API Gateway validates token, applies rate limiting.' },
  { t: '70 ms', title: 'Route to service', detail: 'Load balancer → payment microservice (Node.js / Spring Boot on Kubernetes).' },
  { t: '120 ms', title: 'NPCI switch', detail: 'Request sent to NPCI via CL integration; debit/credit orchestrated.' },
  { t: '260 ms', title: 'Confirmation event', detail: 'NPCI response published to Kafka for reliable, decoupled processing.' },
  { t: '300 ms', title: 'Persist (CQRS)', detail: 'Write model to PostgreSQL + MongoDB; sharded by location/hash.' },
  { t: '340 ms', title: 'Notify async', detail: 'SQS fans out push/SMS/email via workers; UI updated in real time.' },
];

/** Non-functional concerns highlighted as chips. */
export const CONCERNS: string[] = [
  'CAP: AP for reads, CP for payment writes',
  'Write-heavy · high TPS tuning',
  'Hash + location-based sharding',
  'Event-driven notifications',
  'OpenTelemetry tracing',
  'Kibana dashboards & alerts',
  'Horizontal autoscaling (K8s)',
  'Idempotent, retry-safe transactions',
];
