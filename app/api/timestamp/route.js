import connectMongo from "@/config/database";
import Timestamp from "@/models/Timestamp";
import sheduler from "node-schedule";

export async function POST(request = Request.prototype) {
  await connectMongo();
  const { cronjobDate, ...data } = await request.json();
  const lastTimestamp = await Timestamp.find({})
    .select("order")
    .sort({ order: -1 })
    .limit(1);

  const lastOrder = lastTimestamp[0]?.order;
  const order = (lastOrder ?? 0) + 1;

  const timeStamp = new Timestamp({
    ...data,
    order,
  });

  const result = await timeStamp.save();
  const today = new Date(cronjobDate);
  today.setMinutes(today.getMinutes());
  today.setSeconds(0);

  console.log(`\nSetting cronjob at ${today}`);

  sheduler.scheduleJob("timestamp", today, async () => {
    console.log("Executing at ", new Date());
    try {
      await Timestamp.findByIdAndUpdate(result._id, {
        validated: true,
      });
      console.log("Validated timestamp.");
    } catch (error) {
      console.error(error);
    }
  });

  return new Response(JSON.stringify({ data: result }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(request = Request.prototype) {
  await connectMongo();
  const timeStamps = await Timestamp.find({}).sort({ order: 1 }).lean();

  return new Response(JSON.stringify({ data: timeStamps }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
