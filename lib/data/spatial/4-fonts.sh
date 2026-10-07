set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIB_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"
FONTS_DIR="${LIB_DIR}/data/spatial/tree-app-tiles/tiles/fonts"

source ~/.nvm/nvm.sh
nvm use 16  # generate-mapbox-gl-fonts needs node 16

cd "${LIB_DIR}"
npm exec generate-mapbox-gl-fonts

mkdir -p "${FONTS_DIR}" || {
	echo "Cannot create ${FONTS_DIR}. Check directory ownership/permissions."
	exit 1
}
cp -r "${LIB_DIR}/_output/Roboto Regular" "${FONTS_DIR}/Roboto Regular"
rm -rf "${LIB_DIR}/_output"