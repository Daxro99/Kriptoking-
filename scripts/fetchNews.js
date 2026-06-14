const Parser = require("rss-parser");
const fs = require("fs");

const parser = new Parser();

async function run() {

  const feed =
    await parser.parseURL(
      "https://www.coindesk.com/arc/outboundfeeds/rss/"
    );

  const articles = feed.items
    .slice(0,5)
    .map(item => ({
      title: item.title,
      date: item.pubDate,
      summary:
        item.contentSnippet ||
        item.content ||
        "",
      source: item.link
    }));

  fs.writeFileSync(
    "data/fetched-news.json",
    JSON.stringify(
      articles,
      null,
      2
    )
  );

  console.log(
    "Berita berhasil diambil"
  );

}

run();
