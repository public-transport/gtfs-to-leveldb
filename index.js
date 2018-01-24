'use strict'

const readFromFs = require('./lib/read-from-fs')
const importIntoDb = require('./lib/import')
const createReader = require('./reader')

const convert = (srcDir, db) => {
	const gtfsStreams = readFromFs(srcDir)

	// todo: what if the data has already been imported?
	return importIntoDb(gtfsStreams, db)

	.then(() => createReader(db))
}

module.exports = convert
