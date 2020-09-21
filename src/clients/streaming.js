const BaseClient = require('../base-client')

class StreamingClient extends BaseClient {
  constructor(args) {
    super(args)

    const endpoint = args.endpoint || 'https://streaming.eu-frankfurt-1.oci.oraclecloud.com'
    const apiVersion = args.apiVersion || '20180418'
    this.baseUrl = `${endpoint}/${apiVersion}`
  }

  createStream(
    name,
    partitions,
    compartmentId,
    {retentionInHours = undefined, freeformTags = undefined, definedTags = undefined}
  ) {
    const streamDetail = {
      name,
      partitions,
      compartmentId,
      retentionInHours,
      freeformTags,
      definedTags,
    }

    if (retentionInHours === undefined) delete streamDetail.retentionInHours

    if (freeformTags === undefined) delete streamDetail.freeformTags

    if (definedTags === undefined) delete streamDetail.definedTags

    return this.requestJSON(`${this.baseUrl}/streams`, 'POST', streamDetail)
  }

  deleteStream(streamId) {
    return this.requestJSON(`${this.baseUrl}/streams/${streamId}`, 'DELETE', '')
  }

  getStream(streamId) {
    return this.requestJSON(`${this.baseUrl}/streams/${streamId}`, 'GET', '')
  }

  updateStream(streamId, freeformTags = undefined, definedTags = undefined) {
    return this.requestJSON(`${this.baseUrl}/streams/${streamId}`, {freeformTags, definedTags})
  }

  createCursor(streamId, {partition = 0, type = 'TRIM_HORIZON', offset = undefined, time = undefined}) {
    const cursorDetail = {
      partition,
      type,
      offset,
      time,
    }

    if (offset === undefined) delete cursorDetail.offset

    if (time === undefined) delete cursorDetail.time

    return this.requestJSON(`${this.baseUrl}/streams/${streamId}/cursor`, 'POST', cursorDetail)
  }

  createGroupCursor(
    streamId,
    groupName,
    {instanceName = undefined, type = 'TRIM_HORIZON', time = undefined, timeoutInMs = undefined, commitOnGet = true}
  ) {
    const groupCursorDetail = {
      groupName,
      instanceName,
      type,
      time,
      timeoutInMs,
      commitOnGet,
    }
    if (instanceName === undefined) delete groupCursorDetail.instanceName

    if (time === undefined) delete groupCursorDetail.time

    if (timeoutInMs === undefined) delete groupCursorDetail.timeoutInMs

    return this.requestJSON(`${this.baseUrl}/streams/${streamId}/groupCursors`, 'POST', groupCursorDetail)
  }

  getMessages(streamId, cursor, limit) {
    return this.requestJSON(`${this.baseUrl}/streams/${streamId}?cursor=${cursor}&limit=${limit}`, 'GET', ``)
  }

  putMessages(streamId, messages = []) {
    if (messages.length === 0) {
      throw new Error('Messages must contain at least one {key, value} pair.')
    }

    return this.requestJSON(`${this.baseUrl}/streams/${streamId}/messages`, 'POST', {
      messages,
    })
  }

  getGroup(streamId, groupName) {
    return this.requestJSON(`${this.baseUrl}/streams/${streamId}/groups/${groupName}`, 'GET', '')
  }

  updateGroup(streamId, groupName, {type = undefined, time = undefined}) {
    return this.requestJSON(`${this.baseUrl}/streams/${streamId}/groups/${groupName}`, 'PUT', {type, time})
  }

  consumerCommit(streamId, cursor) {
    return this.requestJSON(`${this.baseUrl}/streams/${streamId}/commit?cursor=${cursor}`, 'POST', '')
  }

  consumerHeartbeat(streamId, cursor) {
    return this.requestJSON(`${this.baseUrl}/streams/${streamId}/heartbeat?cursor=${cursor}`, 'POST', '')
  }
}

module.exports = StreamingClient
