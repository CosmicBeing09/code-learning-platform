import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { ArrowRight, Code2, Copy, Check, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

const programmingLanguages = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'TypeScript',
  'Ruby',
  'Go',
  'PHP',
  'Swift',
  'Rust'
];

const codeExamples: Record<string, string> = {
  'JavaScript': `// Simple function to calculate factorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5));`,

  'Python': `# Function to find fibonacci numbers
def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    
    return sequence

# Example usage
print(fibonacci(10))`,

  'Java': `// Class to demonstrate bubble sort
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {
                    // swap temp and arr[i]
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }
}`,

  'C++': `// Binary search implementation
#include <iostream>
using namespace std;

int binarySearch(int arr[], int left, int right, int target) {
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target)
            return mid;
            
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int target = 10;
    int n = sizeof(arr) / sizeof(arr[0]);
    
    int result = binarySearch(arr, 0, n-1, target);
    cout << "Element found at index: " << result;
    return 0;
}`,

  'TypeScript': `// Generic stack implementation
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// Example usage
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2`,

  'Ruby': `# Class for implementing a linked list
class Node
  attr_accessor :data, :next
  
  def initialize(data)
    @data = data
    @next = nil
  end
end

class LinkedList
  def initialize
    @head = nil
  end
  
  def append(data)
    if @head.nil?
      @head = Node.new(data)
      return
    end
    
    current = @head
    while current.next
      current = current.next
    end
    current.next = Node.new(data)
  end
end

# Example usage
list = LinkedList.new
list.append(1)
list.append(2)`,

  'Go': `// Simple web server example
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Server starting on port 8080...")
    http.ListenAndServe(":8080", nil)
}`,

  'PHP': `<?php
// Simple REST API endpoint
class UserAPI {
    private $users = [];

    public function getUser($id) {
        if (isset($this->users[$id])) {
            return [
                'status' => 'success',
                'data' => $this->users[$id]
            ];
        }
        return ['status' => 'error', 'message' => 'User not found'];
    }

    public function createUser($data) {
        $id = count($this->users) + 1;
        $this->users[$id] = $data;
        return ['status' => 'success', 'id' => $id];
    }
}

$api = new UserAPI();
echo json_encode($api->createUser(['name' => 'John']));
?>`,

  'Swift': `// Protocol-oriented programming example
protocol Animal {
    var name: String { get }
    func makeSound()
}

class Dog: Animal {
    var name: String
    
    init(name: String) {
        self.name = name
    }
    
    func makeSound() {
        print("\\(name) says: Woof!")
    }
}

// Example usage
let dog = Dog(name: "Buddy")
dog.makeSound()`,

  'Rust': `// Simple concurrent task example
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("Count in thread: {}", i);
            thread::sleep(Duration::from_millis(500));
        }
    });

    for i in 1..5 {
        println!("Main thread: {}", i);
        thread::sleep(Duration::from_millis(300));
    }

    handle.join().unwrap();
}`
};

export function CodeTranslator() {
  const [sourceCode, setSourceCode] = useState('');
  const [translatedCode, setTranslatedCode] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('JavaScript');
  const [targetLanguage, setTargetLanguage] = useState('Python');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const handleTranslate = async () => {
    if (!sourceCode.trim()) {
      toast.error('Please enter some code to translate');
      return;
    }

    if (sourceLanguage === targetLanguage) {
      toast.error('Source and target languages must be different');
      return;
    }

    setIsTranslating(true);

    try {
      const response = await fetch('http://localhost:3333/api/ai/translate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          sourceCode,
          sourceLanguage,
          targetLanguage,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Translation failed');
      }

      const data = await response.json();
      setTranslatedCode(data.translatedCode);
      toast.success('Code translated successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Translation failed');
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = () => {
    if (!translatedCode) return;
    
    navigator.clipboard.writeText(translatedCode);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadExample = () => {
    const example = codeExamples[sourceLanguage];
    if (example) {
      setSourceCode(example);
      toast.success('Example code loaded!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold mb-4">Code Translator</h1>
            <p className="text-gray-600">
              Translate code between different programming languages
            </p>
          </div>
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Source Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Source Code</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoadExample}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Load Example
                </button>
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {programmingLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative h-[400px]">
              <textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                className="w-full h-full font-mono p-4 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ 
                  fontSize: '14px', 
                  lineHeight: '1.5', 
                  tabSize: 2,
                  color: isDarkTheme ? '#fff' : '#000',
                  backgroundColor: isDarkTheme ? '#1e1e1e' : '#ffffff',
                  resize: 'none',
                  whiteSpace: 'pre',
                  overflowY: 'auto'
                }}
                spellCheck="false"
                placeholder="Write your code here..."
              />
            </div>
          </motion.div>

          {/* Translated Code Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Translated Code</h2>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {programmingLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative h-[400px]">
              <SyntaxHighlighter
                language={targetLanguage.toLowerCase()}
                style={isDarkTheme ? vscDarkPlus : vs}
                customStyle={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  margin: 0,
                  padding: '1rem',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0',
                  background: isDarkTheme ? '#1e1e1e' : '#f8f9fa',
                  overflow: 'auto'
                }}
              >
                {translatedCode || '// Translated code will appear here...'}
              </SyntaxHighlighter>
              <button
                onClick={handleCopy}
                disabled={!translatedCode}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-400"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={handleTranslate}
            disabled={isTranslating || !sourceCode.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px] justify-center"
          >
            {isTranslating ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              </div>
            ) : (
              <>
                <ArrowRight className="w-5 h-5" />
                Translate Code
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
} 