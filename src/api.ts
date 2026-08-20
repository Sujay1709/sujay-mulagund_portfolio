/**
 * API handlers for live portfolio demos
 * These run on the client side (Vite dev server proxies to localhost endpoints)
 * In production, deploy to a real backend (Vercel Functions, Cloud Run, etc.)
 */

export async function regressionDemo() {
  /**
   * Model Regression Detection Demo
   * Returns: Array of test results showing detection in action
   */

  const results = [];

  // Simulate 3 test runs
  for (let i = 0; i < 3; i++) {
    await new Promise((r) => setTimeout(r, 500));

    const accuracy = 0.91 + Math.random() * 0.03;
    const confidence = 0.92 + Math.random() * 0.07;
    const rand = Math.random();

    results.push({
      timestamp: new Date(Date.now() - (2 - i) * 1000).toISOString(),
      accuracy: parseFloat(accuracy.toFixed(3)),
      confidence: parseFloat(confidence.toFixed(3)),
      drift: rand > 0.8 ? 'critical' : rand > 0.3 ? 'minor' : 'none',
      prediction:
        rand > 0.8
          ? '⚠ DRIFT DETECTED: Confidence dropped 12%, label shift +8%'
          : rand > 0.3
            ? '⟳ Minor variance detected, monitoring...'
            : '✓ Model stable, no regression detected',
    });
  }

  return results;
}

export async function ragQuery(query: string) {
  /**
   * RAG Query Demo
   * Simulates vector search + LLM retrieval
   * In production: Call your actual RAG backend
   */

  await new Promise((r) => setTimeout(r, 800));

  const responses: Record<string, string> = {
    rag: 'Retrieval-Augmented Generation combines vector search with LLM inference. My DocuMind system: (1) Chunks PDFs into 512-token segments, (2) Embeds with Ollama (384-dim), (3) Stores in ChromaDB, (4) Retrieves top-k by cosine similarity, (5) Reranks with cross-encoder (threshold ≥0.7), (6) Streams Gemini 2.5 Flash response with citations. E2E latency: ~800ms.',

    regression: 'LLM regression detection monitors 4 axes: (1) Label shift—when predictions diverge from historical distribution, (2) Confidence drift—when model certainty changes unexpectedly, (3) Semantic change—embeddings diverge from training distribution, (4) Reasoning divergence—explanation text becomes incoherent. Detection triggers on 2+ axes with statistical significance.',

    data: 'Data engineering at scale requires: (1) Schema validation on ingest, (2) Idempotent transformations (replay-safe), (3) Lineage tracking (data provenance), (4) Anomaly detection (z-score + IQR), (5) Incremental state (Delta Lake time-travel), (6) Monitoring (SLA dashboards, alert thresholds). My systems: PySpark ETL over 500K+ records with 0.5% error rate.',

    production: 'Production AI systems need: (1) CI/CD that tests model behavior (not just code syntax), (2) Feature stores with versioning, (3) Request logging for debugging, (4) Graceful degradation (fallback endpoints), (5) Cost tracking (per-request pricing), (6) Observability (latency, token usage, error rates). My AutoHub backend on Cloud Run: 99.2% uptime, <500ms p99 latency.',
  };

  const key = Object.keys(responses).find((k) => query.toLowerCase().includes(k)) || 'rag';

  return {
    query,
    answer: responses[key],
    citations: ['DocuMind (GitHub)', 'Model Regression Detector', 'AutoHub Backend'],
  };
}
