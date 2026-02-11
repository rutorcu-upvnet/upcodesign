---
title: "3.6 Exercise 6: TaskControl II: Use of TaskSuspend(), TaskResume()"
---

[Previous: Exercise 5](chapter-3-exercise-5.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Step 1</h2>

Exercise 6. TaskControl II: Use of TaskSuspend(), TaskResume().
Modify Task 1 so that it stops deleting Task 4.
From Task 4 read the SWs so that:
1. SW8 and SW7 to Suspend task 0, 1, 2, or 3 depending on what is indicated
by the switch pair.
2. SW2 and SW1 to Resume the task indicated by those switches.
An example of those requested would be:
if (xTask1Handle != NULL)
{
vTaskResume(xTask1Handle);
xil_printf("The state of Task 1 is %d\n", eTaskGetState(xTask1Handle));
}
else
{
xil_printf("Task 1 is already running\n");
}
Notice the use of eTaskGetState that returns a number indicating the status of the
checked task.
0 Ready eReady
1 Running eRunning (the calling task is querying its own priority)
2 Blocked eBlocked
3 Suspended eSuspended
4 Deleted eDeleted (the tasks TCB is waiting to be cleaned up)
@Marcos Martínez Peiró, Feb 25. Pag 73

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

[Next: Exercise 7](chapter-3-exercise-7.md)
