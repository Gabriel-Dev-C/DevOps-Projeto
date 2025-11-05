// script.js — base de autenticação e configuração geral

const API_BASE = 'http://localhost:3000/api'

// --- LOGIN ---
const loginForm = document.getElementById('loginForm')
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const msg = document.getElementById('message')

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) throw new Error('Falha no login')

      const data = await res.json()
      localStorage.setItem('token', data.token)
      msg.style.color = 'green'
      msg.textContent = 'Login bem-sucedido!'
      setTimeout(() => (window.location.href = 'home.html'), 1000)
    } catch (err) {
      msg.style.color = 'red'
      msg.textContent = 'Erro ao fazer login. Verifique e tente novamente.'
    }
  })
}

// --- REGISTRO ---
const registerForm = document.getElementById('registerForm')
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const msg = document.getElementById('message')

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      if (!res.ok) throw new Error('Falha no cadastro')

      msg.style.color = 'green'
      msg.textContent = 'Usuário cadastrado com sucesso!'
      setTimeout(() => (window.location.href = 'index.html'), 1000)
    } catch (err) {
      msg.style.color = 'red'
      msg.textContent = 'Erro ao cadastrar. Tente novamente.'
    }
  })
}
