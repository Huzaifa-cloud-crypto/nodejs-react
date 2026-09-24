import { useState } from 'react';
import './App.css';

function App() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, url }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🚀 Postman Clone - API Builder</h1>
      </header>
      
      <main className="main-content">
        <div className="request-builder">
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="method-select">
            {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            className="url-input"
            placeholder="Enter request URL"
          />
          <button onClick={handleSend} disabled={loading} className="send-btn">
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>

        <div className="response-section">
          <h3>Response</h3>
          {response && (
            <div className="response-meta">
              <span className={`status ${response.status >= 400 ? 'error' : 'success'}`}>
                {response.status} {response.statusText}
              </span>
              <span className="time">{response.time} ms</span>
              <span className="size">{response.size} bytes</span>
            </div>
          )}
          <pre className="response-body">
            {response ? JSON.stringify(response.data || response, null, 2) : 'Awaiting request...'}
          </pre>
        </div>
      </main>
    </div>
  );
}

export default App;
