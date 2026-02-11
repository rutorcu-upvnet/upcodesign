---
title: "2.3 Exercise 3: Managing GPIO — Part II"
---

[Previous: Exercise 2](chapter-2-exercise-2.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">
<div class="step active" data-step="1">
<h2>Managing GPIO - Part II</h2>

> [!note] Objectives
>
> Implement LED patterns based on switch states<br>
> Practice bitwise operations on GPIO values<br>
> Use timing to create visible LED animations<br>

In this exercise you will extend the GPIO program to drive LED patterns. The behavior depends on the switches:

- If **all switches are OFF**, LEDs toggle between `0xAA` and `0x55` every 100 ms.
- If **any switch is ON**, LEDs perform a “chasing” pattern from `LED0` to `LED7`, then reverse direction.

</div>
<div class="step" data-step="2">
<h2>Compile and Debug</h2>

Build and debug the application. 

> [!info] 
>
> - Use breakpoints and check the `VARIABLES` tab
> - Show the disassembly of the C code by right click on C code and `Open Disassembly View`

> [!warning] Show the result to the teacher

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

[Next: Exercise 4](chapter-2-exercise-4.md)
