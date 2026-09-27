# Agent-Friendly Folder Structure Guide

Agentic AI for Business Owners, Module 4
Bruno Ashford

An agent is only as good as what it can find. A structure that works for Claude Code is simply one that would also work for a sharp new hire: clear areas, predictable names, originals kept apart, and a written map.

---

## 1. The recommended tree

```
Company/
  CLAUDE.md                  <- your company handbook (loaded every session)
  sales/
    pipeline/
    quotes/
    call-lists/
  marketing/
    campaigns/
    content/
    brand/
  finance/
    price-list.md
    budgets/
    reports/
  operations/
    sops/                    <- written processes (these become skills in Module 5)
    suppliers/
  clients/
    client-a/
      brief.md               <- goals, voice, do-not-mention list for this client
      CLAUDE.md              <- optional: rules that apply only to this client
      deliverables/
    client-b/
      brief.md
  templates/
    proposal-template.md
    email-templates.md
  drafts/                    <- work in progress, safe to overwrite
  reports/                   <- finished outputs
  originals/                 <- read-only source files and exports
  archive/                   <- old material, ignored unless asked
  .claude/
    skills/                  <- your playbooks (Module 5)
```

Create the main folders in one go:

Mac or Linux (Terminal):

```
mkdir -p ~/Company/{sales,marketing,finance,operations,clients,templates,drafts,reports,originals,archive}
```

Windows (PowerShell):

```
cd $HOME; "sales","marketing","finance","operations","clients","templates","drafts","reports","originals","archive" | ForEach-Object { New-Item -ItemType Directory -Force -Path "Company\$_" }
```

How Claude Code reads this:

- `Company/CLAUDE.md` loads at the start of every session you start inside Company.
- A `CLAUDE.md` inside a subfolder (for example `clients/client-a/CLAUDE.md`) loads when Claude reads files in that subfolder. Use it for rules that only apply there.
- `.claude/skills/` holds project skills, covered in Module 5.

---

## 2. Naming rules

| Rule | Good | Bad |
|---|---|---|
| Date first, YYYY-MM-DD | 2026-09-15-proposal-client-a.md | proposal sept.docx |
| Lowercase and hyphens | weekly-report.md | Weekly Report FINAL.md |
| One current version | price-list.md | price-list-v3-REAL-final.xlsx |
| Describe the content | 2026-q3-sales-by-rep.csv | export(4).csv |
| No client names in shared file names when privacy matters | 2026-09-report-client-017.md | smith-divorce-notes.md |
| Clean copies say so | sales-2026-q3-clean.csv | sales2.csv |

Old versions go to `archive/`, not next to the current file.

---

## 3. Originals, working files and outputs

Keep three kinds of files apart:

1. **Originals** (`originals/`): exports, signed documents, source data. Never edited. Add this red line to CLAUDE.md, and in Module 11 you will lock it with a permission rule.
2. **Working files** (`drafts/`, `-clean` copies): safe for Claude to create and overwrite.
3. **Outputs** (`reports/`, `clients/<name>/deliverables/`): finished work, reviewed by a human.

---

## 4. The folder map for your CLAUDE.md

Paste this into your handbook and adjust it. One line per folder: what goes in, what never goes in.

```markdown
## Folder map
- `sales/`: pipeline exports, quotes, call lists. No contracts.
- `marketing/`: campaigns, content, brand assets.
- `finance/`: price list, budgets, report summaries. No bank logins.
- `operations/sops/`: written processes.
- `clients/<name>/`: one folder per client. Always read `brief.md` first.
- `templates/`: approved templates only.
- `drafts/`: work in progress.
- `reports/`: finished outputs.
- `originals/`: read-only. Never edit, move or delete.
- `archive/`: ignore unless I ask.
```

---

## 5. The client brief file

Every `clients/<name>/brief.md` answers the same questions, so Claude can switch between clients without mixing them up.

```markdown
# Client brief: [Client short name]
- What they do:
- Our work for them:
- Their goals this year:
- Main contact and role:
- Voice to use with them:
- Do not mention:
- Key dates:
- Where their files are:
```

---

## 6. Reorganising safely with Claude

Use this prompt in plan mode (press Shift+Tab until plan mode shows):

```
Propose a plan to reorganise the files in this folder into the structure in materials/04-agent-friendly-folder-structure-guide.md. Show a table of current path and proposed path. Flag duplicates and files you are unsure about. Do not move anything until I approve. When approved, log every move in reports/reorg-log.md.
```

Checklist:

- [ ] Back up the folder before any large move (a simple copy is enough).
- [ ] Review the plan table line by line.
- [ ] Approve the plan in batches (for example one area at a time).
- [ ] Keep the reorg log.
- [ ] Update the folder map in CLAUDE.md afterwards.
- [ ] Run one real task to confirm Claude finds files without being told the path.

---

## 7. What not to put in the Company folder

- Passwords, API keys, bank logins or card details.
- Personal files (family photos, personal finances).
- Data you are not allowed to process under your contracts or privacy law. Check before you add client personal data.
- Huge media libraries that Claude does not need. Link to them instead.
