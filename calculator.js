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

    //Raiz cuadrada
    sqrt(x) {
    if (x < 0) {
        throw new Error("No se puede calcular raíz cuadrada de número negativo");
    }
    if (x === 0) return 0;
    if (x === 1) return 1;
    
    const precision = 0.000001;
    let guess = x / 2;
    
    while (true) {
        // Calcular diferencia absoluta 
        const difference = (guess * guess) - x;
        const absDifference = difference < 0 ? -difference : difference;
        
        if (absDifference <= precision) {
            break;
        }
        
        guess = (guess + (x / guess)) / 2;
    }
    
    // Redondear a 6 
    const rounded = this.roundToDecimal(guess, 6);
    return rounded;
    }
    
    roundToDecimal(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
    
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