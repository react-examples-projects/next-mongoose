"use client";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import { Box } from "@mantine/core";
import useTimestamps from "@/hooks/useTimestamps";
import useChangeOrder from "@/hooks/useChangeOrder";
import TimestampItem from "./TimestampItem";

export default function TimestampList({ createButton, ...props }) {
  const [timestamps, setTimestamps] = useState([]);
  const { timestamps: _timestamps, isLoading, error } = useTimestamps();
  const changeOrderMutation = useChangeOrder();

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    const newItems = [...timestamps];

    if (oldIndex > newIndex) {
      for (let i = oldIndex - 1; i >= newIndex; i--) {
        newItems[i].order++;
        newItems[oldIndex].order = newIndex;
      }
    } else if (oldIndex < newIndex) {
      for (let i = oldIndex + 1; i <= newIndex; i++) {
        newItems[i].order--;
        newItems[oldIndex].order = newIndex;
      }
    }
    newItems.sort((a, b) => a.order - b.order);
    await changeOrderMutation.trigger({ timestamps: newItems });
  };
  useEffect(() => {
    if (_timestamps.length > 0) {
      setTimestamps(_timestamps);
    }
  }, [_timestamps]);

  if (error) {
    return <h2>Something went wrong :(</h2>;
  }

  if (isLoading) return <h2>Loading timestamps....</h2>;

  return (
    <>
      {createButton}
      <Box mt={10}>
        <ReactSortable
          list={timestamps}
          setList={(newlist) => setTimestamps(newlist)}
          onEnd={onSortEnd}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {timestamps.map((props) => (
            <TimestampItem {...props} key={props._id} />
          ))}
        </ReactSortable>
      </Box>
    </>
  );
}
