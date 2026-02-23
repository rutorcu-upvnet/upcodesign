---
title: "3.14 Exercise 14: Task Notifications"
---

[Previous: Exercise 13](chapter-3-exercise-13.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Task Notifications</h2>

> [!note] Objectives
> Understand task notifications in FreeRTOS.<br>
> A direct-to-task notification is an event sent directly to a task, rather than indirectly via an intermediary object such as a queue, event group or semaphore.<br>
> Sending a notification sets the target task notification state to *pending*. A task can block on a notification to wait for its state to become pending.<br>
> In this exercise we will create a timer that sends a notification to a task every second.

</div>
<div class="step" data-step="2">
<h2>Libraries and callback</h2>

Add the required library and define the task handle, the timer callback function using `xTaskNotifyGive()`, and the worker task using `ulTaskNotifyTake()`:

```c
#include "timers.h"

// Define the task handle
TaskHandle_t xWorkerTaskHandle = NULL;

// Timer callback function
void vTimerCallback(TimerHandle_t xTimer) {
    // Notify the WorkerTask
    xTaskNotifyGive(xWorkerTaskHandle);
}

void WorkerTask(void *pvParameters) {
    while (1) {
        // Wait for notification (block until received)
        ulTaskNotifyTake(pdTRUE, portMAX_DELAY);
        // Action upon receiving the notification
        xil_printf("WorkerTask: Notification received, executing task...\n");
    }
}
```

</div>
<div class="step" data-step="3">
<h2>StartUp Task: Create Worker and Timer</h2>

Create the worker task and the software timer in the StartUp task. Include the following code in the StartUp task and check the result on the terminal:

```c
// Create the WorkerTask
xTaskCreate(WorkerTask, "WorkerTask", configMINIMAL_STACK_SIZE, NULL, 1, &xWorkerTaskHandle);

// Create the timer
xTimerHandle xTimer = xTimerCreate("Timer", pdMS_TO_TICKS(1000), pdTRUE, NULL, vTimerCallback);

if (xTimer == NULL) 
{
    xil_printf("Could not create timer\n");
} else {
    xil_printf("Timer created\n");
}

// Start the timer
xTimerStart(xTimer, 0);
```

> [!warning] Build and test your application

</div>

<div class="navigation">
	<button id="prevBtn">Previous</button>
	<div class="step-indicator">
		<span><span id="currentStep">1</span> of <span id="totalSteps">3</span></span>
	</div>
	<button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Exercise 15](chapter-3-exercise-15.md)
