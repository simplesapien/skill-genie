import { openai } from "../config/gpt.js";
import { prompt } from "./prompt.js";
import { fetchArticles } from "./google.js";
import { fetchVideos } from "./youtube.js";

async function callGPT(topic) {
  try {
    const chatHistory = prompt;
    chatHistory.push({
      role: "user",
      content: `${topic}`,
    });

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: chatHistory,
      max_tokens: 2000,
    });
    return completion.data.choices[0].message.content;
  } catch (err) {
    console.log(err);
    console.log("Error details:", err.response?.data?.error);
  }
}

export async function createCourse(topic) {
  try {
    let obj = await callGPT(topic);
    obj = JSON.parse(obj);
    let topics = obj.topics;
    for (let i = 0; i < topics.length; i++) {
      for (let j = 0; j < topics[i].subtopics.length; j++) {
        let subtopic = topics[i].subtopics[j];
        subtopic.articles = await fetchArticles(subtopic.google_query[0]);
        subtopic.videos = await fetchVideos(subtopic.youtube_query[0]);
      }
    }
    return obj;
  } catch (err) {
    console.log(err);
  }
}
