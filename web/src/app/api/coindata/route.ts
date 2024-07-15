import client from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const db = client.db("coin_db");
    const data = await db
      .collection("coin_data")
      .find({})
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray();
    return new Response(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}



export const revalidate = 10;