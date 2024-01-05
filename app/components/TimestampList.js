"use client";
import { useState, useEffect, useRef } from "react";
import { Grid } from "@mantine/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Sortable from "sortablejs";
import { ReactSortable } from "react-sortablejs";

import useTimestamps from "@/hooks/useTimestamps";
import useChangeOrder from "@/hooks/useChangeOrder";
import TimestampItem from "./TimestampItem";

export default function TimestampList({ createButton, ...props }) {
  const [timestamps, setTimestamps] = useState([]);
  const { timestamps: _timestamps, isLoading, error } = useTimestamps();
  const changeOrderMutation = useChangeOrder();

  // async function onDragEnd(result) {
  //   console.log(result);
  //   let newItems = [...timestamps];
  //   const aux = [...timestamps];
  //   const sourceIndex = result.oldIndex;
  //   const destinationIndex = result.newIndex;

  //   // item que selecciono el administrador para cambiar de lugar
  //   const selectedItem = aux[sourceIndex];
  //   //item que ocupara el lugar de selectedItem
  //   const destinationItem = aux[destinationIndex];

  //   selectedItem.order = destinationIndex;
  //   destinationItem.order = sourceIndex;

  //   const [removed] = newItems.splice(sourceIndex, 1);
  //   newItems.splice(destinationIndex, 0, removed);

  //   newItems = newItems.toSorted((a, b) => a.order - b.order);

  //   //comprobar si hay elementos diferentes para asi procedera guardar el orden de las items
  //   for (let i = 0; i < newItems.length; i++) {
  //     if (newItems[i]._id !== timestamps[i]._id) {
  //       const timestamps = newItems.map(({ _id, order }) => ({ _id, order }));
  //       await changeOrderMutation.trigger({ timestamps });
  //       setTimestamps(newItems);
  //       break;
  //     }
  //   }
  // }

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
      {/* <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided, snapshot) => (
            <>
              <Grid
                gutter={10}
                {...provided.droppableProps}
                ref={provided.innerRef}
                {...props}
              >
                {timestamps
                  .sort((a, b) => a.order - b.order)
                  .map((props, index) => (
                    <Draggable
                      draggableId={props._id}
                      index={index}
                      key={props._id}
                    >
                      {(provided, snapshot) => (
                        <Grid.Col
                          key={props._id}
                          span={6}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TimestampItem {...props} />
                        </Grid.Col>
                      )}
                    </Draggable>
                  ))}
              </Grid>
              {provided.placeholder}
            </>
          )}
        </Droppable>
      </DragDropContext> */}

      {/* <Grid {...props} gutter={10} ref={setListItems}>
        {timestamps.map((props) => (
          <Grid.Col key={props._id} span={6} data-id={props._id}>
            <TimestampItem {...props} />
          </Grid.Col>
        ))}
      </Grid> */}

      <ReactSortable
        list={timestamps}
        setList={(newlist) => setTimestamps(newlist)}
        onEnd={onSortEnd}
      >
        <>
          {timestamps.map((props) => (
            <TimestampItem {...props} key={props._id} />
          ))}
        </>
      </ReactSortable>
    </>
  );
}
