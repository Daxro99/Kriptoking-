const fs = require("fs");

console.log("Generate article started");

const today = new Date().toISOString().split("T")[0];

const newsPath = "data/news.json";
const fetchedPath = "data/fetched-news.json";

let news = [];
let fetchedNews = [];

if (fs.existsSync(newsPath)) {
news = JSON.parse(fs.readFileSync(newsPath, "utf8"));
}

if (fs.existsSync(fetchedPath)) {
fetchedNews = JSON.parse(
fs.readFileSync(fetchedPath, "utf8")
);
}

if (fetchedNews.length === 0) {
console.log("Tidak ada berita RSS.");
process.exit(0);
}

const sourceNews = fetchedNews[0];

const article = {
id: "${today}-rss-news",
title: sourceNews.title,
date: today,
url: "articles/artikel-${today}.html",
summary: sourceNews.summary.substring(0, 150)
};

const exists = news.find(
item => item.id === article.id
);

if (!exists) {

news.unshift(article);

fs.writeFileSync(
newsPath,
JSON.stringify(news, null, 2)
);

const html = `

<!DOCTYPE html><html lang="id">
<head>
<meta charset="UTF-8">
<title>${sourceNews.title}</title>
<meta name="description" content="${sourceNews.summary}">
</head>
<body><h1>${sourceNews.title}</h1><p>
${sourceNews.summary}
</p><p>
Artikel ini dibuat otomatis berdasarkan berita kripto terbaru.
</p><p>
Sumber:
<a href="${sourceNews.source}">
${sourceNews.source}
</a>
</p><p>
<a href="../index.html">
← Kembali ke Beranda
</a>
</p></body>
</html>
`;fs.writeFileSync(
article.url,
html
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
<loc>https://kriptoking.kriptoking.workers.dev/</loc>
</url><url>
<loc>https://kriptoking.kriptoking.workers.dev/archive.html</loc>
</url>${news.map(item => "<url> <loc>https://kriptoking.kriptoking.workers.dev/${item.url}</loc> </url>").join("")}

</urlset>`;

fs.writeFileSync(
"sitemap.xml",
sitemap
);

console.log("Artikel berhasil dibuat.");
console.log("Sitemap diperbarui.");

} else {

console.log("Artikel hari ini sudah ada.");

}
