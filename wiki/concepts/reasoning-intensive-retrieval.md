---
type: concept
title: Reasoning-Intensive Retrieval
status: draft
updated: 2026-08-16
---

# Reasoning-Intensive Retrieval

Reasoning-intensive retrieval is retrieval where the relevant document is not obvious from lexical overlap or ordinary embedding similarity. The retriever must infer the query's intent, identify hidden constraints, map the problem to an underlying concept, and retrieve evidence connected by that concept.

BRIGHT categorizes this as retrieval requiring reasoning traces such as:

- Deductive reasoning.
- Analogical reasoning.
- Causal reasoning.
- Analytical reasoning.

## Why It Matters For ACE

Reasoning-intensive retrieval is a natural testbed for ACE-style context systems because agents can accumulate reusable retrieval playbooks:

- How to rewrite noisy user questions into retrieval intent.
- How to avoid semantic traps where negatives look similar but are logically wrong.
- How to decompose multi-part queries.
- How to decide when to use dense retrieval, sparse retrieval, reranking, or agentic search.

The key governance issue is whether learned retrieval playbooks generalize or simply memorize benchmark-specific tricks.

## Sources

- [[../sources/2407.12883-bright]]
- [[../sources/bright-leaderboard-top-methods]]

