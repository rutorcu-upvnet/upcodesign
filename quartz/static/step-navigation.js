// Step Navigation Script
document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll('.step');
    let currentStep = 1;
    const totalSteps = steps.length;

    if (totalSteps === 0) return;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentStepEl = document.getElementById('currentStep');
    const totalStepsEl = document.getElementById('totalSteps');

    if (!prevBtn || !nextBtn) return;

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

    prevBtn.addEventListener('click', function () {
        currentStep -= 1;
        showStep(currentStep);
    });

    nextBtn.addEventListener('click', function () {
        currentStep += 1;
        showStep(currentStep);
    });

    // Initialize
    showStep(currentStep);
});
