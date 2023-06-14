export async function fetchVideos(subject) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${subject}&type=video&order=relevance&key=${process.env.GOOGLE_API_KEY}`
    );
    const data = await res.json();
    return data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      videoId: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (err) {
    console.log(err);
  }
}
