const BaseClient = require('../base-client')

class ObjectStorageClient extends BaseClient {
	constructor(args) {
		super(args)

		const endpoint = args.endpoint || 'https://objectstorage.eu-frankfurt-1.oraclecloud.com'
		const apiVersion = args.apiVersion || ''
		this.baseUrl = `${endpoint}/${apiVersion}`
	}

	createPreauthenticatedRequest(namespaceName, bucketName, {name, objectName, accessType, timeExpires}) {
		const requestBodyDetail = {
			name,
			objectName,
			accessType,
			timeExpires
		}
		return this.requestJSON(`${this.baseUrl}/n/${namespaceName}/b/${bucketName}/p/`, 'POST', requestBodyDetail)
	}
}

module.exports = ObjectStorageClient
