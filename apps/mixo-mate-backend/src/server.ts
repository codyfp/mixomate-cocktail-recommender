import { expressApp } from "./express.js";

const port = 3000;

expressApp.listen(port, '0.0.0.0',  () =>
  console.log(`Backend server listening at http://0.0.0.0:${port}`)
);
