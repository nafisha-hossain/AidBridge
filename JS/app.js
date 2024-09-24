// Function to get value from an input field by its ID
function getInputFieldValueById(id) {
  const inputValue = document.getElementById(id).value;
  const inputNum = parseFloat(inputValue);
  return inputNum;
}

// Function to get value from a text field by its ID
function getTextFieldValueById(id) {
  const textValue = document.getElementById(id).innerText;
  const textNum = parseFloat(textValue);
  return textNum;
}

// Function to toggle visibility of sections
function showSectionById(id) {
  // Hide all sections
  document.getElementById("donationSection").classList.add("hidden");
  document.getElementById("historySection").classList.add("hidden");

  // Show the section with the provided id
  document.getElementById(id).classList.remove("hidden");
}

// Function to handle donation
function handleDonate(cardAmountId, inputId, campName) {
  // Get available balance from the navbar
  const availableAmount = getTextFieldValueById("availableAmount");

  // Get donation amount from the input field
  const donationAmount = getInputFieldValueById(inputId);

  if (!isValidDonation(donationAmount, availableAmount)) {
      return;
  }

  // Update the card amount with the donation amount
  const cardAmount = getTextFieldValueById(cardAmountId);
  document.getElementById(cardAmountId).innerText = cardAmount + donationAmount;

  // Subtract the donation from the available balance in the navbar
  document.getElementById("availableAmount").innerText = availableAmount - donationAmount;

  // Add donation to history
  addDonationHistory(donationAmount, campName);

  // Show the modal confirmation
  showDonationModal();

  // Clear the input field
  document.getElementById(inputId).value = '';
}

// Function to validate the donation amount
function isValidDonation(donationAmount, availableAmount) {
  if (isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return false;
  }

  if (donationAmount > availableAmount) {
      alert("Insufficient balance.");
      return false;
  }

  return true;
}

// Function to format the date to the desired format
function formatDate(date) {
  return date.toString(); 
}

// Function to add a donation history entry
function addDonationHistory(donationAmount, campName) {
  const historySection = document.getElementById("donationHistory");

  // Get current date and time
  const date = new Date();
  const formattedDate = formatDate(date);

  // Create a new history card
  const historyCard = document.createElement('div');
  historyCard.classList.add('bg-white', 'p-4', 'shadow-md', 'rounded-lg', 'mb-4'); 

  // Add content to history card
  historyCard.innerHTML = `
      <p class="text-lg font-bold">${donationAmount.toFixed(2)} BDT donated for ${campName}</p>
      <p class="text-sm text-gray-500">Time: ${formattedDate}</p>
  `;

  // Append card to history section
  historySection.appendChild(historyCard);
}

// Function to handle button clicks and toggle styles
function toggleButtonStyles(activeBtnId) {
  const donationBtn = document.getElementById('donationBtn');
  const historyBtn = document.getElementById('historyBtn');

  // Reset styles for both buttons
  donationBtn.classList.remove('bg-lime-300');
  donationBtn.classList.add('bg-gray-300');

  historyBtn.classList.remove('bg-lime-300');
  historyBtn.classList.add('bg-gray-300');

  // Set active button styles
  const activeBtn = document.getElementById(activeBtnId);
  activeBtn.classList.remove('bg-gray-300');
  activeBtn.classList.add('bg-lime-300');
}

// Add click event listeners to both buttons
document.getElementById('donationBtn').addEventListener('click', function() {
  toggleButtonStyles('donationBtn');
  showSectionById("donationSection"); // Show the donation section when clicked
});

document.getElementById('historyBtn').addEventListener('click', function() {
  toggleButtonStyles('historyBtn');
  showSectionById("historySection"); // Show the history section when clicked
});

// Function to show donation modal
function showDonationModal() {
  const modal = document.getElementById("my_modal_3");
  modal.showModal(); // Show the modal
}

// Function to close the modal
document.getElementById("closeModalBtn").addEventListener("click", function() {
  const modal = document.getElementById("my_modal_3");
  modal.close(); // Close the modal
});

// Event listener to toggle history and donation sections
document.getElementById("historyBtn").addEventListener("click", function() {
  showSectionById("historySection");
});

document.getElementById("donationBtn").addEventListener("click", function() {
  showSectionById("donationSection");
});
