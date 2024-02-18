"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Box,
  Title,
} from "@mantine/core";
import axios from "axios";
import ButtonCheckout from "../components/ButtonCheckout";

export default function Princing() {
  const [prices, setPrices] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/pricing")
      .then((res) => {
        console.log(res.data);
        setPrices(res.data.prices);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container mx="auto" mt="4rem" style={{ width: "650px" }}>
      <Title>Select a plan</Title>

      <Box mt="1rem">
        {prices.map((price) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder key={price.id}>
            <Card.Section>
              <Image
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{price.nickname}</Text>
              <Badge color="green">
                {(price.unit_amount / 100).toFixed(2)}€
              </Badge>
            </Group>
            <ButtonCheckout priceId={price.id} />
          </Card>
        ))}
      </Box>
    </Container>
  );
}
