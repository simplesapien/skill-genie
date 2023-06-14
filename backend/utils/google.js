import cheerio from "cheerio";
import unirest from "unirest";

const selectRandom = () => {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
  ];
  var randomNumber = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomNumber];
};
let user_agent = selectRandom();

let header = {
  "User-Agent": `${user_agent}`,
};

export async function fetchArticles(topic) {
  let query = topic.split(" ").join("+");
  let url = `https://www.google.com/search?q=${query}`;

  try {
    return unirest
      .get(url)
      .headers(header)
      .then((response) => {
        let $ = cheerio.load(response.body);

        let titles = [];
        let links = [];
        let snippets = [];

        // Find titles
        $(".yuRUbf > a > h3").each((i, el) => {
          let title = $(el).text();
          let strippedTitle = title.replace(/[^a-zA-Z\s]/g, "");
          strippedTitle = strippedTitle.replace(/\s+/g, " ");
          titles[i] = strippedTitle;
        });

        // Find links
        $(".yuRUbf > a").each((i, el) => {
          links[i] = $(el).attr("href");
        });

        // Find snippets
        $(".g .VwiC3b ").each((i, el) => {
          snippets[i] = $(el).text();
        });

        const results = [];
        for (let i = 0; i < 3; i++) {
          let obj = {
            title: titles[i],
            link: links[i],
            snippet: snippets[i],
          };
          results.push(obj);
        }
        return results;
      });
  } catch (err) {
    console.log(err);
  }
}
