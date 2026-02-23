---
title: "3.5 Exercise 5: TaskControl I: Using xTaskDelayUntil()"
---

[Previous: Exercise 4](chapter-3-exercise-4.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Using xTaskDelayUntil()</h2>

> [!note] Objectives
>
> Understand the difference between `vTaskDelay()` and `xTaskDelayUntil()`<br>
> Use `xTaskDelayUntil()` to ensure a constant execution frequency in periodic tasks<br>

`xTaskDelayUntil()` delays a task until a specified time. This function can be used by periodic tasks to ensure a constant execution frequency.

This function differs from `vTaskDelay()` in one important aspect: `vTaskDelay()` specifies a time at which the task wishes to unblock **relative** to the time at which `vTaskDelay()` is called, whereas `xTaskDelayUntil()` specifies an **absolute** time at which the task wishes to unblock.

- Example of `xTaskDelayUntil()`:

```c
// Perform an action every 10 ticks.
void vTaskFunction( void * pvParameters )
{
    TickType_t xLastWakeTime;
    const TickType_t xFrequency = 10;
    // Initialise the xLastWakeTime variable with the current time.
    xLastWakeTime = xTaskGetTickCount();
    for( ;; )
    {
        // Wait for the next cycle.
        vTaskDelayUntil( &xLastWakeTime, xFrequency );
        // Perform action here.
    }
}
```

> [!warning] Modify the delay of `Task 3` to make it accurate by using `xTaskDelayUntil()`

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

[Next: Exercise 6](chapter-3-exercise-6.md)
