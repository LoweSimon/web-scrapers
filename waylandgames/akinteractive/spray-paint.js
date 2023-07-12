import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';

puppeteer.use(StealthPlugin())

import { executablePath } from 'puppeteer';


const full_url = "https://www.waylandgames.co.uk/painting-modelling/paints-sprays-primers/ak-interactive?f__multi_product_type__name=Product+Type&f__multi_product_type__value=Aerosol&f__multi_product_type__eq=48038"


const main = async () => {
    
    const browser = await puppeteer.launch({ headless: "new", executablePath: executablePath() })

    const page = await browser.newPage()

    await page.goto(full_url, {waitUntil: 'networkidle0'})

    const paintData = await page.evaluate((full_url) => {

        const convertPrice = (price) => {
            return parseFloat(price.replace('£', ''))
        }

        const paintGrid = Array.from(document.querySelectorAll('.Grid_gridCell__MMwiP '))
        const data = paintGrid.map((paint) => ({
            paintTitle: paint.querySelector('h2 a').innerText,
            paintPrice: convertPrice(paint.querySelector('.Price_price__sfl_r ').innerText),
            paintLink: `https://www.waylandgames.co.uk${paint.querySelector('h2 a').getAttribute('href')}`
        }))

        return data
    }, full_url)

    console.log(paintData)
    

    await browser.close();


    fs.writeFile('../waylandgames-paint-data/akinteractive/spray-paint.json', JSON.stringify(paintData, null, 2), (err) => {
        if (err) throw err
        console.log('Successfully save JSON')
    })
}

main()