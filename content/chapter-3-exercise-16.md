---
title: "3.16 Exercise 16: Message Buffers"
---

[Previous: Exercise 15](chapter-3-exercise-15.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Message Buffers: Setup and Configuration</h2>

> [!note] Objectives
> Understand Message Buffers in FreeRTOS.<br>
> Unlike Stream Buffers, Message Buffers preserve message boundaries.<br>

> [!warning] Comment out the previous exercise code before starting

Add the required library, define the message buffer handle, sizes, and task prototypes:

```c
#include "message_buffer.h"

MessageBufferHandle_t xMessageBuffer;

#define BUFFER_SIZE 64
#define TRANSMIT_SIZE 10
#define RECEIVE_SIZE 5
#define RECEIVE_SIZE_2 10

void ProducerTask(void *pvParameters);
void ConsumerTask(void *pvParameters);
```

In the StartUp task, create the Message Buffer and the tasks:

```c
xMessageBuffer = xMessageBufferCreate(BUFFER_SIZE);

if (xMessageBuffer == NULL) {
    xil_printf("Could not create message buffer\n");
} else {
    xil_printf("Message buffer created\n");
}

// Create the tasks
xTaskCreate(ProducerTask, "Producer", configMINIMAL_STACK_SIZE, NULL, 1, NULL);
xTaskCreate(ConsumerTask, "Consumer", configMINIMAL_STACK_SIZE, NULL, 1, NULL);
```

</div>
<div class="step" data-step="2">
<h2>Producer and Consumer Tasks</h2>

Implement the producer and consumer tasks using `xMessageBufferSend()` and `xMessageBufferReceive()`. Add the producer and consumer task functions:

```c
void ProducerTask(void *pvParameters) {
    char message[] = "HolaRTOS!";
    while (1) {
        // Send message to Message Buffer
        size_t bytesSent = xMessageBufferSend(xMessageBuffer, message, TRANSMIT_SIZE,
            pdMS_TO_TICKS(100));
        if (bytesSent > 0) {
            xil_printf("Producer: %d bytes sent\n", bytesSent);
        } else {
            xil_printf("Producer: Error sending\n");
        }
        vTaskDelay(pdMS_TO_TICKS(1000)); // Wait 1s before sending again
    }
}

void ConsumerTask(void *pvParameters) {
    char rxBuffer[RECEIVE_SIZE_2];
    while (1) {
        // Receiving Message from Message Buffer
        size_t bytesReceived = xMessageBufferReceive(xMessageBuffer, rxBuffer,
            RECEIVE_SIZE_2, pdMS_TO_TICKS(500));
        if (bytesReceived > 0) {
            rxBuffer[bytesReceived] = '\0'; // Ensure that it is a valid string
            xil_printf("Consumer: Received '%s'\n", rxBuffer);
        }
        vTaskDelay(pdMS_TO_TICKS(500));
    }
}
```

> [!error] Check
> Play with the different sizes of the receive message (`RECEIVE_SIZE` vs `RECEIVE_SIZE_2`) and explain the results.

</div>
<div class="navigation">
	<button id="prevBtn">Previous</button>
	<div class="step-indicator">
		<span><span id="currentStep">1</span> of <span id="totalSteps">2</span></span>
	</div>
	<button id="nextBtn">Next</button>
</div>

</div>

---

[Back to Chapter 3](chapter-3-freertos.md)
