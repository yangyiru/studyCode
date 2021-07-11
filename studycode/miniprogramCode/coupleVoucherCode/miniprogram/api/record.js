async function removeRecordById(id) {
  return wx.cloud.callFunction({
    name: 'record',
    data: {
      action: 'removeRecordById',
      id: id
    }
  })
}

async function queryCurrentUserRecord() {
  return wx.cloud.callFunction({
    name: 'record',
    data: {
      action: 'queryCurrentUserRecord'
    }
  })
}

async function queryCurrentTicketRecord(ticketId) {
  return wx.cloud.callFunction({
    name: 'record',
    data: {
      action: 'queryCurrentTicketRecord',
      ticketId:ticketId
    }
  })
}

async function addRecord(record) {
  return wx.cloud.callFunction({
    name: 'record',
    data: {
      action: 'addRecord',
      record:record
    }
  })
}

async function queryCurrentRecord() {
  return wx.cloud.callFunction({
    name: 'record',
    data: {
      action: 'queryCurrentRecord',
    }
  })
}

module.exports = {
  removeRecordById: removeRecordById,
  queryCurrentUserRecord: queryCurrentUserRecord,
  queryCurrentTicketRecord:queryCurrentTicketRecord,
  addRecord:addRecord,
  queryCurrentRecord:queryCurrentRecord
}