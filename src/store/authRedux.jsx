import React from 'react';
import {createSlice} from '@reduxjs/toolkit'
import {configureStore} from '@reduxjs/toolkit'


const initialState={
    showCompose:false,
    showReadMsg:false,
    login:false,
    
}

const authSlice=createSlice({
    name:'authentication',
    initialState:initialState,
    reducers:{
        onOpenComposeHandler(state){
            state.showCompose=true;

        },
        onCloseComposeHandler(state){
            state.showCompose=false;

        },
        onOpenReadMsgHandler(state){
            state.showReadMsg=true;

        },
        onCloseReadMsgHandler(state){
            state.showReadMsg=false;

        },
        onLoginHander(state,action){
            state.login=true;
            localStorage.setItem('email',action.payload)
        },
        onLogoutHander(state,action){
            state.login=false;
            localStorage.removeItem('email')
        }
        

    }
})

const store=configureStore({
    reducer:{compose:authSlice.reducer}
})


export const authCompose=authSlice.actions;
export default store;