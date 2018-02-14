'use strict'

const toPromise = require('get-stream')

const dbToData = require('./lib/db-to-data')

const lastPossible = '\xff'

const single = (db, computeKey) => {
	return (...args) => db.get(computeKey(...args))
}

const range = (db, computeKey) => {
	return (secondaryId = null) => {
		const key = computeKey(secondaryId)
		return db.createValueStream({gte: key, lte: key + lastPossible})
	}
}

const pRange = (db, computeKey) => {
	const query = range(db, computeKey)
	return (secondaryId = null) => toPromise.array(query(secondaryId))
}

const createReader = (db) => ({
	agency: single(db, dbToData.agency),
	agencies: pRange(db, dbToData.agency),
	agenciesStream: range(db, dbToData.agency),

	stop: single(db, dbToData.stops),
	stops: pRange(db, dbToData.stops),
	stopsStream: range(db, dbToData.stops),

	route: single(db, dbToData.routes),
	routes: pRange(db, dbToData.routes),
	routesStream: range(db, dbToData.routes),

	routeTrips: pRange(db, dbToData.trips),
	trips: pRange(db, dbToData.trips),
	tripsStream: range(db, dbToData.trips),

	tripStopover: single(db, dbToData.stop_times),
	tripStopovers: pRange(db, dbToData.stop_times),
	tripStopoversStream: range(db, dbToData.stop_times),

	// todo: rename these two
	service: single(db, dbToData.calendar),
	services: pRange(db, dbToData.calendar),
	servicesStream: range(db, dbToData.calendar),

	serviceException: single(db, dbToData.calendar_dates),
	serviceExceptions: pRange(db, dbToData.calendar_dates),
	serviceExceptionsStream: range(db, dbToData.calendar_dates)
})

module.exports = createReader
