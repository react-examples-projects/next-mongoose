import useCountdown from "../../hooks/useCountdown";
import {Text, Skeleton} from "@mantine/core"

export default function Countdown({ date, className, style = {}, ...props }) {
  const remainingMinutes = useCountdown(date);
  if(remainingMinutes === null) {
    return <Skeleton height={25} width={135} radius="sm" />;
  }
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
