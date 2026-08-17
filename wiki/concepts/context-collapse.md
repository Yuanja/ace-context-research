---
type: concept
title: Context Collapse
status: draft
updated: 2026-08-16
---

# Context Collapse

Context collapse is the failure mode where iterative rewriting turns a rich context into a much shorter, less informative summary, losing domain-specific details and degrading downstream performance.

In the ACE paper's AppWorld case study, a context reportedly collapsed from 18,282 tokens to 122 tokens at the next step, with accuracy dropping below the no-adaptation baseline. This should be cited narrowly as a case study, not a universal law.

## Related

- [[agentic-context-engineering]]

