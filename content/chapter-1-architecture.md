---
title: "Chapter 1: Architecture Design of an Embedded MicroBlaze Processor"
---

[← Back to Index](index.md)

The objective of the first exercise is to create our hardware architecture where to
develop the software applications.
The architecture is based on MicroBlaze processor on a Kintex7 FPGA:

https://digilent.com/reference/programmable-logic/genesys-2/reference-manual

A useful link to the design of a MicroBlaze Processor can be found in:

https://xilinx.github.io/Embedded-Design-Tutorials/docs/2022.1/build/html/docs/Feature_Tutorials/microblaze-system/README.html

DIGILENT has a good description of a MicroBlaze design:

https://digilent.com/reference/programmable-logic/guides/getting-started-with-ipi

The guide described on next paragraphs is based on the previous links.


## Objective
The embedded system needed for the bare metal and RTOS exercises is built in this chapter. An embedded system needs a minimal infrastructure based on a microcontroller, a memory and some peripherals to communicate with the external world.

This guide will provide a step-by-step walk-through of creating a Microblaze based hardware design using the Vivado IP Integrator for the Genesys2 FPGA board.

DESIGN 1. BASIC SYSTEM
Microblaze is a soft IP core from Xilinx that will implement a microprocessor entirely within the Xilinx FPGA general purpose memory and logic fabric. For this tutorial, we are going to add a Microblaze IP block using the Vivado IP Integrator tool.

In addition to the Microblaze IP block, we would also like to make use of the DDR3 SDRAM component on the Genesys2. Therefore, a MIG (Memory Interface Generator) IP block will be added to our design.

Finally, a UART (universal asynchronous receiver/transmitter) IP block will be added to communicate between the host PC and the soft processor core running on the Genesys2.


## General Design Flow
### Vivado
- Open Vivado and select Genesys2 board
- Create a new Vivado Project
- Create empty block design workspace inside the new project
- Add required IP blocks using the IP integrator tool and build Hardware Design
- Validate and save block design
- Create HDL system wrapper
- Run design Synthesis and Implementation
- Generate Bit File
- Export Hardware Design including the generated bit stream file to SDK tool
- Launch Vitis SDK

We will use Vitis to create a Software application that will use the customized
board interface data and FPGA hardware configuration by importing the hardware
design information from Vivado.

### Vitis
- Create new application project and select default Hello World template
- Program FPGA
- Run configuration by selecting the correct UART COM Port and Baud Rate


### Step 1: New Project Wizard
Open Vivado
![Vivado quick start panel](img/page_006_img_01.jpeg)
<center>Figure 1. Vivado quick start panel.</center>

Select Create Project, this will guide you through the options to create a new
project. Name it genesys2_standardmicroblaze
![Name and folder for the hardware project](img/page_006_img_02.jpeg)
<center>Figure 2. Name and folder for the hardware project.</center>

![RTL Project](img/page_007_img_01.jpeg)
<center>Figure 3. RTL Project.</center>

This example we do not add design files. We add the constrain file downloaded from [Genesys2 Digilent git page](https://github.com/Digilent/Genesys-2).
![GitHub of Digilent’s Genesys2 board](img/page_007_img_02.jpeg)
<center>Figure 4. GitHub of Digilent’s Genesys2 board.</center>

![Adding new constrain file](img/page_008_img_01.jpeg)
<center>Figure 5. Adding new constrain file.</center>

Then select the Part (FPGA) or the Board (Genesys2).
In the [Digilent web page]( https://digilent.com/reference/programmable-logic/genesys-2/start) you can locate the part: XC7K325TFFG900-2.
![Selecting the part](img/page_008_img_02.jpeg)
<center>Figure 6. Selecting the part.</center>

Otherwise, you can select the board:
![Selecting the genesys2 board](img/page_009_img_01.jpeg)
<center>Figure 7. Selecting the genesys2 board. Refresh the catalogue updates the boards available.</center>

Then the project has been created.
![Main window of Vivado IDE](img/page_009_img_02.jpeg)
<center>Figure 8. Main window of Vivado IDE for the new hardware project.</center>


### Step 2: Create an IP Integrator Design
From Flow Navigator, under IP integrator, select Create Block Design.
Same menu can be expanded on IP Integrator tab.
![Vivado IP Integrator](img/page_010_img_01.jpeg)
<center>Figure 9. Vivado IP Integrator.</center>

Specify the IP subsystem design name. For this step, you can use mb_st as the Design name (MicroBlaze Standalone). Leave the Directory field set to its default value of `Local to Project`. Leave the Specify source set drop-down list set to its default value of Design Sources.
Click OK in the Create Block Design dialog box, shown in the following
figure.
![Creating a Block Design](img/page_010_img_02.jpeg)
<center>Figure 10. Creating a Block Design.</center>

- In the IP integrator diagram area, right-click and select Add IP. The IP integrator Catalog opens. Alternatively, you can also select the Add IP icon in the middle of the canvas.
![MIG IP](img/page_011_img_01.jpeg)
<center>Figure 11. MIG IP.</center>

Click Run Block Automation.
![Run Block Automation](img/page_011_img_02.jpeg)
<center>Figure 12. Run Block Automation.</center>

After Block Automation runs the MIG is connected.
![MIG connected](img/page_011_img_03.jpeg)
<center>Figure 13. MIG connected.</center>

Then add new IP MicroBlaze:
![MicroBlaze IP](img/page_012_img_01.jpeg)
<center>Figure 14. MicroBlaze IP.</center>

![MicroBlaze IP and MIG](img/page_012_img_02.jpeg)
<center>Figure 15.MicroBlaze IP and MIG.</center>

There are several ways to use an existing interface in IP integrator. Use the Board window to instantiate some of the interfaces that are present on the Genesys2 board.
![Using the Board Window](img/page_012_img_03.jpeg)
<center>Figure 16. Using the Board Window.</center>

In the Board window, notice that the DDR3 SDRAM interface is connected as
shown by the yellow circle.

From the Board window, select UART under the Miscellaneous folder, and drag and drop it into the block design canvas. This instantiates the AXI Uartlite IP on the block design. 

Likewise, from the Board window, select SWITCHES under the General Purpose
Input or Output folder, and drag and drop it into the block design canvas. This instantiates the GPIO IP on the block design and connects it to the on-board switches.

Next, from the Board window, select FPGA Reset under the Reset folder, and drag and drop it into the block design canvas. This connects the CPU push button reset to the MIG core IP.

Now, drag and drop LEDs into the same GPIO for the switches, this will merge both LEDs and SWs in the same AXI_GPIO.
![Canvas with MB, UART, GPIO...](img/page_013_img_01.jpeg)
<center>Figure 17. Canvas with MB, UART, GPIO and Reset for the DDR3 Memory System.</center>


### Step 3: Run Block Automation
Click Run Block Automation, as shown below.
![Block Automation](img/page_013_img_02.jpeg)
<center>Figure 18. Block Automation.</center>

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
<center>Figure 19. Connection Automation.</center>

Check the All Automation check box in the left pane of the dialog box as shown in
the following figure. This selects interfaces to run Connection Automation for.
![Run Connection Automation](img/page_015_img_01.jpeg)
<center>Figure 20. Run Connection Automation. Your system do not have BRAM and all MDM options.</center>

We do not use Block RAM (BRAM) in our design, so the peripheral block ram is not
displayed in your system. The BRAM allow to use inner and fast memory from the
FPGA instead the external high-capacity DDR3 memory.
If you need to delete some IP block you can click and delete it. Then select
Regenerate Layout.
At this point, your IP integrator diagram area should look like the following figure.
![MicroBlaze System](img/page_015_img_02.jpeg)
<center>Figure 21. MicroBlaze System.</center>

The detailed figures show the system diagram.
![MIG, MDM and RST_MIG](img/page_016_img_01.jpeg)
<center>Figure 22. MIG, MDM and RST_MIG.</center>

![MB, LocalMemory and AXI_Peripheral](img/page_016_img_02.jpeg)
<center>Figure 23. MB, LocalMemory and AXI_Peripheral.</center>

![GPIO and UARTLite](img/page_017_img_01.jpeg)
<center>Figure 24. GPIO and UARTLite.</center>

Now you can check the memory map of your system.
![Memory Map](img/page_017_img_02.jpeg)
<center>Figure 25. Memory Map.</center>


### Step 5: Validating Design and making an HDL Wrapper
Select Validate Design. This will check for design and connection errors.
![Validate Design](img/page_017_img_03.jpeg)
<center>Figure 26. Validate Design.</center>

![Successful validation](img/page_018_img_01.jpeg)
<center>Figure 27. Successful validation.</center>

After the design validation step we will proceed with creating a HDL System Wrapper. Click on the Sources tab and find your block design. Right click on your block design and click Create HDL Wrapper. Let Vivado manage wrapper and auto-update and click OK.
![Create a HDL wrapper](img/page_018_img_02.jpeg)
<center>Figure 28. Create a HDL wrapper.</center>

This will create a top module in Verilog and will allow you to generate a bitstream.


### Step 6: Modifying Contrains File (optional)
Digilent constrain file represents all the pins connections available in the Genesys2 board. All the peripherals on the board are connected to the FPGA. Not all of them are connected in our design so comment all lines that do not contain clock, UART, switches, LEDs or pushbuttons.

![Edition of constrain file](img/page_019_img_01.jpeg)
<center>Figure 29. Edition of constrain file.</center>


### Step 7: GPIO Options
Reading the constrain file the name of the ports and direction in the AXI_GPIO must be fixed. Delete the LED port. In the canvas, click on the right button and select Create Port.

![Creating a port](img/page_020_img_01.jpeg)
<center>Figure 30. Creating a port.</center>

![LED output port](img/page_020_img_02.jpeg)
<center>Figure 31. LED output port.</center>

Create the SW as inputs. Edit the AXI_GPIO.
![AXI GPIO](img/page_021_img_01.jpeg)
<center>Figure 32. AXI GPIO.</center>

![AXI GPIO with SW and LED buses](img/page_021_img_02.jpeg)
<center>Figure 33. AXI GPIO with SW and LED buses.</center>


### Step 8: MicroBlaze options
Double click on the MB IP Block and select options.

![Real-time Preset](img/page_022_img_01.jpeg)
<center>Figure 34. Real-time Preset.</center>

The Real-Time preset option is optimized for deterministic programming and for RTOS.
![MB predefined configurations](img/page_023_img_01.jpeg)
<center>Figure 35. MB predefined configurations.</center>

Select the default values in next windows.


### Step 9: UART Lite Options
![Uart Lite Options](img/page_023_img_02.jpeg)
<center>Figure 36. Uart Lite Options.</center>


### Step 10. MIG_7Series Options (*optional)
In the Genesys2 board the input clock frequency is 100MHZ, the DDR3 can run up to 800MHz allowing fast access to the memory and fast processing of MB if the MB clock is connected to this MIG IP (yes, by the ui_clock output). Modify the frequency clock to 800MHz, this permits the MicroBlaze run up to 800MHz/8=100MHz.
![Change the frequency](img/page_023_img_03.jpeg)
<center>Figure 37. Change the frequency.</center>

![Selecting Input Clock Period](img/page_024_img_01.jpeg)
<center>Figure 38. Selecting Input Clock Period.</center>


### Step 11: Generating Bit File
By selecting Generate bitstream all the synthesis process will start. (wait for 5 to 20 minutes…).
![Generate bitstream](img/page_024_img_02.jpeg)
<center>Figure 39.Generate bitstream.</center>

Save the Project, there are many options to save it, in File/Project/archive
![Archive Project](img/page_024_img_03.jpeg)
<center>Figure 40. Archive Project.</center>

Also, TCL scripts are available. Select a name for your project and archive it.
![Archive Project](img/page_025_img_01.jpeg)
<center>Figure 41. Archive Project.</center>


### Step 12: Export the hardware
To program applications to run in the MicroBlaze architecture, a XSA file that describes it must be created. Select File/Export and write a name for your architecture (mb_std_system).
![Export hardware and include bitstream](img/page_025_img_02.jpeg)
<center>Figure 42. Export hardware and include bitstream.</center>


### Step 13: Program the Device
The board is connected with the JTAG to your computer running Vivado, then select Open Hardware Manager and download the bitstream in the Genesys2.
![Open Hardware](img/page_025_img_03.jpeg)
<center>Figure 43. Open Hardware.</center>

Now you are ready to create the applications. Open the VITIS IDE.
![Launch VITIS](img/page_026_img_01.jpeg)
<center>Figure 44. Launch VITIS.</center>

- Option 1: Go to VITIS Development (next chapter)
- Option 2: Improve your architecture by using timers and interruptions. (continue reading)

## DESING II: IMPROVING THE ARCHITECTURE
### Objective
In this section we will increase the complexity of the architecture, allowing the use of timers and interrupts. The advantages are obvious: it will allow the use of real-time operating systems or systems based on periodic interrupts.

### Step 1: Adding new IPs
Add new AXI GPIO for BTN.
![New AXI GPIO for the pushbuttons](img/page_028_img_01.jpeg)
<center>Figure 45. New AXI GPIO for the pushbuttons.</center>

Add two AXI_Timers.
![Add TWO new AXI Timers](img/page_028_img_02.jpeg)
<center>Figure 46. Add TWO new AXI Timers.</center>

Add one Interrupt Controller.
![New Interrupt Controller](img/page_028_img_03.jpeg)
<center>Figure 47. New Interrupt Controller.</center>


### Step 2: Run Connection automation


### Step 3: Modify the Ports and connections
![Modifying Input Port](img/page_029_img_01.jpeg)
<center>Figure 48. Modifying Input Port.</center>

![Editing the parameters of AXI GPIO](img/page_029_img_02.jpeg)
<center>Figure 49. Editing the parameters of AXI GPIO for the pushbuttons.</center>

The Interruption from BTN is enabled.
![Check the values for the AXI timers](img/page_029_img_03.jpeg)
<center>Figure 50. Check the values for the AXI timers.</center>


### Step 4: Concatenation of Interruptions and connections
Add a Concat IP module
![New Concat Block](img/page_030_img_01.jpeg)
<center>Figure 51. New Concat Block.</center>

![Editing the Concat for 3 inputs](img/page_030_img_02.jpeg)
<center>Figure 52. Editing the Concat for 3 inputs.</center>

Connect the output interruption from Timers and BTN to the Concat inputs. Connect the output from the Concat to the input interruption of Interrupt Controller. Connect the output of the Interrupt Controller to the input interruption bus of the MicroBlaze processor. Check Validate the Design.
![Validating the design](img/page_030_img_03.jpeg)
<center>Figure 53. Validating the design.</center>

![Expected result](img/page_031_img_01.jpeg)
<center>Figure 54. Expected result.</center>


### Step 6: Synthesizing the system


### Step 7 (optional)
If the previous system was tested with a hello_world application and a sleep function, export new XSA file, test again the same example modifying the BSP options for the new timers included as sleep_timer.
![Adding the timers in the BSP Settings](img/page_031_img_02.jpeg)
<center>Figure 55. Adding the timers in the BSP Settings.</center>


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

