import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';

puppeteer.use(StealthPlugin())

import { executablePath } from 'puppeteer';


const full_url = "https://www.waylandgames.co.uk/painting-modelling/paints-sprays-primers/citadel-paints/citadel-technical"


const main = async () => {
    
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() })

    const page = await browser.newPage()

    await page.goto(full_url)

    const paintData = await page.evaluate((full_url) => {

        const convertPrice = (price) => {
            return parseFloat(price.replace('£', ''))
        }

        const paintGrid = Array.from(document.querySelectorAll('.productgrid'))
        const data = paintGrid.map((paint) => ({
            paintTitle: paint.querySelector('.producttitle').innerText.toLowerCase(),
            paintPrice: convertPrice(paint.querySelector('.price').innerText),
            paintLink: `https://www.waylandgames.co.uk/${paint.querySelector('div a').getAttribute('href').replace("../../../", "")}`
        }))

        return data
    }, full_url)

    console.log(paintData)
    

    await browser.close();


    fs.writeFile('../waylandgames-paint-data/citadel/citadel-technical-paint.json', JSON.stringify(paintData, null, 2), (err) => {
        if (err) throw err
        console.log('Successfully save JSON')
    })
}

main()