"use client";
import { Container, Button, Box, Title } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useSWRConfig } from "swr";
import dayjs from "dayjs";
import TimestampList from "./components/TimestampList";
import { createTimestamp } from "@/helpers/api";
import useToggle from "@/hooks/useToggle";

const today = new Date();

export default function Home() {
  const { mutate } = useSWRConfig();
  const [dates, setDates] = useState([today]);
  const [cronjobDate, setCronjobDate] = useState(today);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, toggleOpen] = useToggle();

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
      toggleOpen();

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
        {isOpen && (
          <Box
            onSubmit={onSubmit}
            autoComplete="off"
            component="form"
            maw={500}
            mb={8}
          >
            <Title order={3}>Create Timesamp</Title>

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
              mt="0.5rem"
              loading={isLoading}
              disabled={isLoading}
              fullWidth
            >
              Aceptar
            </Button>
          </Box>
        )}
        <TimestampList
          mt="2rem"
          createButton={
            <Button onClick={toggleOpen} mt={10}>
              Create timestamp
            </Button>
          }
        />
      </Container>
    </>
  );
}
