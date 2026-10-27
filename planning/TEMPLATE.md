# Portfolio Website Template - Luxury Creative Director Portfolio

Elegant dark maroon/burgundy creative portfolio (Emily Carter, Creative Director & Designer, Milan) with an oversized serif PORTFOLIO headline, cream typography and a dramatic portrait hero with an 'Available for new projects' badge. Sections for intro, What I Do services (Branding, Web Design, UI/UX, Art Direction), Selected Work project cards, animated stats (60+ projects, 40+ clients, 5+ years, 15 awards), a 4-step process and a Let's Work Together contact footer with email, phone, location and socials. Fully phone responsive.

> Generated from this template's own files. Read THIS instead of exploring the tree — it already says where everything is.

## Where the copy lives

This template has **no content module** — the copy is inline in the section components below. Read the sections you will rewrite in **one parallel batch** (several `Read` calls in the same turn cost one round trip), then edit them. Do not read them one per turn, and skip any section the brief does not change.

## Imagery — 12 file(s) shipped

### Photos of a person — ASK before you do anything with these

These show the template's sample model, not the user. "Reuse the imagery" does NOT apply to a face: a portfolio or personal brand site showing someone else is the one place silent reuse fails them. Ask **once** (AskUser) whether to:

1. use their own photo — they can attach it in the chat (recommended)
2. generate a portrait for them
3. keep the template's photo

Do not silently keep someone else's face, and do not silently generate one.

- `public/img/contact-avatar.png`
- `public/img/hero-cutout.png`
- `public/img/hero.png`

### All other imagery

These ARE the design the user picked. **Reuse them.** Generating a replacement set is the most expensive thing in this workflow and makes the result look nothing like the preview they chose. Generate at most 2, only when the brief names a subject the existing art plainly cannot show, and keep the filename.

Never `Read` an image: it returns base64 and tells you nothing the filename does not.

| file | bytes |
| --- | ---: |
| `public/favicon.svg` | 265 |
| `public/img/contact-avatar.png` | 356,027 |
| `public/img/hero-cutout.png` | 1,960,538 |
| `public/img/hero.png` | 277,469 |
| `public/img/service-artdirection.png` | 449,873 |
| `public/img/service-branding.png` | 461,498 |
| `public/img/service-uiux.png` | 221,238 |
| `public/img/service-webdesign.png` | 307,904 |
| `public/img/work-lune.png` | 267,634 |
| `public/img/work-maree.png` | 355,560 |
| `public/img/work-noir.png` | 125,490 |
| `public/og-image.jpg` | 277,469 |

## Sections (8)

Open only what you change.

- `src/components/Reveal.tsx` (1,072 B)
- `src/sections/Contact.tsx` (3,688 B)
- `src/sections/Header.tsx` (476 B)
- `src/sections/Hero.tsx` (3,317 B)
- `src/sections/Process.tsx` (1,625 B)
- `src/sections/SelectedWork.tsx` (2,297 B)
- `src/sections/Stats.tsx` (1,085 B)
- `src/sections/WhatIDo.tsx` (2,851 B)

## Placeholder brand: "Emily Carter" — 19 occurrence(s) in 3 file(s)

It is hardcoded outside the content module too, in several spellings:

- `Emily Carter` ×11
- `EMILY CARTER` ×1
- `emilycarter` ×7

Replace **every spelling in ONE command** (fill each `<…>`; order matters — longest first), then confirm with the grep, which must print nothing:

```
grep -rlE 'EMILY CARTER|Emily Carter|emilycarter' src index.html | xargs sed -i -e 's/Emily Carter/<Full Name>/g' -e 's/EMILY CARTER/<FULL NAME>/g' -e 's/emilycarter/<fullname, lowercase, no spaces>/g'
grep -rniE 'emily|carter' src index.html
```

Never replace it occurrence by occurrence, or one spelling per turn — that is a tool call each.

- `index.html` ×13
- `src/sections/Contact.tsx` ×4
- `src/sections/Hero.tsx` ×2

## How to edit

- **One change per file per turn.** Rewrite a section with ONE Edit covering all its copy, or `Write` the whole file — these are small.
- Several Edits to the **same** file in one turn conflict: the first lands, the rest fail as "modified since last read" and must be retried.
- Editing **different** files in parallel is fine, and the fast way.

## Keep

- The palette, type scale, spacing and layout — that is what was chosen.
- The shipped imagery and its framing.

## Replace

- Every visible string: names, headings, body copy, stats, contact details.
- The placeholder brand this template was built around — a site still carrying it has failed.
- `index.html` title/description and `public/og-image.*` so the page does not advertise the template's own subject.
