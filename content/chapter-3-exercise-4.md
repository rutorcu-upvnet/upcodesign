---
title: "3.4 Exercise 4: Use of LEDS. Duration of Tasks"
---

[Previous: Exercise 3](chapter-3-exercise-3.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Use of LEDs and Duration of Tasks</h2>

> [!note] Objectives
>
> Control LEDs from `Free RTOS` tasks using `XGpio` drivers<br>
> Initialize peripherals safely using a startup task<br>
> Measure task execution duration using `xTaskGetTickCount()`<br>

- Light `on` LED *i* when `Task*i*` starts
- Turn `off` LED *i* when task finishes execution, before `vTaskDelay()`
- Use following code as example, in `Task2`

```c
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
```

> [!question] What does the flashing of the LEDs indicate?

</div>
<div class="step" data-step="2">
<h2>Xilinx drivers in Free RTOS</h2>

> [!warning] Xilinx peripheral functions may not work in `main()`

> [!note] In `Free RTOS`, certain Xilinx features, especially those related to hardware and peripheral drivers (such as `XUartPs_Send`, `XGpio_DiscreteWrite`, `XScuGic_Connect`, etc.), may not work properly within `main()` due to several reasons

- There is no scheduler running, `main()` runs before the scheduler (`vTaskStartScheduler()`) starts. Some Xilinx functions may depend on interrupts or the state of the operating system to run properly. When you call these functions within `main()`, there is still no proper task context, which can cause them to fail
- There is no task context, each task has its own stack and execution context. Some Xilinx functions may need access to context variables that are not available if called from `main()` before the scheduler starts
- Interrupts may not be enabled, some features of Xilinx controllers require interrupts to be turned on. If you call them in `main()` before `Free RTOS` enables interrupts, they may not run correctly
- System initializer conflicts, `main()` can run in a state where certain peripherals are not yet fully initialized. Instead, when used within a task, the hardware is already configured correctly

</div>
<div class="step" data-step="3">
<h2>Startup Task</h2>

> [!error] If you need to call these functions, do so within a task

```c
void myTask(void *pvParameters) {
	// Initialize hardware if necessary
	XGpio gpio;
	XGpio_Initialize(&gpio, XPAR_AXI_GPIO_0_DEVICE_ID);
	while (1) {
		XGpio_DiscreteWrite(&gpio, 1, 0x01);
		vTaskDelay(pdMS_TO_TICKS(1000)); // Wait 1 second
	}
}
```

- Create a `vTaskStartUp` task, with priority `configMAX_PRIORITIES`, that initializes the GPIO peripherals and then commits suicide with `vTaskDelete(NULL)`. It will not have a loop, it only executes the initialization of the peripherals
- Create it before any other task

> [!info] Remember to include the GPIO driver and define the channels

```c
#include "xgpio.h"

XGpio Gpio_sw_led; /* The Instance of the GPIO Driver */
#define SW_CHANNEL 1
#define LED_CHANNEL 2
```

</div>
<div class="step" data-step="4">
<h2>Start Up task</h2>

- Example of `vTaskStartUp` code:

```c
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
	XGpio_SetDataDirection(&Gpio_sw_led, SW_CHANNEL, 0x0000FFFF);
	XGpio_SetDataDirection(&Gpio_sw_led, LED_CHANNEL, 0x00000000);

	vTaskDelete(NULL); // Delete the task StartUp
}
```

</div>
<div class="step" data-step="5">
<h2>Measuring task duration</h2>

- To know the duration of the tasks we can estimate it by using the `xTaskGetTickCount()` function

- Use it to measure the duration of task 2, for example, by subtracting the tick values before and after the call to `xil_printf()`

```c
TickType_t start = xTaskGetTickCount();
xil_printf("%s: %s\n", params->taskName, params->message);
TickType_t end = xTaskGetTickCount();
xil_printf("Duration: %d ticks\n", end - start);
```

> [!question] What value in ticks lasted `xil_printf()`?

</div>

<div class="navigation">
	<button id="prevBtn">Previous</button>
	<div class="step-indicator">
		<span><span id="currentStep">1</span> of <span id="totalSteps">4</span></span>
	</div>
	<button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Exercise 5](chapter-3-exercise-5.md)
