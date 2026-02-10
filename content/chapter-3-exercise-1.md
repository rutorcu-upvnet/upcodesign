---
title: "3.1 Exercise 1: Creating a project with FreeRTOS"
---

[Back to Chapter 3](chapter-3-freertos.md)

FREERTOS ON AMD KINTEX7 FPGA
Exercise 1: Creating a project with FreeRTOS.
1. Vivado: Create a timer to work like FreeRTOS SysTick.
2. Export the HW and launch a new Vitis platform with FreeRTOS OS for
Microblaze.
3. In BSP edit settings and select timers appropriately.
FreeRTOS Setup
@Marcos Martínez Peiró, Feb 25. Pag 64


![](img/page_065_img_01.jpeg)

![](img/page_065_img_02.jpeg)


---

![](img/page_066_img_01.jpeg)


ATTENTION: Some parameters have a real interest: maximum size of stack for
the tasks (2048 recommended to start), maximum number of priority (select
almost 16), pre-emption (True in the habitual way to work on RTOS), time-slicing
(False in the habitual way), even if you have troubles with some inner assertions
on the portability of FreeRTOS on AMD try to select False (only you have
experienced issues) in freertos_asserts parameter.
@Marcos Martínez Peiró, Feb 25. Pag 65
