
const hash = window.location.hash.substring(1)
const input_el = document.getElementById('diceinput')
const table_el = document.getElementById('dicetable')
const btn_el = document.getElementById('roll-btn')

let amount, sides = 1



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
