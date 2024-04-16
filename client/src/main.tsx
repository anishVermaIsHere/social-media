import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ThemeDataProvider from './context/ThemeContext.tsx'
import { Provider } from 'react-redux'
import store from './redux/store/store.ts'
import { interceptor } from './shared/services/interceptor.ts'


// token interceptor invoked
interceptor();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeDataProvider>
  <Provider store={store}>
    <App />
  </Provider>
</ThemeDataProvider>,
)
