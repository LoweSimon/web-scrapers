// const axios = require('axios'); 
// const cheerio = require('cheerio'); 
// const fs = require('fs'); 

import axios from 'axios';
import cheerio from 'cheerio';
import * as fs from 'fs';

const targetURL = 'https://scrapeme.live/shop/'; 
 
const getPokemons = ($) => { 
	 
	const pokemons = $('.products li'); 
	const pokemonData = []; 
	
	pokemons.each((index, el) => { 

		const pokemon = {} 
 
		pokemon.img = $(el).find('a > img').attr('src'); 
		pokemon.name = $(el).find('h2').text();
		pokemon.price = $(el).find('.amount').text();
		pokemonData.push(pokemon) 
	}) 
 

	fs.writeFile("./goblingaming-paint-data/pokemon.json", JSON.stringify(pokemonData, null, 2), (err) => { 
		if (err) { 
			console.error(err); 
			return; 
		} 
		console.log("Data written to file successfully!"); 
	}); 
} 
 

axios.get(targetURL).then((response) => { 
	const body = response.data; 
	const $ = cheerio.load(body);
	getPokemons($) 
});






// import puppeteer from "puppeteer-extra";
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import AdBlockerPlugin from 'puppeteer-extra-plugin-adblocker';
// puppeteer.use(AdBlockerPlugin()).use(StealthPlugin());

// import * as fs from 'fs';
import { axios } from 'axios';

// const getPaint = async () => {
//   const browser = await puppeteer.launch({
//     headless: false
//   });
//   const page = await browser.newPage();
//   await page.goto("https://www.goblingaming.co.uk/collections/paints-citadel");
//   await page.setViewport({
//     width: 1200,
//     height: 800
//   });

//   await autoScroll(page);

//   const paints = await page.evaluate(() => {
//       const paintItem = document.querySelectorAll("._hit_1bds3_1");
//       return Array.from(paintItem).map((paint) => {
//       const title = paint.querySelector("._title_1bds3_31").innerText;
//       const price = paint.querySelector("._price_1bds3_43").innerText;
          
//       return { title, price };
                    
                    
//       });
      

//   });
//     fs.writeFile("./goblingaming-paint-data/goblingaming-citadel-paint.json", JSON.stringify(paints, null, 2), function(err, result)  {
//       if(err) console.log('error', err);
//     });
// };
// getPaint();

// async function autoScroll(page){
//   await page.evaluate(async () => {
//       await new Promise((resolve) => {
//           var totalHeight = 0;
//           var distance = 100;
//           var timer = setInterval(() => {
//               var scrollHeight = document.body.scrollHeight;
//               window.scrollBy(0, distance);
//               totalHeight += distance;

//               if(totalHeight >= scrollHeight - window.innerHeight){
//                   clearInterval(timer);
//                   resolve();
//               }
//           }, 100);
//       });
//   });
// }