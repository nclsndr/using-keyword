type DatabaseConnection = {
  exec: (sql: string) => Promise<void>;
};

class Transaction implements AsyncDisposable {
  #conn: DatabaseConnection;
  #disposed = false;
  #complete = false;

  private constructor(conn: DatabaseConnection) {
    this.#conn = conn;
  }

  static async begin(conn: DatabaseConnection) {
    await conn.exec("begin transaction");
    return new Transaction(conn);
  }

  setComplete() {
    if (this.#disposed) throw new Error("Object is disposed");
    this.#complete = true;
  }

  async [Symbol.asyncDispose]() {
    if (this.#disposed) return;
    this.#disposed = true;
    if (this.#complete) {
      await this.#conn.exec("commit transaction");
    } else {
      await this.#conn.exec("rollback transaction");
    }
  }
}
