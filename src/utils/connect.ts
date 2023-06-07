import mongoose from "mongoose";
import config from "config";
import log from "./logger";

function connect() {
  const dbUri = config.get<string>("dbUri");
  return mongoose
    .connect(dbUri)
    .then(() => {
      log.info("Connected to DB");
    })
    .catch((error) => {
      log.error("could not connect to DB");
      process.exit(1);
    });
}

export default connect;
