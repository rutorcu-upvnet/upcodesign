---
title: "3.12 Exercise 12: Software Timers"
---

[Previous: Exercise 11](chapter-3-exercise-11.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Software Timers</h2>

> [!note] Objectives
>
> Create and use software timers in `FreeRTOS`<br>
> Control timer period and state from an ISR<br>
> Implement a LED toggle callback using `xTimerCreate()`<br>

A `FreeRTOS` software timer is created to toggle LED 0 every second. The BTN controls the timer:
- BTN 1 (CENTER) Toggle every 2 sec
- BTN 2 (DOWN) Restart Timer running at 1 sec
- BTN 4 (LEFT) Stop the timer and switch off the LED
- BTN 8 (RIGHT) Toggle every 0.5 sec
- BTN 16 (UP) Toggle every 1 sec

</div>
<div class="step" data-step="2">
<h2>Definitions and types</h2>

Definitions, types and macros:

```c
#include "timers.h"
TimerHandle_t xLedTimer;

// Timer callback function
void vLedTimerCallback(TimerHandle_t xTimer);

// Button masks
#define BUTTON_1  (1 << 0)  // Toggle every 2s
#define BUTTON_2  (1 << 1)  // Restart timer
#define BUTTON_4  (1 << 2)  // Stop timer
#define BUTTON_8  (1 << 3)  // Toggle every 0.5s
#define BUTTON_16 (1 << 4)  // Toggle every 1s

// GPIO for LED
#define LED_0_MASK (1 << 0)
```

</div>
<div class="step" data-step="3">
<h2>Start up task</h2>

In `vTaskStartUp`, include the code to create the software timer:

```c
xLedTimer = xTimerCreate("LedTimer",
    pdMS_TO_TICKS(1000),   // 1s
    pdTRUE,                // Auto-reload
    NULL,                  // Timer ID
    vLedTimerCallback);    // Callback function

if (xLedTimer == NULL)
{
    xil_printf("Could not create timer\n");
}
else
{
    xil_printf("Timer created\n");
}
```

</div>
<div class="step" data-step="4">
<h2>ISR Modification and Callback</h2>

In the ISR GPIO code (`GpioHandler`), add the following lines to control the timer from buttons:

```c
// Configure timer period based on the pressed button
if (BTN_Read & BUTTON_16) {
    xTimerChangePeriodFromISR(xLedTimer, pdMS_TO_TICKS(1000), &xHigherPriorityTaskWoken);
}
else if (BTN_Read & BUTTON_1) {
    xTimerChangePeriodFromISR(xLedTimer, pdMS_TO_TICKS(2000), &xHigherPriorityTaskWoken);
}
else if (BTN_Read & BUTTON_8) {
    xTimerChangePeriodFromISR(xLedTimer, pdMS_TO_TICKS(500), &xHigherPriorityTaskWoken);
}
else if (BTN_Read & BUTTON_4) {
    xTimerStopFromISR(xLedTimer, &xHigherPriorityTaskWoken);
    XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, 0); // Turn off LED
}
else if (BTN_Read & BUTTON_2) {
    xTimerStartFromISR(xLedTimer, &xHigherPriorityTaskWoken);
}
```

- Software Timer Callback function that toggles LED 0 every time the timer expires:

```c
void vLedTimerCallback(TimerHandle_t xTimer) {
    static uint8_t ledState = 0;

    // Read current LED state and toggle
    ledState = XGpio_DiscreteRead(&Gpio_sw_led, LED_CHANNEL);
    xil_printf("LED state: %d\n", ledState);
    ledState ^= LED_0_MASK; // Invert LED0 bit
    XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, ledState);
    xil_printf("Timer callback\n");
}
```

> [!warning] Build and test your application

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

[Next: Exercise 13](chapter-3-exercise-13.md)
