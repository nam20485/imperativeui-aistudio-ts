
import React from 'react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col flex-grow bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-3 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-gray-200">JSON Configuration</h2>
        </div>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full flex-grow p-4 bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none rounded-b-lg"
            placeholder="Paste your JSON configuration here..."
            spellCheck="false"
        />
    </div>
  );
};

export default JsonEditor;
