# Starter Skills Pack

Agentic AI for Business Owners, Module 5
Bruno Ashford

Three ready-to-install Claude Code skills for the tasks almost every business repeats every week:

1. `sales-proposal`: drafts a client proposal in your structure and voice.
2. `complaint-reply`: drafts a calm, fair reply to a customer complaint or review.
3. `weekly-report`: turns the week's numbers into a one-page owner's report.

Each one is a starting point. Adapt the steps, prices and rules to your business, add your own real (anonymised) examples, and test them with the Skill Testing Checklist.

---

## How to install

A skill is a folder containing a file named exactly `SKILL.md`. Project skills live inside your Company folder:

```
Company/
  .claude/
    skills/
      sales-proposal/
        SKILL.md
      complaint-reply/
        SKILL.md
      weekly-report/
        SKILL.md
```

Create the folders (Mac or Linux):

```
mkdir -p ~/Company/.claude/skills/{sales-proposal,complaint-reply,weekly-report}
```

Windows (PowerShell):

```
"sales-proposal","complaint-reply","weekly-report" | ForEach-Object { New-Item -ItemType Directory -Force -Path "$HOME\Company\.claude\skills\$_" }
```

Then copy each skill below (everything inside the grey block, starting with the `---` line) into its `SKILL.md` file. Or let Claude do it:

```
Read materials/05-starter-skills-pack.md and install the three skills in it into .claude/skills/, one folder per skill, each with a SKILL.md containing exactly the content of its block. Then adapt the placeholders in square brackets using what you know from our CLAUDE.md, and list what you could not fill in.
```

Check they are installed by typing `/skills` in Claude Code. Run one directly with `/sales-proposal`, `/complaint-reply` or `/weekly-report`, or just ask in plain English.

Notes on the format (from the official Claude Code documentation):

- The block between the two `---` lines at the top is YAML frontmatter.
- `name` becomes the slash command. Use lowercase letters, numbers and hyphens.
- `description` tells Claude what the skill does and when to use it. It is what makes the skill trigger automatically, so include the words your team actually uses.
- Everything after the frontmatter is plain instructions.
- Keep SKILL.md focused. Move long reference material into separate files in the same folder and mention them in SKILL.md.
- Optional: add `disable-model-invocation: true` to the frontmatter if you only ever want the skill to run when someone types its slash command.

---

## Skill 1: sales-proposal

File: `.claude/skills/sales-proposal/SKILL.md`

```markdown
---
name: sales-proposal
description: Drafts a client sales proposal in our standard structure, voice and pricing. Use when the user asks for a proposal, quote document, offer letter or pitch for a prospect or existing client, or shares discovery or survey notes and asks what to send them.
---

# Sales proposal

Draft a proposal that a busy client can read in under five minutes and say yes to.

## Before writing
1. Read CLAUDE.md for our offers, price ranges, voice and red lines.
2. Collect the inputs. You need: client name or ID, what they asked for, their main problem, scope, and any notes or files (discovery call, survey, emails). If the client has a folder in clients/, read its brief.md first.
3. If the scope or the budget is unclear, ask up to three short questions before drafting. Do not guess.

## Structure (use these headings, in this order)
1. **The situation**: two or three sentences in the client's own words about the problem and what it costs them.
2. **What we recommend**: the offer that fits, and why it fits them specifically.
3. **Scope**: what is included, as a short list. Then a line "Not included:" with the obvious exclusions.
4. **Investment**: price from our price list only. If there are options, show at most three (for example Essential, Recommended, Complete) and mark the recommended one.
5. **Timeline**: phases in weeks, never specific start dates. Say "start date confirmed on acceptance".
6. **Why us**: two or three proof points that are true and relevant (experience, guarantee, a similar result). Never invent testimonials or figures.
7. **Next step**: one clear action (reply to accept, book a call, sign) and when the proposal expires ([30] days).

## Rules
- Prices must come from CLAUDE.md or finance/price-list.md. If a price is not listed, write "[price to be confirmed]" and tell the user.
- No discounts unless the user explicitly asks for one.
- Maximum [2] pages. Plain language, short sentences, no jargon.
- Use the client's name, never "Dear customer".
- Save the draft to drafts/ as YYYY-MM-DD-proposal-<client-short-name>.md.
- Draft only. Never send anything.

## Before handing over, check
- [ ] Every price matches the price list.
- [ ] No start date is promised.
- [ ] Nothing in "Why us" is invented.
- [ ] The next step is a single clear action.
- [ ] It follows the voice rules in CLAUDE.md.

Then show the user the draft and list anything marked "to be confirmed".
```

---

## Skill 2: complaint-reply

File: `.claude/skills/complaint-reply/SKILL.md`

```markdown
---
name: complaint-reply
description: Drafts a calm, fair reply to a customer complaint, negative review or angry message in our voice. Use when the user pastes or forwards a complaint, a bad review, a refund demand or an unhappy customer email and asks how to respond.
---

# Complaint reply

Draft a reply that lowers the temperature, is fair to both sides and moves the conversation to a resolution.

## Steps
1. Read the complaint twice. Identify: the real issue, what the customer wants, and any factual claims (dates, amounts, what was promised).
2. Check the facts if data is available (order files, job records, the client folder). Note which claims are confirmed, which are wrong and which cannot be checked.
3. Decide the channel: a public review reply must be short and must not reveal any private detail. A private email can be fuller.
4. Draft the reply using the structure below.
5. Suggest an internal next action for the team (call the customer, check with the technician, issue a credit) as a separate note, not inside the reply.

## Structure
1. Thank them and acknowledge the frustration in one sentence. Acknowledge the feeling, do not accept fault before the facts are checked.
2. Show you understood the specific issue in one sentence, in plain words.
3. State what we are doing about it, or the facts if their claim is incorrect, politely and without arguing.
4. Offer one clear next step with a named role (for example "our service manager will call you today").
5. Sign off with the name and role given by the user, or [name, role].

## Rules
- Never admit legal liability or use the words "negligent" or "our fault".
- Never offer refunds, credits or compensation unless the user tells you what is allowed.
- Public replies: under [80] words, no personal data, never confirm that someone is a client or patient if privacy rules apply to our business.
- Private replies: under [150] words.
- Never argue, never use sarcasm, never blame a named staff member.
- If the complaint mentions a safety issue, a legal threat or discrimination, stop and tell the user to escalate it to [role] before any reply is sent.
- Draft only. Never send or post anything.

## Output
- The reply, ready to copy.
- Below it: "Facts check" (confirmed, incorrect, unverified) and "Suggested internal action".
```

---

## Skill 3: weekly-report

File: `.claude/skills/weekly-report/SKILL.md`

```markdown
---
name: weekly-report
description: Builds a one-page weekly owner's report from the week's sales, marketing and operations numbers, compared with the previous week. Use when the user asks for the weekly report, the Friday numbers, a weekly summary or how the week went.
---

# Weekly report

Produce a one-page report the owner can read in two minutes and act on.

## Inputs
1. Find this week's data files. Default locations: sales/, marketing/, operations/. If the user names a file or a week, use that.
2. Find the same files for the previous week for comparison.
3. If a file for this week is missing, say so at the top of the report. Never estimate missing numbers.

## Metrics (adapt to our business)
- Revenue this week, and change vs last week (amount and percentage).
- Number of new leads and where they came from.
- Proposals sent, proposals won, win rate.
- Top 3 customers by revenue this week.
- One operations metric: [jobs completed / orders shipped / appointments attended].
- Cash to collect: invoices overdue more than [30] days, if the data exists.

## Structure
1. **Headline**: one sentence on how the week went, with the single most important number.
2. **Numbers**: a small table with this week, last week and change for each metric.
3. **What went well**: up to three bullets, each with a number.
4. **What needs attention**: up to three bullets, each with a number and a likely cause (labelled as a likely cause, not a fact).
5. **Next week**: three actions, each with a suggested owner.
6. **Data notes**: which files were used, and anything missing or odd.

## Rules
- Every number must come from a file. Name the file in Data notes.
- Round money to whole units and percentages to one decimal place.
- Maximum one page. No charts unless asked.
- Label assumptions clearly.
- Save to reports/YYYY-MM-DD-weekly-report.md (use the Friday date of the week).
- Do not edit any source data file.

## Before handing over, check
- [ ] Totals match the source files.
- [ ] Every change vs last week is calculated correctly.
- [ ] Nothing is estimated without being labelled.
- [ ] It fits on one page.
```

---

## Next steps

1. Replace every [placeholder] with your own values.
2. Add one or two real, anonymised examples next to each SKILL.md (for example `examples/proposal-won-2026-03.md`) and add a line in SKILL.md telling Claude to read them for tone and length.
3. Test each skill with three inputs using `05-skill-testing-checklist.md`.
