import { useState, useEffect } from "react";
import "./CountDown.css";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2027-10-23T12:00:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown section">
      <div className="container">
        <h2 className="section-title">Cuenta Regresiva</h2>
        <p className="countdown-subtitle">
          ¡Faltan muy pocos días para nuestro gran día!
        </p>

        <div className="countdown-grid">
          <div className="countdown-item">
            <div className="countdown-number">{timeLeft.days}</div>
            <div className="countdown-label">Días</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-number">{timeLeft.hours}</div>
            <div className="countdown-label">Horas</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-number">{timeLeft.minutes}</div>
            <div className="countdown-label">Minutos</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-number">{timeLeft.seconds}</div>
            <div className="countdown-label">Segundos</div>
          </div>
        </div>

        <div className="countdown-message">
          <p>💍 ¡Únete a nosotros en este día tan especial! 💍</p>
        </div>
      </div>
    </section>
  );
};

export default CountDown;

