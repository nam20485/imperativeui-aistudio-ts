export const DEFAULT_JSON_CONFIG = `{
  "formName": "UserProfile",
  "variables": [
    {
      "name": "fullName",
      "type": "string",
      "label": "Full Name",
      "placeholder": "Enter your full name",
      "required": true
    },
    {
      "name": "email",
      "type": "string",
      "subtype": "email",
      "label": "Email Address",
      "placeholder": "you@example.com",
      "required": true
    },
    {
      "name": "age",
      "type": "number",
      "label": "Age",
      "min": 18,
      "max": 99
    },
    {
      "name": "isSubscribed",
      "type": "boolean",
      "label": "Subscribe to our newsletter"
    },
    {
      "name": "userRole",
      "type": "enum",
      "label": "User Role",
      "options": ["Admin", "Editor", "Viewer"],
      "required": true
    },
    {
      "name": "bio",
      "type": "string",
      "component": "textarea",
      "label": "Biography",
      "placeholder": "Tell us about yourself...",
      "rows": 4
    },
    {
        "name": "joinDate",
        "type": "date",
        "label": "Joining Date"
    }
  ]
}`;

export const GEMINI_PROMPT_TEMPLATE = `
You are an expert senior frontend developer specializing in React, TypeScript, and Tailwind CSS.
Your task is to generate a single, self-contained, and production-ready React component based on a JSON configuration.
The component name MUST be the value of the "formName" property from the JSON.

RULES:
1. Use functional components with React Hooks (\`useState\`).
2. Use TypeScript for all props and state. Define a state interface for the form data.
3. Style everything with Tailwind CSS for a modern, clean, and aesthetically pleasing dark-mode UI. Use appropriate spacing, padding, and styles for inputs, labels, and buttons.
4. The generated component must be fully self-contained in a single file. Do not assume any external components other than React.
5. Map the variable 'type' from the JSON to the most suitable HTML form element:
    - 'string' with 'component: "textarea"' -> <textarea>
    - 'string' with 'subtype: "email"' -> <input type="email">
    - 'string' (default) -> <input type="text">
    - 'number' -> <input type="number">
    - 'boolean' -> <input type="checkbox">
    - 'enum' -> <select> with <option> tags.
    - 'date' -> <input type="date">
6. Use the 'label', 'placeholder', 'required', 'min', 'max', and 'rows' properties from the JSON to configure the form elements. Labels should be placed above their corresponding inputs.
7. The form should have a submit button with appropriate styling. When submitted, it should log the form state to the console.
8. Structure the component with a main state object to hold all form values, initialized with sensible defaults.
9. IMPORTANT: Your response MUST be ONLY the React TSX code. Do NOT include any explanations, comments, or markdown fences like \`\`\`tsx or \`\`\`. Just the raw code.

Here is the JSON configuration:
`;