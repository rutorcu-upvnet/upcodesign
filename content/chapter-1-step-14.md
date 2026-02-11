---
title: "1.14 Adding New GPIO IP"
---

[Previous: Step 13](chapter-1-step-13.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Add AXI GPIO for BTN</h2>

Add a new `AXI GPIO` IP to the Diagram for the BTN interface.

![New AXI GPIO for the pushbuttons](img/figure_0045.png)

<center><em>Figure 45. New AXI GPIO for the pushbuttons.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Add BTN Input Port</h2>

Add a new input port connection `BTN` with 5 bits. Follow the same process as in [Step 7](chapter-1-step-7.md).

![Input Port Connection](img/figure_0046.png)

<center><em>Figure 46. Input Port Connection.</em></center><br>
</div>

<div class="step" data-step="3">
<h2>Configure AXI GPIO</h2>

Edit the `AXI GPIO` properties as `Custom` and `All inputs` (see Step 7) and check `Enable Interrupt`.

![Editing the parameters of AXI GPIO](img/figure_0047.png)

<center><em>Figure 47. Editing the parameters of AXI GPIO for the pushbuttons.</em></center>

Remember to uncomment the pin names for BTN connection at the constraint file, as seen in the [Step 6](chapter-1-step-6.md).

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

[Next: Step 15](chapter-1-step-15.md)
