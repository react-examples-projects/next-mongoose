import Replicate from "replicate";
import { REPLICATE_API_TOKEN } from "./index";

const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

export default replicate
