/**
 * Mock Backend Server for Portfolio Live Demos
 * Runs on port 3001, serves /api/regression-demo and /api/rag-query
 * In production, replace with real Vercel Functions or Cloud Run service
 */

import http from 'http';
import { parse } from 'url';

const PORT = 3001;

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Model Regression Demo
  if (pathname === '/api/regression-demo' && req.method === 'POST') {
    const results = [];

    // Simulate 3 sequential results
    for (let i = 0; i < 3; i++) {
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

    res.writeHead(200);
    res.end(JSON.stringify(results));
    return;
  }

  // RAG Query Demo
  if (pathname === '/api/rag-query' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { query } = JSON.parse(body);

        const responses = {
          rag: 'Retrieval-Augmented Generation combines vector search with LLM inference. My DocuMind system: (1) Chunks PDFs into 512-token segments, (2) Embeds with Ollama (384-dim), (3) Stores in ChromaDB, (4) Retrieves top-k by cosine similarity, (5) Reranks with cross-encoder (threshold ≥0.7), (6) Streams Gemini 2.5 Flash response with citations. E2E latency: ~800ms.',

          regression: 'LLM regression detection monitors 4 axes: (1) Label shift, (2) Confidence drift, (3) Semantic change, (4) Reasoning divergence. Detection triggers on 2+ axes with statistical significance.',

          data: 'Data engineering at scale requires: (1) Schema validation, (2) Idempotent transformations, (3) Lineage tracking, (4) Anomaly detection, (5) Incremental state (Delta Lake), (6) Monitoring. My systems: PySpark ETL over 500K+ records.',

          production: 'Production AI systems need: (1) CI/CD for behavior testing, (2) Feature stores with versioning, (3) Request logging, (4) Graceful degradation, (5) Cost tracking, (6) Observability. AutoHub: 99.2% uptime, <500ms p99.',
        };

        const key = Object.keys(responses).find((k) => (query || '').toLowerCase().includes(k)) || 'rag';

        res.writeHead(200);
        res.end(
          JSON.stringify({
            query,
            answer: responses[key],
            citations: ['DocuMind (GitHub)', 'Model Regression Detector', 'AutoHub Backend'],
          }),
        );
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid request' }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`\n✓ Mock backend running on http://localhost:${PORT}`);
  console.log('  Endpoints: /api/regression-demo, /api/rag-query\n');
});
