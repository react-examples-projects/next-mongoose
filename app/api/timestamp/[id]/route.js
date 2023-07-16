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
}
export async function DELETE(request = Request.prototype, context) {
  await connectMongo();
  const { id } = context.params;
  const timestamp = await Timestamp.deleteOne({ _id: id }, {
    new: true,
    lean: true,
  });
  return new Response(JSON.stringify(timestamp), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
