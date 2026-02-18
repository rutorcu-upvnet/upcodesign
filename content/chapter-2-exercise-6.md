---
title: "2.6 Exercise 6: Managing the AXI Timer (Interrupts)"
---

[Previous: Exercise 5](chapter-2-exercise-5.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">
<div class="step active" data-step="1">
<h2>Overview: Timer Interrupts</h2>

> [!note] Objectives
>
> Configure AXI Timer for interrupt-driven operation<br>
> Implement a timer interrupt service routine (ISR)<br>
> Generate periodic interrupts for precise timing events<br>

In contrast to polling mode ([Exercise 5](chapter-2-exercise-5.md)), interrupt mode allows the timer to automatically generate interrupts when it reaches a compare value. This is more efficient and precise for time-critical applications.

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

#define RESET_VALUE 0xD0000000 // 800Mticks aprox

/* Global variables */
XTmrCtr TimerCounter; /* The instance of the Tmrctr 1 Device */

static volatile int TimerExpired;
static volatile int LastTimerExpired; 
```

> [!info] Flags
>
> The `volatile` keyword prevents the compiler from optimizing away the flag check since it can change asynchronously in the ISR. The `static`keyword allows to keep the variable value in consecutive function calls.

</div>
<div class="step" data-step="4">
<h2>Create Timer Interrupt Handler</h2>

Define the ISR function that executes when timer interrupt occurs:

```c
void TimerCounterHandler(void *CallBackRef, u8 TmrCtrNumber)
{
    XTmrCtr *InstancePtr = (XTmrCtr *)CallBackRef;
    /*
    * Check if the timer counter has expired, checking is not necessary
    * since that's the reason this function is executed, this just shows
    * how the callback reference can be used as a pointer to the instance
    * of the timer counter that expired, increment a shared variable so
    * the main thread of execution can see the timer expired
    */
    if (XTmrCtr_IsExpired(InstancePtr, TmrCtrNumber)) {
        TimerExpired++;
        //xil_printf("Timer expired %d times\n\r", TimerExpired);
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

Configure the interrupt controller and timer in `main()`, calling the `TmrCtrIntrExample_Init` function:
```c
int Status;

Status = TmrCtrIntrExample_Init(&TimerCounter, XTMRCTR_BASEADDRESS);
if (Status != XST_SUCCESS) {
    xil_printf("Tmrctr 1 interrupt Example Initialization Failed\r\n");
    return XST_FAILURE;
} else {
    xil_printf("Tmrctr 1 interrupt Example Initialization Success\r\n");
}
```

```c
int TmrCtrIntrExample_Init(XTmrCtr *TmrCtrInstancePtr, UINTPTR BaseAddr) 
{
    int Status;
    u8 TmrCtrNumber = TIMER_COUNTER_1;
    /*
    * Initialize the timer counter so that it's ready to use,
    * specify the device ID that is generated in xparameters.h
    */

    Status = XTmrCtr_Initialize(TmrCtrInstancePtr, BaseAddr);
    if (Status != XST_SUCCESS) {
        return XST_FAILURE;
    }
    /*
    * Perform a self-test to ensure that the hardware was built
    * correctly
    */
    Status = XTmrCtr_SelfTest(TmrCtrInstancePtr, TmrCtrNumber);
    if (Status != XST_SUCCESS) {
        return XST_FAILURE;
    }
    /*
    * Connect the timer counter to the interrupt subsystem such that
    * interrupts can occur.
    */
    Status = XSetupInterruptSystem(TmrCtrInstancePtr,
        (XInterruptHandler)XTmrCtr_InterruptHandler, \
        TmrCtrInstancePtr->Config.IntrId, \
        TmrCtrInstancePtr->Config.IntrParent, \
        XINTERRUPT_DEFAULT_PRIORITY);
    if (Status != XST_SUCCESS) {
        return XST_FAILURE;
    }
    /*
    * Setup the handler for the timer counter that will be called from the
    * interrupt context when the timer expires, specify a pointer to the
    * timer counter driver instance as the callback reference so the
    * handler is able to access the instance data
    */
    XTmrCtr_SetHandler(TmrCtrInstancePtr, TimerCounterHandler, TmrCtrInstancePtr);
    /*
    * Enable the interrupt of the timer counter so interrupts will occur
    * and use auto reload mode such that the timer counter will reload
    * itself automatically and continue repeatedly, without this option
    * it would expire once only
    */
    XTmrCtr_SetOptions(TmrCtrInstancePtr, TmrCtrNumber, XTC_INT_MODE_OPTION | XTC_AUTO_RELOAD_OPTION);
    /*
    * Set a reset value for the timer counter such that it will expire
    * earlier than letting it roll over from 0, the reset value is loaded
    * into the timer counter when it is started
    */
    XTmrCtr_SetResetValue(TmrCtrInstancePtr, TmrCtrNumber, RESET_VALUE);
    /*
    * Start the timer counter such that it's incrementing by default,
    * then wait for it to timeout a number of times
    */
    XTmrCtr_Start(TmrCtrInstancePtr, TmrCtrNumber);

    TimerExpired = 0;
    LastTimerExpired = 0;

    return XST_SUCCESS;
} 
```

</div>
<div class="step" data-step="6">
<h2>Main Loop Processing</h2>

In the main loop, check the interrupt flag and perform actions:

```c
/*
* Run the Timer Counter - Interrupt example.
*/
Status = TmrCtrIntrExample(&TimerCounter);
if (Status != XST_SUCCESS) {
    xil_printf("Tmrctr 1 interrupt Example Failed\r\n");
return XST_FAILURE;
}
xil_printf("Successfully ran Tmrctr 1 interrupt Example\r\n"); 
```

```c
int TmrCtrIntrExample(XTmrCtr *TmrCtrInstancePtr)
{
    u8 TmrCtrNumber = TIMER_COUNTER_1;
    /*
    * Wait for the first timer counter to expire as indicated
    * by the shared variable which the handler will increment
    */
    if (TimerExpired != LastTimerExpired) 
    {
        LastTimerExpired = TimerExpired;
        xil_printf("Timer expired %d times\n\r", LastTimerExpired);
    }
    /*
    * If it has expired a number of times, then stop the timer counter and stop this example 
    */
    if (TimerExpired == 3) {
        XTmrCtr_Stop(TmrCtrInstancePtr, TmrCtrNumber); // Stop the timer counter
    }
    return XST_SUCCESS;
} 
```

> [!info] Interrupt-Driven Design
>
> - Main loop can perform other tasks while waiting for interrupts
> - ISR responds immediately to timer expiration
> - Flag-based communication between ISR and main loop
> - Much more efficient than polling ([Exercise 5](chapter-2-exercise-5.md))

</div>
<div class="step" data-step="7">
<h2>Compile and Debug</h2>

Build and test the timer interrupt implementation

> [!note] Expected Behavior
>
> - `main()` prints out a message every second
> - `AXI Timer` generates interrupts at regular intervals and sets a flag
> - `TmrCtrIntrExample` function prints out a message when the flag is active with the interrupts count

Monitor the console for:
- Timer initialization messages
- Periodic interrupt notifications

> [!warning] Verification
>
> - Verify interrupt count increases regularly
> - Confirm console output matches the number of interrupts
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

[Back to Chapter 2](chapter-2-baremetal.md)
