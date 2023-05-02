'use strict'
const PORT = process.env.PORT || 3001;
const KEY = process.env.OPENAI_API_KEY


import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "YOUR_ORGANIZATION_AS_A_STRING_HERE",
    // Not sure this works, have to figure out how to use template literals
    apiKey: `${KEY}`,
});
const openai = new OpenAIApi(configuration);

// message.content is the prompt that sends to the API
const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: "Pretend you are a text adventure game from the 80s, I need all responses to be 1 sentence, short and descriptive. i just stumbled into a room with a healing pool, describe it"}],
});

// This is just the response displayed as a string
console.log(completion.data.choices[0].message.content);



console.log(`Listening on ${PORT}`);
