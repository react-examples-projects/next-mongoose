import useCountdown from "../../hooks/useCountdown";
import {Text} from "@mantine/core"

export default function Countdown({ date, className, style = {}, ...props }) {
  const remainingMinutes = useCountdown(date);
  return (
    <Text
      className={className}
      style={{
        fontWeight: 500,
        ...style,
      }}
      {...props}
    >
      {remainingMinutes}
    </Text>
  );
}
