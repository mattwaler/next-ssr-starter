import api from 'lib/api'
import loginUser from 'lib/user/api/login'

export default api({
  guarded: false,
  methods: {
    POST: loginUser,
  }
})
