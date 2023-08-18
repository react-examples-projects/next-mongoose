import connectMongo from "@/config/database";
import Timestamp from "@/models/Timestamp";
import { NextResponse } from "next/server";

export async function PUT(request = Request.prototype, res) {
  try {
    await connectMongo();
    const { timestamps } = await request.json();

    const result = await Promise.all(
      timestamps.map(({ _id, order }) =>
        Timestamp.updateOne({ _id }, { order })
      )
    );
    console.log({ result });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return {
      error,
    };
  }
}
