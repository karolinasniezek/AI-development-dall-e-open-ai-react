const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()
const OpenAI = require("openai");


app.post('/images', async (req, res) => {

async function main() {
  try {
    const openai = new OpenAI({
        apiKey: process.env.API_KEY,
      });

    const image = await openai.images.generate({ 
        prompt: req.body.message,
        n: 2,
        size: "1024x1024"
     });
        res.send(image.data)
        console.log(image.data);
  } catch (error) {
    console.error(error)
  }
}
main();
})

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))