import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';

puppeteer.use(StealthPlugin())

// import { executablePath } from 'puppeteer';

async function scrape() {
    try {
        const browser = await puppeteer.launch({headless: "new"})
        const full_url = "https://www.waylandgames.co.uk/painting-modelling/paints-sprays-primers/ak-interactive?f__brand__name=Brand&f__brand__value=AK+Interactive+-+Weathering&f__brand__eq=53216"
        const page = await browser.newPage()

        await page.goto(full_url, {waitUntil: 'networkidle0'})
        let pagesToScrape = 3
        let currentPage = 1
        let data = []

        while (currentPage <= pagesToScrape) {
            let newResults = await page.evaluate((full_url) => {

                const convertPrice = (price) => {
                    return parseFloat(price.replace('£', ''))
                }

                let results = []
                let items = document.querySelectorAll('.Grid_gridCell__MMwiP ')
                items.forEach((paint) => {
                    results.push({
                        paintTitle: paint.querySelector('h2 a').innerText,
                        paintPrice: convertPrice(paint.querySelector('.Price_price__sfl_r ').innerText),
                        paintLink: `https://www.waylandgames.co.uk${paint.querySelector('h2 a').getAttribute('href')}`
                    })
                })
                return results
            })
            data = data.concat(newResults)
            if (currentPage < pagesToScrape) {
                await page.click('li.Pagination_paginationItem__mKof6.Pagination_paginationItemNextPage__WZn0E > button')
                await page.waitForNetworkIdle({idleTime: 2000})
            }
            currentPage++
        }
        console.log(data)
        await browser.close()

        fs.writeFile('../waylandgames-paint-data/akinteractive/wash-paint.json', JSON.stringify(data, null, 2), (err) => {
            if (err) throw err
            console.log('Successfully saved JSON')
        })

    } catch (error) {
        console.error(error)
    }
}

scrape()