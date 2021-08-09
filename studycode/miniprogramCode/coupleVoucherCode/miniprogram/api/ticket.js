async function addTicket(ticket){
  return wx.cloud.callFunction({
    name:'ticket',
    data:{
      action:'addTicket',
      ticket:ticket
    }
  })
}
async function queryMyTicket(){
  return wx.cloud.callFunction({
    name:'ticket',
    data:{
      action:'queryMyTicket',
    }
  })
}
async function queryCurrentTicket(ticketId){
  return wx.cloud.callFunction({
    name:'ticket',
    data:{
      action:'queryCurrentTicket',
      ticketId:ticketId
    }
  })
}
async function removeTicket(ticketId){
  return wx.cloud.callFunction({
    name:'ticket',
    data:{
      action:'removeTicket',
      ticketId:ticketId
    }
  })
}
module.exports = {
  addTicket:addTicket,
  queryMyTicket:queryMyTicket,
  queryCurrentTicket:queryCurrentTicket,
  removeTicket:removeTicket
}