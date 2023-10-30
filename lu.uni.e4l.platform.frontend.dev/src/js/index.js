import React from "react";
import ReactDOM from "react-dom";
import axios from "axios/index";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import "../scss/e4l.scss"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import "react-table/react-table.css";
import {store, persistor} from "./store"
import E4lRouter from "./e4lRouter";
import Button from "react-bootstrap/Button";
import i18n from "./i18n"
import {I18nextProvider} from "react-i18next";

class App extends React.Component {
    render() {
        axios.defaults.baseURL = process.env.API_URL;
        return (
            
            <Provider store={store}>
             <PersistGate loading={null} persistor={persistor}>
                 {/*<Button style={{opacity:"0", position:"fixed", top:"76px"}} onClick={()=> persistor.purge()}></Button>*/}
                 <I18nextProvider i18n={i18n}>
                 <E4lRouter/>
                 </I18nextProvider>
                 </PersistGate>
            </Provider>
        )
    }
}

const app = document.getElementById('app');

ReactDOM.render( <App/>
    , app);
