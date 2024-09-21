const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = 3000;

app.get("/git", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/bin/google-chrome",
      // executablePath: "/app/chrome/google-chrome-stable", // Use the env variable or fallback path
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    const url = "https://github.com/";
    await page.goto(url, { waitUntil: "networkidle2" });

    // Selector for the main header or slogan on GitHub
    const headerSelector = "h1.h0-mktg span"; // Adjust as necessary
    await page.waitForSelector(headerSelector);

    const element = await page.$(headerSelector);
    const text = element
      ? await page.evaluate((el) => el.textContent, element)
      : null;

    if (text) {
      console.log("Extracted text:", text);
      res.json({ text });
    } else {
      res.status(404).send("Element found, but text is null.");
    }

    await browser.close();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while fetching data from GitHub.");
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the GitHub Fetch API!");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("listening");
});
