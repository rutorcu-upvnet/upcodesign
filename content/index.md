---
title: "Firmware Development in Embedded Systems"
---

**Author:** Marcos Martínez Peiró (mpeiro@eln.upv.es)  
**Date:** February 2025  
**Institution:** Universitat Politècnica de València

## Contents

### [Chapter 1: Architecture Design of an Embedded System](chapter-1-architecture.md)

**Design 1: Basic System**
- New Project Wizard
- Create an IP Integrator Design
- Run Block Automation
- Use Connection Automation
- Validating the Design and Creating an HDL Wrapper
- Modifying Constraints File
- GPIO, MicroBlaze, UART Lite Options
- MIG_7Series Options
- Generating Bit File
- Export Hardware and Program Device

**Design 2: Improving the Architecture**
- Adding new IPs
- Connection Automation
- Modify Ports and Connections
- Concatenation of Interruptions

### [Chapter 2: BareMetal Software Development for MicroBlaze](chapter-2-baremetal.md)

- **Exercise 1:** Hello MicroBlaze
- **Exercise 2:** Managing GPIO - Part I
- **Exercise 3:** Managing GPIO - Part II
- **Exercise 4:** Managing GPIO - Part III (Pushbutton and Interruptions)
- **Exercise 5:** Managing the AXI Timer - POLLING
- **Exercise 6:** Managing the AXI Timer - INTERRUPT

### [Chapter 3: FreeRTOS on AMD Kintex7 FPGA](chapter-3-freertos.md)
@Marcos Martínez Peiró, Feb 25. Pag 2

---

Exercise 1: Creating a project with FreeRTOS. ............................................ 64
Exercise 2: Creating Threads (Tasks) ......................................................... 66
Exercise 3: Parameters and TaskControl: Delete Tasks. .............................. 69
- **Exercise 1:** Creating a project with FreeRTOS
- **Exercise 2:** Creating Threads (Tasks)
- **Exercise 3:** Parameters and TaskControl - Delete Tasks
- **Exercise 4:** Use of LEDs - Duration of Tasks
- **Exercise 5:** TaskControl I - Using xTaskDelayUntil()
- **Exercise 6:** TaskControl II - Use of TaskSuspend(), TaskResume()
- **Exercise 7:** Queues
- **Exercise 8:** Queues with struct message sending
- **Exercise 9:** Use of xQueueReset()
- **Exercise 10:** Semaphores from ISR and Mutexes
- **Exercise 11:** Event Groups or Flags
- **Exercise 12:** Software Timers
- **Exercise 13:** Kernel Control
- **Exercise 14:** Task Notifications
- **Exercise 15:** Stream Buffers
- **Exercise 16:** Message Buffers

### [Annex](annex.md)

---

*© Marcos Martínez Peiró, Feb 25*
