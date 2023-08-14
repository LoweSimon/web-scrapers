import * as fs from 'fs'

const urls = [
    
]

const last_urls = []

urls.forEach((e) => {
    const new_urls = e.toString().replace("file/d/", "uc?id=")
    last_urls.push(new_urls)
})

fs.writeFile('./new-urls/technical-urls.json', JSON.stringify(last_urls, null, 2), (err) => {
    if (err) throw err
    console.log("It be done!")
})