import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/create-order', async (req, res) => {
  try {
    const options = {
      amount: 49900, // ₹499
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.post('/api/verify-payment', async (req, res) => {
  // In production, implement signature verification here
  res.json({ success: true });
});

app.post('/api/generate-resume', async (req, res) => {
  try {
    const { name, jobTitle, experience, education, skills } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Create a professional, high-impact, ATS-friendly resume for:
      Name: ${name}
      Target Role: ${jobTitle}
      Experience: ${experience}
      Education: ${education}
      Skills: ${skills}

      Format the output in clean Markdown. Use professional language. 
      Include a summary, detailed experience bullets with metrics, and a structured skills section.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ resume: response.text() });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: 'Failed to generate resume' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
