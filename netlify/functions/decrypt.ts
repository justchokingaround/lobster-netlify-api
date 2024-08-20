import { Handler } from "@netlify/functions";
import { main } from "./rabbit";

const handler: Handler = async (event, context) => {
  const mediaId = event.queryStringParameters?.id;

  if (!mediaId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing id parameter" }),
    };
  }

  try {
    const provider = "rabbit";
    const result = await main(provider, mediaId);
    //console.log("result from index: ", result);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

async function decrypt(source: string) {
  // Await the async function call
  return await main(source);
}

export { handler };
