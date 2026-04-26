import React from 'react';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import { Routes, Route } from 'react-router-dom';
import FeaturesPage from './FeaturesPage';

const AllRoutes = () => {
    const routes = [
        { path: "/", component: <Home /> },
        { path: "/login", component: <Login /> },
        { path: "/signup", component: <Signup /> },
        { path: "/features", component: <FeaturesPage /> }
    ]
    return (
        <Routes>
            { routes.map( ( { path, component } ) => <Route key={ path } path={ path } element={ component } /> ) }
        </Routes>
    )
}

export default AllRoutes;