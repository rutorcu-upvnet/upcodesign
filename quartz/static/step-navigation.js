// Step Navigation Script with Quartz SPA support
(function () {
    let currentStepData = null;
    let cleanupHandlers = [];

    function removeAllListeners() {
        cleanupHandlers.forEach(handler => {
            try {
                handler();
            } catch (e) {
                console.error("Error during cleanup:", e);
            }
        });
        cleanupHandlers = [];
    }

    function initializeStepNavigation() {
        // Remove previous listeners before reinitializing
        removeAllListeners();

        const steps = document.querySelectorAll('.step');
        let currentStep = 1;
        const totalSteps = steps.length;

        if (totalSteps === 0) return;

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const currentStepEl = document.getElementById('currentStep');
        const totalStepsEl = document.getElementById('totalSteps');

        if (!prevBtn || !nextBtn || !currentStepEl || !totalStepsEl) return;

        // Update total steps display
        totalStepsEl.textContent = totalSteps;

        function showStep(n) {
            if (n > totalSteps) {
                currentStep = totalSteps;
            }
            if (n < 1) {
                currentStep = 1;
            }

            // Hide all steps
            steps.forEach(step => step.classList.remove('active'));

            // Show current step
            if (steps[currentStep - 1]) {
                steps[currentStep - 1].classList.add('active');
            }

            // Update UI
            currentStepEl.textContent = currentStep;
            prevBtn.disabled = currentStep === 1;
            nextBtn.disabled = currentStep === totalSteps;

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Create click handlers - use arrow functions to preserve context
        const prevClickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentStep -= 1;
            showStep(currentStep);
        };

        const nextClickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentStep += 1;
            showStep(currentStep);
        };

        // Attach listeners
        prevBtn.addEventListener('click', prevClickHandler, false);
        nextBtn.addEventListener('click', nextClickHandler, false);

        // Store cleanup function
        cleanupHandlers.push(() => {
            if (prevBtn) prevBtn.removeEventListener('click', prevClickHandler, false);
            if (nextBtn) nextBtn.removeEventListener('click', nextClickHandler, false);
        });

        // Register cleanup for Quartz SPA navigation if available
        if (typeof window.addCleanup === 'function') {
            window.addCleanup(() => {
                if (prevBtn) prevBtn.removeEventListener('click', prevClickHandler, false);
                if (nextBtn) nextBtn.removeEventListener('click', nextClickHandler, false);
            });
        }

        // Store current state
        currentStepData = {
            prevBtn,
            nextBtn,
            currentStepEl,
            totalStepsEl,
            prevClickHandler,
            nextClickHandler
        };

        // Initialize - ensure values are set
        currentStepEl.textContent = currentStep;
        totalStepsEl.textContent = totalSteps;
        showStep(currentStep);
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeStepNavigation);
    } else {
        // Page already loaded
        initializeStepNavigation();
    }

    // Re-initialize on Quartz SPA navigation (very important!)
    document.addEventListener('nav', () => {
        // Use a slight delay to ensure DOM is updated
        requestAnimationFrame(() => {
            initializeStepNavigation();
        });
    }, false);

    // Also listen for beforeunload events to clean up
    window.addEventListener('beforeunload', () => {
        removeAllListeners();
    });
})();
