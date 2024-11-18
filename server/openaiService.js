/**
 * Used for connecting to OpenAI.
 * Provides connection, and response function wrapper
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
 * @param message the text to summarize
 * @param context the context message to help form a response
 * @param vocabLevel vocab level
 * @returns gpt response object
 */
const getGPTSummarizeResponse = async (message, context, vocabLevel) => await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
            "role": "user",
            "content": "Summarize this given user message in a neutral and concise manner, but still contains good amount of detail"
        },
        {
            "role": "user",
            "content": message
        },
        {
            "role": "system",
            "content": context
        },
        {
            "role": "system",
            "content": vocabLevel
        }
    ],
});

/**
 * Function for getting a tts sound file from api
 * @param message the text to synthesize to tts
 * @param voice voice used for the process
 * @returns gpt response object
 */
const getTTSResponse = async (message, voice) => await openai.audio.speech.create({
    model: "tts-1",
    voice: voice,
    input: message,
});

export {getGPTSummarizeResponse, getTTSResponse};