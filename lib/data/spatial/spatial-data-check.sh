#!/bin/bash

# Get directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

FOLDERS=(
  "$SCRIPT_DIR/forest_types_ar"
  "$SCRIPT_DIR/forest_types_fl"
  "$SCRIPT_DIR/forest_types_lu"
  "$SCRIPT_DIR/forest_types_ne"
  "$SCRIPT_DIR/forest_types_zh"
  "$SCRIPT_DIR/forest_types_zh_2"
  "$SCRIPT_DIR/forest_types_fr"
  "$SCRIPT_DIR/forest_types_ju"
  "$SCRIPT_DIR/forest_types_bl"
  "$SCRIPT_DIR/forest_types_so"
  "$SCRIPT_DIR/forest_types_sh"
  "$SCRIPT_DIR/forest_types_vd"
  "$SCRIPT_DIR/forest_types_sg"
  "$SCRIPT_DIR/forest_types_gl"
  # "$SCRIPT_DIR/forest_types_tg"
  "$SCRIPT_DIR/forest_types_sz"
  "$SCRIPT_DIR/altitudinal_zones_1995"
  "$SCRIPT_DIR/altitudinal_zones_2085_dry"
  "$SCRIPT_DIR/altitudinal_zones_2085_less_dry"
  "$SCRIPT_DIR/cantonal_boundaries"
  "$SCRIPT_DIR/forest_ecoregions"
  "$SCRIPT_DIR/silver_fir_areas"
  "$SCRIPT_DIR/altitudinal_zones_vd"
)

all_good=true

for folder in "${FOLDERS[@]}"; do
  if [[ -d "$folder" ]]; then
    count=$(find "$folder" -maxdepth 1 -type f \( -iname "*.shp" -o -iname "*.gpkg" \) | wc -l)
    if [[ $count -gt 0 ]]; then
      echo "✅ $folder contains $count .shp/.gpkg file(s)"
    else
      echo "⚠️  $folder exists but has no .shp or .gpkg files"
      all_good=false
    fi
  else
    echo "❌ Folder missing: $folder"
    all_good=false
  fi
done

if ! $all_good; then
  echo "ERROR: One or more export folders are missing or empty."
  exit 1
fi

# Check for forest_types_* folders that are not listed
expected_set=$(printf "%s\n" "${FOLDERS[@]}" | sed 's|.*/||')
found_set=$(find "$SCRIPT_DIR" -maxdepth 1 -type d -name "forest_types_*" -exec basename {} \;)

missing=()
while IFS= read -r f; do
  if ! grep -qx "$f" <<< "$expected_set"; then
    missing+=("$f")
  fi
done <<< "$found_set"

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "❌ Unexpected forest_types_* folders found:"
  for f in "${missing[@]}"; do
    echo "   - $f"
  done
  echo
  echo "Please add $(IFS=', '; echo "${missing[*]}") to the check list"
  exit 1
fi
