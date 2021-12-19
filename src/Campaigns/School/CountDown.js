import React from "react";
import styles from "./CountDown.module.css";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import getSeconds from "date-fns/getSeconds";
import getDate from "date-fns/getDate";
import differenceInDays from "date-fns/differenceInDays";
import getTime from "date-fns/getTime";

function CountDown() {
  const now = getTime(new Date());
  const actualHour = 23 - getHours(now);
  const actualMinutes = 59 - getMinutes(now);
  const actualSecond = 59 - getSeconds(now);
  const actualDay = getDate(now);
  const [daysLeft, setDaysLeft] = React.useState(
    differenceInDays(
      new Date(2022, 1, 10, 0, 0),
      new Date(2021, 12, actualDay, actualHour, actualMinutes)
    )
  );

  const [hours, setHours] = React.useState(actualHour);
  const [minutes, setMinutes] = React.useState(actualMinutes);
  const [seconds, setSeconds] = React.useState(actualSecond);

  const handleSeconds = () => {
    if (seconds <= 1) {
      setSeconds(59);
    } else {
      setSeconds((prev) => prev - 1);
    }
  };

  const handleMinutes = () => {
    if (minutes < 0) {
      setMinutes(59);
    }
    if (seconds <= 1) {
      setMinutes((prev) => prev - 1);
    }
  };

  const handleHours = () => {
    if (hours <= 0 && minutes < 1 && seconds < 1) {
      setHours(23);
    }
    if (minutes < 1 && seconds < 1) {
      setHours((prev) => prev - 1);
    }
  };

  const handleDays = () => {
    if (hours === 0 && minutes === 0 && seconds === 0 && actualDay > 0) {
      setDaysLeft((prev) => prev - 1);
    }
    if (daysLeft === 0) {
      setDaysLeft(0);
    }
    return;
  };
  React.useEffect(() => {
    const timer = setInterval(() => {
      handleSeconds();
      handleMinutes(seconds);
      handleHours(minutes);
      handleDays();
    }, 1000);
    return () => clearInterval(timer);
  }, [now]);
  return (
    <div className={styles.countDown}>
      <div className={styles.days}>
        <div className={styles.numBox}>
          <div>{daysLeft}</div>
          <span className={styles.name}>Dias</span>
        </div>
      </div>
      <div className={styles.time}>
        <div className={styles.numBox}>
          <div>{hours}</div>
          <span className={styles.name}>Horas</span>
        </div>
        <div className={styles.numBox}>
          <div>{minutes}</div>
          <span className={styles.name}>Minutos</span>
        </div>
        <div className={styles.numBox}>
          <div>{`${seconds < 10 ? "0" + seconds : seconds} `}</div>
          <span className={styles.name}>Segundos</span>
        </div>
      </div>
    </div>
  );
}

export default CountDown;
