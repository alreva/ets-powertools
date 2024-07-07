# ETS Power Tools

ETS Power Tools is a Chrome extension designed to enhance the user experience on ETS platforms by providing advanced data organization and visualization features.

## Description

ETS Power Tools aims to streamline the workflow for ETS platform users by providing automated data management and clear visual cues, making it easier to stay on top of your tasks and logged hours.

## Features

1. **Data Grouping:**
   - Groups table rows by date, parsing and processing the data within each row.
   - Calculates totals for specific metrics such as STD (Standard Time) and OVR (Overtime).

1. **Status Marking:**
   - Highlights rows with total STD hours of 8 or more, indicating completed workdays.
   - Marks rows with incomplete hours, showing the total logged hours out of the required 8.

1. **Visual Enhancements:**
   - Adds custom classes to rows to visually differentiate date headers and status indicators.
   - Displays total hours directly within the table for quick reference.

## How to Install ETS Power Tools Chrome Extension from GitHub

### Step 1: Download the Repository
- Go to the GitHub repository URL: [https://github.com/alreva/ets-power-tools](https://github.com/alreva/ets-power-tools).
- Click on the green "Code" button and select "Download ZIP".
- Once downloaded, extract the ZIP file to a folder on your computer.

### Step 2: Open Chrome Extensions Page
- Open Google Chrome.
- Go to `chrome://extensions/` in the address bar.

### Step 3: Enable Developer Mode
- In the top right corner of the Extensions page, toggle the "Developer mode" switch to ON.

### Step 4: Load Unpacked Extension
- Click on the "Load unpacked" button.
- In the file dialog, navigate to the folder where you extracted the repository.
- Select the folder and click "Select Folder".

### Step 5: Verify Installation
- Once loaded, you should see the "ETS Power Tools" extension listed on the Extensions page.
- An icon for the extension should appear in the Chrome toolbar.

### Step 6: Using the Extension
- The extension will automatically activate when you visit the ETS time reports page.
- No further action is needed; the extension will process the table data and enhance your experience on the ETS platform.

## Example Directory Structure

Your directory should look like this:

```
ets-power-tools/
├── content/
│   ├── content.js
│   ├── jquery-3.7.1.min.js
│   └── styles.css
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── options/
│   └── options.html
├── popup/
│   └── popup.html
├── background.js
└── manifest.json
```

**Note**: Ensure that the `manifest.json`, `popup.html`, and any required assets (e.g., icons) are correctly placed in the repository directory.

By following these instructions, you should be able to install and use the ETS Power Tools extension directly from the source code on GitHub. The extension will automatically start when you navigate to the specified URL, providing enhanced functionality for managing and visualizing your time reports.