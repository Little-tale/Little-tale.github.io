import { useEffect, useState } from "react";

type Options = {
  timeZone?: string;
  suffix?: string;
  intervalMs?: number;
};

export function useClock({
  timeZone = "Asia/Seoul",
  suffix = "KST",
  intervalMs = 30_000,
}: Options = {}): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone,
      }).format(new Date());
      setTime(`${fmt} ${suffix}`);
    };
    update();
    const id = setInterval(update, intervalMs);
    return () => clearInterval(id);
  }, [timeZone, suffix, intervalMs]);

  return time;
}
