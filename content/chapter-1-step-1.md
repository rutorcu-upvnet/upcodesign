---
title: "1.1 New Project Wizard"
---

[← Back to Chapter 1](chapter-1-architecture.md)

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
<h2>Open Vivado</h2>

![Vivado quick start panel](img/figure_0001.png)

<center><em>Figure 1. Vivado quick start panel.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Create a New Project</h2>

Select Create Project, this will guide you through the options to create a new project. Name it `genesys2_standardmicroblaze`

![Name and folder for the hardware project](img/figure_0002.png)

<center><em>Figure 2. Name and folder for the hardware project.</em></center><br>
</div>

<div class="step" data-step="3">
<h2>RTL Project</h2>

Select RTL Project as the project type.

![RTL Project](img/figure_0003.png)

<center><em>Figure 3. RTL Project.</em></center><br>
</div>

<div class="step" data-step="4">
<h2>Add Constraint File</h2>

This example we do not add design files. We add the constrain file downloaded from [Genesys2 Digilent git page](https://github.com/Digilent/digilent-xdc).

![GitHub of Digilent's Genesys2 board](img/figure_0004.png)

<center><em>Figure 4. GitHub of Digilent's Genesys2 board.</em></center><br>
</div>

<div class="step" data-step="5">
<h2>Add Constraint File</h2>

Add the constraint file to your project.

![Adding new constrain file](img/figure_0005.png)

<center><em>Figure 5. Adding new constrain file.</em></center><br>
</div>

<div class="step" data-step="6">
<h2>Select the FPGA Part</h2>

Select the Part (FPGA). In the [Digilent web page](https://digilent.com/reference/programmable-logic/genesys-2/start) you can locate the part: XC7K325TFFG900-2.

![Selecting the part](img/figure_0006.png)

<center><em>Figure 6. Selecting the part.</em></center><br>
</div>

<div class="step" data-step="7">
<h2>Select the FPGA Board</h2>

Alternatively, you can select the board (Genesys2). Refresh the catalogue to update the boards available.

![Selecting the genesys2 board](img/figure_0007.png)

<center><em>Figure 7. Selecting the genesys2 board.</em></center><br>
</div>

<div class="step" data-step="8">
<h2>Project Summary</h2>

Review the project summary before completing.

![Project Summary](img/figure_0008.png)

<center><em>Figure 8. Project Summary.</em></center><br>
</div>

<div class="step" data-step="9">
<h2>New Project Screen</h2>

The project has been created successfully. You now see the main Vivado IDE window.

![Main window of Vivado IDE](img/figure_0009.png)

<center><em>Figure 9. Main window of Vivado IDE for the new hardware project.</em></center><br>
</div>

<div class="navigation">
  <button id="prevBtn">Previous</button>
  <div class="step-indicator">
    <span><span id="currentStep">1</span> of <span id="totalSteps">9</span></span>
  </div>
  <button id="nextBtn">Next</button>
</div>

</div></div>

[Next: Step 2](chapter-1-step-2.md)