import { CourseContent } from './types';

export const javascriptContent: CourseContent = {
  'js1': {
    title: 'JavaScript Fundamentals',
    description: 'Core concepts of JavaScript programming',
    content: `
# JavaScript Fundamentals

## 1. Variables and Data Types

Modern JavaScript uses let and const for variable declarations:

\`\`\`javascript
// Variable declarations
let age = 25;
const name = 'Alice';
let isStudent = true;
const grades = [95, 87, 92];
const person = {
    name: 'Bob',
    age: 30
};

// Template literals
console.log(\`Hello, \${name}! You are \${age} years old.\`);
\`\`\`

## 2. Basic Operations

\`\`\`javascript
// Arithmetic operations
const x = 10;
const y = 5;
console.log(x + y);  // Addition: 15
console.log(x * y);  // Multiplication: 50
console.log(x % y);  // Modulus: 0

// String operations
const firstName = 'John';
const lastName = 'Doe';
const fullName = firstName + ' ' + lastName;
console.log(fullName.toUpperCase());
\`\`\`
`,
    exercises: [
      {
        question: "Create a function that converts temperature from Celsius to Fahrenheit",
        hints: [
          "Formula: (C × 9/5) + 32",
          "Use template literals for output",
          "Handle decimal places"
        ],
        solution: `function celsiusToFahrenheit(celsius) {
    const fahrenheit = (celsius * 9/5) + 32;
    return \`\${celsius}°C is \${fahrenheit.toFixed(1)}°F\`;
}

// Test cases
console.log(celsiusToFahrenheit(0));   // "0°C is 32.0°F"
console.log(celsiusToFahrenheit(25));  // "25°C is 77.0°F"
console.log(celsiusToFahrenheit(100)); // "100°C is 212.0°F"`
      }
    ]
  },
  'js2': {
    title: 'Functions and Scope',
    description: 'Understanding JavaScript functions and scope concepts',
    content: `
# Functions and Scope

## 1. Function Types

\`\`\`javascript
// Function declaration
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Arrow function
const multiply = (a, b) => a * b;

// Function with default parameters
const createUser = (name, age = 18) => ({
    name,
    age,
    isAdult: age >= 18
});

// Callback function
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
\`\`\`

## 2. Scope and Closures

\`\`\`javascript
// Closure example
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const myCounter = counter();
console.log(myCounter.increment()); // 1
console.log(myCounter.increment()); // 2
console.log(myCounter.decrement()); // 1
\`\`\`
`,
    exercises: [
      {
        question: "Create a function factory that generates custom greeting functions",
        hints: [
          "Use closure to store the greeting type",
          "Return a new function",
          "Use template literals"
        ],
        solution: `function createGreeter(greetingType) {
    return function(name) {
        switch(greetingType) {
            case 'formal':
                return \`Good day, \${name}.\`;
            case 'casual':
                return \`Hey \${name}!\`;
            default:
                return \`Hello \${name}!\`;
        }
    };
}

// Test the function
const formalGreet = createGreeter('formal');
const casualGreet = createGreeter('casual');

console.log(formalGreet('Alice')); // "Good day, Alice."
console.log(casualGreet('Bob'));   // "Hey Bob!"`
      }
    ]
  },
  'js3': {
    title: 'Arrays and Objects',
    description: 'Working with JavaScript arrays and objects',
    content: `
# Arrays and Objects

## 1. Array Methods

\`\`\`javascript
const fruits = ['apple', 'banana', 'orange'];

// Adding and removing elements
fruits.push('grape');       // Add to end
fruits.unshift('mango');    // Add to start
const last = fruits.pop();  // Remove from end

// Array transformations
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(n => n ** 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// Array searching
const found = fruits.find(fruit => fruit.startsWith('a'));
const index = fruits.findIndex(fruit => fruit === 'banana');
\`\`\`

## 2. Object Operations

\`\`\`javascript
// Object creation and manipulation
const user = {
    name: 'Alice',
    age: 25,
    address: {
        city: 'New York',
        country: 'USA'
    }
};

// Object methods
const keys = Object.keys(user);
const values = Object.values(user);
const entries = Object.entries(user);

// Spread operator
const updatedUser = {
    ...user,
    age: 26,
    role: 'admin'
};
\`\`\`
`,
    exercises: [
      {
        question: "Create a function that groups an array of objects by a specific key",
        hints: [
          "Use reduce to group items",
          "Create a new object for groups",
          "Handle nested properties"
        ],
        solution: `function groupBy(array, key) {
    return array.reduce((grouped, item) => {
        const value = item[key];
        return {
            ...grouped,
            [value]: [...(grouped[value] || []), item]
        };
    }, {});
}

// Test the function
const students = [
    { name: 'Alice', grade: 'A' },
    { name: 'Bob', grade: 'B' },
    { name: 'Charlie', grade: 'A' }
];

const byGrade = groupBy(students, 'grade');
console.log(byGrade);
/* Output:
{
    A: [
        { name: 'Alice', grade: 'A' },
        { name: 'Charlie', grade: 'A' }
    ],
    B: [{ name: 'Bob', grade: 'B' }]
}
*/`
      }
    ]
  },
  'js4': {
    title: 'Asynchronous JavaScript',
    description: 'Understanding promises, async/await, and callbacks',
    content: `
# Asynchronous Programming

## 1. Promises

\`\`\`javascript
// Creating a promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve({ data: 'Success!' });
            } else {
                reject(new Error('Failed to fetch data'));
            }
        }, 1000);
    });
};

// Using promises
fetchData()
    .then(result => console.log(result))
    .catch(error => console.error(error));
\`\`\`

## 2. Async/Await

\`\`\`javascript
// Async function
async function getData() {
    try {
        const result = await fetchData();
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Promise.all example
async function fetchMultiple() {
    const promises = [
        fetch('api/users'),
        fetch('api/posts'),
        fetch('api/comments')
    ];
    
    const [users, posts, comments] = await Promise.all(promises);
    return { users, posts, comments };
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a function that retries a failed promise a specified number of times",
        hints: [
          "Use recursive approach",
          "Implement delay between retries",
          "Track retry count"
        ],
        solution: `async function retryOperation(operation, retries = 3, delay = 1000) {
    try {
        return await operation();
    } catch (error) {
        if (retries <= 0) throw error;
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return retryOperation(operation, retries - 1, delay);
    }
}

// Test the function
async function testRetry() {
    let attempts = 0;
    const mockAPI = () => {
        return new Promise((resolve, reject) => {
            attempts++;
            if (attempts < 3) {
                reject(new Error(\`Attempt \${attempts} failed\`));
            } else {
                resolve('Success!');
            }
        });
    };

    try {
        const result = await retryOperation(mockAPI);
        console.log('Final result:', result);
    } catch (error) {
        console.error('All retries failed:', error);
    }
}

testRetry();`
      }
    ]
  },
  'js5': {
    title: 'Modern JavaScript Features',
    description: 'ES6+ features and modern JavaScript patterns',
    content: `
# Modern JavaScript Features

## 1. Destructuring and Spread

\`\`\`javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const { name, age, address: { city } = {} } = user;

// Spread examples
const merged = [...array1, ...array2];
const cloned = { ...originalObject };

// Parameter destructuring
function processUser({ name, age, email = 'N/A' }) {
    console.log(\`\${name} is \${age} years old\`);
}
\`\`\`

## 2. Modules and Classes

\`\`\`javascript
// Class definition
class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    static createBicycle() {
        return new Vehicle('Generic', 'Bicycle');
    }

    get description() {
        return \`\${this.make} \${this.model}\`;
    }
}

// Class inheritance
class Car extends Vehicle {
    constructor(make, model, doors) {
        super(make, model);
        this.doors = doors;
    }

    honk() {
        return 'Beep!';
    }
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a class hierarchy for a shape system with area calculations",
        hints: [
          "Use abstract base class",
          "Implement multiple shape types",
          "Use getter methods"
        ],
        solution: `class Shape {
    constructor(name) {
        if (this.constructor === Shape) {
            throw new Error('Shape is abstract');
        }
        this.name = name;
    }

    get area() {
        throw new Error('Area calculation must be implemented');
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }

    get area() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super('Rectangle');
        this.width = width;
        this.height = height;
    }

    get area() {
        return this.width * this.height;
    }
}

// Test the classes
const shapes = [
    new Circle(5),
    new Rectangle(4, 6)
];

shapes.forEach(shape => {
    console.log(\`\${shape.name} area: \${shape.area.toFixed(2)}\`);
});`
      }
    ]
  }
}; 