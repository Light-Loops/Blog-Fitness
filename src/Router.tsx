import React from 'react';  
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages';
import { RouterLayout } from './common/RouterLayout';
import { ArticleDetail } from './pages/ArticleDetails';



export const AppRouter: React.FC = () => {
    return(
        <Routes>
            <Route path='/' element={<RouterLayout/>}>
                <Route path='/' element={<HomePage title={"Inicio"}/>}/>
                <Route path= '/article/:id' element={<ArticleDetail/>}/> 
                <Route path='/nutricion' element={<HomePage title={"Nutrición"}/>}/>
                <Route path='/entrenamiento' element={<HomePage title={"Entrenamiento"}/>}/>
                <Route path='/estilo-de-vida' element={<HomePage title={"Estilo de vida"}/>}/>
                <Route path="/*" element={<Navigate to={"/"} />} />
            </Route>  
        </Routes>
    )
}