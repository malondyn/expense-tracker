// Select elements
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const addExpenseBtn = document.getElementById("add-expense");
const expenseList = document.getElementById("expense-items");
const totalAmountDisplay = document.getElementById("total-amount");

// Load expenses from local storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
updateUI();

// Add expense function
addExpenseBtn.addEventListener("click", () => {
  const name = expenseName.value.trim();
  const amount = parseFloat(expenseAmount.value);

  if (name && amount && amount > 0) {
    const newExpense = { name, amount };
    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateUI();
    expenseName.value = "";
    expenseAmount.value = "";
  } else {
    alert("Please enter a valid expense name and amount.");
  }
});

// Update UI and total
function updateUI() {
  expenseList.innerHTML = "";
  let totalAmount = 0;

  expenses.forEach((expense, index) => {
    totalAmount += expense.amount;

    const listItem = document.createElement("li");
    listItem.innerHTML = `
            ${expense.name}: $${expense.amount}
            <button class="delete-btn" data-index="${index}">❌</button>
        `;
    expenseList.appendChild(listItem);
  });

  totalAmountDisplay.textContent = totalAmount;

  // Add delete functionality
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      updateUI();
    });
  });
}