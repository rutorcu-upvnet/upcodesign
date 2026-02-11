---
title: "1.10 MIG_7Series Options (optional)"
---

[Previous: Step 9](chapter-1-step-9.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

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
