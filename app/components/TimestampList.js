"use client";
import useTimestamps from "@/hooks/useTimestamps";
import { Grid } from "@mantine/core";
import TimestampItem from "./TimestampItem";

export default function TimestampList({ createButton, ...props }) {
  const { timestamps, isLoading, error } = useTimestamps();

  if (error) {
    return <h2>Something went wrong :(</h2>;
  }

  if (isLoading) return <h2>Loading timestamps....</h2>;

  return (
    <>
      {createButton}

      <Grid {...props} gutter={10}>
        {timestamps.map((props) => (
          <Grid.Col key={props._id} span={6}>
            <TimestampItem {...props} />
          </Grid.Col>
        ))}
      </Grid>{" "}
    </>
  );
}
