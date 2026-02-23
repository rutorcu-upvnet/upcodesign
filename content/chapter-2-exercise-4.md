---
title: "2.4 Exercise 4: Managing GPIO — Part III (Pushbutton Interrupts)"
---

[Previous: Exercise 3](chapter-2-exercise-3.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">
<div class="step active" data-step="1">
<h2>Pushbutton Interrupts</h2>

> [!note] Objectives
>
> Configure `GPIO` for pushbuttons with interrupts<br>
> Initialize the interrupt controller for `MicroBlaze`<br>
> Create an ISR to read and report button values<br>

When a pushbutton is pressed, an interrupt is generated and the ISR prints the button value. The pushbuttons are connected to GND, so a high state/edge triggers the interrupt via the `AXI Interrupt Controller`.

> [!warning] Check the memory address of the GPIO register for BTN

</div>
<div class="step" data-step="2">
<h2>Include Libraries</h2>

Add the following libraries (keep previous `GPIO` libraries too):

```c
#include "xil_exception.h"     // Xil_ExceptionEnable
#include "xinterrupt_wrap.h"   // XIntc_Initialize (wrapper)
```

</div>
<div class="step" data-step="3">
<h2>Constants and Instances</h2>

Define constants and `GPIO` instances for `switches`/`LEDs` and `buttons`:

```c
XGpio Gpio_btn;    // Buttons
XGpio_Config *ConfigPtr_btn;
```

And add the new definitions. To create the ISR, some macro definitions are needed.

```c
// Interruption macros
#define BUTTON_INTERRUPT XGPIO_IR_CH1_MASK  // Interrupt mask for channel 1
#define INTERRUPT_CONTROL_VALUE 0x7         // Enable all interrupts
#define XGPIO_BTN_AXI_BASEADDRESS XPAR_AXI_GPIO_1_BASEADDR // Base addr of the GPIO BTN
#define BTN_CHANNEL 1 // Channel of the BTN

// Pushbutton debouncing
#define BTN_DEBOUNCE_TIME 100000 // Debounce time in microseconds
```

> [!error] Use the correct `XPAR_AXI_GPIO_*_BASEADDR` from `xparameters.h`

</div>
<div class="step" data-step="4">
<h2>Initialize Button GPIO</h2>

Declare global variables that can be shared in and out of the ISR function with full visibility.

```c
u32 DataRead_btn;               // Data read from the push buttons, global variable
u32 delay_interrupt;            // Delay to wait for interrupt
static volatile u32 IntrFlag;   // Interrupt Handler Flag

void Gpio_Btn_Handler(void *CallBackRef); 
```

Initialize the `GPIO` for `buttons` and set direction to input.

```c
int Status;

Status = XGpio_Initialize(&Gpio_btn, XGPIO_BTN_AXI_BASEADDRESS);
if (Status != XST_SUCCESS) {
    xil_printf("Button GPIO Initialization Failed\r\n");
    return XST_FAILURE;
}

// Buttons on channel 1 as inputs
XGpio_SetDataDirection(&Gpio_btn, 1, 0xFFFFFFFF);
```

</div>
<div class="step" data-step="5">
<h2>Configure Interrupts</h2>

Enable GPIO interrupts and connect the ISR. Enable global interrupt system (enable the `AXI Interrupt Controller`). An AXI Interrupt Controller is connected to `MicroBlaze` to manage different interrupts. Enable the `AXI GPIO` BTN interrupt system. Read and write in the `GPIO` Interrupt Enable Register (IER), setting a 1 to enable interrupts. Set up the `Interrupt Controller` (INTC) system for `AXI GPIO` BTN. This setup
initializes and runs the INTC, connecting the `AXI GPIO` for BTN to the `MicroBlaze` Processor. Enable the `MicroBlaze` global interrupts. 

```c
XGpio_InterruptGlobalEnable(&Gpio_btn);
XGpio_InterruptEnable(&Gpio_btn, 1); // Enable interrupt for BTN

ConfigPtr_btn = XGpio_LookupConfig(XPAR_XGPIO_1_BASEADDR); // Get the configuration of the GPIO
if (ConfigPtr_btn == NULL) {
    return XST_FAILURE;
} 

Status = XSetupInterruptSystem(
    &Gpio_btn,                      // Instance of the GPIO
    &Gpio_Btn_Handler,              // Handler of the GPIO
    ConfigPtr_btn->IntrId,          // Interrupt ID
    ConfigPtr_btn->IntrParent,      // Interrupt parent
    XINTERRUPT_DEFAULT_PRIORITY     // Interrupt priority
);
if (Status != XST_SUCCESS) { 
    return XST_FAILURE;
}

Xil_ExceptionEnable(); // Enable the MicroBlaze global interrupts
IntrFlag = 0;
delay_interrupt = 0; 
```

> [!note] To know how to read and write in the `GPIO` interrupt registers, dive into the interrupt enable function

```c
void XGpio_InterruptEnable(XGpio *InstancePtr, u32 Mask)
{
	u32 Register;

	Xil_AssertVoid(InstancePtr != NULL);
	Xil_AssertVoid(InstancePtr->IsReady == XIL_COMPONENT_IS_READY);
	Xil_AssertVoid(InstancePtr->InterruptPresent == TRUE);

	/*
	 * Read the interrupt enable register and only enable the specified
	 * interrupts without disabling or enabling any others.
	 */

	Register = XGpio_ReadReg(InstancePtr->BaseAddress, XGPIO_IER_OFFSET);
	XGpio_WriteReg(InstancePtr->BaseAddress, XGPIO_IER_OFFSET, Register | Mask);
}
```

</div>
<div class="step" data-step="6">
<h2>ISR Skeleton</h2>

Create an ISR to handle button interrupts.

```c
void Gpio_Btn_Handler(void *CallBackRef)
{
    /* Disable the interrupt */
    XGpio_InterruptDisable(&Gpio_btn, BUTTON_INTERRUPT);
    /* Clear the Interrupt */
    XGpio_InterruptClear(&Gpio_btn, BUTTON_INTERRUPT);
    /* Read the state of the push buttons */
    DataRead_btn = XGpio_DiscreteRead(&Gpio_btn, BTN_CHANNEL);
    /* Set the flag */
    IntrFlag = 1;
    /* Enable the interrupt */
    XGpio_InterruptEnable(&Gpio_btn, BUTTON_INTERRUPT);

    return; 
}
```

</div>
<div class="step" data-step="7">
<h2>ISR Skeleton</h2>

Add interrupt managing at the main loop and change the delay.

```c
if (IntrFlag == 0) {
    //xil_printf("Pushbutton no pressed\n\r");
} else {
    IntrFlag = 0;
    switch(DataRead_btn) 
    {
        case 0x10:
        xil_printf("Pushbutton 0 (UP) pressed\n\r");
        break;
        case 0x08:
        xil_printf("Pushbutton 1 (RIGHT) pressed\n\r");
        break;
        case 0x04:
        xil_printf("Pushbutton 2 (LEFT) pressed\n\r");
        break;
        case 0x02:
        xil_printf("Pushbutton 3 (DOWN) pressed\n\r");
        break;
        case 0x01:
        xil_printf("Pushbutton 4 (CENTER) pressed\n\r");
        break;
        default:
        // xil_printf("Pushbutton not pressed\n\r");
        break;
    }
}
usleep(BTN_DEBOUNCE_TIME); // 0,1s for the loop again
```

> [!error] Comment other `xil_printf()` calls in `while()` to avoid unnecessary messages

</div>
<div class="step" data-step="8">
<h2>Test on Hardware</h2>

Build and debug the application. Press each pushbutton and verify that the console prints the correct value.

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

[Next: Exercise 5](chapter-2-exercise-5.md)
