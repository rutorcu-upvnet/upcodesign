---
title: "Chapter 1: Architecture Design of an Embedded MicroBlaze Processor"
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

DESIGN 1. BASIC SYSTEM
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


### [Step 1: New Project Wizard](chapter-1-step-1.md)

### [Step 2: Create an IP Integrator Design](chapter-1-step-2.md)


### Step 3: Run Block Automation
1. Click Run Block Automation, as shown below.
![Block Automation](img/page_013_img_02.jpeg)
<center><em>Figure 18. Block Automation.</em></center><br>

On the Run Block Automation dialog box select next values:
- Leave Preset as the default value, None.
- Set Local Memory to 64 KB.
- Leave the Local Memory ECC as the default value, None.
- Set Cache Configuration to 32 KB.
- Set Debug Module to Basic Debug.
- Leave the Peripheral AXI Port option as the default value, Enabled.
- Leave the Interrupt Controller option unchecked.
- Leave the Clock source option set to /mig_7series_0/ui_addn_clk_0 (100 MHz).

Click OK. This generates a basic MicroBlaze system in the IP integrator diagram area.


### Step 4: Use Connection Automation
Run Connection Automation provides several options that you can select to make connections. This section will walk you through the first connection, and then you will use the same procedure to make the rest of the required connections for this tutorial.
![Connection Automation](img/page_014_img_01.jpeg)
<center><em>Figure 19. Connection Automation.</em></center><br>

Check the All Automation check box in the left pane of the dialog box as shown in
the following figure. This selects interfaces to run Connection Automation for.
![Run Connection Automation](img/page_015_img_01.jpeg)
<center><em>Figure 20. Run Connection Automation. Your system do not have BRAM and all MDM options.</em></center><br>

We do not use Block RAM (BRAM) in our design, so the peripheral block ram is not
displayed in your system. The BRAM allow to use inner and fast memory from the
FPGA instead the external high-capacity DDR3 memory.
If you need to delete some IP block you can click and delete it. Then select
Regenerate Layout.
At this point, your IP integrator diagram area should look like the following figure.
![MicroBlaze System](img/page_015_img_02.jpeg)
<center><em>Figure 21. MicroBlaze System.</em></center><br>

The detailed figures show the system diagram.
![MIG, MDM and RST_MIG](img/page_016_img_01.jpeg)
<center><em>Figure 22. MIG, MDM and RST_MIG.</em></center><br>

![MB, LocalMemory and AXI_Peripheral](img/page_016_img_02.jpeg)
<center><em>Figure 23. MB, LocalMemory and AXI_Peripheral.</em></center><br>

![GPIO and UARTLite](img/page_017_img_01.jpeg)
<center><em>Figure 24. GPIO and UARTLite.</em></center><br>

Now you can check the memory map of your system.
![Memory Map](img/page_017_img_02.jpeg)
<center><em>Figure 25. Memory Map.</em></center><br>


### Step 5: Validating Design and making an HDL Wrapper
Select Validate Design. This will check for design and connection errors.
![Validate Design](img/page_017_img_03.jpeg)
<center><em>Figure 26. Validate Design.</em></center><br>

![Successful validation](img/page_018_img_01.jpeg)
<center><em>Figure 27. Successful validation.</em></center><br>

After the design validation step we will proceed with creating a HDL System Wrapper. Click on the Sources tab and find your block design. Right click on your block design and click Create HDL Wrapper. Let Vivado manage wrapper and auto-update and click OK.
![Create a HDL wrapper](img/page_018_img_02.jpeg)
<center><em>Figure 28. Create a HDL wrapper.</em></center><br>

This will create a top module in Verilog and will allow you to generate a bitstream.


### Step 6: Modifying Contrains File (optional)
Digilent constrain file represents all the pins connections available in the Genesys2 board. All the peripherals on the board are connected to the FPGA. Not all of them are connected in our design so comment all lines that do not contain clock, UART, switches, LEDs or pushbuttons.

![Edition of constrain file](img/page_019_img_01.jpeg)
<center><em>Figure 29. Edition of constrain file.</em></center><br>


### Step 7: GPIO Options
Reading the constrain file the name of the ports and direction in the AXI_GPIO must be fixed. Delete the LED port. In the canvas, click on the right button and select Create Port.

![Creating a port](img/page_020_img_01.jpeg)
<center><em>Figure 30. Creating a port.</em></center><br>

![LED output port](img/page_020_img_02.jpeg)
<center><em>Figure 31. LED output port.</em></center><br>

Create the SW as inputs. Edit the AXI_GPIO.
![AXI GPIO](img/page_021_img_01.jpeg)
<center><em>Figure 32. AXI GPIO.</em></center><br>

![AXI GPIO with SW and LED buses](img/page_021_img_02.jpeg)
<center><em>Figure 33. AXI GPIO with SW and LED buses.</em></center><br>


### Step 8: MicroBlaze options
Double click on the MB IP Block and select options.

![Real-time Preset](img/page_022_img_01.jpeg)
<center><em>Figure 34. Real-time Preset.</em></center><br>

The Real-Time preset option is optimized for deterministic programming and for RTOS.
![MB predefined configurations](img/page_023_img_01.jpeg)
<center><em>Figure 35. MB predefined configurations.</em></center><br>

Select the default values in next windows.


### Step 9: UART Lite Options
![Uart Lite Options](img/page_023_img_02.jpeg)
<center><em>Figure 36. Uart Lite Options.</em></center><br>


### Step 10. MIG_7Series Options (*optional)
In the Genesys2 board the input clock frequency is 100MHZ, the DDR3 can run up to 800MHz allowing fast access to the memory and fast processing of MB if the MB clock is connected to this MIG IP (yes, by the ui_clock output). Modify the frequency clock to 800MHz, this permits the MicroBlaze run up to 800MHz/8=100MHz.
![Change the frequency](img/page_023_img_03.jpeg)
<center><em>Figure 37. Change the frequency.</em></center><br>

![Selecting Input Clock Period](img/page_024_img_01.jpeg)
<center><em>Figure 38. Selecting Input Clock Period.</em></center><br>


### Step 11: Generating Bit File
By selecting Generate bitstream all the synthesis process will start. (wait for 5 to 20 minutes…).
![Generate bitstream](img/page_024_img_02.jpeg)
<center><em>Figure 39.Generate bitstream.</em></center><br>

Save the Project, there are many options to save it, in File/Project/archive
![Archive Project](img/page_024_img_03.jpeg)
<center><em>Figure 40. Archive Project.</em></center><br>

Also, TCL scripts are available. Select a name for your project and archive it.
![Archive Project](img/page_025_img_01.jpeg)
<center><em>Figure 41. Archive Project.</em></center><br>


### Step 12: Export the hardware
To program applications to run in the MicroBlaze architecture, a XSA file that describes it must be created. Select File/Export and write a name for your architecture (mb_std_system).
![Export hardware and include bitstream](img/page_025_img_02.jpeg)
<center><em>Figure 42. Export hardware and include bitstream.</em></center><br>


### Step 13: Program the Device
The board is connected with the JTAG to your computer running Vivado, then select Open Hardware Manager and download the bitstream in the Genesys2.
![Open Hardware](img/page_025_img_03.jpeg)
<center><em>Figure 43. Open Hardware.</em></center><br>

Now you are ready to create the applications. Open the VITIS IDE.
![Launch VITIS](img/page_026_img_01.jpeg)
<center><em>Figure 44. Launch VITIS.</em></center><br>

- Option 1: Go to VITIS Development (next chapter)
- Option 2: Improve your architecture by using timers and interruptions. (continue reading)

## DESING II: IMPROVING THE ARCHITECTURE
### Objective
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

