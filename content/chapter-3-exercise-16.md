---
title: "3.16 Exercise 16: Message Buffers"
---

[Back to Chapter 3](chapter-3-freertos.md)

Exercise 16. Message Bu(cid:431)ers.
Step 1. Comment previous example.
Step 2. Libraries.
#include "message_buffer.h"
MessageBufferHandle_t xMessageBuffer;
#define BUFFER_SIZE 64
#define TRANSMIT_SIZE 10
#define RECEIVE_SIZE 5
#define RECEIVE_SIZE_2 10
void ProducerTask(void *pvParameters);
void ConsumerTask(void *pvParameters);
Step 3. Start Up Task. Create the MessageBu(cid:431)er.
xMessageBuffer = xMessageBufferCreate(BUFFER_SIZE);
if (xMessageBuffer == NULL)
{
xil_printf("Could not create message buffer\n");
}
else
{
xil_printf("Message buffer created\n");
}
// Create the tasks
xTaskCreate(ProducerTask, "Producer", configMINIMAL_STACK_SIZE, NULL, 1, NULL);
xTaskCreate(ConsumerTask, "Consumer", configMINIMAL_STACK_SIZE, NULL, 1, NULL);
@Marcos Martínez Peiró, Feb 25. Pag 98

---

Step 4. Producer and consumer tasks.
Play with the di(cid:431)erent sizes of the receive message and explain the results.
void ProducerTask(void *pvParameters) {
char message[] = "HolaRTOS!";
while (1) {
// Send message to Message Buffer
size_t bytesSent = xMessageBufferSend(xMessageBuffer, message, TRANSMIT_SIZE,
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
char rxBuffer[RECEIVE_SIZE_2];
while (1) {
// Receiving Message from Message Buffer
size_t bytesReceived = xMessageBufferReceive(xMessageBuffer, rxBuffer,
RECEIVE_SIZE_2, pdMS_TO_TICKS(500));
if (bytesReceived > 0) {
rxBuffer[bytesReceived] = '\0'; // Ensure that it is a valid string
xil_printf("Consumer: Recibido '%s'\n", rxBuffer);
}
vTaskDelay(pdMS_TO_TICKS(500));
}
}
@Marcos Martínez Peiró, Feb 25. Pag 99
