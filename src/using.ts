function someAsyncFunc() {
  return;
}

export const getAsyncResource = () => {
  console.log("getAsyncResource");
  return {
    [Symbol.asyncDispose]: async () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log("asyncDispose");
          resolve();
        }, 1000);
      });
    },
  };
};

export const getSyncResource = () => {
  console.log("getSyncResource");
  return {
    [Symbol.dispose]: () => {
      console.log("dispose");
    },
  };
};

type DatabaseConnectionSignature = {
  close: () => Promise<void>;
};
export class DisposableDatabaseConnection implements AsyncDisposable {
  #connection: DatabaseConnectionSignature;

  constructor(connection: DatabaseConnectionSignature) {
    this.#connection = connection;
  }

  get connection() {
    return this.#connection;
  }

  async [Symbol.asyncDispose]() {
    await this.#connection.close();
  }
}
