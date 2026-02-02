---
title: "Annex"
---

[Back to Index](index.md)

Annex 1.
Solution to exercise GPIO LEDs.
#ifdef GPIO_EXAMPLE_2
xil_printf("Successfully ran GPIO PLAYING LEDS\n\r",i);
/* Read Switches */
SW_read = XGpio_DiscreteRead(&Gpio_sw_led, SW_CHANNEL);
xil_printf("\n\r Valor de SW: %lu \n\r", (unsigned long) SW_read);
/* Set the LED to the value of the switches */
LED_write = SW_read;
/* Playing with leds...if any SW is ON one led start lighthing from led0 to led7 with
a LED_DELAY * if all SW are OFF there is a light game on leds lighting odds or
evens with a LED_DELAY */
LED_write = 0x00000001;
if (SW_read!=0){
// Turn on one LED at a time and move it
for (int i = 0; i < 8; i++) {
XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, 1 << i);
usleep(LED_DELAY_2); // 0.1 segundos
XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, 0x00); // Turn off before the
next
}
for (int i = 6; i >= 0; i--) {
XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, 1 << i);
usleep(LED_DELAY_2); // 0.1 segundos
XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, 0x00); // Turn off before the
next
}
}
else{
LED_write = 0x000000AA;
XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, LED_write);
usleep(LED_DELAY_2);
LED_write = 0x00000055;
XGpio_DiscreteWrite(&Gpio_sw_led, LED_CHANNEL, LED_write);
usleep(LED_DELAY_2);
}
#endif // GPIO_EXAMPLE_2
@Marcos Martínez Peiró, Feb 25. Pag 100
