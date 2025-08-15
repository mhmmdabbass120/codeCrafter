import { useState, useCallback } from 'react';

export interface CodeSuggestion {
  text: string;
  description: string;
  type: 'keyword' | 'function' | 'variable' | 'method' | 'snippet';
  icon: string;
  insertText?: string;
}

const PYTHON_KEYWORDS: CodeSuggestion[] = [
  { text: 'print', description: 'Display output to console', type: 'function', icon: '📄', insertText: 'print()' },
  { text: 'input', description: 'Get user input', type: 'function', icon: '⌨️', insertText: 'input()' },
  { text: 'len', description: 'Get length of object', type: 'function', icon: '📏', insertText: 'len()' },
  { text: 'range', description: 'Generate sequence of numbers', type: 'function', icon: '🔢', insertText: 'range()' },
  { text: 'str', description: 'Convert to string', type: 'function', icon: '📝', insertText: 'str()' },
  { text: 'int', description: 'Convert to integer', type: 'function', icon: '🔢', insertText: 'int()' },
  { text: 'float', description: 'Convert to float', type: 'function', icon: '🎯', insertText: 'float()' },
  { text: 'list', description: 'Create a list', type: 'function', icon: '📋', insertText: 'list()' },
  { text: 'dict', description: 'Create a dictionary', type: 'function', icon: '📚', insertText: 'dict()' },
  { text: 'if', description: 'Conditional statement', type: 'keyword', icon: '🤔', insertText: 'if :' },
  { text: 'elif', description: 'Else if condition', type: 'keyword', icon: '⚡', insertText: 'elif :' },
  { text: 'else', description: 'Else condition', type: 'keyword', icon: '🔄', insertText: 'else:' },
  { text: 'for', description: 'For loop', type: 'keyword', icon: '🔄', insertText: 'for  in :' },
  { text: 'while', description: 'While loop', type: 'keyword', icon: '⏳', insertText: 'while :' },
  { text: 'def', description: 'Define function', type: 'keyword', icon: '⚙️', insertText: 'def ():\n    ' },
  { text: 'return', description: 'Return value from function', type: 'keyword', icon: '↩️', insertText: 'return ' },
  { text: 'True', description: 'Boolean true value', type: 'keyword', icon: '✅', insertText: 'True' },
  { text: 'False', description: 'Boolean false value', type: 'keyword', icon: '❌', insertText: 'False' },
  { text: 'None', description: 'Null/empty value', type: 'keyword', icon: '⭕', insertText: 'None' },
  { text: 'and', description: 'Logical AND operator', type: 'keyword', icon: '&', insertText: 'and' },
  { text: 'or', description: 'Logical OR operator', type: 'keyword', icon: '|', insertText: 'or' },
  { text: 'not', description: 'Logical NOT operator', type: 'keyword', icon: '!', insertText: 'not' },
  { text: 'in', description: 'Membership operator', type: 'keyword', icon: '∈', insertText: 'in' },
  { text: 'import', description: 'Import module', type: 'keyword', icon: '📦', insertText: 'import ' },
  { text: 'from', description: 'Import from module', type: 'keyword', icon: '📤', insertText: 'from  import ' },
  { text: 'try', description: 'Try block for error handling', type: 'keyword', icon: '🛡️', insertText: 'try:\n    ' },
  { text: 'except', description: 'Exception handling', type: 'keyword', icon: '⚠️', insertText: 'except:\n    ' },
  { text: 'finally', description: 'Finally block', type: 'keyword', icon: '🏁', insertText: 'finally:\n    ' },
  { text: 'class', description: 'Define class', type: 'keyword', icon: '🏛️', insertText: 'class :\n    ' },
  { text: 'with', description: 'Context manager', type: 'keyword', icon: '🔐', insertText: 'with  as :\n    ' },
];

const CODE_SNIPPETS: CodeSuggestion[] = [
  {
    text: 'hello_world',
    description: 'Print Hello World',
    type: 'snippet',
    icon: '👋',
    insertText: 'print("Hello, World!")'
  },
  {
    text: 'for_loop',
    description: 'For loop template',
    type: 'snippet',
    icon: '🔄',
    insertText: 'for i in range(10):\n    print(i)'
  },
  {
    text: 'if_else',
    description: 'If-else template',
    type: 'snippet',
    icon: '🤔',
    insertText: 'if condition:\n    # do something\nelse:\n    # do something else'
  },
  {
    text: 'function_def',
    description: 'Function definition template',
    type: 'snippet',
    icon: '⚙️',
    insertText: 'def function_name(parameter):\n    """Description of function"""\n    return parameter'
  },
  {
    text: 'list_comp',
    description: 'List comprehension',
    type: 'snippet',
    icon: '📋',
    insertText: '[x for x in range(10)]'
  },
  {
    text: 'try_except',
    description: 'Try-except block',
    type: 'snippet',
    icon: '🛡️',
    insertText: 'try:\n    # risky code\nexcept Exception as e:\n    print(f"Error: {e}")'
  },
  {
    text: 'input_validation',
    description: 'Input with validation',
    type: 'snippet',
    icon: '✅',
    insertText: 'user_input = input("Enter something: ")\nif user_input:\n    print(f"You entered: {user_input}")\nelse:\n    print("No input provided")'
  },
  {
    text: 'file_read',
    description: 'Read file template',
    type: 'snippet',
    icon: '📁',
    insertText: 'with open("filename.txt", "r") as file:\n    content = file.read()\n    print(content)'
  }
];

export const useCodeCompletion = () => {
  const [suggestions, setSuggestions] = useState<CodeSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getSuggestions = useCallback((text: string, cursorPosition: number) => {
    // Get the current word being typed
    const beforeCursor = text.substring(0, cursorPosition);
    const words = beforeCursor.split(/\s+/);
    const currentWord = words[words.length - 1].toLowerCase();

    if (currentWord.length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Filter suggestions based on current word
    const matchingSuggestions = [
      ...PYTHON_KEYWORDS,
      ...CODE_SNIPPETS
    ].filter(suggestion => 
      suggestion.text.toLowerCase().startsWith(currentWord) ||
      suggestion.description.toLowerCase().includes(currentWord)
    ).slice(0, 8); // Limit to 8 suggestions

    setSuggestions(matchingSuggestions);
    setShowSuggestions(matchingSuggestions.length > 0);
  }, []);

  const getContextualHints = useCallback((code: string) => {
    const hints: string[] = [];
    
    // Check for common Python patterns and suggest improvements
    if (code.includes('print(') && !code.includes('f"') && !code.includes("f'")) {
      hints.push("💡 Try using f-strings for better string formatting: f'Hello {name}'");
    }
    
    if (code.includes('input(') && !code.includes('.strip()')) {
      hints.push("💡 Consider using .strip() to remove whitespace from user input");
    }
    
    if (code.includes('==') && code.includes('True')) {
      hints.push("💡 You can use 'if variable:' instead of 'if variable == True:'");
    }
    
    if (code.includes('range(len(')) {
      hints.push("💡 Consider using 'for item in list:' instead of 'for i in range(len(list)):'");
    }
    
    if (code.split('\n').some(line => line.trim().length > 79)) {
      hints.push("💡 Python recommends keeping lines under 79 characters (PEP 8)");
    }
    
    const lines = code.split('\n');
    const hasInconsistentIndentation = lines.some(line => 
      line.match(/^\s+/) && !line.match(/^    /) && !line.match(/^\t/)
    );
    if (hasInconsistentIndentation) {
      hints.push("💡 Use 4 spaces for indentation (Python standard)");
    }

    return hints;
  }, []);

  const getErrorSuggestions = useCallback((error: string) => {
    const suggestions: string[] = [];
    
    if (error.includes('SyntaxError')) {
      suggestions.push("🔧 Check for missing colons (:) after if, for, def, class statements");
      suggestions.push("🔧 Make sure parentheses and quotes are properly closed");
      suggestions.push("🔧 Check indentation - Python is strict about spacing");
    }
    
    if (error.includes('NameError')) {
      suggestions.push("🔧 Check if the variable is spelled correctly");
      suggestions.push("🔧 Make sure the variable is defined before using it");
      suggestions.push("🔧 Check if you need to import a module");
    }
    
    if (error.includes('IndentationError')) {
      suggestions.push("🔧 Use consistent indentation (4 spaces recommended)");
      suggestions.push("🔧 Make sure code blocks are properly indented");
    }
    
    if (error.includes('TypeError')) {
      suggestions.push("🔧 Check if you're using the right data type");
      suggestions.push("🔧 Make sure function arguments match expected types");
    }

    return suggestions;
  }, []);

  const applySuggestion = useCallback((
    text: string, 
    cursorPosition: number, 
    suggestion: CodeSuggestion
  ) => {
    // Find the start of the current word
    const beforeCursor = text.substring(0, cursorPosition);
    const words = beforeCursor.split(/\s+/);
    const currentWord = words[words.length - 1];
    const wordStart = cursorPosition - currentWord.length;
    
    // Replace current word with suggestion
    const newText = 
      text.substring(0, wordStart) + 
      (suggestion.insertText || suggestion.text) + 
      text.substring(cursorPosition);
    
    return {
      newText,
      newCursorPosition: wordStart + (suggestion.insertText || suggestion.text).length
    };
  }, []);

  const hideSuggestions = useCallback(() => {
    setShowSuggestions(false);
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    showSuggestions,
    getSuggestions,
    getContextualHints,
    getErrorSuggestions,
    applySuggestion,
    hideSuggestions
  };
};
