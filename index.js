const path = require('path')
const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))

const { scheduele } = require('./lib/schedueler')
const { writeCSV } = require('./lib/csv_formatting')

fs.readFileAsync(path.resolve(__dirname, '.', 'dev', 'input.json'), 'utf8').then(fileContent => {
	const input = JSON.parse(fileContent)
	const output = scheduele(input)
	writeCSV(output, path.resolve(__dirname, '.', 'dev', 'output.csv'))
})
