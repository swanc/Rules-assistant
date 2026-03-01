"use client";

interface GameSelectorProps {
  selectedGame: string;
  onGameChange: (gameId: string) => void;
}

const GAMES = [
  { id: "root", name: "Root", description: "Woodland might and right" },
  { id: "arcs", name: "Arcs", description: "Collapse and conflict in the Reach" },
  {
    id: "pax-pamir",
    name: "Pax Pamir 2E",
    description: "The Great Game in Afghanistan",
  },
];

export function GameSelector({ selectedGame, onGameChange }: GameSelectorProps) {
  return (
    <div className="flex gap-1 px-6 py-2 border-b border-zinc-200 dark:border-zinc-700">
      {GAMES.map((game) => (
        <button
          key={game.id}
          type="button"
          onClick={() => onGameChange(game.id)}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            selectedGame === game.id
              ? "bg-blue-600 text-white font-medium"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          }`}
          title={game.description}
        >
          {game.name}
        </button>
      ))}
    </div>
  );
}
