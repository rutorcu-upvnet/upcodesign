---
title: "3.14 Exercise 14: Task Notifications"
---

[Back to Chapter 3](chapter-3-freertos.md)

Exercise 14. Task Notifications
A direct to task notification is an event sent directly to a task, rather than indirectly
to a task via an intermediary object such as a queue, event group or semaphore.
Sending a direct to task notification to a task sets the state of the target task
notification to ‘pending’. Just as a task can block on an intermediary object such as
a semaphore to wait for that semaphore to be available, a task can block on a task
notification to wait for that notification’s state to become pending.
As example we will create a timer that send notification to a task every second.
Step 1. Libraries and timer callback function
#include "timers.h"
// Definir el identificador de la tarea
TaskHandle_t xWorkerTaskHandle = NULL;
// Función del temporizador
void vTimerCallback(TimerHandle_t xTimer) {
// Notificar a la tarea WorkerTask
xTaskNotifyGive(xWorkerTaskHandle);
}
void WorkerTask(void *pvParameters) {
while (1) {
// Esperar notificación (bloqueo hasta que llegue)
ulTaskNotifyTake(pdTRUE, portMAX_DELAY);
// Acción al recibir la notificación
xil_printf("WorkerTask: Notificación recibida, ejecutando tarea...\n");
}
}
@Marcos Martínez Peiró, Feb 25. Pag 94

---

Step 2. StartUp Task.
Include next code in the startup task and check the result on terminal.
//Create the WorkerTask
xTaskCreate(WorkerTask, "WorkerTask", configMINIMAL_STACK_SIZE, NULL, 1,
&xWorkerTaskHandle);
// Create the timer
xTimerHandle xTimer = xTimerCreate("Timer", pdMS_TO_TICKS(1000), pdTRUE, NULL,
vTimerCallback);
if (xTimer == NULL)
{
xil_printf("Could not create timer\n");
}
else
{
xil_printf("Timer created\n");
}
// Start the timer
xTimerStart(xTimer, 0);
@Marcos Martínez Peiró, Feb 25. Pag 95
