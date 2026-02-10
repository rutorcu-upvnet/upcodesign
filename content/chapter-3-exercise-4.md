---
title: "3.4 Exercise 4: Use of LEDS. Duration of Tasks"
---

[Back to Chapter 3](chapter-3-freertos.md)

Exercise 4: Use of LEDS. Duration of Tasks.
Light ON a LED when task i starts, turn o(cid:431) LED i when task finishes execution
(before vTaskDelay()).
For example, in Task2:
void vTask2(void *pvParameters)
{
TaskParameters *params = (TaskParameters *)pvParameters;
for (;;)
{
XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, 0x00000002);
xil_printf("%s: %s\n", params->taskName, params->message);
XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, 0x00000000);
vTaskDelay(params->delay);
}
}
What does the flashing of the LEDs indicate?
NOTE:
In FreeRTOS, certain Xilinx features, especially those related to hardware and peripheral
drivers (such as XUartPs_Send, XGpio_DiscreteWrite, XScuGic_Connect, etc.), may not
work properly within main() due to several reasons:
1. There is not a scheduler.
In FreeRTOS, main() runs before the scheduler (vTaskStartScheduler()) starts.
Some Xilinx functions may depend on interrupts or the state of the operating
system to run properly.
When you call these functions within main(), there is still no proper task context,
which can cause them to fail.
2. No task context
In FreeRTOS, each task has its own stack and execution context. Some Xilinx
functions may need access to context variables that are not available if called
from main(), before the scheduler starts.
3. Interrupts may not be enabled
Some features of Xilinx controllers require interrupts to be turned on. If you call
them on main() before FreeRTOS enables interrupts, they may not run correctly.
4. System Initializer Conflicts
main() can run in a state where certain peripherals are not yet fully initialized.
Instead, when used within a task, the hardware is already configured correctly.
@Marcos Martínez Peiró, Feb 25. Pag 70

---

How to fix the problem?
If you need to call these functions, do so within a task. For example:
void myTask(void *pvParameters) {
//Initialize hardware if necessary
XGpio gpio;
XGpio_Initialize(&gpio, XPAR_AXI_GPIO_0_DEVICE_ID);
while (1) {
XGpio_DiscreteWrite(&gpio, 1, 0x01);
vTaskDelay(pdMS_TO_TICKS(1000)); // Wait 1 second
}
}
In our case, create a vTaskStartUp task, with priority configMAX_PRIORITIES, , that
initializes the GPIO peripherals and then commits suicide with vTaskDelete(NULL),
it will not have a loop but only executes the initialization of the peripherals. Create it
before any other.
To know the duration of the tasks we can estimate it by using the
xTaskGetTickCount() function. Use it to measure the duration of task 2, for example,
by subtracting the tick values before and after the call to printf().
What value in ticks lasted printf()?
Example of TaskStart code:
void vTaskStartUp(void *pvParameters)
{
TaskParameters *params = (TaskParameters *)pvParameters;
xil_printf("%s: %s\n", params->taskName, params->message);
int Status;
Status = XGpio_Initialize(&Gpio_sw_led, XPAR_AXI_GPIO_0_BASEADDR);
if (Status != XST_SUCCESS) {
xil_printf("Gpio Initialization Failed\r\n");
return XST_FAILURE;
}
XGpio_SetDataDirection(&Gpio_sw_led,SW_CHANNEL,0x0000FFFF);
XGpio_SetDataDirection(&Gpio_sw_led,LED_CHANNEL,0x00000000);
vTaskDelete(NULL); // Delete the task StartUp
}
Remember to use
#include "xgpio.h"
XGpio Gpio_sw_led; /* The Instance of the GPIO Driver */
#define SW_CHANNEL 1
#define LED_CHANNEL 2
@Marcos Martínez Peiró, Feb 25. Pag 71
