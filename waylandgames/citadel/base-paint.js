import * as cheerio from 'cheerio';
import fetch from "node-fetch";
import * as fs from 'fs';

async function getBasePaint() {
    try {
        let base_url = "https://www.waylandgames.co.uk/"

        const response = await fetch(`${base_url}painting-modelling/paints-sprays-primers/citadel-paints/citadel-base?s__name=ASC`)
        const body = await response.text()

        const $ = cheerio.load(body)

        const items = [];

        $('.Grid_gridCell__24sij  > .ProductCard_product__bG4Xh > .ProductCard_productDetails__TbCD2').map((i, el) => {
            const paint_link = $(el).find('a').attr('href')
            const paintTitle = $(el).find('.ProductCard_productName__MjkUX').text()
            const paintPrice = $(el).find('.Price_price__nmbiH').text()

            let paintLink = base_url + paint_link

            items.push({
                paintLink,
                paintTitle,
                paintPrice
            })
        })

        console.log(items)
        let itemsString = JSON.stringify(items, null, 2)
        fs.writeFile("../waylandgames-paint-data/citadel/citadel-base-paint.json", itemsString, function(err, result) {
            if(err) console.log('error', err)
        })
    } catch (error) {
        console.log(error)
    }
}

getBasePaint()