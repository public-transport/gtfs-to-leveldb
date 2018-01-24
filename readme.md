# gtfs-to-leveldb

[![Greenkeeper badge](https://badges.greenkeeper.io/public-transport/gtfs-to-leveldb.svg)](https://greenkeeper.io/)

**Import [GTFS](https://developers.google.com/transit/gtfs/) data into a [LevelDB](http://leveldb.org).**

Currently, the following GTFS files are supported:

- `agency.txt` **required**
- `stops.txt` **required**
- `routes.txt` **required**
- `trips.txt` **required**
- `stop_times.txt` **required**
- `calendar.txt` *optional*, **required** if `calendar_dates.txt` is not provided
- `calendar_dates.txt` *optional*, **required** if `calendar.txt` is not provided

[![npm version](https://img.shields.io/npm/v/gtfs-to-leveldb.svg)](https://www.npmjs.com/package/gtfs-to-leveldb)
[![license](https://img.shields.io/github/license/public-transport/gtfs-to-leveldb.svg?style=flat)](LICENSE)
[![chat on gitter](https://badges.gitter.im/public-transport/Lobby.svg)](https://gitter.im/public-transport/Lobby)

## Installation

```shell
npm install gtfs-to-leveldb
```


## Usage

### From the command line

```shell
gtfs-to-leveldb <gtfs-directory> <path-to-leveldb>

Arguments:
	gtfs-directory   Input directory containing GTFS textfiles.
	path-to-leveldb  Path of the LevelDB that will be created/written to.

Options:
	--help       -h  Show this help message.
	--version    -v  Show the version number.
```

### From JavaScript

```js
const pify = require('pify')
const level = require('level')
const convert = require('gtfs-to-leveldb')

const pLevel = pify(level)

pLevel('my-db.ldb', {valueEncoding: 'json'})
.then((db) => {
	convert('path-to-gtfs-dir', db)
})
.then((reader) => {
    return reader.route('123') // read route with ID `123`
})
.then(console.log)
.catch(console.error)
```


## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/public-transport/gtfs-to-leveldb/issues).
