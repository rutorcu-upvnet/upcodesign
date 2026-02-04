---
title: "2.3 Exercise 3: Managing GPIO — Part II"
---

[Previous: Exercise 2](chapter-2-exercise-2.md)

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

.objectives {
  background-color: var(--highlight);
  padding: 1rem;
  border-left: 4px solid var(--secondary);
  margin-bottom: 1.5rem;
  border-radius: 4px;
}

.objectives h3 {
  margin-top: 0;
}

.objectives ul {
  margin-bottom: 0;
}
</style>

<div class="step-container">
<div class="step active" data-step="1">
<h2>Managing GPIO - Part II</h2>

> ### Objectives
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
