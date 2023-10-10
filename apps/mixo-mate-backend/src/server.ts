import { db } from "./database.js";
import { expressApp } from "./express.js";
import { Logger } from "./logger.js";

const port = 4000;

await db.connect();

expressApp.listen(port, '0.0.0.0', () =>
  Logger.info(`Backend server listening at http://0.0.0.0:${port}`)
);