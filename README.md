# Detect Optimizely

## Overview

Detect Optimizely is a Chrome extension that helps you detect active Optimizely experiments running on any website. When you load or refresh a page, the extension scans for Optimizely experiments and displays their IDs and variations in a simple, professional popup.

## Features

- **Automatic Detection:** On page load or refresh, the extension checks for active Optimizely experiments.
- **Clear Experiment Data on Tab Switch:** When you move focus to another tab, the stored experiment data is cleared for privacy and accuracy. You must reload the page to refresh the experiment data.
- **Visual Feedback:** The extension icon changes color to indicate whether active experiments are detected.
- **Easy Access:** View experiment details directly from the extension popup.

## Usage

1. **Install the extension** in Chrome.
2. **Navigate to any website** using Optimizely.
3. **Load or refresh the page** to trigger the plugin and detect experiments.
4. **Click the extension icon** to view active experiment IDs and their variations.
5. **Switching tabs** will flush the stored experiment data. To see experiment data again, reload the page.

## Notes

- The extension only detects experiments present when the page is loaded or refreshed.
- If you switch away from the tab and return, you must reload the page to re-trigger detection.

##

Reference
- https://stackoverflow.com/questions/12265403/passing-message-from-background-js-to-popup-js