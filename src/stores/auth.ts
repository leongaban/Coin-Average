import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {
  const name = 'authStore'
  const token = ref<string>(localStorage.getItem('token') || '')

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearToken = () => {
    token.value = ''
    localStorage.removeItem('token')
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('https://your-api-url.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        setToken(data.token)
      } else {
        throw new Error(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    clearToken()
  }

  return {
    name,
    token,
    isAuthenticated,
    setToken,
    clearToken,
    login,
    logout,
  }
})
