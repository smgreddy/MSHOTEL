require('dotenv').config();
const { MongoClient } = require('mongodb');
const http = require('http');

// MongoDB connection URL from the .env file or fallback to hardcoded value
const mongoUrl = process.env.MONGODB_URL || 'mongodb+srv://smgreddy:m4cx8RUQXIyL27@mslunchapp.fcwxy.mongodb.net/?retryWrites=true&w=majority';

// Database name
const dbName = 'cafeteria';  // Replace with your actual database name

let db; // To hold the MongoDB connection

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

// Call the function to connect to MongoDB
connectToMongoDB();

// Function to save data in the MongoDB database
const saveData = async (data) => {
  try {
    if (!db) throw new Error("Database connection not established");
    
    const collection = db.collection('selections'); // Replace 'selections' with your actual collection name
    const result = await collection.insertOne(data);
    return result.insertedId;
  } catch (err) {
    console.error('Error saving data:', err.message);
    throw err;  // Re-throw the error to handle it in the HTTP handler
  }
};

// Create an HTTP server
const server = http.createServer(async (req, res) => {
  console.log('Received request: ', req.method, req.url);

  if (req.method === 'POST' && req.url === '/save-selection') {
    let body = '';

    // Collect data from the POST request
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // When the data is fully received, save it to MongoDB
    req.on('end', async () => {
      try {
        const parsedData = JSON.parse(body);  // Parse the request body
        console.log('Data received:', parsedData);  // Debugging: Log received data

        const id = await saveData(parsedData);  // Save the data in MongoDB
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success', id }));
      } catch (error) {
        console.error('Error handling request:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: error.message }));
      }
    });
  } else {
    // Handle any other routes as 404 Not Found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'error', message: 'Not Found' }));
  }
});

// Start the server
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
