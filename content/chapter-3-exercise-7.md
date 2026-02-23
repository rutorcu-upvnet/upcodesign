---
title: "3.7 Exercise 7: Queues"
---

[Previous: Exercise 6](chapter-3-exercise-6.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Queues</h2>

This example demonstrates creating a queue, sending data to the queue from multiple tasks, and receiving data from the queue. The queue is created to hold data items of type int32_t. The tasks that send to the queue do not specify a block time, whereas the task that receives from the queue does.

Include the queues library
```c
#include "queue.h"
```

Add function prototypes
```c
void vSenderTask( void *pvParameters );
void vReceiverTask( void *pvParameters );
```

</div>
<div class="step" data-step="2">
<h2>Queue parameters</h2>

Add a new struct with values needed by the sender and receive tasks
```c
// Structure for the sender and receiver example
typedef struct {
	const char *taskName;
	TickType_t delay;
	const char *message;
	int32_t lValue;
} TaskQueueParameters;
```
Generate variables for two senders (producers) and one receiver (consumer). One sender sends number 100 at the beginning and then increments this value in each iteration. Second sender start sending the value 200. All tasks have the same period of 1sec.

```c
TaskQueueParameters sender1Params = {"Sender 1",pdMS_TO_TICKS(1000), "Sender 1 is running", 100};
TaskQueueParameters sender2Params = {"Sender 2",pdMS_TO_TICKS(1000), "Sender 2 is running", 200};
TaskQueueParameters receiverParams = {"Receiver",pdMS_TO_TICKS(1000), "Receiver is running", 0};
```

</div>
<div class="step" data-step="3">
<h2>Queue types and variables</h2>

Types for the Queue
```c
//types for queue example
QueueHandle_t xQueue = NULL;
```

Task Handlers
```c
TaskHandle_t xSender1TaskHandle = NULL;
TaskHandle_t xSender2TaskHandle = NULL;
TaskHandle_t xReceiverTaskHandle = NULL;
```

Modify the body of `vTaskStartUp` to create the queue. Queue size is 10 items of 32 bits:
```c
xQueue = xQueueCreate( 10, sizeof( int32_t ) );
```

Into the Startup task, create the three tasks of the exercise. The sender tasks share the same function body but different parameters. Priorities for sender tasks are 1 and for the receiver 2. Size of stack could be 1024 words:
```c
if( xQueue != NULL )
{
    xTaskCreate( vSenderTask, "Sender1", 1024, &sender1Params, 1, &xSender1TaskHandle );
    xTaskCreate( vSenderTask, "Sender2", 1024, &sender2Params, 1, &xSender2TaskHandle );
    xTaskCreate( vReceiverTask, "Receiver", 1024, &receiverParams, 2, &xReceiverTaskHandle );
}
else
{
    /* The queue could not be created. */
    xil_printf( "Could not create queue\n" );
}
```

</div>
<div class="step" data-step="4">
<h2>Sender Task</h2>

Body of the sender task
```c
void vSenderTask( void *pvParameters )
{
    TaskQueueParameters *params = (TaskQueueParameters *)pvParameters;
    int32_t lValueToSend;
    BaseType_t xStatus;

    /* The queue was created to hold values of type int32_t,
       so cast the parameter to the required type. */
    lValueToSend = ( int32_t ) params->lValue;

    for( ;; )
    {
        xil_printf("%s: %s\n", params->taskName, params->message);
        xil_printf("The value to send is %d\n", lValueToSend);

        /* Send the value to the queue.
           1st param: the queue to which data is being sent.
           2nd param: the address of the data to be sent.
           3rd param: the Block time - time the task should be kept in
           the Blocked state to wait for space to become available. */
        xStatus = xQueueSendToBack( xQueue, &lValueToSend, 0 );

        if( xStatus != pdPASS )
        {
            /* The send operation could not complete because the queue was full. */
            xil_printf( "Could not send to the queue.\r\n" );
        }

        lValueToSend++;
        vTaskDelay(params->delay);
    }
}
```

</div>

<div class="step" data-step="5">
<h2>Receiver Task</h2>

Body of the receiver task
```c
void vReceiverTask( void *pvParameters )
{
    /* Declare the variable that will hold the values received from the queue. */
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
            xil_printf( "Queue have %d messages!\r\n", uxQueueMessagesWaiting( xQueue ) );
        }

        /* Receive data from the queue.
           1st param: the queue from which data is to be received.
           2nd param: the buffer into which the received data will be placed.
           Last param: the block time – max time the task will remain in the
           Blocked state to wait for data to be available. */
        xStatus = xQueueReceive( xQueue, &lReceivedValue, xTicksToWait );

        if( xStatus == pdPASS )
        {
            /* Data was successfully received from the queue, print out the received value. */
            xil_printf( "Received = %d\n", lReceivedValue );
        }
        else
        {
            /* Data was not received from the queue even after waiting for xTicksToWait ms. */
            xil_printf("Could not receive from the queue.\r\n" );
        }

        vTaskDelay(params->delay);
    }
}
```

> [!warning] Build and test your application

</div>

<div class="navigation">
	<button id="prevBtn">Previous</button>
	<div class="step-indicator">
		<span><span id="currentStep">1</span> of <span id="totalSteps">4</span></span>
	</div>
	<button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Exercise 8](chapter-3-exercise-8.md)
