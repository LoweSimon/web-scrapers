import data from './elementgames/element-games-paint-data/armypainter/speed-paint.json' assert { type: "json" }

const stringy = JSON.stringify(data)
const parsed = JSON.parse(stringy)

for (let i = 0; i <= parsed.length; i++) {
    console.log(parsed[i].paintTitle89)
}