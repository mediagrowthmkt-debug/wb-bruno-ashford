# Skill Testing Checklist

Agentic AI for Business Owners, Module 5
Bruno Ashford

A skill that works on the example you built it with proves almost nothing. Use this checklist for every skill before your team relies on it, and again after every change.

---

## Part 1: Structure check (before any test)

- [ ] The file is named exactly `SKILL.md` and sits in its own folder: `.claude/skills/<skill-name>/SKILL.md` (project) or `~/.claude/skills/<skill-name>/SKILL.md` (personal).
- [ ] The file starts with YAML frontmatter between two `---` lines.
- [ ] `name` uses lowercase letters, numbers and hyphens only, and matches the folder name.
- [ ] `description` says both what the skill does and when to use it.
- [ ] The description includes the everyday words your team uses to ask for this task.
- [ ] The instructions are numbered steps, not one long paragraph.
- [ ] The skill says what to do when an input is missing.
- [ ] The skill states what it must never do (its own red lines).
- [ ] The output format, length, file name and save location are defined.
- [ ] Every supporting file (template, examples, checklist) is mentioned in SKILL.md with when to use it.
- [ ] No real client names or personal data appear in the skill or its examples.
- [ ] SKILL.md is focused (for business skills, usually 30 to 120 lines; the official guidance is to stay under about 500 lines and move detail into separate files).
- [ ] The skill appears when you type `/skills`.

---

## Part 2: Prepare three test inputs

Save them inside the skill folder, for example `.claude/skills/<skill-name>/tests/`.

| Test | Purpose | Example for a complaint-reply skill |
|---|---|---|
| 1. Normal | The everyday case | Polite complaint about a late delivery with order number |
| 2. Difficult | Emotion, pressure or a wrong claim | Angry email with a false claim about what was promised |
| 3. Edge | Missing, strange or out-of-scope data | Two-line vague message with no order number |

Prompt to generate them:

```
Create three test inputs for the <skill-name> skill in .claude/skills/<skill-name>/tests/: a normal case, a difficult case and an edge case with missing information. Use made-up names and data.
```

---

## Part 3: Run the tests

For each test:

1. Type `/clear` to start fresh, so earlier answers do not influence the result.
2. Run the skill directly: `/<skill-name> <path to test file>`
3. Score the output with the table in Part 4.

Then one trigger test:

4. `/clear`, then ask for the task in plain English without the slash (for example "Can you help me answer this complaint?" and paste the text).
5. Confirm Claude used the skill. If it did not, improve the description.

---

## Part 4: Scoring table

Mark each cell Pass or Fail. Write the reason for every Fail.

| Criterion | Test 1 | Test 2 | Test 3 | Trigger test |
|---|---|---|---|---|
| Followed every step in order | | | | |
| Respected every red line (skill and CLAUDE.md) | | | | |
| Matched our voice | | | | |
| Handled missing or wrong data correctly (asked, flagged or left blank) | | | | |
| No invented facts, numbers or promises | | | | |
| Correct format and length | | | | |
| Saved in the right place with the right name | | | | |
| I would send or use this with light edits at most | | | | |
| Skill was picked up without the slash | n/a | n/a | n/a | |

Notes on failures:

```
Test:
What went wrong:
Which instruction or example allowed it:
Smallest fix:
```

---

## Part 5: Fix and retest

- [ ] Find the cause, not just the symptom. Usually one of: an ambiguous step, an example that contradicts a rule, an edge case not covered, a vague description.
- [ ] Make the smallest change that fixes it.
- [ ] Rerun ALL tests, not only the one that failed.
- [ ] Repeat until every cell passes.

Diagnosis prompt:

```
The <skill-name> skill failed test <n>: <what happened>. Read SKILL.md and its supporting files, tell me which instruction or example caused this, and propose the smallest change that fixes it without breaking the other tests.
```

---

## Part 6: Release and maintain

- [ ] Add a change note at the bottom of SKILL.md: date, what changed, why.
- [ ] Tell the team the skill exists, its slash command and what to type to use it.
- [ ] Every time a real output needs a correction, decide whether the skill should change.
- [ ] Save tricky real inputs (anonymised) as new test cases.
- [ ] Rerun the full test set after every change and at least once a month.
- [ ] If Claude Code does not pick up your edits in an open session, start a new session.

---

## Quick pass rule

A skill is ready for the team when:

1. All structure checks in Part 1 are ticked.
2. All three tests and the trigger test pass every criterion.
3. Nothing it produces would embarrass you in front of a client.
