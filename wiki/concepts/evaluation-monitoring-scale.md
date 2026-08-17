---
type: concept
title: Evaluation, Monitoring, and Scale
status: draft
updated: 2026-08-16
---

# Evaluation, Monitoring, and Scale

ACE-style systems need metrics beyond task success:

- Context growth rate and token budget pressure.
- Promotion rate for new playbook items.
- Reversal/deletion rate for bad or stale context.
- Citation coverage for durable claims.
- Retrieval/recall success rate when archived context is needed.
- Stale-rule count and contradiction count.
- Cost and latency per useful context update.
- Harmful-context incidents and poisoning attempts.

## Evaluation Surfaces

The wiki should track benchmarks as their own research lane, not only methods. Relevant surfaces include:

- [[sources/2506.13651-xbench-agent-productivity]] for professional agent productivity.
- [[sources/2407.12883-bright]] for reasoning-intensive retrieval.
- AppWorld for transactional agent workflows used in the ACE paper.
- BrowseComp/BrowseComp-Plus, DeepResearch Bench, GAIA, SWE-Bench, WebArena, OSWorld, LongBench, and Needle-in-Haystack variants as adjacent evaluation families to monitor.

## Questions

- Does the playbook improve general capability or memorize benchmark quirks?
- Can the agent find the right archived information when it does not know the right ID or query?
- What are the rollback mechanics for bad context updates?
- How does the system separate private observations from durable instructions?
- Which benchmarks best measure productivity, evidence discipline, hallucination control, context recall, cost, and latency together?
