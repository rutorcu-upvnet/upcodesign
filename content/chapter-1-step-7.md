---
title: "1.7 GPIO Options"
---

[← Previous: Step 6](chapter-1-step-6.md)

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
<h2>Create Port for LED</h2>

The name of the ports and direction in the `AXI_GPIO` must match with the constrains file. Delete the `LEDs` port, right click in the `Design` canvas and select `Create Port`.

![Creating a port](img/figure_0030.png)

<center><em>Figure 30. Creating a port.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Configure LED Port</h2>

Select the options for LEDs Port:
- Name it `LED` (as in the constrains file)
- Set Direction as `Output`
- Set Type as `Data`
- Check Create vector option from `7 to 0`
- Click OK

![LED output port](img/figure_0031.png)

<center><em>Figure 31. LED output port.</em></center><br>

Repeat the process to create the SW as inputs.
</div>

<div class="step" data-step="3">
<h2>Configure AXI GPIO - Board Tab</h2>

Edit the `AXI_GPIO` with double click. On the `Board` tab, set the `Board interface` options to `Custom`.

![AXI GPIO Board](img/figure_0032.png)

<center><em>Figure 32. AXI GPIO Board configuration.</em></center><br>
</div>

<div class="step" data-step="4">
<h2>Configure AXI GPIO - IP Configuration Tab</h2>

On the `IP Configuration` tab, set the `SW` as `All Inputs` and the `LED` port as `All Outputs`.

![AXI GPIO IP Configuration](img/figure_0033.png)

<center><em>Figure 33. AXI GPIO IP Configuration.</em></center><br>
</div>

<div class="step" data-step="5">
<h2>Connect Ports to AXI GPIO</h2>

Make sure to connect the new labels to the corresponding `AXI_GPIO` port.

![AXI GPIO with SW and LED buses](img/figure_0034.png)

<center><em>Figure 34. AXI GPIO with SW and LED buses.</em></center><br>
</div>

<div class="navigation">
  <button id="prevBtn">Previous</button>
  <div class="step-indicator">
    <span><span id="currentStep">1</span> of <span id="totalSteps">5</span></span>
  </div>
  <button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Step 8](chapter-1-step-8.md)
