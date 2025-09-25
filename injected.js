function waitForOptimizely(maxAttempts = 20, interval = 500) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const timer = setInterval(() => {
      if (optimizely && typeof optimizely.get === "function") {
        clearInterval(timer);
        resolve(optimizely);
      } else if (++attempts >= maxAttempts) {
        clearInterval(timer);
        reject(new Error("Optimizely object not found"));
      }
    }, interval);
  });
}

(async function () {
  try {
    const optimizely = await waitForOptimizely();
    const activeExperimentIds = optimizely.get("state").getActiveExperimentIds();
    
    console.log("Active Experiment IDs:", activeExperimentIds);
    if (activeExperimentIds.length > 0) {
      const variationMap = optimizely.get("state").getVariationMap();
      const experimentData = activeExperimentIds.map((experimentId) => ({
        experimentId,
        variationName: variationMap[experimentId]?.name || "Unknown",
      }));

      // Post the data to the content script
      window.postMessage(
        {
          type: "OPTIMIZELY_DATA",
          payload: { hasActiveTest: true, experimentData },
        },
        "*",
      );
    } else {
      // Post a message indicating no active tests
      window.postMessage(
        {
          type: "OPTIMIZELY_DATA",
          payload: { hasActiveTest: false },
        },
        "*",
      );
    }
  } catch (error) {
    console.error("Error accessing Optimizely:", error);
    window.postMessage(
      {
        type: "OPTIMIZELY_DATA",
        payload: { hasActiveTest: false },
      },
      "*",
    );
  }
})();
