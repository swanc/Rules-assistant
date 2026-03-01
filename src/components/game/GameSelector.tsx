"use client";

interface GameSelectorProps {
  selectedGame: string;
  onGameChange: (gameId: string) => void;
}

const GAMES = [
  {
    id: "root",
    name: "Root",
    description: "Woodland might and right",
    emoji: "\u{1F333}",
  },
  {
    id: "arcs",
    name: "Arcs",
    description: "Collapse and conflict in the Reach",
    emoji: "\u{1FA90}",
  },
  {
    id: "pax-pamir",
    name: "Pax Pamir 2E",
    description: "The Great Game in Afghanistan",
    emoji: "\u{1F3D4}\uFE0F",
  },
];

export function GameSelector({
  selectedGame,
  onGameChange,
}: GameSelectorProps) {
  return (
    <div
      className="flex gap-2 px-6 py-3 overflow-x-auto"
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {GAMES.map((game) => {
        const isSelected = selectedGame === game.id;
        return (
          <button
            key={game.id}
            type="button"
            onClick={() => onGameChange(game.id)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left transition-all duration-200 flex-shrink-0"
            style={{
              background: isSelected ? "var(--accent-bg)" : "var(--surface-secondary)",
              border: isSelected
                ? "1.5px solid var(--accent)"
                : "1.5px solid transparent",
              cursor: "pointer",
            }}
          >
            <span className="text-lg leading-none" role="img">
              {game.emoji}
            </span>
            <div className="min-w-0">
              <div
                className="text-sm font-medium leading-tight"
                style={{
                  color: isSelected ? "var(--accent)" : "var(--foreground)",
                }}
              >
                {game.name}
              </div>
              <div
                className="text-[11px] leading-tight mt-0.5"
                style={{ color: "var(--muted)" }}
              >
                {game.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
