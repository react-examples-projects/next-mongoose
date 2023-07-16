import useSWRMutation from "swr/mutation";
import { deleteTimestamp } from "@/helpers/api";

export default function useDeleteTimestamp() {
  const args = useSWRMutation("timestamps", (key, { arg }) =>
    deleteTimestamp(arg)
  );

  return args;
}
