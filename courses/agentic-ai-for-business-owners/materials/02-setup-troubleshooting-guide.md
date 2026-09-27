# Setup Troubleshooting Guide

Bruno Ashford, Agentic AI for Business Owners, Module 2

Checked against the official Claude Code documentation (code.claude.com/docs) in September 2026. Claude Code changes often: if a message on your screen does not match this guide, the official troubleshooting pages are the source of truth.

How to use this guide: find the exact words you see on screen in the left column, then follow the fix. Copy commands exactly.

---

## Before anything else: the 3-minute check

1. Is your computer supported? Mac: macOS 13.0 or later. Windows: Windows 10 version 1809 or later. At least 4 GB of RAM and an internet connection.
2. Do you have the right plan? Claude Code needs a Pro, Max, Team or Enterprise plan, or an Anthropic Console (API) account. The free Claude plan does not include Claude Code.
3. Did you open a new terminal window after installing? Many problems disappear with that alone.
4. Run the health check:

```
claude --version
claude doctor
```

A working install prints a version number such as `2.1.211 (Claude Code)`. `claude doctor` prints read-only diagnostics about your installation and settings, with suggested fixes.

---

## The install commands (for reference)

Mac, Linux and WSL:

```
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell:

```
irm https://claude.ai/install.ps1 | iex
```

Windows CMD:

```
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Alternatives: Homebrew on Mac (`brew install --cask claude-code`), WinGet on Windows (`winget install Anthropic.ClaudeCode`), or npm (`npm install -g @anthropic-ai/claude-code`, requires Node.js 22 or later). The native installer is the recommended option and updates itself automatically. Homebrew and WinGet installs do not update automatically.

---

## Installation problems

### "command not found: claude" (Mac)

The installer worked, but your terminal does not know where to find Claude yet. For the default Mac shell (zsh), run:

```
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Then open a new terminal window and type `claude` again. The installer also prints the exact fix under "Setup notes" at the end of the install; you can run that instead.

### "'claude' is not recognized" (Windows)

Same cause: the install folder is not on your PATH. In PowerShell, run:

```
$currentPath = [Environment]::GetEnvironmentVariable('PATH', 'User')
[Environment]::SetEnvironmentVariable('PATH', "$currentPath;$env:USERPROFILE\.local\bin", 'User')
```

Close PowerShell, open a new window and try `claude` again.

### "'irm' is not recognized" (Windows)

You are in CMD, not PowerShell. Either close the window and open PowerShell (Win + X, then Windows PowerShell), or use the CMD install command above.

### "The token '&&' is not a valid statement separator" (Windows)

The opposite: you pasted the CMD command into PowerShell. Use `irm https://claude.ai/install.ps1 | iex` instead.

### "syntax error near unexpected token '<'" or HTML appears in the terminal

The install address returned a web page instead of the installer. If the page mentions "App unavailable in region", Claude Code is not available in your country. Otherwise, run the command again. On Mac, if it keeps happening, install with Homebrew:

```
brew install --cask claude-code
```

### "SSL/TLS" or "Could not create SSL/TLS secure channel" (older Windows 10)

Run this line first, then retry the install:

```
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
irm https://claude.ai/install.ps1 | iex
```

### "unable to get local issuer certificate"

Usually a company network or security software inspecting traffic. Try from a different network (for example your phone hotspot) to confirm, then ask your IT provider to configure the corporate certificate for Claude Code.

### "Claude Code does not support 32-bit Windows"

On a 64-bit computer, this means you opened "Windows PowerShell (x86)". Close it, open the Start menu entry without "(x86)", and run the install again.

### "Claude Code on Windows requires either Git for Windows (for bash) or PowerShell"

Claude Code needs at least one shell. Make sure normal Windows PowerShell is available, or install Git for Windows from git-scm.com/downloads/win (accept the defaults). Git for Windows is optional but recommended on native Windows.

### "dyld: cannot load" or "built for Mac OS X 13.0" (Mac)

Your macOS is older than 13.0. Check in Apple menu, About This Mac, and update through Software Update.

### Permission errors (EACCES) during install

If you installed with npm before, switch to the native installer:

```
curl -fsSL https://claude.ai/install.sh | bash
```

Never use `sudo npm install -g`. It causes exactly these permission problems.

### Two different versions, or Claude behaves strangely after reinstalling

You may have more than one installation. On Mac, list them:

```
which -a claude
```

Keep one installation method and uninstall the others.

---

## Login and account problems

### The browser does not open for login

When Claude Code asks you to log in, press `c` to copy the login link, then paste it into your browser yourself.

### "OAuth error: Invalid code"

The login code expired or was cut off when copied. Press Enter to retry and finish the login quickly after the browser opens.

### Login keeps failing and the reason is not obvious

Reset your login:

1. Inside Claude Code, type `/logout`.
2. Close Claude Code.
3. Start it again with `claude` and log in again.

### "403 Forbidden" after logging in

- Pro or Max: check your subscription is active at claude.ai/settings.
- Console (API) account: your administrator must give you the "Claude Code" or "Developer" role in the Anthropic Console, under Settings, Members.
- Company network with a proxy: the proxy may be blocking requests. Ask IT.

### "This organization has been disabled" but your subscription is active

An old API key set on your computer is overriding your subscription. Mac:

```
unset ANTHROPIC_API_KEY
claude
```

Windows PowerShell:

```
Remove-Item Env:ANTHROPIC_API_KEY
claude
```

To make it permanent, remove any `export ANTHROPIC_API_KEY=...` line from `~/.zshrc`, `~/.bashrc` or `~/.profile` (Mac), or from your User environment variables (Windows). Inside Claude Code, `/status` shows which login is active.

### "Claude Code access has not been granted for this account"

Your company's Claude Enterprise administrator has not given your role access to Claude Code. Only the administrator can fix this.

### Billing, a subscription that is not recognised, or a login loop that nothing fixes

This is an account issue, not an install issue. Sign in at claude.ai, click your initials in the lower left and choose Get help.

---

## Problems once it is running

| What you see | What to do |
| --- | --- |
| Claude seems stuck | Press Esc to interrupt, or Ctrl + C. Restart with `claude --resume` to pick the conversation back up. |
| It feels slow or heavy after a long session | Type `/compact` to shrink the conversation, or `/clear` to start fresh. |
| Claude edits files without asking | Check the permission mode shown on screen and press Shift + Tab to cycle to the one you want. Manual mode asks before edits and commands. |
| Weird characters in the VS Code terminal | Type `/terminal-setup` inside Claude Code. |
| Anything else | Type `/doctor` inside Claude Code for an automated check, or `/feedback` to report it. |

---

## Uninstall and start clean (last resort)

Native install on Mac:

```
rm -f ~/.local/bin/claude
rm -rf ~/.local/share/claude
```

Native install on Windows PowerShell:

```
Remove-Item -Path "$env:USERPROFILE\.local\bin\claude.exe" -Force
Remove-Item -Path "$env:USERPROFILE\.local\share\claude" -Recurse -Force
```

Then run the install command again. Your settings in the `.claude` folder in your home directory are kept unless you delete them on purpose (deleting them removes your settings and session history).

---

## When you ask for help, send this

Copy the output of these two commands into your message, together with a screenshot of the error:

```
claude --version
claude doctor
```

Say whether you are on Mac or Windows, and whether you used the native installer, Homebrew, WinGet or npm.
