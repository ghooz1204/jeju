import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import OnlineExhibitionPage from './pages/OnlineExhibitionPage';

import DialogContainer from './container/assets/DialogContainer';
import LoadingContainer from './container/assets/LoadingContainer';

import Header from './components/header/Header';

import { Paths } from './paths';

import './static/stylesheets/App.css';
import './static/stylesheets/Header.css';

const App = () => {
    return (
        <>
            <Header /> 
            <Switch>
                <Route path={Paths.index} component={MainPage} exact />
                <Route path={Paths.exhibition + '/:mode?'} component={OnlineExhibitionPage}/>
                <Route component={ErrorPage} />
            </Switch>

            {/* ----- 신경 ㄴㄴ ----- */}
            <DialogContainer />
            <LoadingContainer />
        </>
    );
};

export default App;
