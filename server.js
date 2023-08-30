const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()
const OpenAI = require("openai");
const fs = require('fs')
const multer = require('multer')

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
  });

const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        console.log('file', file)
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({storage: storage}).single('file')
let filePath 

app.post('/images', async (req, res) => {

async function main() {
  try {
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

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        filePath = req.file.path
    })
})
app.post('/variations', async (req, res) => {
    try {
        const image = await openai.images.createVariation({
        image: fs.createReadStream(filePath),
        n: 4
    });
    console.log(image.data);
    res.send(image.data)
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))