import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
    const apiKey = '3b6efdaaf0c3c71c1f04c9ca8ea39525';
    //state del formulario
    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: '',
    });

    const [consultar, guardarConsultar] = useState(false);

    const [resultado, guardarResultado] = useState({});

    const [error, guardarError] = useState(false);

    const { ciudad, pais } = busqueda;

    useEffect(() => {
        const consultarAPI = async () => {
            if (consultar) {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
                const api = await fetch(url);
                const respuesta = await api.json();
                guardarResultado(respuesta);
                guardarConsultar(false);

                //Detecta si hubo resultados correctos en la consulta
                if (respuesta.cod === '404') {
                    guardarError(true);
                } else {
                    guardarError(false);
                }
            }
        };
        consultarAPI();
        //eslint-disable-next-line
    }, [consultar]);

    let componente;
    if (error) {
        componente = <Error mensaje="No hay resultados" />;
    } else {
        componente = <Clima resultado={resultado} />;
    }

    return (
        <Fragment>
            <Header titulo="Clima React APP" />
            <div className="contenedor-form">
                <div className="container">
                    <div className="row">
                        <div className="col m6 s12">
                            <Formulario
                                busqueda={busqueda}
                                guardarBusqueda={guardarBusqueda}
                                guardarConsultar={guardarConsultar}
                            />
                        </div>
                        <div className="col m6 s12">{componente}</div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
