#!/bin/zsh
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
exec /opt/homebrew/bin/node node_modules/next/dist/bin/next dev -p 3000
