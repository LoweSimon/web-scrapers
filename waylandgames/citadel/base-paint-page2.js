import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';

puppeteer.use(StealthPlugin())

import { executablePath } from 'puppeteer';

// const base_url = "https://www.waylandgames.co.uk"
// const trailing_url = "/painting-modelling/paints-sprays-primers/citadel-paints/citadel-base?s__name=ASC"

const full_url = "https://www.waylandgames.co.uk/painting-modelling/paints-sprays-primers/citadel-paints/citadel-base?p=2"


const main = async () => {
    
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() })

    const page = await browser.newPage()

    await page.goto(full_url)

    const paintData = await page.evaluate((full_url) => {

        const convertPrice = (price) => {
            return parseFloat(price.replace('£', ''))
        }

        const paintPods = Array.from(document.querySelectorAll('.Grid_gridCell__MMwiP '))
        const data = paintPods.map((paint) => ({
            paintTitle: paint.querySelector('h2 a').innerText,
            paintPrice: convertPrice(paint.querySelector('.Price_price__sfl_r ').innerText),
            paintLink: `https://www.waylandgames.co.uk${paint.querySelector('h2 a').getAttribute('href')}`
        }))

        return data
    }, full_url)

    console.log(paintData)
    

    await browser.close();


    fs.appendFile('../waylandgames-paint-data/citadel/citadel-base-paint.json', JSON.stringify(paintData, null, 2), (err) => {
        if (err) throw err
        console.log('Successfully save JSON')
    })
}

main()