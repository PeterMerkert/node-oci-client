const axios = require('axios')
const utils = require('./utils')

class BaseClient {
	constructor({
		tenancyId = 'ocid1.tenancy.oc1.aaa',
		userId = 'ocid1.user.oc1.',
		keyFingerprint = 'a1:b2:12:13:c3:df:',
		privateKey = 'file.pem'
	}) {
		this.tenancyId = tenancyId
		this.userId = userId
		this.keyFingerprint = keyFingerprint
		this.privateKey = Buffer.from(privateKey, 'base64')
	}

	async requestJSON(url, method, body, extraHeaders = undefined) {
		let requestHeaders = utils.prepareHeaders(
			{
				tenancyId: this.tenancyId,
				userId: this.userId,
				keyFingerprint: this.keyFingerprint,
				privateKey: this.privateKey
			},
			url,
			method,
			(body = '')
		)

		if (extraHeaders !== undefined) {
			requestHeaders = {...requestHeaders, ...extraHeaders}
		}

		const response = await axios({
			method,
			url: `${url}`,
			headers: requestHeaders,
			data: body
		})

		return response
	}
}

module.exports = BaseClient
