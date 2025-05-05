# Pantry MCP

Minimal MCP (Model Context Protocol) server for [getpantry.cloud](https://getpantry.cloud/) JSON storage API.

## Overview

This project provides a simple MCP server interface to interact with the [Pantry Cloud API](https://getpantry.cloud/), allowing you to perform CRUD operations on "baskets" (JSON objects) via the MCP protocol. It is designed for easy integration and automation.

## Features

- **Get Basket**: Retrieve a basket's contents.
- **Post Basket**: Create or replace a basket.
- **Put Basket**: Update/merge a basket.
- **Delete Basket**: Remove a basket.
- CLI and environment variable support for Pantry credentials.

## Installation

```bash
git clone https://github.com/yourusername/pantry-mcp.git
cd pantry-mcp
npm install
npm run build
```

## Usage

You can run the MCP server with:

```bash
node build/index.js --pantry-id=YOUR_PANTRY_ID --basket-name=YOUR_BASKET_NAME
```

Or set environment variables:

```bash
export PANTRY_ID=YOUR_PANTRY_ID
export BASKET_NAME=YOUR_BASKET_NAME
node build/index.js
```

## API

The server exposes the following MCP tools:

- `getBasket`: Get basket contents.
- `postBasket`: Create or replace a basket (requires a JSON value).
- `putBasket`: Update/merge a basket (requires a JSON value).
- `deleteBasket`: Delete a basket.

All tools accept `pantryId` and `basketName` as parameters (optional if set via CLI or environment).

## Development

- Source code: `src/index.ts`
- Build: `npm run build` (outputs to `build/index.js`)
- TypeScript configuration: `tsconfig.json`

## Dependencies

- [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- [axios](https://www.npmjs.com/package/axios)
- [typescript](https://www.npmjs.com/package/typescript) (dev)

## License

MIT
