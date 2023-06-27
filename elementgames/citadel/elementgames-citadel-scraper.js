import puppeteer from "puppeteer-extra";
import AdBlockerPlugin from 'puppeteer-extra-plugin-adblocker';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(AdBlockerPlugin()).use(StealthPlugin());

import * as fs from 'fs';


const websites = [
    'https://elementgames.co.uk/paints-hobby-and-scenery/paints-washes-etc/citadel-games-workshop-paints/citadel-base', 
    'https://elementgames.co.uk/paints-hobby-and-scenery/paints-washes-etc/citadel-games-workshop-paints/citadel-technical',
    'https://elementgames.co.uk/paints-hobby-and-scenery/paints-washes-etc/citadel-games-workshop-paints/citadel-contrast',
    'https://elementgames.co.uk/paints-hobby-and-scenery/paints-washes-etc/citadel-games-workshop-paints/citadel-games-workshop-sprays',
    'https://elementgames.co.uk/paints-hobby-and-scenery/paints-washes-etc/citadel-games-workshop-paints/citadel-edge',
    'https://elementgames.co.uk/paints-hobby-and-scenery/paints-washes-etc/citadel-games-workshop-paints/citadel-dry',
    'https://elementgames.co.uk/paints-hobby-and-scenery/paints-washes-etc/citadel-games-workshop-paints/citadel-glaze',
    'https://elementgames.co.uk/paints-hobby-and-scenery/paints-washes-etc/citadel-games-workshop-paints/citadel-layer-1',
    'https://elementgames.co.uk/paints-hobby-and-scenery/paints-washes-etc/citadel-games-workshop-paints/citadel-shade',
    'https://elementgames.co.uk/paints-hobby-and-scenery/paints-washes-etc/citadel-games-workshop-paints/citadel-air-2',
];

for (const url of websites) {
  await puppeteer
    .launch({ headless: true })
    .then(async browser => {
        const page = await browser.newPage();
        await page.goto(url, {
          waitUntil: "domcontentloaded",
        });

        await page.waitForSelector(".productgrid", {
          waitUntil: "networkidel2",
          timeout: 60 * 1000,
        });

        const data = await page.evaluate(() => {
          let paints = [];
          let elements = document.querySelectorAll('.productgrid');

          for (let element of elements) {
            let title = element.querySelector(".producttitle").innerText;
            let price = element.querySelector(".price").innerText;

            paints.push({ title, price });
          }

          return paints;

        });

        // const [paint, price] = [
        //   JSON.parse(data[0]),
        //   JSON.parse(data[1]),
        // ];

        

        fs.writeFile('../paint-data/elementgames-citadel-paint.json', JSON.stringify(data), (err) => {
          if (err) throw err;
        });

        // console.log({ paint, price });
        await browser.close();
        return data;
      });
};