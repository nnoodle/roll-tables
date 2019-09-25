
const compress = dat => LZString.compressToBase64(JSON.stringify(dat))
const decompress = dat => JSON.parse(LZString.decompressFromBase64(dat))
// const compress = dat => base64js.fromByteArray(LZMA.compress(JSON.stringify(dat)))
// const decompress = dat => JSON.parse(LZMA.decompress(base64js.toByteArray(dat)))

var app = new Vue({
  el: '#app',
  data: {
    dice: '2d6',
    result: '',
    t: {
      name: 'Trinkets sold in Cart Market',
      amount: 1,
      sides: 20,
      data: [
        { dc:1, val: "Bundles of old wooden dip pens." },
        { dc:2, val: "Old manuscripts filled with bizarre animal anatomy." },
        { dc:3, val: "A rich assortment of old, worn wedding bands." },
        { dc:4, val: "Rich pickled eggs." },
        { dc:5, val: "Signal mirrors, well-worn and trusty." },
        { dc:6, val: "Waterproof tinderboxes and small fireworks." },
        { dc:7, val: "Magical Scrolls. (Random level 1 wizard spell)" },
        { dc:8, val: "Set of five exquisite, thin throwing knives." },
        { dc:9, val: "Ruby worry-stone that erases unpleasant memories." },
        { dc:10, val: "Strangely familiar boots." },
        { dc:11, val: "Hardpuzzle box. 2d6-INT days to open, contains 150sp" },
        { dc:12, val: "Bottle of black leather dye." },
        { dc:13, val: "Monocles with odd patterns etched in the glass." },
        { dc:14, val: "Amulet of a woman clasping a vial. (1 dose of anti-poison)" },
        { dc:15, val: "Manual of advanced baking techniques." },
        { dc:16, val: "Flesh-stitching needle kit." },
        { dc:17, val: "Odd set of stone triangles that form a puzzle." },
        { dc:18, val: "Roll of dimly-glowing metal wire." },
        { dc:19, val: "Tiny metal boxes that can capture sound." },
        { dc:20, val: "Mason jars filled with odd, dangerous-looking leeches." },
      ]
    },
  },

  beforeMount: function() {
    const hash = window.location.hash.substring(1)
    if (hash)
      this.t = unscrunch(decompress(hash))
    this.dice = this.t.amount+'d'+this.t.sides
  },

  watch: {
    't.name': updateLink
  },

  methods: {
    updateDice: function(e) {
      const val = e.target.value
      let [x, s] = parseDice(val, this.t.amount, this.t.sides)
      this.t.amount = x
      this.t.sides = s

      const rows = x*s-x+1
      const len = this.t.data.length
      if (rows < len)
        this.t.data.splice(rows)
      else if (rows > len)
        for (let i = 0, m = rows-len; m > i; i++)
          this.t.data.push({ dc: 0, val: '' })
      for(let i in this.t.data) {
        i = Number(i)
        this.t.data[i].dc = i+x
      }
      updateLink(this.t)
    },

    updateEntry: function(dc, e) {
      this.t.data.find(v => v.dc === dc).val = e.target.value
      updateLink(this.t)
    },

    rollTable: function() {
      const roll = rollxds(this.t.amount, this.t.sides)
      this.result = this.t.data.find(({dc}) => dc === roll).val
    },
  }
})

function updateLink(t) {
  window.location.hash = '#'+compress(scrunch(this.t || t))
}

function parseDice(str, da, ds) {
  const v = str.split('d')
  v[0] = Math.abs(Number.parseInt(v[0])) || 1
  if (!(v[1] = Math.abs(Number.parseInt(v[1]))))
    return [da, ds]
  return [v[0], v[1]]
}

function rollxds(x, s) {
  let t = 0
  while (x--)
    t += Math.floor(Math.random() * s) + 1
  return t
}

function scrunch (t) {
  const out = {
    n: t.name,
    d: t.amount + 'd' + t.sides,
    t: t.data.map(({ dc, val }) => [dc, val])
  }
  return out
}

function unscrunch(t) {
  [amount, sides] = parseDice(t.d, 1, t.t.length)
  const out = {
    name: t.n,
    amount,
    sides,
    data: t.t.map(([dc, val]) => new Object({ dc, val }))
  }
  return out
}
