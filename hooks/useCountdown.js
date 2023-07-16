import { useState, useEffect } from "react";

export default function useCountdown(endOfDay = Date.prototype) {
  const [remainingTime, setRemainingTime] = useState("0:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = endOfDay - now;

      if (timeDiff <= 0) {
        setRemainingTime("0:00:00");
        clearInterval(interval);
        return;
      }

      let milliseconds = timeDiff;
      const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
      milliseconds -= days * 24 * 60 * 60 * 1000;

      const hours = Math.floor(milliseconds / (60 * 60 * 1000));
      milliseconds -= hours * 60 * 60 * 1000;

      const minutes = Math.floor(milliseconds / (60 * 1000));
      milliseconds -= minutes * 60 * 1000;

      const seconds = Math.floor(milliseconds / 1000);

      setRemainingTime(
        `${days > 0 ? `${days}d: ` : ""}${hours
          .toString()
          .padStart(2, "0")}h: ${minutes
          .toString()
          .padStart(2, "0")}m: ${seconds.toString().padStart(2, "0")}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [endOfDay]);

  return remainingTime;
}
