FROM ubuntu:22.04

# Install system dependencies and Node.js 20 LTS
RUN apt-get update && apt-get install -y \
    curl \
    git \
    python3 \
    python3-pip \
    make \
    g++ \
    wget \
    ca-certificates \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy compile_page.sh to container root
COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Create a basic package.json if none exists
RUN echo '{"name":"nextjs-app","version":"1.0.0","scripts":{"dev":"next dev","build":"next build","start":"next start"}}' > package.json

# Expose port
EXPOSE 3000

# Default command
CMD ["bash"]
