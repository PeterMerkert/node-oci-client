const BaseClient = require('../base-client')

class FunctionsClient extends BaseClient {
  constructor(args) {
    super(args)

    const endpoint = args.endpoint || 'https://functions.eu-frankfurt-1.oci.oraclecloud.com'
    const apiVersion = args.apiVersion || '20181201'
    this.baseUrl = `${endpoint}/${apiVersion}`
  }

  invokeFunction(functionId, {fnIntent = null, fnInvokeType = null}) {
    return this.requestJSON(`${this.baseUrl}/functions/${functionId}/invoke`, 'POST', '', {
      'fn-intent': fnIntent,
      'fn-invoke-type': fnInvokeType,
    })
  }
}

module.exports = FunctionsClient
