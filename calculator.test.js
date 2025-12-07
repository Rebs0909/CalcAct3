// calculator.test.js
import Calculator from './calculator.js';

describe('Calculator', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });
//
    describe('Operaciones', () => {
        
        // suma y resta
        
        test('Suma de 2 + 3 debe ser 5', () => {
            expect(calc.add(2, 3)).toBe(5);
        });

        test('Suma de números negativos', () => {
            expect(calc.add(-5, 3)).toBe(-2);
            expect(calc.add(-5, -3)).toBe(-8);
        });

        test('Resta de 5 - 3 debe ser 2', () => {
            expect(calc.subtract(5, 3)).toBe(2);
        });

        test('Resta con números negativos', () => {
            expect(calc.subtract(5, -3)).toBe(8);
            expect(calc.subtract(-5, -3)).toBe(-2);
        });

        test('Resta que da negativo', () => {
            expect(calc.subtract(3, 5)).toBe(-2);
        });

        // multiplicacion 

        test('Multiplicacion de 5 * 5 debe de ser 25', () => {
            expect(calc.mult(5, 5)).toBe(25);
        });

        test('Multiplicacion de números negativos', () => {
            expect(calc.mult(-5, 3)).toBe(-15);
            expect(calc.mult(-5, -5)).toBe(25);
        });

        //Division

        test('Division de 25 entre 5 debe de ser 5', () => {
            expect(calc.div(25, 5)).toBe(5);
        });


        test('División por cero debe lanzar error o retornar infinito', () => {
        
            expect(calc.div(5, 0)).toBe(Infinity);
            
        });

        // Raíz cuadrada

        test('Raíz cuadrada de 25 debe ser 5', () => {
            expect(calc.sqrt(25)).toBe(5);
        });
        test('Raíz cuadrada de 0 debe ser 0', () => {
        expect(calc.sqrt(0)).toBe(0);
        });

        test('Raíz cuadrada de 1 debe ser 1', () => {
        expect(calc.sqrt(1)).toBe(1);
        });

        test('Raíz cuadrada de número negativo debe lanzar error', () => {
        expect(() => calc.sqrt(-4)).toThrow('No se puede calcular raíz cuadrada de números negativos');
        });
    
        // Función exponencial con base a e

        test('exp(1) ≈ 2.718281828459045', () => {
        expect(calc.exp(1)).toBeCloseTo(2.718281828459045, 6); // precisión ~1e-6
        });

        test('exp(2) ≈ 7.38905609893065', () => {
        expect(calc.exp(2)).toBeCloseTo(7.38905609893065, 6);
        });

        test('exp(-1) ≈ 0.36787944117144233', () => {
        expect(calc.exp(-1)).toBeCloseTo(0.36787944117144233, 6);
        });
        
        // función abs 
        const abs = v => (v < 0 ? -v : v);

        // referencia de exp usando serie de Taylor: sum_{n=0}^\infty x^n/n!
        function referenceExp(x, tol = 1e-12, maxIter = 200) {
        let term = 1; // x^0 / 0! 
        let sum = 1;
        for (let n = 1; n <= maxIter; n++) {
        term *= x / n; // produce x^n / n! de forma incremental
        sum += term;
        if (abs(term) < tol) break;
        }
        return sum;
        }

        test('exp(x) coincide con referencia por Taylor (error absoluto < 1e-3)', () => {
        const xs = [-5, -1, -0.5, 0, 0.1, 0.5, 1, 2, 5];
        xs.forEach(x => {
        const expected = referenceExp(x);
        const actual = calc.exp(x);
        expect(abs(actual - expected)).toBeLessThan(1e-3); // precisión mejor que 1e-3
        });
        });

        });

    describe('Manejo de entrada', () => {
        test('Input inicial debe ser 0', () => {
            expect(calc.getCurrentInput()).toBe('0');
        });

        test('Actualizar input con número', () => {
            calc.updateInput('5');
            expect(calc.getCurrentInput()).toBe('5');
        });

        test('Concatenar números', () => {
            calc.updateInput('5');
            calc.updateInput('3');
            expect(calc.getCurrentInput()).toBe('53');
        });

        test('Clear debe resetear a 0', () => {
            calc.updateInput('123');
            calc.clear();
            expect(calc.getCurrentInput()).toBe('0');
        });

        test('DeleteLast debe borrar último carácter', () => {
            calc.updateInput('123');
            calc.deleteLast();
            expect(calc.getCurrentInput()).toBe('12');
        });

        test('DeleteLast con un solo carácter debe volver a 0', () => {
            calc.updateInput('5');
            calc.deleteLast();
            expect(calc.getCurrentInput()).toBe('0');
        });
    });

    describe('Historial', () => {
        test('Historial inicial debe estar vacío', () => {
            expect(calc.getHistory().length).toBe(0);
        });

        test('Agregar operación al historial', () => {
            calc.addToHistory('2 + 3', '5');
            expect(calc.getHistory().length).toBe(1);
            expect(calc.getHistory()[0].operation).toBe('2 + 3');
            expect(calc.getHistory()[0].result).toBe('5');
        });

        test('ClearHistory debe vaciar el historial', () => {
            calc.addToHistory('2 + 3', '5');
            calc.clearHistory();
            expect(calc.getHistory().length).toBe(0);
        });

        test('Historial máximo de 10 operaciones', () => {
            for (let i = 0; i < 15; i++) {
                calc.addToHistory(`op ${i}`, i.toString());
            }
            expect(calc.getHistory().length).toBe(10);
            
            expect(calc.getHistory()[0].operation).toBe('op 5');
        });
    });
});