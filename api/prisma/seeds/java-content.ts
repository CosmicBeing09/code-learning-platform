import { CourseContent } from './types';

export const javaContent: CourseContent = {
  'java1': {
    title: 'Java Fundamentals',
    description: 'Introduction to Java programming basics',
    content: `
# Java Fundamentals

## 1. Basic Syntax and Structure

Every Java program starts with a class:

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        // This is a comment
        System.out.println("Hello, World!");
    }
}
\`\`\`

## 2. Variables and Data Types

Java is strongly typed - every variable must have a declared type:

\`\`\`java
// Primitive Types
int age = 25;
double salary = 50000.50;
boolean isEmployed = true;
char grade = 'A';

// Reference Types
String name = "John Doe";
int[] numbers = {1, 2, 3, 4, 5};

// Type conversion
double number = 5.7;
int rounded = (int) number;  // Explicit casting

// Constants
final double PI = 3.14159;
\`\`\`
`,
    exercises: [
      {
        question: "Create a program that calculates the average of three numbers",
        hints: [
          "Use double for decimal precision",
          "Handle division correctly",
          "Format the output"
        ],
        solution: `public class Average {
    public static double calculateAverage(double a, double b, double c) {
        return (a + b + c) / 3.0;
    }

    public static void main(String[] args) {
        double num1 = 15.5;
        double num2 = 24.3;
        double num3 = 18.7;
        
        double average = calculateAverage(num1, num2, num3);
        System.out.printf("The average is: %.2f%n", average);
    }
}`
      }
    ]
  },
  'java2': {
    title: 'Control Flow and Methods',
    description: 'Learn Java control structures and method creation',
    content: `
# Control Flow and Methods

## 1. Control Structures

\`\`\`java
// If-else statements
int score = 85;
if (score >= 90) {
    System.out.println("A grade");
} else if (score >= 80) {
    System.out.println("B grade");
} else {
    System.out.println("Below B");
}

// Switch statement
String day = "Monday";
switch (day) {
    case "Monday":
        System.out.println("Start of week");
        break;
    case "Friday":
        System.out.println("Weekend soon");
        break;
    default:
        System.out.println("Regular day");
}

// Loops
for (int i = 0; i < 5; i++) {
    System.out.println("Count: " + i);
}

int j = 0;
while (j < 5) {
    System.out.println(j);
    j++;
}
\`\`\`

## 2. Methods

\`\`\`java
public class Calculator {
    // Method with return value
    public static int add(int a, int b) {
        return a + b;
    }

    // Method with variable arguments
    public static double average(double... numbers) {
        double sum = 0;
        for (double num : numbers) {
            sum += num;
        }
        return numbers.length > 0 ? sum / numbers.length : 0;
    }

    // Method overloading
    public static double multiply(double a, double b) {
        return a * b;
    }

    public static double multiply(double a, double b, double c) {
        return a * b * c;
    }
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a method that checks if a year is a leap year",
        hints: [
          "Divisible by 4",
          "Not divisible by 100 unless divisible by 400",
          "Use boolean return type"
        ],
        solution: `public class LeapYear {
    public static boolean isLeapYear(int year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    public static void main(String[] args) {
        int[] years = {2000, 2020, 2100, 2024};
        for (int year : years) {
            System.out.printf("%d is%s a leap year%n", 
                year, isLeapYear(year) ? "" : " not");
        }
    }
}`
      }
    ]
  },
  'java3': {
    title: 'Arrays and Collections',
    description: 'Master Java arrays and collection framework',
    content: `
# Arrays and Collections

## 1. Arrays

\`\`\`java
// Array declaration and initialization
int[] numbers = new int[5];
String[] fruits = {"Apple", "Banana", "Orange"};

// Multi-dimensional arrays
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Array operations
Arrays.sort(numbers);
Arrays.fill(numbers, 0);
int index = Arrays.binarySearch(fruits, "Banana");
\`\`\`

## 2. Collections Framework

\`\`\`java
import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        // ArrayList
        List<String> list = new ArrayList<>();
        list.add("First");
        list.add("Second");
        list.remove(0);

        // HashSet
        Set<Integer> set = new HashSet<>();
        set.add(1);
        set.add(2);
        set.add(1);  // Duplicate not added

        // HashMap
        Map<String, Integer> map = new HashMap<>();
        map.put("One", 1);
        map.put("Two", 2);
        System.out.println(map.get("One"));  // Prints: 1

        // Using streams
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        int sum = numbers.stream()
                        .filter(n -> n % 2 == 0)
                        .mapToInt(Integer::intValue)
                        .sum();
    }
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a function that finds the most frequent element in an array",
        hints: [
          "Use HashMap to count occurrences",
          "Track maximum frequency",
          "Handle empty array case"
        ],
        solution: `public class FrequencyFinder {
    public static <T> T mostFrequent(T[] array) {
        if (array == null || array.length == 0) {
            throw new IllegalArgumentException("Array cannot be empty");
        }

        Map<T, Integer> frequency = new HashMap<>();
        T mostFrequent = array[0];
        int maxCount = 0;

        for (T element : array) {
            int count = frequency.getOrDefault(element, 0) + 1;
            frequency.put(element, count);
            
            if (count > maxCount) {
                maxCount = count;
                mostFrequent = element;
            }
        }

        return mostFrequent;
    }

    public static void main(String[] args) {
        Integer[] numbers = {1, 2, 3, 2, 2, 4, 3};
        String[] words = {"apple", "banana", "apple", "cherry"};

        System.out.println("Most frequent number: " + 
            mostFrequent(numbers));  // Prints: 2
        System.out.println("Most frequent word: " + 
            mostFrequent(words));    // Prints: apple
    }
}`
      }
    ]
  },
  'java4': {
    title: 'Object-Oriented Programming',
    description: 'Learn Java OOP concepts and implementation',
    content: `
# Object-Oriented Programming

## 1. Classes and Objects

\`\`\`java
public class Student {
    // Instance variables
    private String name;
    private int age;
    private static int studentCount = 0;  // Class variable

    // Constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        studentCount++;
    }

    // Getter and Setter methods
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    // Static method
    public static int getStudentCount() {
        return studentCount;
    }
}
\`\`\`

## 2. Inheritance and Polymorphism

\`\`\`java
// Abstract class
abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    abstract double getArea();
    
    public String getColor() {
        return color;
    }
}

// Concrete classes
class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    private double width, height;
    
    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    @Override
    double getArea() {
        return width * height;
    }
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a banking system with different account types",
        hints: [
          "Use inheritance for account types",
          "Implement interest calculation",
          "Add transaction history"
        ],
        solution: `abstract class BankAccount {
    protected double balance;
    protected List<String> transactions;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
        this.transactions = new ArrayList<>();
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            transactions.add(
                String.format("Deposit: $%.2f", amount));
        }
    }

    public abstract void calculateInterest();
}

class SavingsAccount extends BankAccount {
    private double interestRate;

    public SavingsAccount(double balance, double rate) {
        super(balance);
        this.interestRate = rate;
    }

    @Override
    public void calculateInterest() {
        double interest = balance * interestRate;
        deposit(interest);
    }
}

// Test the implementation
public class Main {
    public static void main(String[] args) {
        SavingsAccount account = 
            new SavingsAccount(1000, 0.05);
        account.deposit(500);
        account.calculateInterest();
        System.out.println(account.getBalance());
    }
}`
      }
    ]
  },
  'java5': {
    title: 'Exception Handling',
    description: 'Learn to handle errors and exceptions in Java',
    content: `
# Exception Handling

## 1. Try-Catch Blocks

\`\`\`java
public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        } catch (Exception e) {
            System.out.println("Something went wrong: " + e.getMessage());
        } finally {
            System.out.println("This always executes");
        }
    }

    public static int divide(int a, int b) {
        return a / b;
    }
}
\`\`\`

## 2. Custom Exceptions

\`\`\`java
class InsufficientFundsException extends Exception {
    private double amount;

    public InsufficientFundsException(double amount) {
        super(String.format("Insufficient funds: $%.2f", amount));
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }
}

class Account {
    private double balance;

    public void withdraw(double amount) 
            throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
    }
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a file reader with proper exception handling",
        hints: [
          "Use try-with-resources",
          "Handle multiple exception types",
          "Create custom exception"
        ],
        solution: `class FileReadException extends Exception {
    public FileReadException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class SafeFileReader {
    public static String readFile(String path) 
            throws FileReadException {
        StringBuilder content = new StringBuilder();
        
        try (BufferedReader reader = new BufferedReader(
                new FileReader(path))) {
            
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\\n");
            }
            return content.toString();
            
        } catch (FileNotFoundException e) {
            throw new FileReadException(
                "File not found: " + path, e);
        } catch (IOException e) {
            throw new FileReadException(
                "Error reading file: " + path, e);
        }
    }

    public static void main(String[] args) {
        try {
            String content = readFile("test.txt");
            System.out.println(content);
        } catch (FileReadException e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}`
      }
    ]
  }
}; 