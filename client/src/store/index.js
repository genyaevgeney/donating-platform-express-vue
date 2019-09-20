import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store(
    {
        state: {
            pageData: null,
            paginationIterator: null,
        },
        mutations: {
            getData (state, data) {
                state.pageData= data;
            },
            getPaginationIterator(state, data) {
                state.paginationIterator=data;
            },
            deleteWord (state, word) {
                state.words = state.words.filter(obj => obj.headword !== word)
            }
        }
    }
)