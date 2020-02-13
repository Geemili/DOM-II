#!/usr/bin/env sh

printf "!! This script should be run from the root of the git repository! !!\n"

# Rebuild index.less whenever any .less file changes
fd -e less . less/ | entr -c ./scripts/build-less.sh
