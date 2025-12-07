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
    // Ignorar botones vacíos o nulos
    if (!value) return;

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
// Evaluar expresión con soporte para sqrt(...) y exp(...)
function evaluateExpression(expression) {
    try {
        // Función auxiliar que evalúa una expresión que ya no contiene sqrt(...) ni exp(...)
        const evaluatePlain = (expr) => {
            // evalúa con Function para que soportemos operadores + - * / y paréntesis
            return Function('"use strict"; return (' + expr + ')')();
        };

        let expr = expression;

        // Procesar sqrt(...) hasta que no haya más
        const reSqrtInner = /sqrt\(([^()]+)\)/;
        while (reSqrtInner.test(expr)) {
            expr = expr.replace(reSqrtInner, (match, inner) => {
                const innerVal = evaluateExpression(inner); // recursión
                if (innerVal === 'Error') throw new Error('InnerError');
                const num = Number(innerVal);
                if (Number.isNaN(num)) throw new Error('NaN');
                const r = calculator.sqrt(num);
                return String(r);
            });
        }

        // Procesar exp(...) hasta que no haya más
        const reExpInner = /exp\(([^()]+)\)/;
        while (reExpInner.test(expr)) {
            expr = expr.replace(reExpInner, (match, inner) => {
                const innerVal = evaluateExpression(inner); // recursión
                if (innerVal === 'Error') throw new Error('InnerError');
                const num = Number(innerVal);
                if (Number.isNaN(num)) throw new Error('NaN');
                const r = calculator.exp(num);
                return String(r);
            });
        }

        // Ya no hay sqrt(...) ni exp(...): evaluar la expresión básica
        const result = evaluatePlain(expr);
        return result.toString();
    } catch (err) {
        console.error('evaluateExpression error:', err);
        return 'Error';
    }
}

//  listeners para todos los botones
buttons.forEach(button => {
    button.addEventListener('click', () => {
        let value = button.getAttribute('data-number');
        if (value === 'exp(x)' || value === 'e^{x}') value = 'exp(';
        if (value === 'sqrt') value = 'sqrt(';
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
    let expression = calculator.getCurrentInput();

    // Auto-cerrar paréntesis 
    const opens = (expression.match(/\(/g) || []).length;
    const closes = (expression.match(/\)/g) || []).length;
    if (opens > closes) {
        expression = expression + ')'.repeat(opens - closes);
    }

    // Evaluar si hay alguna operación soportada
    if (expression.includes('+') || expression.includes('-') || expression.includes('*') || expression.includes('/') || expression.includes('sqrt') || expression.includes('exp')) {
        const result = evaluateExpression(expression);

        // Si ocurre un error internamente, result será 'Error'
        if (result === 'Error') {
            console.error('evaluateExpression devolvió Error para:', expression);
            // Mostrar Error en la UI y en el historial
            calculator.addToHistory(expression, 'Error');
            calculator.clear();
            calculator.updateInput('Error');
            updateDisplay();
            updateHistoryDisplay();
            return;
        }

        // Agregar al historial y mostrar resultado
        calculator.addToHistory(expression, result);
        calculator.clear();
        calculator.updateInput(result);
        updateDisplay();
        updateHistoryDisplay();
    }
});

// Inicializar display
updateDisplay();
updateHistoryDisplay();