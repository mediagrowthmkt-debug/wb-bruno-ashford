# Monthly Executive Report

**Company:** [Company name]
**Month:** [Month YYYY]
**Prepared by:** Claude Code draft, reviewed by [Name] on [Date]
**Data folder:** reports/YYYY-MM/data

Rules for whoever (or whatever) fills this in:

1. Every number must cite the file it came from, in brackets, for example [source: crm-export.csv].
2. If a number cannot be found, write MISSING. Never estimate.
3. Anything that is an interpretation rather than a fact is marked (hypothesis).
4. Keep the whole report readable in five minutes.

---

## 1. Headline

One sentence that sums up the month.

> Example: Revenue grew 8 percent to 142,300 but cash fell because two large clients paid late; collections are the priority for October.

## 2. Scorecard

| Area | Metric | This month | Last month | Change | Target | Status | Source |
|---|---|---|---|---|---|---|---|
| Sales | Revenue invoiced | | | | | Green / Amber / Red | |
| Sales | New customers | | | | | | |
| Sales | Conversion rate (lead to customer) | | | | | | |
| Marketing | Leads | | | | | | |
| Marketing | Cost per booked lead | | | | | | |
| Marketing | Ad spend | | | | | | |
| Finance | Cash at month end | | | | | | |
| Finance | Weeks of runway | | | | | | |
| Finance | Overdue receivables (over 30 days) | | | | | | |
| Finance | Gross margin | | | | | | |
| Operations | Jobs or orders completed | | | | | | |
| Operations | On-time delivery rate | | | | | | |
| Team | Hours saved by agents (from routine log) | | | | | | |

## 3. What went well (max 3)

1. [What happened, the number, and the likely reason]
2.
3.

## 4. What went wrong or needs attention (max 3)

1. [What happened, the number, the likely reason, and the risk if nothing changes]
2.
3.

## 5. Customers and pipeline

- Top 3 customers by revenue this month:
- New deals won (name, value):
- Deals lost and why:
- Pipeline value for next month:

## 6. Cash and collections

- Opening cash: 
- Closing cash:
- Largest overdue invoices (client, amount, days late):
- Promises to pay due this month:

## 7. Operations

- Capacity used (percent):
- Main operational issue this month:
- Supplier or inventory risks:

## 8. Decisions needed from the owner (max 3)

| Decision | Options | Recommendation | Deadline |
|---|---|---|---|
| | | | |

## 9. Priorities for next month (max 3)

1.
2.
3.

## 10. Verification log

The reviewer confirms these figures against source files before the report is shared.

| Figure | Value in report | Source file and row or cell | Checked by | OK |
|---|---|---|---|---|
| Revenue | | | | [ ] |
| Cash at month end | | | | [ ] |
| Overdue receivables | | | | [ ] |
| Leads | | | | [ ] |
| Headline figure | | | | [ ] |

---

Prompt to generate this report:

> Fill reports/monthly-report-template.md using only the files in reports/YYYY-MM/data and last month's report. Every number must cite its source file. Compare with last month and with the targets in CLAUDE.md. Write MISSING for anything you cannot find. Keep sections 3, 4, 8 and 9 to a maximum of three items each and be specific: name clients, campaigns and amounts.
