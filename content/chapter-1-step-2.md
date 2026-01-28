---
title: "Step 2: Create an IP Integrator Design"
---

[← Previous: Step 1](chapter-1-step-1.md)

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
<h2>Step 1: Create Block Design</h2>

From Flow Navigator, under IP integrator, select Create Block Design. Same menu can be expanded on IP Integrator tab.

![Vivado IP Integrator](img/page_010_img_01.jpeg)

<center><em>Figure 9. Vivado IP Integrator.</em></center>
</div>

<div class="step" data-step="2">
<h2>Step 2: Specify Design Name</h2>

Specify the IP subsystem design name. For this step, you can use mb_st as the Design name (MicroBlaze Standalone). Leave the Directory field set to its default value of `Local to Project`. Leave the Specify source set drop-down list set to its default value of Design Sources. Click OK in the Create Block Design dialog box, shown in the following figure.

![Creating a Block Design](img/page_010_img_02.jpeg)

<center><em>Figure 10. Creating a Block Design.</em></center>
</div>

<div class="step" data-step="3">
<h2>Step 3: Add MIG IP</h2>

In the IP integrator diagram area, right-click and select Add IP. The IP integrator Catalog opens. Alternatively, you can also select the Add IP icon in the middle of the canvas.

![MIG IP](img/page_011_img_01.jpeg)

<center><em>Figure 11. MIG IP.</em></center>
</div>

<div class="step" data-step="4">
<h2>Step 4: Run Block Automation</h2>

Click Run Block Automation.

![Run Block Automation](img/page_011_img_02.jpeg)

<center><em>Figure 12. Run Block Automation.</em></center>
</div>

<div class="step" data-step="5">
<h2>Step 5: MIG Connected</h2>

After Block Automation runs the MIG is connected.

![MIG connected](img/page_011_img_03.jpeg)

<center><em>Figure 13. MIG connected.</em></center>
</div>

<div class="step" data-step="6">
<h2>Step 6: Add MicroBlaze IP</h2>

Then add new IP MicroBlaze:

![MicroBlaze IP](img/page_012_img_01.jpeg)

<center><em>Figure 14. MicroBlaze IP.</em></center>

![MicroBlaze IP and MIG](img/page_012_img_02.jpeg)

<center><em>Figure 15.MicroBlaze IP and MIG.</em></center>
</div>

<div class="step" data-step="7">
<h2>Step 7: Use Board Window</h2>

There are several ways to use an existing interface in IP integrator. Use the Board window to instantiate some of the interfaces that are present on the Genesys2 board.

![Using the Board Window](img/page_012_img_03.jpeg)

<center><em>Figure 16. Using the Board Window.</em></center>

In the Board window, notice that the DDR3 SDRAM interface is connected as shown by the yellow circle.

From the Board window, select UART under the Miscellaneous folder, and drag and drop it into the block design canvas. This instantiates the AXI Uartlite IP on the block design. 

Likewise, from the Board window, select SWITCHES under the General Purpose Input or Output folder, and drag and drop it into the block design canvas. This instantiates the GPIO IP on the block design and connects it to the on-board switches.

Next, from the Board window, select FPGA Reset under the Reset folder, and drag and drop it into the block design canvas. This connects the CPU push button reset to the MIG core IP.
</div>

<div class="step" data-step="8">
<h2>Step 8: Merge LEDs with GPIO</h2>

Now, drag and drop LEDs into the same GPIO for the switches, this will merge both LEDs and SWs in the same AXI_GPIO.

![Canvas with MB, UART, GPIO and Reset for the DDR3 Memory System](img/page_013_img_01.jpeg)

<center><em>Figure 17. Canvas with MB, UART, GPIO and Reset for the DDR3 Memory System.</em></center>
</div>

<div class="navigation">
  <button id="prevBtn">Previous</button>
  <div class="step-indicator">
    <span>Step <span id="currentStep">1</span> of <span id="totalSteps">8</span></span>
  </div>
  <button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Step 3](chapter-1-step-3.md)
