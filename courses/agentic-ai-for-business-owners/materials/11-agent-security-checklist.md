# Agent Security Checklist

Run this checklist for every agent, skill, custom command and scheduled routine in your business. Mark each item Pass, Fail or N/A and write the evidence (the file and setting that proves it). Fix every Fail before giving the agent more autonomy, or record it as an accepted risk with a date to revisit.

Tip: ask Claude Code to do the first pass, then verify the answers yourself.

> Go through materials/11-agent-security-checklist.md for this project. For each item, answer Pass, Fail or N/A with the evidence (file and setting). List the failures first, with the fix for each. Do not change anything yet.

**Project or folder:** ____________________  **Reviewed by:** ____________  **Date:** ____________

---

## A. Permissions

| # | Check | Pass / Fail / N/A | Evidence |
|---|---|---|---|
| A1 | I know which permission mode each kind of work uses (Manual, acceptEdits, plan, auto, dontAsk) and nobody uses bypassPermissions outside an isolated container. | | |
| A2 | `.claude/settings.json` has deny rules for secret files (for example `Read(./.env)`, `Read(./secrets/**)`). | | |
| A3 | Destructive commands are denied or blocked by a hook (for example `Bash(rm -rf *)`). | | |
| A4 | Publishing and pushing (for example `Bash(git push *)`, uploads) are denied or set to ask. | | |
| A5 | Edits are allowed only in the folders that need them (for example `Edit(./drafts/**)`). | | |
| A6 | Team rules are in the project settings; personal preferences are in `~/.claude/settings.json`. | | |
| A7 | I reviewed `/permissions` in the last 30 days and removed rules nobody needs. | | |

## B. Customer data and privacy

| # | Check | Pass / Fail / N/A | Evidence |
|---|---|---|---|
| B1 | I have a list of files and connectors that contain personal data. | | |
| B2 | Agents use minimised data where possible (only the columns a task needs). | | |
| B3 | Each client's data is in its own folder and agents start in the narrowest folder. | | |
| B4 | Sensitive data (health, legal, financial, children, ID documents) is excluded or specifically approved. | | |
| B5 | I have checked my Claude plan's data and privacy settings and they fit the data we process. | | |
| B6 | CLAUDE.md has a Privacy section with our rules. | | |
| B7 | We know which privacy laws likely apply (UK GDPR, EU GDPR, US state laws, sector rules) and have asked a lawyer where unsure. | | |

## C. Secrets and credentials

| # | Check | Pass / Fail / N/A | Evidence |
|---|---|---|---|
| C1 | A scan found no passwords, API keys or tokens in files the agent can read. | | |
| C2 | All secrets live in a password manager or environment variables. | | |
| C3 | Any secret ever pasted into a chat or shared file has been rotated. | | |
| C4 | Keys are scoped (read-only or limited) and one key serves one purpose. | | |
| C5 | Tokens used by scheduled routines are stored in a private file only the user can read, never in the script or a shared folder. | | |
| C6 | Secret files are in `.gitignore` and never in a shared repository. | | |

## D. Human in the loop

| # | Check | Pass / Fail / N/A | Evidence |
|---|---|---|---|
| D1 | The approval matrix is filled in and shared with the team. | | |
| D2 | Every skill that sends, publishes, pays or deletes stops at a draft with APPROVAL REQUIRED. | | |
| D3 | Send, publish and payment tools from connectors are set to ask or deny. | | |
| D4 | Value limits are defined (for example refunds over a set amount go to the owner). | | |
| D5 | We keep evidence of approvals (draft, approver, date). | | |

## E. Automation and routines

| # | Check | Pass / Fail / N/A | Evidence |
|---|---|---|---|
| E1 | Every scheduled run uses `--permission-mode dontAsk` (or equivalent) with a minimal `--allowedTools` list. | | |
| E2 | No routine can send, pay or delete. | | |
| E3 | Cloud routines include only the connectors they need. | | |
| E4 | Every run is recorded in the routine run log. | | |
| E5 | Someone reads the output of each routine at least weekly. | | |

## F. Hooks and monitoring

| # | Check | Pass / Fail / N/A | Evidence |
|---|---|---|---|
| F1 | A PostToolUse hook logs file changes made by agents. | | |
| F2 | A PreToolUse hook blocks risky commands, and I have tested that it fires. | | |
| F3 | New MCP servers, plugins and connectors are approved before use and reviewed with `/mcp`. | | |
| F4 | Only approved people can change `.claude/settings.json`. | | |

## G. Quality and verification

| # | Check | Pass / Fail / N/A | Evidence |
|---|---|---|---|
| G1 | Reports require every number to cite a source and to say MISSING instead of estimating. | | |
| G2 | Important skills include a self-check list. | | |
| G3 | High-stakes work is checked by a separate reviewer session or subagent. | | |
| G4 | Each skill has a human sampling rate (100 percent for new skills). | | |
| G5 | Errors are logged and turned into rules or checks. | | |

## H. People and policy

| # | Check | Pass / Fail / N/A | Evidence |
|---|---|---|---|
| H1 | The one-page AI use policy exists and every team member has confirmed reading it. | | |
| H2 | Everyone knows who to tell if something goes wrong, and how fast. | | |
| H3 | Staff use company accounts only, never personal AI accounts, for company work. | | |
| H4 | A quarterly review of the policy and this checklist is in the calendar. | | |

---

## Summary

| Section | Passed | Failed | N/A |
|---|---|---|---|
| A. Permissions | | | |
| B. Customer data | | | |
| C. Secrets | | | |
| D. Human in the loop | | | |
| E. Automation | | | |
| F. Hooks and monitoring | | | |
| G. Quality | | | |
| H. People and policy | | | |

## Accepted risks

| Item | Why we accept it for now | Owner | Revisit on |
|---|---|---|---|
| | | | |

*This checklist is a practical business tool, not legal or compliance advice. Regulated businesses should add the requirements of their sector.*
