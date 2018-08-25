const path = require('path')
const fs = require('fs')
const Papa = require('papaparse')

const csvData = fs.readFileSync(path.join(__dirname, 'ntolmadakia.csv'), 'utf-8')

const addRow = (from, to) => {
  if (to === '-') {
    return `"${from}" [fixedsize=true,shape=diamond,fillcolor=aquamarine, style=filled]`
  } else {
    return `"${from}" -> "${to}";`
  }
}

const buildGraph = (array, current) => {
  const from = current['From']
  Object.keys(current).forEach(key => {
    if (key === 'From') { return }
    const to = current[key]
    if (to !== '') {
      array.push(addRow(from, to))
    }
  })
  return array
}

const parseResults = results => {
  const lines = results.data
  const graphArray = lines.reduce(buildGraph, [])
  console.log(`digraph {\n${graphArray.join('\n')}labelloc="t";\nlabel="Τα 88 Ντολμαδάκια";\n}`)
}

const csv = Papa.parse(csvData, {
  header: true,
  complete: parseResults
})

