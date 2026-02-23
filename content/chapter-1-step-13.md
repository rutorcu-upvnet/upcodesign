---
title: "1.13 Program the Device"
---

[Previous: Step 12](chapter-1-step-12.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Open Hardware Manager</h2>

Make sure that the board is connected via JTAG to your computer running Vivado. Turn on the SDK, then select `Open Hardware Manager` > `Open Target` > `Auto Connect`.

![Open Hardware](img/figure_0043.png)

<center><em>Figure 43. Open Hardware.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Program Device</h2>

The system should detect the Genesys2 board with the XC7k325T device. Download the bitstream into the Genesys2 by right-clicking the device, `Program Device` and selecting the bitstream file.

![Program Device](img/figure_0044.png)

<center><em>Figure 44. Program Device.</em></center>

Now you are ready to create the applications, but before, we should improve the architecture by using timers and interrupts.
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
