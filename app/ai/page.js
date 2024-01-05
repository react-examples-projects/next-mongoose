"use client";

import { Button, Textarea } from "@mantine/core";
import replicate from "../../config/replicate";
import { REPLICATE_API_TOKEN } from "@/config";
import axios from "axios";
export default function test() {
  const onGeneratePrediction = async (e) => {
    e.preventDefault();
    const prompt = e.target.prompt.value;
    const res = await axios.post(
      "https://cors-anywhere.herokuapp.com/https://api.replicate.com/v1/predictions",
      {
        version:
          "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
        input: {
          prompt,
          scheduler: "DPMSolverMultistep",
          num_outputs: 1,
          guidance_scale: 7.5,
          image_dimensions: "768x768",
          num_inference_steps: 50,
          webhook_events_filter: ["start", "output", "logs", "completed"],
        },
      },
      {
        headers: {
          Authorization: "Token " + REPLICATE_API_TOKEN,
          "Content-Type": "application/json",
          "User-Agent": "PostmanRuntime/7.36.0",
        },
      }
    );

    console.log(res.data);
    // const output = await replicate.run(
    //   "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
    //   {
    //     input: {
    //       prompt,
    //       scheduler: "DPMSolverMultistep",
    //       num_outputs: 1,
    //       guidance_scale: 7.5,
    //       image_dimensions: "768x768",
    //       num_inference_steps: 50,
    //     },
    //   },
    //   (progress) => {
    //     console.log(progress);
    //   }
    // );
    // console.log(output);
  };
  return (
    <div className="max-w-96 mx-auto mt-12">
      <form autoComplete="off" onSubmit={onGeneratePrediction}>
        <Textarea
          label="Prompt"
          placeholder="a vision of paradise. unreal engine"
          minRows={5}
          maxRows={10}
          name="prompt"
          autosize
          autoFocus
        />
        <Button type="submit" className="mt-2" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
}
