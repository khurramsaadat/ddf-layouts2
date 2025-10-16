# Electronics Page Documentation

## Overview

The Electronics page is a specialized section of the DDF Layouts Dashboard that focuses on displaying electronic display formats and digital signage specifications. This page provides a comprehensive view of electronic layout data sourced from the "Electronics" sheet in the `layouts.xlsx` file.

## Purpose

The Electronics page serves as a centralized repository for electronic display specifications, enabling users to:

1. Browse all available electronic layout formats
2. Sort and filter layouts based on various criteria
3. Compare specifications across different electronic display types
4. Access detailed information about each layout

## Features

### 1. Data Presentation

- **Two-Column Layout**: On larger screens, the table is split into two columns for efficient space utilization and reduced vertical scrolling.
- **Responsive Design**: The layout adapts to different screen sizes, stacking vertically on smaller devices.
- **Alternating Row Colors**: Rows alternate between white and light gray backgrounds for improved readability.
- **Compact Display**: Reduced row height and smaller font sizes allow more data to be visible at once.

### 2. Table Functionality

- **Sortable Columns**: All columns can be sorted in ascending or descending order.
  - Numeric columns (Width, Height, Canvas Width, Canvas Height, Ratio) are sorted numerically.
  - Text columns are sorted alphabetically.
- **Visual Sort Indicators**: 
  - Active sort columns display a primary-colored arrow (▲ for ascending, ▼ for descending).
  - Inactive sortable columns show a gray '↕' icon.
- **Column Visibility Control**: Users can show/hide specific columns using checkboxes.
- **Layout Count**: Displays the total number of electronic layouts with an animated counter effect.
- **Search Integration**: Works with the global search functionality in the navbar.

### 3. Special Layout Handling

The page includes special handling for certain layout types:

- **Standard Layouts**: Most layouts are displayed as clickable links that open detailed specification pages.
- **Special Layouts**: Certain layouts are displayed as non-clickable text:
  - 'CA_DM801 Innov8 part1'
  - 'CA_DM801 Innov8 part2'
  - Specific CB_DM504, CB_DM505, and CB_DM506 variants

### 4. Data Formatting

- **Layout Name**: The 'Layout' column from the Excel file is displayed as 'Layout Name'.
- **Numeric Formatting**: 
  - 'Ratio' values are formatted to two decimal places.
  - Other numeric values are displayed as strings.

## Technical Implementation

### Component Structure

The Electronics page is implemented as a React client component in `src/components/electronics-content.tsx` with the following structure:

1. **State Management**:
   - `data`: Stores the layout data fetched from the API.
   - `error`: Tracks any errors during data fetching.
   - `sortConfig`: Manages the current sort column and direction.
   - `visibleColumns`: Tracks which columns are currently visible.
   - `originalHeaders`: Stores the original column headers from the data.
   - `searchTerm`: Manages the current search filter.

2. **Data Fetching**:
   - Uses `useEffect` to fetch data from the `/api/electronics` endpoint when the component mounts.
   - Handles loading states and error conditions.

3. **Data Processing**:
   - `sortedData`: A memoized computation that filters and sorts the data based on current search term and sort configuration.
   - Data is split into `firstHalfData` and `secondHalfData` for the two-column display.

4. **User Interactions**:
   - `requestSort`: Handles column header clicks to change sort configuration.
   - `handleColumnVisibilityChange`: Manages column visibility toggling.

### API Integration

The page fetches data from the `/api/electronics` endpoint defined in `src/app/api/electronics/route.ts`, which:

1. Reads the `layouts.xlsx` file from the file system.
2. Extracts data from the "Electronics" sheet.
3. Converts the Excel data to JSON format.
4. Returns the JSON data to the client.

## User Experience

### Navigation

- Users can access the Electronics page via the navigation bar or from the home page's Layout Types section.
- The Electronics link in both the navbar and footer is highlighted when the page is active.

### Interaction Flow

1. **Initial Load**:
   - Users see a loading indicator while data is being fetched.
   - Once loaded, the page displays the table with all electronic layouts.
   - The layout count animates up to the total number.

2. **Browsing Data**:
   - Users can scroll horizontally if the table exceeds the screen width.
   - On larger screens, data is displayed in two columns for easier scanning.

3. **Sorting**:
   - Users can click on any column header to sort by that column.
   - Clicking the same header again reverses the sort direction.
   - Visual indicators show the current sort column and direction.

4. **Filtering**:
   - Users can use the global search in the navbar to filter layouts.
   - The layout count updates to show the number of matching layouts.

5. **Customizing View**:
   - Users can toggle column visibility using the checkboxes.
   - This allows focusing on specific data points of interest.

6. **Accessing Details**:
   - Clicking on a layout name (except for special layouts) opens a detailed view in a new tab.

## Visual Design

- **Color Scheme**: Follows the application's green theme based on shadcn/ui's color palette.
- **Typography**: Uses smaller font sizes for table content to maximize information density.
- **Table Styling**: 
  - Rounded corners and shadow effects for the table containers.
  - Light gray background for the table headers.
  - Alternating row colors for improved readability.
- **Interactive Elements**: 
  - Hover effects on table headers.
  - Primary color highlighting for links and active sort indicators.

## Accessibility Considerations

- **Semantic HTML**: Uses proper table elements (`<table>`, `<thead>`, `<tbody>`, etc.).
- **Keyboard Navigation**: Table headers and links are keyboard-accessible.
- **Screen Reader Support**: Appropriate labels and ARIA attributes for interactive elements.
- **Color Contrast**: Ensures sufficient contrast between text and background colors.

## Performance Optimization

- **Memoization**: Uses `useMemo` to avoid unnecessary re-computations of sorted and filtered data.
- **Efficient Rendering**: Only re-renders components when relevant state changes.
- **Data Splitting**: Divides data into two columns to reduce vertical scrolling and improve rendering performance.

## Future Enhancements

Potential improvements for future versions of the Electronics page include:

1. **Advanced Filtering**: Allow filtering by specific columns or value ranges.
2. **Data Export**: Enable exporting the displayed data to CSV or Excel formats.
3. **Saved Views**: Allow users to save preferred column visibility and sort settings.
4. **Comparative Analysis**: Add functionality to compare multiple layouts side-by-side.
5. **Visual Previews**: Include thumbnail previews of electronic layout designs.
6. **Dimension Visualization**: Add visual representation of layout dimensions and proportions.
7. **Related Layouts**: Show suggestions for similar or compatible layouts.
8. **Usage Statistics**: Display information about how frequently each layout is used.

## Conclusion

The Electronics page provides a comprehensive and user-friendly interface for browsing, sorting, and filtering electronic layout specifications. Its responsive design, interactive features, and efficient data presentation make it a valuable tool for managing digital signage layouts and electronic display formats.
