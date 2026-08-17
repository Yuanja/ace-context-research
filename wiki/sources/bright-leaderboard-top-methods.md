---
type: source
title: BRIGHT Leaderboard Top Methods
status: ingested
updated: 2026-08-16
raw:
  - ../../raw/web/bright-leaderboard-notes.md
url: https://brightbenchmark.github.io/
---

# BRIGHT Leaderboard Top Methods

This source page records a 2026-08-16 snapshot of the leading BRIGHT methods and the primary sources used for the deep dive. The leaderboard and project pages are live web sources; scores may change.

## Top Short-Document Methods Checked

| Rank | Method | Short Score | Date | Primary Source Type |
|---|---:|---:|---|---|
| 1 | Mira-Reasoning-Retrieval | 66.9 | 2026-04-22 | project page/model cards |
| 2 | INF-X-Retriever | 63.4 | 2025-12-20 | project page/repo/model cards |
| 3 | RakanEmbed4B | 52.4 | 2026-03-20 | project page |
| 4 | NVIDIA NeMo Retriever Agentic Retrieval | 50.9 | 2026-03-13 | GitHub submission/model card |
| 5 | DIVER-v3-GroupRank | 46.8 | 2025-11-13 | arXiv paper/repo/model cards |
| 6 | BGE-Reasoner-0928 | 46.4 | 2025-10-13 | GitHub repo/arXiv papers/model cards |

## Evidence Quality Notes

- DIVER, ReasonEmbed, Retro*, and ReasonRank have arXiv papers; ReasonEmbed and ReasonRank report ACL 2026 acceptance.
- Mira and INF-X are high-scoring but mostly documented through project pages, repos, and Hugging Face cards, not peer-reviewed papers found in this pass.
- RakanEmbed has the thinnest public detail among top methods checked.
- NVIDIA NeMo is well documented in a GitHub submission but depends on a commercial LLM in an agent loop, which affects cost/reproducibility.

