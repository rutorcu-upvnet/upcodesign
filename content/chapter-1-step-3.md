---
title: "1.3 Run Block Automation"
---

[Previous: Step 2](chapter-1-step-2.md)

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
<h2>Run Block Automation</h2>

Click `Run Block Automation` as shown below:

![Block Automation](img/figure_0019.png)

<center><em>Figure 19. Run Block Automation.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Configure Run Block Automation Options</h2>

On the `Run Block Automation` dialog box, select the following values:
- Leave Preset as the default value: `None`.
- Set Local Memory to `64KB`.
- Leave the Local Memory ECC as the default value: `None`.
- Set Cache Configuration to `32KB`.
- Set Debug Module to `Debug Only`.
- Leave the Peripheral AXI Port option as the default value: `Enabled`.
- Leave the Interrupt Controller option unchecked.
- Leave the Clock source option set to `/mig_7series_0/ui_clk (100 MHz)`.

![Block Automation Options](img/figure_0020.png)

<center><em>Figure 20. Run Block Automation options.</em></center><br>

<h2>Complete Block Automation</h2>

Click OK. This generates a basic MicroBlaze system in the IP integrator diagram area. The system is successfully created with all required IP blocks and connections configured automatically.

</div>

<div class="navigation">
  <button id="prevBtn">Previous</button>
  <div class="step-indicator">
    <span><span id="currentStep">1</span> of <span id="totalSteps">2</span></span>
  </div>
  <button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Step 4](chapter-1-step-4.md)
