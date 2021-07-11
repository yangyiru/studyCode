async function giveTicket(ticket) {
  return wx.cloud.callFunction({
    name: 'give',
    data: {
      action: 'giveTicket',
      ticket: ticket
    }
  })
}

async function queryMyGive() {
  return wx.cloud.callFunction({
    name: 'give',
    data: {
      action: 'queryMyGive'
    }
  })
}

async function removeGive(id) {
  return wx.cloud.callFunction({
    name: 'give',
    data: {
      action: 'removeGive',
      id: id
    }
  })
}



module.exports = {
  queryMyGive: queryMyGive,
  giveTicket: giveTicket,
  removeGive: removeGive
}