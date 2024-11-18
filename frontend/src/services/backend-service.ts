/**
 * Defines a reusable HTTP-Service class.
 * Contains a post method.
 */
class HttpService {
    private readonly baseURL: string;

    /**
     * Constructs an HTTP service object. Base URL is defined the api-client file.
     * Directs requests to provided endpoint of the base url.
     * @param endpoint the target route to post to
     */
    constructor(endpoint: string) {
        this.baseURL = "http://127.0.0.1:8080" + endpoint;
    }

    get() {
        return fetch(this.baseURL, {method: "GET"})
    }

    post(data: any) {
        return fetch(this.baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ params: [data] })
        })
    }
}

const createSummarizeResponseService = () => {
    return new HttpService("/summarize");
}

const createTTSResponseService = () => {
    return new HttpService("/tts");
}

const createDummyResponseService = () => {
    return new HttpService("/dummy");
}

const createDummyTTSResponseService = () => {
    return new HttpService("/dummy-tts");
}

const createFeedbackResponseService = () => {
    return new HttpService("/feedback");
}

export {
    createSummarizeResponseService,
    createTTSResponseService,
    createDummyResponseService,
    createDummyTTSResponseService,
    createFeedbackResponseService
};
