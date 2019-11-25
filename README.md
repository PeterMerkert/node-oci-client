
# Description

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
    keyFingerprint : "a2:f4:45:ca:98"
    privateKey : "file.pem", // name of the file
    endpoint: "https://streaming.eu-frankfurt-1.oci.oraclecloud.com",
    apiVersion: "20180418"
}) 
```

All functions return promises so you can chain them or just `await` them.

### Users

Using the `streamingClient` you can create / get or delete stream:

```javascript
// Get stream
stream = await streamingClient.getStream(streamId)

// Delete a stream
result =
  await streamingClient.deleteStream(streamId)
```