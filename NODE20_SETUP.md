# Node 20 Setup - Quick Reference

## ✅ You're Now on Node 20!

The server is running with Node 20.20.0 and the site is working (homepage returns 200).

## To Use Node 20 in Your Terminal

Every time you open a new terminal, run:

```bash
source ~/.nvm/nvm.sh
nvm use 20
```

Or, from the project directory:

```bash
cd "/Users/apple/Desktop/Wallchemy Website"
source ~/.nvm/nvm.sh
nvm use  # This will automatically use Node 20 from .nvmrc
```

## Make it Automatic (Recommended)

Add this to your `~/.zshrc` file:

```bash
# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Auto-use .nvmrc when entering directory
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

Then reload your shell:
```bash
source ~/.zshrc
```

## Verify Node Version

```bash
node -v  # Should show v20.x.x
```

## Current Status

- ✅ Node 20.20.0 active
- ✅ Homepage working (200 status)
- ✅ Middleware compiled successfully
- ✅ Server running on http://localhost:3000
