/**
 * Used for connecting to OpenAI.
 * Provides connection, and response function wrapper
 */
import OpenAI from 'openai';
import fs from 'fs';

let apiKey = ""
try {
    apiKey = fs.readFileSync("./api_key.txt", 'utf8').trim();
} catch (error) {
    console.error("API key file not found. Assuming this is dev mode");
}
const isDev = !apiKey;

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
 * Function for getting a response from the gpt model.
 * @param message the text to validate
 */
const getHarmfulCheckResponse = async (message) => await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
            "role": "system",
            "content": "Can you check the provided content for anything harmful, such as adult content, material that can be" +
                "used for scamming, or anything politically motivated message. Say yes if it contains these material, otherwise say no"
        },
        {
            "role": "user",
            "content": message
        },
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

/**
 * Function for getting a response that simplifies text.
 * @param message The text to simplify
 * @param context The context message to help form a response
 * @param vocabLevel Target vocabulary level for simplification
 * @returns GPT response object
 */
const getGPTSimplifyResponse = async (message, context, vocabLevel, style) => await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "user", content: "Simplify this text to make it easier to understand. Keep it short but detailed enough while in plain text, no markdown." },
        { role: "user", content: message },
        { role: "system", content: context },
        { role: "system", content: vocabLevel }
    ]
});

/**
 * Function for getting a response that explains text in detail.
 * @param message The text to explain
 * @param context The context message to help form a response
 * @returns GPT response object
 */
const getGPTExplainResponse = async (message, context, vocabLevel, style) => await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "user", content: "Explain this in detail to help the user understand better. Keep it in plain text, no markdown." },
        { role: "user", content: message },
        { role: "system", content: context }
    ]
});

/**
 * Function for getting a response that defines text.
 * @param message The text to define
 * @param context The context message to help form a response
 * @returns GPT response object
 */
const getGPTDefineResponse = async (message, context, vocabLevel, style) => await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "user", content: "Define the text provided in an informative and descriptive way. Keep it in plain text, no markdown." },
        { role: "user", content: message },
        { role: "system", content: context }
    ]
});

/**
 * Function for getting a response that rewrites text.
 * @param message The text to rewrite
 * @param context The context message to help form a response
 * @returns GPT response object
 */
const getGPTRewriteResponse = async (message, context, vocabLevel, style) => await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "user", content: "The following text is directly cut from other text, so it could be just a single word or many. If you cannot rewrite it in a meaningful way, just output the same text." + 
            "Only output the resulting text. It should be rewritten such that it maintains the same context requirements but in the following style: " + style },
        { role: "user", content: "Keep it in plain text, no markdown." },
        { role: "user", content: "This is the text: " + message },
        { role: "system", content: style },
        { role: "system", content: vocabLevel },
        { role: "system", content: context }
    ]
});

export {getGPTDefineResponse, 
    getGPTExplainResponse, 
    getGPTSimplifyResponse, 
    getGPTRewriteResponse,
    getGPTSummarizeResponse, 
    getTTSResponse, 
    getHarmfulCheckResponse, isDev};