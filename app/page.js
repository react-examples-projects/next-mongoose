"use client";
import { Container, Button, Box, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { useSWRConfig } from "swr";
import dayjs from "dayjs";
import TimestampList from "./components/TimestampList";
import { createTimestamp } from "@/helpers/api";
import useToggle from "@/hooks/useToggle";

export default function Home() {
  const { mutate } = useSWRConfig();

  const [initDate, setInitDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, toggleOpen] = useToggle();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      error && setError(null);
      setLoading(true);

      await createTimestamp({
        initDate: dayjs(initDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
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
      <Modal
        opened={isOpen}
        onClose={toggleOpen}
        title="Create timestamp"
        centered
      >
        <Box onSubmit={onSubmit} autoComplete="off" component="form" maw={500}>
          <DateInput
            value={initDate}
            onChange={setInitDate}
            label="Fecha de inicio"
            placeholder="Selecciona una fecha de inicio"
            mb="2rem"
            disabled={isLoading}
          />

          <DateInput
            value={endDate}
            onChange={setEndDate}
            label="Fecha fin"
            placeholder="Selecciona una fecha de finalización"
            disabled={isLoading}
          />

          <Button
            type="submit"
            mt="1rem"
            loading={isLoading}
            disabled={isLoading}
            fullWidth
          >
            Aceptar
          </Button>
        </Box>
      </Modal>

      <Container mt="8rem">
        <TimestampList
          mt="2rem"
          createButton={<Button onClick={toggleOpen}>Create timestamp</Button>}
        />
      </Container>
    </>
  );
}
