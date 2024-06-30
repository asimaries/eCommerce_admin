
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
export const runtime = 'edge'

export const PUT = async (req: NextRequest, { params }: { params: { orderId: String } }) => {
  try {
    await connectToDB()
    const body = JSON.parse(await req.text())
    console.log(body)
    const { status } = body as any
    if (!['Pending', 'Completed', 'Shipping'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }
    const order = await Order.findByIdAndUpdate(
      params.orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return new NextResponse(JSON.stringify({ message: "Order Not Found" }), { status: 404 })
    }
    return NextResponse.json({ DONE: 'DONE' }, { status: 200 })
  } catch (err) {
    console.log("[orderId_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
