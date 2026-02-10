---
title: "3.7 Exercise 7: Queues"
---

[Back to Chapter 3](chapter-3-freertos.md)

Exercise 7. Queues.
First don’t create the previous Tasks to “clean” the serial terminal: comment
creation tasks.
This example demonstrates creating a queue, sending data to the queue from
multiple tasks, and receiving data from the queue. The queue is created to hold data
items of type int32_t. The tasks that send to the queue do not specify a block time,
whereas the task that receives from the queue does.
Step1. Libraries
#include "queue.h"
Step 2: function prototypes
void vSenderTask( void *pvParameters );
void vReceiverTask( void *pvParameters );
Step 3: (optional) Struct with values needed by the sender and receive tasks
// Structure for the sender and receiver example
typedef struct {
const char *taskName;
TickType_t delay;
const char *message;
int32_t lValue;
} TaskQueueParameters;
Step 4. Task Parameters
Two Senders (producers) and one receiver (consumer). One Sender sends number
100 at the beginning and then increments this value in each iteration. Second
sender start sending the value 200.
All tasks have the same period of 1sec.
TaskQueueParameters sender1Params = {"Sender 1",pdMS_TO_TICKS(1000), "Sender 1 is
running", 100};
TaskQueueParameters sender2Params = {"Sender 2",pdMS_TO_TICKS(1000), "Sender 2 is
running", 200};
TaskQueueParameters receiverParams = {"Receiver",pdMS_TO_TICKS(1000), "Receiver is
running", 0};
Step 5. Types for the Queue
//types for queue example
@Marcos Martínez Peiró, Feb 25. Pag 74

---

QueueHandle_t xQueue = NULL;
Step 6. Task Handlers (optional).
TaskHandle_t xSender1TaskHandle = NULL;
TaskHandle_t xSender2TaskHandle = NULL;
TaskHandle_t xReceiverTaskHandle = NULL;
Step 7. Modify the body of TaskStartUp to create the queue.
Queue size is 10 items of 32 bits
xQueue = xQueueCreate( 10, sizeof( int32_t ) );
Next, into the Startup task creation of the three tasks of the exercise. The sender
tasks share the same function body but di(cid:431)erent parameters. Priorities for tasks are
1 and for the receiver 2. Size of stack could be 1024 words.
if( xQueue != NULL )
{
xTaskCreate( vSenderTask, "Sender1", 1024, &sender1Params, 1, &xSender1TaskHandle
);
xTaskCreate( vSenderTask, "Sender2", 1024, &sender2Params, 1, &xSender2TaskHandle
);
xTaskCreate( vReceiverTask, "Receiver", 1024, &receiverParams, 2,
&xReceiverTaskHandle );
}
else
{
/* The queue could not be created. */
xil_printf( "Could not create queue\n" );
}
@Marcos Martínez Peiró, Feb 25. Pag 75

---

Step 8. Body of senders’ tasks.
void vSenderTask( void *pvParameters )
{
TaskQueueParameters *params = (TaskQueueParameters *)pvParameters;
int32_t lValueToSend;
BaseType_t xStatus;
/* The queue was created to hold values of type int32_t, so cast the parameter to the
required type. */
lValueToSend = ( int32_t ) params->lValue;
for( ;; )
{
xil_printf("%s: %s\n", params->taskName, params->message);
xil_printf("The value to send is %d\n", lValueToSend);
/* Send the value to the queue.
The first parameter is the queue to which data is being sent. The queue was
created before the scheduler was started, so before this task started to execute.
The second parameter is the address of the data to be sent, in this case the
address of lValueToSend.
The third parameter is the Block time – the time the task should be kept in the
Blocked state to wait for space to become available on the queue*/
xStatus = xQueueSendToBack( xQueue, &lValueToSend, 0 );
if( xStatus != pdPASS )
{
/* The send operation could not complete because the queue was full.*/
xil_printf( "Could not send to the queue.\r\n" );
}
lValueToSend++;
vTaskDelay(params->delay);
}
}
@Marcos Martínez Peiró, Feb 25. Pag 76

---

Step 9. Body of the receiver task.
void vReceiverTask( void *pvParameters )
{
/* Declare the variable that will hold the values received from the
queue. */
TaskQueueParameters *params = (TaskQueueParameters *)pvParameters;
int32_t lReceivedValue;
BaseType_t xStatus;
const TickType_t xTicksToWait = pdMS_TO_TICKS( 100 );
for( ;; )
{
xil_printf("%s: %s\n", params->taskName, params->message);
/* This call should always find the queue empty because this task will
immediately remove any data that is written to the queue. */
if( uxQueueMessagesWaiting( xQueue ) != 0 )
{
xil_printf( "Queue have %d messages!\r\n",uxQueueMessagesWaiting( xQueue ) );
}
/* Receive data from the queue.
The first parameter is the queue from which data is to be received.
The queue is created before the scheduler is started, and therefore
before this task runs for the first time.
The second parameter is the buffer into which the received data will
be placed. In this case the buffer is simply the address of a
variable that has the required size to hold the received data.
The last parameter is the block time – the maximum amount of time
that the task will remain in the Blocked state to wait for data to
be available should the queue already be empty. */
xStatus = xQueueReceive( xQueue, &lReceivedValue, xTicksToWait );
if( xStatus == pdPASS )
{
/* Data was successfully received from the queue, print out the
received value. */
xil_printf( "Received = %d\n", lReceivedValue );
}
else
{
/* Data was not received from the queue even after waiting for
xTicksToWait ms.*/
xil_printf("Could not receive from the queue.\r\n" );
}
vTaskDelay(params->delay);
}
}
@Marcos Martínez Peiró, Feb 25. Pag 77
