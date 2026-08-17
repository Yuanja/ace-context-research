# BRIGHT Leaderboard Notes

Captured: 2026-08-16

Primary sources checked:

- BRIGHT official site: https://brightbenchmark.github.io/
- BRIGHT paper: https://arxiv.org/abs/2407.12883
- Mira project page: https://wanggz.github.io/mira-reasoning-retrieval/
- INF-X project page: https://yaoyichen.github.io/INF-X-Retriever/
- RakanEmbed page: https://rakanlabs.com/work/rakanembed/
- NVIDIA NeMo submission: https://github.com/NVIDIA/NeMo-Retriever/blob/main/retrieval-bench/submissions/bright_agentic.md
- DIVER paper: https://arxiv.org/abs/2508.07995
- BGE-Reasoner repo: https://github.com/VectorSpaceLab/agentic-search/tree/main/BGE-Reasoner
- ReasonEmbed paper: https://arxiv.org/abs/2510.08252
- Retro* paper: https://arxiv.org/abs/2509.24869

Leaderboard snapshot from BRIGHT official site and project pages:

- Mira-Reasoning-Retrieval: short 66.9, long 56.0, Apr 22 2026.
- INF-X-Retriever: short 63.4, long 54.6, Dec 20 2025 for short; long-date metadata inconsistent across sources.
- RakanEmbed4B: short 52.4, Mar 20 2026.
- NVIDIA NeMo Retriever Agentic Retrieval: short 50.9, Mar 13 2026.
- DIVER-v3-GroupRank: short 46.8, Nov 13 2025.
- BGE-Reasoner-0928: short 46.4, Oct 13 2025.

Metric caveat: BRIGHT official site describes short-document scores as average nDCG@10 across 12 datasets. One review pass found a possible long-document metric-label inconsistency: the official long-doc tab references average Recall@1 across 8 aggregated datasets, while method pages sometimes call long results nDCG@10.

