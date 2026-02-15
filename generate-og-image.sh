#!/bin/bash
# Generate the OG image (2400x1260, 2x retina of 1200x630)
# Requires: ImageMagick 7+ (magick command)
# Usage: ./generate-og-image.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BRAND="$SCRIPT_DIR/brand-book"
ICON="$BRAND/agentic_builders_logo_package/agentic_builders_icon_color.png"
FONT_BOLD="$BRAND/Urbanist/static/Urbanist-Bold.ttf"
FONT_REGULAR="$BRAND/Urbanist/static/Urbanist-Regular.ttf"
OUTPUT="$SCRIPT_DIR/og-image.png"

magick -size 2400x1260 xc:'#FFFFFF' \
  -fill '#FC4C03' -draw "rectangle 0,0 24,1260" \
  \( "$ICON" -resize 700x700 -alpha set -channel A -evaluate multiply 0.06 +channel \) \
  -gravity East -geometry +60+0 -composite \
  \( "$ICON" -resize 88x88 \) \
  -gravity NorthWest -geometry +160+430 -composite \
  -font "$FONT_BOLD" \
  -fill '#1F2937' -pointsize 96 -gravity NorthWest \
  -annotate +160+560 'Agentic Builders' \
  -font "$FONT_REGULAR" \
  -fill '#6B7280' -pointsize 38 -gravity NorthWest \
  -annotate +160+700 'We help agentic founders build AI-native companies from day one' \
  "$OUTPUT"

echo "Generated: $OUTPUT"
