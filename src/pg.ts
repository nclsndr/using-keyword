import pg from "pg";
const { Client } = pg;

export async function makeDisposablePgClient(
  options: pg.ClientConfig
): Promise<pg.Client & AsyncDisposable> {
  const client = new Client(options);
  await client.connect();
  Reflect.set(
    client,
    Symbol.asyncDispose,
    async () => {
      console.log("Dispose client");
      await client.end();
    },
    client
  );
  return client as pg.Client & AsyncDisposable;
}

// export class DisposableClient implements AsyncDisposable {
//   #client: pg.Client;

//   constructor(options: pg.ClientConfig) {
//     this.#client = new Client(options);
//   }

//   get client() {
//     return this.#client;
//   }

//   async [Symbol.asyncDispose]() {
//     console.log("Dispose client");
//     await this.#client.end();
//   }
// }
