'use strict'

const pify = require('pify')
const pump = require('pump')
const map = require('through2-map').obj
const settle = require('p-settle')

const levelWriteStream = require('./level-write-stream')
const dataToDb = require('./data-to-db')

const pPump = pify(pump)

const importIntoDB = (readFile, db) => {
	const convert = (input, mapping) => {
		return pPump(
			input,
			// convert to LevelDB op
			map(data => ({key: mapping(data), value: data})),
			levelWriteStream(db) // store
		)
	}

	const calendar = readFile('calendar')
	const pCalendar = convert(calendar, dataToDb.calendar)
	const calendarDates = readFile('calendar_dates')
	const pCalendarDates = convert(calendarDates, dataToDb.calendar_dates)

	const shapes = readFile('shapes')
	const pShapes = convert(shapes, dataToDb.shapes)

	return settle([pCalendar, pCalendarDates, pShapes])
	.then(([calendarResult, calendarDatesResult, shapesResult]) => {
		if (calendarResult.isRejected && calendarDatesResult.isRejected) {
			throw new Error('failed to import `calendar` and `calendar_dates`. at least one must work.')
		}
	})
	.then(() => {
		return Promise.all([
			convert(readFile('agency'), dataToDb.agency),
			convert(readFile('stops'), dataToDb.stops),
			convert(readFile('routes'), dataToDb.routes),
			convert(readFile('trips'), dataToDb.trips),
			convert(readFile('stop_times'), dataToDb.stop_times)
		])
	})
}

module.exports = importIntoDB
