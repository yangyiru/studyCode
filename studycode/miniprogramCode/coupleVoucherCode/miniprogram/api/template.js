async function queryPrivateTemplate() {
  return wx.cloud.callFunction({
    name: 'template',
    data: {
      action: 'queryPrivateTemplate'
    }
  })
}

async function queryPublicTemplate() {
  return wx.cloud.callFunction({
    name: 'template',
    data: {
      action: 'queryPublicTemplate'
    }
  })
}
async function removeTemplate(_id) {
  return wx.cloud.callFunction({
    name: 'template',
    data: {
      action: 'removeTemplate',
      _id: _id
    }
  })
}
async function addTemplate(template) {
  return wx.cloud.callFunction({
    name: 'template',
    data: {
      action: 'addTemplate',
      template: template
    }
  })
}
async function updateTemplate(_id, template) {
  return wx.cloud.callFunction({
    name: 'template',
    data: {
      action: 'updateTemplate',
      _id: _id,
      template: template,
    }
  })
}

module.exports = {
  queryPrivateTemplate: queryPrivateTemplate,
  queryPublicTemplate: queryPublicTemplate,
  removeTemplate: removeTemplate,
  addTemplate: addTemplate,
  updateTemplate: updateTemplate
}