// Router
import { Routes, Route, useLocation } from 'react-router-dom'
// Styles
import './App.css'
// Helpers
import PATHROUTES from './helpers/PathRoutes.helper'
// Views
import Landing from './views/landing/Landing.view'
import Home from './views/home/Home.view'
import Detail from './views/detail/Detail.view'
import Form from './views/form/Form.view'
import Error from './views/Error/Error.view'
import SingUp from './views/singUp/SingUp.view'
import FormAddorRemove from './views/form/FormAddorRemove.view'
import FormRemoveActivity from './views/form/Form.removeActivity.view'
import ActivitiesViews from './views/form/Activities.view'
import UpdateActivities from './views/form/updateActivities.view'
// Component
import NavBar from './components/NavBar/NavBar'



function App() {
  const { pathname } = useLocation();
  const noNavBar = pathname === PATHROUTES.LANDING || pathname === PATHROUTES.SINGUP || pathname === PATHROUTES.ERROR; 




  return (
    <div className='App'>
      {!noNavBar && <NavBar />}
      <Routes>
        <Route path={PATHROUTES.LANDING} element={<Landing />} />
        <Route path={PATHROUTES.SINGUP} element={<SingUp />}  />
        <Route path={PATHROUTES.HOME} element={<Home />} />
        <Route path={PATHROUTES.DETAIL} element={<Detail />} />
        <Route path={PATHROUTES.FORM} element={<Form />} />
        <Route path={PATHROUTES.FORMADDORREMOVE} element={<FormAddorRemove />} />
        <Route path={PATHROUTES.FORMREMOVEACTIVITY} element={<FormRemoveActivity />} />
        <Route path={PATHROUTES.ACTIVITIES} element={<ActivitiesViews />} />
        <Route path={PATHROUTES.UPDATEACTIVITIES} element={<UpdateActivities />}/>
        <Route path={PATHROUTES.ERROR} element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
