// Inject the script into the webpage
const script = document.createElement ("script");
script.src = chrome.runtime.getURL("injected.js"); // Load the injected script
script.async = false;
script.onload = () => script.remove(); // Remove the script element after it loads
(document.head || document.documentElement).appendChild(script);

// Listen for messages from the injected script
window.addEventListener ("message", (event) => {
    // Make sure the message is from the injected script
    if (event.source !== window || event.data.type !== "OPTIMIZELY_DATA") {
        return;
    }

    console.log('message received in content script:', event);

    // Send the data back to the popup
    chrome.runtime.sendMessage({
        type: "OPTIMIZELY_DATA", 
        data: event.data.payload,
    });
});
