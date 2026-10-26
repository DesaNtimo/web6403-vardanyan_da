/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    // Побитовое ИЛИ с нулем отбрасывает дробную часть.
    // Если число было целым, оно не изменится.
    return (n | 0) === n;
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    const result = [];
    // Начинаем с 2, идем до 20, на каждом шаге прибавляем 2
    for (let i = 2; i <= 20; i += 2) {
        result.push(i);
    }
    return result;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    // Базовый случай: если дошли до 1, возвращаем 1, чтобы остановить рекурсию
    if (n === 1) return 1;
    // Иначе прибавляем текущее число к сумме всех предыдущих
    return n + recSumTo(n - 1);
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
    // Число должно быть больше 0. Трюк с побитовым И:
    // У степени двойки в двоичном коде только одна единица (например, 8 это 1000).
    // Если отнять 1, получим 0111. 1000 & 0111 === 0.
    return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    if (n <= 2) return 1;
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    let storedValue = initialValue; // Сохраняем начальное значение
    
    // Возвращаем новую функцию
    return function(newValue) {
        // Если функция операции не передана, просто возвращаем сохраненное значение
        if (!operatorFn) {
            return storedValue;
        }
        // Иначе выполняем операцию, перезаписываем значение и возвращаем его
        storedValue = operatorFn(storedValue, newValue);
        return storedValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    let current = start; // Запоминаем текущее значение
    
    return function() {
        const result = current; // Сохраняем то, что нужно вернуть сейчас
        current += step;        // Увеличиваем значение для следующего вызова
        return result;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    // 1. Простая проверка на строгое равенство (для примитивов типа чисел, строк)
    if (firstObject === secondObject) {
        return true;
    }

    // 2. Специфичная проверка для NaN (так как в JS NaN !== NaN)
    if (Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
        return true;
    }

    // 3. Если одно из значений null или вообще не объект/функция, то они не равны
    if (
        firstObject === null || 
        typeof firstObject !== 'object' || 
        secondObject === null || 
        typeof secondObject !== 'object'
    ) {
        return false;
    }

    // 4. Получаем списки ключей для обоих объектов
    const keys1 = Object.keys(firstObject);
    const keys2 = Object.keys(secondObject);

    // Если количество свойств разное — объекты точно не равны
    if (keys1.length !== keys2.length) {
        return false;
    }

    // 5. Проверяем каждое свойство рекурсивно
    for (let key of keys1) {
        // Если у второго объекта нет такого ключа или значения не равны
        if (!keys2.includes(key) || !deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }

    // Если все проверки пройдены, объекты равны
    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};