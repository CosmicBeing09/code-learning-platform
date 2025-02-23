import { CourseContent } from './types';

export const rustContent: CourseContent = {
  'rust1': {
    title: 'Rust Fundamentals',
    description: 'Introduction to Rust programming basics',
    content: `
# Rust Fundamentals

## 1. Basic Syntax and Variables

\`\`\`rust
// Variables and mutability
let x = 5;          // immutable by default
let mut y = 10;     // mutable variable
const MAX_POINTS: u32 = 100_000;  // constant

// Basic data types
let integer: i32 = 42;
let float: f64 = 3.14;
let boolean: bool = true;
let character: char = 'A';
let text: &str = "Hello, Rust!";

// Type inference
let inferred_type = 13;  // i32 by default
let tuple = ("hello", 5, true);
\`\`\`

## 2. Ownership and Borrowing

\`\`\`rust
fn main() {
    // Ownership
    let s1 = String::from("hello");
    let s2 = s1;  // s1 is moved to s2
    // println!("{}", s1);  // This would not compile!
    
    // Borrowing
    let s3 = String::from("world");
    let len = calculate_length(&s3);  // borrowing s3
    println!("Length of '{}' is {}", s3, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a function that swaps two numbers using references",
        hints: [
          "Use mutable references",
          "Remember to use the mut keyword",
          "Use temporary variable for swapping"
        ],
        solution: `fn swap(a: &mut i32, b: &mut i32) {
    let temp = *a;
    *a = *b;
    *b = temp;
}

fn main() {
    let mut x = 5;
    let mut y = 10;
    println!("Before: x = {}, y = {}", x, y);
    swap(&mut x, &mut y);
    println!("After: x = {}, y = {}", x, y);
}`
      }
    ]
  },
  'rust2': {
    title: 'Structs and Enums',
    description: 'Working with custom data types in Rust',
    content: `
# Structs and Enums

## 1. Defining and Using Structs

\`\`\`rust
// Basic struct
struct User {
    username: String,
    email: String,
    active: bool,
    login_count: u64,
}

// Implementation block
impl User {
    fn new(username: String, email: String) -> User {
        User {
            username,
            email,
            active: true,
            login_count: 1,
        }
    }

    fn increment_login(&mut self) {
        self.login_count += 1;
    }
}

// Tuple structs
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);
\`\`\`

## 2. Enums and Pattern Matching

\`\`\`rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(Color),
}

impl Message {
    fn call(&self) {
        match self {
            Message::Quit => println!("Quitting"),
            Message::Move { x, y } => println!("Moving to ({}, {})", x, y),
            Message::Write(text) => println!("Text message: {}", text),
            Message::ChangeColor(c) => println!("Changing color"),
        }
    }
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a Shape enum with different geometric shapes and calculate their areas",
        hints: [
          "Use enum variants for different shapes",
          "Implement area calculation method",
          "Use match expression"
        ],
        solution: `enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
    Triangle(f64, f64),
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r) => std::f64::consts::PI * r * r,
            Shape::Rectangle(w, h) => w * h,
            Shape::Triangle(b, h) => (b * h) / 2.0,
        }
    }
}

fn main() {
    let shapes = vec![
        Shape::Circle(5.0),
        Shape::Rectangle(4.0, 6.0),
        Shape::Triangle(3.0, 4.0),
    ];
    
    for shape in shapes {
        println!("Area: {:.2}", shape.area());
    }
}`
      }
    ]
  },
  'rust3': {
    title: 'Error Handling and Option/Result',
    description: "Learn Rust's robust error handling patterns",
    content: `
# Error Handling

## 1. Option Type

\`\`\`rust
fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}

// Using Option
fn main() {
    let result = divide(10.0, 2.0);
    match result {
        Some(x) => println!("Result: {}", x),
        None => println!("Cannot divide by zero"),
    }

    // Using if let
    if let Some(x) = divide(10.0, 0.0) {
        println!("Result: {}", x);
    }
}
\`\`\`

## 2. Result Type

\`\`\`rust
#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeSquareRoot,
}

fn safe_divide(x: f64, y: f64) -> Result<f64, MathError> {
    if y == 0.0 {
        Err(MathError::DivisionByZero)
    } else {
        Ok(x / y)
    }
}

fn safe_sqrt(x: f64) -> Result<f64, MathError> {
    if x < 0.0 {
        Err(MathError::NegativeSquareRoot)
    } else {
        Ok(x.sqrt())
    }
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a function that safely performs a series of mathematical operations",
        hints: [
          "Use Result for error handling",
          "Chain operations with ?",
          "Create custom error type"
        ],
        solution: `#[derive(Debug)]
enum CalcError {
    DivisionByZero,
    Overflow,
    InvalidInput,
}

fn calculate(x: f64, y: f64) -> Result<f64, CalcError> {
    let sum = x.checked_add(y)
        .ok_or(CalcError::Overflow)?;
        
    let product = sum.checked_mul(2.0)
        .ok_or(CalcError::Overflow)?;
        
    if y == 0.0 {
        return Err(CalcError::DivisionByZero);
    }
    
    Ok(product / y)
}

fn main() {
    match calculate(10.0, 5.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {:?}", e),
    }
}`
      }
    ]
  },
  'rust4': {
    title: 'Concurrency and Threads',
    description: "Master Rust's concurrency features",
    content: `
# Concurrency in Rust

## 1. Threads and Channels

\`\`\`rust
use std::thread;
use std::sync::mpsc;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();
    
    let handle = thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Got: {}", received);
    }

    handle.join().unwrap();
}
\`\`\`

## 2. Shared State

\`\`\`rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
\`\`\`
`,
    exercises: [
      {
        question: "Implement a parallel number processing pipeline using channels",
        hints: [
          "Use multiple threads",
          "Implement producer-consumer pattern",
          "Use channels for communication"
        ],
        solution: `use std::thread;
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
    let (result_tx, result_rx) = mpsc::channel();

    // Producer thread
    let producer = thread::spawn(move || {
        for i in 0..10 {
            tx.send(i).unwrap();
        }
    });

    // Consumer/Processor thread
    let processor = thread::spawn(move || {
        for received in rx {
            let processed = received * received;
            result_tx.send(processed).unwrap();
        }
    });

    // Collect results
    let mut results = Vec::new();
    for received in result_rx {
        results.push(received);
    }

    producer.join().unwrap();
    processor.join().unwrap();

    println!("Processed results: {:?}", results);
}`
      }
    ]
  },
  'rust5': {
    title: 'Advanced Traits and Generics',
    description: "Understanding advanced type system features",
    content: `
# Traits and Generics

## 1. Generic Types and Traits

\`\`\`rust
// Generic struct
struct Point<T> {
    x: T,
    y: T,
}

// Trait definition
trait Drawable {
    fn draw(&self);
    fn get_bounds(&self) -> (f64, f64);
}

// Implementing trait for generic type
impl<T: std::fmt::Display> Drawable for Point<T> {
    fn draw(&self) {
        println!("Drawing point ({}, {})", self.x, self.y);
    }

    fn get_bounds(&self) -> (f64, f64) {
        (0.0, 0.0)  // Simplified
    }
}
\`\`\`

## 2. Advanced Trait Features

\`\`\`rust
// Associated types
trait Container {
    type Item;
    fn get(&self) -> Option<&Self::Item>;
    fn insert(&mut self, item: Self::Item);
}

// Default type parameters
trait Add<RHS=Self> {
    type Output;
    fn add(self, rhs: RHS) -> Self::Output;
}

// Trait bounds
fn print_pair<T: Display + Debug>(pair: &(T, T)) {
    println!("({:?}, {:?})", pair.0, pair.1);
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a generic data structure with multiple trait bounds",
        hints: [
          "Use multiple trait constraints",
          "Implement custom traits",
          "Use where clauses"
        ],
        solution: `use std::fmt::Display;
use std::ops::Add;

trait Measurable {
    fn measure(&self) -> f64;
}

struct Container<T>
where
    T: Display + Add<Output = T> + Clone + Measurable,
{
    items: Vec<T>,
}

impl<T> Container<T>
where
    T: Display + Add<Output = T> + Clone + Measurable,
{
    fn new() -> Self {
        Container { items: Vec::new() }
    }

    fn add_item(&mut self, item: T) {
        self.items.push(item);
    }

    fn sum(&self) -> Option<T> {
        if self.items.is_empty() {
            return None;
        }
        
        let mut result = self.items[0].clone();
        for item in &self.items[1..] {
            result = result + item.clone();
        }
        Some(result)
    }

    fn total_measurement(&self) -> f64 {
        self.items.iter()
            .map(|item| item.measure())
            .sum()
    }
}

// Example implementation
#[derive(Clone)]
struct Weight(f64);

impl Display for Weight {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}kg", self.0)
    }
}

impl Add for Weight {
    type Output = Weight;
    fn add(self, other: Weight) -> Weight {
        Weight(self.0 + other.0)
    }
}

impl Measurable for Weight {
    fn measure(&self) -> f64 {
        self.0
    }
}

fn main() {
    let mut container = Container::new();
    container.add_item(Weight(1.5));
    container.add_item(Weight(2.5));
    container.add_item(Weight(3.0));
    
    println!("Total weight: {}", 
        container.sum()
            .map(|w| w.0.to_string())
            .unwrap_or("Empty".to_string()));
            
    println!("Total measurement: {}", 
        container.total_measurement());
}`
      }
    ]
  }
}; 