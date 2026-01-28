---
title: "1.13: Program the Device"
---

[← Previous: Step 12](chapter-1-step-12.md)

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
<h2>Open Hardware Manager</h2>

Make sure that the board is connected with the JTAG to your computer running Vivado. Turn on the SDK, then select `Open Hardware Manager` > `Open Target` > `Auto Connect`.

![Open Hardware](img/figure_0043.png)

<center><em>Figure 43. Open Hardware.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Program Device</h2>

The system should detect the Genesys2 board with the XC7k325T device. Download the bitstream into the Genesys2 by right clicking the device, `Program Device` and selecting the bitstream file.

![Program Device](img/figure_0044.png)

<center><em>Figure 44. Program Device.</em></center>

Now you are ready to create the applications, but before, we should improve the architecture by using timers and interruptions.
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

[Back to Chapter 1](chapter-1-architecture.md)
