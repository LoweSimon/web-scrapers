import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import * as fs from 'fs';

async function getElementCitadelPaint()   {
    try {

        let base_url = "https://elementgames.co.uk/";

        // fetching data from url and store the response
        const response = await fetch(`${base_url}paints-hobby-and-scenery/paints-washes-etc/citadel-games-workshop-paints/citadel-shade`);
        // converting the reponse to text format
        const body = await response.text();

        // loading body data
        const $ = cheerio.load(body);

        // creating an empty array
        const items = [];

        // selecting the required classes for the paint information
        $('.productgrid > .productinfo').map((i, el)  =>  {
            const paint_link = $(el).find('a').attr('href').replace("/../../../", '/');
            const paintTitle = $(el).find('.producttitle').text();
            const paintPrice = $(el).find('.price').text();

            let paintLink = base_url + paint_link;

            // adding items to the array
            items.push({
                paintLink,
                paintTitle,
                paintPrice
            });
        });

        // creating .json file with results
        console.log(items);
        var itemsString = JSON.stringify(items, null, 2);
        fs.writeFile("../element-games-paint-data/citadel/citadel-shade-paint.json", itemsString, function(err, result)  {
            if(err) console.log('error', err);
        });

    } catch (error) {
        console.log(error);
    }
}

getElementCitadelPaint();