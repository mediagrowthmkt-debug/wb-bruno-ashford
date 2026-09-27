# Delegation Brief Template

Agentic AI for Business Owners, Module 3
Bruno Ashford

Brief Claude Code the way you would brief a capable new hire on their first day. Five parts, two minutes, far fewer rewrites.

How to use this template:

1. Copy the blank brief below into a text file or straight into Claude Code.
2. Fill in every section. If a section is empty, ask yourself why.
3. Send it as one message.
4. Save briefs that worked well. In Module 5 they become skills.

---

## The blank brief

```
GOAL:
(One or two sentences. What business outcome is this for? What decision will it support?)

CONTEXT:
(What would a smart new hire need to know? Who is the audience? What happened before? What does the business care about most here?)

INPUTS:
(Exact files or folders to use. Say what to ignore, too.)

OUTPUT:
(Format, length, structure, file name and where to save it. Who will read it?)

GUARDRAILS:
(What is off limits. What not to change. When to stop and ask me. How to handle missing or uncertain data.)
```

---

## Checklist before you send

- [ ] The goal describes a business outcome, not a task ("decide who to call", not "analyse the file").
- [ ] The context mentions the reader of the output.
- [ ] The inputs name specific files or folders.
- [ ] The output says format, length and file name.
- [ ] The guardrails say "do not edit the originals" when data is involved.
- [ ] The guardrails say when to stop and ask you.
- [ ] You asked for sources or working when numbers are involved.
- [ ] For anything that changes files, you will use plan mode (Shift+Tab) first.

---

## Guardrail phrases you can reuse

- Do not edit, move or delete any source file. Write results to new files only.
- Do not invent numbers. If data is missing, say so and leave the cell empty.
- Mark every assumption clearly as an assumption.
- Cite the file and column for every number you report.
- Do not contact anyone or send anything. Draft only.
- Stop and ask me before including anything you are unsure about.
- If the task would take more than 10 steps, show me a plan first.
- Keep client names out of file names.

---

## Worked example 1: sales call list (B2B supplier)

```
GOAL: Help me decide which 10 customers to call this week to win repeat orders.
CONTEXT: We are a B2B supplier. Repeat customers are our most profitable. The call list goes to Sarah, our account manager, who is not technical.
INPUTS: sales/03-sample-messy-sales-clean.csv only.
OUTPUT: A table of 10 customers with last order date, total spend and a one-line reason to call. Save to reports/call-list.md. Under one page.
GUARDRAILS: Do not edit any source file. Do not invent data. Leave out customers with fewer than 2 orders. Ask me before including anyone flagged in the check column.
```

## Worked example 2: monthly no-show review (dental clinic)

```
GOAL: Find out why no-shows rose this quarter so I can decide whether to add SMS reminders.
CONTEXT: Two-chair dental clinic. No-shows cost us roughly one appointment slot each. The finding goes to my practice manager.
INPUTS: The appointments folder, files from January to June only.
OUTPUT: One page in reports/no-show-review.md: no-show rate by month, by weekday and by appointment type, then three likely causes ranked by evidence.
GUARDRAILS: No patient names in the report. Use patient ID only. Do not change any file in the appointments folder. If a month is missing, say so instead of estimating.
```

## Worked example 3: quote follow-up draft (roofing contractor)

```
GOAL: Win back quotes that went quiet in the last 60 days.
CONTEXT: Residential roofing company. Customers are homeowners who often get three quotes. Our tone is friendly, direct and never pushy.
INPUTS: quotes/open-quotes.csv and the email examples in templates/follow-ups.
OUTPUT: One short follow-up email per quote (under 90 words each), saved to drafts/follow-ups.md, grouped by quote value, highest first.
GUARDRAILS: Draft only. Do not send anything. Do not offer discounts. If a quote has no contact name, write "Hi there". Flag any quote older than 60 days instead of writing an email.
```

---

## A note on dates

The practice file mixes date formats on purpose. "04/03/2026" is 3 April in the US and 4 March in the UK. Always tell Claude which convention your business uses, or ask it to flag ambiguous dates instead of guessing.
