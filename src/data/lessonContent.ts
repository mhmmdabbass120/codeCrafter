import { LessonModule } from "@/components/LessonView";
import { pythonBasicsQuiz } from "./sampleQuizzes";

export const pythonFundamentalsModule: LessonModule = {
  id: "python_fundamentals",
  title: "Python Fundamentals",
  description: "Master the core concepts of Python programming from variables to functions",
  totalXP: 250,
  lessons: [
    {
      id: "variables_and_data_types",
      title: "Variables and Data Types",
      description: "Learn how to store and manipulate data in Python",
      estimatedTime: "30 min",
      xpReward: 25,
      content: `
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-primary">Welcome to Python Variables! 🐍</h2>
          
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg border">
            <h3 class="text-lg font-semibold mb-3">What are Variables?</h3>
            <p class="text-muted-foreground">Variables are like labeled boxes where you can store different types of data. In Python, creating a variable is as simple as giving it a name and a value!</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">🔢 Numbers</h3>
              <div class="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                <div class="text-green-600"># Integers (whole numbers)</div>
                <div>age = 25</div>
                <div>students = 100</div>
                <br/>
                <div class="text-green-600"># Floats (decimal numbers)</div>
                <div>price = 19.99</div>
                <div>temperature = 98.6</div>
              </div>
            </div>
            
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">📝 Text (Strings)</h3>
              <div class="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                <div class="text-green-600"># Single or double quotes</div>
                <div>name = "Alice"</div>
                <div>greeting = 'Hello World!'</div>
                <br/>
                <div class="text-green-600"># Multi-line strings</div>
                <div>story = """Once upon a time..."""</div>
              </div>
            </div>
          </div>

          <div class="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
            <h4 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">💡 Pro Tip: F-Strings</h4>
            <p class="text-yellow-700 dark:text-yellow-300 text-sm">F-strings are a modern way to format text with variables:</p>
            <code class="block mt-2 bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded text-sm">
              name = "Python"<br/>
              print(f"I love {name}!")  # Output: I love Python!
            </code>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">🎯 Learning Objectives</h3>
            <ul class="space-y-2 text-muted-foreground">
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Create variables with different data types</li>
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Understand integers, floats, strings, and booleans</li>
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Use f-strings for text formatting</li>
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Follow Python naming conventions</li>
            </ul>
          </div>

          <div class="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-4 rounded-lg">
            <h4 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">📚 External Resources</h4>
            <div class="space-y-2 text-sm">
              <a href="https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator" 
                 class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                 target="_blank" rel="noopener noreferrer">
                📖 Python Official Tutorial - Variables
              </a>
              <a href="https://www.youtube.com/watch?v=Z1Yd_NSC4S4" 
                 class="block text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                 target="_blank" rel="noopener noreferrer">
                🎥 YouTube: Python Variables Explained (Programming with Mosh)
              </a>
              <a href="https://www.coursera.org/learn/python-basics" 
                 class="block text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                 target="_blank" rel="noopener noreferrer">
                🎓 Coursera: Python Basics Course
              </a>
            </div>
          </div>
        </div>
      `,
      codeExercise: {
        id: "variables_exercise_1",
        title: "Create Your Python Profile",
        description: "Create variables to represent information about yourself and display them using f-strings",
        starterCode: `# Welcome to your first Python exercise! 🎉
# Let's create a personal profile using variables

# TODO: Create these variables with your own information:
# 1. name (string) - your name
# 2. age (integer) - your age  
# 3. favorite_color (string) - your favorite color
# 4. is_student (boolean) - whether you're a student
# 5. height (float) - your height in feet

# Your code here:


# TODO: Use f-strings to print a nice introduction
# Example: print(f"Hi! My name is {name} and I'm {age} years old.")

print("=== My Python Profile ===")
# Your print statements here:


print("Welcome to Python! 🐍")`,
        expectedOutput: `=== My Python Profile ===
Hi! My name is Alex and I'm 25 years old.
My favorite color is blue and I love it!
Student status: True
I am 5.8 feet tall.
Welcome to Python! 🐍`,
        hint: "Remember: strings use quotes, numbers don't need quotes, and booleans are True/False (capitalized!)",
        xpReward: 20,
        difficulty: "easy"
      },
      quiz: pythonBasicsQuiz
    },
    {
      id: "control_structures",
      title: "Control Structures: If Statements and Loops",
      description: "Learn to control the flow of your programs with conditions and loops",
      estimatedTime: "45 min",
      xpReward: 35,
      content: `
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-primary">Control the Flow! 🌊</h2>
          
          <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-6 rounded-lg border">
            <h3 class="text-lg font-semibold mb-3">Making Decisions with If Statements</h3>
            <p class="text-muted-foreground">Programs need to make decisions! If statements let your code choose different paths based on conditions.</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">🤔 If Statements</h3>
              <div class="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                <div class="text-green-600"># Basic if statement</div>
                <div>age = 18</div>
                <div>if age >= 18:</div>
                <div class="ml-4">print("You can vote!")</div>
                <br/>
                <div class="text-green-600"># If-else</div>
                <div>if temperature > 80:</div>
                <div class="ml-4">print("It's hot!")</div>
                <div>else:</div>
                <div class="ml-4">print("Perfect weather!")</div>
              </div>
            </div>
            
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">🔄 For Loops</h3>
              <div class="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                <div class="text-green-600"># Loop through numbers</div>
                <div>for i in range(5):</div>
                <div class="ml-4">print(f"Count: {i}")</div>
                <br/>
                <div class="text-green-600"># Loop through a list</div>
                <div>fruits = ["apple", "banana"]</div>
                <div>for fruit in fruits:</div>
                <div class="ml-4">print(f"I like {fruit}")</div>
              </div>
            </div>
          </div>

          <div class="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 p-4 rounded-lg">
            <h4 class="font-semibold text-orange-800 dark:text-orange-200 mb-2">⚡ While Loops</h4>
            <p class="text-orange-700 dark:text-orange-300 text-sm mb-2">While loops continue until a condition becomes False:</p>
            <code class="block bg-orange-100 dark:bg-orange-900/50 p-2 rounded text-sm">
              count = 0<br/>
              while count < 3:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;print(f"Count is {count}")<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;count += 1  # Don't forget to update!
            </code>
          </div>

          <div class="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-4 rounded-lg">
            <h4 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">📚 Additional Resources</h4>
            <div class="space-y-2 text-sm">
              <a href="https://www.youtube.com/watch?v=9Os0o3wzS_I" 
                 class="block text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                 target="_blank" rel="noopener noreferrer">
                🎥 YouTube: Python If Statements (Corey Schafer)
              </a>
              <a href="https://realpython.com/python-conditional-statements/" 
                 class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                 target="_blank" rel="noopener noreferrer">
                📖 Real Python: Conditional Statements Guide
              </a>
            </div>
          </div>
        </div>
      `,
      codeExercise: {
        id: "control_structures_exercise",
        title: "Grade Calculator",
        description: "Build a program that calculates letter grades and provides feedback",
        starterCode: `# Grade Calculator Exercise 📊
# Let's build a smart grade calculator!

# TODO: Ask user for their score (we'll simulate with a variable)
score = 85  # You can change this to test different scores

# TODO: Create if-elif-else statements to determine letter grade
# A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: below 60

print(f"Your score: \\{score\\}")

# Your if-elif-else code here:


# TODO: Use a for loop to show encouragement messages
encouragements = [
    "Keep up the great work! 🌟",
    "You're making progress! 📈", 
    "Every day you're getting better! 💪"
]

print("\\nMotivational messages:")
# Your for loop here:


# Bonus: Calculate how many points needed for next grade level
# Your bonus code here (optional):
`,
        expectedOutput: `Your score: 85
Letter Grade: B
Great job! You're doing well!

Motivational messages:
Keep up the great work! 🌟
You're making progress! 📈
Every day you're getting better! 💪

Points needed for A: 5`,
        hint: "Use elif for multiple conditions, and remember that Python checks conditions in order from top to bottom!",
        xpReward: 25,
        difficulty: "medium"
      }
    },
    {
      id: "functions_intro",
      title: "Functions: Code That Works for You",
      description: "Learn to write reusable code with Python functions",
      estimatedTime: "40 min",
      xpReward: 30,
      content: `
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-primary">Functions: Your Code Helpers! 🔧</h2>
          
          <div class="bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-cyan-950 dark:to-indigo-950 p-6 rounded-lg border">
            <h3 class="text-lg font-semibold mb-3">Why Functions?</h3>
            <p class="text-muted-foreground">Functions are like mini-programs within your program. Write once, use everywhere!</p>
          </div>

          <div class="space-y-6">
            <div class="bg-muted/30 p-4 rounded-lg font-mono text-sm">
              <div class="text-green-600"># Basic function</div>
              <div>def greet():</div>
              <div class="ml-4">print("Hello, World!")</div>
              <br/>
              <div class="text-green-600"># Call the function</div>
              <div>greet()  # Output: Hello, World!</div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h3 class="text-lg font-semibold">📥 Parameters</h3>
                <div class="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                  <div class="text-green-600"># Function with parameters</div>
                  <div>def greet_person(name):</div>
                  <div class="ml-4">print(f"Hello, {name}!")</div>
                  <br/>
                  <div>greet_person("Alice")</div>
                  <div class="text-gray-500"># Output: Hello, Alice!</div>
                </div>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-lg font-semibold">📤 Return Values</h3>
                <div class="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                  <div class="text-green-600"># Function that returns</div>
                  <div>def add_numbers(a, b):</div>
                  <div class="ml-4">return a + b</div>
                  <br/>
                  <div>result = add_numbers(5, 3)</div>
                  <div class="text-gray-500"># result = 8</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">🎯 Function Best Practices</h4>
            <ul class="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• Use descriptive names (calculate_tax, not ct)</li>
              <li>• Keep functions focused on one task</li>
              <li>• Add docstrings to explain what the function does</li>
              <li>• Use return statements to give back results</li>
            </ul>
          </div>

          <div class="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-4 rounded-lg">
            <h4 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">📚 Learning Resources</h4>
            <div class="space-y-2 text-sm">
              <a href="https://www.youtube.com/watch?v=9Os0o3wzS_I" 
                 class="block text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                 target="_blank" rel="noopener noreferrer">
                🎥 YouTube: Python Functions Tutorial
              </a>
              <a href="https://docs.python.org/3/tutorial/controlflow.html#defining-functions" 
                 class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                 target="_blank" rel="noopener noreferrer">
                📖 Python Docs: Defining Functions
              </a>
            </div>
          </div>
        </div>
      `,
      codeExercise: {
        id: "functions_exercise",
        title: "Personal Calculator",
        description: "Create a calculator with different functions for various operations",
        starterCode: `# Personal Calculator Exercise 🧮
# Let's build a calculator using functions!

# TODO: Create a function called 'add' that takes two parameters and returns their sum
def add(a, b):
    # Your code here
    pass

# TODO: Create a function called 'multiply' that takes two parameters and returns their product  
def multiply(a, b):
    # Your code here
    pass

# TODO: Create a function called 'calculate_tip' that takes bill amount and tip percentage
# It should return the tip amount (not the total)
def calculate_tip(bill, tip_percent):
    # Your code here
    pass

# TODO: Create a function called 'greet_calculator' that takes a name and prints a welcome message
def greet_calculator(name):
    # Your code here
    pass

# Test your functions (don't modify this part):
print("=== Calculator Tests ===")
greet_calculator("Python Learner")

result1 = add(10, 5)
print(f"10 + 5 = \\{result1\\}")

result2 = multiply(4, 7)  
print(f"4 × 7 = \\{result2\\}")

tip = calculate_tip(50.00, 20)
print(f"Tip on \\$50.00 at 20%: \\$\\{tip\\}")

print("Calculator ready! 🎉")`,
        expectedOutput: `=== Calculator Tests ===
Welcome to the calculator, Python Learner! 🧮

10 + 5 = 15
4 × 7 = 28
Tip on \\$50.00 at 20%: \\$10.0
Calculator ready! 🎉`,
        hint: "Functions use 'def' keyword, remember to 'return' values, and use 'pass' as a placeholder until you write the actual code!",
        xpReward: 30,
        difficulty: "medium"
      }
    }
  ]
};

export const allModules = [pythonFundamentalsModule];
