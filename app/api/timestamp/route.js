import connectMongo from "@/config/database";
import Timestamp from "@/models/Timestamp";
import sheduler from "node-schedule";

export async function POST(request = Request.prototype) {
  await connectMongo();
  const { cronjobDate, ...data } = await request.json();
  const timeStamp = new Timestamp(data);
  const result = await timeStamp.save();
  const today = new Date(cronjobDate);
  today.setMinutes(today.getMinutes() + 1);

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
  const timeStamps = await Timestamp.find({}).lean();

  return new Response(JSON.stringify({ data: timeStamps }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
