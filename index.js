'use strict'

const pify = require('pify')
const level = require('level')

const readFromFs = require('./lib/read-from-fs')
const importIntoDb = require('./lib/import')
const createReader = require('./reader')

const pLevel = pify(level)

const convert = async (srcDir, dbDir) => {
	const gtfsStreams = readFromFs(srcDir)
	const db = await pLevel(dbDir, {valueEncoding: 'json'})

	// todo: what if the data has already been imported?
	await importIntoDb(gtfsStreams, db)

	return createReader(db)
}

module.exports = convert
