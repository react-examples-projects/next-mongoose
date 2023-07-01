import connectMongo from "@/config/database";
import Timestamp from "@/models/Timestamp";

export async function PUT(request = Request.prototype, context) {
  await connectMongo();
  const { id } = context.params;
  const data = await request.json();
  const timestamp = await Timestamp.findByIdAndUpdate(id, data, {
    new: true,
    lean: true,
  });
  return new Response(JSON.stringify(timestamp), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  // await connectMongo();
  // const data = await request.json();
  // const timeStamp = new Timestamp(data);
  // const result = await timeStamp.save();

  // return new Response(JSON.stringify({ data: result }), {
  //   headers: { "Content-Type": "application/json" },
  // });
}
