---
type: analysis
title: BRIGHT Leaderboard Deep Dive
status: draft
updated: 2026-08-16
---

# BRIGHT Leaderboard Deep Dive

## Executive Read

The top BRIGHT systems are converging on the same lesson: reasoning-intensive retrieval is usually not fixed by a better embedding model alone. The winning pattern is **intent transformation before retrieval**, often plus reasoning-tuned dense embeddings and reranking/fusion.

Mira and INF-X are especially interesting because they push query alignment hard and avoid heavyweight reranking in the described pipeline. NVIDIA, DIVER, and BGE-Reasoner are more pipeline-heavy: they use agent loops, query expansion, reranking, fusion, or multi-model ensembles to recover recall and improve top-10 ordering.

## Leaderboard Snapshot

| Method | Short Score | Basic Shape | Main Caveat |
|---|---:|---|---|
| Mira-Reasoning-Retrieval | 66.9 | MQR-A1 query rewriter + MRE-T1 dense retriever | Mostly self-authored docs/model cards, not a method paper found in this pass |
| INF-X-Retriever | 63.4 | RL-tuned query aligner + dense retriever | No formal paper found; limited training detail |
| RakanEmbed4B | 52.4 | INF-style query rewrite + 4B dense retriever | Least verifiable; no paper/model card found |
| NVIDIA NeMo Agentic Retrieval | 50.9 | reasoning retriever + Claude Opus 4.5 ReAct retrieval loop | Cost/latency/reproducibility caveats |
| DIVER-v3-GroupRank | 46.8 | preprocessing + query expansion + dense/BM25 + pointwise/listwise reranking | Multi-stage pipeline makes attribution hard |
| BGE-Reasoner-0928 | 46.4 | rewriter + embedder + BM25 + multi-size reranker fusion | Pipeline score should not be attributed to embedder alone |

## How The Leaders Achieve It

### Mira-Reasoning-Retrieval

Mira combines `MQR-A1`, a query rewriter, with `MRE-T1`, a reasoning-oriented dense retriever. The public description says MQR-A1 uses candidate rewrite mining, supervised cold start, then GRPO alignment against retrieval feedback. Its reward includes dense retrieval nDCG, a length penalty, and cosine similarity to positives. The main idea is to distill retrieval intent and suppress misleading surface-level noise before embedding.

Why this likely works: BRIGHT queries often contain verbose or misleading surface features. A rewriter optimized against retrieval feedback can produce a cleaner query representation than generic expansion.

Caveat: the strongest claims come from project/model-card material rather than a peer-reviewed method paper found in this pass.

### INF-X-Retriever

INF-X uses a query aligner plus dense retriever. Its public docs explicitly reject common add-ons: no reranker, no HyDE, no BM25 fusion, no multi-query expansion, no ensembles. The query aligner is Qwen2.5-7B-Instruct based and RL-tuned to distill core retrieval intent; the retriever is `inf-retriever-v1-pro` with targeted long-query adaptation.

Why this likely works: it removes query noise while keeping the runtime path simple. For BRIGHT, that means the dense retriever sees the underlying information need instead of the messy original phrasing.

Caveat: documentation is mostly project/repo/model-card based. Exact training data details are limited.

### RakanEmbed4B

RakanEmbed is a 4B dense retrieval model. Its production pipeline first uses an INF-X-based query rewriter, then retrieves with RakanEmbed. The official page claims single-forward-pass retrieval, no iterative retrieval loop, and sub-second embedding inference. It reports training on a single RTX 3060 Ti using Unsloth's embedding fine-tuning pipeline.

Why this likely works: it borrows the same query-intent cleanup pattern as INF-X and pairs it with a reasoning-tuned retriever.

Caveat: public detail is thin; this is the least independently verifiable top method in the pass.

### NVIDIA NeMo Retriever Agentic Retrieval

NVIDIA combines `llama-nv-embed-reasoning-3b`, a LLaMA-3.2-3B-based dense retriever trained with InfoNCE on synthetic reasoning-intensive pairs, with a Claude Opus 4.5 ReAct retrieval loop. The agent uses tools such as `think`, `retrieve(query, top_k)`, and `final_results`, iteratively decomposing and rephrasing queries. If the loop hits a limit, it falls back to reciprocal rank fusion over retrieval attempts.

Why this likely works: it makes retrieval itself agentic. The system can try multiple search framings, inspect whether the results look useful, and converge on final documents.

Caveat: the agentic loop is likely slower and more expensive than single-stage systems, and it depends on a commercial LLM.

### DIVER-v3-GroupRank

DIVER is a multi-stage reasoning-intensive retrieval pipeline: document preprocessing, iterative query expansion, dense retrieval with a reasoning-tuned model, BM25 combination, and pointwise/listwise reranking. The paper reports 46.8 overall nDCG@10 on BRIGHT and 31.9 on original queries.

Why this likely works: it attacks several failure modes: noisy documents, underspecified queries, dense retrieval blind spots, lexical retrieval blind spots, and local reranker mistakes.

Caveat: because many stages contribute, it is harder to know which component is responsible for the gain.

### BGE-Reasoner-0928

BGE-Reasoner is an end-to-end pipeline with a rewriter, embedder, and reranker. The rewriter generates five rewritten queries. For each rewrite, BM25 and BGE-Reasoner-Embed retrieve top-2000 documents. The system reranks top-100 candidates with Qwen3 8B, 14B, and 32B rerankers, then fuses six reranked lists plus one hybrid BM25/embed list.

Why this likely works: broad query diversification improves recall; dense+BM25 fusion catches complementary evidence; multi-size reranker fusion improves final top-10 ordering.

Caveat: the 46.4 score is a pipeline score. The standalone embedder is reported around 37-38 depending on variant/setup, so do not attribute the full score to embeddings alone.

## Lessons For ACE

BRIGHT suggests an ACE retrieval playbook should focus on:

- Query intent distillation.
- Avoiding semantic traps.
- Choosing when to use single-stage retrieval versus agentic multi-query search.
- Recording failed query framings as negative lessons.
- Preserving exact search observations for later audit and recall.

This is a strong candidate evaluation setting for an ACE+ACM+ARC hybrid: ACE learns retrieval strategies, ACM governs long search context, and ARC preserves exact observations.

## Research Gaps

- No ACE/ACM/ARC paper reports BRIGHT results yet.
- Leaderboard metadata has some inconsistencies, especially around long-document metric/date labels.
- Several high-scoring methods rely on self-reported project pages rather than papers.
- Public training-data detail varies significantly across leaders.

