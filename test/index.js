'use strict'

const pTape = require('tape-promise').default
const tape = require('tape')
const path = require('path')
const levelup = require('levelup')
const memdown = require('memdown')
const encode = require('encoding-down')
const isStream = require('is-stream')

const convert = require('..')

const test = pTape(tape)

const sampleDir = path.join(__dirname, 'sample-feed')

const createDb = () => {
	return levelup(encode(memdown(''), {valueEncoding: 'json'}))
}

const beattyAirport = 'BEATTY_AIRPORT'
const city1Trip = 'CITY1'

test('sample feed: stops', async (t) => {
	const db = createDb()
	const reader = await convert(sampleDir, db)

	const airport = await reader.stop(beattyAirport)
	t.ok('object' === typeof airport && !Array.isArray(airport))
	t.equal(airport.stop_id, beattyAirport)
	t.equal(typeof airport.stop_name, 'string')
	t.equal(typeof airport.stop_desc, 'string')
	t.notOk(Number.isNaN(parseFloat(airport.stop_lat)))
	t.notOk(Number.isNaN(parseFloat(airport.stop_lon)))

	// todo
	t.end()
})

test('sample feed: stop_times', async (t) => {
	const db = createDb()
	const reader = await convert(sampleDir, db)

	const stopTimes = reader.tripStopTimes(city1Trip)
	t.ok(isStream.readable(stopTimes))

	stopTimes.on('data', (stopTime) => {
		t.ok('object' === typeof stopTime && !Array.isArray(stopTime))
		t.equal(stopTime.trip_id, city1Trip)
		t.equal(typeof stopTime.stop_id, 'string')
		t.notOk(Number.isNaN(parseInt(stopTime.stop_sequence)))
		t.equal(typeof stopTime.arrival_time, 'string')
		t.equal(typeof stopTime.departure_time, 'string')
	})

	t.on('error', t.ifError)
	t.once('end', () => t.end())
})
