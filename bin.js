#!/usr/bin/env node
'use strict'

const mri = require('mri')

const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: ['help', 'h', 'version', 'v']
})

if (argv.help === true || argv.h === true) {
	process.stdout.write(`
gtfs-to-leveldb <gtfs-directory> <path-to-leveldb>

Arguments:
	gtfs-directory   Input directory containing GTFS textfiles.
	path-to-leveldb  Path of the LevelDB that will be created/written to.

Options:
	--help       -h  Show this help message.
	--version    -v  Show the version number.

`)
	process.exit(0)
}

if (argv.version === true || argv.v === true) {
	process.stdout.write(`${pkg.version}\n`)
	process.exit(0)
}

const convert = require('.')

const srcDir = argv._[0]
const dbDir = argv._[1]

convert(srcDir, dbDir)
.catch((err) => {
	console.error(err)
	process.exitCode = 1
})
