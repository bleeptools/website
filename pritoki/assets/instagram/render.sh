#!/bin/sh
# Renders every poster in poster.html to a 1080×1350 PNG next to this script.
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
n=1
for p in groove blend capture model play setup; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --window-size=1080,1350 --virtual-time-budget=4000 \
    --screenshot="$PWD/pritoki-0$n-$p.png" "file://$PWD/poster.html?p=$p" 2>/dev/null
  n=$((n + 1))
done
ls -1 pritoki-*.png
