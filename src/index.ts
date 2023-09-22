import { makeDisposablePgClient } from "./pg.js";
import { environmentVariables } from "./env.js";

try {
  await using disposableClient = await makeDisposablePgClient({
    user: environmentVariables.DB_USER,
    database: environmentVariables.DB_NAME,
    password: environmentVariables.DB_PASSWORD,
    port: Number(environmentVariables.DB_PORT),
    host: environmentVariables.DB_HOST,
  });

  const res = await disposableClient.query("SELECT $1::text as message", [
    "Hello world!",
  ]);
  console.log(res.rows[0].message);
} catch (error) {
  console.error(error);
}

// await client.connect();

// try {
//   const res = await client.query("SELECT $1::text as message", [
//     "Hello world!",
//   ]);
//   console.log(res.rows[0].message); // Hello world!
// } catch (err) {
//   console.error(err);
// } finally {
//   await client.end();
// }
