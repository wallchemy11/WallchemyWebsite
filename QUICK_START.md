# Quick Start Guide - Node 20 Setup

## ✅ You're Now on Node 20!

The server should be running with Node 20.20.0.

## To Use Node 20 in Your Terminal

**Every time you open a new terminal**, run:

```bash
source ~/.nvm/nvm.sh
cd "/Users/apple/Desktop/Wallchemy Website"
nvm use 20
```

Or simply:
```bash
source ~/.nvm/nvm.sh
nvm use  # Auto-detects .nvmrc file
```

## Verify It's Working

```bash
node -v  # Should show v20.20.0
```

## Start the Dev Server

```bash
cd "/Users/apple/Desktop/Wallchemy Website"
source ~/.nvm/nvm.sh
nvm use 20
npm run dev
```

## Access the CMS

1. Go to `http://localhost:3000/admin/login`
2. Login with:
   - Username: `admin@wallchemy.in` (or whatever you set in `.env.local`)
   - Password: `admin123` (or whatever you set in `.env.local`)

## Make Node 20 Automatic (Optional)

Add to `~/.zshrc`:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Auto-use .nvmrc
autoload -U add-zsh-hook
load-nvmrc() {
  local nvmrc_path="$(nvm_find_nvmrc)"
  [ -n "$nvmrc_path" ] && nvm use
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

Then: `source ~/.zshrc`
