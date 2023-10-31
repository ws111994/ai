const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const { LanguageServiceClient } = require('@google-cloud/language');

// Replace with the path to your service account key JSON file
// const credentialsPath = '/Users/levieo/Desktop/Term 4/4537 ISA/ai/ai-403715-af7c0937f52c.json';
const credentialsPath = './ai-403715-af7c0937f52c.json';


// Initialize the Natural Language API client
const client = new LanguageServiceClient({ keyFilename: credentialsPath });

// Define the text you want to analyze
const text = "I love this product! It's fantastic.";

async function analyzeSentiment(userInput) {
    // Analyze sentiment
    const [result] = await client.analyzeSentiment({ document: { content: userInput, type: 'PLAIN_TEXT' } });
    const sentiment = result.documentSentiment;
    return [sentiment.score, sentiment.magnitude];
  
    // Print sentiment score and magnitude
    console.log(`Sentiment Score: ${sentiment.score}`);
    console.log(`Sentiment Magnitude: ${sentiment.magnitude}`);
  }

analyzeSentiment(text).catch();


// ...

app.post('/analyze', async (req, res) => {
  try{const text = req.body.user_input;

    // Perform sentiment analysis here
    // ...
    const result = await analyzeSentiment(text).catch(console.error);


    res.json({
        sentimentScore: result[0],
        sentimentMagnitude: result[1]
    });} catch (error) {}
    
    
});

// ...




// analyzeSentiment().catch(console.error);
app.listen(3000);

console.log("started");
