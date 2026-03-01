import { HttpAgent } from "@ag-ui/client";

export function createAgent(gameId: string): HttpAgent {
  return new HttpAgent({
    url: "/api/agent",
    initialState: { gameId },
  });
}
