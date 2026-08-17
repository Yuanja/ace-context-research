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

## Questions

- Does the playbook improve general capability or memorize benchmark quirks?
- Can the agent find the right archived information when it does not know the right ID or query?
- What are the rollback mechanics for bad context updates?
- How does the system separate private observations from durable instructions?

