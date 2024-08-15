import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import FormEntregador from './views/entregador/FormEntregador';
import ListEntregador from './views/entregador/ListEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';
import ListCategoriaProduto from './views/categoriaproduto/ListCategoriaProduto';
import FormCategoriaProduto from './views/categoriaproduto/FormCategoriaProduto';
import FormLogin from './views/login/FormLogin';
import { ProtectedRoute } from './views/util/ProtectedRoute';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FormLogin />} />
                <Route path="list-produto" element={<ProtectedRoute><ListProduto /></ProtectedRoute>} />
                <Route path="list-entregador" element={<ProtectedRoute><ListEntregador /></ProtectedRoute>} />
                <Route path="list-cliente" element={<ProtectedRoute><ListCliente /></ProtectedRoute>} />
                <Route path="list-categoriaproduto" element={<ProtectedRoute><ListCategoriaProduto /></ProtectedRoute>} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="form-cliente" element={<ProtectedRoute><FormCliente /></ProtectedRoute>} />
                <Route path="form-produto" element={<ProtectedRoute><FormProduto /></ProtectedRoute>} />
                <Route path="form-entregador" element={<ProtectedRoute><FormEntregador /></ProtectedRoute>} />
                <Route path="form-categoriaproduto" element={<ProtectedRoute><FormCategoriaProduto /></ProtectedRoute>} />
            </Routes>
        </>
    )
}

export default Rotas
