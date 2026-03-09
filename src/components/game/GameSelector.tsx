"use client";

import { useState, useRef, useEffect } from "react";
import { GAMES } from "@/lib/games";

interface GameSelectorProps {
  selectedGame: string;
  onGameChange: (gameId: string) => void;
}

/**
 * Compact game selector that fits inside the header bar.
 * Shows the selected game as a small pill; tapping it opens a dropdown
 * with all available games. Designed to take minimal horizontal space.
 */
export function GameSelector({
  selectedGame,
  onGameChange,
}: GameSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  // Tracks which item is highlighted via keyboard arrows
  const [highlightIndex, setHighlightIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find the currently selected game object so we can show its name/emoji
  const selected = GAMES.find((g) => g.id === selectedGame) || GAMES[0];

  // Filter games by the search text (matches name or description)
  const filtered = GAMES.filter((g) => {
    const q = search.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q)
    );
  });

  // Reset highlight when the filtered list changes
  useEffect(() => {
    setHighlightIndex(0);
  }, [search]);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Auto-focus the search input when the dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  function selectGame(gameId: string) {
    onGameChange(gameId);
    setIsOpen(false);
    setSearch("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[highlightIndex]) {
      e.preventDefault();
      selectGame(filtered[highlightIndex].id);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearch("");
    }
  }

  return (
    <div ref={containerRef} className="relative flex-shrink-0" style={{ zIndex: 20 }}>
      {/* Compact pill trigger — shows emoji + game name */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-150"
        style={{
          background: "var(--accent-bg)",
          color: "var(--accent)",
          border: "1px solid var(--border)",
          cursor: "pointer",
        }}
      >
        <span className="text-sm leading-none" role="img">
          {selected.emoji}
        </span>
        <span className="max-w-[80px] sm:max-w-none truncate">{selected.name}</span>
        {/* Small chevron */}
        <svg
          className="w-3 h-3 transition-transform duration-200 flex-shrink-0"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel — positioned below the pill, aligned to the right */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 shadow-lg rounded-xl overflow-hidden"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            maxHeight: "360px",
          }}
          onKeyDown={handleKeyDown}
        >
          {/* Search input — only show when there are enough games to search */}
          {GAMES.length > 4 && (
            <div className="px-3 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search games..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg outline-none"
                style={{
                  background: "var(--surface-secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
            </div>
          )}

          {/* Game list */}
          <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
            {filtered.length === 0 ? (
              <div
                className="px-4 py-4 text-xs text-center"
                style={{ color: "var(--muted)" }}
              >
                No games found
              </div>
            ) : (
              filtered.map((game, index) => {
                const isSelected = game.id === selectedGame;
                const isHighlighted = index === highlightIndex;
                return (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => selectGame(game.id)}
                    onMouseEnter={() => setHighlightIndex(index)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors duration-100"
                    style={{
                      background: isHighlighted
                        ? "var(--accent-bg)"
                        : "transparent",
                      borderLeft: isSelected
                        ? "3px solid var(--accent)"
                        : "3px solid transparent",
                      cursor: "pointer",
                    }}
                  >
                    <span className="text-base leading-none" role="img">
                      {game.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-xs font-medium leading-tight"
                        style={{
                          color: isSelected
                            ? "var(--accent)"
                            : "var(--foreground)",
                        }}
                      >
                        {game.name}
                      </div>
                      <div
                        className="text-[10px] leading-tight mt-0.5"
                        style={{ color: "var(--muted)" }}
                      >
                        {game.description}
                      </div>
                    </div>
                    {isSelected && (
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{ color: "var(--accent)" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
