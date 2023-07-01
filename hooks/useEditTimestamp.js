import useSWRMutation from "swr/mutation";
import { editTimestamp } from "@/helpers/api";

export default function useEditTimestamp() {
  const args = useSWRMutation("timestamps", (key, { arg }) =>
    editTimestamp(...arg)
  );

  return args;
}
