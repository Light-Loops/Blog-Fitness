import React from 'react';  
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages';
import { RouterLayout } from './common/RouterLayout';
import { LoginPage } from './pages/Login';
import { ArticleDetail } from './pages/ArticleDetails';
export const AppRouter: React.FC = () => {
    return(
        <Routes>
            <Route path='/' element={<RouterLayout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path= '/article/:id' element={<ArticleDetail/>}/> 
            </Route>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}