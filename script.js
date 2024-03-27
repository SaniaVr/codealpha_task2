// script.js 
// Get form, expense list, and total amount elements 
const expenseForm = 
	document.getElementById("expense-form"); 
const expenseList = 
	document.getElementById("expense-list"); 
const totalAmountElement = 
	document.getElementById("total-amount"); 

// Initialize expenses array from localStorage 
let expenses = 
	JSON.parse(localStorage.getItem("expenses")) || []; 

// Function to render expenses in tabular form 
function renderExpenses() { 

	// Clear expense list 
	expenseList.innerHTML = ""; 

	// Initialize total amount 
	let totalAmount = 0; 

	// Loop through expenses array and create table rows 
	for (let i = 0; i < expenses.length; i++) { 
		const expense = expenses[i]; 
		const expenseRow = document.createElement("tr"); 
		expenseRow.innerHTML = ` 
	<td>${expense.name}</td> 
	<td>Rs ${expense.amount}</td> 
	<td>${expense.date}</td> 
	<td class="delete-btn" data-id="${i}">Delete</td> 
	`; 
		expenseList.appendChild(expenseRow); 

		// Update total amount 
		totalAmount += expense.amount; 
	} 

	// Update total amount display 
	totalAmountElement.textContent = 
		totalAmount.toFixed(2); 

	// Save expenses to localStorage 
	localStorage.setItem("expenses", 
		JSON.stringify(expenses)); 
} 

// Function to add expense 
function addExpense(event) { 
	event.preventDefault(); 

	// Get expense name, amount and date from form 
	const expenseNameInput = 
		document.getElementById("expense-name"); 
	const expenseAmountInput = 
		document.getElementById("expense-amount"); 
	const expenseDateInput = 
		document.getElementById("date"); 
	const expenseDate = 
		expenseDateInput.value;
	const expenseName = 
		expenseNameInput.value; 
	const expenseAmount = 
		parseFloat(expenseAmountInput.value); 

	// Clear form inputs 
	expenseNameInput.value = ""; 
	expenseAmountInput.value = "";
	expenseDateInput.value = "";


	// Validate inputs 
	if (expenseName === "" || isNaN(expenseAmount)) { 
		alert("Please enter valid expense details."); 
		return; 
	} 

	// Create new expense object 
	const expense = { 
		name: expenseName, 
		amount: expenseAmount, 
		//category: expenseCategory,
		date: expenseDate,
	}; 

	// Add expense to expenses array 
	expenses.push(expense); 


	// Render expenses 
	renderExpenses(); 
} 

// Function to delete expense 
function deleteExpense(event) { 
	if (event.target.classList.contains("delete-btn")) { 

		// Get expense index from data-id attribute 
		const expenseIndex = 
			parseInt(event.target.getAttribute("data-id")); 

		// Remove expense from expenses array 
		expenses.splice(expenseIndex, 1); 

		// Render expenses 
		renderExpenses(); 
	} 
} 

// Add event listeners 
expenseForm.addEventListener("submit", addExpense); 
expenseList.addEventListener("click", deleteExpense); 


// Render initial expenses on page load 
renderExpenses();



/*
// Add an event listener for the select dropdown
document.getElementById('category').addEventListener('change', function() {
    // Get the selected value
    var selectedcat = document.getElementById('category').value;

    // Save the selected value in local storage
    localStorage.setItem('category', selectedcat);
});

// Retrieve the value from local storage and display it
function getAndDisplayTheValue() {
    var storedValue = localStorage.getItem('category');
    document.write(storedValue);
}

var storedValue = localStorage.getItem('category');
if (storedValue === null) {
    // Set a default value
    localStorage.setItem('category', 'others');
}
*/
