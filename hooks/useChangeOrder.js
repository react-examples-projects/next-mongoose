import useSWRMutation from "swr/mutation";
import { changeTimestampOrder } from "@/helpers/api";

export default function useChangeOrder() {
  const args = useSWRMutation("timestampsOrder", (key, { arg }) =>
    changeTimestampOrder(arg)
  );

  return args;
}
