---
title: "1.8 MicroBlaze Options"
---

[← Previous: Step 7](chapter-1-step-7.md)

<script src="./static/step-navigation.js"></script>

<style>
.step-container {
  max-width: 800px;
  margin: 2rem auto;
}

.step {
  display: none;
  padding: 2rem;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  background-color: var(--light);
}

.step.active {
  display: block;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.step h2 {
  margin-top: 0;
  color: var(--secondary);
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

button {
  padding: 0.7rem 1.5rem;
  background-color: var(--secondary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: var(--tertiary);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.step-indicator {
  text-align: center;
  font-weight: bold;
  color: var(--darkgray);
}
</style>

<div class="step-container">

<div class="step active" data-step="1">
<h2>Open MicroBlaze Configuration</h2>

Double click on the `Microblaze` IP and select the `Predefined Configuration`.

![Real-time Preset](img/figure_0035.png)

<center><em>Figure 35. Real-time Preset.</em></center><br>

<h2>Apply Real-Time Preset</h2>

The Real-Time preset option is optimized for deterministic programming and for RTOS. Select this preset to configure the MicroBlaze for real-time applications.

Select the default values in the following windows and apply the configuration.
</div>

<div class="navigation">
  <button id="prevBtn">Previous</button>
  <div class="step-indicator">
    <span><span id="currentStep">1</span> of <span id="totalSteps">1</span></span>
  </div>
  <button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Step 9](chapter-1-step-9.md)
