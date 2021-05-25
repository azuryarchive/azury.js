// ---------------- DEPENDENCIES ---------------- //

const fetch = require('node-fetch')
const config = require('azury.json')

// ---------------- CONFIGURATION ---------------- //

const token = config.token
const notifications = config.notifications ?? true
const errors = config.errors ?? true
const base = 'https://azury.gg/api/'
const version = '1.0.0'

// ---------------- COMMON FUNCTIONS ---------------- //

function notify(msg) {
  if (notifications == false) return
  console.log(msg)
}

function error(msg) {
  if (errors == false) return
  console.log(msg)
}

function deleteRequest(url, callback) {
  if (token == null || token == 'undefined' || token == '') return error('Unable To Find Token')
  fetch(`${base}${url}?token=${token}`, { method: 'DELETE' })
  .then((response) => {
    if (response.status == 200) {
      response.json().then((data) => { callback(data) })
    } else {
      response.json().then((data) => { error(data) })
    }
  })
}

function getRequest(url, callback) {
  if (token == null || token == 'undefined' || token == '') return error('Unable To Find Token')
  fetch(`${base}${url}?token=${token}`, { method: 'GET' })
  .then((response) => {
    if (response.status == 200) {
      response.json().then((data) => { callback(data) })
    } else {
      response.json().then((data) => { error(data) })
    }
  })
}

function putRequest(url, callback) {
  if (token == null || token == 'undefined' || token == '') return error('Unable To Find Token')
  fetch(`${base}${url}?token=${token}`, { method: 'PUT' })
  .then((response) => {
    if (response.status == 200) {
      response.json().then((data) => { callback(data) })
    } else {
      response.json().then((data) => { error(data) })
    }
  })
}

function postRequest(url, param, value, callback) {
  if (token == null || token == 'undefined' || token == '') return error('Unable To Find Token')
  const formData = new FormData()
  formData.append(param, value)

  fetch(`${base}${url}?token=${token}`, { method: 'POST', body: formData })
  .then((response) => {
    if (response.status == 200) {
      response.json().then((data) => { callback(data) })
    } else {
      response.json().then((data) => { error(data) })
    }
  })
}

// ---------------- CHECK LIBRARY VERSION ---------------- //

getRequest('service/library/version', (res) => {
  if (res.v != version) return notify(`Please upgrade to v${res.v}!`)
})

// ---------------- ACCOUNTLESS ---------------- //

const accountless = {
  upload(file, callback) {
    postRequest('accountless/files/new', 'upload', file, (res) => {
      if (callback) callback(res)
    })
  },

  details(file, callback) {
    getRequest(`accountless/files/${file}/details`, (res) => {
      if (callback) callback(res)
    })
  }
}

// ---------------- SERVICE ---------------- //

const service = {
  statistics(callback) {
    getRequest('service/statistics', (res) => {
      if (callback) callback(res)
    })
  }
}

// ---------------- TEAM ---------------- //

const team = {
  create(name, callback) {
    postRequest('teams/new', 'name', name, (res) => {
      if (callback) callback(res)
    })
  },

  about(id, callback) {
    getRequest(`teams/${id}`, (res) => {
      if (callback) callback(res)
    })
  },

  files(id, callback) {
    getRequest(`teams/${id}/files`, (res) => {
      if (callback) callback(res)
    })
  },

  members(id, callback) {
    getRequest(`teams/${id}/members`, (res) => {
      if (callback) callback(res)
    })
  },

  update(id, name, callback) {
    postRequest(`teams/${id}/rename`, 'name', name, (res) => {
      if (callback) callback(res)
    })
  },

  transfer(id, owner, callback) {
    putRequest(`teams/${id}/transfer/${owner}`, (res) => {
      if (callback) callback(res)
    })
  },

  leave(id, callback) {
    putRequest(`teams/${id}/leave`, (res) => {
      if (callback) callback(res)
    })
  },

  add(id, member, callback) {
    putRequest(`teams/${id}/members/add/${member}`, (res) => {
      if (callback) callback(res)
    })
  },

  remove(id, member, callback) {
    putRequest(`teams/${id}/members/remove/${member}`, (res) => {
      if (callback) callback(res)
    })
  },

  close(id, callback) {
    deleteRequest(`teams/${id}/delete`, (res) => {
      if (callback) callback(res)
    })
  },

  upload(id, file, callback) {
    postRequest(`teams/${id}/files/new`, 'upload', file, (res) => {
      if (callback) callback(res)
    })
  },

  short(id, callback) {
    getRequest(`teams/files/${id}/short`, (res) => {
      if (callback) callback(res)
    })
  },

  clone(id, callback) {
    putRequest(`teams/files/${id}/clone`, (res) => {
      if (callback) callback(res)
    })
  },

  details(id, callback) {
    getRequest(`teams/files/${id}/details`, (res) => {
      if (callback) callback(res)
    })
  },

  rename(id, name, callback) {
    postRequest(`teams/files/${id}/rename`, 'name', name, (res) => {
      if (callback) callback(res)
    })
  },

  delete(id, callback) {
    deleteRequest(`teams/files/${id}/delete`, (res) => {
      if (callback) callback(res)
    })
  }
}

// ---------------- USER ---------------- //

const user = {
  files(callback) {
    getRequest(`users/teams`, (res) => {
      if (callback) callback(res)
    })
  },

  teams(callback) {
    getRequest(`users/files`, (res) => {
      if (callback) callback(res)
    })
  },

  data(callback) {
    getRequest(`users/data`, (res) => {
      if (callback) callback(res)
    })
  },

  destroy(callback) {
    deleteRequest(`users/delete`, (res) => {
      if (callback) callback(res)
    })
  },

  upload(file, callback) {
    postRequest(`users/files/new`, 'upload', file, (res) => {
      if (callback) callback(res)
    })
  },

  short(id, callback) {
    getRequest(`users/files/${id}/short`, (res) => {
      if (callback) callback(res)
    })
  },

  toggleFavorite(id, callback) {
    putRequest(`users/files/${id}/status/favorite/toggle`, (res) => {
      if (callback) callback(res)
    })
  },

  toggleArchive(id, callback) {
    putRequest(`users/files/${id}/status/archived/toggle`, (res) => {
      if (callback) callback(res)
    })
  },

  toggleTrash(id, callback) {
    putRequest(`users/files/${id}/status/trashed/toggle`, (res) => {
      if (callback) callback(res)
    })
  },

  clone(id, callback) {
    putRequest(`users/files/${id}/clone`, (res) => {
      if (callback) callback(res)
    })
  },

  details(id, callback) {
    getRequest(`users/files/${id}/details`, (res) => {
      if (callback) callback(res)
    })
  },

  rename(id, name, callback) {
    postRequest(`users/files/${id}/rename`, 'name', name, (res) => {
      if (callback) callback(res)
    })
  },

  delete(id, callback) {
    deleteRequest(`users/files/${id}/delete`, (res) => {
      if (callback) callback(res)
    })
  },
}

exports.accountless = accountless
exports.service = service
exports.team = team
exports.user = user