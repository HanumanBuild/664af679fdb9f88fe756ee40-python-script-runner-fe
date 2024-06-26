import React, { useState } from 'react';
import axios from 'axios';

// Main App component
function App() {
  const [script, setScript] = useState('');
  const [output, setOutput] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Making API call to backend
      const response = await axios.post(`${process.env.REACT_APP_PYTHON_SCRIPT_RUNNER_BE_URL}/run-script`, { script });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error running script:', error);
      setOutput('Error running script');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Python Script Runner</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="script">
              Python Script
            </label>
            <textarea
              id="script"
              name="script"
              rows="10"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={script}
              onChange={(e) => setScript(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Run Script
            </button>
          </div>
        </form>
        {output && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Output:</h2>
            <pre className="bg-gray-200 p-4 rounded">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

// Exporting App component
export default App;