import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';

puppeteer.use(StealthPlugin())

// import { executablePath } from 'puppeteer';

async function scrape() {
    try {
        const browser = await puppeteer.launch({headless: false})
        const full_url = "https://www.waylandgames.co.uk/painting-modelling/paints-sprays-primers/army-painter-warpaints/warpaints"
        const page = await browser.newPage()

        await page.goto(full_url)
        let pagesToScrape = 2
        let currentPage = 1
        let data = []

        while (currentPage <= pagesToScrape) {
            let newResults = await page.evaluate(() => {
                let results = []
                let items = document.querySelectorAll('.Grid_gridCell__MMwiP ')
                items.forEach((paint) => {
                    results.push({
                        paintTitle: paint.querySelector('h2 a').innerText,
                        paintPrice: paint.querySelector('.Price_price__sfl_r ').innerText,
                        paintLink: `https://www.waylandgames.co.uk${paint.querySelector('h2 a').getAttribute('href')}`
                    })
                })
                return results
            })
            data = data.concat(newResults)
            if (currentPage < pagesToScrape) {
                await page.click('li.Pagination_paginationItem__mKof6.Pagination_paginationItemNextPage__WZn0E > button')
                await page.waitForSelector('.Grid_gridCell__MMwiP ')
                // await page.waitForSelector('li.item.pages-item-next > a')
            }
            currentPage++
        }
        console.log(data)
        await browser.close()

    } catch (error) {
        console.error(error)
    }
}

scrape()


// const main = async () => {
    
//     const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() })

//     // const page = await browser.newPage()

//     await page.goto(full_url)

//     let lastPageNumber = 50

//     // const paintData = await page.evaluate((full_url) =>
//     for (let index = 0; index < lastPageNumber; index++) {

//         await page.waitFor(1000);
//         results = results.concat(await extractedEvaluateCalle(page))

//         if (index != lastPageNumber -1) {
//             await page.click('#default > div > div > div > div > section > div:nth-child(2) > div > ul > li.next > a')
//         }

        
    

//     await browser.close();


//     fs.writeFile('./test-data.json', JSON.stringify(paintData, null, 2), (err) => {
//         if (err) throw err
//         console.log('Successfully save JSON')
//     })
// }

// async function extractedEvaluateCalle(page) {
//     const paintData = await page.evaluate((page) => {
//         const convertPrice = (price) => {
//             return parseFloat(price.replace('£', ''))
//         }

//         const paintGrid = Array.from(document.querySelectorAll('.product_pod'))
//         const data = paintGrid.map((paint) => ({
//             paintTitle: paint.querySelector('h3 a').innerText.toLowerCase(),
//             paintPrice: convertPrice(paint.querySelector('.product_price').innerText),
//             paintLink: `https://books.toscrape.com/${paint.querySelector('h3 a').getAttribute('href')}`
//         }))

//         return data
//     }, full_url)

//     console.log(paintData)
//     }
// }



// main().then((value) => {
//     console.log(value);
//     console.log('Collection length: ' + value.length)
//     console.log(value[0])
//     console.log(value[value.length - 1])
// })