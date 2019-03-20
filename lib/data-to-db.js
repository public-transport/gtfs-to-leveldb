'use strict'

const randomId = require('unique-string')

const dataToDb = {
	agency: a => 'agency-' + a.agency_id,
	stops: s => 'stop-' + s.stop_id,
	routes: r => 'route-' + r.route_id,
	trips: t => 'trip-' + t.route_id + '-' + t.trip_id,
	stop_times: st => 'stop_time-' + st.trip_id + '-' + st.stop_sequence,
	calendar: s => 'service-' + s.service_id,
	calendar_dates: e => 'calendar_date-' + e.service_id + '-' + randomId(),
	shapes: r => 'shape-' + r.shape_id,
}

module.exports = dataToDb
