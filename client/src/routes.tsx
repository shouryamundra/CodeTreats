import HomePage from 'pages/HomePage';
import SnippetPage from 'pages/SnippetsPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

export const useRoutes = () => {
    return (
        <>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/snippets' component={SnippetPage} />
            </Switch>
        </>
    );
};
