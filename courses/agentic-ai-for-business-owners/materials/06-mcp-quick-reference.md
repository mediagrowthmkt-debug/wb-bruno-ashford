# MCP Quick Reference for Business Owners

Module 6, Connecting Your Tools. Agentic AI for Business Owners, by Bruno Ashford.

Commands checked against the official Claude Code documentation (code.claude.com/docs/en/mcp) in September 2026. Screens change often; if a command behaves differently, run `claude mcp --help` or check the docs.

---

## The idea in one paragraph

MCP (Model Context Protocol) is a standard plug. A tool such as your CRM, drive or project manager publishes an MCP server. Claude Code connects to it and receives a set of tools (search, read, create, update, send). Claude can only use the tools the server offers, and you control which ones need approval or are blocked.

---

## Two ways to connect

| Route | Best for | How |
|---|---|---|
| claude.ai connectors | Owners, Gmail, Google Calendar, Google Drive, Microsoft 365 and other listed apps | Add in your claude.ai account connector settings, sign in there. They appear automatically in Claude Code when you are logged in with the same account. |
| `claude mcp add` in the terminal | Tools whose vendor publishes an MCP URL (for example a CRM) | Run the command with the vendor's official URL, then sign in through `/mcp`. |

---

## Everyday commands

| What you want | Command |
|---|---|
| See all connected servers and their health | `claude mcp list` |
| See details of one server | `claude mcp get <name>` |
| Remove a server | `claude mcp remove <name>` |
| Check status, sign in, view tools (inside a session) | `/mcp` |
| Sign in to a server from the terminal | `claude mcp login <name>` |
| Sign out of a server | `claude mcp logout <name>` |
| Import servers you set up in Claude Desktop | `claude mcp add-from-claude-desktop` |

---

## Adding a remote server (the most common case)

```
claude mcp add --transport http <name> <url>
```

Example from the official documentation:

```
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com
```

For owners, I recommend starting with `--scope local` instead (see scopes below).

If the vendor gives you an API token instead of a sign-in flow:

```
claude mcp add --transport http <name> <url> --header "Authorization: Bearer YOUR_TOKEN"
```

Note: the older SSE transport (`--transport sse`) still exists but is deprecated. Use `http` when the vendor supports it.

## Adding a local server (runs on your computer)

Everything after the double dash is the command that starts the server. Environment variables go before the double dash.

```
claude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable -- npx -y airtable-mcp-server
```

---

## Scopes: who gets the connection

| Scope | Flag | Stored in | Shared with team? | Use it for |
|---|---|---|---|---|
| Local (default) | `--scope local` | `~/.claude.json` | No, just you in this project | Testing, anything with client data |
| Project | `--scope project` | `.mcp.json` in the project folder | Yes, anyone with the project | Connectors that passed your risk check |
| User | `--scope user` | `~/.claude.json` | No, just you, all projects | Personal utilities |

Claude Code asks for approval before using project-scoped servers from a `.mcp.json` file. To reset those choices: `claude mcp reset-project-choices`.

---

## Keeping secrets out of shared files

In `.mcp.json`, reference environment variables instead of pasting keys:

```json
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "https://api.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}"
      }
    }
  }
}
```

- `${VAR}` uses the environment variable
- `${VAR:-default}` uses a default if the variable is not set

---

## Blocking risky tools

MCP tools are named `mcp__<server>__<tool>`. You can see the exact names in `/mcp`. Add deny rules in your project settings for tools that send, delete or pay, so an ambiguous instruction can never trigger them. Module 11 covers permissions in depth.

---

## Useful settings

| Situation | What to do |
|---|---|
| A tool returns huge results and you get a warning | Claude Code warns above 10,000 tokens of MCP output and limits at 25,000 by default. Raise with `export MAX_MCP_OUTPUT_TOKENS=50000` before starting `claude`. Better: ask for filtered results. |
| A server is slow to start | `MCP_TIMEOUT=10000 claude` (milliseconds) |
| You want no claude.ai connectors in Claude Code | `export ENABLE_CLAUDEAI_MCP_SERVERS=false` before starting, or toggle individual connectors in `/mcp` |

---

## Browser access

For work in sites where you are already signed in, use the Claude in Chrome extension:

| What you want | Command |
|---|---|
| Start a session with browser access | `claude --chrome` |
| Check connection, reconnect, set as default | `/chrome` |

Claude pauses at login pages and CAPTCHAs so you handle them. Site permissions are managed in the extension settings.

---

## Safety rules I use with every client

1. Only connect servers you trust: claude.ai connectors or official vendor servers first.
2. Start at local scope. Share at project scope only after a clean week.
3. Read first, then drafts, then (maybe) writes. Sending stays human until you have months of evidence.
4. Be extra careful with any server that reads outside content (emails, web pages, forms). That is where prompt injection comes from.
5. Every connector has an exit: remove it in Claude Code AND revoke it in the vendor's admin panel.
6. Score every connector with the Connector Risk Assessment Checklist.
