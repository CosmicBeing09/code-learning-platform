import { CourseContent } from './types';

export const pythonContent: CourseContent = {
  'py1': {
    title: 'Python Basics',
    description: 'Introduction to Python fundamentals',
    content: `
# Python Fundamentals

Python is known for its simplicity and readability. Let's explore the basics:

## 1. Variables and Data Types

Python variables are dynamically typed:

\`\`\`python
# Basic variable assignments
name = "Alice"    # str
age = 25         # int
height = 1.75    # float
is_student = True # bool

print(f"Name: {name}, Age: {age}")
\`\`\`

## 2. Control Structures

\`\`\`python
# If statements
if age >= 18:
    print("Adult")
else:
    print("Minor")

# Loops
for i in range(5):
    print(i)

while age > 20:
    print("Still young!")
    age -= 1
\`\`\`
`,
    exercises: [
      {
        question: "Create a function that calculates the area of a circle",
        hints: [
          "Use math.pi for the value of π",
          "Area = πr²",
          "Remember to import math module"
        ],
        solution: `import math

def circle_area(radius):
    return math.pi * radius ** 2

# Test the function
print(circle_area(5))`
      }
    ]
  },
  'py2': {
    title: 'Control Flow and Functions',
    description: 'Master Python control structures and function definitions',
    content: `
# Control Flow and Functions in Python

## 1. Conditional Statements

\`\`\`python
# If-elif-else statements
age = 18
if age < 13:
    print("Child")
elif age < 20:
    print("Teenager")
else:
    print("Adult")
\`\`\`

## 2. Functions and Parameters

\`\`\`python
def calculate_total(prices, discount=0):
    total = sum(prices)
    return total * (1 - discount/100)

# Example usage
prices = [29.99, 19.99, 59.99]
total = calculate_total(prices, 20)
print(f"Total with 20% discount: {total:.2f}")
\`\`\`
`,
    exercises: [
      {
        question: "Create a function that checks if a number is prime",
        hints: [
          "A prime number is only divisible by 1 and itself",
          "Check up to square root of the number",
          "Use a helper function"
        ],
        solution: `def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

# Test cases
numbers = [2, 3, 4, 17, 25, 97]
for num in numbers:
    result = "is" if is_prime(num) else "is not"
    print(f"{num} {result} prime")`
      }
    ]
  },
  'py3': {
    title: 'Data Structures',
    description: 'Learn Python data structures and operations',
    content: `
# Python Data Structures

## Lists and Dictionaries

\`\`\`python
# List operations
numbers = [1, 2, 3, 4, 5]
numbers.append(6)
numbers.insert(0, 0)

# Dictionary operations
student = {
    "name": "Alice",
    "grades": [85, 92, 88]
}
print(f"Average grade: {sum(student['grades'])/len(student['grades']):.1f}")
\`\`\`
`,
    exercises: [
      {
        question: "Create a function to find duplicate elements in a list",
        hints: [
          "Use a dictionary or set",
          "Track element frequency",
          "Return duplicates in a list"
        ],
        solution: `def find_duplicates(items):
    seen = {}
    duplicates = []
    for item in items:
        if item in seen:
            duplicates.append(item)
        else:
            seen[item] = 1
    return duplicates

# Test
test_list = [1, 2, 2, 3, 4, 4, 5]
print(f"Duplicates: {find_duplicates(test_list)}")`
      }
    ]
  },
  'py4': {
    title: 'Error Handling',
    description: 'Master Python exception handling',
    content: `
# Error Handling in Python

\`\`\`python
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Cannot divide by zero"
    except TypeError:
        return "Please provide numbers only"

print(divide(10, 2))
print(divide(10, 0))
\`\`\`
`,
    exercises: [
      {
        question: "Create a safe file reading function",
        hints: [
          "Handle FileNotFoundError",
          "Use try-except blocks",
          "Close file properly"
        ],
        solution: `def read_file_safely(filename):
    try:
        with open(filename, 'r') as file:
            return file.read()
    except FileNotFoundError:
        return "File not found"
    except Exception as e:
        return f"Error: {str(e)}"

# Test the function
print(read_file_safely("test.txt"))`
      }
    ]
  },
  'py5': {
    title: 'Classes and OOP',
    description: 'Object-oriented programming in Python',
    content: `
# Object-Oriented Programming

## 1. Basic Class Structure

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):
        self.balance += amount
        return f"New balance: {self.balance}"

account = BankAccount("Alice", 1000)
print(account.deposit(500))
\`\`\`
`,
    exercises: [
      {
        question: "Create a simple Rectangle class",
        hints: [
          "Include width and height",
          "Add area and perimeter methods",
          "Implement string representation"
        ],
        solution: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)
    
    def __str__(self):
        return f"Rectangle({self.width}x{self.height})"

# Test the class
rect = Rectangle(5, 3)
print(f"Area: {rect.area()}")
print(f"Perimeter: {rect.perimeter()}")`
      }
    ]
  }
}; 