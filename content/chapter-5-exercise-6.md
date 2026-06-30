---
title: "5.6 Exercise 6: Add Your App to a Production Image"
---

[Previous: Exercise 5](chapter-5-exercise-5.md)

> [!abstract] Exercise
> Add your software to a production image so it is available in the final rootfs without transferring binaries manually after boot.

## EXTRA: Add Your Software to a Production Image

If you have reached this section before the session ended, congratulations! This last section is dedicated to including your source code that you made on Vitis in the previous section inside the Petalinux image, so that it is readily available to anyone that flashes your OS image (the .mcs file) without having to transfer the application afterwards through Ethernet like we did.

Petalinux Tools is Yocto-based, meaning that it works through recipes. To add a new software component, we need to add a new recipe.

## Create Recipe and Add Source Files

1. Create a new application recipe:

```shell
petalinux-create -t apps --template c -n my-gpio-app --enable
```

2. The new application source code should be created in `project-spec/meta-user/recipes-apps/my-gpio-app`. Inside this folder, there should be a `.bb` file and a folder called `files`. Open the `files` folder.
3. Copy all your source code files inside the `files` folder, erasing all the `.c` and `.h` files that were there, MAKING SURE THAT YOU LEAVE THE MAKEFILE.

> [!question] Question 5
> Open the Makefile file, what does the *CC* variable stand for? How can we get its value?

4. Open the aforementioned `.bb` file. This file contains a list of all the files that will be used to build your application in the form of an environment variable called `SRC_URI`.
5. You need to point all the files you included in the `SRC_URI` files using the URI format that is usually used in web browsers, so `file://<file-name>`. These files are taken with respect to the route of the `files` folder, so if the files are already in the `files` folder and not in any subdirectory, you just have to specify the file name.

## Build the Application Recipe

6. After that, we can make a quick test to see if our application is building correctly. This can be done by using the `petalinux-build` command with a `-c` parameter which indicates that we only want to build a specific component of our system. The name that you put in the `-c` is the same as the one you used to create the application in step 1.

```shell
petalinux-build -c my-gpio-app
```

7. If the application built successfully, congratulations! You got your application included in the root file system of your Linux image. This means that if you make a new `.mcs` file after running `petalinux-build`, you will get this application directly included in your rootfs.

---

[Back to Chapter 5](chapter-5-vitis-applications.md)
