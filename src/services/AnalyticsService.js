/**
 * Mock Analytics Service
 */
const AnalyticsService = {
    logEvent: (eventName, params = {}) => {
        console.log(`[Analytics] Event: ${eventName}`, params);
        // In a real app, this would send data to Firebase, Mixpanel, etc.
    },
    setUserProperties: (properties) => {
        console.log(`[Analytics] UserProperties:`, properties);
    }
};

export default AnalyticsService;
