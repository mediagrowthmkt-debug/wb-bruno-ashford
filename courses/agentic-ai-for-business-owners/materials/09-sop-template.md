# SOP Template

Standard Operating Procedure for one repeatable process. Fill in every section. If you cannot fill a section, the process is not ready to delegate yet.

Tip: do not write this alone. Paste your rough notes into Claude Code and use this prompt:

> Interview me one question at a time about this process until you understand the trigger, inputs, decisions, exceptions and definition of done. Then fill in this SOP template with real file names, owners and approval points.

---

## 1. Basics

| Field | Answer |
|---|---|
| Process name | e.g. Month-end close |
| SOP owner (accountable person) | e.g. Office manager |
| Version and date | v1.0, 2026-09-27 |
| How often it runs | e.g. Monthly, first working day |
| Time it takes today | e.g. 6 hours |
| Target time with the agent | e.g. 1.5 hours including review |
| Related skill (if any) | e.g. .claude/skills/month-end-close/SKILL.md |

## 2. Purpose

In one or two sentences: why does this process exist and what goes wrong if it is skipped or done late?

> Example: Close the books each month so the owner knows real profit and cash position by the 5th, and the accountant receives clean data for VAT and tax.

## 3. Trigger

What starts this process? (a date, an event, a request, a file arriving)

> Example: The first working day of each month, or when the owner asks for an early close.

## 4. Inputs

| Input | Where it lives | Who provides it | Format |
|---|---|---|---|
| Bank transactions | finance/bank/YYYY-MM.csv | Office manager (bank export) | CSV |
| Invoices issued | finance/invoices/ | Invoicing tool export | PDF or CSV |
| Chart of categories | finance/categories.md | Accountant | Markdown |

## 5. Steps

Number every step. Mark who does it (Human, Agent or Both). Mark every step that needs a person to approve before moving on with **APPROVAL REQUIRED**.

| # | Step | Done by | Output | Approval |
|---|---|---|---|---|
| 1 | Export last month's bank CSV and save in finance/bank | Human | CSV file | |
| 2 | Categorise transactions with confidence flag | Agent | reconciliation CSV | |
| 3 | Review every medium and low confidence line | Human | corrected CSV | APPROVAL REQUIRED |
| 4 | Match receipts to invoices, list unmatched | Agent | unmatched list | |
| 5 | Draft collection reminders for overdue invoices | Agent | drafts folder | APPROVAL REQUIRED before sending |
| 6 | Send the final file to the accountant | Human | email sent | APPROVAL REQUIRED |

## 6. Decision rules

Write each decision as: If this, then that.

- If a transaction amount is above 2,000 and has no matching invoice, then flag it for the owner.
- If a vendor is not in the vendor map, then mark the line as low confidence.
- If the bank export is older than 3 days, then stop and ask for a fresh export.

## 7. Exceptions and what to do

| Exception | What to do | Who decides |
|---|---|---|
| Missing bank export | Stop and notify the owner | Owner |
| Duplicate transaction | List both lines, do not delete either | Office manager |
| Client disputes an invoice | Remove from reminders, add note | Owner |

## 8. Definition of done

The process is complete when all of these are true:

- [ ] Every transaction has a category
- [ ] Every medium and low line was reviewed by a person
- [ ] Unmatched receipts are listed with a proposed action
- [ ] The accountant has received the final file
- [ ] The run is logged (date, time taken, issues found)

## 9. Things the agent must never do in this process

- Change or delete the original source files
- Send any email or message without approval
- Log in to the bank or make any payment
- Estimate a number it cannot find

## 10. Quality check

How will a person verify the output? (for example: spot-check 5 random lines and the total against the bank balance)

## 11. Change log

| Date | Change | Changed by |
|---|---|---|
| 2026-09-27 | First version | |

---

When this SOP has run cleanly twice, turn it into a skill:

> Turn this SOP into a skill at .claude/skills/<process-name>/SKILL.md with YAML frontmatter (name and description). Keep every APPROVAL REQUIRED step and the list of things the agent must never do. Reference this SOP file as the source of truth.
