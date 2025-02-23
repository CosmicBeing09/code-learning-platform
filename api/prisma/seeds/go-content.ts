import { CourseContent } from './types';

export const goContent: CourseContent = {
  'go1': {
    title: 'Go Fundamentals',
    description: "Introduction to Go programming basics",
    content: `
# Go Fundamentals

## 1. Basic Syntax and Types

\`\`\`go
package main

import "fmt"

func main() {
    // Variables and basic types
    var age int = 25
    name := "Alice"  // Short declaration
    const pi = 3.14159

    // Basic types
    var (
        integer int     = 42
        float   float64 = 3.14
        boolean bool    = true
        text    string  = "Hello, Go!"
    )

    // Arrays and slices
    numbers := []int{1, 2, 3, 4, 5}
    fmt.Printf("Numbers: %v\\n", numbers)
}
\`\`\`

## 2. Control Structures

\`\`\`go
// If statements
if score := 85; score >= 90 {
    fmt.Println("A grade")
} else if score >= 80 {
    fmt.Println("B grade")
} else {
    fmt.Println("Below B")
}

// For loops
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// Range loop
fruits := []string{"apple", "banana", "orange"}
for index, value := range fruits {
    fmt.Printf("%d: %s\\n", index, value)
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a function that finds the sum and average of numbers in a slice",
        hints: [
          "Use range to iterate",
          "Handle empty slice case",
          "Return multiple values"
        ],
        solution: `package main

import "fmt"

func calculateStats(numbers []float64) (sum float64, avg float64) {
    if len(numbers) == 0 {
        return 0, 0
    }

    for _, num := range numbers {
        sum += num
    }
    avg = sum / float64(len(numbers))
    return
}

func main() {
    nums := []float64{23.5, 45.1, 67.8, 90.2, 12.4}
    sum, avg := calculateStats(nums)
    fmt.Printf("Sum: %.2f, Average: %.2f\\n", sum, avg)
}`
      }
    ]
  },
  'go2': {
    title: 'Functions and Methods',
    description: "Understanding Go functions, methods, and interfaces",
    content: `
# Functions and Methods

## 1. Function Types

\`\`\`go
// Multiple return values
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Variadic functions
func sum(numbers ...int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

// Function as value
type MathFunc func(int, int) int

func operate(a, b int, op MathFunc) int {
    return op(a, b)
}
\`\`\`

## 2. Methods and Interfaces

\`\`\`go
type Rectangle struct {
    width, height float64
}

// Method
func (r Rectangle) Area() float64 {
    return r.width * r.height
}

// Interface
type Shape interface {
    Area() float64
    Perimeter() float64
}

// Implementing interface
func (r Rectangle) Perimeter() float64 {
    return 2 * (r.width + r.height)
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a geometry calculator with interfaces",
        hints: [
          "Define Shape interface",
          "Implement for multiple shapes",
          "Use method receivers"
        ],
        solution: `package main

import (
    "fmt"
    "math"
)

type Shape interface {
    Area() float64
    Name() string
}

type Circle struct {
    radius float64
}

type Square struct {
    side float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.radius * c.radius
}

func (c Circle) Name() string {
    return "Circle"
}

func (s Square) Area() float64 {
    return s.side * s.side
}

func (s Square) Name() string {
    return "Square"
}

func printArea(s Shape) {
    fmt.Printf("%s area: %.2f\\n", s.Name(), s.Area())
}

func main() {
    shapes := []Shape{
        Circle{radius: 5},
        Square{side: 4},
    }
    
    for _, shape := range shapes {
        printArea(shape)
    }
}`
      }
    ]
  },
  'go3': {
    title: 'Concurrency with Goroutines',
    description: "Master Go's powerful concurrency features",
    content: `
# Concurrency in Go

## 1. Goroutines and Channels

\`\`\`go
func main() {
    // Basic goroutine
    go func() {
        fmt.Println("Running in goroutine")
    }()

    // Channels
    ch := make(chan string)
    go func() {
        ch <- "Hello from goroutine!"
    }()
    msg := <-ch
    fmt.Println(msg)

    // Buffered channels
    buffer := make(chan int, 2)
    buffer <- 1
    buffer <- 2
    fmt.Println(<-buffer, <-buffer)
}
\`\`\`

## 2. Select and Timeouts

\`\`\`go
func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(time.Second)
        ch1 <- "one"
    }()

    go func() {
        time.Sleep(time.Second * 2)
        ch2 <- "two"
    }()

    select {
    case msg1 := <-ch1:
        fmt.Println("Received", msg1)
    case msg2 := <-ch2:
        fmt.Println("Received", msg2)
    case <-time.After(time.Second * 3):
        fmt.Println("Timeout")
    }
}
\`\`\`
`,
    exercises: [
      {
        question: "Implement a concurrent web scraper",
        hints: [
          "Use goroutines for parallel requests",
          "Implement worker pool pattern",
          "Handle rate limiting"
        ],
        solution: `package main

import (
    "fmt"
    "net/http"
    "sync"
    "time"
)

func fetchURL(url string, wg *sync.WaitGroup, results chan<- string) {
    defer wg.Done()
    
    resp, err := http.Get(url)
    if err != nil {
        results <- fmt.Sprintf("%s: ERROR - %v", url, err)
        return
    }
    defer resp.Body.Close()
    
    results <- fmt.Sprintf("%s: %s", url, resp.Status)
}

func main() {
    urls := []string{
        "https://golang.org",
        "https://github.com",
        "https://google.com",
    }
    
    var wg sync.WaitGroup
    results := make(chan string, len(urls))
    
    for _, url := range urls {
        wg.Add(1)
        go fetchURL(url, &wg, results)
        time.Sleep(time.Millisecond * 100) // Rate limiting
    }
    
    // Close results channel when all goroutines complete
    go func() {
        wg.Wait()
        close(results)
    }()
    
    // Print results as they arrive
    for result := range results {
        fmt.Println(result)
    }
}`
      }
    ]
  },
  'go4': {
    title: 'Error Handling and Testing',
    description: "Learn Go's approach to errors and testing",
    content: `
# Error Handling and Testing

## 1. Error Handling Patterns

\`\`\`go
// Custom error type
type ValidationError struct {
    Field string
    Error string
}

func (v *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", v.Field, v.Error)
}

// Error handling
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, &ValidationError{
            Field: "denominator",
            Error: "cannot be zero",
        }
    }
    return a / b, nil
}

// Multiple error handling
func process() error {
    err := step1()
    if err != nil {
        return fmt.Errorf("step1 failed: %w", err)
    }
    
    return nil
}
\`\`\`

## 2. Testing

\`\`\`go
// math/math_test.go
package math

import "testing"

func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive", 2, 3, 5},
        {"negative", -2, -3, -5},
        {"zero", 0, 0, 0},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := Add(tt.a, tt.b)
            if result != tt.expected {
                t.Errorf("Add(%d, %d) = %d; want %d",
                    tt.a, tt.b, result, tt.expected)
            }
        })
    }
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a robust file processing function with error handling and tests",
        hints: [
          "Use custom error types",
          "Implement error wrapping",
          "Write table-driven tests"
        ],
        solution: `package fileprocessor

import (
    "fmt"
    "io"
    "os"
)

type ProcessError struct {
    Op   string
    Path string
    Err  error
}

func (e *ProcessError) Error() string {
    return fmt.Sprintf("%s %s: %v", e.Op, e.Path, e.Err)
}

func (e *ProcessError) Unwrap() error {
    return e.Err
}

func ProcessFile(path string) error {
    file, err := os.Open(path)
    if err != nil {
        return &ProcessError{"open", path, err}
    }
    defer file.Close()

    data, err := io.ReadAll(file)
    if err != nil {
        return &ProcessError{"read", path, err}
    }

    // Process data...
    return nil
}

// Test file
package fileprocessor

import (
    "os"
    "testing"
)

func TestProcessFile(t *testing.T) {
    tests := []struct {
        name     string
        path     string
        wantErr  bool
        errType  string
    }{
        {
            name:    "nonexistent file",
            path:    "nonexistent.txt",
            wantErr: true,
            errType: "open",
        },
        {
            name:    "valid file",
            path:    "testdata/valid.txt",
            wantErr: false,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            err := ProcessFile(tt.path)
            if (err != nil) != tt.wantErr {
                t.Errorf("ProcessFile() error = %v, wantErr %v",
                    err, tt.wantErr)
            }
            if err != nil && tt.errType != "" {
                var procErr *ProcessError
                if !errors.As(err, &procErr) {
                    t.Errorf("error is not ProcessError")
                }
                if procErr.Op != tt.errType {
                    t.Errorf("error type = %s, want %s",
                        procErr.Op, tt.errType)
                }
            }
        })
    }
}`
      }
    ]
  },
  'go5': {
    title: 'Web Development with Go',
    description: "Build web applications using Go's standard library and frameworks",
    content: `
# Web Development

## 1. HTTP Server

\`\`\`go
package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type User struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

func userHandler(w http.ResponseWriter, r *http.Request) {
    user := User{1, "John Doe"}
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

func main() {
    http.HandleFunc("/user", userHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
\`\`\`

## 2. Middleware and Routing

\`\`\`go
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

type Router struct {
    *http.ServeMux
}

func NewRouter() *Router {
    return &Router{http.NewServeMux()}
}

func (r *Router) Get(pattern string, handler http.HandlerFunc) {
    r.HandleFunc(pattern, func(w http.ResponseWriter, req *http.Request) {
        if req.Method != http.MethodGet {
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
            return
        }
        handler(w, req)
    })
}
\`\`\`
`,
    exercises: [
      {
        question: "Create a RESTful API with middleware and error handling",
        hints: [
          "Implement CRUD operations",
          "Add authentication middleware",
          "Use proper status codes"
        ],
        solution: `package main

import (
    "encoding/json"
    "log"
    "net/http"
    "sync"
)

type Task struct {
    ID     int    \`json:"id"\`
    Title  string \`json:"title"\`
    Done   bool   \`json:"done"\`
}

type TaskStore struct {
    sync.RWMutex
    tasks  map[int]Task
    nextID int
}

func NewTaskStore() *TaskStore {
    return &TaskStore{
        tasks:  make(map[int]Task),
        nextID: 1,
    }
}

func (ts *TaskStore) Create(task Task) Task {
    ts.Lock()
    defer ts.Unlock()
    
    task.ID = ts.nextID
    ts.tasks[task.ID] = task
    ts.nextID++
    return task
}

func (ts *TaskStore) Get(id int) (Task, bool) {
    ts.RLock()
    defer ts.RUnlock()
    task, ok := ts.tasks[id]
    return task, ok
}

type Server struct {
    store *TaskStore
}

func (s *Server) createTaskHandler(w http.ResponseWriter, r *http.Request) {
    var task Task
    if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    
    task = s.store.Create(task)
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(task)
}

func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token != "secret-token" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}

func main() {
    server := &Server{
        store: NewTaskStore(),
    }
    
    mux := http.NewServeMux()
    mux.HandleFunc("/tasks", server.createTaskHandler)
    
    handler := authMiddleware(mux)
    handler = loggingMiddleware(handler)
    
    log.Fatal(http.ListenAndServe(":8080", handler))
}`
      }
    ]
  }
}; 