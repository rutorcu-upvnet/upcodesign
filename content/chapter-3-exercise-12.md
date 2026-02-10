---
title: "3.12 Exercise 12: Software Timers"
---

[Back to Chapter 3](chapter-3-freertos.md)

Exercise 12. Software Timers
This time a software timer will be created to add functionality to the previous
example.
A FreeRTOS software timer is created to toggle on the led 0 every second.
To add some fun functionality the BTN control the timer:
a) BTN 1 (UP) Toggle every 2 sec.
b) BTN 2 (RIGHT) Restart Timer running at 1 sec.
c) BTN 4 (LEFT) Stop the timer and switch o(cid:431) the led.
d) BTN 8 (DOWN) Toggle every 0,5 sec.
e) BTN 16 (CENTER) Toggle every 1 sec.
Step 1. Definitions, types and macros.
#include "timers.h"
TimerHandle_t xLedTimer;
// Timer callback function
void vLedTimerCallback(TimerHandle_t xTimer);
// Máscaras para cada botón
#define BUTTON_1 (1 << 0) // Ilumina cada 2s
#define BUTTON_2 (1 << 1) // Reinicia el timer
#define BUTTON_4 (1 << 2) // Detiene el timer
#define BUTTON_8 (1 << 3) // Ilumina cada 0.5s
#define BUTTON_16 (1 << 4) // Ilumina cada 1s
// GPIO para LED
#define LED_0_MASK (1 << 0)
Step 2. Task Start Up.
Include the code to create the software timer.
xLedTimer = xTimerCreate("LedTimer", pdMS_TO_TICKS(1000), // 1s
pdTRUE, // Auto-reload
NULL, // Timer ID
vLedTimerCallback); // Callback function
if (xLedTimer == NULL)
{
xil_printf("Could not create timer\n");
}
else
{
@Marcos Martínez Peiró, Feb 25. Pag 92

---

xil_printf("Timer created\n");
}
Step 3. ISR Modification.
In the ISR GPIO code add next lines.
// Configurar el tiempo del Timer según el botón presionado
if (BTN_Read & BUTTON_16) {
xTimerChangePeriodFromISR(xLedTimer, pdMS_TO_TICKS(1000),
&xHigherPriorityTaskWoken);
}
else if (BTN_Read & BUTTON_1) {
xTimerChangePeriodFromISR(xLedTimer, pdMS_TO_TICKS(2000),
&xHigherPriorityTaskWoken);
}
else if (BTN_Read & BUTTON_8) {
xTimerChangePeriodFromISR(xLedTimer, pdMS_TO_TICKS(500),
&xHigherPriorityTaskWoken);
}
else if (BTN_Read & BUTTON_4) {
xTimerStopFromISR(xLedTimer, &xHigherPriorityTaskWoken);
XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, 0); // Apagar LED
}
else if (BTN_Read & BUTTON_2) {
xTimerStartFromISR(xLedTimer, &xHigherPriorityTaskWoken);
}
Step 4. Software Timer Callback function.
The callback function that toggles the led 0 every time the timer ends.
// Callback del Timer
void vLedTimerCallback(TimerHandle_t xTimer) {
static uint8_t ledState = 0;
// Leer estado actual del LED y hacer toggle
ledState = XGpio_DiscreteRead(&Gpio_sw_led, LED_CHANNEL);
xil_printf("LED state: %d\n", ledState);
ledState ^= LED_0_MASK; // Invertir el bit del LED0
XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, ledState);
xil_printf("Timer callback\n");
}
@Marcos Martínez Peiró, Feb 25. Pag 93
