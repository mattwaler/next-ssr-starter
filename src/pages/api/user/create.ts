import api from 'lib/api'
import createUser from 'lib/user/api/create'

export default api({
  guarded: false,
  methods: {
    POST: createUser,
  }
})
