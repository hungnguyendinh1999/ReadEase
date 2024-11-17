/**
 * Express server which connects to OpenAI backend.
 * Defines REST api to interact with gpt model.
 * Provides for context injections, basic testing, and user feedback.
 * @author Christopher Curtis
 */
import express from 'express';
import cors from "cors";
import {getGPTSummarizeResponse, getTTSResponse} from './openaiService.js';
import fs from 'fs';

const app = express();  // Server is instantiated

// These options enable us to dump json payloads and define the return signal
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(express.json());
app.use(cors(corsOptions));

// Defines default route to demonstate server status
app.get('/', (req, res) => {
    res.send("The server is up!");
});

// Gets responses from GPT model with no additional context
app.post('/summarize', async (req, res) => {
    const message = req.body.params['0']['message'];
    const context = req.body.params['0']['context'];
    const vocab = req.body.params['0']['vocabLevel'];
    /**
     * Message: the text input by users
     * Context: the prompting instruction to mitigate harm
     */

    if (!message || !context) {
        return res.status(400).send("No message or context provided");
    }

    if (!vocab) {
        return res.status(400).send("Missing vocabLevelContext under context")
    }
    const response = await getGPTSummarizeResponse(message, context, vocab);
    res.send(response.choices[0].message.content); // Send back to FE
});

app.post('/dummy', async (req, res) => {
    res.send("This call works!");
})

app.post('/dummy-tts', async (req, res) => {
    fs.readFile('./res/alloy.wav', (err, data) => {
        if (err) {
            console.error('Error reading the .wav file:', err);
            res.status(500).send('Error reading the audio file');
            return;
        }

        res.set({
            'Content-Type': 'audio/wav',
            'Content-Disposition': 'inline; filename=tts.mp3',
        });

        res.send(data);
    });
})

app.post('/tts', async (req, res) => {
    const message = req.body.params['0']['message'];
    const voice = req.body.params['0']['voice'];

    if (!message || !voice) {
        return res.status(400).send("No message or voice provided");
    }

    try {
        const mp3 = await getTTSResponse(message, voice)

        // Convert the MP3 response to a buffer
        const buffer = Buffer.from(await mp3.arrayBuffer());

        // Send the buffer to the client with appropriate headers
        res.set({
            "Content-Type": "audio/mpeg",
            "Content-Disposition": "inline; filename=tts.mp3",
        });
        res.send(buffer);
    } catch (error) {
        console.error("Error generating TTS:", error);
        res.status(500).send("Failed to generate TTS.");
    }
});

// We define the port to listen on, and do so
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
