---
title: "3.5 Exercise 5: TaskControl I: Using xTaskDelayUntil()"
---

[Back to Chapter 3](chapter-3-freertos.md)

Exercise 5. TaskControl I: Using xTaskDelayUntil().
xTaskDelayUntil()
Delay a task until a specified time. This function can be used by periodic tasks to
ensure a constant execution frequency.
This function di(cid:431)ers from vTaskDelay() in one important aspect: vTaskDelay()
specifies a time at which the task wishes to unblock relative to the time at which
vTaskDelay() is called, whereas vTaskDelayUntil() specifies an absolute time at
which the task wishes to unblock.
Example
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
Modify the delay of Task 3 to make it accurate by using TaskDelayUntil().
@Marcos Martínez Peiró, Feb 25. Pag 72
