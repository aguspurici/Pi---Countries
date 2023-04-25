import './App.css';
import  Home  from "./vistas/Home"
import Landing from './vistas/Landing';
import CountryDetail from './components/CountryDetail/CountryDetail';
import Activity from './vistas/Activity';
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/detail/:id" component={CountryDetail} />
        <Route path="/activities" component={Activity} />
      </div>
    
    </BrowserRouter>
  );
}

export default App;
