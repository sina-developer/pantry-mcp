#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import axios from 'axios';

const PANTRY_API_BASE = 'https://getpantry.cloud/apiv1/pantry';

function resolvePantryVars(input: { pantryId?: string; basketName?: string }) {
  const pantryId = input.pantryId || process.env.PANTRY_ID;
  const basketName = input.basketName || process.env.BASKET_NAME;
  if (!pantryId || !basketName) {
    throw new Error(
      'pantryId and basketName are required (either as input or environment variables)'
    );
  }
  return { pantryId, basketName };
}

// Parse CLI args like --pantry-id=xxx --basket-name=yyy
process.argv.forEach((arg) => {
  if (arg.startsWith('--pantry-id=')) {
    process.env.PANTRY_ID = arg.split('=')[1];
  }
  if (arg.startsWith('--basket-name=')) {
    process.env.BASKET_NAME = arg.split('=')[1];
  }
});

async function main() {
  const server = new McpServer({
    name: 'Pantry MCP Server',
    version: '1.0.0',
  });

  // GET basket
  server.tool(
    'getBasket',
    {
      pantryId: z.string().optional(),
      basketName: z.string().optional(),
    },
    async ({ pantryId, basketName }) => {
      const { pantryId: pid, basketName: bname } = resolvePantryVars({
        pantryId,
        basketName,
      });
      const url = `${PANTRY_API_BASE}/${pid}/basket/${bname}`;
      const response = await axios.get(url);
      return {
        content: [{ type: 'text', text: JSON.stringify(response.data) }],
      };
    }
  );

  // POST basket (create/replace)
  server.tool(
    'postBasket',
    {
      pantryId: z.string().optional(),
      basketName: z.string().optional(),
      value: z.record(z.any()),
    },
    async ({ pantryId, basketName, value }) => {
      const { pantryId: pid, basketName: bname } = resolvePantryVars({
        pantryId,
        basketName,
      });
      const url = `${PANTRY_API_BASE}/${pid}/basket/${bname}`;
      const response = await axios.post(url, value);
      return {
        content: [{ type: 'text', text: JSON.stringify(response.data) }],
      };
    }
  );

  // PUT basket (update/merge)
  server.tool(
    'putBasket',
    {
      pantryId: z.string().optional(),
      basketName: z.string().optional(),
      value: z.record(z.any()),
    },
    async ({ pantryId, basketName, value }) => {
      const { pantryId: pid, basketName: bname } = resolvePantryVars({
        pantryId,
        basketName,
      });
      const url = `${PANTRY_API_BASE}/${pid}/basket/${bname}`;
      // Fetch current basket
      let current: Record<string, any> = {};
      try {
        const getResp = await axios.get(url);
        current = getResp.data;
      } catch (e: any) {
        // If not found, treat as empty
        if (!(e && e.response && e.response.status === 404)) throw e;
      }
      // Merge current and new value
      const merged = { ...current, ...value };
      const response = await axios.post(url, merged);
      return {
        content: [{ type: 'text', text: JSON.stringify(response.data) }],
      };
    }
  );

  // DELETE basket
  server.tool(
    'deleteBasket',
    {
      pantryId: z.string().optional(),
      basketName: z.string().optional(),
    },
    async ({ pantryId, basketName }) => {
      const { pantryId: pid, basketName: bname } = resolvePantryVars({
        pantryId,
        basketName,
      });
      const url = `${PANTRY_API_BASE}/${pid}/basket/${bname}`;
      const response = await axios.delete(url);
      return {
        content: [{ type: 'text', text: JSON.stringify(response.data) }],
      };
    }
  );

  // Add more tools as needed for other CRUD operations

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Failed to start Pantry MCP server:', err);
  process.exit(1);
});
