# Product Requirements Document: DDF Layouts Dashboard

## 1. Overview

The DDF Layouts Dashboard is a web application designed to display and interact with layout data stored in an Excel file (`layouts.xlsx`). The primary goal is to provide a clear, responsive, and user-friendly interface for viewing layout information, which should update dynamically as the source Excel file changes.

## 2. Goals

- To display data from an Excel file in a clean, sortable table.
- To ensure the dashboard is fully responsive across mobile, tablet, and desktop devices.
- To create a component-based architecture for maintainability and scalability.
- To provide a professional and intuitive user experience.
- To support multiple layout types including DDF, Promos, Exclusive Promos, JCD, and Categories.

## 3. Features

### 3.1. Data Display
- The application will fetch data from a local `layouts.xlsx` file via an API endpoint.
- Data will be displayed in a tabular format.
- The 'Ratio' column will be formatted to two decimal places.
- Multiple data sheets (DDF, Promos, Exclusive Promos, JCD, Categories) will be accessible through separate pages.

### 3.2. Table Functionality
- **Sorting:** All columns in the table will be sortable.
  - Columns with numeric data (Width, Height, Canvas Width, Canvas Height, Ratio) will be sorted numerically.
  - All other columns will be sorted alphabetically.
  - **Visual Indicators:** Sorting icons will always be visible. The active sort column will display a primary-colored arrow (▲ for ascending, ▼ for descending), while inactive sortable columns will show a gray '↕' icon.
- **Column Visibility:** Checkboxes for each column will allow users to dynamically hide or unhide columns. These checkboxes will be enclosed in a styled box and located under the main title in the Hero section, with the title "Column Visibility". This feature is available on the home page but not on JCD, Promos, or Exclusive Promos pages.
- **Total Layouts Display:** The total number of layouts (rows) will be displayed prominently with an animated counter effect.
- **Row Height:** Table rows will have a reduced height for a more compact display.
- **Column Renaming:** The 'Layout' column will be displayed as 'Layout Name'.
- **Column Alignment:** Fixed column widths will be applied to ensure proper alignment between headers and data cells, with the 'Layout Name' column having increased width to accommodate longer text.
- **Responsiveness:** The table will be horizontally scrollable on smaller screens to prevent layout breakage.
- **Table Styling:** Tables will have rounded corners, shadow effects, and alternating row colors for better readability.
- **Font Size:** Smaller font sizes will be used for table content to display more information in a compact format.

### 3.3. User Interface
- **Navbar:** A navigation bar will be present at the top of the page with relevant links and a mobile-responsive toggle. It includes a search bar that filters content across all pages. Active page links are highlighted in the theme color for better navigation.
- **Hero Section:** The main content area will feature the main title "DDF Layouts", followed by a "Column Visibility" section with checkboxes, and a display for the total number of layouts. The table headers (with sorting controls) will be displayed directly above the table data. On larger screens, the table data will be split and displayed across two columns to optimize space and reduce vertical scrolling, creating the visual effect of a single table flowing across two columns. On smaller screens, the table will stack vertically.
- **Footer:** A footer will contain necessary links and information, organized into four sections:
  - **Company Info:** Logo, description, and social media icons with hover animations.
  - **Navigation:** Links to all main pages including DDF, Promos, Exclusive Promos, JCD, Categories, Vendor List, About, and Contact. Active page links are highlighted in the theme color.
  - **Features:** List of key features offered by the application.
  - **Connect:** Contact information including location, email, and browser recommendation.
  - **Bottom Bar:** Copyright information with Privacy Policy and Terms of Service links.
- **Responsive Design:** The layout will adapt to different screen sizes (mobile, tablet, desktop, widescreen).
- **Theming:** The application will use a green theme based on shadcn/ui's color palette.
- **Layout Detail Pages:** When clicking on a layout name, a detail page will open in a new tab showing comprehensive specifications for that layout.
- **WhatsApp Contact:** A floating WhatsApp button with pulsating animation is available on the Contact page for direct messaging.

### 3.4. Search Functionality
- **Global Search:** A search bar in the navbar allows filtering content across all pages.
- **Real-time Filtering:** Search results update as the user types.
- **Search Scope:** Search functionality works across all data pages (DDF, Promos, Exclusive Promos, JCD, Categories).

### 3.5. Animation Effects
- **Counter Animation:** Total layout counts feature an animated counting effect when pages load.
- **Interactive Elements:** Table headers, links, and buttons have hover effects and transitions.
- **Social Media Icons:** Footer social media icons have hover animations and color transitions.
- **Active Page Highlighting:** Navigation links in both navbar and footer highlight the current page with the theme color.
- **WhatsApp Button:** Features multi-layer pulsating animation effects to draw attention to the contact option.

## 4. Technical Requirements

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Data Parsing:** `xlsx` library to read the Excel file.
- **API:** A Next.js API route will serve the Excel data as JSON.
- **Animation:** Custom React hooks for counter animations.

## 5. Future Enhancements (Out of Scope for Initial Version)

- File upload functionality to allow users to use their own Excel files.
- Data visualization and charts.
- User authentication and role-based access.
- Real-time data updates without needing a page refresh.
- PDF export functionality for layout specifications.
- Advanced filtering options beyond text search.
