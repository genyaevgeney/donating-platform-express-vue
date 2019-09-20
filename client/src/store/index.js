import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store(
    {
        state: {
            pageData: null
        },
        mutations: {
            getData (state, data) {
                state.pageData= data;
            }
        }
    }
)
