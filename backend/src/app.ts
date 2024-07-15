import axios from "axios";
import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get environment variables
const uri: string = process.env.MONGODB_URI as string;
const apiKey: string = process.env.LIVECOIN_API_KEY as string;

interface ApiResponse {
  // Define the structure of the API response
  // Example:
  // name: string;
  // age: number;
}

interface DataWithTimestamp {
  timestamp: Date;
  data: any;
}

const client: MongoClient = new MongoClient(uri);

// Function to fetch data from an API

async function fetchData(): Promise<any> {
  try {
    const response = await fetch(
      new Request("https://api.livecoinwatch.com/coins/list"),
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": apiKey,
        }),
        body: JSON.stringify({
          currency: "USD",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 20,
          meta: true,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: any = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to clean up old data, keeping only the latest 20 documents
async function cleanupDatabase(
  collection: Collection<DataWithTimestamp>
): Promise<void> {
  try {
    const documents = await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();
    if (documents.length > 20) {
      const idsToKeep = documents.slice(0, 20).map((doc) => doc._id);
      await collection.deleteMany({ _id: { $nin: idsToKeep } });
      // console.log(`Cleanup complete. Kept only the latest 20 data points.`);
    } else {
      // console.log(`No cleanup needed. There are 20 or fewer data points.`);
    }
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}

// Function to save data to MongoDB
async function saveData(data: any): Promise<void> {
  const dataWithTimestamp: DataWithTimestamp = {
    timestamp: new Date(),
    data: data,
  };

  try {
    await client.connect();
    const database: Db = client.db("coin_db");
    const collection: Collection<DataWithTimestamp> =
      database.collection("coin_data");
    const result = await collection.insertOne(dataWithTimestamp);
    // console.log(`Data saved with _id: ${result.insertedId}`);
    // Perform cleanup to keep only the latest 20 documents
    await cleanupDatabase(collection);
  } catch (error) {
    console.error("Error saving data:", error);
  } finally {
    await client.close();
  }
}

function filterByNames(arr: Array<any>, names: Array<string>) {
  return arr.filter((obj) => names.includes(obj.name));
}

// Main function to fetch and save data every 5 seconds
async function main(): Promise<void> {
  const selectedCoins = ["Bitcoin", "Ethereum", "Tether", "BNB", "Solana"];
  setInterval(async () => {
    const data = await fetchData();
    if (data) {
      const filteredData = filterByNames(data, selectedCoins);
      await saveData(filteredData);
    }
  }, 5000);
}

// Start the process
main().catch(console.error);
