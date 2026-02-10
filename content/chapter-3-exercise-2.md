---
title: "3.2 Exercise 2: Creating Threads (Tasks)"
---

[Back to Chapter 3](chapter-3-freertos.md)

Exercise 2: Creating Threads (Tasks)
The objectives are:
1. Create a basic Application without template.
2. Start Working with FreeRTOS.
Select File->New_Component->Application and name your application as
“freertos_student_test”. Select the platform created on previous exercised as
platform for the application.
<center>Figure 87. Example of application for FreeRTOS exercises.</center>
Use the following example and verify its functionality, call the file
“free_rtos_app.c”. Understand how it works.
// FreeRTOS Application for Xilinx FPGA
#include <FreeRTOS.h>
#include <task.h>
#include <xil_printf.h>
#include <xparameters.h>
// Task function prototypes
void vTask1(void *pvParameters);
void vTask2(void *pvParameters);
int main(void)
{
// Create tasks
xTaskCreate(vTask1, "Task 1", 1000, NULL, 1, NULL);
xTaskCreate(vTask2, "Task 2", 1000, NULL, 2, NULL);
// Start the scheduler
vTaskStartScheduler();
// Should never reach here
for (;;);
@Marcos Martínez Peiró, Feb 25. Pag 66

---

![](img/page_068_img_01.jpeg)

![](img/page_068_img_02.jpeg)


return 0;
}
void vTask1(void *pvParameters)
{
for (;;)
{
xil_printf("Task 1 is running\n");
vTaskDelay(pdMS_TO_TICKS(1000)); // Delay for 1000 ms
}
}
void vTask2(void *pvParameters)
{
for (;;)
{
xil_printf("Task 2 is running\n");
vTaskDelay(pdMS_TO_TICKS(1500)); // Delay for 1500 ms
}
}
1. Create two more tasks task3 and Task4 with the same functionality, check
their operation. Assign priorities 3, 4, 5, and 6 to tasks 1, 2, 3, and 4
respectively. Task3 and Task4 are 1.5sec and 3sec of period respectively.
2. Check their functionality.
3. Modify the period of Task3 and Task4 allowing to shows their message.
4. (*) Modify the Tasks 3 and 4 to create continuous tasks. (they never
suspend).
5. (*) Put all tasks at the same priority. Understand how Time Slicing works in
FreeRTOS. Previously verify that the TimeSlicing option is active in the
FreeRTOSConfig.h file. Modify it in the BSP Settings for FreeRTOS.
@Marcos Martínez Peiró, Feb 25. Pag 67

---

<center>Figure 88. FreeRTOSConfig.h file in the app project, also can be located in the includes folder on BSP folder.</center>
<center>Figure 89. FreeRTOS config in the json file.</center>
6. Turn o(cid:431) TimeSlicing and check that it doesn't work.
7. Reprioritize each task.
@Marcos Martínez Peiró, Feb 25. Pag 68
