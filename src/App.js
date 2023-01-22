import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthenticationComponent from './components/authentication/authentication.component';

// import CategoryItem from './components/category-item/category-item.component'
// import DirectoryComponent from './components/directory/directory.component'
import HomeComponent from './routes/home/home.component';
import NavigationComponent from './routes/navigation/navigation.component';


const App = () => {

  return (
      <Routes>
        <Route path='/' element={<NavigationComponent />}>
          <Route path='home' index element={<HomeComponent />} />
          <Route path='auth' element={<AuthenticationComponent />} />
        </Route>
      </Routes>
    );
}

export default App;

// Note: 
  // <Route path='/' element={<HomeComponent />} /> :: 
  // In order to next the children components to render as a child route we 
  // need to not make the Route component as a self closing tab. We the element inside the
  // elements - props will be rendered as the parent route and other components will be 
  // rendered as a child route following the parent route 

  // ** If you put "index" as a param, it tells app render that component at the base level 