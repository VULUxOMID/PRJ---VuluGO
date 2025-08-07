#!/bin/bash

# Set error handling
set -e

# Check if URL is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <url>"
    exit 1
fi

URL=$1

# Create output directory
mkdir -p /tmp/compiled_pages

# Use wget to download the page
wget --no-check-certificate \
     --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
     --header="Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" \
     --header="Accept-Language: en-US,en;q=0.5" \
     --header="Accept-Encoding: gzip, deflate" \
     --header="Connection: keep-alive" \
     --header="Upgrade-Insecure-Requests: 1" \
     -O /tmp/compiled_pages/page.html \
     "$URL"

# Check if download was successful
if [ $? -eq 0 ]; then
    echo "Page compiled successfully: /tmp/compiled_pages/page.html"
    echo "URL: $URL"
else
    echo "Failed to compile page from URL: $URL"
    exit 1
fi
