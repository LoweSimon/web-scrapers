import axios from "axios";
import Cheerio from "cheerio";
import * as fs from 'fs';
import chalk from "chalk";

const base_url = "https://www.waylandgames.co.uk/"

const url = `${base_url}painting-modelling/paints-sprays-primers/citadel-paints/citadel-base?s__name=ASC`
const outputFile = '../waylandgames-paint-data/citadel/citadel-base-paint.json'
const parsedResults = []
const pageLimit = 2
let pageCounter = 0
let resultCounter =0

console.log(chalk.yellow.bgBlue(`\n Scraping of ${chalk.underline.bold(url)} initiated... \n`))

const getBasePaint = async (url) => {
    try {
        const response = await axios.get(url)
        const $ = cheerio.load(reponse.data)

        $('..Grid_gridCell__24sij  > .ProductCard_product__bG4Xh').map((i, el) => {
            const count = resultCounter++
            const paint_link = $(el).find('a').attr('href')
            const paintTitle = $(el).find('.ProductCard_productName__MjkUX').text()
            const paintPrice = $(el).find('.Price_price__nmbiH').text()
            const metaData = {
                count: count,
                paintLink: base_url + paint_link,
                paintTitle: paintTitle,
                paintPrice: paintPrice
            }
            parsedResults.push(metaData)
        })

        const nextPageLink = $('.Pagination_pagination__Nhmeo').find('.Pagination_paginationLinkCurrent__5Opkg').parent().next().find('button')
        console.log(chalk.cyan(` Scrapping: ${nextPageLink}`))
        pageCounter++

        if (pageCounter === pageLimit) {
            exportedResults(parsedResults)
            return false
        }
        getBasePaint(nextPageLink)
    } catch (error) {
        exportedResults(parsedResults)
        console.log(error)
    }

    
        fs.writeFile(outputFile, JSON.stringify(parsedResults, null, 2), (err) => {
            if (err) {
                console.log(err)
            }
            console.log(chalk.yellow.bgBlue(`\n ${chalk.underline.bold(parsedResults.length)} Results exported successfully to ${chalk.underline.bold(outputFile)}\n`))
        })
    
}

getBasePaint(url)