---
title: "5.1 Exercise 1: Patching the Bootloader"
---

[Back to Chapter 5](chapter-5-vitis-applications.md)

<script src="./static/step-navigation.js"></script>
<link rel="stylesheet" href="./static/step-navigation.css" />

<div class="step-container">

<div class="step active" data-step="1">
<h2>Patching the Bootloader: Why and How</h2>

Before entering into coding a new application for ourselves, we will enter into the world of patching, that is, picking some code and changing it to our liking to add new features or fix nasty bugs.

In Petalinux Tools, or in Yocto in general, there is the devtool concept, where the tools will download a specific source code of a software and will leave it inside the project locally so that you can change whichever part of the code you want.
Then, after the changes have been made, when issuing the `petalinux-build`, instead of pulling the source code from the repository, the local copy with your changes will be used.

This is a very convenient way to test small changes done to other people's software without having to pull their repositories in a separate directory, all of this is already integrated inside Yocto.

We are going to patch the bootloader of Microblaze, defined as the first piece of software that the Microblaze CPU runs when booting up the system. This bootloader is a very small piece of software that must fit into the BlockRAMs, so having as little code as possible and as optimized as possible for our use case is crucial.
</div>

<div class="step" data-step="2">
<h2>Patch Flow with petalinux-devtool</h2>

1. Pull the source code using `petalinux-devtool`:

```shell
petalinux-devtool modify fs-boot
```

2. The previous command will download the source code in `components/yocto/workspace/sources/fs-boot`. Go to that folder.
3. There, you will find the source code of the first stage bootloader. The `main()` function of this bootloader is in `components/yocto/workspace/sources/fs-boot/lib/sw_apps/mba_fs_boot`. Open the file *fs-boot.c*.
4. Make some modification, like for example adding a `printf` at the beginning of the `main()`.
5. Now, we could build the Petalinux image and test this change, no more steps are needed. However, we are going to complete the flow now.
</div>

<div class="step" data-step="3">
<h2>Generate and Export Patch Files</h2>

6. The pull that devtool does gives a repository as a result, meaning that when you make changes you can commit them. Each one of these commits will be transformed into a `.patch` file.

```shell
git add -A
git commit -m "My Patched changes"
```

7. Once the commits are done, run the other relevant `petalinux-devtool` command variant:

```shell
petalinux-devtool finish fs-boot <absolute route to the project>/project-spec/meta-user
```

8. Now, inside `project-spec/meta-user/recipes-bsp/fs-boot`, there should be a `.patch` file for each commit you made. Find in the following link an example of a [patch file](https://github.com/Xilinx/embeddedsw/commit/08ebf27b381f3f21a9e961363d3a9505e3d49a21.patch).

> [!question] Question 1
> What does the different lines in .patch file mean?
> - Header of the file
> - List of the different files being modified
> - Plus and minus marks on each of the lines of the file.
</div>

<div class="navigation">
  <button id="prevBtn">Previous</button>
  <div class="step-indicator">
    <span><span id="currentStep">1</span> of <span id="totalSteps">3</span></span>
  </div>
  <button id="nextBtn">Next</button>
</div>

</div>

---

[Next: Exercise 2](chapter-5-exercise-2.md)
