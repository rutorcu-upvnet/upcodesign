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

---

## Design I: Basic System

Microblaze is a soft IP core from Xilinx that will implement a microprocessor entirely within the Xilinx FPGA general purpose memory and logic fabric. For this tutorial, we are going to add a Microblaze IP block using the Vivado IP Integrator tool.

In addition to the Microblaze IP block, we would also like to make use of the DDR3 SDRAM component on the Genesys2. Therefore, a MIG (Memory Interface Generator) IP block will be added to our design.

Finally, a UART (universal asynchronous receiver/transmitter) IP block will be added to communicate between the host PC and the soft processor core running on the Genesys2.

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


## Design II: Improving the Architecture

In this section we will increase the complexity of the architecture, allowing the use of timers and interrupts. The advantages are obvious: it will allow the use of real-time operating systems or systems based on periodic interrupts.

### Step 14: [Adding New GPIO IP](chapter-1-step-14.md)

### Step 15: [Adding New Timers IP](chapter-1-step-15.md)

### Step 16: [Adding Interrupt Controller IP](chapter-1-step-16.md)

### Step 17: [Run Connection automation](chapter-1-step-17.md) (see Step 4)

### Step 18: [Concatenation of Interruptions and Connections](chapter-1-step-18.md)

### Step 19: [Design Validation](chapter-1-step-19.md)

### Step 20: [Generating Bitstream File](chapter-1-step-20.md) (see Step 11)

### Step 21: [Export the hardware](chapter-1-step-21.md) (see Step 12)

### Step 22: [Program the Device](chapter-1-step-22.md) (see Step 13)
