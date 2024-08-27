require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq(process.env.GROQ_API_KEY);

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "you are a chatbot"
      },
      {
        "role": "user",
        "content": "what is python?"
      }
    ],
    "model": "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
