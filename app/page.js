"use client";
import { Container, Button, Box, Title, Modal } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import { createTimestamp } from "@/helpers/api";
import useToggle from "@/hooks/useToggle";
import dayjs from "dayjs";
// import dynamic from "next/dynamic";
import TimestampList from "./components/TimestampList";
const today = new Date();
// const File = dynamic(() => import("./components/File"), {
//   loading: () => <p>Loading...</p>,
// });

export default function Home() {
  const { mutate } = useSWRConfig();
  const [dates, setDates] = useState([today]);
  const [cronjobDate, setCronjobDate] = useState(today);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isOpenModal, toggleOpenModal] = useToggle();
  console.log({ cronjobDate });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      error && setError(null);
      setLoading(true);
      const [initDate, endDate] = dates;
      await createTimestamp({
        initDate: dayjs(initDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
        cronjobDate,
      });

      await mutate("timestamps");
      toggleOpenModal();

      notifications.show({
        title: "Timestamp created successfully",
        message: "Your timestamp have been created successfully",
        color: "green",
      });
    } catch (err) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container mt="8rem">
        <Modal
          opened={isOpenModal}
          onClose={toggleOpenModal}
          title="Create Timesamp"
          centered
        >
          <Box
            onSubmit={onSubmit}
            autoComplete="off"
            component="form"
            maw={500}
            mb={8}
          >
            <DatePickerInput
              type="range"
              label="Pick dates range"
              placeholder="Pick dates range"
              value={dates}
              onChange={setDates}
              mt={12}
              mb={9}
            />

            <DateTimePicker
              label="Pick date and time to cronjob"
              placeholder="Pick date and time"
              onChange={setCronjobDate}
              value={cronjobDate}
            />

            <Button
              type="submit"
              mt="2rem"
              loading={isLoading}
              disabled={isLoading}
              fullWidth
            >
              Aceptar
            </Button>
          </Box>
        </Modal>

        {/* <File /> */}
        <TimestampList
          mt="2rem"
          createButton={
            <Button onClick={toggleOpenModal} mt={10}>
              Create timestamp
            </Button>
          }
        />
      </Container>
    </>
  );
}
