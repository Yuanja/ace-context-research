# Log

## [2026-08-16] setup | ACE context research wiki

Created the LLM Wiki structure under `~/projects/ace-context-research`, downloaded seed PDFs, extracted local text, and added initial source/concept/analysis pages.

Seed sources:

- arXiv:2510.04618, Agentic Context Engineering.
- arXiv:2607.23809, Agentic Context Management.
- arXiv:2607.25066, Addressable Recall Compaction.
- Karpathy LLM Wiki gist.
- LangChain context engineering docs.
- SambaNova ACE open-source announcement.

Review notes: a subagent critique flagged that ACE is the strongest provenance source, ACM and ARC are very fresh, ARC appears preprint-only from checked metadata, and benchmark claims must be worded narrowly.

## [2026-08-16] ingest | BRIGHT benchmark and leaderboard methods

Ingested BRIGHT as a reasoning-intensive retrieval benchmark and added a deep dive on top leaderboard methods: Mira-Reasoning-Retrieval, INF-X-Retriever, RakanEmbed4B, NVIDIA NeMo Retriever Agentic Retrieval, DIVER-v3-GroupRank, and BGE-Reasoner-0928.

Pages touched:

- [[sources/2407.12883-bright]]
- [[sources/bright-leaderboard-top-methods]]
- [[concepts/reasoning-intensive-retrieval]]
- [[comparisons/bright-vs-ace-context-management]]
- [[analyses/bright-leaderboard-deep-dive-2026-08-16]]

Key synthesis: BRIGHT is not directly comparable to ACE/ACM/ARC, but it is a strong candidate evaluation surface for an ACE+ACM+ARC retrieval agent. Top methods mostly win through intent transformation, reasoning-tuned embeddings, reranking/fusion, or agentic query loops.

Unresolved questions: no ACE/ACM/ARC paper reports BRIGHT results; some leaderboard metadata around long-document metrics/dates is inconsistent; several top method descriptions are self-reported project pages rather than papers.

## [2026-08-16] maintenance | Source taxonomy and monitor rubric

Added a source taxonomy page and updated the monitor instructions after James asked how GNoME and Nature should be interpreted.

Pages touched:

- [[concepts/research-source-taxonomy]]

Key rule: Nature is a venue/publisher source category, while GNoME is a model/project and must be cited through supporting primary evidence such as a paper, dataset, repo, or lab page.

Monitor update: future runs must classify candidates as paper, venue/publisher, benchmark/dataset, model/project, implementation, commentary, or news before ingesting.

## [2026-08-16] ingest | xbench and benchmark-discovery gap

Ingested xbench after James pointed out that it should have been surfaced proactively as an adjacent benchmark for ACE/context-management evaluation.

Pages touched:

- [[sources/2506.13651-xbench-agent-productivity]]
- [[concepts/agent-productivity-benchmarks]]
- [[concepts/evaluation-monitoring-scale]]

Key synthesis: xbench is not a context-management method, but it is a strong evaluation surface because it measures professional agent productivity in recruitment and marketing workflows. This is directly relevant to whether ACE-style context governance improves useful work rather than only isolated retrieval or long-context scores.

Process correction: the monitor now has an explicit evaluation-surface lane for agent productivity, deep research, browser/web-agent, retrieval-reasoning, and context-memory benchmarks. The earlier search scope was too method-centric and waited for James to name xbench.
