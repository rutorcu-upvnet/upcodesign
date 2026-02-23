---
title: "3.13 Exercise 13: Kernel Control"
---

[Previous: Exercise 12](chapter-3-exercise-12.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Kernel Control: Critical Sections</h2>

> [!note] Objectives
>
> Use kernel services to control critical sections in `FreeRTOS`<br>
> Protect shared resources using `taskENTER_CRITICAL()` and `taskEXIT_CRITICAL()`<br>
> Explore alternative methods to control critical sections without blocking interrupts<br>

- Work with the use of services to control the kernel before and after a critical section in previous examples

- For instance, use `taskENTER_CRITICAL()` and `taskEXIT_CRITICAL()` to wrap the `xil_printf()` function

> [!error] There are also methods to control the critical sections without blocking interrupts. Give an example of the services in `FreeRTOS`.

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

[Next: Exercise 14](chapter-3-exercise-14.md)
