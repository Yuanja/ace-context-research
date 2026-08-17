---
type: source
title: "llm-wiki"
status: ingested
updated: 2026-08-16
url: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
---

# Karpathy LLM Wiki Gist

Karpathy's pattern argues for a persistent Markdown wiki between raw sources and Q&A. The LLM ingests sources once, compiles durable synthesis into interlinked pages, flags contradictions, and updates the wiki as new sources arrive.

This project follows that pattern:

- `raw/` is source truth.
- `wiki/` is maintained synthesis.
- `AGENTS.md` is the schema and operating manual.
- `wiki/index.md` and `wiki/log.md` are the navigation and audit spine.

