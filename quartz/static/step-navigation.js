// Step Navigation Script
function initializeStepNavigation() {
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

        steps.forEach(step => step.classList.remove('active'));
        if (steps[currentStep - 1]) {
            steps[currentStep - 1].classList.add('active');
        }

        currentStepEl.textContent = currentStep;
        prevBtn.disabled = currentStep === 1;
        nextBtn.disabled = currentStep === totalSteps;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Remove previous listeners if any
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

    newPrevBtn.addEventListener('click', function () {
        currentStep -= 1;
        showStep(currentStep);
    });

    newNextBtn.addEventListener('click', function () {
        currentStep += 1;
        showStep(currentStep);
    });

    // Initialize - ensure values are set
    currentStepEl.textContent = currentStep;
    totalStepsEl.textContent = totalSteps;
    showStep(currentStep);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeStepNavigation);

// Re-initialize on Quartz SPA navigation
document.addEventListener('nav', initializeStepNavigation);
