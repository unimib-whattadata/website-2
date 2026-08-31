---
name: Whattadata
description: A living data lab that turns research, models and data into decisions people can act on.
colors:
  laboratory-indigo: "#4f46e5"
  laboratory-indigo-deep: "#3730a3"
  evidence-indigo-ink: "#312e81"
  evidence-indigo-rule: "#c7d2fe"
  evidence-indigo-paper: "#eef2ff"
  signal-lime: "#a3e635"
  signal-lime-light: "#bef264"
  evidence-lime-mark: "#d9f99d"
  whattadocs-gold: "#eab308"
  whattadocs-blue: "#00a6f4"
  whattadocs-purple: "#86198f"
  arianne-orange: "#ff8c42"
  arianne-petrol: "#006279"
  arianne-orange-paper: "#fff7f0"
  arianne-cool-paper: "#f6f9fc"
  whattaflow-indigo: "#4c44db"
  whattaflow-indigo-deep: "#3e37be"
  whattaflow-indigo-light: "#625af5"
  whattaflow-indigo-paper: "#f1f0ff"
  whattaflow-connected: "#16a34a"
  carbon: "#111827"
  graphite: "#333333"
  slate: "#4b5563"
  rule-gray: "#d1d5db"
  rule-gray-soft: "#e5e7eb"
  mist: "#f5f5f7"
  paper: "#ffffff"
typography:
  display:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2.5rem, 6.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  product-display:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(3.15rem, 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.038em"
  product-display-mobile:
    fontSize: "clamp(3rem, 15vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.038em"
  product-brand:
    fontSize: "clamp(1rem, 1.8vw, 1.5rem)"
    lineHeight: 1
  product-context:
    fontSize: "0.8rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.05em"
  product-lead:
    fontSize: "clamp(1.05rem, 1.45vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.55
  product-action-label:
    fontSize: "0.94rem"
    fontWeight: 750
    lineHeight: 1
  whattaflow-wordmark:
    fontSize: "clamp(1.7rem, 3vw, 2.7rem)"
    lineHeight: 1
    letterSpacing: "-0.035em"
  whattaflow-tile-wordmark:
    fontSize: "clamp(1.2rem, 2vw, 1.85rem)"
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.15
  body:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 650
    lineHeight: 1.2
  workflow-label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "0.07em"
  workflow-system-label:
    fontSize: "0.76rem"
    fontWeight: 700
  workflow-title:
    fontSize: "clamp(1.4rem, 2.2vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  workflow-value:
    fontSize: "0.95rem"
    fontWeight: 700
  detail-small:
    fontSize: "0.82rem"
  source-meta:
    fontSize: "0.68rem"
  source-copy:
    fontSize: "0.78rem"
    lineHeight: 1.55
  section-heading:
    fontSize: "clamp(2.5rem, 5vw, 4.8rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.035em"
  audience-title:
    fontSize: "clamp(1.8rem, 3vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  mechanism-title:
    fontSize: "1.2rem"
    fontWeight: 700
  capability-title:
    fontSize: "1.05rem"
    fontWeight: 750
  product-close:
    fontSize: "clamp(3rem, 6.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.038em"
  product-close-lead:
    fontSize: "clamp(1rem, 1.5vw, 1.2rem)"
    fontWeight: 400
rounded:
  square: "0"
  highlight: "2px"
  document: "12px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.laboratory-indigo}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "13px 22px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.laboratory-indigo-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
  button-signal:
    backgroundColor: "{colors.signal-lime}"
    textColor: "{colors.carbon}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "14px 18px"
  button-arianne:
    backgroundColor: "{colors.arianne-orange}"
    textColor: "{colors.carbon}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "14px 19px"
    height: "52px"
  button-whattaflow:
    backgroundColor: "{colors.whattaflow-indigo}"
    textColor: "{colors.paper}"
    typography: "{typography.product-action-label}"
    rounded: "{rounded.square}"
    padding: "14px 19px"
    height: "52px"
  product-tile:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.square}"
    padding: "24px"
  product-tile-whattaflow:
    backgroundColor: "{colors.whattaflow-indigo-paper}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.square}"
    padding: "24px"
  product-hero-shot:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.square}"
    padding: "clamp(0.65rem, 1.4vw, 1.15rem)"
    border: "1px solid product accent at 34–40% opacity"
---

# Design System: Whattadata

## Overview

**Creative North Star: “The Living Data Lab”**

Whattadata should feel like an active research environment where data is not an abstract resource but a material that can be shaped, connected and put to work. The visual system combines scientific precision with visible energy: large editorial typography establishes clarity, while moving cubes and network geometries make analysis feel alive. Human language, real product imagery and institutional proof keep the laboratory metaphor grounded and trustworthy.

The system is scientific, energetic and human. Interfaces are predominantly flat and direct; depth belongs to the authored 3D cube world rather than generic card shadows or decorative glass. Components are geometric, confident and easy to recognise. Expression comes from scale, motion, indigo–lime contrast and modular composition—not from ornamental UI effects.

Product-detail pages extend the laboratory into an observable working surface. Their first viewport pairs a concise product thesis with one large, authentic application screenshot. The screenshot is the proof-bearing visual: it must come from the real product, show a representative working state and exclude personal or sensitive account data.

**Key Characteristics:**

- Editorial scale paired with practical, plain-spoken copy.
- Laboratory indigo as the operational brand colour; signal lime as a rare high-energy accent.
- Floating cubes, modular blocks and connected nodes as the signature visual language.
- Square controls and containers with explicit actions and visible keyboard focus.
- Full-viewport chapters on wide screens; natural document flow on touch and smaller screens.
- Research credibility balanced with approachable, outcome-led communication.
- Product-detail first viewports led by one authentic application screenshot.
- Thin screenshot frames, four-step mechanism bands and explicit closing actions.
- Product-specific accents that remain confined to their product route and screenshot frame.

## Colors

The palette behaves like a bright laboratory: white and cool neutral surfaces create working space, indigo carries authority and technology, while lime marks energy, action and transformation.

### Primary

- **Laboratory Indigo** (`#4f46e5`): Primary actions, active navigation, animated hero language, the institutional “About” surface and key product accents.
- **Deep Laboratory Indigo** (`#3730a3`): Hover state for primary actions. Never introduce a new purple merely to create a state.
- **Evidence Indigo Ink** (`#312e81`), **Evidence Indigo Rule** (`#c7d2fe`) and **Evidence Indigo Paper** (`#eef2ff`): A bounded dark-to-pale range for WhattaDocs query, citation and source planes. These colours clarify evidence relationships; they do not become a second site-wide palette.

### Secondary

- **Signal Lime** (`#a3e635`): High-salience action, cube faces, focus support and short highlighted phrases. Use sparingly so it remains a signal.
- **Signal Lime Light** (`#bef264`): Hover state for lime actions and controlled tonal variation.
- **Evidence Lime Mark** (`#d9f99d`): Inline source highlighting inside WhattaDocs evidence planes only.
- **WhattaDocs identity mark:** Use the official golden-yellow `WD` document mark with its blue pixel-grid page at standard display sizes and the supplied purple-grid variant at compact display sizes. Keep the product name as live text beside the mark when a readable lockup is needed.

### Tertiary

- **Arianne Orange** (`#ff8c42`): Official Arianne primary for the wordmark, primary action, homepage tile signal and closing surface.
- **Arianne Petrol** (`#006279`): Official secondary for hover, text links, the workflow band and structural rules.
- **Arianne Cool Paper** (`#f6f9fc`) and **Orange Paper** (`#fff7f0`): Quiet page and tile surfaces that let the orange wordmark remain legible.
- **WhattaDocs Gold** (`#eab308`), **Blue** (`#00a6f4`) and **Purple** (`#86198f`): The exact large-mark document stack. Gold owns the action, blue signals the source page and purple owns verification and the closing surface.
- **WhattaFlow Indigo** (`#4c44db`): Current product primary for the code-native wordmark, participant action, stage border and closing surface.
- **Deep WhattaFlow Indigo** (`#3e37be`), **Light Indigo** (`#625af5`) and **Indigo Paper** (`#f1f0ff`): Hover, tonal support and homepage/product surfaces. Status colours remain functional and do not become brand decoration.

### Neutral

- **Carbon** (`#111827`): Dark footer surface and strongest foreground text.
- **Graphite** (`#333333`): Default body and display text.
- **Slate** (`#4b5563`): Secondary copy where contrast remains sufficient.
- **Rule Gray** (`#d1d5db`) and **Soft Rule Gray** (`#e5e7eb`): One-pixel separators between workflow planes, audience columns, capabilities and evidence rows.
- **Mist** (`#f5f5f7`): Product and service chapter background.
- **Paper** (`#ffffff`): Primary page surface, navigation and clean negative space.

### Named Rules

**The Signal Rule.** Lime identifies energy, change or the next meaningful action. It is not a general-purpose background colour.

**The Clean Laboratory Rule.** Preserve large fields of paper or mist around complex data visuals. Do not fill empty space with decoration.

**The Product Accent Boundary.** Product colours identify a product-specific workflow or action. Arianne orange and petrol stay inside Arianne; WhattaDocs gold, blue and purple stay inside document and citation planes; WhattaFlow indigo stays inside wearable-study routes, statuses and signal diagrams.

## Typography

**Display Font:** system UI sans-serif stack
**Body Font:** system UI sans-serif stack
**Label Font:** system UI sans-serif stack

**Character:** Neutral, highly legible letterforms let scale and composition carry the identity. The voice is contemporary and technical without adopting a developer-tool costume.

### Hierarchy

- **Display** (400, `clamp(2.5rem, 6.4vw, 6rem)`, `0.98`): Hero statements, section-defining headings and the contact close. Keep tracking between `-0.02em` and `-0.035em`.
- **Product Display** (400, `clamp(3.15rem, 6vw, 6rem)`, `0.96`; compact `clamp(3rem, 15vw, 4.5rem)`): Product-detail first-viewport theses. The tighter rhythm makes the screenshot and the sentence read as one composition.
- **Headline** (400, `clamp(2rem, 5vw, 4.5rem)`, `1.05`): Major supporting statements and chapter headings.
- **Title** (600, `clamp(1.25rem, 2vw, 2rem)`, `1.15`): Service and product titles.
- **Body** (400, `1rem`, `1.6`): Explanatory copy. Keep reading measures near 65–75 characters and shorter inside cards.
- **Label** (650, `0.9rem`, `1.2`): Buttons, navigation and compact action labels.
- **Workflow Label** (750, `0.72rem`, `0.07em`): Uppercase stage labels and similar micro labels; system headers may tighten tracking to `0.045em`, while status copy remains sentence case with normal tracking.
- **Product Navigation and Actions** (`0.8rem` context, `0.94rem` action): Compact, high-weight labels distinguish page context from conversion controls without using monospace.
- **WhattaFlow Wordmark** (`clamp(1.9rem, 3.2vw, 2.85rem)` on the product page; `clamp(1.55rem, 2.6vw, 2.45rem)` on the homepage tile): A code-native `WhattaFlow` split mark matching the live participant product: lightweight “Whatta” and semibold indigo “Flow”. Do not substitute an invented logo asset or add an unauthorised symbol.
- **Product Lead** (400, `clamp(1.05rem, 1.45vw, 1.3rem)`, `1.55`): First-viewport explanation, capped at a compact reading measure.
- **Workflow Interface Scale** (`0.68rem`–`0.95rem`): Source metadata starts at the smallest step, followed by pane labels (`0.72rem`), system labels (`0.76rem`), source copy (`0.78rem`), compact detail text (`0.82rem`), action labels (`0.94rem`) and check-in values (`0.95rem`).
- **Workflow Title** (600, `clamp(1.4rem, 2.2vw, 2rem)`, `1.08`): Functional titles inside later mechanism sections.
- **Section Heading** (400, `clamp(2.5rem, 5vw, 4.8rem)`, `1`): Product-detail chapter statements.
- **Audience Title** (500, `clamp(1.8rem, 3vw, 3rem)`, `1.05`): Equal-audience panel headings.
- **Mechanism / Capability Title** (700–750, `1.05rem`–`1.2rem`): Dense explanatory rows and four-step bands.
- **Product Close** (400, `clamp(3rem, 6.5vw, 6rem)`, `0.96`): The final sentence above the single explicit action.

### Named Rules

**The One Clear Sentence Rule.** A display heading carries one idea. Supporting copy explains or proves it; it never paraphrases the same sentence.

**No Technical Costume.** Do not use monospace merely to make a control feel more technological.

## Layout

The wide-screen experience is organised as a sequence of viewport-scale chapters with proximity snapping: chapters settle when the scroll ends near their boundary, but never trap the visitor. The taller contact footer remains in natural flow so legal and privacy information is always reachable. Each section aligns to a centred container and uses a 12-column mental model: dominant statements usually occupy seven columns, while context or proof occupies five. Product and client areas use compact internal grids but retain generous outer negative space.

Spacing follows an 8px base rhythm, with 16px, 24px, 32px and 64px as the main steps. Related copy stays close; chapter changes receive substantially more space. Primary text must remain above the global cube layers with protected reading zones.

Product-detail pages use a centred `80rem` shell and natural document flow at every size. Above `960px`, the first viewport is a deliberately asymmetric split: concise copy occupies the smaller column and one application screenshot occupies the larger one. Arianne, WhattaDocs and WhattaFlow use the same screenshot container and information sequence. Later audience panels remain equal width. Every product page then follows the same compact sequence: two audiences, a four-step carbon mechanism band, four core capabilities and one explicit final action.

At `1024px` and below, homepage scroll snapping is removed and sections grow with their content. The homepage product grid changes from three equal columns to one column at the content-driven `900px` breakpoint; product tiles never use an aspect-ratio lock and expand with their copy. A single document scroll offset on `html` clears the fixed navigation on compact viewports (`4rem` on phones, `5rem` on tablet-sized layouts). At `960px`, product heroes, capability layouts and closing actions stack. At `760px`, equal audience columns and four-step mechanism bands become single columns with horizontal rules replacing vertical dividers; WhattaFlow preserves participant before researcher. At `480px`, actions become full width. The screenshot keeps its full frame and contains rather than crops the product UI, so the composition simplifies without changing the information order.

Product pages give the shared cube field an adaptive content safe-zone. Canvas layers are masked out of the central reading area with an edge gutter of `max(0.75rem, calc((100vw - 80rem) / 2))`, matching the `80rem` product shell on wide screens and retaining only a narrow edge signal when the viewport is smaller. At `960px`, the front and overlay layers disappear while back and middle remain at `0.72` opacity; at `480px`, the middle layer also disappears and the back layer drops to `0.58` opacity.

**The Product Before Motto Rule.** A product-detail first viewport shows exactly one large, authentic application screenshot. Do not replace it with an abstract hero, a decorative cube field, a reconstructed interface or a multi-image collage.

**The Product Cube Safe-Zone Rule.** Cubes may signal the Living Data Lab at product-page edges, but they never occupy the central reading and workflow zone. Reduce layer count before reducing content clarity.

## Elevation & Depth

The system is flat by default. Structural hierarchy comes from tonal surfaces, scale and spacing rather than stacked shadows. The signature depth is produced by real 3D cube layers: back and front layers may blur to create focus, while the middle layer remains crisp. Product imagery may contain soft rendered depth, but the surrounding UI stays flat.

Product-detail screenshot frames remain planar: a one-pixel product-accent border and restrained tonal backing separate the image from the page without a drop shadow.

The privacy document is the narrow exception: it may use a restrained ambient shadow to separate a long reading surface from the mist background. Interactive focus uses an explicit outline and signal-colour support, never a soft decorative glow.

### Shadow Vocabulary

- **Document Ambient** (`0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)`): Long-form reading surfaces only.
- **Product Preview Lift** (`0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`): Existing interactive screenshot hover only.

### Named Rules

**Flat by Default.** If a surface can be separated with spacing or tone, do not add a shadow.

**Depth Belongs to the Data.** Cubes and product visuals may carry volume; controls and layout containers remain crisp and planar.

## Shapes

Square geometry is the default. Buttons, navigation actions, product tiles and product screenshot frames use zero radius. The small `2px` radius is reserved for inline text highlights where a perfectly sharp block would feel brittle. The privacy document uses a `12px` radius because it is a reading artifact, not a marketing chapter.

Cubes, modular blocks, node diagrams and thin connecting lines are the recurring silhouettes. Borders are single-pixel separators or interaction cues, never ornamental frames. Pills are reserved for genuinely compact status or filter controls; the current marketing surface does not use them.

## Components

### Buttons

- **Shape:** Square (`0` radius), compact and decisive.
- **Primary:** Laboratory indigo with paper text, `52px` minimum height and roughly `13px 22px` padding.
- **Signal:** Signal lime with carbon text, used for the final contact action on the dark footer.
- **Arianne:** Official orange with carbon text on the product page; hover shifts to official petrol with paper text.
- **WhattaDocs:** Official gold with carbon text; hover shifts to official purple with paper text.
- **WhattaFlow Participant:** Product indigo with paper text in the first viewport. This filled action is the primary route and darkens to deep indigo on hover.
- **WhattaFlow Researcher:** A visibly underlined indigo text link beside the participant action. It stays secondary and does not compete inside the closing surface.
- **Hover / Focus:** Move to the documented product state—Arianne orange to petrol, WhattaDocs gold to purple and WhattaFlow indigo to deep indigo—and translate upward by `2px` on hover. Keyboard focus is a `3px` signal-lime outline with `3px` offset and a `5px` laboratory-indigo support ring.
- **Secondary:** A plain text link with visible underline, `1px` thickness and `0.25em` offset.

### Cards / Containers

- **Corner Style:** Square for marketing, product tiles and product-detail document planes; `12px` only for the long-form privacy reading surface.
- **Background:** Paper over mist, often combined with purpose-built product imagery.
- **Shadow Strategy:** Flat at rest; use tonal separation and a one-pixel border.
- **Border:** White-translucent at rest, changing to laboratory indigo on interactive hover or focus.
- **Internal Padding:** `16–24px`, responsive to viewport.

### Navigation

The navigation is a fixed paper surface with slight translucency. Labels are compact, direct and uppercase in the implementation. Default links use carbon; hover and active states use laboratory indigo. The conversion action is a filled indigo rectangle. On mobile, navigation becomes a full-width panel with the primary action occupying its own filled row.

### Product Tile

Product tiles are equal planar modules with the authentic product mark/name, one bounded mechanism sentence, one audience cue and one explicit action. Arianne uses the official orange vector on warm paper; WhattaDocs uses the compact official purple-grid WD mark on gold paper; WhattaFlow uses the code-native indigo split wordmark on violet paper. Every tile shares the same centred brand field and bottom action rule; the text stays subordinate to the identity and no decorative imagery competes with it. Composite wordmarks scale from the tile’s own inline size through container-relative units, never from the viewport, so mark and live type remain inside the card at every column width.

### Client Proof

The client and collaboration wall explicitly identifies itself as a mixed selection rather than implying one uniform relationship. A short explanation precedes the logo grid, marks are optically balanced in grayscale, and colour returns only on hover or keyboard focus. Do not assign a specific relationship type to an organisation unless that status has been verified.

### Contact Recovery

Primary conversion language is consistently “Talk to us”. The mail link remains the direct route, paired with a copy-email control and live confirmation so visitors without a configured email client retain a working next step.

Product-page screenshots come from the corresponding product pages in the Figma design-system file and retain their native 16:9 interface composition. They appear only in the hero as direct product evidence rather than inside decorative device mockups. When a product has multiple views, the hero cycles between them with a pausable horizontal flow wipe and a reduced-motion fallback; WhattaFlow alternates the researcher and participant dashboards, suspending the loop whenever the hero is offscreen or the page is hidden.

### Product Hero Screenshot

The product-detail signature is one large square-framed screenshot of the live product. Use one image per page and one representative working state: Arianne shows the patient dashboard, WhattaDocs shows the evidence workspace with source context, and WhattaFlow shows study metrics, trend data and recent activity. The image uses `object-fit: contain` so interface evidence is never cropped to fit the marketing layout. Remove account names, email addresses and other personal data before publishing.

**The One Screenshot Rule.** A hero contains one authentic application view—never a collage, carousel, overlaid duplicate, reconstructed UI or decorative replacement.

### Audience Pair

Two equal-width columns give sibling audiences equivalent narrative and visual weight. Arianne uses the pattern for patients and therapists; WhattaDocs uses it for internal knowledge and evidence-sensitive review; WhattaFlow uses it for participants and researchers. On narrow screens, preserve the source order and replace the centre divider with a horizontal rule.

### Mechanism Band

A carbon band turns a workflow into four square, rule-separated steps. Each step begins with one product-signal square, then a plain-language title and short explanation. The pattern becomes a vertical sequence on narrow screens without decorative numbering.

### Product Close

Every product page ends with a full-width product-accent surface, one large closing sentence and one explicit action. Arianne uses orange with carbon text and a paper action; WhattaDocs uses official purple with paper text and a gold action; WhattaFlow uses product indigo with paper text and a paper participant action. Do not add the researcher route or any competing link inside the close.

**The Role Route Rule.** On WhattaFlow, the participant portal owns the filled first-viewport action and the sole final action. Researcher access remains a visible, underlined secondary route in the first viewport.

### Service Path

The service path is a three-step horizontal sequence—Context, Design, Integration—separated from the service descriptions by a single top rule. On mobile it becomes a vertical stack. It explains progression without resorting to numbered decorative sections.

### Living Cube Scene

Four fixed canvas layers—back, middle, front and overlay—create the signature parallax field. Lime and indigo cubes rotate at different depths, respond subtly to pointer and scroll, and respect reduced-motion preferences. On product pages, the layers are edge atmosphere only: the adaptive safe-zone masks them out of the `80rem` content shell, then progressively reduces the field to two layers below `960px` and one attenuated back layer below `480px`. The scene is non-interactive, carries no information required for comprehension and must never block controls.

## Do's and Don'ts

### Do:

- **Do** use the data-to-decision narrative to connect research, products and client outcomes.
- **Do** protect text with clear negative space even when cube layers cross the viewport.
- **Do** keep primary actions explicit: “Let’s talk about your data,” not generic “Learn more.”
- **Do** use real logos, product assets and institutional proof; use generated imagery only as supporting atmosphere.
- **Do** preserve strong keyboard focus, descriptive link names and reduced-motion behaviour.
- **Do** let layout become natural document flow below `1024px`.
- **Do** lead each product-detail first viewport with one authentic application screenshot larger than its supporting copy.
- **Do** give paired audiences equal columns and preserve their order when stacked.
- **Do** choose a WhattaDocs screenshot where answers, citations and source context remain visible together.
- **Do** crop authenticated product screenshots to remove account identity and other personal data.
- **Do** preserve the participant-primary and researcher-secondary CTA hierarchy at every breakpoint.
- **Do** use WhattaFlow indigo for identity and reserve green, amber or red for real operational states.

### Don't:

- **Don't** replace the cube world with generic AI gradients, glowing brains, circuitry or stock office photography.
- **Don't** use lime and indigo at equal visual weight; indigo structures, lime signals.
- **Don't** introduce pills, glassmorphism, rounded card grids or soft UI merely to modernise the surface.
- **Don't** add shadows to containers that spacing or tone already separates.
- **Don't** place text inside generated product images; keep copy semantic and editable in HTML.
- **Don't** combine multiple screenshots in a product hero or crop away the interface context that makes the image credible.
- **Don't** use decorative section numbers, monospace labels or vague actions as a shortcut to “technical” character.
- **Don't** promote Arianne orange or WhattaDocs evidence tints into general Whattadata surfaces.
- **Don't** promote WhattaFlow indigo into general Whattadata surfaces or sibling product pages.
- **Don't** reduce Arianne to either the patient or therapist experience; both sides of care carry equal weight.
- **Don't** present WhattaDocs as an answer-only chat surface detached from citations and source pages.
- **Don't** style WhattaFlow like a consumer fitness tracker with activity rings, streaks, goals, coaching scores or achievement badges.
- **Don't** use visual proof bands or CTA copy to imply diagnosis, treatment efficacy or other clinical outcomes; show study operations and data continuity only.
