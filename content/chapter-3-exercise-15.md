---
title: "3.15 Exercise 15: Stream Buffers"
---

[Back to Chapter 3](chapter-3-freertos.md)

Exercise 15. Stream Bu(cid:431)ers
A producer task send message. A consumer task receives the message.
Step 1. Comment previous example.
Step 2. Libraries.
Code next lines.
#include "stream_buffer.h"
StreamBufferHandle_t xStreamBuffer;
//define the size of the buffer
#define BUFFER_SIZE 64
#define TRASMIT_SIZE 10
#define RECEIVE_SIZE_1 10
#define RECEIVE_SIZE_2 5
void ProducerTask(void *pvParameters);
void ConsumerTask(void *pvParameters);
Step 3. Start Up Task. Create the StreamBu(cid:431)er.
xStreamBuffer = xStreamBufferCreate(BUFFER_SIZE, 1); // 1 byte per item
if (xStreamBuffer == NULL)
{
xil_printf("Could not create stream buffer\n");
}
else
{
xil_printf("Stream buffer created\n");
}
// Create the tasks
xTaskCreate(ProducerTask, "Producer", configMINIMAL_STACK_SIZE, NULL, 1, NULL);
xTaskCreate(ConsumerTask, "Consumer", configMINIMAL_STACK_SIZE, NULL, 1, NULL);
@Marcos Martínez Peiró, Feb 25. Pag 96

---

Step 4. Producer and consumer tasks.
void ProducerTask(void *pvParameters) {
char data[] = "HolaRTOS!";
while (1) {
// Send data to the Stream Buffer
size_t bytesSent = xStreamBufferSend(xStreamBuffer, data, TRASMIT_SIZE,
pdMS_TO_TICKS(100));
if (bytesSent > 0) {
xil_printf("Producer: %d bytes enviados\n", bytesSent);
} else {
xil_printf("Producer: Error al enviar\n");
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
xil_printf("Consumer: Recibido '%s'\n", rxBuffer);
}
vTaskDelay(pdMS_TO_TICKS(500));
}
}
Change the value RECEIVE_SIZE_1 to RECEIVE_SIZE_2 and analyse the results.
@Marcos Martínez Peiró, Feb 25. Pag 97
