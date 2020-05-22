import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({ resultado }) => {
    //Extraer los valores
    const { name, main } = resultado;

    if (!name) return null;

    //formula para restar grados kelvin
    const GRADOS_KELVIN = 273.15;

    return (
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {name} es: </h2>
                <p className="temperatura">
                    {parseFloat(main.temp - GRADOS_KELVIN, 10).toFixed(2)}{' '}
                    <span>&#x2103;</span>
                </p>
                <p>
                    <span>Temperatura Máxima </span>
                    {parseFloat(main.temp_max - GRADOS_KELVIN, 10).toFixed(
                        2
                    )}{' '}
                    <span>&#x2103;</span>
                </p>
                <p>
                    <span>Temperatura Mínima </span>
                    {parseFloat(main.temp_min - GRADOS_KELVIN, 10).toFixed(
                        2
                    )}{' '}
                    <span>&#x2103;</span>
                </p>
            </div>
        </div>
    );
};

Clima.propTypes = {
    resultado: PropTypes.object.isRequired,
};

export default Clima;
