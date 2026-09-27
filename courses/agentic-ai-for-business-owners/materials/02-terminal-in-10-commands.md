# The Terminal in 10 Commands (Mac and Windows)

Bruno Ashford, Agentic AI for Business Owners, Module 2

You do not need to learn "the terminal". You need about ten commands to move between folders, create your company workspace and start Claude Code. Everything else you will do in plain English, inside Claude.

Mac uses the Terminal app. Windows uses PowerShell. Where the command is the same on both, it is shown once.

---

## Open the terminal

| | Mac | Windows |
| --- | --- | --- |
| Open it | Press Cmd + Space, type Terminal, press Enter | Press Win + X, choose Windows PowerShell or Terminal |
| How you know you are in the right place | A line ending in % or $ with a blinking cursor | A line starting with PS C:\Users\YourName> |
| Paste | Cmd + V | Ctrl + V or right-click |

On Windows, if the line starts with C:\ and no PS, you are in CMD, not PowerShell. Close it and open PowerShell.

---

## The 10 commands

### 1. Where am I?

```
pwd
```

Shows the folder you are currently in. Works on Mac and in Windows PowerShell. Use it whenever you feel lost.

### 2. What is in this folder?

| Mac | Windows PowerShell |
| --- | --- |
| `ls` | `ls` or `dir` |

Lists the files and folders where you are.

### 3. Go into a folder

```
cd Documents
```

Moves you into a folder. If the folder name has spaces, wrap it in quotes: `cd "AI Department"`. Tip: type the first few letters and press Tab to auto-complete.

### 4. Go back up one level

```
cd ..
```

Two dots mean "the folder above this one". Works on both systems.

### 5. Go straight to your home folder

| Mac | Windows PowerShell |
| --- | --- |
| `cd ~` | `cd ~` |

The ~ symbol means your personal home folder (for example /Users/yourname on Mac or C:\Users\YourName on Windows).

### 6. Create folders

| Mac | Windows PowerShell |
| --- | --- |
| `mkdir Company` | `mkdir Company` |
| `mkdir Sales Marketing Finance Operations` | `mkdir Sales, Marketing, Finance, Operations` |

Creates one or several folders. Note the commas on Windows.

### 7. Open this folder in Finder or File Explorer

| Mac | Windows PowerShell |
| --- | --- |
| `open .` | `explorer .` |

The dot means "this folder". Handy to see what Claude created, in the normal window you are used to.

### 8. Clear the screen

| Mac | Windows PowerShell |
| --- | --- |
| `clear` | `cls` or `clear` |

Just tidies the screen. Nothing is deleted.

### 9. Start Claude Code in this folder

```
claude
```

Always cd into your company folder first, then type claude. Claude Code works inside the folder you start it in. The first time, it opens your browser so you can log in.

### 10. Check your installation

```
claude --version
claude doctor
```

The first prints the version number (proof it is installed). The second runs a read-only health check of your installation and settings, without starting a session.

---

## Inside Claude Code (once it is running)

These are not terminal commands. You type them inside a Claude Code session.

| Type this | What it does |
| --- | --- |
| Plain English | Ask for what you want, like you would brief an assistant |
| `/help` | Lists available commands |
| `/status` | Shows your account and how you are logged in |
| `/login` and `/logout` | Sign in or sign out |
| `/clear` | Starts a fresh conversation in the same folder |
| `/doctor` | Checks your setup from inside a session |
| Shift + Tab | Cycles permission modes (for example Manual, plan mode, auto) |
| Esc | Interrupts Claude if it is heading the wrong way |
| `exit` or Ctrl + D twice | Leaves Claude Code and returns to the terminal |

Useful extras from the terminal:

- `claude --continue` resumes your most recent conversation in this folder.
- `claude --resume` lets you pick an earlier conversation to resume.
- `claude update` updates Claude Code now instead of waiting for the automatic update.

---

## Five habits that prevent 90 percent of problems

1. Run pwd before you start Claude, so you know which folder it will work in.
2. Never start Claude in your whole home folder or Desktop. Start it in your company folder.
3. Use the up arrow to repeat a previous command instead of retyping it.
4. If something is stuck, press Ctrl + C once. It stops the current command.
5. After installing anything, close the terminal window and open a new one.

---

## Your first session, start to finish

Mac:

```
cd ~/Documents
mkdir Company
cd Company
mkdir Sales Marketing Finance Operations
claude
```

Windows PowerShell:

```
cd ~\Documents
mkdir Company
cd Company
mkdir Sales, Marketing, Finance, Operations
claude
```

Then, inside Claude, type:

```
Look at this folder and tell me what you see. Then create a file called README.md that explains, in plain English, what each subfolder is for in my business.
```
