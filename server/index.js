import express from 'express';
import cors from 'cors';
import axios from 'axios';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// In-memory storage for collections and history (for simplicity)
const collections = [];
const history = [];
const environments = {
  active: 'dev',
  dev: { baseUrl: 'https://api.example.com', token: 'dev-token-123' },
  prod: { baseUrl: 'https://api.production.com', token: 'prod-token-xyz' },
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Execute request endpoint
app.post('/api/execute', async (req, res) => {
  const { method, url, headers, body } = req.body;
  const startTime = Date.now();
  
  try {
    const response = await axios({
      method: method || 'GET',
      url,
      headers: headers || {},
      data: body,
      validateStatus: () => true, // Don't throw on error status codes
    });
    
    const timeTaken = Date.now() - startTime;
    const size = JSON.stringify(response.data)?.length || 0;
    
    const result = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      time: timeTaken,
      size,
    };
    
    // Log to history
    history.push({ id: uuidv4(), method, url, timestamp: new Date(), ...result });
    
    res.json(result);
  } catch (error) {
    const timeTaken = Date.now() - startTime;
    res.status(500).json({
      error: error.message,
      time: timeTaken,
    });
  }
});

// History routes
app.get('/api/history', (req, res) => {
  res.json(history);
});

// Environment routes
app.get('/api/environments', (req, res) => {
  res.json(environments);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
