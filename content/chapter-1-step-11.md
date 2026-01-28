---
title: "1.11: Generating Bitstream File"
---

[← Previous: Step 10](chapter-1-step-10.md)

<script src="./static/step-navigation.js"></script>

<style>
.step-container {
  max-width: 800px;
  margin: 2rem auto;
}

.step {
  display: none;
  padding: 2rem;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  background-color: var(--light);
}

.step.active {
  display: block;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.step h2 {
  margin-top: 0;
  color: var(--secondary);
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

button {
  padding: 0.7rem 1.5rem;
  background-color: var(--secondary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: var(--tertiary);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.step-indicator {
  text-align: center;
  font-weight: bold;
  color: var(--darkgray);
}
</style>

<div class="step-container">

<div class="step active" data-step="1">
<h2>Generate Bitstream</h2>

By selecting Generate bitstream, all the synthesis process will start. This may take 5 to 20 minutes depending on your system performance.

![Generate bitstream](img/figure_0039.png)

<center><em>Figure 39. Generate bitstream.</em></center><br>
</div>

<div class="step" data-step="2">
<h2>Archive Project</h2>

Save the Project. There are many options to save it. Go to `File` > `Project` > `Archive`.

![Archive Project](img/figure_0040.png)

<center><em>Figure 40. Archive Project.</em></center><br>
</div>

<div class="step" data-step="3">
<h2>Save Archive</h2>

TCL scripts are available. Select a name for your project and archive it. Check `Include run results` to accelerate further compilations.

![Archive Project Options](img/figure_0041.jpeg)

<center><em>Figure 41. Archive Project Options.</em></center><br>
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

[Next: Chapter Summary](chapter-1-architecture.md)
