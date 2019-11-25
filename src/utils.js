const crypto = require('crypto')

module.exports.getHost = url => {
	// For e.g. https://eu-frankfurt-1.streaming.oci.oraclecloud/20180418/streams/
	const n1 = url.indexOf('//')
	const n2 = url.indexOf('/', n1 + 2)

	const start = n1 + 2
	const length = n2 - start

	// eslint-disable-next-line unicorn/prefer-string-slice
	const host = url.substr(start, length)

	return host
}

module.exports.getTarget = url => {
	// For e.g. https://eu-frankfurt-1.streaming.oci.oraclecloud/20180418/streams/messages?cursor=&limit
	const n1 = url.indexOf('//')
	const n2 = url.indexOf('/', n1 + 2)

	const start = n1 + 2
	const length = n2 - start

	// eslint-disable-next-line unicorn/prefer-string-slice
	const target = url.substr(start + length)

	return target
}

module.exports.prepareHeaders = (auth, url, method = 'GET', body = '') => {
	const signAlgorithm = 'RSA-SHA256'
	const sigVersion = '1'
	const keyId = `${auth.tenancyId}/${auth.userId}/${auth.keyFingerprint}`
	const now = new Date().toUTCString()
	const host = exports.getHost(url)
	const target = exports.getTarget(url)

	const headersObj = {}

	let headers = '(request-target) date host'
	const requestTarget = '(request-target): ' + method.toLowerCase() + ' ' + target
	const dateHeader = 'date: ' + now
	const hostHeader = 'host: ' + host

	let signingString = requestTarget + '\n' + dateHeader + '\n' + hostHeader

	const methodsThatRequireExtraHeaders = ['POST', 'PUT']

	if (methodsThatRequireExtraHeaders.includes(method.toUpperCase())) {
		body = JSON.stringify(body)

		const signatureSign = crypto.createHash('SHA256')
		const contentSha256 = signatureSign.update(body).digest('base64')
		const contentType = 'application/json'
		const contentLength = body.length

		headers += ' x-content-sha256 content-type content-length'
		const contentSha256Header = 'x-content-sha256: ' + contentSha256
		const contentTypeHeader = 'content-type: ' + contentType
		const contentLengthHeader = 'content-length: ' + contentLength

		signingString = signingString + '\n' + contentSha256Header + '\n' + contentTypeHeader + '\n' + contentLengthHeader

		headersObj['Content-Type'] = 'application/json'
		headersObj['Content-Length'] = contentLength
		headersObj['x-content-sha256'] = contentSha256
	}

	const signatureSign = crypto.createSign(signAlgorithm)
	const signedSignature = signatureSign.update(signingString).sign(auth.privateKey, 'base64')

	const authorization = `Signature version="${sigVersion}", keyId="${keyId}", algorithm="${signAlgorithm.toLowerCase()}", headers="${headers}", signature="${signedSignature}"`

	headersObj.date = now
	headersObj.Authorization = authorization

	return headersObj
}
