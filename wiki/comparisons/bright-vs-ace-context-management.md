---
type: comparison
title: BRIGHT vs ACE/ACM/ARC
status: draft
updated: 2026-08-16
---

# BRIGHT vs ACE/ACM/ARC

BRIGHT is a benchmark; ACE, ACM, and ARC are methods/frameworks. They are not directly comparable leaderboard-to-leaderboard.

## What Each Measures Or Optimizes

| Item | Focus | Core Question |
|---|---|---|
| BRIGHT | Reasoning-intensive retrieval | Can the system retrieve the right evidence when relevance is implicit? |
| ACE | Context learning | Can the system improve future behavior by curating durable lessons into context? |
| ACM | Agent-controlled context lifecycle | Can the agent decide when to offload and query context during long runs? |
| ARC | Addressable recall after compaction | Can exact prior observations remain recoverable under a bounded active context? |

## Conceptual Relationship

BRIGHT exposes retrieval failure under hidden relevance. ACE could learn reusable query-reasoning strategies over BRIGHT tasks. ACM could help a search agent maintain long trajectories without rigid summarization. ARC could preserve exact search observations and citations so the agent can revisit evidence without rerunning tools.

## Evaluation Design Idea

A stronger ACE evaluation could use BRIGHT episodes where an agent:

1. Attempts retrieval tasks.
2. Records successful and failed query strategies.
3. Curates playbook deltas via ACE.
4. Uses ACM/ARC-like mechanisms to retain search traces.
5. Tests whether the playbook improves held-out BRIGHT tasks without benchmark leakage.

Metrics should include nDCG@10, recall, cost/latency, number of queries, playbook growth, stale-rule rate, and ablation against raw retrieval-only systems.

## Caveat

None of the seed ACE, ACM, or ARC papers ingested so far report BRIGHT results. Any comparison is currently conceptual.

