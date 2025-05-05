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

## Usage

You can run the MCP server with:

```bash
node @c-na/pantry-mcp --pantry-id=YOUR_PANTRY_ID --basket-name=YOUR_BASKET_NAME
```

Or

```json
{
  "Pantry MCP": {
    "command": "node",
    "args": [
      "/Users/sina/development_local/pantry-mcp/build/index.js",
      "--pantry-id=PANTRY_ID",
      "--basket-name=BASKET_NAME"
    ]
  }
}
```

## Tools

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
