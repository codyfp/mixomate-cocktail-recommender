import { db } from "./database.js";
import { expressApp } from "./express.js";
import { Logger } from "./logger.js";
import { UserService } from "./users/user.service.js";

const port = 4000;

await db.connect();

// Creating dummy user
const randomUsername: string = Math.random().toString(36).slice(2, 7)
const randomPassword: string = Math.random().toString(36).slice(2, 14)

await new UserService().createUser({
  username: randomUsername,
  password: randomPassword
})

expressApp.listen(port, '0.0.0.0', () =>
  Logger.info(`Backend server listening at http://0.0.0.0:${port}`)
);