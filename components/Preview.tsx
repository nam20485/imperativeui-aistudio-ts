import React, { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
  jsonConfig: string;
}

const Preview: React.FC<PreviewProps> = ({ code, jsonConfig }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (!code || !iframeRef.current) return;

        let componentName = 'GeneratedForm'; // Fallback name
        try {
            const config = JSON.parse(jsonConfig);
            if (config.formName && /^[a-zA-Z0-9_]+$/.test(config.formName)) {
                componentName = config.formName;
            }
        } catch(e) {
            console.warn("Could not parse JSON to get formName, using default.");
        }
        
        // PREPARE THE CODE: The generated code includes an 'import React...' line
        // which is not needed and will cause an error in our iframe environment,
        // since React is loaded via a <script> tag and is available globally.
        // We intelligently remove it before rendering.
        const codeWithoutImport = code.replace(/import\s+React.*from\s+['"]react['"];?/g, '');

        const html = `
            <!DOCTYPE html>
            <html lang="en" class="dark">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Component Preview</title>
                <script src="https://cdn.tailwindcss.com"><\/script>
                <script>
                  tailwind.config = {
                    darkMode: 'class',
                    theme: {
                      extend: {
                        colors: {
                          'gray-900': '#121212',
                          'gray-800': '#1e1e1e',
                          'gray-700': '#2d2d2d',
                          'gray-600': '#4d4d4d'
                        }
                      }
                    }
                  }
                <\/script>
                <script src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
                <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
                <script src="https://unpkg.com/@babel/standalone@7.24.0/babel.min.js"><\/script>
                <style>
                    body { 
                        background-color: #1e1e1e; 
                        color: #e5e7eb; 
                        padding: 1.5rem; 
                        font-family: sans-serif; 
                        opacity: 0;
                        transition: opacity 0.5s;
                    }
                </style>
            </head>
            <body>
                <div id="root"></div>
                <script type="text/babel">
                    try {
                        // The 'import React' line has been removed.
                        // React and ReactDOM are available globally from the script tags.
                        ${codeWithoutImport}
                        
                        const container = document.getElementById('root');
                        const root = ReactDOM.createRoot(container);

                        // Use JSX to render the component by its name.
                        root.render(<${componentName} />);
                        
                        document.body.style.opacity = 1;
                    } catch (e) {
                        const root = document.getElementById('root');
                        root.innerHTML = '<div style="color: #fca5a5; background-color: #450a0a; border: 1px solid #7f1d1d; padding: 1rem; border-radius: 0.5rem;">' +
                                         '<h3 style="font-weight: bold; font-size: 1.125rem;">Render Error</h3>' +
                                         '<pre style="white-space: pre-wrap; margin-top: 0.5rem; font-family: monospace;">' + e.message + '</pre>' +
                                         '</div>';
                        document.body.style.opacity = 1;
                    }
                <\/script>
            </body>
            </html>
        `;

        iframeRef.current.srcdoc = html;

    }, [code, jsonConfig]);

    return (
        <div className="flex-grow bg-gray-800 p-2">
            <iframe
                ref={iframeRef}
                title="Component Preview"
                className="w-full h-full border-0 rounded-md bg-gray-800"
                sandbox="allow-scripts"
            />
        </div>
    );
};

export default Preview;
