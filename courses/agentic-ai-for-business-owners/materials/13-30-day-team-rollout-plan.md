# 30-Day Team Rollout Plan

Company: ______________________
Rollout owner (Accountable): ______________________
Builder (maintains the plugin): ______________________
Start date: ____ / ____ / ______    Day 30 review date: ____ / ____ / ______

Use this template to move your AI setup from your own machine to your team in 30 days. Fill every blank. A wave only starts when the previous one has a working routine and no open safety issue.

---

## Part 1. Before day 1 (preparation checklist)

- [ ] AI use policy (Module 11) finished and shared with the team.
- [ ] Skills, subagents and routines audited: each marked proven, promising or personal.
- [ ] Company knowledge moved into the shared project CLAUDE.md. Personal preferences left in personal ~/.claude/CLAUDE.md.
- [ ] Internal plugin created with proven items only. Name: ______________________
- [ ] `claude plugin validate ./<plugin-folder>` passes.
- [ ] Plugin tested in a clean session with `claude --plugin-dir ./<plugin-folder>`.
- [ ] Private marketplace repository created. Name: ______________________
- [ ] Plugin installed on one other machine with `claude plugin install <plugin>@<marketplace>`.
- [ ] RACI matrix filled, exactly one Accountable per skill or routine.
- [ ] Approval gates confirmed for anything that sends to clients, moves money or deletes data.
- [ ] Adoption scorecard set up.
- [ ] Kickoff message written and reviewed.

### Proven skills going into the plugin

| Skill or routine | What it does | Accountable | Approval gate? |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

---

## Part 2. The three waves

| Wave | Days | People | Scope | Entry condition |
|---|---|---|---|---|
| 1. Pilot | 1 to 7 | 2 or 3 credible people: ________ | Proven skills on real tasks | Plugin validated, policy shared |
| 2. First department | 8 to 21 | Department: ________ | Proven skills plus pilot fixes | Pilot has a working weekly routine, no open safety issue |
| 3. Whole team | 22 to 30 | Everyone who benefits | Full plugin v1.1 | Department adoption above 70 percent |

---

## Part 3. Day by day

Practice time: 15 minutes a day on the person's real work. Every task names the skill to use and what good output looks like.

### Week 1. Set up and first win (pilot group)

| Day | Activity | Owner | Done |
|---|---|---|---|
| 1 | Kickoff message sent. 30 minute kickoff meeting (agenda in Part 5). | Rollout owner | [ ] |
| 1 | Install Claude Code, sign in, add marketplace, install plugin. Run `/plugin` to confirm it is enabled. | Builder with each person | [ ] |
| 2 | First real task with one proven skill. Share the result in the team channel. | Each pilot user | [ ] |
| 3 | Second task with the same skill. Note anything confusing. | Each pilot user | [ ] |
| 4 | Try a second skill on a real task. | Each pilot user | [ ] |
| 5 | Friday check-in (agenda in Part 4). Fill adoption scorecard week 1. | Rollout owner | [ ] |

### Week 2. Their own work (pilot plus first department starts day 8)

| Day | Activity | Owner | Done |
|---|---|---|---|
| 8 | First department installs the plugin. Pilot users sit with them for setup. | Builder and pilot | [ ] |
| 8 | Each person lists two recurring tasks from their own week to run through skills. | Each user | [ ] |
| 9 to 11 | Daily 15 minute practice on those two tasks. | Each user | [ ] |
| 11 | Builder collects issues and ships quick fixes to the plugin. | Builder | [ ] |
| 12 | Friday check-in. Scorecard week 2. | Rollout owner | [ ] |

### Week 3. Habits and verification

| Day | Activity | Owner | Done |
|---|---|---|---|
| 15 | 20 minute session: verification habit (check output against source), plan mode with Shift+Tab for bigger tasks, `/clear` between unrelated jobs. | Rollout owner | [ ] |
| 16 to 18 | Pairing: each hesitant user pairs twice with a confident user. | Pilot champions | [ ] |
| 18 | Spot check: sample 10 outputs per skill, record rework rate. | Approver | [ ] |
| 19 | Friday check-in. Scorecard week 3. Decide if wave 3 can start. | Rollout owner | [ ] |

### Week 4. Contribute back and whole team (wave 3 starts day 22)

| Day | Activity | Owner | Done |
|---|---|---|---|
| 22 | Remaining team installs the plugin, paired with a champion. | Builder and champions | [ ] |
| 22 to 25 | Each person submits one improvement or new use case (Module 12 prioritization sheet). | Each user | [ ] |
| 25 | Builder ships the best two suggestions as a new plugin version. Announce who suggested them. | Builder | [ ] |
| 26 | Friday check-in. Scorecard week 4. | Rollout owner | [ ] |
| 29 | Simple certification: each person demonstrates two tasks end to end, including verification, to their manager. | Managers | [ ] |
| 30 | Day 30 review (Part 6). | Rollout owner | [ ] |

---

## Part 4. Friday check-in agenda (20 minutes)

1. Wins of the week, with names and hours saved (5 min).
2. What slowed you down? Collect every friction point for the Builder (5 min).
3. One skill or habit tip from a champion (5 min).
4. Confidence check, 1 to 5, recorded in the scorecard (2 min).
5. One action for next week, with an owner (3 min).

---

## Part 5. Kickoff message outline (under 250 words)

1. Why we are doing this: the work we want to take off everyone's plate.
2. What AI is for here, and what it is not for. Be explicit about roles.
3. What each team gains, in their words (the report nobody likes, the chasing, the copy and paste).
4. The rules: our AI use policy, what always needs approval, who to ask.
5. The plan: pilot group names, dates of each wave, 15 minutes a day.
6. How to raise concerns privately, and who to talk to.

Kickoff meeting (30 minutes): 5 min why, 10 min live demo of one proven skill on a real task, 5 min the rules, 10 min questions.

---

## Part 6. Day 30 review

| Metric | Target | Actual |
|---|---|---|
| People using a skill 3 or more times a week | 80 percent of rollout group | |
| Average confidence (1 to 5) | 3.5 or higher | |
| Rework rate on sampled outputs | Under 15 percent | |
| Hours saved per week, whole team | Set your own: ______ | |
| Open safety issues | 0 | |
| Improvements shipped from team suggestions | 2 or more | |

Decisions after day 30:

- Keep as is: ______________________
- Fix: ______________________
- Next three use cases (from Module 12): ______________________
- Next review date: ____ / ____ / ______
