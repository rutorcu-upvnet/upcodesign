---
title: "1.5 Validating Design and Making an HDL Wrapper"
---

[Previous: Step 4](chapter-1-step-4.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

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

After the design validation step, we will proceed with creating an HDL System Wrapper. Click on the Sources tab and find your block design. Right click on your block design and click Create HDL Wrapper. Let Vivado manage wrapper and auto-update and click OK.

![Create an HDL wrapper](img/figure_0028.png)

<center><em>Figure 28. Create an HDL wrapper.</em></center><br>

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
