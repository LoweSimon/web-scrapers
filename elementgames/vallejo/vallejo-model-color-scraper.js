import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import * as fs from 'fs';

async function getElementVallejoPaint()   {
    try {
        // fetching data from url and store the response
        const response = await fetch('https://elementgames.co.uk/paints-hobby-and-scenery/paints-washes-etc/vallejo-paints/model-color/model-color-paints');
        // converting the reponse to text format
        const body = await response.text();

        // loading body data
        const $ = cheerio.load(body);

        // creating an empty array
        const items = [];

        // selecting the required classes for the paint information
        $('.productgrid > .productinfo').map((i, el)  =>  {
            const paintTitle = $(el).find('.producttitle').text();
            const paintPrice = $(el).find('.price').text();

            // adding items to the array
            items.push({
                paintTitle,
                paintPrice
            });
        });

        // creating .json file with results
        console.log(items);
        var itemsString = JSON.stringify(items, null, 2);
        fs.writeFile("../element-games-paint-data/vallejo/elementgames-vallejo-model-color-paint.json", itemsString, function(err, result)  {
            if(err) console.log('error', err);
        });

    } catch (error) {
        console.log(error);
    }
}

getElementVallejoPaint()