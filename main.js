// main.js
import Calculator from './calculator.js';

// Inicializar calculadora
const calculator = new Calculator();

// Elementos del DOM
const inputElement = document.getElementById('input');
const historyContent = document.getElementById('historyContent');
const buttons = document.querySelectorAll('.button');
const clearButton = document.getElementById('clear');
const eraseButton = document.getElementById('erase');
const equalButton = document.getElementById('equal');

// Actualizar display
function updateDisplay() {
    inputElement.value = calculator.getCurrentInput();
}

// Actualizar historial en el DOM
function updateHistoryDisplay() {
    const history = calculator.getHistory();
    
    if (history.length === 0) {
        historyContent.innerHTML = '<p style="color: #9490ac; text-align: center;">No hay operaciones recientes</p>';
        return;
    }

    historyContent.innerHTML = history.map(item => `
        <div style="margin-bottom: 10px; padding: 10px; background: #1a1a1a; border-radius: 5px;">
            <div style="color: #f69906; font-size: 12px;">${item.timestamp}</div>
            <div style="color: white;">${item.operation} = ${item.result}</div>
        </div>
    `).reverse().join('');
}

// Manejar clics en botones numéricos y operadores
function handleButtonClick(value) {
    // Lógica especial para botones
    if (value === 'AC') {
        calculator.clear();
    } else if (value === 'DEL') {
        calculator.deleteLast();
    } else {
        calculator.updateInput(value);
    }
    
    updateDisplay();
}

// Evaluar expresión matemática básica 
function evaluateExpression(expression) {
    try {
        // Por ahora solo maneja sumas y restas simples
        // Ejemplo: "5+3" o "10-2"
        const result = eval(expression); // CUIDADO: eval tiene riesgos de seguridad
        return result.toString();
    } catch (error) {
        return 'Error';
    }
}

// Configurar event listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-number');
        handleButtonClick(value);
    });
});

// Botón clear
clearButton.addEventListener('click', () => {
    calculator.clear();
    updateDisplay();
});

// Botón erase
eraseButton.addEventListener('click', () => {
    calculator.deleteLast();
    updateDisplay();
});

// Botón igual
equalButton.addEventListener('click', () => {
    const expression = calculator.getCurrentInput();
    
    // aqui va la evaluación
    if (expression.includes('+') || expression.includes('-')) {
        const result = evaluateExpression(expression);
        
        // Agregar al historial
        calculator.addToHistory(expression, result);
        
        // Actualizar input con el resultado
        calculator.clear();
        calculator.updateInput(result);
        updateDisplay();
        updateHistoryDisplay();
    }
});

// Inicializar display
updateDisplay();
updateHistoryDisplay();
