---
title: "1.2 Create an IP Integrator Design"
---

[Previous: Step 1](chapter-1-step-1.md)

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
<h2>Create Block Design</h2>

From `Flow Navigator`, under `IP INTEGRATOR`, select `Create Block Design`.

![Vivado IP Integrator](img/figure_0010.png)

<center><em>Figure 10. Vivado IP Integrator.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Specify Design Name</h2>

Specify the IP subsystem design name. For this step, you can use `mb_st` (MicroBlaze Standalone) as the `Design name`. Leave the `Directory` field set to its default value of `Local to Project`. Leave the `Specify source set` drop-down list set to its default value of `Design Sources`. Click `OK` in the `Create Block Design` dialog box, shown in the following figure.

![Creating a Block Design](img/figure_0011.png)

<center><em>Figure 11. Creating a Block Design.</em></center><br>
</div>

<div class="step" data-step="3">
<h2>Add MIG IP</h2>

In the `IP INTEGRATOR` diagram area, right-click and select `Add IP`. The IP integrator Catalog opens. Alternatively, you can also select the `Add IP` icon in the middle of the canvas. Search for the `Memory Interface Generator`.

![MIG IP](img/figure_0012.png)

<center><em>Figure 12. MIG IP.</em></center><br>
</div>

<div class="step" data-step="4">
<h2>Run Block Automation</h2>

Click Run Block Automation.

![Run Block Automation](img/figure_0013.png)

<center><em>Figure 13. Run Block Automation.</em></center><br>
</div>

<div class="step" data-step="5">
<h2>MIG Connected</h2>

After Block Automation runs, the `MIG` is connected.

![MIG connected](img/figure_0014.png)

<center><em>Figure 14. MIG connected.</em></center><br>
</div>

<div class="step" data-step="6">
<h2>Add `MicroBlaze` IP</h2>

Add new IP MicroBlaze:

![MicroBlaze IP](img/figure_0015.png)

<center><em>Figure 15. MicroBlaze IP.</em></center><br>
</div>

<div class="step" data-step="7">
<h2>MicroBlaze and MIG Connected</h2>

After adding MicroBlaze, you will see both the MicroBlaze IP and MIG are still not connected:

![MicroBlaze IP and MIG](img/figure_0016.png)

<center><em>Figure 16. MicroBlaze IP and MIG.</em></center><br>
</div>

<div class="step" data-step="8">
<h2>Open Board Window</h2>

There are several ways to use an existing interface in IP integrator. Use the Board window to instantiate some of the interfaces that are present on the Genesys2 board.

![Using the Board Window](img/figure_0017.png)

<center><em>Figure 17. Using the Board Window.</em></center><br>
</div>

<div class="step" data-step="9">
<h2>Add UART and Switches from Board</h2>

In the `Board` window, notice that the DDR3 SDRAM interface is connected as shown by the yellow circle.

From the `Board` window, select `USB UART` under the `UART` folder, and drag and drop it into the block design canvas. This instantiates the `AXI Uartlite` IP on the block design. 

Likewise, from the `Board` window, select `8 SWITCHES` under the `GPIO` folder, and drag and drop it into the block design canvas. This instantiates the `AXI GPIO` IP on the block design and connects it to the on-board switches.

<h2>Add Reset Connection</h2>

Next, from the `Board` window, select `Reset` under the `Reset` folder, and drag and drop it into the block design canvas. This connects the CPU push button reset to the `MIG` IP.

<h2>Merge LEDs with GPIO</h2>

Now, drag and drop `8 LEDs` into the same `GPIO` for the switches, this will merge both LEDs and SWs in the same AXI_GPIO.

![Canvas with MB, UART, GPIO and Reset for the DDR3 Memory System](img/figure_0018.png)

<center><em>Figure 18. Canvas with MB, UART, GPIO and Reset for the DDR3 Memory System.</em></center><br>
</div>

<div class="navigation">
  <button id="prevBtn">Previous</button>
  <div class="step-indicator">
    <span><span id="currentStep">1</span> of <span id="totalSteps">9</span></span>
  </div>
  <button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Step 3](chapter-1-step-3.md)
