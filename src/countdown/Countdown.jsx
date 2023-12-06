import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function Countdown() {
  const [targetSeconds, setTargetSeconds] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (targetSeconds === null) return;

    setElapsedSeconds(0);

    const interval = setInterval(() => {
      setElapsedSeconds((prevElapsed) => {
        const newElapsed = prevElapsed + 1;

        if (newElapsed === targetSeconds) {
          clearInterval(interval);
        }

        return newElapsed;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetSeconds]);

  const parseForm = (ev) => {
    ev.preventDefault();
    const seconds = ev.target.seconds.value;
    setTargetSeconds(parseInt(seconds, 10));
  };

  const calculateCircleRotation = () => {
    if (targetSeconds === null) return 0;
    return (360 * elapsedSeconds) / targetSeconds;
  };

  const circleStyle = {
    transform: `rotate(${calculateCircleRotation()}deg)`,
  };

  return (
    <div className="container text-center mt-5 position-relative">
      {targetSeconds !== null && (
        <div className="circle-container position-relative">
          <div className="circle" style={circleStyle}></div>
          <div className="counter-container">
            <p className="counter">
              {targetSeconds - elapsedSeconds} segundos
            </p>
          </div>
        </div>
      )}

      {elapsedSeconds >= targetSeconds && targetSeconds !== null && (
        <>
          <p className="lead">¡Terminó el conteo!</p>
          <button
            onClick={() => setTargetSeconds(null)}
            className="btn btn-primary"
          >
            Reiniciar conteo
          </button>
        </>
      )}

      {targetSeconds === null && (
        <form onSubmit={parseForm} className="custom-form mt-3">
          <div className="custom-form-group">
            <input
              type="number"
              name="seconds"
              className="custom-form-control"
              placeholder="Cuantos segundos..."
            />
          </div>
          <button type="submit" className="custom-btn btn-success">
            Iniciar
          </button>
        </form>
      )}
    </div>
  );
}

export default Countdown;
