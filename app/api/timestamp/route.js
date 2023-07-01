import connectMongo from "@/config/database";
import Timestamp from "@/models/Timestamp";

export async function POST(request = Request.prototype) {
  await connectMongo();
  const data = await request.json();
  const timeStamp = new Timestamp(data);
  const result = await timeStamp.save();

  return new Response(JSON.stringify({ data: result }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(request = Request.prototype) {
  await connectMongo();
  const timeStamps = await Timestamp.find({}).lean();

  return new Response(JSON.stringify({ data: timeStamps }), {
    headers: { "Content-Type": "application/json" },
  });
}

