export default {
    namespaced: true,
    state: {
        id: +localStorage.getItem('userId') || null,
    },
    mutations: {
        setId: (state, payload) => {
            state.id = payload.id
        }
    },
    getters: {
        getUser: (state) => state
    }
}