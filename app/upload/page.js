"use client";
import { Button, Container } from "@mantine/core";
import axios from "axios";

export default function Upload() {
  const getBuckets = () => axios.get("/api/storage");

  return (
    <Container>
      <Button onClick={getBuckets}>Ver buckets</Button>
    </Container>
  );
}
