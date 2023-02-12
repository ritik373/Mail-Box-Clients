import {configureStore} from '@reduxjs/toolkit'
import authRedux from './authRedux'
import UserRedux from './UserRedux'


const store=configureStore({
    reducer:{auth:authRedux,user:UserRedux}
})

export default store