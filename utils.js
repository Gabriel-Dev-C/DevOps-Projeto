const API = 'http://localhost:3000/api' // ou URL da sua API

function setToken(token) {
  localStorage.setItem('labs_token', token)
}

function getToken() {
  return localStorage.getItem('labs_token')
}

function authHeaders() {
  const t = getToken()
  return t ? { Authorization: 'Bearer ' + t } : {}
}

async function api(path, opts = {}) {
  const headers = opts.headers || {}
  opts.headers = { 'Content-Type': 'application/json', ...headers, ...authHeaders() }

  const res = await fetch(API + path, opts)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}
