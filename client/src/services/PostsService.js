import api from '@/services/api'

export default {
  fetchPageData (id) {
    return api().get(`page=${id}`)
  }
}
