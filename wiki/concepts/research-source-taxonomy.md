---
type: concept
title: Research Source Taxonomy
status: draft
updated: 2026-08-16
---

# Research Source Taxonomy

This wiki should separate the evidence source from the thing being studied. Mixing those categories makes it too easy to treat a model, benchmark, or press post as if it were a peer-reviewed paper.

## Core Categories

- **Paper**: The research document making technical claims. Examples: arXiv preprint, conference paper, journal article.
- **Venue or publisher**: Where the paper appears. Examples: Nature, ICLR, NeurIPS, ACL, arXiv.
- **Model or project**: The system being proposed or studied. Example: GNoME is a Google DeepMind model/project for materials discovery, not a paper source.
- **Benchmark or dataset**: The evaluation artifact. Example: BRIGHT is a benchmark for reasoning-intensive retrieval.
- **Implementation**: Code, package, demo, or model release.
- **Commentary or news**: Secondary explanation, useful for discovery but not enough for technical claims unless it points to primary evidence.

## Nature

Nature is a high-prestige scientific journal and part of the broader Nature Portfolio. Nature-family links can be strong sources, but the monitor must classify the item:

- Peer-reviewed journal article.
- News article.
- Editorial or commentary.
- Press release or collection page.
- Article in another Nature Portfolio journal with its own scope and selectivity.

For technical claims, prefer the peer-reviewed article or the linked paper over a news summary.

## GNoME

GNoME means Graph Networks for Materials Exploration. It is a Google DeepMind research project/model that predicts stable crystal structures. It is not a publisher or source category.

If GNoME appears in this wiki, cite the paper, author/lab page, dataset, or code release that supports the claim. Do not cite "GNoME" as if it were the evidence source.

## Credibility Ladder

For ACE/context-management monitoring, use this rough order:

1. Primary paper or official technical report.
2. Conference or journal publication page.
3. Official code/model/benchmark release.
4. Author or lab technical blog with enough detail to audit.
5. Reputable technical news that links back to primary material.
6. Social posts, SEO summaries, and unattributed claims.

The lower the category, the more cautious the wording should be.
