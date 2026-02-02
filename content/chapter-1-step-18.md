---
title: "1.18 Concatenation of Interruptions and Connections"
---

[Previous: Step 17](chapter-1-step-17.md)

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
<h2>Add Concat IP</h2>

Add a `Concat` IP module.

![New Concat Block](img/figure_0051.png)

<center><em>Figure 51. New Concat Block.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Configure Concat Inputs</h2>

Edit the Concat module properties with 3 inputs.

![Editing the Concat for 3 inputs](img/figure_0052.png)

<center><em>Figure 52. Editing the Concat for 3 inputs.</em></center><br>
</div>

<div class="step" data-step="3">
<h2>Connect Interrupt Signals</h2>

Connect the output interruption from `AXI Timers` and `BTN` to the Concat inputs. Connect the output from the `Concat` to the input interruption of `AXI Interrupt Controller`. Connect the output of the `AXI Interrupt Controller` to the input interruption bus of the `MicroBlaze` processor.

![Interrupt connections](img/figure_0053.png)

<center><em>Figure 53. Interrupt connections.</em></center>
</div>

<div class="navigation">
  <button id="prevBtn">Previous</button>
  <div class="step-indicator">
    <span><span id="currentStep">1</span> of <span id="totalSteps">3</span></span>
  </div>
  <button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Step 19](chapter-1-step-19.md)
