# CSGO

## Phase 0 - Before Pick and Ban

The caster need to supply the system with the teams names and there short names.

Supplied variables:
- $friendly
- $friendly_short
- $enemy
- $enemy_short
- [ $best_of | $map_fixed_count ]


## Phase 1 - After Pick and Ban

The caster need to supply the pick and banned maps to the system.

Supplied variables:
- $map_next_number
- $map_next_name
- $map_chained_names
- all from Phase 0

## Phase 2 - After each map

The caster supplies the system with the score after each finished maps and moves the cursor to the next match.

Supplied variables:
- $score_friendly
- $score_enemy
- $score_maps_friendly
- $score_maps_enemy
- all from phase 0+1

## Phase 3 - ending

The caster supplies the system with the last result and finished stats are shown.

Needed variables:
- all from phase 0-2