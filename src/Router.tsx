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
                <Route path= '/article/:title' element={<ArticleDetail/>}/> 
                <Route path='/Nutrición' element={<HomePage title={"Nutrición"}/>}/>
                <Route path='/Entrenamiento' element={<HomePage title={"Entrenamiento"}/>}/>
                <Route path='/Estilo-de-vida' element={<HomePage title={"Estilo de vida"}/>}/>
                <Route path="/*" element={<Navigate to={"/"} />} />
            </Route>  
        </Routes>
    )
}