(async () => {
  const statusDiv = document.getElementById("status");
  console.log("Popup loaded");

  chrome.runtime.sendMessage({ type: "GET_OPTIMIZELY_DATA" }, (response) => {
    const data = response.data;
    console.log("Received data in popup:", data);
    if (data && data.hasActiveTest) {
      const experimentMessages = data.experimentData.map(
        (experiment) =>
            `<div>Experiment ID: </div>
            <div><b>${experiment.experimentId}</b></div>
            <div>Variation: </div>
            <div><b>${experiment.variationName}</b></div>`,
      );
      statusDiv.innerHTML = `
        <p>Active Optimizely experiment(s) detected:</p>
        <ul>
          ${experimentMessages.map((msg) => `<li>${msg}</li>`).join("")}
        </ul>
      `;
    } else {
      statusDiv.textContent = "No active Optimizely experiment(s) detected";
    }
  });
})();