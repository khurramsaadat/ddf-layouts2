# DDF Layouts - UI/UX Guidelines

## Color Palette

### Primary Colors
- **Primary**: Green (`#10b981`) - Used for buttons, links, and highlights
- **Primary Hover**: Lighter green (`#34d399`) - Used for hover states
- **Primary Foreground**: White (`#ffffff`) - Text on primary background

### Neutral Colors
- **Background**: White (`#ffffff`) - Main background
- **Dark Background**: Dark gray (`#111827`) - Used for navbar and footer
- **Text**: Dark gray (`#111827`) - Main text color
- **Muted Text**: Gray (`#6b7280`) - Secondary text
- **Border**: Light gray (`#e5e7eb`) - Used for borders and dividers

## Typography

### Font Family
- **Primary Font**: System UI font stack
  ```css
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  ```

### Font Sizes
- **Extra Large**: 2.25rem (36px) - Main headings on pages
- **Large**: 1.875rem (30px) - Section headings
- **Medium**: 1.5rem (24px) - Sub-headings
- **Normal**: 1rem (16px) - Body text
- **Small**: 0.875rem (14px) - Secondary text, labels
- **Extra Small**: 0.75rem (12px) - Footer text, captions

## Component Styling

### Buttons
- **Primary Button**: 
  - Background: Primary color
  - Text: White
  - Padding: 0.75rem 1.5rem
  - Border Radius: 0.375rem
  - Hover: Slightly darker shade with transition
  
- **Secondary Button**:
  - Background: Light gray
  - Text: Dark gray
  - Padding: 0.75rem 1.5rem
  - Border Radius: 0.375rem
  - Hover: Slightly darker shade with transition

### Navigation
- **Navbar**:
  - Background: Dark gray (`#111827`)
  - Text: Light gray (`#d1d5db`)
  - Active Link: Primary color
  - Hover: Primary color with background highlight
  - Mobile: Hamburger menu with slide-down animation

### Cards
- Background: White
- Border Radius: 0.5rem
- Shadow: Subtle shadow for depth
- Hover: Enhanced shadow effect
- Padding: 1.5rem

### Tables
- **Headers**:
  - Background: Light gray
  - Text: Dark gray
  - Font Weight: Semi-bold
  - Text Size: Small
  - Padding: 0.5rem
  
- **Rows**:
  - Alternating Colors: White and very light gray
  - Border: Light gray bottom border
  - Hover: Subtle highlight
  - Height: Compact (2.5rem)
  
- **Table Container**:
  - Border Radius: 0.5rem
  - Border: Light gray
  - Shadow: Subtle shadow

### Form Elements
- **Inputs**:
  - Border: Light gray
  - Border Radius: 0.375rem
  - Focus: Primary color ring
  - Padding: 0.5rem 0.75rem
  - Text Size: Small

## Animations and Transitions

### Hover Effects
- Links: Color change (0.3s)
- Buttons: Background color change (0.3s)
- Cards: Shadow enhancement (0.3s)
- Navigation Items: Scale and background (0.3s)

### Page Transitions
- Fade in (0.5s)

### Special Animations
- **Counter Animation**: Animated counting effect for statistics
- **WhatsApp Button**: Pulsating animation for the contact button
- **Active Link Highlight**: Smooth transition for active page indicator

## Responsive Breakpoints

- **Small**: 640px
- **Medium**: 768px
- **Large**: 1024px
- **Extra Large**: 1280px
- **2XL**: 1536px

## Layout Structure

### Home Page
- Hero section with main heading and call-to-action
- Features section with cards
- Layout types grid
- Call-to-action section

### Content Pages
- Header with title
- Content area with appropriate spacing
- Sidebar or filters when applicable

### Navigation
- Logo on left
- Search bar next to logo
- Navigation links on right
- Mobile: Hamburger menu with full-width dropdown

### Footer
- Four-column layout on desktop
- Single column on mobile
- Social media icons
- Navigation links
- Contact information
- Copyright and legal links

## Accessibility Guidelines

- Sufficient color contrast (WCAG AA compliant)
- Keyboard navigation support
- Screen reader friendly markup
- Focus states for interactive elements
- Appropriate text alternatives for images
- Responsive design for all screen sizes

## Icons and Images

- **Icons**: Simple, consistent line icons
- **Social Icons**: Monochrome with hover color change
- **Images**: Maintain aspect ratio, optimized for web

This document will be updated as the design evolves to ensure consistency across the application.