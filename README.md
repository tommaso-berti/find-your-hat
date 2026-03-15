# Find Your Hat

A command-line JavaScript game where you navigate a randomly generated field, avoid holes, and try to reach your hat before falling out of bounds.

## Project Description (Ready to Use)

**Find Your Hat** is a Node.js terminal game in which the player explores a custom-sized, randomly generated grid filled with obstacles, moving step by step to find the hat while avoiding holes and map boundaries.

## Overview

This project is based on the classic "Find Your Hat" exercise:
- You start at the top-left corner of the field.
- A hat (`^`) is placed randomly on the map.
- Holes (`O`) are generated based on a percentage chosen by the user.
- You move with keyboard commands until you win or lose.

## Tech Stack

- JavaScript (Node.js)
- [`prompt-sync`](https://www.npmjs.com/package/prompt-sync) for terminal input

## Requirements

- Node.js 16+ (recommended)
- npm

## Installation

```bash
npm install
```

## Run the Game

```bash
node main.js
```

When the game starts, you will be asked to enter:
- field width
- field height
- hole percentage

## Controls

- `u` = move up
- `d` = move down
- `l` = move left
- `r` = move right

## Symbols

- `*` player position
- `^` hat (goal)
- `O` hole (lose condition)
- `░` safe field tile

## Win/Lose Conditions

- You win when you reach the hat.
- You lose if you step into a hole.
- You lose if you move outside the field.

## Learning Goals

This exercise helps practice:
- classes and methods in JavaScript
- 2D arrays and coordinate-based movement
- loops and condition handling
- random generation and basic input validation
