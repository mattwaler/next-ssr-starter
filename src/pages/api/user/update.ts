import api from 'lib/api'
import update from 'lib/user/api/update'

export default api({
  guarded: true,
  methods: {
    PATCH: update,
  }
})
