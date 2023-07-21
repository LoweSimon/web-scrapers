import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';

puppeteer.use(StealthPlugin())

import { executablePath } from 'puppeteer';


const full_url = "https://www.hobbyworkshop.co.uk/catalogsearch/result/?q=special+fx"


const main = async () => {
    
    const browser = await puppeteer.launch({ headless: "new", executablePath: executablePath() })

    const page = await browser.newPage()

    await page.goto(full_url)

    const paintData = await page.evaluate((full_url) => {

        const convertPrice = (price) => {
            return parseFloat(price.replace('£', ''))
        }

        const paintGrid = Array.from(document.querySelectorAll('.product-item'))
        const data = paintGrid.map((paint) => ({
            paintTitle: paint.querySelector('.product-item-name').innerText,
            paintPrice: convertPrice(paint.querySelector('.price').innerText),
            paintLink: paint.querySelector('.product-item-details a').getAttribute('href')
        }))

        return data
    }, full_url)

    console.log(paintData)
    

    await browser.close();


    fs.writeFile('../paint-data/vallejo/special-fx.json', JSON.stringify(paintData, null, 2), (err) => {
        if (err) throw err
        console.log('Successfully save JSON')
    })
}

main()