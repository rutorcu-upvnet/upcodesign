---
title: "3.11 Exercise 11: Event Groups or Flags"
---

[Previous: Exercise 10](chapter-3-exercise-10.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Event Groups: Setup and ISR</h2>

> [!note] Objectives
>
> Use Event Groups (Flags) in `Free RTOS` to synchronize button presses<br>
> Set event bits from an ISR using `xEventGroupSetBitsFromISR()`<br>
> Wait for multiple events using `xEventGroupWaitBits()`<br>

This time we create an example of use of Flag Groups in `Free RTOS` by including some code lines in the previous ISR semaphore example.

When the user presses all 5 buttons, a message will appear indicating that the event group has been used. Meanwhile, if all 5 buttons have not been pressed yet, another message will be displayed.

</div>

<div class="step" data-step="2">
<h2>Libraries and types</h2>

Include the library and type:

```c
#include "event_groups.h"
EventGroupHandle_t xEventGroup;
```

In `vTaskStartUp`, include these extra lines to create the event group:
```c
xEventGroup = xEventGroupCreate();
if (xEventGroup == NULL)
{
    xil_printf("Could not create event group\n");
}
else
{
    xil_printf("Event group created\n");
}
```

In the ISR handler (`GpioHandler`), include the following lines:

```c
u32 BTN_Read;

/* Read the GPIO value */
BTN_Read = XGpio_DiscreteRead(&Gpio_btn, BTN_CHANNEL);
xEventGroupSetBitsFromISR(xEventGroup, BTN_Read, &xHigherPriorityTaskWoken);
```

> [!info] This reads the BTN from GPIO and sets the bits corresponding to the pressed BTN in the event group, allowing the blocked high priority task to unblock.

</div>
<div class="step" data-step="3">
<h2>Modify the Semaphore Task</h2>

First declare the type:

```c
EventBits_t uxBits;
```

Then, into the `while()` of the task:

```c
/* Wait until an event is triggered */
uxBits = xEventGroupWaitBits(xEventGroup,
    0x1F,                  // 0x1F = 11111 in binary
    pdFALSE,               // Bits are not cleared yet
    pdFALSE,               // We don't need to wait for all the bits to be active
    pdMS_TO_TICKS(1000));  // Waiting time

// If no bit was activated in 1s, display message
if (uxBits == 0) {
    xil_printf("Pulsa algo baby!\n");
}

if ((uxBits & 0x1F) != 0 && (uxBits & 0x1F) != 0x1F) {
    xil_printf("Estas pulsando botoncitos...que lo sé\n");
}
// If all buttons were pressed, display message and delete flags
else if ((uxBits & 0x1F) == 0x1F) {
    xil_printf("Ya estamos Ready\n");
    xEventGroupClearBits(xEventGroup, 0x1F);
}
```

> [!info] This waits for the 5 BTN to be pressed (`0x1F`) with a timeout of 1 second. If no BTN is pressed, a message is sent. If some buttons are pressed but not all five, another message is displayed. Finally, if all buttons have been pressed, the final message is displayed and the event group is cleared to start again.

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

[Next: Exercise 12](chapter-3-exercise-12.md)
