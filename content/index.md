---
title: "Firmware Development in Embedded Systems"
---

**Author:** Marcos Martínez Peiró (mpeiro@eln.upv.es)  
**Author:** Ruben Torres Curado (rutorcu@upvnet.upv.es)  
**Date:** February 2026  
**Institution:** Universitat Politècnica de València

## Contents

### [Chapter 1: Architecture Design of an Embedded System](chapter-1-architecture.md)

**Design I: Basic System**
- [New Project Wizard](chapter-1-step-1.md)
- [Create an IP Integrator Design](chapter-1-step-2.md)
- [Run Block Automation](chapter-1-step-3.md)
- [Run Connection Automation](chapter-1-step-4.md)
- [Validating Design and making an HDL Wrapper](chapter-1-step-5.md)
- [Modifying Constraints File (optional)](chapter-1-step-6.md)
- [GPIO Options](chapter-1-step-7.md)
- [MicroBlaze Options](chapter-1-step-8.md)
- [UART Lite Options](chapter-1-step-9.md)
- [MIG_7Series Options (optional)](chapter-1-step-10.md)
- [Generating Bitstream File](chapter-1-step-11.md)
- [Export the hardware](chapter-1-step-12.md)
- [Program the Device](chapter-1-step-13.md)

**Design II: Improving the Architecture**
- [Adding New GPIO IP](chapter-1-step-14.md)
- [Adding New Timers IP](chapter-1-step-15.md)
- [Adding Interrupt Controller IP](chapter-1-step-16.md)
- [Run Connection automation](chapter-1-step-17.md)
- [Concatenation of Interruptions and Connections](chapter-1-step-18.md)
- [Design Validation](chapter-1-step-19.md)
- [Generating Bitstream File](chapter-1-step-20.md)
- [Export the hardware](chapter-1-step-21.md)
- [Program the Device](chapter-1-step-22.md)

### [Chapter 2: BareMetal Software Development for MicroBlaze](chapter-2-baremetal.md)

- Exercise 1: [Hello MicroBlaze](chapter-2-exercise-1.md)
- Exercise 2: [Managing GPIO Part I](chapter-2-exercise-2.md)
- Exercise 3: [Managing GPIO Part II](chapter-2-exercise-3.md)
- Exercise 4: [Managing GPIO Part III](chapter-2-exercise-4.md) (Pushbutton and Interrupts)
- Exercise 5: [Managing the AXI Timer](chapter-2-exercise-5.md) (Polling)
- Exercise 6: [Managing the AXI Timer](chapter-2-exercise-6.md) (Interrupt)

### [Chapter 3: FreeRTOS on AMD Kintex7 FPGA](chapter-3-freertos.md)

- Exercise 1: [Creating a project with FreeRTOS](chapter-3-exercise-1.md)
- Exercise 2: [Creating Threads (Tasks)](chapter-3-exercise-2.md)
- Exercise 3: [Parameters and TaskControl: Delete Tasks](chapter-3-exercise-3.md)
- Exercise 4: [Use of LEDS. Duration of Tasks](chapter-3-exercise-4.md)
- Exercise 5: [TaskControl I: Using xTaskDelayUntil()](chapter-3-exercise-5.md)
- Exercise 6: [TaskControl II: Use of TaskSuspend(), TaskResume()](chapter-3-exercise-6.md)
- Exercise 7: [Queues](chapter-3-exercise-7.md)
- Exercise 8: [Queues with struct message sending](chapter-3-exercise-8.md)
- Exercise 9: [Use of xQueueReset()](chapter-3-exercise-9.md)
- Exercise 10: [Semaphores from ISR and Mutexes](chapter-3-exercise-10.md)
- Exercise 11: [Event Groups or Flags](chapter-3-exercise-11.md)
- Exercise 12: [Software Timers](chapter-3-exercise-12.md)
- Exercise 13: [Kernel Control](chapter-3-exercise-13.md)
- Exercise 14: [Task Notifications](chapter-3-exercise-14.md)
- Exercise 15: [Stream Buffers](chapter-3-exercise-15.md)
- Exercise 16: [Message Buffers](chapter-3-exercise-16.md)

### [Annex](annex.md)

