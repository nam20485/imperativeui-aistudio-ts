
import React from 'react';

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  return (
    <div className="flex-grow overflow-auto">
      <pre className="p-4 text-sm">
        <code className="language-tsx text-gray-300 whitespace-pre-wrap">{code}</code>
      </pre>
    </div>
  );
};

export default CodeDisplay;
