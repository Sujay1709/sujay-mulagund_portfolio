import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

/**
 * Listening — curated song lists (just for fun). Each track links to a Spotify
 * search so it always works and never breaks. To swap a list for a real Spotify
 * embed later, replace the section markup with an <iframe> from a playlist link.
 */
type Track = { title: string; meta?: string; q: string };
const playlists: { name: string; note: string; tracks: Track[] }[] = [
  {
    name: 'The Weeknd — on repeat',
    note: 'His most-streamed, roughly in order.',
    tracks: [
      { title: 'Blinding Lights', q: 'Blinding Lights The Weeknd' },
      { title: 'Starboy', meta: 'feat. Daft Punk', q: 'Starboy The Weeknd' },
      { title: 'Save Your Tears', q: 'Save Your Tears The Weeknd' },
      { title: 'The Hills', q: 'The Hills The Weeknd' },
      { title: "Can't Feel My Face", q: "Can't Feel My Face The Weeknd" },
      { title: 'Die For You', q: 'Die For You The Weeknd' },
      { title: 'Call Out My Name', q: 'Call Out My Name The Weeknd' },
      { title: 'I Feel It Coming', meta: 'feat. Daft Punk', q: 'I Feel It Coming The Weeknd' },
    ],
  },
  {
    name: 'Old Bollywood — classics',
    note: 'Evergreen Hindi favourites.',
    tracks: [
      { title: 'Lag Jaa Gale', meta: 'Lata Mangeshkar · 1964', q: 'Lag Jaa Gale Lata Mangeshkar' },
      { title: 'Mere Sapno Ki Rani', meta: 'Kishore Kumar · 1969', q: 'Mere Sapno Ki Rani Kishore Kumar' },
      { title: 'Pal Pal Dil Ke Paas', meta: 'Kishore Kumar · 1973', q: 'Pal Pal Dil Ke Paas Kishore Kumar' },
      { title: 'Chaudhvin Ka Chand', meta: 'Mohammed Rafi · 1960', q: 'Chaudhvin Ka Chand Mohammed Rafi' },
      { title: 'Kabhi Kabhie Mere Dil Mein', meta: 'Mukesh · 1976', q: 'Kabhi Kabhie Mere Dil Mein Mukesh' },
      { title: 'Tere Bina Zindagi Se', meta: 'Lata & Kishore · 1975', q: 'Tere Bina Zindagi Se Aandhi' },
      { title: 'Yeh Shaam Mastani', meta: 'Kishore Kumar · 1970', q: 'Yeh Shaam Mastani Kishore Kumar' },
      { title: 'Roop Tera Mastana', meta: 'Kishore Kumar · 1969', q: 'Roop Tera Mastana Kishore Kumar' },
    ],
  },
];

/**
 * Sujay Mulagund — personal portfolio
 * Minimal, editorial single-page site with a light/dark toggle.
 * Sections: intro/about, selected work, systems, experience,
 * education & credentials, toolkit, contact.
 *
 * Palette + typography are driven by CSS variables on the root element,
 * so the light/dark switch is a single state flip with no build config.
 */

type Project = {
  year: string;
  title: string;
  blurb: string;
  tag?: string;
  href?: string;
};

const projects: Project[] = [
  {
    year: '2026',
    title: 'Model Regression Detection System',
    blurb:
      'An LLM behavioral-regression detector for a customer-support email classifier. A 4-axis diff engine — label shift, confidence drift, semantic change, reasoning divergence — with CI-ready exit codes, versioned prompt management, and a 75-case hand-curated golden dataset backed by 16 offline pytest cases.',
    tag: 'LLM eval / CI',
    href: 'https://github.com/Sujay1709/Model-Regression-Detection-System',
  },
  {
    year: '2026',
    title: 'DocuMind — Production RAG Pipeline',
    blurb:
      'A modular, typed RAG pipeline: PDF → chunking → Ollama embeddings → ChromaDB vector store → cross-encoder reranking → streamed answers with citations. Full CI/CD (ruff + pytest), Dockerized with persistent state — deployed to HuggingFace Spaces with real users.',
    tag: 'RAG / pipeline',
    href: 'https://github.com/Sujay1709/documind-rag',
  },
  {
    year: '2025–26',
    title: 'AutoHub — Real-Time AI Backend',
    blurb:
      'A real-time AI backend on Google Cloud Run: FastAPI + Google ADK + Gemini 2.5 Flash, with per-request history replay, nginx credential isolation, and a multi-stage Docker build.',
    tag: 'Backend / cloud',
    href: 'https://autohub-render.com',
  },
  {
    year: '2025',
    title: 'Conversational SQL Assistant — NL-to-SQL RAG',
    blurb:
      'Vector-based schema retrieval (cosine ≥ 0.87) across 15+ schemas, reaching 91.3% accuracy (F1 0.91) on 500+ queries and cutting analyst SQL workload by 65%.',
    tag: 'NL-to-SQL',
    href: 'https://github.com/Sujay1709/Conversational-SQL-Assistant',
  },
];

type Job = {
  period: string;
  role: string;
  org: string;
  location: string;
  points: string[];
};

const experience: Job[] = [
  {
    period: 'Jan 2023 – Jun 2024',
    role: 'Data Analyst · Team Lead',
    org: 'ChiSquareX Technologies',
    location: 'Bangalore, India',
    points: [
      'Owned Python/SQL ETL pipelines over 500K+ records, with data-validation and anomaly-detection frameworks — 10% error reduction and audit-ready reporting.',
      'Built streaming data-transformation workflows across multi-source inputs; tracked pipeline health, throughput, and accuracy metrics.',
    ],
  },
  {
    period: 'Jul 2024 – Sep 2024',
    role: 'Python Developer Intern',
    org: 'PractWorks',
    location: 'Bangalore, India',
    points: [
      'Built Python/SQL ETL to extract, transform, and load multi-source data, with schema validation and quality-gate logic for downstream pipelines.',
    ],
  },
];

type Edu = {
  period: string;
  degree: string;
  school: string;
  location: string;
  detail: string;
};

const education: Edu[] = [
  {
    period: 'Sep 2025 – Present',
    degree: 'M.S. Data Science, Analytics & Engineering',
    school: 'Arizona State University — Ira A. Fulton Schools of Engineering',
    location: 'Tempe, AZ · GPA 3.56 / 4.0',
    detail:
      'Data Engineering · AWS Cloud & Distributed Computing · Statistical ML · Big Data (PySpark, Databricks) · Data Processing at Scale · Risk Modeling · Time-Series Analysis',
  },
  {
    period: 'Aug 2021 – May 2025',
    degree: 'B.Tech. Computer Science & Engineering',
    school: 'SRM Institute of Science and Technology',
    location: 'Chennai, India · GPA 8.12 / 10',
    detail: 'Algorithms · DBMS · OOP · Software Engineering',
  },
];

type Cert = {
  title: string;
  issuer: string;
  date: string;
  /** put the image in public/certs/ and set e.g. '/certs/datacamp.png' */
  img?: string;
  /** verification / credential URL */
  href?: string;
};

const certs: Cert[] = [
  {
    title: 'Applied AI Foundations',
    issuer: 'OpenAI Academy',
    date: 'Aug 2026',
    img: '/certs/openai-applied-ai.jpg',
  },
  {
    title: 'AI Engineer for Data Scientists (Associate)',
    issuer: 'DataCamp',
    date: 'Jul 2026',
    img: '/certs/datacamp-ai-engineer.jpg',
  },
  {
    title: 'AWS Academy Graduate — Machine Learning Foundations',
    issuer: 'AWS Academy',
    date: 'Mar 2023',
    img: '/certs/aws-ml-foundations.jpg',
    href: 'https://www.credly.com/go/vr7yLqvI',
  },
  {
    title: 'Google AI Essentials',
    issuer: 'Coursera',
    date: 'Jun 2026',
    img: '/certs/google-ai-essentials.jpg',
    href: 'https://www.coursera.org/verify/specialization/64NYBXNA802P',
  },
];

const toolkit: [string, string][] = [
  ['Data engineering', 'Spark / PySpark · Databricks · Structured Streaming · ETL design · Delta Lake · SQL optimization'],
  ['LLM & AI', 'LLM evaluation · RAG · LangChain · ChromaDB · Ollama · Gemini 2.5 · Google ADK · vector search'],
  ['Cloud & DevOps', 'AWS (S3 · EC2 · Lambda · Glue · Kinesis · Redshift) · Docker · GitHub Actions · Cloud Run · FastAPI'],
  ['Languages & data', 'Python · SQL · TypeScript · Node.js · PostgreSQL · Snowflake · MongoDB · Power BI'],
];

type Diagram = { caption: string; render: () => React.ReactNode };

// Clean architecture sketches (inline SVG) representing real systems above.
const systems: Diagram[] = [
  {
    caption: 'Batch + streaming ETL — sources through validation into a Delta Lake',
    render: () => (
      <FlowSvg nodes={['Sources', 'Spark ETL', 'Validate', 'Delta Lake']} label="ETL pipeline" />
    ),
  },
  {
    caption: 'RAG retrieval path — embed, vector search, rerank, stream with citations',
    render: () => (
      <FlowSvg nodes={['Query', 'Embed', 'Vector DB', 'Rerank', 'LLM']} label="RAG pipeline" />
    ),
  },
  {
    caption: 'LLM regression — accuracy tracked across prompt versions, drift flagged',
    render: () => <RegressionSvg />,
  },
];

function FlowSvg({ nodes, label }: { nodes: string[]; label: string }) {
  const pad = 16;
  const w = 340;
  const boxH = 34;
  const gap = 12;
  const boxW = (w - pad * 2 - gap * (nodes.length - 1)) / nodes.length;
  const y = 74;
  return (
    <svg viewBox={`0 0 ${w} 168`} className="w-full h-full" role="img" aria-label={label}>
      <rect width={w} height="168" fill="var(--panel)" />
      <text x={pad} y="34" fill="var(--muted)" fontSize="10.5" letterSpacing="1.5" fontFamily="Inter, sans-serif">
        {label.toUpperCase()}
      </text>
      {nodes.map((n, i) => {
        const x = pad + i * (boxW + gap);
        return (
          <g key={n}>
            <rect x={x} y={y} width={boxW} height={boxH} rx="7" fill="none" stroke="var(--soft)" strokeWidth="1.3" />
            <text x={x + boxW / 2} y={y + boxH / 2 + 3.5} fill="var(--ink)" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">
              {n}
            </text>
            {i < nodes.length - 1 && (
              <path
                d={`M${x + boxW + 1} ${y + boxH / 2} l${gap - 3} 0`}
                stroke="var(--ink)"
                strokeWidth="1.3"
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 z" fill="var(--ink)" />
        </marker>
      </defs>
    </svg>
  );
}

function RegressionSvg() {
  const pts = [150, 120, 128, 96, 150, 70, 58];
  const w = 340;
  const stepX = (w - 40) / (pts.length - 1);
  const path = pts.map((p, i) => `${20 + i * stepX},${p}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} 168`} className="w-full h-full" role="img" aria-label="regression eval">
      <rect width={w} height="168" fill="var(--panel)" />
      <text x="16" y="24" fill="var(--muted)" fontSize="10.5" letterSpacing="1.5" fontFamily="Inter, sans-serif">
        LLM REGRESSION
      </text>
      {[60, 100, 140].map((gy) => (
        <line key={gy} x1="20" y1={gy} x2={w - 20} y2={gy} stroke="var(--soft)" strokeWidth="1" opacity="0.5" />
      ))}
      <polyline points={path} fill="none" stroke="var(--ink)" strokeWidth="2" />
      {pts.map((p, i) => (
        <circle key={i} cx={20 + i * stepX} cy={p} r={i === 4 ? 4.5 : 3} fill={i === 4 ? '#e0483d' : 'var(--ink)'} />
      ))}
      <text x={20 + 4 * stepX} y={pts[4] - 10} fill="#e0483d" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">
        drift
      </text>
    </svg>
  );
}

// Short, accurate availability line shown near the top. Edit freely.
const STATUS = 'Open to AI/ML & data engineering roles';

// Writing & Shares — add your LinkedIn posts / Medium articles here.
// The section hides itself while this list is empty.
type Writing = { title: string; outlet: string; date: string; href: string };
const writings: Writing[] = [
  // { title: 'How I catch LLM regressions in CI', outlet: 'LinkedIn', date: 'Aug 2026', href: 'https://www.linkedin.com/posts/...' },
];

export default function Portfolio() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const id = 'sm-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap';
    document.head.appendChild(link);
  }, []);

  const theme: React.CSSProperties = dark
    ? ({
        '--bg': '#0f0f0f',
        '--panel': '#171717',
        '--fg': '#ededed',
        '--muted': '#8a8a8a',
        '--soft': '#3a3a3a',
        '--ink': '#e8e8e8',
        '--border': '#262626',
        '--accent': '#60a5fa',
      } as React.CSSProperties)
    : ({
        '--bg': '#faf9f6',
        '--panel': '#f1efe9',
        '--fg': '#1a1a1a',
        '--muted': '#6b6b6b',
        '--soft': '#cfccc4',
        '--ink': '#1a1a1a',
        '--border': '#e5e2da',
        '--accent': '#3b82f6',
      } as React.CSSProperties);

  const serif = "'Newsreader', Georgia, serif";
  const sans = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const link =
    'underline underline-offset-4 decoration-[var(--soft)] hover:decoration-[var(--accent)] transition';

  // Motion: subtle, purposeful, and disabled when the user prefers reduced motion.
  const reduce = useReducedMotion();
  const up = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };
  const heroContainer: Variants | undefined = reduce
    ? undefined
    : { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
  const heroItem: Variants | undefined = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
      };

  return (
    <div
      style={{ ...theme, background: 'var(--bg)', color: 'var(--fg)', fontFamily: sans }}
      className="min-h-screen antialiased transition-colors duration-500"
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        {/* Top bar */}
        <header className="flex items-center justify-between py-8">
          <a href="#top" className="text-sm font-medium tracking-tight text-[var(--fg)]">
            Sujay Mulagund
          </a>
          <nav className="flex items-center gap-5 text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
            <a href="#work" className="hover:text-[var(--fg)] transition-colors hidden sm:inline">Work</a>
            <a href="#experience" className="hover:text-[var(--fg)] transition-colors hidden sm:inline">Experience</a>
            <a href="#contact" className="hover:text-[var(--fg)] transition-colors hidden sm:inline">Contact</a>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="grid h-8 w-8 place-items-center rounded-full border border-[var(--border)] hover:border-[var(--muted)] transition-colors"
            >
              {dark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                </svg>
              )}
            </button>
          </nav>
        </header>

        {/* Intro / About */}
        <motion.section
          id="top"
          className="pt-8 sm:pt-10 pb-16 sm:pb-20"
          variants={heroContainer}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? false : 'show'}
        >
          <motion.div variants={heroItem} className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            {STATUS}
          </motion.div>
          <motion.p variants={heroItem} className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] mb-6">
            AI Engineer · M.S. Data Science @ ASU — Tempe, Arizona
          </motion.p>
          <motion.h1 variants={heroItem} style={{ fontFamily: serif }} className="text-3xl sm:text-[2.6rem] leading-[1.25] font-normal max-w-2xl">
            I build AI systems that hold up in production.
          </motion.h1>
          <motion.div variants={heroItem} className="mt-8 space-y-4 text-[var(--muted)] leading-relaxed max-w-2xl text-base">
            <p>
              I ship AI end to end: retrieval-augmented pipelines, agent backends, and
              the evaluation harnesses that catch model regressions before users do — all
              on data infrastructure built to stay correct at scale. I care about the
              unglamorous guarantees — data quality, reproducibility, CI/CD — that
              separate a demo from a product.
            </p>
            <p>
              Currently an{' '}
              <span className="text-[var(--fg)]">
                M.S. Data Science, Analytics &amp; Engineering student at Arizona State
                University
              </span>{' '}
              (Fulton Schools, GPA 3.56). Previously a data analyst and team lead at
              ChiSquareX Technologies, owning Python/SQL ETL over 500K+ records. Four
              production systems shipped, all with CI/CD.
            </p>
          </motion.div>

          <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="mailto:sujaymulagund19@gmail.com" className={link}>Email</a>
            <a href="https://www.linkedin.com/in/sujay-mulagund-0ab588269" target="_blank" rel="noopener noreferrer" className={link} aria-label="LinkedIn (opens in new tab)">LinkedIn</a>
            <a href="https://github.com/Sujay1709" target="_blank" rel="noopener noreferrer" className={link} aria-label="GitHub (opens in new tab)">GitHub</a>
          </motion.div>
        </motion.section>

        {/* Selected work */}
        <motion.section {...up} id="work" className="py-14 border-t border-[var(--border)]">
          <h2 className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] mb-10">Selected Work</h2>
          <ul className="space-y-12">
            {projects.map((p) => (
              <li key={p.title} className="grid grid-cols-[3.5rem_1fr] gap-4 sm:gap-6">
                <span className="text-sm text-[var(--muted)] pt-1 tabular-nums">{p.year}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {p.href ? (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: serif }} className="text-xl sm:text-2xl hover:opacity-70 transition-opacity" aria-label={`${p.title} (opens in new tab)`}>
                        {p.title} ↗
                      </a>
                    ) : (
                      <h3 style={{ fontFamily: serif }} className="text-xl sm:text-2xl">{p.title}</h3>
                    )}
                    {p.tag && (
                      <span className="text-[0.7rem] uppercase tracking-[0.14em] text-[var(--accent)] border border-[var(--accent)] rounded-full px-2 py-0.5 opacity-70">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-[var(--muted)] leading-relaxed max-w-xl">{p.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Case study */}
        <motion.section {...up} id="case-study" className="py-14 border-t border-[var(--border)]">
          <h2 className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] mb-3">Case Study</h2>
          <h3 style={{ fontFamily: serif }} className="text-xl sm:text-2xl mb-8">
            <a
              href="https://github.com/Sujay1709/Model-Regression-Detection-System"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Catching LLM regressions before they ship (opens in new tab)"
            >
              Catching LLM regressions before they ship ↗
            </a>
          </h3>
          <dl className="space-y-6">
            {[
              ['Problem', 'An LLM-based email classifier can silently regress when a prompt or model changes — and teams usually find out from users, not before.'],
              ['Approach', 'A 4-axis diff engine compares each release against the last: label shift, confidence drift, semantic change, and reasoning divergence.'],
              ['Evaluation', 'A 75-case hand-curated golden dataset with 16 offline pytest cases and versioned prompt management, wired into CI with pass/fail exit codes.'],
              ['Result', 'Regressions get caught in the pipeline instead of in production — reusable LLM-evaluation infrastructure, not a one-off script.'],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[1fr] sm:grid-cols-[8rem_1fr] gap-1 sm:gap-6">
                <dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted)] pt-1">{k}</dt>
                <dd className="text-[var(--muted)] leading-relaxed max-w-xl">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.section>

        {/* Systems */}
        <motion.section {...up} id="systems" className="py-14 border-t border-[var(--border)]">
          <h2 className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] mb-3">Systems</h2>
          <p className="text-[var(--muted)] mb-10 max-w-xl leading-relaxed">
            Architecture sketches of the pipelines and evaluation loops behind the work
            above.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {systems.map((s, i) => (
              <figure key={i} className={`overflow-hidden rounded-xl border border-[var(--border)] ${i === 0 ? 'sm:col-span-2' : ''}`}>
                <div className={i === 0 ? 'aspect-[16/6]' : 'aspect-[16/9]'}>{s.render()}</div>
                <figcaption className="text-sm text-[var(--muted)] px-4 py-3 border-t border-[var(--border)]">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section {...up} id="experience" className="py-14 border-t border-[var(--border)]">
          <h2 className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] mb-10">Experience</h2>
          <ul className="space-y-10">
            {experience.map((j) => (
              <li key={j.role + j.org} className="grid grid-cols-[1fr] sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6">
                <span className="text-sm text-[var(--muted)] pt-1">{j.period}</span>
                <div>
                  <h3 style={{ fontFamily: serif }} className="text-lg sm:text-xl">{j.role}</h3>
                  <p className="text-sm text-[var(--fg)] mt-0.5">
                    {j.org} <span className="text-[var(--muted)]">· {j.location}</span>
                  </p>
                  <ul className="mt-3 space-y-2">
                    {j.points.map((pt, k) => (
                      <li key={k} className="text-[var(--muted)] leading-relaxed max-w-xl relative pl-4">
                        <span className="absolute left-0 top-[0.65em] w-1.5 h-[1.5px] bg-[var(--soft)]" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Education & credentials */}
        <motion.section {...up} className="py-14 border-t border-[var(--border)]">
          <h2 className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] mb-10">Education &amp; Credentials</h2>
          <ul className="space-y-10">
            {education.map((e) => (
              <li key={e.degree} className="grid grid-cols-[1fr] sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6">
                <span className="text-sm text-[var(--muted)] pt-1">{e.period}</span>
                <div>
                  <h3 style={{ fontFamily: serif }} className="text-lg sm:text-xl">{e.degree}</h3>
                  <p className="text-sm text-[var(--fg)] mt-0.5">
                    {e.school} <span className="text-[var(--muted)]">· {e.location}</span>
                  </p>
                  <p className="mt-2 text-[var(--muted)] leading-relaxed max-w-xl">{e.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <motion.div {...up} className="mt-12">
            <span className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] block mb-6">Certificates</span>
            <div className="grid gap-5 sm:grid-cols-2">
              {certs.map((c) => {
                const link = c.href || c.img;
                return (
                  <div key={c.title} className="group rounded-xl border border-[var(--border)] overflow-hidden">
                    <a
                      href={link || undefined}
                      target={link ? '_blank' : undefined}
                      rel={link ? 'noopener noreferrer' : undefined}
                      className="block"
                    >
                      <div className="aspect-[3/2] bg-[var(--panel)] overflow-hidden">
                        {c.img ? (
                          <img
                            src={c.img}
                            alt={`${c.title} — ${c.issuer}`}
                            loading="lazy"
                            className="w-full h-full object-cover object-top group-hover:opacity-90 transition-opacity"
                          />
                        ) : (
                          <div className="w-full h-full grid place-items-center text-sm text-[var(--muted)]">
                            {c.issuer}
                          </div>
                        )}
                      </div>
                    </a>
                    <div className="p-4 border-t border-[var(--border)] flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-[var(--fg)] leading-snug">{c.title}</p>
                        <p className="text-xs text-[var(--muted)] mt-0.5">{c.issuer} · {c.date}</p>
                      </div>
                      {link && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs text-[var(--muted)] underline underline-offset-2 decoration-[var(--soft)] hover:decoration-[var(--fg)] hover:text-[var(--fg)]"
                        >
                          {c.href ? 'Verify ↗' : 'View ↗'}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...up} className="mt-8 grid grid-cols-[1fr] sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6">
            <span className="text-sm text-[var(--muted)] pt-1">Publication</span>
            <p className="text-[var(--muted)] leading-relaxed max-w-xl">
              Peer-reviewed: <span className="text-[var(--fg)]">Ensemble ML for Disease Prediction</span> (2024).
              CFE (ACFE) — in progress.
            </p>
          </motion.div>
        </motion.section>

        {/* Toolkit */}
        <motion.section {...up} className="py-14 border-t border-[var(--border)]">
          <h2 className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] mb-10">Toolkit</h2>
          <dl className="space-y-5">
            {toolkit.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[1fr] sm:grid-cols-[9rem_1fr] gap-1 sm:gap-6">
                <dt className="text-sm text-[var(--muted)]">{k}</dt>
                <dd className="text-sm leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.section>

        {/* Writing & Shares — renders only when the writings list is non-empty */}
        {writings.length > 0 && (
          <motion.section {...up} id="writing" className="py-14 border-t border-[var(--border)]">
            <h2 className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] mb-10">Writing &amp; Shares</h2>
            <ul className="space-y-8">
              {writings.map((w) => (
                <li key={w.title} className="grid grid-cols-[5rem_1fr] gap-4 sm:gap-6">
                  <span className="text-sm text-[var(--muted)] pt-1">{w.date}</span>
                  <div>
                    <a
                      href={w.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: serif }}
                      className="text-lg sm:text-xl hover:opacity-70 transition-opacity"
                    >
                      {w.title} ↗
                    </a>
                    <p className="text-xs text-[var(--muted)] mt-1">{w.outlet}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Listening — curated lists, just for fun */}
        <motion.section {...up} id="listening" className="py-14 border-t border-[var(--border)]">
          <h2 className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted)] mb-3">Listening</h2>
          <p className="text-[var(--muted)] mb-10 max-w-xl leading-relaxed">
            On repeat while I build — just for fun. Tap any track to open it on Spotify.
          </p>
          <div className="grid gap-10 sm:grid-cols-2">
            {playlists.map((pl) => (
              <div key={pl.name}>
                <h3 style={{ fontFamily: serif }} className="text-lg">{pl.name}</h3>
                <p className="text-xs text-[var(--muted)] mt-1 mb-4">{pl.note}</p>
                <ol className="space-y-2.5">
                  {pl.tracks.map((t, i) => (
                    <li key={t.title} className="flex items-baseline gap-3 text-sm">
                      <span className="text-[var(--muted)] tabular-nums w-4 shrink-0">{i + 1}</span>
                      <span className="min-w-0">
                        <a
                          href={`https://open.spotify.com/search/${encodeURIComponent(t.q)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline underline-offset-4 decoration-[var(--soft)]"
                        >
                          {t.title}
                        </a>
                        {t.meta && <span className="text-[var(--muted)]"> · {t.meta}</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.footer {...up} id="contact" className="py-16 border-t border-[var(--border)]">
          <h2 style={{ fontFamily: serif }} className="text-2xl sm:text-3xl mb-6">
            Let&apos;s build AI that ships.
          </h2>
          <p className="text-[var(--muted)] max-w-xl leading-relaxed mb-8">
            I&apos;m open to AI engineering, ML engineering, and data engineering roles
            and collaborations. Email is the fastest way to reach me.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="mailto:sujaymulagund19@gmail.com" className={link}>sujaymulagund19@gmail.com</a>
            <a href="https://www.linkedin.com/in/sujay-mulagund-0ab588269" target="_blank" rel="noopener noreferrer" className={link} aria-label="LinkedIn (opens in new tab)">LinkedIn</a>
            <a href="https://github.com/Sujay1709" target="_blank" rel="noopener noreferrer" className={link} aria-label="GitHub (opens in new tab)">GitHub</a>
          </div>
          <p className="mt-12 text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Sujay Mulagund — Tempe, Arizona
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
