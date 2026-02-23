---
title: "3.6 Exercise 6: TaskControl II: Use of TaskSuspend(), TaskResume()"
---

[Previous: Exercise 5](chapter-3-exercise-5.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Using vTaskSuspend() and vTaskResume()</h2>

> [!note] Objectives
>
> Suspend and resume tasks at runtime using `vTaskSuspend()` and `vTaskResume()`<br>
> Read switch inputs to control task states dynamically<br>
> Use `eTaskGetState()` to query the current state of a task<br>

- Modify `Task 1` so that it won't delete `Task 4`
- From `Task 4` read the switches state so that:
  1. `SW8` and `SW7` to **Suspend** task 0, 1, 2, or 3 depending on what is indicated by the switch pair
  2. `SW2` and `SW1` to **Resume** the task indicated by those switches

</div>
<div class="step active" data-step="2">
<h2>Code example</h2>

An example of the requested functionality:

```c
if (xTask1Handle != NULL)
{
    vTaskResume(xTask1Handle);
    xil_printf("The state of Task 1 is %d\n", eTaskGetState(xTask1Handle));
}
else
{
    xil_printf("Task 1 is already running\n");
}
```

> [!info] Notice the use of `eTaskGetState()` that returns a number indicating the status of the checked task
>
> | Value | Constant | Meaning |
> |-------|----------|---------|
> | 0 | `eReady` | Ready |
> | 1 | `eRunning` | Running (the calling task is querying its own priority) |
> | 2 | `eBlocked` | Blocked |
> | 3 | `eSuspended` | Suspended |
> | 4 | `eDeleted` | Deleted (the task's TCB is waiting to be cleaned up) |

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

[Next: Exercise 7](chapter-3-exercise-7.md)
