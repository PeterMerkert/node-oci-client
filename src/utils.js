const crypto = require('crypto')

module.exports.prepareHeaders = (auth, url, method = 'GET', body = '') => {
	const signAlgorithm = 'RSA-SHA256'
	const sigVersion = '1'
	const keyId = `${auth.tenancyId}/${auth.userId}/${auth.keyFingerprint}`
	const now = new Date().toUTCString()
	const tobeSignedUrl = new URL(url)
	const {host} = tobeSignedUrl
	const target = `${tobeSignedUrl.pathname}${tobeSignedUrl.search}`

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
