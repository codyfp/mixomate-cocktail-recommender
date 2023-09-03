import mongoose from "mongoose";
import { Logger } from "./logger.js";

const connectionURI = 'mongodb://root:pass12345@mongo:27017/'

class Database {
  constructor() {
  }

  public async connect(): Promise<void> {
    try {
      Logger.info('Connecting to database...');
      await mongoose.connect(connectionURI)
      Logger.info('Database connection successful');
    } catch (error) {
      Logger.error(`Database connection failed. ${error.message}`);
    }
  }
}

export const db = new Database();
