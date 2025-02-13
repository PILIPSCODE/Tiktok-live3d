import puppeteer from "puppeteer";

export async function getCookies() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.youtube.com", { waitUntil: "networkidle2" });

    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Get cookies
    const cookies = await page.cookies();
    await browser.close();

    return cookies;
  } catch (error) {
    console.log(error);
  }
}
