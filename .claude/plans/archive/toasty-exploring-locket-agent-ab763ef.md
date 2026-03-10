# Bibliotheke Chamber Creation Plan

## Overview

Create a literary library chamber for ETCETER4 website featuring poetry, prose, lyrics, and reviews. Will follow the existing akademia pattern with brown/cream color scheme instead of cyan.

## Files to Create

### 1. /Users/4jp/Workspace/a-mavs-olevm/bibliotheke/index.html

- Responsive HTML5 page with navigation to subsections
- Color scheme: Brown (#8B4513) primary, cream (#F5F5DC) secondary
- Include back link to main site
- Load Tachyons CSS and local styles
- Follows akademia structure with sections for:
  - Hero header with Bibliotheke branding
  - Navigation to subsections (poetry, prose, lyrics, reviews)
  - Content cards for each section
  - Footer with return to main site

### 2. /Users/4jp/Workspace/a-mavs-olevm/bibliotheke/config.js

- JavaScript configuration file with content metadata
- Four sections: poetry, prose, lyrics, reviews
- Each section has:
  - id (section identifier)
  - title (display name)
  - description (section description)
  - items array (individual pieces with title, author/artist, date, content preview)
- Structured as object exported for use in HTML

### 3. /Users/4jp/Workspace/a-mavs-olevm/bibliotheke/css/bibliotheke.css

- Brown (#8B4513) and cream (#F5F5DC) color scheme
- Typography: Futura for headings (matches site), Bodoni for body text
- Responsive grid layout for section cards
- Hover effects and transitions
- Mobile-first responsive design
- Custom classes matching ET CETER4 naming conventions (et-\*, etc.)

## Design Patterns to Follow

- Use Tachyons CSS classes for layout/spacing
- Velocity.js for animations (if needed)
- Global scope pattern for cross-file communication
- Futura font-family for headings
- Bodoni font-family for body copy
- Custom prefix-modifier naming (et-\* classes)
- Box border styling similar to akademia (ba, bw1, b--brown)

## Color Scheme

- Primary: #8B4513 (saddle brown)
- Secondary: #F5F5DC (beige/cream)
- Text: Dark brown on cream, cream on brown backgrounds
- Accents: Lighter brown shades for borders/hovers

## Responsive Breakpoints

- Mobile-first: base styles
- Medium (46.875em): w-50-m classes
- Large (60em): w-third-l, w-25-l classes

## Implementation Notes

- All three files complete and functional
- No dependencies on existing site JS (self-contained)
- Ready to be linked from main navigation
- Extensible for adding actual content items
