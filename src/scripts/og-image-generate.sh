#!/bin/bash
# Generate the OG image (2400x1260, 2x retina of 1200x630)
# Requires: ImageMagick 7+ (magick command), curl and network access for Urbanist fonts
# Usage: ./src/scripts/og-image-generate.sh (from the repository root)
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ICON="$SCRIPT_DIR/../static/brand/icon-color.png"
# Pin the upstream font revision; temporary fonts are not published with the site.
FONT_SOURCE="https://raw.githubusercontent.com/coreyhu/Urbanist/549716453f76335ccc5a9e537cbe0da03d6fed34/fonts/ttf"
FONT_DIR="$(mktemp -d "${TMPDIR:-/tmp}/agentic-builders-og.XXXXXX")"
trap 'rm -rf "$FONT_DIR"' EXIT
for weight in Bold Regular; do
  curl --fail --silent --show-error --location "$FONT_SOURCE/Urbanist-$weight.ttf" -o "$FONT_DIR/Urbanist-$weight.ttf"
done
FONT_BOLD="$FONT_DIR/Urbanist-Bold.ttf"
FONT_REGULAR="$FONT_DIR/Urbanist-Regular.ttf"
OUTPUT="$SCRIPT_DIR/../static/og-image.png"

magick -size 2400x1260 xc:'#FFFFFF' \
  -fill '#FC4C03' -draw "rectangle 0,0 24,1260" \
  \( "$ICON" -trim +repage -resize 480x480 \) \
  -gravity East -geometry +40+0 -composite \
  -font "$FONT_BOLD" \
  -fill '#1F2937' -pointsize 180 -gravity NorthWest \
  -annotate +140+380 'Agentic Builders' \
  -font "$FONT_REGULAR" \
  -fill '#6B7280' -pointsize 56 -gravity NorthWest \
  -annotate +148+720 'Products for AI agents,' \
  -annotate +148+790 'built by people and AI agents' \
  "$OUTPUT"

echo "Generated: $OUTPUT"
