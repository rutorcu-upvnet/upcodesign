---
title: "3.15 Exercise 15: Stream Buffers"
---

[Previous: Exercise 14](chapter-3-exercise-14.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Stream Buffers: Setup and Configuration</h2>

> [!note] Objectives
> Understand Stream Buffers in `FreeRTOS`.<br>
> A producer task sends a message. A consumer task receives the message.<br>

> [!warning] Comment out the previous exercise code before starting

Add the required library, define the stream buffer handle, buffer sizes, and task prototypes:

```c
#include "stream_buffer.h"

StreamBufferHandle_t xStreamBuffer;

// Define the size of the buffer
#define BUFFER_SIZE 64
#define TRASMIT_SIZE 10
#define RECEIVE_SIZE_1 10
#define RECEIVE_SIZE_2 5

void ProducerTask(void *pvParameters);
void ConsumerTask(void *pvParameters);
```

In the StartUp task, create the Stream Buffer and the tasks:

```c
xStreamBuffer = xStreamBufferCreate(BUFFER_SIZE, 1); // 1 byte per item

if (xStreamBuffer == NULL) {
    xil_printf("Could not create stream buffer\n");
} else {
    xil_printf("Stream buffer created\n");
}

// Create the tasks
xTaskCreate(ProducerTask, "Producer", configMINIMAL_STACK_SIZE, NULL, 1, NULL);
xTaskCreate(ConsumerTask, "Consumer", configMINIMAL_STACK_SIZE, NULL, 1, NULL);
```

</div>
<div class="step" data-step="2">
<h2>Producer and Consumer Tasks</h2>

Implement the producer and consumer tasks using `xStreamBufferSend()` and `xStreamBufferReceive()`. Add the producer and consumer task functions:

```c
void ProducerTask(void *pvParameters) {
    char data[] = "HolaRTOS!";
    while (1) {
        // Send data to the Stream Buffer
        size_t bytesSent = xStreamBufferSend(xStreamBuffer, data, TRASMIT_SIZE,
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
    char rxBuffer[RECEIVE_SIZE_1];
    while (1) {
        // Read Stream Buffer Data
        size_t bytesReceived = xStreamBufferReceive(xStreamBuffer, rxBuffer,
            RECEIVE_SIZE_1, pdMS_TO_TICKS(500));
        if (bytesReceived > 0) {
            rxBuffer[bytesReceived] = '\0'; // Ensure that it is a valid string
            xil_printf("Consumer: Received '%s'\n", rxBuffer);
        }
        vTaskDelay(pdMS_TO_TICKS(500));
    }
}
```

> [!error] Check
> Change the value `RECEIVE_SIZE_1` to `RECEIVE_SIZE_2` and analyse the results.

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

[Next: Exercise 16](chapter-3-exercise-16.md)
