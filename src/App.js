import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import style from './style.module.css';
import InputMask from 'react-input-mask';

function calcularIMC(altura, peso) {
  if (altura > 0 && peso > 0) {
    return (peso / (altura * altura)).toFixed(2);
  }
  return "Valores inválidos";
}

function App() {
  const [altura, setAltura] = useState(0);
  const [peso, setPeso] = useState(0);
  const [imc, setImc] = useState('');

  useEffect(() => {
    const handleSubmit = (event) => {
      event.preventDefault();
      const altura = parseFloat(document.querySelector('input[name="altura"]').value);
      const peso = parseFloat(document.querySelector('input[name="peso"]').value);
      const imc = calcularIMC(altura, peso);
      setImc(imc);
    };

    document.addEventListener('submit', handleSubmit);

    return () => {
      document.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return (
    <div>
      <div className={style.container}>
        <div className={style.imcCalc}>
          <form>
            <div className={style.inputGroup}>
            <InputMask
                mask="9.99"
                maskChar=""
                onChange={(e) => setAltura(e.target.value)}
              >
                {(inputProps) => <input {...inputProps} type="text" name="altura" placeholder="Altura (m)" />}
              </InputMask>
            </div>
            <div className={style.inputGroup}>
            <InputMask
                mask="999.9"
                maskChar=""
                onChange={(e) => setPeso(e.target.value)}
              >
                {(inputProps) => <input {...inputProps} type="text" name="peso" placeholder="Peso (kg)" />}
              </InputMask>
            </div>
            <input type="submit" value="Calcular"/>
          </form>
          <div className={style.result}>
            <p>IMC: {imc}</p>
            <p>
              Classificação:{" "}
              {imc < 18.5
                ? "Abaixo do peso"
                : imc < 24.9
                ? "Peso normal"
                : imc < 29.9
                ? "Sobrepeso"
                : imc < 34.9
                ? "Obesidade grau 1"
                : imc < 39.9
                ? "Obesidade grau 2"
                : "Obesidade grau 3"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
