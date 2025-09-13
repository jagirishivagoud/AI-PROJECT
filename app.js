const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// API Routes

app.post('/analyze', (req, res) => {
  const code = req.body.code;
  // Mock AI analysis: Simple explanation based on keywords
  let explanation = "This code appears to be JavaScript. ";
  if (code.includes('function')) {
    explanation += "It defines a function. ";
  }
  if (code.includes('console.log')) {
    explanation += "It logs output to the console. ";
  }
  if (code.includes('if')) {
    explanation += "It includes conditional logic. ";
  }
  if (code.includes('for') || code.includes('while')) {
    explanation += "It contains a loop. ";
  }
  // Add more analysis as needed
  res.json({ explanation });
});

app.post('/debug', (req, res) => {
  const code = req.body.code;
  let errors = [];
  let suggestions = [];
  // Simple regex-based error detection
  if (/var\s+\w+\s*=\s*[^;]*$/.test(code) && !code.includes(';')) {
    errors.push("Missing semicolon after variable assignment.");
    suggestions.push("Add ';' at the end of the assignment statement.");
  }
  if (/console\.log\([^)]*$/.test(code)) {
    errors.push("Unclosed console.log statement.");
    suggestions.push("Ensure parentheses are properly closed.");
  }
  if (/\bundefined\b/.test(code)) {
    errors.push("Possible use of undefined variable.");
    suggestions.push("Check variable declarations and scopes.");
  }
  // More checks can be added for specific errors
  res.json({ errors, suggestions });
});

app.post('/generate-exercise', (req, res) => {
  const level = req.body.level;
  const exercises = {
    beginner: [
      { title: "Hello World", description: "Write a program that prints 'Hello, World!' to the console.", code: "console.log('Hello, World!');" },
      { title: "Variables", description: "Declare a variable 'name' and assign your name to it, then log it.", code: "var name = 'Your Name'; console.log(name);" }
    ],
    intermediate: [
      { title: "Sum Function", description: "Write a function that takes two numbers and returns their sum.", code: "function sum(a, b) { return a + b; } console.log(sum(2, 3));" },
      { title: "Array Loop", description: "Create an array of numbers and log each one using a loop.", code: "var arr = [1, 2, 3]; for (var i = 0; i < arr.length; i++) { console.log(arr[i]); }" }
    ],
    advanced: [
      { title: "Fibonacci", description: "Write a recursive function to calculate the nth Fibonacci number.", code: "function fib(n) { if (n <= 1) return n; return fib(n-1) + fib(n-2); } console.log(fib(5));" },
      { title: "Object Manipulation", description: "Create an object with properties and a method, then call the method.", code: "var obj = { name: 'Test', greet: function() { console.log('Hello ' + this.name); } }; obj.greet();" }
    ]
  };
  const levelExercises = exercises[level];
  if (levelExercises) {
    const ex = levelExercises[Math.floor(Math.random() * levelExercises.length)];
    res.json(ex);
  } else {
    res.json({ title: "Invalid Level", description: "Please choose beginner, intermediate, or advanced.", code: "" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
