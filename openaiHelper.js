const { Configuration, OpenAIApi } = require("openai");
const Bottleneck = require("bottleneck");
const limiter = new Bottleneck({ minTime: 1000 });

const configuration = new Configuration({
  organization: `${process.env.ORG}`,
  apiKey: `${process.env.OPENAI_API_KEY}`,
});
const openai = new OpenAIApi(configuration);
const cache = new Map();

async function getCompletion(message, role = "user") {
  const cacheKey = role + ":" + message;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const completion = await limiter.schedule(async () => {
    return await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: role, content: `${message}` }],
    });
  });

  const result = completion.data.choices[0].message.content;
  cache.set(cacheKey, result);

  return result;
}

module.exports = { getCompletion };
