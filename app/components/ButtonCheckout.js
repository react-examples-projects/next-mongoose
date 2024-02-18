"use client";
import { Button } from "@mantine/core";
import axios from "axios";


export default function ButtonCheckout({ priceId }) {
  const checkout = async () => {
    const req = await axios.post("/api/checkout", {
      priceId,
    });
    window.location.href = req.data.url;
    console.log(req.data);
  };

  return (
    <Button color="blue" fullWidth mt="md" radius="md" onClick={checkout}>
      Buy plan
    </Button>
  );
}
