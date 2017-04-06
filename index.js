'use strict'

const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')
const eccrypto = require('eccrypto')
const keythereum = require('keythereum')

module.exports = class ParityKeys {

	constructor(options) {
		this.keysDir = path.join(options.dataDir, 'keys', options.chainName)
		const keyFiles = fs.readdirSync(this.keysDir)
		const accNames = _.map(keyFiles, keyFile => {
			const fileName = path.join(this.keysDir, keyFile)
			const file = jsonfile.readFileSync(fileName)
			return `0x${file.address}`
		})
		this.files = _.zipObject(accNames, keyFiles)
	}

	get(account, password) {

		if (!this.files[account]) return null

		const keyPath = path.join(this.keysDir, this.files[account])
		const keyObject = jsonfile.readFileSync(keyPath)

		if (keyObject.crypto != null){
			keyObject.Crypto = keyObject.crypto
			delete keyObject.crypto
		}

	    const privateKey = keythereum.recover(password, keyObject)
	    const publicKey = eccrypto.getPublic(privateKey)

	    return {
	    	privateKey: privateKey.toString('hex'),
	    	publicKey: publicKey.toString('hex')
	    }
	}
}
