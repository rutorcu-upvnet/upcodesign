---
title: "3.1 Exercise 1: Creating a project with Free RTOS"
---

[Back to Chapter 3](chapter-3-freertos.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">
<div class="step active" data-step="1">
<h2>Creating a project with Free RTOS</h2>

> [!note] Objectives
>
> Create a base project like in [2.1](chapter-2-exercise-2.md) using `Free RTOS` as software platform<br>
> Adjust the BSP configuration and select the appropriate timers<br>

This exercise guides you through creating your first `Free RTOS` application on the `MicroBlaze` processor. You will create a Vitis platform based on your Vivado hardware design.

> [!warning] Prerequisites 
> Complete [Chapter 1](chapter-1-architecture.md) to generate the hardware architecture and bitstream

</div>
<div class="step" data-step="2">
<h2>Open Vitis and Create a Platform</h2>

Open the Vitis IDE and select `File`/`New Component`/`Platform`

![Creating a new platform in Vitis IDE](img/figure_0078.png)

<center><em>Figure 78. Creating a new platform in Vitis IDE.</em></center><br>

</div>
<div class="step" data-step="3">
<h2>Specify the platform name</h2>

Specify the platform name `genesys2_freertos_microblaze`

![Specify platform name](img/figure_0079.png)

<center><em>Figure 79. Specify the platform name.</em></center><br>

</div>
<div class="step" data-step="4">
<h2>Select the XSA file</h2>

Select `Hardware Design` and browse the XSA file created from Vivado

![Select the XSA file](img/figure_0080.png)

<center><em>Figure 80. Select the XSA file.</em></center><br>

> [!warning] Select the complete hardware architecture that include `AXI Timers`

</div>
<div class="step" data-step="5">
<h2>Configure Operating System</h2>

Select `Operative System` as `freertos`, select `MicroBlaze` from available processor options and finish the process

![Select Free RTOS](img/figure_0081.png)

<center><em>Figure 81. Select Free RTOS.</em></center><br>

</div>
<div class="step" data-step="6">
<h2>Build the Platform</h2>

Once the platform configuration is complete, click in `Build` at the `Flow` tab of the main window

![Building the platform](img/figure_0082.png)

<center><em>Figure 82. Building the platform.</em></center><br>

</div>
<div class="step" data-step="7">
<h2>Check Free RTOS options</h2>

View settings by selecting the gear icon in the `Flow` tab or select your platform `genesys2_freertos_microblaze`/`Settings`/`vitis-comp.json`. Select `freertos microblaze`/`Board Support Package`/`freertos` and check different parameters. 

![Free RTOS parameters](img/figure_0083.png)

<center><em>Figure 83. Free RTOS parameters.</em></center><br>

>[!error] Some parameters have a real interest
> - Maximum size of stack for the tasks (2048 recommended to start)
> - Maximum number of priority (select almost 16)
> - Pre-emption (True in the habitual way to work on RTOS)
> - Time-slicing (False in the habitual way)
> - If you have troubles with some inner assertions on the portability of `Free RTOS` on AMD try to select False (only you have experienced issues) in freertos_asserts parameter

</div>
<div class="step" data-step="8">
<h2>Configure Timers</h2>

Select `xiltimer` and configure timing services for the platform. Set up `sleep timer` for delay functions with `axi_timer_0`. Set up `tick timer` for system timing services with `axi_timer_1`.

![Sleep timer and tick timer configuration](img/figure_0084.png)

<center><em>Figure 84. Sleep timer and tick timer for the platform.</em></center><br>

</div>
<div class="navigation">
	<button id="prevBtn">Previous</button>
	<div class="step-indicator">
		<span><span id="currentStep">1</span> of <span id="totalSteps">8</span></span>
	</div>
	<button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Exercise 2](chapter-3-exercise-2.md)
