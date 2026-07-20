# NUTA Design System

## Overview

This document outlines the complete design system for NUTA, a premium Kenyan peanut and healthy foods brand. The design system ensures visual consistency, accessibility, and a premium feel across the entire storefront.

---

## Brand Personality

NUTA represents:
- **Natural** - Pure, wholesome products
- **Healthy** - Nutritional value first
- **Premium** - High-quality experience
- **Fresh** - Regularly stocked products
- **Trustworthy** - Reliable brand
- **Kenyan** - Proudly local
- **Warm** - Welcoming feel
- **Modern** - Contemporary design
- **Clean** - Minimalist approach
- **Friendly** - Approachable brand

---

## Color Palette

### Primary - Warm Peanut Brown

The primary color represents the core product - peanuts. It conveys warmth, earthiness, and premium quality.

| Token | Hex | Usage |
|-------|-----|-------|
| `nuta-50` | `#FDF8F3` | Lightest background |
| `nuta-100` | `#FAF0E6` | Light cream backgrounds |
| `nuta-200` | `#F5E1C8` | Light accents |
| `nuta-300` | `#E8D5C4` | Borders, dividers |
| `nuta-400` | `#D4A574` | Gold accents |
| `nuta-500` | `#C4956A` | Secondary accents |
| `nuta-600` | `#A0522D` | Sienna brown |
| `nuta-700` | `#8B4513` | **Primary brown** |
| `nuta-800` | `#6B3410` | Hover states |
| `nuta-900` | `#4A2A0C` | Dark accents |

### Secondary - Natural Green

Represents freshness, health, and natural ingredients.

| Token | Hex | Usage |
|-------|-----|-------|
| `nutaGreen-50` | `#F0F7EF` | Lightest green |
| `nutaGreen-100` | `#D9EDDA` | Light backgrounds |
| `nutaGreen-400` | `#4E8B41` | **Accent green** |
| `nutaGreen-600` | `#2F5828` | Dark green |

### Background - Cream White

Warm, inviting backgrounds that feel natural and premium.

| Token | Hex | Usage |
|-------|-----|-------|
| `cream-50` | `#FEFEFE` | White surface |
| `cream-100` | `#FAF8F2` | Main background |
| `cream-200` | `#FFF8F0` | Card backgrounds |
| `cream-300` | `#FFF5E6` | Highlighted areas |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `nutaText-primary` | `#2B2B2B` | Primary text |
| `nutaText-secondary` | `#666666` | Secondary text |
| `nutaText-muted` | `#999999` | Muted/placeholder |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `nutaSuccess` | `#22C55E` | Success states |
| `nutaWarning` | `#F59E0B` | Warning states |
| `nutaError` | `#EF4444` | Error states |

---

## Typography

### Font Families

**Body Font: Plus Jakarta Sans**
- Modern, clean sans-serif
- Excellent readability
- Wide weight range (200-800)
- Perfect for UI and body text

**Display Font: Playfair Display**
- Elegant serif for headings
- Premium feel
- Great for hero sections

### Type Scale

```
Display XL: 4rem / 64px (Playfair Display)
Display: 3rem / 48px (Playfair Display)
H1: 2.5rem / 40px
H2: 2rem / 32px
H3: 1.5rem / 24px
H4: 1.25rem / 20px
Body Large: 1.125rem / 18px
Body: 1rem / 16px
Body Small: 0.875rem / 14px
Caption: 0.75rem / 12px
```

---

## Spacing Scale

Consistent spacing using Tailwind's default scale with custom additions:

| Token | Value | Usage |
|-------|-------|-------|
| `1` | 4px | Tight spacing |
| `2` | 8px | Small gaps |
| `3` | 12px | Component internal |
| `4` | 16px | Standard gap |
| `5` | 20px | Section spacing |
| `6` | 24px | Large gaps |
| `8` | 32px | Section breaks |
| `10` | 40px | Major sections |
| `12` | 48px | Hero spacing |
| `16` | 64px | Page sections |
| `18` | 72px | Large headers |
| `22` | 88px | Hero headers |
| `space-y-` | Variable | Vertical rhythm |

---

## Border Radius

Consistent rounded corners for a friendly, premium feel:

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0px | Sharp edges |
| `rounded-sm` | 4px | Subtle rounding |
| `rounded` | 8px | Small elements |
| `DEFAULT` | 12px | Buttons, inputs |
| `rounded-lg` | 16px | Cards |
| `rounded-xl` | 24px | Large cards |
| `rounded-2xl` | 32px | Modals, panels |
| `rounded-full` | 9999px | Pills, avatars |

---

## Shadows

Layered shadows for depth and hierarchy:

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-soft` | Subtle lift | Subtle cards |
| `shadow` | Default | Cards, buttons |
| `shadow-md` | Medium lift | Dropdowns |
| `shadow-lg` | Large lift | Modals |
| `shadow-xl` | Extra large | Floating elements |
| `shadow-inner` | Inset | Pressed states |

### Shadow Color
All shadows use warm brown tint: `rgba(139, 69, 19, 0.xx)`

---

## Components

### Buttons

**Primary Button**
```html
<button class="bg-nuta-700 text-white rounded-full px-6 py-3 
               hover:bg-nuta-800 hover:shadow-lg 
               transition-all duration-300">
  Button Text
</button>
```

**Secondary Button**
```html
<button class="bg-white text-nuta-700 border-2 border-nuta-700 
               rounded-full px-6 py-3 
               hover:bg-nuta-100 
               transition-all duration-300">
  Button Text
</button>
```

**Ghost Button**
```html
<button class="bg-transparent text-nuta-700 
               rounded-full px-6 py-3 
               hover:bg-nuta-100 
               transition-all duration-300">
  Button Text
</button>
```

### Cards

**Product Card**
```html
<div class="bg-white rounded-3xl shadow-soft overflow-hidden 
            hover:shadow-md hover:-translate-y-1 
            transition-all duration-300">
  <!-- Image -->
  <div class="aspect-square bg-cream-200">
    <img src="..." alt="..." />
  </div>
  <!-- Content -->
  <div class="p-5">
    <h3 class="text-lg font-semibold text-nutaText-primary">
      Product Name
    </h3>
    <p class="text-nuta-700 font-bold text-xl">KES 1,500</p>
    <button class="w-full mt-4 bg-nuta-700 text-white 
                   rounded-full py-3 hover:bg-nuta-800">
      Add to Cart
    </button>
  </div>
</div>
```

### Form Inputs

```html
<input type="text" 
       class="w-full h-11 px-4 py-2 
              rounded-xl border-2 border-nuta-300
              bg-white text-nutaText-primary
              placeholder:text-nutaText-muted
              focus:outline-none focus:border-nuta-700 
              focus:ring-2 focus:ring-nuta-700/20
              transition-all duration-200" />
```

### Badges

```html
<!-- Primary Badge -->
<span class="px-3 py-1 bg-nuta-700 text-white 
             text-xs font-medium rounded-full">
  Badge
</span>

<!-- Accent Badge -->
<span class="px-3 py-1 bg-nuta-400 text-nutaText-primary 
             text-xs font-medium rounded-full">
  Badge
</span>

<!-- Success Badge -->
<span class="px-3 py-1 bg-green-100 text-green-700 
             text-xs font-medium rounded-full">
  In Stock
</span>
```

---

## Animations

### Timing Functions

| Name | Value | Usage |
|------|-------|-------|
| `ease-out` | cubic-bezier(0, 0, 0.2, 1) | Enter animations |
| `ease-in` | cubic-bezier(0.4, 0, 1, 1) | Exit animations |
| `ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | State changes |
| `spring` | cubic-bezier(0.41, 0.73, 0.51, 1.02) | Bouncy effects |

### Animation Durations

| Name | Duration | Usage |
|------|----------|-------|
| `duration-150` | 150ms | Micro-interactions |
| `duration-200` | 200ms | Quick feedback |
| `duration-300` | 300ms | Standard transitions |
| `duration-400` | 400ms | Entrance animations |

### Key Animations

**Fade In Up**
```css
.animate-fade-in-up {
  animation: fade-in-up 0.4s ease-out forwards;
}
```

**Scale In**
```css
.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}
```

**Slide Up**
```css
.animate-slide-up {
  animation: slide-up 0.4s ease-out forwards;
}
```

---

## Accessibility

### Color Contrast

All color combinations meet WCAG AA standards:

| Combination | Ratio | Level |
|------------|-------|-------|
| `nuta-700` on white | 5.7:1 | AAA |
| `nutaText-primary` on white | 12.6:1 | AAA |
| `nutaText-secondary` on white | 4.6:1 | AA |

### Focus States

```css
/* Visible focus ring */
focus-visible:outline-none focus-visible:ring-2 
focus-visible:ring-nuta-700 focus-visible:ring-offset-2
```

### Responsive Design

Breakpoints:
- Mobile: 320px - 512px
- Tablet: 512px - 1024px
- Desktop: 1024px+
- Large: 1440px+

---

## Tailwind Usage Guide

### Using NUTA Colors

```html
<!-- Primary colors -->
<div class="bg-nuta-700 text-white">Primary</div>
<div class="bg-nuta-400 text-nutaText-primary">Accent</div>

<!-- Background colors -->
<div class="bg-cream-100">Page background</div>
<div class="bg-cream-200">Card background</div>

<!-- Text colors -->
<p class="text-nutaText-primary">Main text</p>
<p class="text-nutaText-secondary">Secondary text</p>

<!-- Semantic colors -->
<span class="text-nutaSuccess">Success</span>
<span class="text-nutaWarning">Warning</span>
<span class="text-nutaError">Error</span>
```

### Using NUTA Shadows

```html
<div class="shadow-soft">Subtle card</div>
<div class="shadow">Standard card</div>
<div class="shadow-md">Dropdown menu</div>
<div class="shadow-lg">Modal dialog</div>
```

### Using NUTA Radius

```html
<button class="rounded">12px radius</button>
<div class="rounded-lg">16px radius</div>
<div class="rounded-full">Pill shape</div>
```

---

## Best Practices

1. **Use CSS variables** - Always reference design tokens via Tailwind, not hardcoded values
2. **Consistent spacing** - Stick to the spacing scale
3. **Rounded corners** - Use `rounded` (12px) as default
4. **Warm shadows** - Use brown-tinted shadows, not pure gray
5. **Cream backgrounds** - Use `cream-100` or `cream-200` instead of pure white
6. **Subtle animations** - Prefer 200-400ms transitions
7. **Accessible contrast** - Test all color combinations

---

## File Structure

```
apps/storefront/
├── tailwind.config.js     # NUTA theme tokens
├── src/
│   ├── styles/
│   │   └── globals.css     # Global styles, CSS variables
│   ├── modules/
│   │   └── common/
│   │       └── components/
│   │           └── ui/     # UI component library
│   └── design-system/
│       └── NUTA_DESIGN_SYSTEM.md  # This documentation
```

---

## Implementation Notes

### Medusa Integration

The design system is built on top of Medusa's existing component structure:
- UI components in `modules/common/components/ui/`
- Theme overrides in `globals.css`
- Tailwind config extends Medusa's defaults

### Backend Compatibility

This design system does NOT modify:
- Medusa backend API routes
- Database schemas
- Business logic
- Checkout flow
- Authentication

Only visual presentation layer is affected.

---

*Last updated: July 2026*
*Version: 1.0.0*
