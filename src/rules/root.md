# Root: A Game of Woodland Might and Right — Rules Reference

## Overview

Root is an asymmetric war game for 2–4 players set in a vast woodland. Each player controls a unique faction with its own abilities, victory conditions, and play style. Players compete to rule the woodland by gaining 30 victory points or by fulfilling the conditions on a dominance card.

---

## Components

- 1 Map board (with 12 clearings connected by paths, in 3 suits: Fox, Rabbit, Mouse)
- 4 Faction boards (Marquise de Cat, Eyrie Dynasties, Woodland Alliance, Vagabond)
- Shared deck of 54 cards (in 3 suits: Fox, Rabbit, Mouse, plus Bird cards which are wild)
- Various wooden pieces: warriors, buildings, tokens
- 2 dice (0–3 pips each)
- Item tokens, ruin tokens, victory point markers

---

## General Concepts

### Clearings and Paths
The map has 12 clearings, each with a suit (Fox, Rabbit, or Mouse) and a number of building slots (1–3). Clearings are connected by paths. Moving requires moving along a path from one clearing to an adjacent one.

### Rule (Control) of a Clearing
You **rule** a clearing if you have the most combined warriors and buildings there. If tied, no one rules it. Ruling a clearing matters for crafting, movement restrictions, and many faction abilities.

### Suit of a Card
Cards come in four suits: Fox, Rabbit, Mouse, and Bird. Bird cards are **wild** and can be used as any suit. When you need to use a card matching a clearing's suit, a Bird card always works.

### Crafting
To craft a card, you must activate crafting pieces in clearings matching the card's crafting cost (shown in the bottom-left corner). Crafting pieces vary by faction:
- Marquise: Workshops
- Eyrie: Roosts
- Alliance: Sympathy tokens
- Vagabond: Hammers

Some cards give immediate effects, others are persistent. Crafted items go to the shared supply (or to the Vagabond).

---

## Turn Structure

Each player's turn has three phases:
1. **Birdsong** — Start-of-turn abilities (vary by faction)
2. **Daylight** — Main actions (vary by faction)
3. **Evening** — End-of-turn abilities, then draw cards (draw 1 card + 1 per draw bonus, up to hand limit of 5)

After Evening, play passes clockwise.

---

## Shared Actions

### Move
Move any number of your warriors from one clearing to an adjacent clearing. You must **rule** the clearing you're moving from OR the clearing you're moving to (or both).

### Battle
Initiate a battle in a clearing where you have warriors. You are the **attacker**, and you choose a **defender** who also has pieces there.

1. Both players roll a die (0–3). The attacker takes the **higher** roll, the defender takes the **lower** roll.
2. The attacker deals hits equal to their roll (max = attacker's warriors in the clearing).
3. The defender deals hits equal to their roll (max = defender's warriors in the clearing).
4. Each hit removes one warrior. If all warriors are removed, further hits remove buildings/tokens (defender chooses which).
5. **Removing buildings/tokens scores 1 VP for the attacker** per piece removed.
6. The defender may play an **Ambush** card (matching the clearing's suit or Bird) before dice are rolled to deal 2 immediate hits to the attacker. The attacker may then counter-ambush with their own matching Ambush card to cancel it.

### Dominance Cards
Instead of scoring 30 VP, a player can play a Dominance card (removing it from the game) if they have at least 10 VP. This changes their victory condition to controlling specific clearings at the start of their next Birdsong:
- Fox Dominance: Rule 3 Fox clearings
- Rabbit Dominance: Rule 3 Rabbit clearings
- Mouse Dominance: Rule 3 Mouse clearings
- Bird Dominance: Rule 2 opposite-corner clearings

---

## Factions

### Marquise de Cat
**Theme:** Industrial occupier. Starts with warriors in almost every clearing and buildings to place.

**Setup:**
- Place 1 warrior in each clearing except the diagonally opposite corner to your keep.
- Place the Keep token in a corner clearing.
- Place 11 warriors and all buildings (Sawmills, Workshops, Recruiters) on your faction board.

**Birdsong:**
- Place 1 wood token at each Sawmill.

**Daylight (3 actions, choose from):**
- **Battle** in a clearing.
- **March** (move, can be done twice per March action).
- **Recruit** — Place 1 warrior at each Recruiter.
- **Build** — Place a building in a clearing you rule that has an empty building slot. Must spend wood tokens from connected clearings you rule. Cost: 1st building = 0 wood, 2nd = 1, 3rd = 2, 4th = 3, 5th = 3, 6th = 4.
- **Overwork** — Spend a card matching a clearing with a Sawmill to place 1 wood there.

**Scoring:**
- Score VP when placing buildings (printed on the faction board track: 0, 1, 2, 3, 3, 4 VP).
- Score VP for removing enemy buildings/tokens in battle.

**The Keep:** The Keep lets you place pieces in its clearing. If the Keep is removed, you can no longer place warriors/buildings.

---

### Eyrie Dynasties
**Theme:** Deposed bird nobility trying to reclaim the woodland through their rigid Decree.

**Setup:**
- Place 6 warriors and 1 Roost in a corner clearing (opposite the Marquise's Keep).
- Choose 1 of 4 Leader cards (each gives a starting Decree card placement and a special ability).
- Start with Viziers (loyal advisors) in your Decree columns.

**The Decree:**
A programming mechanic. Each turn you **must** add at least 1 card to the Decree (across 4 columns: Recruit, Move, Battle, Build). During Daylight, you must resolve each column left to right, performing the action in a clearing matching the card's suit. Bird cards are wild and can match any clearing.

**Birdsong:**
- Add 1 or 2 cards from your hand (or Viziers) to the Decree.

**Daylight (resolve the Decree):**
- **Recruit:** Place a warrior in a clearing matching each card in the Recruit column (that has a Roost).
- **Move:** Move from/to a clearing matching each card in the Move column.
- **Battle:** Battle in a clearing matching each card in the Battle column.
- **Build:** Place a Roost in a clearing you rule matching each card in the Build column (must have an empty slot and no existing Roost).

**If you cannot fully resolve any Decree card: TURMOIL.**
- Lose VP equal to the number of Bird cards in the Decree.
- Discard the entire Decree (except Viziers).
- Flip your current Leader face-down (cannot be used again this game).
- Choose a new Leader and start a fresh Decree.
- End your turn immediately (skip Evening).

**Evening:**
- Score VP for Roosts on the map (0/1 = 0, 2 = 1, 3 = 2, 4 = 3, 5 = 4, 6 = 5, 7 = 5).
- Draw cards + 1 per draw bonus.

---

### Woodland Alliance
**Theme:** Guerrilla insurgents. Slow to start but snowball in power through sympathy and revolts.

**Setup:**
- Place no pieces on the map.
- Start with 3 Supporters (face-down cards in your Supporters stack).

**Supporters:**
A special stack of face-down cards. You gain Supporters by other players' actions or by spending your own cards. Supporters fuel Revolts and Spreading Sympathy.

**Sympathy Tokens:**
- Placed on clearings (1 per clearing).
- When **any** player moves warriors into or places pieces in a sympathetic clearing, they must give you 1 card matching that clearing's suit (or show they have none). This is called **Outrage**.
- Scoring: Each sympathy token placed scores VP (1st: 0, 2nd: 1, 3rd: 1, 4th: 2, 5th: 2, 6th: 3, 7th: 3, 8th: 4, 9th: 4, 10th: 5).

**Birdsong:**
- Revolt: Spend 2 matching Supporters to remove all enemy pieces in a matching clearing (with sympathy). Place your base and warriors there. This is devastating.
- Spread Sympathy: Spend Supporters to place sympathy in a clearing adjacent to existing sympathy (or any clearing if you have none). Cost = number of sympathy already on the map.

**Daylight:**
- Craft using sympathy tokens as crafting pieces.
- Mobilize: Add a card from your hand to Supporters.
- Train: Spend a card matching a clearing with a base to place an officer.

**Evening:**
- Move and battle for each officer you have.
- Draw cards + 1 per draw bonus.
- Add cards to Supporters for each base (up to 5 Supporters).

**Bases:**
- 3 bases (one per suit: Fox, Rabbit, Mouse).
- If a base is removed, discard half your Supporters and all officers of that suit.
- Bases let you recruit warriors in their clearing and train officers.

---

### Vagabond
**Theme:** A lone wanderer moving through the forest, helping or harming other factions.

**Setup:**
- Place your pawn in any forest (not a clearing).
- Choose a Vagabond character card (determines starting items).
- Place starting items in your Satchel (undamaged, face-up).

**Items:**
The Vagabond uses items to take actions. Each item can be used once per turn, then it's "exhausted" (turned face-down). Items refresh during Evening.
- **Satchel items:** Active items you carry.
- **Damaged items:** Cannot be used until repaired (exhaust a Hammer to repair).
- **Item tracks:** Sword, Boot, Crossbow, Hammer, Coin, Bag, Tea items.

**Forests:**
The Vagabond moves in forests (the spaces between clearings) and clearings. The Vagabond cannot be attacked in a forest.

**Relationships:**
The Vagabond tracks relationships with each faction:
- **Indifferent** (start) → **Friendly** (by giving cards/items) → **Allied** (by giving more)
- **Hostile** (by removing their warriors in battle)
- Allied factions: You can move with their warriors and share clearing rule for battles.

**Birdsong:**
- Refresh 3 items (+ Teas).
- Slip: Move to any adjacent clearing or forest without using a Boot.

**Daylight (exhaust items to act):**
- **Move** (exhaust Boot): Move to an adjacent clearing/forest.
- **Battle** (exhaust Sword): Battle in your clearing. Roll as normal but your "warrior count" = undamaged Swords. Hits damage your items instead of removing warriors.
- **Explore** (exhaust Torch): In a clearing with a ruin, take the item underneath. Score VP.
- **Strike** (exhaust Crossbow): Remove an enemy warrior without a full battle. Become Hostile.
- **Aid** (exhaust any item to give a card matching the clearing's suit to another faction): Improve relationship. Score VP for each step up in relationship.
- **Quest** (exhaust 2 items matching the clearing's suit): Complete a quest card for VP or draw 2 cards.
- **Repair** (exhaust Hammer): Repair 1 damaged item.
- **Craft** (exhaust Hammers in appropriate clearing suits).

**Evening:**
- Refresh all items if in a forest.
- Draw cards + 1 per draw bonus.

**Scoring:**
- Removing enemy buildings/tokens scores VP.
- Completing quests scores VP.
- Exploring ruins scores 1 VP.
- Aiding other factions scores VP based on relationship improvement.

---

## Victory

The game ends immediately when a player:
1. Reaches **30 victory points**, OR
2. Fulfills the conditions of a **Dominance card** they have played (checked at the start of their Birdsong).

---

## Common Timing Rules

- **Ambush:** Played by the defender immediately after the attacker declares a battle but before dice are rolled.
- **Sappers (Alliance):** If the Woodland Alliance is the defender, they may spend a Bird card as a Supporter to deal an extra hit.
- **Field Hospitals (Marquise):** When Marquise warriors are removed in battle, the Marquise may spend a card matching the clearing's suit to place those warriors in the Keep clearing instead of removing them.
- **Guerrilla War (Alliance):** When the Woodland Alliance is the defender, they use the higher die roll instead of the lower.

---

## Setup Order (Full Game)

1. Place the map board.
2. Place 12 ruin tokens (with items underneath) on the marked ruin slots.
3. Place all item tokens on the map's item supply tracks.
4. Shuffle the shared deck.
5. Choose factions. Set up in order: Marquise → Eyrie → Alliance → Vagabond.
6. Deal each player 3 cards.
7. The Marquise goes first.

---

## FAQ / Common Misunderstandings

**Q: Can Bird cards be used for any suit?**
A: Yes. Bird is wild and matches any suit for all purposes (crafting, moving, battling, spreading sympathy, etc.).

**Q: Does removing a warrior in battle score points?**
A: No. Only removing **buildings and tokens** scores 1 VP each for the attacker.

**Q: Can the Vagabond be attacked?**
A: Only in a clearing. The Vagabond in a forest cannot be targeted.

**Q: What happens when the deck runs out?**
A: Shuffle the discard pile to form a new deck.

**Q: Can you craft during Birdsong or Evening?**
A: No. Crafting can only be done during Daylight (unless a faction's rules specifically say otherwise).

**Q: How does the Eyrie's Turmoil work if they have no Bird cards?**
A: They lose 0 VP from Bird cards, but they still discard the Decree, flip their Leader, choose a new one, and end their turn.
