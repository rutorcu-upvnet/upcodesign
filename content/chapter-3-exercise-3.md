---
title: "3.3 Exercise 3: Parameters and TaskControl. Delete Tasks"
---

[Previous: Exercise 2](chapter-3-exercise-2.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Parameters and TaskControl</h2>

> [!note] Objectives
>
> Pass parameters to tasks using structs in `Free RTOS`<br>
> Use task handles `TaskHandle_t` to identify and control tasks<br>
> Delete tasks at runtime using `vTaskDelete`<br>

We are now using structs to store the tasks parameters.

- Create a parameter struct, you can include different fields to store task information

```c
typedef struct {
	const char *taskName;
	TickType_t delay;
	const char *message;
} TaskParameters;
```
- Define variables from the struct for each task

```c
TaskParameters task1_parameters={"Task 1", 1000, "Task 1 is running\n"};
TaskParameters task2_parameters={"Task 2", 1500, "Task 2 is running\n"};
TaskParameters task3_parameters={"Task 3", 2000, "Task 3 is running\n"};
TaskParameters task4_parameters={"Task 4", 2500, "Task 4 is running\n"};
```

</div>
<div class="step active" data-step="2">
<h2>Adding handlers</h2>

- Add handlers for each task, so that they can be used to identify them

```c
TaskHandle_t xTask1Handle = NULL;
TaskHandle_t xTask2Handle = NULL;
TaskHandle_t xTask3Handle = NULL;
TaskHandle_t xTask4Handle = NULL;
```

</div>
<div class="step active" data-step="3">
<h2>Creating tasks from structs</h2>

- Create the tasks passing the parameters and handlers

```c
xTaskCreate(vTask1, "Task 1", STACK_SIZE, &task1_parameters, 4, &xTask1Handle);
xTaskCreate(vTask2, "Task 2", STACK_SIZE, &task2_parameters, 5, &xTask2Handle);
xTaskCreate(vTask3, "Task 3", STACK_SIZE, &task3_parameters, 6, &xTask3Handle);
xTaskCreate(vTask4, "Task 4", STACK_SIZE, &task4_parameters, 7, &xTask4Handle);
```

- The information of the struct can be used within the task

```c
void vTask1(void *pvParameters)
{
	TaskParameters *params = (TaskParameters *)pvParameters;
	for (;;)
	{
		xil_printf("%s: %s\n", params->taskName, params->message);
		vTaskDelay(params->delay);
	}
}
```
> [!error] Generate all tasks as in [Exercise 2](chapter-3-exercise-2.md)

</div>
<div class="step active" data-step="4">
<h2>Using handlers</h2>

- Use handlers to delete `Task4` from `Task1`, when Task1 is run 3 times.

```c
if (xTask4Handle != NULL)
{
	vTaskDelete(xTask4Handle);
	xil_printf("Task 4 deleted by Task 1\n");
	xTask4Handle = NULL;
}
```

> [!warning] Check your usage on the serial terminal

> [!question] Have you been able to delete high-priority tasks from a lower-priority one?

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

[Next: Exercise 4](chapter-3-exercise-4.md)
