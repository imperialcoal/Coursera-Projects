function performOperation() {
    const num1 = parseFloat(document.getElementById('input1').value);
    const num2 = parseFloat(document.getElementById('input2').value);
    
    const resultsContainer = document.getElementById('results');
    const errorElement = document.getElementById('error');

    // Clear previous results and errors
    resultsContainer.innerHTML = '';
    errorElement.textContent = '';

    if (isNaN(num1) || isNaN(num2)) {
        errorElement.textContent = '❌ Please enter valid numbers';
        return;
    }

    // Introduce a debugger statement to pause execution
    debugger;

    const operations = {
        add: { fn: (a, b) => a + b, label: 'Addition' },
        subtract: { fn: (a, b) => a - b, label: 'Subtraction' },
        multiply: { fn: (a, b) => a * b, label: 'Multiplication' },
        divide: { fn: (a, b) => (b === 0 ? 'Undefined. You cannot divide by 0' : a / b), label: 'Division' },
    };

    // Dynamically create result elements
    for (const key in operations) {
        const { fn, label } = operations[key];
        const result = fn(num1, num2);

        const p = document.createElement('p');
        p.textContent = `${label} result: ${result}`;
        resultsContainer.appendChild(p);
    }
}