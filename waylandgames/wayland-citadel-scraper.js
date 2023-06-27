import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';

puppeteer
    .use(StealthPlugin())
    .launch({ headless: true })
    .then(async browser => {
        const page = await browser.newPage()
        await page.goto('https://www.waylandgames.co.uk/159-citadel-paints')

        let pagesToScrape = 16;
        let currentPage = 1;

        while (currentPage < pagesToScrape) {
            const quotes = await page.evaluate(() => {
                
                const quoteList = document.querySelectorAll(".product-container");

                return Array.from(quoteList).map((quote) => {
                const title = quote.querySelector(".product-name").innerText;
                const price = quote.querySelector(".product-price").innerText;

                    return { 
                        title, 
                        price 
                    };

                });
            });
        

            var itemList = JSON.stringify(quotes, null, 2);
            fs.writeFile("./waylandgames-paint-data/wayland-citadel-paint.json", itemList, function(err, result)  {
                if(err) console.log('error', err);
            });
        

        if (currentPage <= pagesToScrape)    {
            await page.click(".pagination_next a");
            await page.waitForSelector(".product-container");
            await page.waitForSelector(".pagination_next a")
        } 
        currentPage++;

        }

        await browser.close()
    })