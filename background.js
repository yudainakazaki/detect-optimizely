let optimizelyData = null;

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setIcon({ path: "images/icon-gray.png" });
});

chrome.action.setIcon({ path: 'images/icon-color.png' });

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "OPTIMIZELY_DATA") {
    optimizelyData = message.data;
    // Optionally update icon here
    const iconPath = optimizelyData.hasActiveTest
      ? "images/icon-color.png"
      : "images/icon-gray.png";
    await chrome.action.setIcon({ path: iconPath });
    sendResponse({ status: "data stored" });
  }
  if (message.type === "GET_OPTIMIZELY_DATA") {
    sendResponse({ data: optimizelyData });
  }
});