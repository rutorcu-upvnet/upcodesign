---
title: "1. Architecture Design of an Embedded MicroBlaze Processor"
---

[← Back to Index](index.md)

---

The objective of the first exercise is to create our hardware architecture where to develop the software applications. The architecture is based on MicroBlaze processor on a Kintex7 FPGA:

https://digilent.com/reference/programmable-logic/genesys-2/reference-manual

A useful link to the design of a MicroBlaze Processor can be found in:

https://xilinx.github.io/Embedded-Design-Tutorials/docs/2022.1/build/html/docs/Feature_Tutorials/microblaze-system/README.html

`DIGILENT` has a good description of a MicroBlaze design:

https://digilent.com/reference/programmable-logic/guides/getting-started-with-ipi

The guide described on next paragraphs is based on the previous links.

---

## Objective
The embedded system needed for the bare metal and RTOS exercises is built in this chapter. An embedded system needs a minimal infrastructure based on a microcontroller, a memory and some peripherals to communicate with the external world.

This guide will provide a step-by-step walk-through of creating a Microblaze based hardware design using the Vivado IP Integrator for the Genesys2 FPGA board.

## DESIGN I. BASIC SYSTEM
Microblaze is a soft IP core from Xilinx that will implement a microprocessor entirely within the Xilinx FPGA general purpose memory and logic fabric. For this tutorial, we are going to add a Microblaze IP block using the Vivado IP Integrator tool.

In addition to the Microblaze IP block, we would also like to make use of the DDR3 SDRAM component on the Genesys2. Therefore, a MIG (Memory Interface Generator) IP block will be added to our design.

Finally, a UART (universal asynchronous receiver/transmitter) IP block will be added to communicate between the host PC and the soft processor core running on the Genesys2.

---

## General Design Flow
### Vivado
1. Open Vivado and select Genesys2 board
2. Create a new Vivado Project
3. Create empty block design workspace inside the new project
4. Add required IP blocks using the IP integrator tool and build Hardware Design
5. Validate and save block design
6. Create HDL system wrapper
7. Run design Synthesis and Implementation
8. Generate Bit File
9. Export Hardware Design including the generated bit stream file to SDK tool
10. Launch Vitis SDK

We will use Vitis to create a Software application that will use the customized
board interface data and FPGA hardware configuration by importing the hardware
design information from Vivado.

### Vitis
1. Create new application project and select default Hello World template
2. Program FPGA
3. Run configuration by selecting the correct UART COM Port and Baud Rate


### Step 1: [New Project Wizard](chapter-1-step-1.md)

### Step 2: [Create an IP Integrator Design](chapter-1-step-2.md)

### Step 3: [Run Block Automation](chapter-1-step-3.md)

### Step 4: [Run Connection Automation](chapter-1-step-4.md)

### Step 5: [Validating Design and making an HDL Wrapper](chapter-1-step-5.md)

### Step 6: [Modifying Contrains File (optional)](chapter-1-step-6.md)

### Step 7: [GPIO Options](chapter-1-step-7.md)

### Step 8: [MicroBlaze Options](chapter-1-step-8.md)

### Step 9: [UART Lite Options](chapter-1-step-9.md)

### Step 10: [MIG_7Series Options (optional)](chapter-1-step-10.md)

### Step 11: [Generating Bitstream File](chapter-1-step-11.md)

### Step 12: [Export the hardware](chapter-1-step-12.md)

### Step 13: [Program the Device](chapter-1-step-13.md)


## DESING II: IMPROVING THE ARCHITECTURE
In this section we will increase the complexity of the architecture, allowing the use of timers and interrupts. The advantages are obvious: it will allow the use of real-time operating systems or systems based on periodic interrupts.

### Step 1: Adding new IPs
Add new AXI GPIO for BTN.
![New AXI GPIO for the pushbuttons](img/page_028_img_01.jpeg)
<center><em>Figure 45. New AXI GPIO for the pushbuttons.</em></center><br>

Add two AXI_Timers.
![Add TWO new AXI Timers](img/page_028_img_02.jpeg)
<center><em>Figure 46. Add TWO new AXI Timers.</em></center><br>

Add one Interrupt Controller.
![New Interrupt Controller](img/page_028_img_03.jpeg)
<center><em>Figure 47. New Interrupt Controller.</em></center><br>


### Step 2: Run Connection automation


### Step 3: Modify the Ports and connections
![Modifying Input Port](img/page_029_img_01.jpeg)
<center><em>Figure 48. Modifying Input Port.</em></center><br>

![Editing the parameters of AXI GPIO](img/page_029_img_02.jpeg)
<center><em>Figure 49. Editing the parameters of AXI GPIO for the pushbuttons.</em></center><br>

The Interruption from BTN is enabled.
![Check the values for the AXI timers](img/page_029_img_03.jpeg)
<center><em>Figure 50. Check the values for the AXI timers.</em></center><br>


### Step 4: Concatenation of Interruptions and connections
Add a Concat IP module
![New Concat Block](img/page_030_img_01.jpeg)
<center><em>Figure 51. New Concat Block.</em></center><br>

![Editing the Concat for 3 inputs](img/page_030_img_02.jpeg)
<center><em>Figure 52. Editing the Concat for 3 inputs.</em></center><br>

Connect the output interruption from Timers and BTN to the Concat inputs. Connect the output from the Concat to the input interruption of Interrupt Controller. Connect the output of the Interrupt Controller to the input interruption bus of the MicroBlaze processor. Check Validate the Design.
![Validating the design](img/page_030_img_03.jpeg)
<center><em>Figure 53. Validating the design.</em></center><br>

![Expected result](img/page_031_img_01.jpeg)
<center><em>Figure 54. Expected result.</em></center><br>


### Step 6: Synthesizing the system


### Step 7 (optional)
If the previous system was tested with a hello_world application and a sleep function, export new XSA file, test again the same example modifying the BSP options for the new timers included as sleep_timer.
![Adding the timers in the BSP Settings](img/page_031_img_02.jpeg)
<center><em>Figure 55. Adding the timers in the BSP Settings.</em></center><br>


### Step 8. Show the results to the Teacher.
```c
#include "xil_printf.h"
#include "sleep.h"
#include "xiltimer.h"

int main()
{
    xil_printf("Hello World\n\r");
    xil_printf("Successfully ran Hello World application\n\r");
    while(1){
        xil_printf("My life is a continuous loop\n\r");
        sleep(1);
    }
    return 0;
}
```

