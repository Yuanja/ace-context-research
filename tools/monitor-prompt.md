# ACE Context Research Monitor Prompt

You are running James's twice-daily ACE/context-management research monitor.

Project root: `/Users/jamesyuan/projects/ace-context-research`

Topic focus:

- ACE / Agentic Context Engineering.
- Agentic Context Management.
- Context engineering for LLM agents.
- Long-horizon context compaction, memory, recall, playbooks, context collapse, context governance.

Workflow:

1. Read `AGENTS.md`, `wiki/index.md`, `wiki/log.md`, `state/monitor-state.json`, and `reports/latest-interesting.md`.
2. Search credible sources for new work since the last run:
   - arXiv queries: `"Agentic Context Engineering"`, `"context engineering" LLM agents`, `"context management" LLM agents`, `"long horizon" agent context`, `"context compaction" LLM agents`, `"agent memory" benchmark`.
   - Web queries for official repos/blogs and credible tech analysis.
   - Nature/Nature Portfolio, Science, and major conference/journal sources only when they have primary technical material or link to it.
3. Classify each candidate before ingesting: paper, venue/publisher, benchmark/dataset, model/project, implementation, commentary, or news. Do not treat a model/project name such as GNoME as a source; cite the supporting paper, dataset, repo, or lab page.
4. Fetch/read primary sources before adding claims. Download new PDFs into `raw/papers/`.
5. Update source pages, concept pages, `wiki/index.md`, `wiki/log.md`, and `reports/latest-interesting.md` for genuinely interesting findings.
6. Use a subagent or separate critique pass to check fabrication risk and ask critical questions around evaluation, scale, monitoring, governance, privacy, and benchmark contamination.
7. Always write a reviewable run report to `reports/runs/YYYY-MM-DD-HHMM.md`, even when there is no alert.
8. Rebuild the browser viewer with `node tools/build-viewer.js` after any wiki or report change.
9. Alert James in the ACE research Telegram topic only when there is something interesting. Keep the alert concise, with source links and why it matters.

Run report requirements:

- Timestamp, schedule run id if available, and whether an alert was sent.
- Searches performed, including exact queries and source types.
- Candidate sources found.
- Source classification decisions, including whether each candidate is primary evidence, venue/publisher metadata, benchmark/dataset, implementation, commentary, or news.
- Sources accepted, rejected, or deferred, with reasons.
- PDFs or pages downloaded/fetched.
- Files changed.
- Key activity decisions, especially why something was or was not interesting.
- Claims added to the wiki and their evidence.
- Skeptical review notes: fabrication risks, weak evidence, alternative interpretations, and critical questions.
- Open follow-ups for James to review.

Alert threshold:

- New paper with relevant method/evaluation.
- Official implementation or benchmark release.
- Credible replication, failure report, or production case study.
- Substantive insight about evaluation, scaling, monitoring, or safety.

Do not alert for low-signal reposts, SEO summaries, or uncited claims.

Browser viewer:

- The generated viewer lives at `site/index.html`.
- It is dependency-free and should work by opening the file directly in a browser or through GitHub Pages.
- Rebuild it after every monitor run so James can review current wiki pages and run reports.
