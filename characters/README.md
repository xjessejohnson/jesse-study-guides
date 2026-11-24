# License Ding — Character Portraits

Put portrait images in this folder. The game loads them automatically.
No code changes needed — just drop files and hard-refresh the page.

## Naming (case-insensitive, lowercase recommended)

```
characters/therapist.jpg   → therapist portrait (used every session)
characters/aaliyah.jpg     → client "Aaliyah"
characters/marcus.png      → client "Marcus"
characters/priya.webp      → client "Priya"
```

Same pattern for every persona name.

**Supported extensions:** `.jpg` `.jpeg` `.png` `.webp` `.gif`

## Rules

- File name = persona name, lowercased, spaces → hyphens  
  e.g. `Aaliyah` → `aaliyah.jpg`
- If a file is missing, the built-in SVG portrait is used instead
- Prefer square or portrait (about 400×500 or 512×640) for best crop
- Faces work best when centered in the upper half

## Current client names

Aaliyah, Marcus, Priya, Diego, Jordan, Mei, Amir, Sofia, Kai, Nia, Ethan, Fatima, Ryan, Aisha, Chen, Alex, Isabella, Jamal, Yuki, Omar, Taylor, Camila, Noah, Zara, Liam, Samira, Dev, Riley, Elena, Andre

## Therapist

Always use the fixed name: `therapist.jpg` (or `.png` / `.webp`)

## Layout

```
nce-remember.html
characters/
  README.md
  therapist.jpg
  aaliyah.jpg
  marcus.jpg
  ...
```

Relative path used by the game: `characters/<name>.<ext>`
