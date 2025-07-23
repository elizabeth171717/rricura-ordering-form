// /src/analytics/gtmEvents.js

export const pushToDataLayer = (eventName, data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...data
  });
};

