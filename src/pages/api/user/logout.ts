import api from 'lib/api'
import logout from 'lib/user/api/logout'

export default api({
  guarded: true,
  methods: {
    GET: logout,
  }
})
