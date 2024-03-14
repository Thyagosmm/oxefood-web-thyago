import { Segment } from "semantic-ui-react";
import "./App.css";
import FormCliente from "./views/cliente/FormCliente";
import Home from "./views/home/Home";
import FormProduto from "./views/produto/FormProduto";
import FormEntregador from "./views/fornecedor/FormEntregador";
function App() {

 return (

   <div className="App">
    
     <FormEntregador/>

      <div style={{ marginTop: "6%" }}>
        <Segment vertical color="grey" size="tiny" textAlign="center">
          &copy; 2023 - Projeto WEB III - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>
    </div>
  );
}

export default App;
