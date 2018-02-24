'use strict'

const createReadFile = require('./lib/read-file')
const importIntoDb = require('./lib/import')
const createReader = require('./reader')

const convert = (srcDir, db) => {
	const readFile = createReadFile(srcDir)

	// todo: what if the data has already been imported?
	return importIntoDb(readFile, db)

	.then(() => createReader(db))
}

module.exports = convert
