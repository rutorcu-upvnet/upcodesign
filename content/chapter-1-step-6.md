---
title: "1.6 Modifying Constraints File (Optional)"
---

[Previous: Step 5](chapter-1-step-5.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Edit Constraints File</h2>

The Digilent constraints file represents all the pin connections available in the Genesys2 board. All the peripherals on the board are connected to the FPGA. Not all of them are connected in our design so comment all lines that do not contain `clock`, `UART`, `SW`, `LED` or `pushbuttons`.

![Edition of constraints file](img/figure_0029.png)

<center><em>Figure 29. Edition of constraints file.</em></center><br>
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

[Next: Step 7](chapter-1-step-7.md)
