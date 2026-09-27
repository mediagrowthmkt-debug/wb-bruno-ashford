# Revenue Prompt Pack

Module 8, Revenue Playbooks. Agentic AI for Business Owners, by Bruno Ashford.

Copy-ready prompts for the six revenue playbooks. Replace every `[bracketed]` item with your own details. They assume you have a CLAUDE.md with your business context and, where mentioned, the subagents from Module 7 (sdr-researcher, copywriter, data-analyst, reviewer) and connectors from Module 6.

Three rules apply to every prompt in this pack:

1. Nothing is sent, published or changed without your approval. Drafts only.
2. Every fact needs a source. If the agent cannot find one, it says "not found".
3. Anything client-facing goes through the reviewer before a human sends it.

---

## 1. Prospecting and lead research

### 1.1 Sharpen your ideal customer profile

```
Read CLAUDE.md and my last 20 customers in [data/customers.csv]. Describe our ideal customer profile in one page: industry, size, location, who decides, budget range, the trigger events that usually come before they buy, and the three types of customer we should avoid. Mark anything you are guessing. Then suggest an updated "Ideal customer" section for CLAUDE.md for me to approve.
```

### 1.2 Build a starting list

```
Using the ideal customer profile in CLAUDE.md, find [20] companies in [city or region] that fit. For each: company name, website, why they fit (one line), and the source link. Save as leads/prospects-[date].csv with columns company, website, fit_reason, source. Public business information only.
```

### 1.3 Research every lead

```
Use the sdr-researcher subagent to research every company in leads/prospects-[date].csv, in parallel batches of 5. Return a table sorted by fit score with: company, fit score (1 to 5), best recent trigger event, suggested opening observation, and research file path.
```

### 1.4 Prepare for a sales call

```
I have a call with [name] from [company] on [date]. Read research/leads/[company].md and any emails or CRM notes about them. Give me a one-page call brief: who they are, what they probably need, three smart questions to ask, likely objections with a short answer for each, and the one outcome I should aim for at the end of the call.
```

---

## 2. Follow-up

### 2.1 Find the overdue leads

```
Read my CRM, read-only. List every open lead or deal where the last contact was more than [5] days ago and there is no future task scheduled. For each: name, company, stage, days since last contact, what was last discussed (from notes and emails), and deal value. Sort by deal value, highest first.
```

### 2.2 Draft the follow-ups

```
Use the copywriter subagent to draft a follow-up for each lead on this list, following the follow-up rules in CLAUDE.md. Each message must mention something specific from our last conversation and offer one clear next step with a date or a choice. Under 80 words. Create them as drafts in my email, not sent. Then list them for my review.
```

### 2.3 Update the CRM after sending

```
I have sent the follow-ups to: [list of names]. Prepare CRM updates to log each one as an email activity today and set a follow-up task in [5] days. Show me a preview table first (record, field, current value, new value) and wait for my approval before writing anything.
```

### 2.4 Close the loop

```
For leads that have received [4] follow-ups with no reply, draft a short, friendly close-the-loop message that makes it easy to say "not now" or "yes, let's talk". Under 60 words. No guilt, no pressure. Drafts only.
```

---

## 3. Proposals

### 3.1 Draft from the conversation

```
Using my proposal skill, write a proposal for the client in [clients/name/call-date.md]. Use their exact words when describing their problem and goals. Apply the pricing rules from the skill and show the calculation. Offer three options (essential, recommended, complete). Mark anything you had to assume with [CONFIRM]. Save it to [clients/name/proposal-draft.md].
```

### 3.2 Review and fix

```
Use the reviewer subagent on [clients/name/proposal-draft.md]. Fix every blocker and important issue, run the review again, and list any [CONFIRM] items I still need to decide.
```

### 3.3 Objection-proof it

```
Read the final proposal. List the five objections this client is most likely to raise, based on the call notes. For each, check whether the proposal already answers it. Where it does not, suggest one sentence to add and where to put it.
```

### 3.4 Proposal follow-up

```
The proposal for [client] was sent on [date] and there is no reply. Draft a follow-up that adds one new piece of value (a relevant example, an answer to a question they raised on the call, or a simple next step). Under 80 words. Draft only.
```

---

## 4. Content

### 4.1 Mine ideas from real conversations

```
Read [support/messages-export.csv, call notes in clients/, and recent reviews]. List 15 content ideas based on real questions, objections and stories from our customers. For each: the idea in one sentence, the customer problem behind it, and the best format (post, email, short video). Anonymise every customer.
```

### 4.2 One idea, four formats

```
Take this idea: [paste your idea]. Using the copywriter subagent and the brand voice in CLAUDE.md, create: 1 LinkedIn post (under 200 words), 1 Instagram caption with a hook in the first line, 1 short newsletter email (under 150 words, one call to action), and 1 script for a 45-second video (hook in the first 3 seconds, one point, one call to action). Save them to content/[date]-[short-title]/. Do not publish anything.
```

### 4.3 Monthly content plan

```
Using CLAUDE.md, the ideas in content/ideas.md and the key dates in our market for [month], build a content plan for [month]: [3] posts per week and [1] newsletter. For each item: date, channel, idea, format, goal (awareness, trust, or sale). Put it in a table and save it to content/plan-[month].md.
```

### 4.4 Voice check

```
Read the drafts in content/[folder]/. Compare them with the brand voice in CLAUDE.md and our best past posts in [examples/]. List every sentence that does not sound like us and explain why in a few words. Then suggest one new rule I could add to the voice section of CLAUDE.md.
```

---

## 5. Campaign and competitor analysis

### 5.1 Campaign performance in plain English

```
Use the data-analyst subagent on the files in data/campaigns/. For each campaign, calculate spend, leads, cost per lead, and, by matching lead source in the CRM export, customers won and cost per customer. Explain in plain English which campaigns to scale, which to fix and which to pause, and why. Flag any data you could not match.
```

### 5.2 Competitor offers and ads

```
Research the public ads and landing pages of my top [3] competitors (listed in CLAUDE.md). For each: main offer, price if shown, main promise, call to action, and what makes it different from ours. Cite links. Then suggest 3 ad angles we are not using that fit our strengths.
```

### 5.3 The one change this week

```
Based on the latest campaign analysis in reports/ and the competitor research in research/, recommend the single change with the biggest expected impact this week. Explain the expected effect, how we will measure it, and what result after 7 days would tell us to keep or reverse it.
```

### 5.4 Month over month

```
Compare reports/[this month's campaign file] with reports/[last month's file]. What improved, what got worse, and which of last month's changes seem to have worked? Separate what the data shows from your interpretation.
```

---

## 6. Customer service

### 6.1 Build the FAQ from real messages

```
Read the customer messages in support/messages-export.csv. Group them into the 15 most common questions. For each, write an approved answer in our brand voice using only facts from CLAUDE.md and our policies in support/policies.md. Mark any answer where the policy is unclear with [OWNER TO DECIDE]. Save it as support/faq.md.
```

### 6.2 Daily triage and drafts

```
Read today's new customer messages. Do not send anything. Sort them into ROUTINE, HUMAN and URGENT using the escalation rules in CLAUDE.md. For ROUTINE, create a draft reply using support/faq.md. For HUMAN and URGENT, give me a two-line summary, the customer's emotional state, and who on the team should handle it.
```

### 6.3 Reply to a difficult review

```
Draft a reply to this public review: [paste review]. Thank them, acknowledge the specific issue without admitting legal fault, do not argue, do not share any private details, and invite them to continue the conversation privately at [contact]. Under 90 words. Give me two versions: one warmer, one more formal. Draft only.
```

### 6.4 What the questions reveal

```
Compare this month's customer messages with support/faq.md. List new questions to add, answers that need updating, and the three repeated questions that point to a problem in our product, website or process. For each problem, suggest one fix at the source.
```

---

## Escalation list to paste into CLAUDE.md

```
## Customer service escalation rules
Always send to a human, never draft a final answer alone:
- Refunds, payments, billing disputes or anything involving money
- Complaints about a staff member
- Legal threats, safety issues, injuries or property damage
- Health, medical or wellbeing questions
- Requests about personal data (access, deletion, correction)
- Any message with strong emotion (anger, distress, fear)
- Press, influencers or public complaints with a large audience
```
