'use strict'

const dbToData = {
	agency: agencyId => 'agency-' + (agencyId || ''),
	stops: stopId => 'stop-' + (stopId || ''),
	routes: routeId => 'route-' + (routeId || ''),
	trips: (routeId, tripId) => {
		return 'trip-'
		+ (routeId ? routeId + '-' : '')
		+ (tripId ? tripId : '')
	},
	stop_times: (stopTimeId, tripId) => {
		return 'stop_time-'
		+ (tripId ? tripId : '')
		+ (stopTimeId ? stopTimeId + '-' : '')
	},
	calendar: serviceId => 'service-' + (serviceId || ''),
	calendar_dates: (excId, serviceId) => {
		return 'calendar_date-'
		+ (serviceId ? serviceId : '')
		+ (excId ? excId + '-' : '')
	},
	shapes: shapeId => 'shape-' + (shapeId || '') + (shapeId ? '-' : '')
}

module.exports = dbToData
