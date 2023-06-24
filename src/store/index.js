import {createStore} from "vuex";

import user from './user.module.js'
import contest from './contest.module.js'
import category from './category.module.js'

const store = createStore({
    modules: {
        user,
        contest,
        category
    }
});


export default store
