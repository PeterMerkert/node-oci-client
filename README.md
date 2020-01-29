# Description
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fretracedgmbh%2Fnode-oci-client.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fretracedgmbh%2Fnode-oci-client?ref=badge_shield)


Node.js client for the [OCI API](https://docs.cloud.oracle.com/iaas/api) service.

## Installation

Add the dependency to your `package.json` with:

`npm install @retracedgmbh/node-oci-client --save`

## Usage

What's simpler than 2 lines of code?

```javascript
const { StreamingClient } = require("@retracedgmbh/node-oci-client")
const streamingClient = new StreamingClient({
    tenancyId : "xxx.aaa.bbb", // Tenancy OCID
    userId : "user.123.456", // user OCID
    keyFingerprint : "a2:f4:45:ca:98",
    privateKey : "content", // the text of the PEM key, NOT the name of the file
    endpoint: "https://streaming.eu-frankfurt-1.oci.oraclecloud.com",
    apiVersion: "20180418"
}) 
```

All functions return promises so you can chain them or just `await` them.

### StreamingClient

Using the `streamingClient` you can create / get or delete stream:

```javascript
// Get stream
stream = await streamingClient.getStream(streamId)

// Delete a stream
result =
  await streamingClient.deleteStream(streamId)
```

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fretracedgmbh%2Fnode-oci-client.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fretracedgmbh%2Fnode-oci-client?ref=badge_large)