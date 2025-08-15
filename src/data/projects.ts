export interface ProjectResource {
  type: 'video' | 'pdf' | 'article' | 'github' | 'documentation';
  title: string;
  url: string;
  description: string;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  code?: string;
  hint?: string;
  completed?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  technologies: string[];
  learningObjectives: string[];
  prerequisites: string[];
  xpReward: number;
  thumbnail?: string;
  steps: ProjectStep[];
  resources: ProjectResource[];
  finalCode?: string;
  demoUrl?: string;
}

export const beginnerProjects: Project[] = [
  {
    id: "calculator_project",
    title: "Interactive Calculator",
    description: "Build a fully functional calculator that can perform basic arithmetic operations with a beautiful interface.",
    difficulty: "beginner",
    estimatedTime: "2-3 hours",
    technologies: ["Python", "Functions", "Input/Output", "Error Handling"],
    learningObjectives: [
      "Practice function creation and usage",
      "Implement user input validation",
      "Handle mathematical operations",
      "Create a user-friendly interface"
    ],
    prerequisites: ["Variables and Data Types", "Functions", "If Statements"],
    xpReward: 100,
    steps: [
      {
        id: "step1",
        title: "Setup and Basic Structure",
        description: "Create the main calculator function and display welcome message",
        code: `def calculator():
    """Interactive Calculator Program"""
    print("=== Python Calculator ===")
    print("Operations: +, -, *, /")
    print("Type 'quit' to exit")
    
    while True:
        # We'll add the main logic here
        pass

# Test the function
calculator()`,
        hint: "Start with a simple while loop structure and a welcome message"
      },
      {
        id: "step2", 
        title: "Get User Input",
        description: "Create functions to get numbers and operation from user",
        code: `def get_number(prompt):
    """Get a valid number from user"""
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Please enter a valid number!")

def get_operation():
    """Get a valid operation from user"""
    valid_ops = ['+', '-', '*', '/']
    while True:
        op = input("Enter operation (+, -, *, /): ").strip()
        if op in valid_ops:
            return op
        print("Please enter a valid operation!")`,
        hint: "Use try-except blocks to handle invalid input gracefully"
      },
      {
        id: "step3",
        title: "Implement Calculator Operations", 
        description: "Create functions for each mathematical operation",
        code: `def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "Error: Cannot divide by zero!"
    return x / y

def calculate(num1, operation, num2):
    """Perform calculation based on operation"""
    if operation == '+':
        return add(num1, num2)
    elif operation == '-':
        return subtract(num1, num2)
    elif operation == '*':
        return multiply(num1, num2)
    elif operation == '/':
        return divide(num1, num2)`,
        hint: "Remember to handle division by zero!"
      },
      {
        id: "step4",
        title: "Complete the Main Loop",
        description: "Put it all together with the main calculator loop",
        code: `def calculator():
    """Interactive Calculator Program"""
    print("=== Python Calculator ===")
    print("Operations: +, -, *, /")
    print("Type 'quit' to exit\\n")
    
    while True:
        # Check if user wants to quit
        first_input = input("Enter first number (or 'quit' to exit): ").strip()
        if first_input.lower() == 'quit':
            print("Thanks for using the calculator! 👋")
            break
        
        try:
            num1 = float(first_input)
            operation = get_operation()
            num2 = get_number("Enter second number: ")
            
            result = calculate(num1, operation, num2)
            print(f"\\n{num1} {operation} {num2} = {result}\\n")
            print("-" * 30)
            
        except ValueError:
            print("Please enter a valid number!\\n")

# Run the calculator
calculator()`,
        hint: "Test your calculator with different operations and edge cases"
      }
    ],
    resources: [
      {
        type: 'video',
        title: 'Python Calculator Tutorial',
        url: 'https://www.youtube.com/watch?v=u4deDenwtJY',
        description: 'Step-by-step video tutorial for building a Python calculator',
        duration: '25 min',
        difficulty: 'beginner'
      },
      {
        type: 'pdf',
        title: 'Python Functions Guide',
        url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
        description: 'Official Python documentation on functions',
        difficulty: 'beginner'
      },
      {
        type: 'article',
        title: 'Error Handling in Python',
        url: 'https://realpython.com/python-exceptions-handling/',
        description: 'Comprehensive guide to handling errors in Python',
        difficulty: 'beginner'
      }
    ],
    finalCode: `def get_number(prompt):
    """Get a valid number from user"""
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Please enter a valid number!")

def get_operation():
    """Get a valid operation from user"""
    valid_ops = ['+', '-', '*', '/']
    while True:
        op = input("Enter operation (+, -, *, /): ").strip()
        if op in valid_ops:
            return op
        print("Please enter a valid operation!")

def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "Error: Cannot divide by zero!"
    return x / y

def calculate(num1, operation, num2):
    """Perform calculation based on operation"""
    if operation == '+':
        return add(num1, num2)
    elif operation == '-':
        return subtract(num1, num2)
    elif operation == '*':
        return multiply(num1, num2)
    elif operation == '/':
        return divide(num1, num2)

def calculator():
    """Interactive Calculator Program"""
    print("=== Python Calculator ===")
    print("Operations: +, -, *, /")
    print("Type 'quit' to exit\\n")
    
    while True:
        first_input = input("Enter first number (or 'quit' to exit): ").strip()
        if first_input.lower() == 'quit':
            print("Thanks for using the calculator! 👋")
            break
        
        try:
            num1 = float(first_input)
            operation = get_operation()
            num2 = get_number("Enter second number: ")
            
            result = calculate(num1, operation, num2)
            print(f"\\n{num1} {operation} {num2} = {result}\\n")
            print("-" * 30)
            
        except ValueError:
            print("Please enter a valid number!\\n")

# Run the calculator
if __name__ == "__main__":
    calculator()`
  },
  {
    id: "todo_list_project",
    title: "Smart To-Do List Manager",
    description: "Create a feature-rich to-do list application with priority levels, due dates, and persistence.",
    difficulty: "beginner", 
    estimatedTime: "3-4 hours",
    technologies: ["Python", "Lists", "Dictionaries", "File I/O", "JSON"],
    learningObjectives: [
      "Work with complex data structures",
      "Implement CRUD operations", 
      "Handle file operations and data persistence",
      "Create a menu-driven interface"
    ],
    prerequisites: ["Lists and Dictionaries", "Functions", "File Operations"],
    xpReward: 150,
    steps: [
      {
        id: "step1",
        title: "Design the Task Data Structure",
        description: "Create a class or dictionary structure to represent tasks",
        code: `import json
from datetime import datetime, date

def create_task(title, description="", priority="medium", due_date=None):
    """Create a new task dictionary"""
    return {
        "id": datetime.now().timestamp(),
        "title": title,
        "description": description,
        "priority": priority,  # low, medium, high
        "due_date": due_date,
        "completed": False,
        "created_at": datetime.now().isoformat()
    }

# Test creating a task
sample_task = create_task("Learn Python", "Complete the Python fundamentals course", "high")
print(sample_task)`,
        hint: "Think about what information each task should store"
      },
      {
        id: "step2",
        title: "Implement Core CRUD Operations",
        description: "Create functions to add, view, update, and delete tasks",
        code: `tasks = []

def add_task(title, description="", priority="medium", due_date=None):
    """Add a new task to the list"""
    task = create_task(title, description, priority, due_date)
    tasks.append(task)
    print(f"✅ Task '{title}' added successfully!")
    return task

def view_tasks(filter_by=None):
    """Display all tasks or filtered tasks"""
    if not tasks:
        print("📝 No tasks found!")
        return
    
    filtered_tasks = tasks
    if filter_by == "pending":
        filtered_tasks = [task for task in tasks if not task["completed"]]
    elif filter_by == "completed":
        filtered_tasks = [task for task in tasks if task["completed"]]
    
    print("\\n=== Your Tasks ===")
    for i, task in enumerate(filtered_tasks, 1):
        status = "✅" if task["completed"] else "⏳"
        priority_icon = {"high": "🔴", "medium": "🟡", "low": "🟢"}[task["priority"]]
        print(f"{i}. {status} {priority_icon} {task['title']}")
        if task["description"]:
            print(f"   📝 {task['description']}")
    print()

def complete_task(task_index):
    """Mark a task as completed"""
    if 0 <= task_index < len(tasks):
        tasks[task_index]["completed"] = True
        print(f"🎉 Task '{tasks[task_index]['title']}' completed!")
    else:
        print("❌ Invalid task number!")`,
        hint: "Use list operations and indexing to manage tasks"
      }
    ],
    resources: [
      {
        type: 'video',
        title: 'Python To-Do List Tutorial',
        url: 'https://www.youtube.com/watch?v=gQkVsOJnR4s',
        description: 'Building a to-do list application in Python',
        duration: '45 min',
        difficulty: 'beginner'
      },
      {
        type: 'documentation',
        title: 'Python JSON Module',
        url: 'https://docs.python.org/3/library/json.html',
        description: 'Official documentation for working with JSON in Python',
        difficulty: 'beginner'
      }
    ]
  },
  {
    id: "number_guessing_game",
    title: "Smart Number Guessing Game",
    description: "Build an intelligent number guessing game with hints, difficulty levels, and score tracking.",
    difficulty: "beginner",
    estimatedTime: "2 hours", 
    technologies: ["Python", "Random", "Loops", "Conditionals"],
    learningObjectives: [
      "Use the random module",
      "Implement game logic with loops",
      "Provide intelligent hints",
      "Track and display statistics"
    ],
    prerequisites: ["Variables", "If Statements", "Loops", "Functions"],
    xpReward: 80,
    steps: [
      {
        id: "step1",
        title: "Basic Game Setup",
        description: "Create the basic game structure with random number generation",
        code: `import random

def start_game():
    """Initialize and start the guessing game"""
    print("🎯 Welcome to the Number Guessing Game!")
    print("I'm thinking of a number...")
    
    # Choose difficulty
    difficulty = choose_difficulty()
    max_number, max_attempts = get_game_settings(difficulty)
    
    # Generate random number
    secret_number = random.randint(1, max_number)
    
    print(f"Guess the number between 1 and {max_number}")
    print(f"You have {max_attempts} attempts!\\n")
    
    return secret_number, max_attempts

def choose_difficulty():
    """Let player choose difficulty level"""
    print("Choose difficulty:")
    print("1. Easy (1-50, 10 attempts)")
    print("2. Medium (1-100, 7 attempts)")  
    print("3. Hard (1-200, 5 attempts)")
    
    while True:
        choice = input("Enter your choice (1-3): ").strip()
        if choice in ['1', '2', '3']:
            return choice
        print("Please enter 1, 2, or 3!")

def get_game_settings(difficulty):
    """Return max number and attempts based on difficulty"""
    settings = {
        '1': (50, 10),    # Easy
        '2': (100, 7),    # Medium  
        '3': (200, 5)     # Hard
    }
    return settings[difficulty]`,
        hint: "Use the random module to generate numbers and get user input for difficulty"
      }
    ],
    resources: [
      {
        type: 'video',
        title: 'Python Random Module Tutorial',
        url: 'https://www.youtube.com/watch?v=KzqSDvzOFNA',
        description: 'Learn how to use Python\'s random module',
        duration: '15 min',
        difficulty: 'beginner'
      }
    ]
  }
];

export const intermediateProjects: Project[] = [
  {
    id: "weather_app",
    title: "Weather Dashboard",
    description: "Build a weather application that fetches real-time weather data and displays it beautifully.",
    difficulty: "intermediate",
    estimatedTime: "4-6 hours",
    technologies: ["Python", "APIs", "JSON", "Error Handling", "Data Visualization"],
    learningObjectives: [
      "Work with REST APIs",
      "Parse JSON data",
      "Handle API errors gracefully",
      "Create data visualizations"
    ],
    prerequisites: ["Functions", "Error Handling", "Dictionaries", "HTTP Requests"],
    xpReward: 200,
    steps: [],
    resources: [
      {
        type: 'video',
        title: 'Python Weather App Tutorial',
        url: 'https://www.youtube.com/watch?v=M2NyXKxyUKo',
        description: 'Build a weather app using Python and APIs',
        duration: '1 hour',
        difficulty: 'intermediate'
      },
      {
        type: 'documentation',
        title: 'OpenWeatherMap API',
        url: 'https://openweathermap.org/api',
        description: 'Free weather API documentation',
        difficulty: 'intermediate'
      }
    ]
  }
];

export const advancedProjects: Project[] = [
  {
    id: "ai_chatbot",
    title: "AI-Powered Chatbot",
    description: "Create an intelligent chatbot using natural language processing and machine learning.",
    difficulty: "advanced",
    estimatedTime: "8-12 hours",
    technologies: ["Python", "NLP", "Machine Learning", "APIs", "Neural Networks"],
    learningObjectives: [
      "Understand natural language processing",
      "Implement machine learning models",
      "Work with AI/ML APIs",
      "Build conversational interfaces"
    ],
    prerequisites: ["Advanced Python", "Data Structures", "API Integration", "Basic ML Concepts"],
    xpReward: 500,
    steps: [],
    resources: [
      {
        type: 'video',
        title: 'Building Chatbots with Python',
        url: 'https://www.youtube.com/watch?v=wypVcNIH6D4',
        description: 'Complete chatbot development tutorial',
        duration: '2 hours',
        difficulty: 'advanced'
      },
      {
        type: 'github',
        title: 'ChatterBot Python Library',
        url: 'https://github.com/gunthercox/ChatterBot',
        description: 'Python library for creating chatbots',
        difficulty: 'advanced'
      }
    ]
  }
];

export const allProjects = [
  ...beginnerProjects,
  ...intermediateProjects, 
  ...advancedProjects
];
