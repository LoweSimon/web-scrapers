import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';

puppeteer.use(StealthPlugin())

import { executablePath } from 'puppeteer';


const full_url = "https://books.toscrape.com/catalogue/page-2.html"


const main = async () => {

    
    
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() })

    const page = await browser.newPage()

    await page.goto(full_url)

    const paintData = await page.evaluate((full_url) => {

        const convertPrice = (price) => {
            return parseFloat(price.replace('£', ''))
        }

        const paintGrid = Array.from(document.querySelectorAll('.product_pod'))
        const data = paintGrid.map((paint) => ({
            paintTitle: paint.querySelector('h3 a').getAttribute('title'),
            paintPrice: convertPrice(paint.querySelector('.price_color').innerText)
            // paintLink: paint.querySelector('.instock availability').innerText
        }))

        return data
    }, full_url)

    console.log(paintData)
    

    await browser.close();


    fs.appendFile('./test-data.json', JSON.stringify(paintData, null, 2), (err) => {
        if (err) throw err
        console.log('Successfully save JSON')
    })
}

main()