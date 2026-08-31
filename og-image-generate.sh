#!/bin/bash
# Generate the OG image (2400x1260, 2x retina of 1200x630)
# Requires: ImageMagick 7+ (magick command) and Avenir
# Usage: ./og-image-generate.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOGO="$SCRIPT_DIR/brand/logo-color.png"
OUTPUT="$SCRIPT_DIR/og-image.png"

magick -size 2400x1260 xc:'#FFFFFF' \
  -fill '#FC4C03' -draw "rectangle 0,0 24,1260" \
  \( "$LOGO" -resize 1500x \) \
  -gravity NorthWest -geometry +140+330 -composite \
  -font 'Avenir-Book' \
  -fill '#6B7280' -pointsize 64 -gravity NorthWest \
  -annotate +148+760 'Products for agents, built by' \
  -annotate +148+845 'AI-native teams that learn fast' \
  "$OUTPUT"

echo "Generated: $OUTPUT"
