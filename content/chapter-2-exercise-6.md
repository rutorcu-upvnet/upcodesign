---
title: "2.6 Exercise 6: Managing the AXI Timer (Interrupts)"
---

[Previous: Exercise 5](chapter-2-exercise-5.md)

<script src="./static/step-navigation.js"></script>

<style>
.step-container {
  max-width: 800px;
  margin: 2rem auto;
}

.step {
  display: none;
  padding: 2rem;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  background-color: var(--light);
}

.step.active {
  display: block;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.step h2 {
  margin-top: 0;
  color: var(--secondary);
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

button {
  padding: 0.7rem 1.5rem;
  background-color: var(--secondary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: var(--tertiary);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.step-indicator {
  text-align: center;
  font-weight: bold;
  color: var(--darkgray);
}

.objectives {
  background-color: var(--highlight);
  padding: 1rem;
  border-left: 4px solid var(--secondary);
  margin-bottom: 1.5rem;
  border-radius: 4px;
}

.objectives h3 {
  margin-top: 0;
}

.objectives ul {
  margin-bottom: 0;
}
</style>

<div class="step-container">
<div class="step active" data-step="1">
<h2>Overview: Timer Interrupts</h2>

> ### Objectives
>
> Configure AXI Timer for interrupt-driven operation<br>
> Implement a timer interrupt service routine (ISR)<br>
> Generate periodic interrupts for precise timing events<br>

In contrast to polling mode (Exercise 5), interrupt mode allows the timer to automatically generate interrupts when it reaches a compare value. This is more efficient and precise for time-critical applications.

**Timer Interrupt Features:**
- Compare mode: Interrupt when counter reaches compare value
- Capture mode: Latch counter value on external input
- PWM operation: Pulse width modulation support
- Cascade operation: Combine counters for 64-bit timing

The timer can count up or down and supports autoreload for periodic interrupts.

</div>
<div class="step" data-step="2">
<h2>Include Libraries</h2>

Include interrupt and exception handling libraries:

```c
#include "xil_printf.h"       // xil_printf
#include "sleep.h"            // usleep
#include "xgpio.h"            // XGpio
#include "xil_types.h"        // u16, u32
#include "xparameters.h"      // Hardware definitions
#include "xstatus.h"          // XST_SUCCESS
#include "xil_exception.h"    // Xil_ExceptionEnable
#include "xinterrupt_wrap.h"  // XIntc_Initialize
#include "xtmrctr.h"          // XTmrCtr (Timer Counter)
```

These libraries provide:
- `xtmrctr.h`: Timer functions including `XTmrCtr_InterruptHandler`
- `xil_exception.h`: Exception system configuration
- `xinterrupt_wrap.h`: Interrupt controller wrapper functions

</div>
<div class="step" data-step="3">
<h2>Define Constants and ISR Handler</h2>

Define timer constants and create a global ISR flag:

```c
#define XTMRCTR_BASEADDRESS XPAR_XTMRCTR_1_BASEADDR
#define TIMER_COUNTER_0 0
#define TIMER_COUNTER_1 1
#define TIMER_COUNTER_VALUE 0xFFFFFFFF

/* Global variables */
XTmrCtr TimerCounter;
XGpio Gpio_sw_led;
volatile int TimerInterruptFlag = 0;  // Set by ISR
static int InterruptCount = 0;        // Count interrupts

#define SW_CHANNEL 1
#define LED_CHANNEL 2
```

> [!info] Volatile Flag
>
> The `volatile` keyword prevents the compiler from optimizing away the flag check
> since it can change asynchronously in the ISR

</div>
<div class="step" data-step="4">
<h2>Create Timer Interrupt Handler</h2>

Define the ISR function that executes when timer interrupt occurs:

```c
void TimerInterruptHandler(void *CallBackRef)
{
    XTmrCtr *InstancePtr = (XTmrCtr *)CallBackRef;
    
    /* Check if Timer Counter 0 generated the interrupt */
    if (XTmrCtr_IsExpired(InstancePtr, TIMER_COUNTER_0)) {
        /* Toggle LEDs */
        static u8 LedState = 0;
        XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, LedState);
        LedState = (LedState == 0xFF) ? 0x00 : 0xFF;
        
        /* Increment counter */
        InterruptCount++;
        
        /* Print interrupt information */
        xil_printf("Timer Interrupt %d occurred\r\n", InterruptCount);
        
        /* Set flag */
        TimerInterruptFlag = 1;
    }
}
```

> [!warning] ISR Guidelines
>
> - Keep ISR code short and fast
> - Use `volatile` variables for ISR communication
> - Call `XTmrCtr_IsExpired()` to check which counter triggered
> - Avoid expensive operations like `xil_printf` in production code

</div>
<div class="step" data-step="5">
<h2>Initialize Interrupt System and Timer</h2>

Configure the interrupt controller and timer in `main()`:

```c
int Status;

/* Initialize GPIO */
Status = XGpio_Initialize(&Gpio_sw_led, XPAR_AXI_GPIO_0_BASEADDR);
if (Status != XST_SUCCESS) {
    xil_printf("GPIO Init Failed\r\n");
    return XST_FAILURE;
}
XGpio_SetDataDirection(&Gpio_sw_led, SW_CHANNEL, 0x0000FFFF);
XGpio_SetDataDirection(&Gpio_sw_led, LED_CHANNEL, 0x00);

/* Initialize Timer Counter */
Status = XTmrCtr_Initialize(&TimerCounter, XTMRCTR_BASEADDRESS);
if (Status != XST_SUCCESS) {
    xil_printf("Timer Init Failed\r\n");
    return XST_FAILURE;
}

/* Perform timer self-test */
Status = XTmrCtr_SelfTest(&TimerCounter, TIMER_COUNTER_0);
if (Status != XST_SUCCESS) {
    xil_printf("Timer Self-Test Failed\r\n");
    return XST_FAILURE;
}

xil_printf("Timer Initialized Successfully\r\n");
```

</div>
<div class="step" data-step="6">
<h2>Configure Timer for Interrupt Mode</h2>

Set timer options for automatic interrupts and connect the ISR:

```c
u8 TmrCtrNumber = TIMER_COUNTER_0;

/* Set timer initial value */
XTmrCtr_SetResetValue(&TimerCounter, TmrCtrNumber, TIMER_COUNTER_VALUE);

/* Enable autoreload, down-count, and interrupt options */
XTmrCtr_SetOptions(&TimerCounter, TmrCtrNumber,
    XTC_AUTO_RELOAD_OPTION |    /* Auto-reload when counter expires */
    XTC_DOWN_COUNT_OPTION |     /* Count down */
    XTC_INT_MODE_OPTION);       /* Enable interrupt mode */

/* Connect the interrupt handler to the timer */
XTmrCtr_SetHandler(&TimerCounter, TimerInterruptHandler, &TimerCounter);

/* Enable interrupts in the exception system */
Xil_ExceptionEnable();

/* Start the timer */
XTmrCtr_Start(&TimerCounter, TmrCtrNumber);

xil_printf("Timer configured for interrupt mode\r\n");
```

> [!info] Autoreload Mode
>
> - With autoreload enabled, the counter resets to the initial value automatically
> - This creates periodic interrupts at regular intervals
> - Interrupt frequency depends on the counter reset value and system clock

</div>
<div class="step" data-step="7">
<h2>Main Loop Processing</h2>

In the main loop, check the interrupt flag and perform actions:

```c
while(1) {
    /* Wait for interrupt */
    if (TimerInterruptFlag) {
        /* Process interrupt */
        xil_printf("Processing interrupt %d\r\n", InterruptCount);
        
        /* Read GPIO switches */
        u32 SwitchValue = XGpio_DiscreteRead(&Gpio_sw_led, SW_CHANNEL);
        xil_printf("Switch value: 0x%lX\r\n", (unsigned long) SwitchValue);
        
        /* Reset flag for next interrupt */
        TimerInterruptFlag = 0;
    }
    
    /* Optional: perform other work here */
    usleep(1000);  /* Small delay to prevent busy waiting */
}
```

> [!info] Interrupt-Driven Design
>
> - Main loop can perform other tasks while waiting for interrupts
> - ISR responds immediately to timer expiration
> - Flag-based communication between ISR and main loop
> - Much more efficient than polling (Exercise 5)

</div>
<div class="step" data-step="8">
<h2>Compile and Debug</h2>

Build and test the timer interrupt implementation:

```bash
# Build the project
Build Application

# Debug on Hardware
Debug As → Launch on Hardware
```

**Expected Behavior:**
- Timer generates interrupts at regular intervals
- LED toggles on each interrupt
- Console prints interrupt count and GPIO values
- System responds to timer events automatically

Monitor the console for:
- Timer initialization messages
- Periodic interrupt notifications
- Switch readings
- LED toggle confirmations

> [!warning] Verification
>
> - Check that LEDs toggle automatically (not manually controlled)
> - Verify interrupt count increases regularly
> - Confirm console output matches LED toggle rate
> - Measure timer interval accuracy with external equipment if available

</div>

<div class="navigation">
  <button id="prevBtn">Previous</button>
  <div class="step-indicator">
    <span><span id="currentStep">1</span> of <span id="totalSteps">8</span></span>
  </div>
  <button id="nextBtn">Next</button>
</div>

</div>

---

[Back to Chapter 1](chapter-2-baremetal.md)
