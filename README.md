## CleanWebFetch

A drop-in alternative to Claude's built-in `WebFetch` that strips visual noise before the HTML ever hits your context window.

**What gets removed:**
- `<style>` blocks and `<link rel="stylesheet">` tags
- `style=` inline attributes
- Tailwind CSS utility classes (semantic classes are kept)
- Non-semantic/generated class names — CSS-in-JS hashes like `sc-gYbzsP` are detected via a three-layer check: known prefix patterns, vowel-ratio heuristic, and a ~1200-word dictionary with suffix stemming. Semantic classes are always preserved.
- `id=` values longer than 5 chars → replaced with page-unique 5-char alphanumeric IDs (anchor `href="#..."` and `for=` references updated to match)

### Benchmark

Tested against static HTML (no JS execution) across a representative set of sites:

| Page              | Before    | After     | Reduction |
|-------------------|-----------|-----------|-----------|
| Wikipedia (random)| 125.0 KB  | 103.4 KB  | 17.3%     |
| BBC News          | 330.7 KB  | 234.7 KB  | 29.0%     |
| Ars Technica      | 390.7 KB  | 309.6 KB  | 20.8%     |
| The Verge         | 878.3 KB  | 762.4 KB  | 13.2%     |
| NY Times          | 1486.5 KB | 1349.8 KB | 9.2%      |
| **TOTAL**         | **3211 KB**| **2760 KB**| **14.1%** |

> Note: Sites that deliver most content via JS bundles (NY Times, The Verge) show lower reduction since the static HTML is already lean. Tailwind-heavy SPAs typically see larger gains.

### Usage

Call `CleanWebFetch` instead of `WebFetch`. Same signature:

```
CleanWebFetch(url: string, prompt?: string)
```

To disable the built-in `WebFetch` so Claude uses `CleanWebFetch` exclusively, add it to the deny list in `~/.claude/settings.json`:

```json
{
  "permissions": {
    "deny": ["WebFetch"]
  }
}
```

Claude will then fall back to `CleanWebFetch` automatically when it needs to fetch a URL.

### Install

One-liner for Mac, Linux, and WSL (requires `node` ≥ 18 and `git`):

```bash
git clone https://github.com/njreid/cleanfetch.git ~/.claude/tools/cleanfetch && cd ~/.claude/tools/cleanfetch && npm install && npm run build && python3 -c "
import json, pathlib
p = pathlib.Path.home() / '.claude' / '.mcp.json'
d = json.loads(p.read_text()) if p.exists() else {}
d.setdefault('mcpServers', {})['clean-web-fetch'] = {'command': 'node', 'args': [str(pathlib.Path.home() / '.claude' / 'tools' / 'cleanfetch' / 'dist' / 'index.js')]}
p.write_text(json.dumps(d, indent=2))
print('Installed. Restart Claude Code to activate CleanWebFetch.')
"
```

Then restart Claude Code to pick up the new server.

To block the built-in `WebFetch` and use `CleanWebFetch` exclusively, also add to `~/.claude/settings.json`:

```json
{
  "permissions": {
    "deny": ["WebFetch"]
  }
}
```

### Manual setup

```bash
git clone https://github.com/njreid/cleanfetch.git
cd cleanfetch
npm install && npm run build
```

Add to `~/.claude/.mcp.json`:

```json
{
  "mcpServers": {
    "clean-web-fetch": {
      "command": "node",
      "args": ["/path/to/cleanfetch/dist/index.js"]
    }
  }
}
```

Restart Claude Code to pick up the new server.

### Development

```bash
npm test   # fetches the benchmark sites and prints a before/after size table
```

Interested in some semi-structured thoughts about how best to think about launching agentic and LLM-backed projects?

[Agentic Wrestl.ing](https://agenticwrestl.ing/)
