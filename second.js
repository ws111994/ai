const { LanguageServiceClient } = require('@google-cloud/language');

// Replace with the path to your service account key JSON file
const credentialsPath = '/Users/levieo/Desktop/Term 4/4537 ISA/ai/ai-403715-af7c0937f52c.json';

// Initialize the Natural Language API client
const client = new LanguageServiceClient({ keyFilename: credentialsPath });

// Define the text you want to analyze
const text = "i feel very sad and angry";

async function analyzeSentiment(input) {
  // Analyze sentiment
  const [result] = await client.analyzeSentiment({ document: { content: input, type: 'PLAIN_TEXT' } });
  const sentiment = result.documentSentiment;

  // Print sentiment score and magnitude
  console.log(`Sentiment Score: ${sentiment.score}`);
  console.log(`Sentiment Magnitude: ${sentiment.magnitude}`);
}

analyzeSentiment(text).catch(console.error);
