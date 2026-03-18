# claudetools

Custom MCP tools for Claude Code.

## CleanWebFetch

A drop-in alternative to Claude's built-in `WebFetch` that strips visual noise before the HTML ever hits your context window.

**What gets removed:**
- `<style>` blocks and `<link rel="stylesheet">` tags
- `style=` inline attributes
- Tailwind CSS utility classes (semantic classes are kept)
- `id=` values longer than 5 chars → replaced with short 5-char alphanumeric IDs (anchor `href="#..."` and `for=` references updated to match)

### Usage

Just call `CleanWebFetch` instead of `WebFetch`. Same signature:

```
CleanWebFetch(url: string, prompt?: string)
```

### Setup

```bash
npm install
npm run build
```

Then add to `~/.claude/.mcp.json`:

```json
{
  "mcpServers": {
    "clean-web-fetch": {
      "command": "node",
      "args": ["/path/to/claudetools/dist/index.js"]
    }
  }
}
```

Restart Claude Code to pick up the new server.
