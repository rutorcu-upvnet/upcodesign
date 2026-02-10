---
title: "3.8 Exercise 8: Queues with struct message sending"
---

[Back to Chapter 3](chapter-3-freertos.md)

Exercise 8. Queues with struct message sending.
Now we're going to create two queues, one with a struct message and a size
appropriate to the struct. A second one with struct pointer message and pointer
size.
The sender3 task sends messages to both queues, initializing the struct.
The receive2 task receives messages from both queues and displays them by
UART.
To do this, we carry out the following steps:
Step 1: We comment on the previous queue exercise.
Step 2: Create the Necessary Types
//types for queue example
QueueHandle_t xQueue = NULL;
struct AMessage
{
char ucMessageID;
char ucData[ 20 ];
} xMessage;
/* Queue used to send and receive complete struct AMessage structures. */
QueueHandle_t xStructQueue = NULL;
/* Queue used to send and receive pointers to struct AMessage structures. */
QueueHandle_t xPointerQueue = NULL;
TaskQueueParameters sender3Params = {"Sender 3",pdMS_TO_TICKS(1000), "Sender 3 is
running", 1};
TaskQueueParameters receiver2Params = {"Receiver 2",pdMS_TO_TICKS(1500), "Receiver 2
is running", 0};
TaskHandle_t xSender3TaskHandle = NULL;
TaskHandle_t xReceiver2TaskHandle = NULL;
Step 3: In the StartUp task we initialize the struct and create two queues.
xMessage.ucMessageID = 0xab;
memset( &( xMessage.ucData ), 0x12, 20 );
/* Create the queue used to send complete struct AMessage structures. This can
also be created after the schedule starts, but care must be task to ensure
nothing uses the queue until after it has been created. */
xStructQueue = xQueueCreate(
/* The number of items the queue can hold. */
10,
@Marcos Martínez Peiró, Feb 25. Pag 78

---

/* Size of each item is big enough to hold the<br /> whole structure. */
sizeof( xMessage ) );
configASSERT( xStructQueue );
/* Create the queue used to send pointers to struct AMessage structures. */
xPointerQueue = xQueueCreate(
/* The number of items the queue can hold. */
10,
/* Size of each item is big enough to hold only a pointer. */
sizeof( &xMessage ) );
configASSERT( xPointerQueue );
if( ( xStructQueue == NULL ) || ( xPointerQueue == NULL ) )
{
/* One or more queues were not created successfully as there was not enough
heap memory available. Handle the error here. Queues can also be created
statically. */
xil_printf( "Could not create queues\n" );
}
xTaskCreate( vSender3Task, "Sender3", 1024, &sender3Params, 8,
&xSender3TaskHandle);
xTaskCreate( vReceiver2Task, "Receiver2", 1024, &receiver2Params, 8,
&xReceiver2TaskHandle);
Step 4: Task sender3
void vSender3Task( void *pvParameters )
{
TaskQueueParameters *params = (TaskQueueParameters *)pvParameters;
BaseType_t xStatus;
// Inicialización de valores tipo caracter y string
// Inicializamos la estructura
//struct AMessage xMessage = {'A', "Hola, mundo!"};
// Imprimimos los valores
//xil_printf("Message ID: %c\n", xMessage.ucMessageID);
//xil_printf("Data: %s\n", xMessage.ucData);
/* As per most tasks, this task is implemented within an infinite loop. */
for( ;; )
{
xil_printf("%s: %s\n", params->taskName, params->message);
/* Declare the structure that will hold the values sent on the queue. */
struct AMessage *pxPointerToxMessage;
@Marcos Martínez Peiró, Feb 25. Pag 79

---

/* Send the entire structure to the queue created to hold 10 structures. */
xStatus=xQueueSend( /* The handle of the queue. */
xStructQueue,
/* The address of the xMessage variable. sizeof( struct AMessage )
bytes are copied from here into the queue. */
( void * ) &xMessage,
/* Block time of 0 says don't block if the queue is already full.
Check the value returned by xQueueSend() to know if the message
was sent to the queue successfully. */
( TickType_t ) 0 );
if( xStatus != pdPASS )
{
/* The send operation could not complete because the queue was full*/
xil_printf( "Could not send to the struct queue.\r\n" );
}
/* Store the address of the xMessage variable in a pointer variable. */
pxPointerToxMessage = &xMessage;
/* Send the address of xMessage to the queue created to hold 10 pointers. */
xStatus=xQueueSend( /* The handle of the queue. */
xPointerQueue,
/* The address of the variable that holds the address of xMessage.
sizeof( &xMessage ) bytes are copied from here into the queue. As
the
variable holds the address of xMessage it is the address of
xMessage
that is copied into the queue. */
( void * ) &pxPointerToxMessage,
( TickType_t ) 0 );
if( xStatus != pdPASS )
{
/* The send operation could not complete because the queue was full*/
xil_printf( "Could not send to the pointer queue.\r\n" );
}
vTaskDelay(params->delay);
}
}
@Marcos Martínez Peiró, Feb 25. Pag 80

---

Step 5: Task Receiver2.
void vReceiver2Task( void *pvParameters )
{
TaskQueueParameters *params = (TaskQueueParameters *)pvParameters;
BaseType_t xStatus;
struct AMessage xRxedStructure, *pxRxedPointer;
for( ;; )
{
xil_printf("%s: %s\n", params->taskName, params->message);
/* This call should always find the queue empty because this task will
immediately remove any data that is written to the queue. */
if( uxQueueMessagesWaiting( xStructQueue ) != 0 )
{
xil_printf( "xStructQueue have %d messages!\r\n",uxQueueMessagesWaiting(
xStructQueue ) );
}
if( xStructQueue != NULL )
{
/* Receive a message from the created queue to hold complex struct AMessage
structure. Block for 10 ticks if a message is not immediately available.
The value is read into a struct AMessage variable, so after calling
xQueueReceive() xRxedStructure will hold a copy of xMessage. */
if( xQueueReceive( xStructQueue,
&( xRxedStructure ),
( TickType_t ) 10 ) == pdPASS )
{
/* xRxedStructure now contains a copy of xMessage. */
// Imprimir Message ID en hexadecimal
xil_printf("Message ID received from struct: 0x%02X\n", (unsigned
char)xRxedStructure.ucMessageID);
// Imprimir los 20 bytes de ucData en hexadecimal
xil_printf("Data received from struct: ");
for (int i = 0; i < 20; i++)
{
xil_printf("0x%02X ", (unsigned char)xRxedStructure.ucData[i]);
}
xil_printf("\n");
}
}
if( xPointerQueue != NULL )
{
/* Receive a message from the created queue to hold pointers. Block for
10
ticks if a message is not immediately available. The value is read into a
@Marcos Martínez Peiró, Feb 25. Pag 81

---

![](img/page_083_img_01.jpeg)


pointer variable, and as the value received is the address of the
xMessage
variable, after this call pxRxedPointer will point to xMessage. */
if( xQueueReceive( xPointerQueue,
&( pxRxedPointer ),
( TickType_t ) 10 ) == pdPASS )
{
/* *pxRxedPointer now points to xMessage. */
// Imprimir valores
xil_printf("Message ID received from pointer: 0x%02X\n", (unsigned
char)pxRxedPointer->ucMessageID);
xil_printf("Data received from pointer: ");
for (int i = 0; i < 20; i++)
{
xil_printf("0x%02X ", (unsigned char)pxRxedPointer->ucData[i]);
}
xil_printf("\n");
}
}
vTaskDelay(params->delay);
}
}
