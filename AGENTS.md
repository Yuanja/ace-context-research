# ACE Context Research Wiki

This project is an LLM-maintained research wiki for ACE: Agentic Context Engineering and adjacent context-management techniques for long-horizon LLM agents.

## Directory Layout

- `raw/papers/` contains downloaded PDFs and extracted text. Treat these as source material.
- `raw/web/` contains captured web articles or notes from fetched pages.
- `wiki/` contains synthesized Markdown maintained by the agent.
- `wiki/sources/` contains one source summary per paper/article.
- `wiki/concepts/` contains concept pages.
- `wiki/entities/` contains people, labs, repos, and benchmark pages.
- `wiki/analyses/` contains deeper synthesis, critique, and open questions.
- `reports/` contains periodic monitor reports.
- `reports/runs/` contains one reviewable activity and decision report per monitor run.
- `site/index.html` is the generated browser viewer.
- `state/` contains monitor state and dedupe data.

## Citation Rules

- Do not present search-result snippets as evidence. Fetch the source page or read the local PDF/text first.
- Prefer primary sources: arXiv pages, PDFs, official repos, benchmark pages, and author/lab posts.
- Claims about benchmark gains must include the exact benchmark and tested setting.
- Avoid wording like "solves memory" or "proves superiority." Use "reports", "under tested settings", or "suggests".
- If a claim comes from a blog, label it as commentary unless independently confirmed by the paper or repo.

## Ingest Workflow

1. Preserve the source in `raw/` or record a stable URL plus access date.
2. Create or update a source page in `wiki/sources/`.
3. Update relevant concept, entity, comparison, and analysis pages.
4. Add links from `wiki/index.md`.
5. Append an entry to `wiki/log.md`.
6. Record unresolved questions and fabrication risks explicitly.

## Monitoring Workflow

The twice-daily monitor should:

1. Search arXiv and the web for new ACE/context-engineering/context-management work.
2. Prioritize credible sources: arXiv, conference pages, official repos, Google/DeepMind/OpenAI/Anthropic/Stanford/Berkeley/SambaNova/LangChain/Letta/mem0 engineering posts, and reputable technical news.
3. Download PDFs for new papers when available.
4. Update the wiki only after reading the source.
5. Run a skeptical self-review pass before alerting James.
6. Write a dated run report under `reports/runs/` that lets James review the activity, decisions, accepted/rejected sources, files changed, and skepticism pass.
7. Rebuild `site/index.html` with `node tools/build-viewer.js`.
8. Alert only on genuinely interesting items: new papers, substantial code releases, strong evaluations, surprising failures, or techniques that affect ACE evaluation/scale/monitoring.

## Self-Review Checklist

- Are all factual claims traceable to local raw files or stable URLs?
- Did the report separate paper claims from independent validation?
- Are limitations and failure modes included?
- Are evaluation settings and baselines named?
- Did any new source change the current synthesis or just add noise?
- What would disprove the most important claim?
