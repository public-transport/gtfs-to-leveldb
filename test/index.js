'use strict'

const pTape = require('tape-promise').default
const tape = require('tape')
const levelup = require('levelup')
const memdown = require('memdown')
const encode = require('encoding-down')

const convert = require('..')

const test = pTape(tape)

const createDb = () => {
	return levelup(encode(memdown(''), {valueEncoding: 'json'}))
}

test('todo', async (t) => {
	const db = createDb()
	// todo
	t.end()
})
