---
title: "3.10 Exercise 10: Semaphores from ISR and Mutexes"
---

[Back to Chapter 3](chapter-3-freertos.md)

![](img/page_084_img_01.jpeg)

Exercise 10. Semaphores from ISR and Mutexes.
In this exercise we are going to use a Semaphore shared between an ISR and a task.
 The task reads the value of the button (BTN).
 The ISR runs when a BTN is pressed.
 The Task tries to take a binary semaphore. If it does not get the semaphore,
it is blocked without being able to read the BTN value.
 The ISR returns the semaphore, enabling the Task to display the pressed
BTN code.
No example of mutex is made, although they are simple to implement seeing the
use of binary semaphores.
Give an example of using MUTEX.
Step 1. Comment the previous created tasks or exercises.
As alternative you can create a new application on the same Platform.
Step 2. Include libraries.
To manage the interruptions from interrupt controller and Microblaze processor you
must add new libraries. Also, the semaphore needs their own libraries in FreeRTOS.
#include "xil_exception.h"
#include "xinterrupt_wrap.h"
#include "semphr.h"
#include "portmacro.h"
Don’t forget maintaining previous created libraries:
#include <FreeRTOS.h>
#include <task.h>
#include <xil_printf.h>
#include <xparameters.h>
#include "platform.h"
#include "queue.h"
@Marcos Martínez Peiró, Feb 25. Pag 83

---

![](img/page_085_img_01.jpeg)

![](img/page_085_img_02.jpeg)


Step 3. Definitions, types and prototype functions.
To create the ISR and semaphore example you create next code.
#define SEMAPHORE_COUNT 1
SemaphoreHandle_t xCountingSemaphore;
#define BUTTON_INTERRUPT XGPIO_IR_CH1_MASK /* Channel 1 Interrupt Mask is for BTN and
SW */
/* The following constant determines which buttons must be pressed at the same time
to cause interrupt processing to stop and start */
#define XGPIO_AXI_BASEADDRESS XPAR_XGPIO_1_BASEADDR
#define BTN_CHANNEL 1
/* Preventing pushbutton bouncing*/
TickType_t xLastISRTime, xISRTime;
/*********** Function Prototypes ******************************/
void GpioHandler(void *CallBackRef);
int GpioIntrExample(XGpio *InstancePtr,
UINTPTR BaseAddress,
u16 IntrMask, u32 *DataRead);
XGpio_Config *ConfigPtr;
XGpio Gpio_btn; /*The instance of the GPIO Driver for key buttons */
XGPIO_IR_CH1_MASK is the macro with value
#define XPAR_XGPIO_1_BASEADDR 0x40010000
Located in the file xparameters.h that represents the memory map of our hardware
architecture.
@Marcos Martínez Peiró, Feb 25. Pag 84

---

BTN_CHANNEL is the channel associated with GPIO AXI module.
Step 4. Task parameters and prototype function.
Then the parameters and prototype function for the task that will wait for the
semaphore.
void vTaskSemaphore(void *pvParameters);
TaskParameters_t taskSemParams = {"Task Sem", pdMS_TO_TICKS(1000), "Task Sem is
running"};
TaskHandle_t xTaskSemHandle = NULL;
Step 5. StartUp task.
On the StartUp task we include next code.
/* gpio btn initialization*/
Status = XGpio_Initialize(&Gpio_btn, XPAR_AXI_GPIO_1_BASEADDR);
if (Status != XST_SUCCESS) {
xil_printf("Gpio Initialization Failed\r\n");
return XST_FAILURE;
}
/* BTN are inputs, there are 5 buttons */
XGpio_SetDataDirection(&Gpio_btn,BTN_CHANNEL,0x1F);
/* Register the interrupt handler */
XGpio_InterruptEnable(&Gpio_btn, BUTTON_INTERRUPT);
@Marcos Martínez Peiró, Feb 25. Pag 85

---

XGpio_InterruptGlobalEnable(&Gpio_btn);
/*Initialize interrupts from BTN*/
ConfigPtr = XGpio_LookupConfig(XGPIO_AXI_BASEADDRESS);
if (ConfigPtr == NULL) {
return XST_FAILURE;
}
Status = XSetupInterruptSystem(&Gpio_btn, &GpioHandler, ConfigPtr->IntrId,
ConfigPtr->IntrParent, XINTERRUPT_DEFAULT_PRIORITY);
if (Status != XST_SUCCESS) {
return XST_FAILURE;
}
u32 Register;
Register = XGpio_ReadReg(Gpio_btn.BaseAddress, XGPIO_IER_OFFSET);
XGpio_WriteReg(Gpio_btn.BaseAddress, XGPIO_IER_OFFSET,Register | BTN_CHANNEL);
XGpio_WriteReg(Gpio_btn.BaseAddress,
XGPIO_GIE_OFFSET,XGPIO_GIE_GINTR_ENABLE_MASK);
if (Status != XST_SUCCESS) {
return XST_FAILURE;
}
/* Enable MicroBlaze global interruptions*/
Xil_ExceptionEnable();
xLastISRTime = 0;
xISRTime = 0;
/* Initialize semaphore */
xCountingSemaphore = xSemaphoreCreateCounting(SEMAPHORE_COUNT, 0);
if (xCountingSemaphore != NULL)
{
xTaskCreate(vTaskSemaphore, "Task 1", 1024, &taskSemParams, 1,
&xTaskSemHandle);
}
else
{
xil_printf("Could not create semaphore\n");
}
The previous code represents:
a) Initialization of BTN (XGpio_Initialize) that connects the Gpio_btn
with the memory address of the AXI GPIO.
b) The direction of the 5 BTN (0x1F) as inputs by using
xGpio_SetDataDirection().
@Marcos Martínez Peiró, Feb 25. Pag 86

---

c) Enable the BTN GPIO as hardware interruptions for the overall
system. XGpio_InterruptEnable() and XGpio_GlobalEnable().
d) Initialization of interruptions from BTN: XGpio_LookupConfig() and
XSetUpInterruptSystem().
e) Enabling the interruptions of BTN by writing corresponding bits on
the GPIO Interrupt Enable Register (IER register) and the GPIO Global
Interrupt Enable Register (GIE register).
f) Enabling Microblaze Global Interruptions. Xil_ExceptionEnable().
Enable the Microblaze exception system. It must be called after all
the interruptions have been enabled.
g) Creation of Semaphore called xCountingSemaphore with value 1 so
when some task or ISR take it the value goes to 0, when release it the
value returns to 1.
Step 6. Create the GPIO handler routine for the interruption.
Create the code at the end of the entire project. It represents the ISR routine for the
GPIO.
/******************************************************************************/
/**
*
* This is the interrupt handler routine for the GPIO for this example.
*
* @param CallbackRef is the Callback reference for the handler.
*
* @return None.
*
* @note None.
*
******************************************************************************/
void GpioHandler(void *CallbackRef)
{
XGpio *GpioPtr = (XGpio *)CallbackRef;
BaseType_t xHigherPriorityTaskWoken = pdFALSE;
/* Disable the interrupt */
XGpio_InterruptDisable(&Gpio_btn, BUTTON_INTERRUPT);
/* Pushbutton debouncing*/
// Initialise the xLastWakeTime variable with the current time.
xISRTime = xTaskGetTickCountFromISR();
//xil_printf("Current tick in ISR: %d\n", xISRTime);
//xil_printf("Previous tick in ISR: %d\n", xLastISRTime);
@Marcos Martínez Peiró, Feb 25. Pag 87

---

/* Clear the Interrupt */
u32 Register;
Register = XGpio_ReadReg(Gpio_btn.BaseAddress, XGPIO_ISR_OFFSET);
XGpio_WriteReg(Gpio_btn.BaseAddress, XGPIO_ISR_OFFSET,Register &
BUTTON_INTERRUPT);
Register = XGpio_ReadReg(Gpio_btn.BaseAddress, XGPIO_ISR_OFFSET);
/* Clear the interrupt*/
XGpio_InterruptClear(&Gpio_btn, BUTTON_INTERRUPT);
/* Enable the interrupt */
XGpio_InterruptEnable(&Gpio_btn, BUTTON_INTERRUPT);
if (xISRTime - xLastISRTime > 20){/* Pushbutton debouncing*/
/* return the semaphore*/
Performs a context switch by setting the xHigherPriorityTaskWoken
variable to TRUE and passes the CPU to the highest priority task on standby
xSemaphoreGiveFromISR(xCountingSemaphore, &xHigherPriorityTaskWoken);
}
/* If a higher-priority task was waiting, make a context switch */
if (xHigherPriorityTaskWoken == pdTRUE)
{
portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
}
xLastISRTime = xTaskGetTickCountFromISR();
return;
}
Explanation of the previous code.
1. An ISR first disable the interruption, second clear the interruption,
third process the interruption and finally enable the interruption
again.
2. The process of the interruption gives the semaphore and activates
the variable xHigherPriorityTaskWoken (pdTRUE). Also contains a
debouncing protection for the BTNs of the Genesys2 board. By test
the value has been selected as 20 ticks.
3. Switch Context. Activation of the blocked task with higher priority.
@Marcos Martínez Peiró, Feb 25. Pag 88

---

Step 7. Creation of the Task that waits for the semaphore.
The code of the task is:
/* Task waiting for the semaphore and printing the button pressed */
void vTaskSemaphore(void *pvParameters)
{
u32 btn_value;
TaskParameters *params = (TaskParameters *)pvParameters;
while (1)
{
xil_printf("%s: %s\n", params->taskName, params->message);
/* Wait until the semaphore is released by the ISR */
if (xSemaphoreTake(xCountingSemaphore, portMAX_DELAY) == pdTRUE)
{
/* Read the GPIO value */
btn_value = XGpio_DiscreteRead(&Gpio_btn, BTN_CHANNEL);
/* Print the pressed button */
xil_printf("Botón presionado desde task: %d\n", btn_value);
}
}
}
When the task takes the semaphore then prints out the value of the BTN pressed. As
the interruption is faster than our finger push and release, the BTN could be read in
the task better than the ISR.
@Marcos Martínez Peiró, Feb 25. Pag 89
