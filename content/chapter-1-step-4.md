---
title: "1.4 Use Connection Automation"
---

[Previous: Step 3](chapter-1-step-3.md)

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
<h2>Run Connection Automation</h2>

`Run Connection Automation` provides several options that you can select to make connections. This section will walk you through the first connection, and then you will use the same procedure to make the rest of the required connections for this tutorial.

![Run Connection Automation](img/figure_0021.png)

<center><em>Figure 21. Run Connection Automation.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Select All Automation</h2>

Check the `All Automation` option in the left panel of the dialog box as shown in the following figure. This selects all interfaces to run Connection Automation for.

![Run Connection Automation Options](img/figure_0022.png)

<center><em>Figure 22. Run Connection Automation Options.</em></center><br>
</div>

<div class="step" data-step="3">
<h2>Regenerate Layout (Optional)</h2>

If you need to delete an IP block, you can click and delete it. Then select `Regenerate Layout` to reorganize the blocks on the canvas.

![Regenerate Layout](img/figure_0023.png)

<center><em>Figure 23. Regenerate Layout.</em></center><br>
</div>

<div class="step" data-step="4">
<h2>View Complete MicroBlaze System</h2>

At this point, your IP integrator diagram area should look like the following figure. All connections have been made automatically.

![MicroBlaze System](img/figure_0024.png)

<center><em>Figure 24. MicroBlaze System.</em></center><br>
</div>

<div class="step" data-step="5">
<h2>Check Memory Map</h2>

Now you can check the `Memory Map` of your system. This shows the address space allocated to each peripheral.

![Memory Map](img/figure_0025.png)

<center><em>Figure 25. Memory Map.</em></center><br>
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

[Next: Step 5](chapter-1-step-5.md)
