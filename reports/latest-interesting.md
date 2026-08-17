# Latest Interesting Items

Updated: 2026-08-16

## Seed Findings

- **ACE is the center of gravity.** arXiv:2510.04618 frames context as an evolving playbook and reports strong AppWorld and finance gains under tested settings.
- **ACM is worth watching.** arXiv:2607.23809 moves context management into the agent action loop with explicit `manage_context` and `query_memory` tools.
- **ARC adds a missing primitive.** arXiv:2607.25066 makes prior tool observations addressable, which may complement ACE by preserving exact evidence while ACE curates lessons.
- **BRIGHT is the best evaluation lead so far.** arXiv:2407.12883 is not an ACE benchmark, but its reasoning-intensive retrieval tasks are a natural place to test whether ACE-style playbooks learn better query strategies and whether ACM/ARC preserve long search traces.
- **BRIGHT leaderboard pattern:** top methods tend to transform query intent before retrieval, then use reasoning-tuned dense retrievers, reranking/fusion, or agentic multi-query search. Mira-Reasoning-Retrieval and INF-X lead the checked snapshot.

## Skeptical Notes

- Do not call any of these a solved memory architecture.
- The strongest claims are benchmark-specific.
- Fresh preprints need replication and production evidence.
- "Lossless storage" is not the same as "the agent reliably uses the right stored item."
- Several BRIGHT leaderboard method descriptions are self-reported through project pages/model cards rather than peer-reviewed papers.
