/**
 * Used for connecting to OpenAI.
 * Provides connection, and response function wrapper
 * @author Christopher Curtis
 */
import OpenAI from 'openai';
import fs from 'fs';

let apiKey = fs.readFileSync("./api_key.txt", 'utf8').trim();

// Creates an OpenAI connection using the provided api key
const openai = new OpenAI({
    apiKey: apiKey
});

/**
 * Function for getting a response from the gpt model.
 * Uses the provided message history
 * @param message the message history to load in
 * @param context the context message to help form a response
 * @returns gpt response object
 */
const getGPTSummarizeResonse = async (message, context) => await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "user",
            content: message
        },
        {
            "role": "system",
            "content": "Summarize this given user message"
        },
        {
            "role": "system",
            "content": context
        }
    ],
});

const getTTSResponse = async (message, voice) => await openai.audio.speech.create({
    model: "tts-1",
    voice: voice,
    input: message,
});

export {getGPTSummarizeResonse, getTTSResponse};