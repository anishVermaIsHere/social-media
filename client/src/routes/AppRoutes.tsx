import { Suspense } from 'react';
import {Routes, Route} from 'react-router-dom';
import { ROUTES } from './routeslinks';
import Spinner from '@/shared/widgets/Spinner';
import { Homepage, Registerpage, Loginpage,Protected, Feed, Layout, Profile, Create } from '@/routes/LazyComponents';



const AppRoutes= () => {
  const {LOGIN,REGISTER,FEEDS,PROFILE,CREATE_POST}=ROUTES;
  const user=localStorage.getItem('user-info');

  return (
    <Routes>
        <Route index path="/" element={<Suspense fallback={<Spinner />}><Homepage /></Suspense>} />
        <Route path='/user'>
          <Route index element='' />
          <Route path={LOGIN} element={<Suspense fallback={<Spinner />}><Loginpage /></Suspense>} />
          <Route path={REGISTER} element={<Suspense fallback={<Spinner />}><Registerpage /></Suspense>} />
        </Route>
       
        <Route element={<Protected user={user} />}>
          <Route path='/user' element={<Suspense fallback={<Spinner />}><Layout /></Suspense>}>
            <Route path={FEEDS} element={<Suspense fallback={<Spinner />}><Feed /></Suspense>} />
            <Route path={CREATE_POST} element={<Suspense fallback={<Spinner />}><Create /></Suspense>} />
            <Route path={PROFILE} element={<Suspense fallback={<Spinner />}><Profile /></Suspense>} />
          </Route>
        </Route>
        {/* <Route path="/chat" element={<ChatSection />} />
        <Route path="*" element={<Error />}/> */}
    </Routes>
  )
}

export default AppRoutes;