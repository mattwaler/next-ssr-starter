import api from 'lib/api'
import deleteUser from 'lib/user/api/delete'

export default api({
  guarded: true,
  methods: {
    DELETE: deleteUser,
  }
})
