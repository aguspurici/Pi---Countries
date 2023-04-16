import './App.css';
import  Home  from "./vistas/Home"
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    
      <div className="App">

        <Route path="/home" component={Home} />
      </div>
    
    </BrowserRouter>
  );
}

export default App;
