# Connector Risk Assessment Checklist

Module 6, Connecting Your Tools. Agentic AI for Business Owners, by Bruno Ashford.

Use this checklist before any connector (claude.ai connector or MCP server) touches company data. Fill one copy per connector and save it in your project, for example `connectors/hubspot-risk-check.md`.

---

## 1. Basic information

| Field | Your answer |
|---|---|
| Connector name | |
| System it connects to (CRM, email, drive, etc.) | |
| How it is added (claude.ai connector / `claude mcp add` / other) | |
| URL or package name | |
| Requested by | |
| Business reason (one sentence) | |
| Date assessed | |

---

## 2. Scoring

Score each question. Add the points at the end.

### A. Who built it?

- [ ] 0 points: Listed in my claude.ai connector settings, or published by the vendor on its own official domain
- [ ] 1 point: Well-known open-source project with an active maintainer and recent updates
- [ ] 3 points: Unknown or anonymous author, no recent updates, or I cannot tell

### B. What data can it access?

- [ ] 0 points: Public or non-sensitive data only (marketing content, public web pages)
- [ ] 1 point: Internal business data (tasks, internal documents, non-client files)
- [ ] 2 points: Client personal data (names, emails, phone numbers, addresses)
- [ ] 3 points: Financial, health, legal or payment data

### C. What can it do?

- [ ] 0 points: Read only
- [ ] 1 point: Create drafts or new records that a human reviews
- [ ] 2 points: Update existing records
- [ ] 3 points: Send messages, move money, delete records or publish publicly

### D. Does it read content from outside the company?

(Emails from strangers, web pages, form submissions, reviews. This is where prompt injection comes from.)

- [ ] 0 points: No, only our own internal data
- [ ] 1 point: Yes, but it is read-only and I review outputs
- [ ] 2 points: Yes, and it can also write, send or change things

### E. How are credentials handled?

- [ ] 0 points: Sign-in through the vendor (OAuth) in claude.ai or `/mcp`, no token stored in project files
- [ ] 1 point: API key stored in an environment variable on each person's machine
- [ ] 3 points: API key pasted into a shared file, chat or document

### F. Can we switch it off quickly?

- [ ] 0 points: Yes. I know the removal command or setting AND how to revoke access in the vendor's admin panel
- [ ] 2 points: Partly. I know one of the two
- [ ] 3 points: No idea

**Total score: ______ / 17**

---

## 3. Decision

| Score | Risk level | Decision rule |
|---|---|---|
| 0 to 4 | Low | Connect at local scope. Share at project scope after one week without issues. |
| 5 to 8 | Medium | Connect read-only or drafts-only. Add a deny rule for write, send and delete tools. Owner approves. |
| 9 to 12 | High | Second person must approve. Read-only only. Review again in 30 days. |
| 13 or more | Do not connect | Look for an official alternative or keep the task manual. |

**Decision:** [ ] Connect  [ ] Connect read-only / drafts-only  [ ] Do not connect

**Approved by:** ______________________  **Second approver (if high risk):** ______________________

---

## 4. Guardrails to apply (tick what you set up)

- [ ] Added at `local` scope first (not `project` or `user`)
- [ ] Deny rule for tools that send, delete or pay (MCP tool names follow the pattern `mcp__<server>__<tool>`, visible in `/mcp`)
- [ ] Permission mode left on default so writes ask for confirmation
- [ ] Secrets referenced as environment variables (for example `${API_KEY}`), never written into `.mcp.json`
- [ ] Change log file created in the project for any write actions
- [ ] Team told which tasks are allowed and which are not

---

## 5. Exit plan

| Step | How | Done |
|---|---|---|
| Remove from Claude Code (terminal-added) | `claude mcp remove <name>` | [ ] |
| Disable claude.ai connector | Account connector settings, or toggle in `/mcp` | [ ] |
| Revoke token or app access in the vendor's admin panel | Vendor settings, connected apps | [ ] |
| Delete any local copies of exported data | Project folder | [ ] |

---

## 6. Review

Re-check every connector every 90 days, or immediately if:

- The vendor changes ownership or the server stops being maintained
- You add a new use case that needs write access
- Anything unexpected happens (a message sent, a record changed without approval)

| Review date | Reviewer | Still needed? | Score now | Notes |
|---|---|---|---|---|
| | | | | |
| | | | | |
