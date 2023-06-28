import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import * as fs from 'fs';

async function getShadePaint()   {
    try {
        let base_url = "https://www.goblingaming.co.uk/";

        const response = await fetch (`${base_url}collections/paints-citadel?filter.p.m.search.paint_range=Shade&sort_by=title-ascending`);
        const body = await response.text();

        const $ = cheerio.load(body);

        const items = [];

        $('.g-product-grid__item > .g-product-card').map((i, el) => {
            const paint_link = $(el).find('a').attr('href');
            const paintTitle = $(el).find('.g-product-card__title').text();
            const paintPrice = $(el).find('.g-product-card__price').text();

            let paintLink = base_url + paint_link;

            items.push({
                paintLink,
                paintTitle,
                paintPrice
            });
        });

        console.log(items);
        var itemsString = JSON.stringify(items, null, 2);
        fs.writeFile("../goblingaming-paint-data/citadel/citadel-shade-paint.json", itemsString, function(err, result) {
            if(err) console.log('error', err);
        });
    } catch (error) {
        console.log(error);
    }
}

getShadePaint();