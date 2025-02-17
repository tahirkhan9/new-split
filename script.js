document.addEventListener('DOMContentLoaded', () => {
    const billAmount = document.getElementById('bill-amount');
    const numPeople = document.getElementById('num-people');
    const tipPercentage = document.getElementById('tip-percentage');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const tipAmountDisplay = document.getElementById('tip-amount');
    const totalAmountDisplay = document.getElementById('total-amount');
    const perPersonDisplay = document.getElementById('per-person');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    // Theme handling
    const setTheme = (isDark) => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

    // Theme toggle event listener
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'light';
        setTheme(isDark);
    });

    // Format number as currency in Indian Rupees
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    };

    const calculateSplit = () => {
        // Get values from inputs
        const bill = parseFloat(billAmount.value) || 0;
        const people = parseInt(numPeople.value) || 1;
        const tipPercent = parseFloat(tipPercentage.value) || 0;

        // Calculate amounts
        const tipAmount = bill * (tipPercent / 100);
        const totalAmount = bill + tipAmount;
        const perPerson = totalAmount / people;

        // Update display
        tipAmountDisplay.textContent = formatCurrency(tipAmount);
        totalAmountDisplay.textContent = formatCurrency(totalAmount);
        perPersonDisplay.textContent = formatCurrency(perPerson);
    };

    const resetCalculator = () => {
        // Reset input fields
        billAmount.value = '';
        numPeople.value = '1';
        tipPercentage.value = '15';

        // Reset displays
        tipAmountDisplay.textContent = formatCurrency(0);
        totalAmountDisplay.textContent = formatCurrency(0);
        perPersonDisplay.textContent = formatCurrency(0);
    };

    // Add event listeners
    calculateBtn.addEventListener('click', calculateSplit);
    resetBtn.addEventListener('click', resetCalculator);

    // Add input event listeners for real-time updates
    [billAmount, numPeople, tipPercentage].forEach(input => {
        input.addEventListener('input', calculateSplit);
    });

    // Initialize calculations
    calculateSplit();
});
