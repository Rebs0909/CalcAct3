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
        throw new Error("No se puede calcular raíz cuadrada de números negativos");
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
    // Función exponencial con base e.

    exp(x) {
    if (typeof x !== 'number' || Number.isNaN(x)) return NaN;
    if (x === 0) return 1;

    const abs = v => (v < 0 ? -v : v);

    // Reducción de rango: dividir por 2 repetidamente hasta |xr| <= 1
    let xr = x;
    let halves = 0;
    while (abs(xr) > 1) {
        xr = xr / 2;
        halves++;
    }

    // Serie de Taylor para exp(xr)
    const tol = 1e-15;
    const maxIter = 200;
    let term = 1; // xr^0 / 0! = 1
    let sum = 1;
    for (let n = 1; n <= maxIter; n++) {
        term = term * (xr / n); 
        sum += term;
        if (abs(term) < tol) break;
        if (!isFinite(sum)) return sum;
    }

    for (let i = 0; i < halves; i++) {
        sum = sum * sum;
        if (!isFinite(sum)) return sum;
    }

    return sum;
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