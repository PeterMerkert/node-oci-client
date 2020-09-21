const test = require('ava')
const {ObjectStorageClient} = require('../src')

const endpoint = 'https://objectstorage.eu-frankfurt-1.oraclecloud.com'
let objectStorageClient

test.before(t => {
  objectStorageClient = new ObjectStorageClient({
    tenancyId: process.env.ORACLE_OCI_TENANCY_OCID,
    userId: process.env.ORACLE_USER_OCID,
    keyFingerprint: process.env.ORACLE_USER_API_KEY_FINGERPRINT,
    privateKey: process.env.ORACLE_PRIVATE_KEY_FILE,
    endpoint,
  })
})

test('POST /createPreauthenticatedRequest', async t => {
  const namespaceName = process.env.ORACLE_OCI_NAMESPACE
  const bucketName = process.env.ORACLE_BUCKET_NAME_PUBLIC

  const response = await objectStorageClient.createPreauthenticatedRequest(namespaceName, bucketName, {
    name: 'testName',
    objectName: 'testName.jpg',
    accessType: 'ObjectReadWrite',
    timeExpires: '2021-10-02T15:00:00Z',
  })

  t.is(response.status, 200)
  t.truthy(response.data.accessUri)
})
