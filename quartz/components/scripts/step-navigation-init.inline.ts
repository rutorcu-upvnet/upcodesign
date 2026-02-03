/**
 * Step Navigation Initializer for Quartz SPA
 * 
 * This script ensures that step navigation works correctly with Quartz's
 * Single Page Application navigation system.
 */

document.addEventListener("nav", () => {
    // Wait for DOM to be fully updated after SPA navigation
    requestAnimationFrame(() => {
        // Trigger the step navigation initialization from the external script
        if (typeof initializeStepNavigation === "function") {
            initializeStepNavigation()
        }
    })
})
