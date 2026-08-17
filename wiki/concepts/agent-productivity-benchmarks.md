---
type: concept
title: Agent Productivity Benchmarks
status: draft
updated: 2026-08-16
sources:
  - ../sources/2506.13651-xbench-agent-productivity.md
---

# Agent Productivity Benchmarks

Agent productivity benchmarks evaluate whether an agent can produce useful work in realistic workflows, not just solve isolated questions. For ACE/context-management research, they are an important missing layer between toy long-context tests and full production deployment.

## Why This Lane Matters

Context-management systems should be evaluated on tasks where context actually matters:

- Long web research trajectories.
- Multi-step professional workflows.
- Open-ended outputs that require source discipline.
- Dynamic external information.
- Tradeoffs between search depth, latency, cost, and hallucination risk.
- Reuse of prior lessons without overfitting to benchmark quirks.

## xbench

[[sources/2506.13651-xbench-agent-productivity]] introduces xbench as a profession-aligned benchmark suite for AI agent productivity. Initial domains include recruitment and marketing. It is especially relevant because both domains require information collection, judgment, and multi-step synthesis.

For this wiki, xbench should be tracked as an **evaluation surface** for ACE-style systems, not as an ACE method.

## Search Lane

The monitor should actively search for evaluation benchmarks adjacent to ACE, including:

- Agent productivity benchmarks.
- Deep research benchmarks.
- Professional workflow evaluations.
- Browser/web-agent benchmarks.
- Retrieval-reasoning benchmarks.
- Context-memory benchmarks.
- Benchmarks that report hallucination, citation, cost, latency, or rollback/error recovery.

Seed names to keep watching: xbench, GAIA, BrowseComp/BrowseComp-Plus, DeepResearch Bench, BRIGHT, SWE-Bench, WebArena, OSWorld, AppWorld, LongBench, and Needle-in-Haystack variants.

## Evaluation Questions For ACE

- Does a playbook improve productivity across new professional tasks, or just memorize examples?
- Does context governance reduce hallucination under LLM-as-judge rubrics?
- Can the agent cite and recover exact evidence from long research trails?
- Does the system improve cost-adjusted value, not only raw score?
- Are improvements stable across dynamic benchmark updates?
- Can stale playbook guidance be detected and rolled back?
