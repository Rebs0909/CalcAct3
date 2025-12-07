// calculator.js

class Calculator {
    constructor() {
        this.currentInput = '0';
        this.history = [];
    }

    

// Suma dos números
    add(a, b) {
        return a + b;
    }

     // Resta dos números
    subtract(a, b) {
        return a - b;
    }

    // Multiplica dos números
    mult(a, b) {
        return a * b;
    }

    // Divide dos números
    div(a, b) {
  
        return a / b;

    }

    
    

    // Actualiza el input actual
    updateInput(value) {
        if (this.currentInput === '0' || this.currentInput === 'Error') {
            this.currentInput = value;
        } else {
            this.currentInput += value;
        }
    }

    // Limpia la entrada actual
    clear() {
        this.currentInput = '0';
        return this.currentInput;
    }

    // Borra el último carácter
    deleteLast() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        return this.currentInput;
    }

    // Obtiene el input actual
    getCurrentInput() {
        return this.currentInput;
    }

    // Agrega una operación al historial
    addToHistory(operation, result) {
        this.history.push({
            operation,
            result,
            timestamp: new Date().toLocaleTimeString()
        });
        
        // Mantener solo las últimas 10 operaciones
        if (this.history.length > 10) {
            this.history.shift();
        }
    }

    // Obtiene el historial
    getHistory() {
        return [...this.history]; // Retorna copia del array
    }

    // Limpia el historial
    clearHistory() {
        this.history = [];
    }
}

// Exportar para usar en las pruebas
export default Calculator;