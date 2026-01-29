---
title: "1.10 MIG_7Series Options (optional)"
---

[← Previous: Step 9](chapter-1-step-9.md)

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
<h2>Configure DDR3 Frequency</h2>

In the Genesys2 board, the input clock frequency is 100MHz. The DDR3 can run up to 800MHz, enabling fast memory access and efficient processing of the MicroBlaze. Modify the frequency clock to `800MHz`. This allows the MicroBlaze to operate at frequencies up to 800MHz/8 = 100MHz.

![Change the frequency](img/figure_0037.png)

<center><em>Figure 37. Change the frequency.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Set Input Clock Period</h2>

Select `5000ps` (200MHz) as the `Input Clock Period`.

![Selecting Input Clock Period](img/figure_0038.png)

<center><em>Figure 38. Selecting Input Clock Period.</em></center><br>

<h2>Complete MIG Configuration</h2>

Click `Next` to proceed through the following options. Then `Validate` and `Generate` the `MIG` controller to apply all configuration changes.

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

[Next: Step 11](chapter-1-step-11.md)
