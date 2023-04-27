import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer/reducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//contiene todo el estado de la aplicación y 
//proporciona métodos para actualizarlo
//y acceder a él desde cualquier parte de la aplicación. 
//El store es creado a partir del root reducer y se utiliza en la 
//aplicación para acceder al estado y enviar acciones para actualizarlo.