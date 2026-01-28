---
title: "1.5 Validating Design and Making an HDL Wrapper"
---

[← Previous: Step 4](chapter-1-step-4.md)

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
<h2>Validate Design</h2>

Select Validate Design. This will check for design and connection errors.

![Validate Design](img/figure_0026.png)

<center><em>Figure 26. Validate Design.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Successful Validation</h2>

If the design is correct, you will see a successful validation message. This confirms that all connections are properly configured and there are no errors.

![Successful validation](img/figure_0027.png)

<center><em>Figure 27. Successful validation.</em></center><br>
</div>

<div class="step" data-step="3">
<h2>Create HDL Wrapper</h2>

After the design validation step, we will proceed with creating a HDL System Wrapper. Click on the Sources tab and find your block design. Right click on your block design and click Create HDL Wrapper. Let Vivado manage wrapper and auto-update and click OK.

![Create a HDL wrapper](img/figure_0028.png)

<center><em>Figure 28. Create a HDL wrapper.</em></center><br>

This will create a top module in Verilog and will allow you to generate a bitstream.
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

[Next: Step 6](chapter-1-step-6.md)
