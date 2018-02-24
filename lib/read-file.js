'use strict'

const readCsv = require('gtfs-utils/read-csv')
const path = require('path')

const createReadFile = (dir) => {
	const readFile = file => readCsv(path.join(dir, file + '.txt'))
	return readFile
}

module.exports = createReadFile
