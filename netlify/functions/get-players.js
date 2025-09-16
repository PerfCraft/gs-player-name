// Netlify Function: get-players
import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const res = await fetch("https://gamemonitoring.net/samp/servers/9337618/players");
    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data), // return full player list
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
