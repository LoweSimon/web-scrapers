import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import * as fs from 'fs';

async function getBasePaint() {
    try {
            let base_url = "https://www.goblingaming.co.uk/";

            const url1 = await fetch(`${base_url} + collections/paints-citadel?filter.p.m.search.paint_range=Base&page=1&sort_by=title-ascending`);

            const body = await url1.text();
            const $ = cheerio.load(body);
        

            const items1 = [];

            $('.g-product-grid__item > .g-product-card').map((i, el) => {
                const paint_link = $(el).find('a').attr('href');
                const paintTitle = $(el).find('.g-product-card__title').text();
                const paintPrice = $(el).find('.g-product-card__price').text();

                let paintLink = base_url + paint_link;

                items1.push({
                    paintLink,
                    paintTitle,
                    paintPrice
                });
                console.log(items1);

            });


                
                let itemsString = JSON.stringify(items1, null, 2);
                fs.writeFile("../goblingaming-paint-data/citadel/citadel-base-paint.json", itemsString, function(err, result) {
                    if(err) console.log('error', err);
                });
        } catch (error) {
            console.log(error);
        }
    }




getBasePaint();