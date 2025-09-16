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
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => (b === 0 ? 'Undefined. You cannot divide by 0' : a / b)
    };

    // Dynamically create result elements
    for (const [name, fn] of Object.entries(operations)) {
        const result = fn(num1, num2);

        const p = document.createElement('p');
        p.textContent = `${capitalize(name)} result: ${result}`;
        resultsContainer.appendChild(p);
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}