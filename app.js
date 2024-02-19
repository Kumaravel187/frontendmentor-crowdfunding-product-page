"use strict"; // Enforce stricter parsing and error handling

// Select DOM elements
const mobileMenuBtn = document.querySelector("#mobile-menu"); // Button for mobile menu
const flexEl = document.querySelector("#flex"); // Container element with flex display
const selectRewardEl = document.querySelectorAll("#select-reward"); // Buttons for selecting rewards
const modalEl = document.querySelector("#section-modal"); // Modal element
const overlayEl = document.querySelector(".overlay");

// Function to handle the continue button logic
const continueButton = (radio, btnNum) => {
  const newBorderColor = "1px solid hsl(176, 50%, 47%)"; // New border color for selected item
  const radioParentEl = radio.closest(".grid-item"); // Parent element of the radio button
  radioParentEl.style.border = newBorderColor; // Update border color
  // Append pledge input and continue button to the DOM
  radioParentEl.innerHTML += `
          <hr class="line">
          <div class="grid-item__pledge-container">
          <p class="pledge">enter your pledge</p>
          <div class="pledge-inputs">
          <input class="pledge-input-${btnNum}" type="number" placeholder="$">
          <button class ="continue-btn-${btnNum}">continue</button>
          </div>
          </div>`;

  // Select the newly added continue button
  const continueBtnEl = document.querySelector(`.continue-btn-${btnNum}`);

  // Add event listener to the continue button
  continueBtnEl.addEventListener("click", () => {
    const inputEl = document.querySelector(`.pledge-input-${btnNum}`); // Select the pledge input
    if (inputEl.value) {
      // Check if input has a value
      // Center align modal content
      modalEl.style.alignItems = "center";
      modalEl.style.textAlign = "center";

      modalEl.classList.add("finished");
      // Update modal content to show success message
      modalEl.innerHTML = `
      <img class="check" src="./images/icon-check.svg">
      <h3 class="support">thanks for your support </h3>
      <p class = "pledge-support">Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed</p>
      <button id="completed" class="completed">got it!</button>
      `;

      // Select the 'got it' button
      const completeBtnEl = document.querySelector("#completed");
      completeBtnEl.addEventListener("click", () => {
        modalEl.classList.remove("flex");
        overlayEl.classList.remove("flex");
        modalEl.classList.remove("finished");
      });
    }
  });
};

// Event listener for mobile menu button
mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("menu-open"); // Toggle menu open/close
  flexEl.classList.toggle("flex"); // Toggle flex class on container
  overlayEl.classList.toggle("flex");

  // Update mobile menu button icon based on open/close state
  const isOpen = mobileMenuBtn.classList.contains("menu-open");
  mobileMenuBtn.src = isOpen
    ? "./images/icon-close-menu.svg"
    : "./images/icon-hamburger.svg";
});

// Event listeners for select reward buttons
selectRewardEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalEl.classList.add("flex"); // Show modal
    const radioBtnElements = modalEl.querySelectorAll(".pledge"); // Select all pledge radio buttons
    const modalCloseBtnEl = modalEl.querySelector("#modal-close-btn"); // Select modal close button
    const gridItemEl = modalEl.querySelectorAll(".grid-item"); // Select all grid items
    overlayEl.classList.add("flex");

    // Event listener for radio button changes
    radioBtnElements.forEach((radio) => {
      const newBorderColor = "1px solid hsl(176, 50%, 47%)"; // New border color for selected item
      const defaultBorderColor = "1px solid #dcdcdc"; // Default border color

      radio.addEventListener("change", () => {
        gridItemEl.forEach((grid) => {
          grid.style.border = defaultBorderColor; // Reset border color for all grid items
        });

        if (radio.id === "noreward") {
          const radioParentEl = radio.closest(".grid-item");
          radioParentEl.style.border = newBorderColor; // Update border color for 'no reward' option
        }

        if (radio.id === "bamboo") {
          continueButton(radio, "one"); // Handle 'bamboo' reward selection
        } else if (radio.id === "black") {
          continueButton(radio, "two"); // Handle 'black' reward selection
        }
      });

      // Event listener for modal close button
      modalCloseBtnEl.addEventListener("click", () => {
        modalEl.classList.remove("flex");
        overlayEl.classList.remove("flex");
      });
    });
  });
});
