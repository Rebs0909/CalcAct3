// calculator.test.js
import Calculator from './calculator.js';

describe('Calculator', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });
//
    describe('Operaciones básicas', () => {
        
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
            // Los primeros 5 deben haber sido eliminados
            expect(calc.getHistory()[0].operation).toBe('op 5');
        });
    });
});