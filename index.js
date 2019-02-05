const path = require('path')
const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))

const { scheduele } = require('./lib/schedueler')

fs.readFileAsync(path.resolve(__dirname, '.', 'dev', 'input.json'), 'utf8').then(fileContent => {
	const input = JSON.parse(fileContent)
	const output = scheduele(input)
	fs.writeFileAsync(path.resolve(__dirname, '.', 'dev', 'output.json'), JSON.stringify(output), 'utf8').then(() => { })
})
