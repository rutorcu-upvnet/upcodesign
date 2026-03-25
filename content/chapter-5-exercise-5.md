---
title: "5.5 Exercise 5: TCP Socket and Debugging"
---

[Previous: Exercise 4](chapter-5-exercise-4.md)

> [!abstract] Exercise
> Code an application that opens a TCP socket in an arbitrary port (port 1511 for instance) and listens to messages from the computer. In the computer, open Hercules, open a TCP socket and send a number from 0 to 7. Depending on the number being sent, the corresponding LED will be toggled (if it is off, then it turns on and viceversa).

## Linux TCP Socket References

- Linux socket API overview: https://man7.org/linux/man-pages/man7/socket.7.html
- `bind()` manual: https://man7.org/linux/man-pages/man2/bind.2.html
- `recv()` manual: https://man7.org/linux/man-pages/man2/recv.2.html
- Beej's Guide (practical tutorial): https://beej.us/guide/bgnet/

## Summary: Functions to Bind and Receive Data

For a TCP server flow in Linux, the usual sequence is:

1. `socket(AF_INET, SOCK_STREAM, 0)` creates the TCP socket descriptor.
2. `bind(fd, (struct sockaddr *)&addr, sizeof(addr))` assigns local IP/port (for example, port `1511`).
3. `listen(fd, backlog)` marks the socket as passive (server mode).
4. `accept(fd, ...)` returns a new connected socket for one client.
5. `recv(client_fd, buffer, size, 0)` reads incoming bytes from the client.

>[!info] Additional information about TCP sockets in Linux
> - Use `htons(port)` and `htonl(INADDR_ANY)` when filling `sockaddr_in`.
> - `bind()` fails if the port is already in use.
> - `recv()` returns `> 0` bytes read, `0` when peer closed connection, and `< 0` on error.

## Debugging Applications in Vitis

Besides just running your application, you can also debug it step by step.
This is done in exactly the same way as when running normally your application, but instead of clicking on *Run*, click on *Debug* and the debugging interface should appear, breaking at the start of the `main()` function.

> [!note]
> You can put breakpoints by double-clicking on the lines of the editor, just like in any other editor.

> [!warning]
> In case your application is not entering debug mode, make sure to disable any optimization flag (-O0) and enable the debug information flag (-g3).

## Question 4

> [!question] Question 4
> Which window in the Vitis layout makes you able to watch expressions or variables while running your code?

---

[Next: Exercise 6](chapter-5-exercise-6.md)
