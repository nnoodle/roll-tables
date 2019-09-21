
const hash = window.location.hash.substring(1)
const input_el = document.getElementById('diceinput')
const table_el = document.getElementById('dicetable')
const btn_el = document.getElementById('roll-btn')

let amount, sides = 1

let tablea = {
  name: 'Trinkets sold in Cart Market',
  amount: 1,
  sides: 100,
  data: [
    // DC, value
    [ 1, "Bundles of old wooden dip pens." ],
    [ 2, "Old manuscripts filled with bizarre animal anatomy." ],
    [ 3, "A rich assortment of old, worn wedding bands." ],
    [ 4, "Rich pickled eggs." ],
    [ 5, "Signal mirrors, well-worn and trusty." ],
    [ 6, "Waterproof tinderboxes and small fireworks." ],
    [ 7, "Magical Scrolls. (Random level 1 wizard spell)" ],
    [ 8, "Set of five exquisite, thin throwing knives." ],
    [ 9, "Ruby worry-stone that erases unpleasant memories." ],
    [ 10, "Strangely familiar boots." ],
    [ 11, "Hardpuzzle box. 2d6-INT days to open, contains 150sp" ],
    [ 12, "Bottle of black leather dye." ],
    [ 13, "Monocles with odd patterns etched in the glass." ],
    [ 14, "Amulet of a woman clasping a vial. (1 dose of anti-poison)" ],
    [ 15, "Manual of advanced baking techniques." ],
    [ 16, "Flesh-stitching needle kit." ],
    [ 17, "Odd set of stone triangles that form a puzzle." ],
    [ 18, "Roll of dimly-glowing metal wire." ],
    [ 19, "Tiny metal boxes that can capture sound." ],
    [ 20, "Mason jars filled with odd, dangerous-looking leeches." ],
    [ 21, "A dagger with an internal reservoir for venom." ],
    [ 22, "Sticks of incense that keep away wild animals when burnt." ],
    [ 23, "Bundles of water-breaking moss, must chew" ],
    [ 24, "Water blessed by a monk, to break curses & cure disease." ],
    [ 25, "Enchanted fishhooks." ],
    [ 26, "A variety of slim concealed weapon-sheathes." ],
    [ 27, "Bottled smoke" ],
    [ 28, "Peaches that cause the eater to look 2d6 years younger. No effect on lifespan." ],
    [ 29, "Enchanted scrollcase, can hold 10 scrolls in extradimensional space." ],
    [ 30, "Unnerving wooden masks." ],
    [ 31, "Expanded thieves tools." ],
    [ 32, "Shovel that consumes the dirt it digs." ],
    [ 33, "Spyglass that faintly illuminates swords that are viewed through its lens." ],
    [ 34, "Glasscutting tools." ],
    [ 35, "Odd wooden bowl. Produces 1potato at sunrise." ],
    [ 36, "Axe that can only cut wood." ],
    [ 37, "Strange potted fern,stores sunlight, releases it at night." ],
    [ 38, "Domesticated war-turkeys." ],
    [ 39, "Silver mirror shows an image of distant locale at midnight." ],
    [ 40, "Exceptionally lightweight cooking gear." ],
    [ 41, "Makeup crafted by a faerie, infused with glamour." ],
    [ 42, "Wooden chess set, modeled onfamous heroes from myth." ],
    [ 43, "Huge mechanical beasts designed to carry baggage." ],
    [ 44, "Dragon teeth. When scattered on dirt, myrmidons arise." ],
    [ 45, "Blessed bone fragments used by diviners to predict future." ],
    [ 46, "Droughts of liquified sleep." ],
    [ 47, "Anamulet that contains a helpful, knowledgeable spirit." ],
    [ 48, "A glass whiskey-thief that can move through solid objects to steal liquid from any container." ],
    [ 49, "Mechanical birds that can memorize one sound they hear and repeat it." ],
    [ 50, "Glass eggs that contain a tiny world." ],
    [ 51, "Undead potted cactus." ],
    [ 52, "Pyrite worry-stone that recalls false memories." ],
    [ 53, "Clay masks that change expression to match the wearer’s inner emotions." ],
    [ 54, "Beautiful folding fans that display ever-shifting tableaus." ],
    [ 55, "Small flowstones that heat up water to comfortable bathing temperatures." ],
    [ 56, "Mortal & pestle that can transmute gemstones into spices." ],
    [ 57, "Carafe with intricate etchings. Wine stored inside will never cork or spoil." ],
    [ 58, "Flasks of healing salve mingled with numbing agent." ],
    [ 59, "Musical instruments that all sound utterly wrong." ],
    [ 60, "Bunches of dried heat-flowersthat all masochists love." ],
    [ 61, "Glowing sets of dice that have innate personality." ],
    [ 62, "A jagged flesh-blade that cooks whatever it flays." ],
    [ 63, "Lovingly-crafted boots, renowned for their comfort." ],
    [ 64, "Crystallized lightning, stored in easily-breakable rocks." ],
    [ 65, "Knitting needles that can pluck strands of water and weave them into tapestries." ],
    [ 66, "Small jars of pinkpowders that magically enhance beauty." ],
    [ 67, "A wicked dagger made of a werewolf’s infectious fang." ],
    [ 68, "An ugly, amusing hat that amplifies the wearer’shearing." ],
    [ 69, "Pitch-black shortswords that are invisible in torchlight." ],
    [ 70, "Hip flask. Anything inside always tastes of peaches." ],
    [ 71, "Playing cards that quietly murmur insults to the players." ],
    [ 72, "Obsidian cubes, originally traded by void-travellers." ],
    [ 73, "Flashy feathers of someflighted creature that have been turned into pens." ],
    [ 74, "Glass orbs filled with colorful, exotic fish." ],
    [ 75, "Wooden tonfas, the oak stained with lifeblood." ],
    [ 76, "Medicine that cures disease, but inflicts subtle mutations." ],
    [ 77, "Beautiful fruiting plants that store sunlight for later." ],
    [ 78, "Dormant parasite samples. They devour brain-flesh." ],
    [ 79, "Ancient textbooks that detail methods of preparing organs for surgery." ],
    [ 80, "Small statuettes of humans in various amounts of pain." ],
    [ 81, "Metal torches designed to slowly burn lamp oil." ],
    [ 82, "A music box that plays the sound of wet, frantic footsteps and panicked breathing." ],
    [ 83, "Sapphire worry-stone that conjures pleasant memories." ],
    [ 84, "Tanned hides from various rare beasts." ],
    [ 85, "Ice-9 in carefully-sealed tins." ],
    [ 86, "Metal tins lined with velvet for sending offerings to the deities." ],
    [ 87, "Jarsof loose, assorted keys." ],
    [ 88, "A lamp that once held a djinn." ],
    [ 89, "Packs of freeze-dried noodle squares." ],
    [ 90, "Captive flames, trapped in diamond vials." ],
    [ 91, "Steel carafe overflowing with perpetually-cold milk." ],
    [ 92, "Strange garments from another world, stylish and protective." ],
    [ 93, "Silver chastity belt, intimidating and easily-hidden." ],
    [ 94, "Slim cedar wand that conjures fire from beyond the stars." ],
    [ 95, "Drugs that will polymorph anyone who imbibes them into a small creature for one minute." ],
    [ 96, "Tiny vials of gold dust, mixed with blood." ],
    [ 97, "Hearts of various animals, kept cold on ice." ],
    [ 98, "Pens that recall what they’ve been used to write." ],
    [ 99, "Animal tokens shaped from semi-precious stones." ],
    [ 100, "Blackened leather from a hellhound’s still-living form." ],
  ]
}

let table = {
  name: 'Trinkets sold in Cart Market',
  amount: 2,
  sides: 6,
  data: [
    [ 1, "Old manuscripts filled with bizarre animal anatomy." ],
    [ 7, "Magical Scrolls. (Random level 1 wizard spell)" ],
    [ 8, "Set of five exquisite, thin throwing knives." ],
  ]
}

const arrayToBase64 = arr =>
      btoa(Array.prototype.reduce.call(new Uint8Array(arr), (p,c) => p + String.fromCharCode(c),''))

const compress = dat => LZString.compressToBase64(JSON.stringify(dat))
const decompress = dat => JSON.parse(LZString.decompressFromBase64(dat))
// const compress = dat => base64js.fromByteArray(LZMA.compress(JSON.stringify(dat)))
// const decompress = dat => JSON.parse(LZMA.decompress(base64js.toByteArray(dat)))

function scrunch(dat) {
  return compress(dat)
}

function unscrunch(dat) {
  return decompress(dat)
}

function rollxds(x, s) {
  let t = 0
  while (x--)
    t += Math.floor(Math.random() * s) + 1
  return t
}

function parseDice(str) {
  const v = str.split('d')
  v[0] = Math.abs(Number.parseInt(v[0])) || 1
  if (!(v[1] = Math.abs(Number.parseInt(v[1])))) {
    return [amount, sides]
  }
  return [v[0], v[1]]
}

function insertRow(tbl) {
  const row = tbl.insertRow()
  row.insertCell()
  const cell = row.insertCell()
  const data = document.createElement('textarea')
  data.name = 'result'
  data.placeholder = '．．．'
  data.rows = 1
  cell.appendChild(data)
}

function updateTable(tbl, x, s) {
  let rows =  x*s-x+1
  let len = tbl.rows.length-1
  for (let i = 0, m = Math.abs(rows-len); i < m; ++i)
    if (rows > len) {
      insertRow(tbl)
    } else if (rows < len) {
      tbl.deleteRow(-1)
    }
  for (td of Array.from(tbl.rows).slice(1)) {
    td.children[0].textContent = x
    x++
  }
}

function syncDiceTable(value) {
  [amount, sides] = parseDice(value)
  updateTable(table_el, amount, sides)
}

function rollTable(tbl, x, s) {
  const roll = rollxds(x, s)
  const result = Array.from(tbl.rows).slice(1)
        .find(td => Number.parseInt(td.children[0].textContent) === roll)
        .children[1].children[0].value
  document.getElementById('result').textContent = result
}

syncDiceTable(input_el.value)
input_el.oninput = e => syncDiceTable(e.target.value)
btn_el.onclick = () => rollTable(table_el, amount, sides);
