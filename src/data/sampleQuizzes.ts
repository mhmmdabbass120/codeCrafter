import { Quiz } from "@/components/InteractiveQuiz";

export const pythonBasicsQuiz: Quiz = {
  id: "python_basics_variables_quiz",
  title: "Python Variables & Data Types Quiz",
  description: "Test your knowledge of Python variables and basic data types",
  passingScore: 70,
  xpReward: 25,
  timeLimit: 180, // 3 minutes
  questions: [
    {
      id: "q1_variable_assignment",
      question: "Which of the following is the correct way to assign a string value to a variable in Python?",
      difficulty: "easy",
      options: [
        {
          id: "a",
          text: "name = 'Alice'",
          isCorrect: true
        },
        {
          id: "b",
          text: "name := 'Alice'",
          isCorrect: false
        },
        {
          id: "c",
          text: "string name = 'Alice'",
          isCorrect: false
        },
        {
          id: "d",
          text: "var name = 'Alice'",
          isCorrect: false
        }
      ],
      explanation: "In Python, variables are assigned using the equals sign (=). No type declaration is needed.",
      hint: "Python uses simple assignment with the = operator, unlike some other programming languages."
    },
    {
      id: "q2_data_types",
      question: "What data type is the value 42 in Python?",
      difficulty: "easy",
      options: [
        {
          id: "a",
          text: "string",
          isCorrect: false
        },
        {
          id: "b",
          text: "float",
          isCorrect: false
        },
        {
          id: "c",
          text: "integer",
          isCorrect: true
        },
        {
          id: "d",
          text: "boolean",
          isCorrect: false
        }
      ],
      explanation: "42 is a whole number without a decimal point, making it an integer (int) in Python.",
      hint: "Look at whether the number has a decimal point or not."
    },
    {
      id: "q3_boolean_values",
      question: "Which of these are valid boolean values in Python?",
      difficulty: "medium",
      options: [
        {
          id: "a",
          text: "true and false",
          isCorrect: false
        },
        {
          id: "b",
          text: "True and False",
          isCorrect: true
        },
        {
          id: "c",
          text: "TRUE and FALSE",
          isCorrect: false
        },
        {
          id: "d",
          text: "1 and 0 only",
          isCorrect: false
        }
      ],
      explanation: "Python boolean values are case-sensitive and must be capitalized: True and False.",
      hint: "Python is case-sensitive, especially for built-in values like booleans."
    },
    {
      id: "q4_string_concatenation",
      question: "What will be the output of: print('Hello' + ' ' + 'World')?",
      difficulty: "easy",
      options: [
        {
          id: "a",
          text: "Hello World",
          isCorrect: true
        },
        {
          id: "b",
          text: "HelloWorld",
          isCorrect: false
        },
        {
          id: "c",
          text: "Hello + World",
          isCorrect: false
        },
        {
          id: "d",
          text: "Error",
          isCorrect: false
        }
      ],
      explanation: "String concatenation with + joins the strings together: 'Hello' + ' ' + 'World' = 'Hello World'",
      hint: "The + operator concatenates (joins) strings together in the order they appear."
    },
    {
      id: "q5_f_strings",
      question: "What is the correct syntax for an f-string in Python?",
      difficulty: "medium",
      options: [
        {
          id: "a",
          text: "f'Hello {name}'",
          isCorrect: true
        },
        {
          id: "b",
          text: "'Hello ${name}'",
          isCorrect: false
        },
        {
          id: "c",
          text: "f('Hello {name}')",
          isCorrect: false
        },
        {
          id: "d",
          text: "'Hello ' + {name}",
          isCorrect: false
        }
      ],
      explanation: "F-strings (formatted string literals) start with 'f' before the quote and use curly braces {} for variables.",
      hint: "F-strings are a modern way to format strings in Python, introduced in Python 3.6."
    }
  ]
};

export const pythonFunctionsQuiz: Quiz = {
  id: "python_functions_quiz",
  title: "Python Functions Quiz",
  description: "Test your understanding of Python functions and their usage",
  passingScore: 75,
  xpReward: 30,
  timeLimit: 240, // 4 minutes
  questions: [
    {
      id: "q1_function_definition",
      question: "What is the correct syntax to define a function in Python?",
      difficulty: "easy",
      options: [
        {
          id: "a",
          text: "def function_name():",
          isCorrect: true
        },
        {
          id: "b",
          text: "function function_name():",
          isCorrect: false
        },
        {
          id: "c",
          text: "define function_name():",
          isCorrect: false
        },
        {
          id: "d",
          text: "func function_name():",
          isCorrect: false
        }
      ],
      explanation: "Python uses the 'def' keyword followed by the function name and parentheses, ending with a colon.",
      hint: "Python uses a specific keyword to 'define' functions."
    },
    {
      id: "q2_return_values",
      question: "What does a function return if no return statement is specified?",
      difficulty: "medium",
      options: [
        {
          id: "a",
          text: "0",
          isCorrect: false
        },
        {
          id: "b",
          text: "None",
          isCorrect: true
        },
        {
          id: "c",
          text: "Empty string",
          isCorrect: false
        },
        {
          id: "d",
          text: "Error",
          isCorrect: false
        }
      ],
      explanation: "Python functions without an explicit return statement automatically return None.",
      hint: "Python has a special value that represents 'nothing' or 'no value'."
    }
  ]
};

export const sampleQuizzes = [pythonBasicsQuiz, pythonFunctionsQuiz];
