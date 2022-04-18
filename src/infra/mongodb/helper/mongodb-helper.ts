import { Collection, Db, MongoClient } from 'mongodb'

export class MongoDbHelper {
  private collection: Collection
  private client: MongoClient

  constructor(
    private readonly connectionUrl: string
  ) {
    this.connectionUrl = connectionUrl
  }

  async connect(): Promise<Db> {
    this.client = new MongoClient(this.connectionUrl)
    await this.client.connect()
    return this.client.db()
  }

  async getCollection(collectionName: string): Promise<Collection> {
    const db = await this.connect()
    this.collection = db.collection(collectionName)
    return this.collection
  }

  async disconnect(): Promise<void> {
    await this.client.close()
  }
}
