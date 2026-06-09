const fs = require("fs");

const today = new Date().toISOString().split("T")[0];
const market = JSON.parse(
  fs.readFileSync("data/market.json", "utf8")
);

const trending = JSON.parse(
  fs.readFileSync("data/trending.json", "utf8")
);
const market = JSON.parse(
  fs.readFileSync("data/market.json", "utf8")
);

const trending = JSON.parse(
  fs.readFileSync("data/trending.json", "utf8")
);
const article = {
  id: `${today}-market-update`,
  title: `Update Pasar Kripto ${today}`,
  date: today,
  url: `articles/artikel-${today}.html`,
  summary: "Ringkasan pasar kripto terbaru."
};

const newsPath = "data/news.json";

let news = [];

if (fs.existsSync(newsPath)) {
  news = JSON.parse(fs.readFileSync(newsPath, "utf8"));
}

const exists = news.find(item => item.id === article.id);

if (!exists) {
  news.unshift(article);

  fs.writeFileSync(
    newsPath,
    JSON.stringify(news, null, 2)
  );

  const html = `
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>${article.title}</title>
</head>
<body>

<h1>${article.title}</h1>

<p>
Artikel pasar kripto otomatis untuk tanggal ${today}.
</p>

<a href="../index.html">Kembali ke Beranda</a>

</body>
</html>
`;

  fs.writeFileSync(
    article.url,
    html
  );

  console.log("Artikel berhasil dibuat.");
} else {
  console.log("Artikel hari ini sudah ada.");
}
