# Automation Recipes

Copy-ready recipes for Module 10. Replace every value in angle brackets, like `<you>`, with your own. Checked against the official Claude Code documentation (code.claude.com/docs) in September 2026. Claude Code changes often: if a flag is rejected, run `claude --help` and check the docs.

Golden rules for anything that runs unattended:

1. Test by hand first, exactly as the scheduler will run it.
2. Use `--permission-mode dontAsk` and the shortest possible `--allowedTools` list.
3. Prefer redirecting output to a file over giving the agent write access.
4. Never give an unattended run permission to send, pay or delete.
5. Never use `--dangerously-skip-permissions` on your own computer. It is only for isolated containers or virtual machines.
6. Log every run in `10-routine-run-log.csv`.

---

## 1. Headless basics (`claude -p`)

Run from inside your business folder, so Claude Code loads your CLAUDE.md, skills and hooks.

```bash
# Ask a question and print the answer
claude -p 'Read finance/open-invoices.csv and list the five largest overdue invoices.'

# Use a prompt file and save the result to a dated report (Mac or Linux)
claude -p "$(cat prompts/weekly-ops-check.md)" > "ops/reports/ops-check-$(date +%F).md"

# Locked down: only reads allowed, anything that would ask for approval is denied
claude -p "$(cat prompts/weekly-ops-check.md)" \
  --permission-mode dontAsk \
  --allowedTools "Read" \
  > "ops/reports/ops-check-$(date +%F).md"

# Allow edits only inside one folder
claude -p '/weekly-report 2026-W39' \
  --permission-mode dontAsk \
  --allowedTools "Read,Edit(./reports/**)"

# JSON output with the result, session ID and an estimated cost
claude -p 'Summarise this week from ops/reports' \
  --permission-mode dontAsk --allowedTools "Read" \
  --output-format json

# Pipe data in
cat finance/open-invoices.csv | claude -p 'Build an aging table from this CSV.' > finance/reports/aging.md

# Continue the most recent conversation
claude -p 'Now draft reminders for the day 14 bucket only.' --continue
```

Useful flags:

| Flag | What it does |
|---|---|
| `-p` or `--print` | Run without the interactive conversation and print the result |
| `--permission-mode dontAsk` | Deny anything that would ask for approval, allow only pre-approved tools and ordinary reads |
| `--permission-mode acceptEdits` | Allow file edits and common file commands without asking (use with care) |
| `--allowedTools "Read,Edit(./reports/**)"` | Pre-approve specific tools, with optional path rules |
| `--output-format text, json or stream-json` | Choose the output format |
| `--append-system-prompt "..."` | Add instructions on top of Claude Code's defaults |
| `--continue` or `--resume <session-id>` | Continue a previous conversation |
| `--bare` | Skip loading CLAUDE.md, hooks, skills and MCP servers for a fast, identical run everywhere. Requires an API key (`ANTHROPIC_API_KEY`), not your subscription login, so most owners will not need it |

---

## 2. Mac: the script

Save as `~/ai/morning-brief.sh`, then run `chmod +x ~/ai/morning-brief.sh`.

First find where `claude` is installed, because schedulers do not load your normal terminal settings:

```bash
command -v claude
# Usually /Users/<you>/.local/bin/claude with the native installer
```

```bash
#!/bin/zsh
# Morning brief routine. Runs Claude Code headless and logs the result.

BUSINESS_DIR="/Users/<you>/ai/mybusiness"
CLAUDE="/Users/<you>/.local/bin/claude"
TODAY=$(date +%F)
START=$(date +%s)

cd "$BUSINESS_DIR" || exit 1
mkdir -p briefs logs

"$CLAUDE" -p "$(cat prompts/morning-brief.md)" \
  --permission-mode dontAsk \
  --allowedTools "Read" \
  > "briefs/brief-$TODAY.md" 2>> logs/routine-errors.log
STATUS=$?

END=$(date +%s)
RUNTIME=$(( (END - START) / 60 ))
if [ $STATUS -eq 0 ]; then RESULT="success"; else RESULT="failed"; fi

# Append to the run log. Minutes saved and notes are filled in by you when you review.
echo "$TODAY,$(date +%H:%M),morning-brief,launchd,$RESULT,$RUNTIME,,briefs/brief-$TODAY.md,,," >> logs/routine-run-log.csv
```

If the scheduled run cannot log in (it works in your terminal but fails under the scheduler), create a long-lived token once with `claude setup-token`, save it in a private file only you can read (`chmod 600`), and add this line near the top of the script:

```bash
export CLAUDE_CODE_OAUTH_TOKEN="$(cat /Users/<you>/.claude-token)"
```

Never put the token itself inside the script, a shared folder or a repository.

---

## 3. Mac: schedule with launchd (recommended on Mac)

Save as `~/Library/LaunchAgents/com.<yourbusiness>.morningbrief.plist`. This runs at 6:45am Monday to Friday.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.<yourbusiness>.morningbrief</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/zsh</string>
    <string>/Users/<you>/ai/morning-brief.sh</string>
  </array>
  <key>StartCalendarInterval</key>
  <array>
    <dict><key>Weekday</key><integer>1</integer><key>Hour</key><integer>6</integer><key>Minute</key><integer>45</integer></dict>
    <dict><key>Weekday</key><integer>2</integer><key>Hour</key><integer>6</integer><key>Minute</key><integer>45</integer></dict>
    <dict><key>Weekday</key><integer>3</integer><key>Hour</key><integer>6</integer><key>Minute</key><integer>45</integer></dict>
    <dict><key>Weekday</key><integer>4</integer><key>Hour</key><integer>6</integer><key>Minute</key><integer>45</integer></dict>
    <dict><key>Weekday</key><integer>5</integer><key>Hour</key><integer>6</integer><key>Minute</key><integer>45</integer></dict>
  </array>
  <key>StandardOutPath</key>
  <string>/Users/<you>/ai/mybusiness/logs/launchd-out.log</string>
  <key>StandardErrorPath</key>
  <string>/Users/<you>/ai/mybusiness/logs/launchd-err.log</string>
</dict>
</plist>
```

Load it, test it immediately, and remove it if needed:

```bash
# Load the schedule
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.<yourbusiness>.morningbrief.plist

# Run it right now to test
launchctl kickstart gui/$(id -u)/com.<yourbusiness>.morningbrief

# Remove the schedule
launchctl bootout gui/$(id -u)/com.<yourbusiness>.morningbrief
```

Notes: the Mac must be on and you must be logged in. If the Mac was asleep at 6:45, launchd runs the job when it wakes.

---

## 4. Mac or Linux: schedule with cron (alternative)

Open your schedule with `crontab -e` and add one line. This runs at 6:45am Monday to Friday:

```bash
45 6 * * 1-5 /bin/zsh /Users/<you>/ai/morning-brief.sh >> /Users/<you>/ai/mybusiness/logs/cron.log 2>&1
```

Cron fields are: minute, hour, day of month, month, day of week (1 is Monday). On recent macOS versions cron may need Full Disk Access to read some folders, which is why launchd is recommended on Mac.

---

## 5. Windows: the PowerShell script

Save as `C:\ai\morning-brief.ps1`. Find where claude is installed with `Get-Command claude` in PowerShell.

```powershell
# Morning brief routine for Windows
$BusinessDir = "C:\ai\mybusiness"
$Today = Get-Date -Format "yyyy-MM-dd"
$Start = Get-Date

Set-Location $BusinessDir
New-Item -ItemType Directory -Force -Path "briefs", "logs" | Out-Null

$Prompt = Get-Content -Raw "prompts\morning-brief.md"
claude -p $Prompt --permission-mode dontAsk --allowedTools "Read" | Out-File -Encoding utf8 "briefs\brief-$Today.md"
$Result = if ($LASTEXITCODE -eq 0) { "success" } else { "failed" }

$Runtime = [math]::Round(((Get-Date) - $Start).TotalMinutes)
Add-Content -Path "logs\routine-run-log.csv" -Value "$Today,$(Get-Date -Format HH:mm),morning-brief,task-scheduler,$Result,$Runtime,,briefs\brief-$Today.md,,,"
```

If `claude` is not found when the task runs, replace `claude` with the full path from `Get-Command claude`.

---

## 6. Windows: schedule with Task Scheduler

Run in PowerShell or Command Prompt. This creates a task at 6:45am Monday to Friday:

```
schtasks /create /tn "AI Morning Brief" /tr "powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\ai\morning-brief.ps1" /sc weekly /d MON,TUE,WED,THU,FRI /st 06:45
```

Test and manage it:

```
schtasks /run /tn "AI Morning Brief"
schtasks /query /tn "AI Morning Brief"
schtasks /delete /tn "AI Morning Brief" /f
```

You can also open the Task Scheduler app to see the history of each run. By default the task runs only when you are logged in.

---

## 7. Cloud routines (laptop closed)

If your files are in a GitHub repository and you use a claude.ai subscription login (Pro, Max, Team or Enterprise), you can create a routine that runs on Anthropic's cloud. Inside Claude Code:

```
/schedule every weekday at 6:47am, create my morning brief using prompts/morning-brief.md
/schedule list
/schedule run
```

You can also manage routines at claude.ai/code/routines. Points to know: routines are a research preview, there is a daily run cap, the minimum interval is one hour, they run without permission prompts, and every connector you include can be used including its write tools. Remove any connector the routine does not need. Scheduling a few minutes past the hour starts more reliably than exactly on the hour.

---

## 8. Hooks in settings.json

Hooks live in `.claude/settings.json` (project, shared with the team) or `~/.claude/settings.json` (just you). Type `/hooks` in Claude Code to see what is configured. Hooks receive details of the action as JSON on standard input. The examples use `jq`, which ships with recent macOS versions; otherwise install it with `brew install jq`.

### 8a. Audit log of every file change, and a block on risky commands

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -c '{tool: .tool_name, file: .tool_input.file_path}' >> \"$CLAUDE_PROJECT_DIR\"/logs/agent-edits.log"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-risky.sh"
          }
        ]
      }
    ]
  }
}
```

### 8b. The block script

Save as `.claude/hooks/block-risky.sh` and run `chmod +x .claude/hooks/block-risky.sh`.

```bash
#!/bin/bash
# Blocks risky shell commands. Exit code 2 blocks the action and shows the message to Claude.
COMMAND=$(jq -r '.tool_input.command')

if echo "$COMMAND" | grep -Eiq 'rm -rf|git push|curl .*(-X|--request) *(POST|DELETE)|sftp|scp '; then
  echo "Blocked by company policy: this action needs a human. Command was: $COMMAND" >&2
  exit 2
fi

exit 0
```

Test it: in Claude Code, ask it to run `git push` in a test folder. You should see the block message. If you do not, the hook is not working.

### 8c. Desktop alert when Claude needs you (Mac)

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

If you add several hooks, merge them into one `"hooks"` object in the same file rather than pasting several separate files together.

---

## 9. A custom command your team can run

Custom commands and skills are the same mechanism. Either of these creates `/weekly-report`:

- `.claude/skills/weekly-report/SKILL.md` (recommended, can hold templates next to it)
- `.claude/commands/weekly-report.md` (simpler, still supported)

```markdown
---
name: weekly-report
description: Builds the weekly owner report from the files in reports/. Use when someone asks for the weekly report.
argument-hint: [week, for example 2026-W39]
disable-model-invocation: true
---

Build the weekly report for $ARGUMENTS.

1. Read the latest exports in reports/data.
2. Fill reports/weekly-template.md. Every number cites its source file.
3. Write MISSING for anything you cannot find. Never estimate.
4. Save as reports/weekly-$ARGUMENTS.md and show me the three biggest changes.
5. Do not send or share anything.
```

Run it interactively with `/weekly-report 2026-W39`, or headless:

```bash
claude -p '/weekly-report 2026-W39' --permission-mode dontAsk --allowedTools "Read,Edit(./reports/**)"
```

`disable-model-invocation: true` means it only runs when a person types it. Leave it out if you want Claude to use it automatically when relevant.

---

## 10. Morning brief prompt starter

Save as `prompts/morning-brief.md` and adapt:

```
You are preparing my morning brief. Read only. Never send, reply, delete or change any file.

Sources:
- crm/crm-export.csv (yesterday's leads and deals)
- finance/reports/ (latest aging report)
- ops/reports/ (latest ops check)
- Email and calendar connectors, if available, read only

Output, maximum 300 words, in this order:
1. Yesterday in numbers: revenue invoiced, new leads, cash if available. Cite the source file.
2. Risks and overdue items.
3. Messages that need me personally (max 5), one line each.
4. Today's meetings with one line of context each.
5. My top three priorities for today, with the reason for each.

If a source is missing or older than 2 days, say so at the top. Never estimate a number.
```
