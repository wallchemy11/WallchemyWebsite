# How to Switch to Node 20

## Quick Method (Using nvm)

You have nvm installed and a `.nvmrc` file already set to `20`. Here's how to switch:

### In Your Terminal:

```bash
# Load nvm
source ~/.nvm/nvm.sh

# Install Node 20 (if not already installed)
nvm install 20

# Use Node 20 for this project
cd "/Users/apple/Desktop/Wallchemy Website"
nvm use

# Verify
node -v  # Should show v20.x.x
```

### Make it Permanent (Optional)

Add to your `~/.zshrc` or `~/.bashrc`:

```bash
# Auto-switch to Node version in .nvmrc when entering directory
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## Alternative: Use Node 20 Binary Directly

If nvm isn't working, you can use the Node 20 binary directly:

```bash
# Find where Node 20 is installed
ls ~/.nvm/versions/node/

# Use it directly
~/.nvm/versions/node/v20.x.x/bin/node --version

# Or create an alias
alias node20='~/.nvm/versions/node/v20.x.x/bin/node'
```

## After Switching

1. **Restart your dev server:**
   ```bash
   # Kill current server
   pkill -f "next dev"
   
   # Start fresh with Node 20
   npm run dev
   ```

2. **Verify it's working:**
   - Check `node -v` shows v20.x.x
   - Server should start without middleware manifest errors
   - Homepage should load (200 status)

## Why Node 20?

- **More Stable** - Node 20 LTS is the recommended version for Next.js 14
- **Fewer Bugs** - Node 24 is very new and has compatibility issues
- **Better Performance** - More tested and optimized
- **Fixes Middleware Issue** - The middleware-manifest.json error is a Node 24 + Next.js 14.2.35 bug
