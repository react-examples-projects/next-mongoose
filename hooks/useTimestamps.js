import useSWR from "swr";

import { getTimestamps } from "@/helpers/api";
export default function useTimestamps() {
  const { data: timestamps = [], ...args } = useSWR("timestamps", getTimestamps);

  return {
    timestamps,
    ...args,
  };
}
