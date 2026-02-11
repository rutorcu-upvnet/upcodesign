---
title: "3.11 Exercise 11: Event Groups or Flags"
---

[Previous: Exercise 10](chapter-3-exercise-10.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Step 1</h2>

Exercise 11. Event Groups or Flags.
This time we create an example of use of Flag Groups in Free RTOS by including some
code lines in the previous ISR semaphore example.
When the user presses all 5 buttons, a message will appear indicating that the event
group has been used. Meanwhile, if all 5 buttons have not been pressed yet, another
message will be displayed.
Step 1. Libraries and types.
#include "event_groups.h"
EventGroupHandle_t xEventGroup;
Step 2. Task StartUp.
Include these extra lines in the task to create the event group.
xEventGroup = xEventGroupCreate();
if (xEventGroup == NULL)
{
xil_printf("Could not create event group\n");
}
else
{
xil_printf("Event group created\n");
}
Step 3. In the ISR handler include next lines.
u32 BTN_Read;
/* Read the GPIO value */
BTN_Read = XGpio_DiscreteRead(&Gpio_btn, BTN_CHANNEL);
//xil_printf("Button pressed from ISR: %d\n", BTN_Read);
xEventGroupSetBitsFromISR(xEventGroup, BTN_Read, &xHigherPriorityTaskWoken);
This read the BTN from GPIO and set the bits corresponding to BTN in the event
group, allowing unblock the high priority task waiting.
@Marcos Martínez Peiró, Feb 25. Pag 90

</div>

<div class="step" data-step="2">
<h2>Step 2</h2>

Step 4. Modify the Semaphore task.
First write the type:
EventBits_t uxBits;
Then, into the while() of the task:
/* Wait until an event is triggered */
uxBits = xEventGroupWaitBits(xEventGroup, 0x1F, // 0x1F = 11111 in binary
pdFALSE, // Bits are not cleared yet
pdFALSE, // We don't need to wait for all the bits to be active
pdMS_TO_TICKS(1000)); // Waiting time
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
That waits for the 5 BTN to be pressed (1F) only 1 second. If no BTN is pressed, we
send a message, if some button is pressed but not all the five another message is
displayed, finally if all the buttons have been pressed the final message is displayed
and the event group is cleared to start the play again.
@Marcos Martínez Peiró, Feb 25. Pag 91

</div>

<div class="navigation">
	<button id="prevBtn">Previous</button>
	<div class="step-indicator">
		<span><span id="currentStep">1</span> of <span id="totalSteps">2</span></span>
	</div>
	<button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Exercise 12](chapter-3-exercise-12.md)
