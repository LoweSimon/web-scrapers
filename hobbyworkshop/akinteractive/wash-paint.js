import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';

puppeteer.use(StealthPlugin())

// import { executablePath } from 'puppeteer';

async function scrape() {
    try {
        const browser = await puppeteer.launch({headless: true})
        const full_url = "https://www.hobbyworkshop.co.uk/catalogsearch/result/index/?manufacturer=1570&q=ak+interactive+wash"
        const page = await browser.newPage()

        await page.goto(full_url)
        let pagesToScrape = 2
        let currentPage = 1
        let data = []

        while (currentPage <= pagesToScrape) {
            let newResults = await page.evaluate(() => {

                const convertPrice = (price) => {
                    return parseFloat(price.replace('£', ''))
                }

                let results = []
                let items = document.querySelectorAll('.product-item')
                items.forEach((paint) => {
                    results.push({
                        paintTitle: paint.querySelector('.product-item-name').innerText,
                        paintPrice: convertPrice(paint.querySelector('.price-box .special-price .price').innerText),
                        paintLink: paint.querySelector('.product-item-details a').getAttribute('href')
                    })
                })
                return results
            })
            data = data.concat(newResults)
            if (currentPage < pagesToScrape) {
                await page.click('li.item.pages-item-next > a')
                await page.waitForSelector('.product-item')
                // await page.waitForSelector('li.item.pages-item-next > a')
            }
            currentPage++
        }
        console.log(data)
        await browser.close()

        fs.writeFile('./hobbyworkshop/paint-data/akinteractive/ak-wash-paint.json', JSON.stringify(data, null, 2), (err) => {
            if (err) throw err
            console.log('Successfully saved JSON')
        })

    } catch (error) {
        console.error(error)
    }
}

scrape()