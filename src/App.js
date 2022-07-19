import Main from './client/pages/main';
import Result from './client/pages/result'
import Admin from './admin';

import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {Provider} from 'react-redux'
import configureStore from './store';
import Mentor from './admin/mentors'
import Lesson from './admin/lessons'
import Group  from './admin/groups';
const store = configureStore()
function App() {
  let location = useLocation();
  // let routes = useRoutes([
  //   {
  //     path: "/admin",
  //     element: <Admin />,
  //     children: [
  //       {
  //         path: "group",
  //         element: <Mentor/>,
  //       },
  //       { 
  //         path: "mentor",
  //         element: <Mentor/>,
  //       },
  //     ],
  //     },
  //     { path: "/", element: <Main /> },
  //     { path: "/group/:id", element: <Result  key={location.pathname} queryname="group_id"/> },
  //     { path: "/mentor/:id", element: <Result  key={location.pathname} queryname="mentor_id"/> },
  //     { path: "/room/:id", element: <Result  key={location.pathname} queryname="room_id"/> },
  // ])
  return (
    <Provider store={store}>
      <div className="page">
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/group/:id' element={<Result key={location.pathname} queryname="group_id"/>}/>
          <Route path='/mentor/:id' element={<Result key={location.pathname} queryname="mentor_id"/>}/>
          <Route path='/room/:id' element={<Result key={location.pathname} queryname="room_id"/>}/>
          <Route path='admin' element={<Admin/>}>
            <Route path='mentor' element={<Mentor/>}/>
            <Route path='group' element={<Group/>}/>
            <Route path='schedule' element={<Lesson/>}/>
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
