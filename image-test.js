import puppeteer from "puppeteer";
import * as fs from 'fs';

async function start() {
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage()
    await page.goto('https://books.toscrape.com/')

    const photos = await page.$$eval("img", imgs => {
        return imgs.map(x => x.src)
    })

    for (const photo of photos) {
        const imagepage = await page.goto(photo)
        let photoname = photo.split("/").pop()
        await imagepage.buffer()
        fs.writeFile("/images", photoname, (err) => {
            if (err) throw err
            console.log('Successfully save JSON')
        }) 
    }

    await browser.close()
}

start()