const path = require('path');
const fs = require('fs');

async function generate() {
  const puppeteer = require('puppeteer-core');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

  console.log('Using browser at:', executablePath);

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  const htmlPath = path.resolve(__dirname, 'og-banner.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  const outPng = path.resolve(__dirname, '../public/og-image.png');
  const outJpg = path.resolve(__dirname, '../public/og-image.jpg');

  await page.screenshot({ path: outPng, type: 'png' });
  await page.screenshot({ path: outJpg, type: 'jpeg', quality: 95 });

  console.log('Successfully generated:');
  console.log(' - ', outPng);
  console.log(' - ', outJpg);

  await browser.close();
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
