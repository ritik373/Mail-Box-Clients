import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import store from './store/authRedux'
import { Provider } from 'react-redux';




ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
 <Provider store={store}>
    <BrowserRouter>

      <App />

    </BrowserRouter>
    </Provider>
  </div>,
)
