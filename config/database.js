import mongoose from "mongoose";
import chalk from "chalk";
import { MONGO_URI } from "./";

let isConnected = false;
let connectionTries = 1;

const connection = mongoose.connection;
const CONNECTION_TOTAL_TRIES = 4;

const open = () =>
  console.info(chalk.green("Connect to database in " + MONGO_URI));

const error = (err) =>
  console.error(chalk.redBright("Error in connect to mongodb", err));

connection.once("open", open);
connection.once("error", error);

// Using singleton pattern for mongo connection
export default async function connectMongo() {
  /**
   * 0 = disconnected
   * 1 = connected
   * 2 = connecting
   * 3 = disconnecting
   */
  if (isConnected) {
    return console.warn(
      chalk.yellowBright("Mongoose connection detect, skipping reconnection.")
    );
  }

  if (mongoose.connections.length > 0) {
    isConnected = mongoose.connections[0].readyState;

    if (isConnected === 1) {
      return console.warn(
        chalk.yellowBright("Mongoose connection detect, skipping reconnection.")
      );
    }

    await mongoose.disconnect();
    console.warn(chalk.yellowBright("Disconnected from MongoDB"));
  }
  try {
    const con = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    connection.off("open", open);
    connection.off("error", error);

    return con;
  } catch (err) {
    console.error(chalk.redBright("Error in connect to mongodb", err));
    const id = setTimeout(() => {
      if (connectionTries === CONNECTION_TOTAL_TRIES) return clearTimeout(id);
      console.warn(
        chalk.yellowBright(
          `Reconnecting to mongodb server {${connectionTries}}...`
        )
      );
      connectionTries++;
      connectMongo();
    }, 4000);
  }
}
