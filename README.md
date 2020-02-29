[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/xojs/xo)
[![codecov](https://codecov.io/gh/retracedgmbh/node-oci-client/branch/master/graph/badge.svg)](https://codecov.io/gh/retracedgmbh/node-oci-client)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fretracedgmbh%2Fnode-api-client.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fretracedgmbh%2Fnode-api-client?ref=badge_shield)

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
    keyFingerprint : "a2:f4:45:ca:98",
    privateKey : "content", // base64 of the PEM file content, NOT the name of the file
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
