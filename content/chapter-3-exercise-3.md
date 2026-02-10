---
title: "3.3 Exercise 3: Parameters and TaskControl: Delete Tasks"
---

[Back to Chapter 3](chapter-3-freertos.md)

Exercise 3: Parameters and TaskControl: Delete Tasks.
Create parameters in previous tasks using parameter passing.
Use a struct and create next parameters:
typedef struct {
const char *taskName;
TickType_t delay;
const char *message;
} TaskParameters;
TaskParameters task1_parameters={"Task 1", 1000, "Task 1 is running\n"};
TaskParameters task2_parameters={"Task 2", 1500, "Task 2 is running\n"};
TaskParameters task3_parameters={"Task 3", 2000, "Task 3 is running\n"};
TaskParameters task4_parameters={"Task 4", 2500, "Task 4 is running\n"};
Add handlers for each task so that they can be used to identify them.
TaskHandle_t xTask1Handle = NULL;
TaskHandle_t xTask2Handle = NULL;
TaskHandle_t xTask3Handle = NULL;
TaskHandle_t xTask4Handle = NULL;
In this way we can pass several parameters
xTaskCreate(vTask1, "Task 1", STACK_SIZE, &task1_parameters, 4, &xTask1Handle);
xTaskCreate(vTask2, "Task 2", STACK_SIZE, &task2_parameters, 5, &xTask2Handle);
xTaskCreate(vTask3, "Task 3", STACK_SIZE, &task3_parameters, 6, &xTask3Handle);
xTaskCreate(vTask4, "Task 4", STACK_SIZE, &task4_parameters, 7, &xTask4Handle);
And use them in every task.
void vTask1(void *pvParameters)
{
TaskParameters *params = (TaskParameters *)pvParameters;
for (;;)
{
xil_printf("%s: %s\n", params->taskName, params->message);
vTaskDelay(params->delay);
}
}
Use it to delete Task 4 from Task 1, when Task1 is run 3 times.
if (xTask4Handle != NULL)
{
vTaskDelete(xTask4Handle);
xil_printf("Task 4 deleted by Task 1\n");
xTask4Handle = NULL;
}
Check your usage on the serial terminal.
Have you been able to delete high-priority tasks from a lower-priority one?
@Marcos Martínez Peiró, Feb 25. Pag 69
