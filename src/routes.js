import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ImportarExtratoPage from "./pages/ImportarExtrato";
import CadastroBancoPage from "./pages/CadastroBanco"; 
import CadastroCartaoPage from "./pages/CadastroCartao"; 
import CadastroTipoCategoriaPage from "./pages/CadastroTipoCategoria"; 
import CadastroUsuarioPage from "./pages/CadastroUsuario"; 
import CadastroCategoriaPage from "./pages/CadastroCategoria"; 
import CategorizarGastosPage from "./pages/CategorizarGastos"; 
import CadastroMetaPage from "./pages/CadastroMeta"; 
import GraficosPage from "./pages/Graficos"; 
import HomePage from "./pages/Home"; 

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Graficos" component={GraficosPage}/>
        <Route path="/ImportarExtrato" component={ImportarExtratoPage}/>
        <Route path="/CadastroBanco" component={CadastroBancoPage}/>
        <Route path="/CadastroCartao" component={CadastroCartaoPage}/>
        <Route path="/CadastroTipoCategoria" component={CadastroTipoCategoriaPage}/>
        <Route path="/CadastroUsuario" component={CadastroUsuarioPage}/>
        <Route path="/CadastroCategoria" component={CadastroCategoriaPage}/>
        <Route path="/CategorizarGastos" component={CategorizarGastosPage}/>
        <Route path="/CadastroMeta" component={CadastroMetaPage}/>
        <Route path="/" component={HomePage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;