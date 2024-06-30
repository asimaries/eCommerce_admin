import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe";
export const runtime = 'edge'

export const POST = async (req: NextRequest) => {
  try {/* 
    const rawBody = await req.text()
    const signature = req.headers.get("Stripe-Signature") as string

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      const customerInfo = {
        clerkId: session?.client_reference_id,
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
      }

      const shippingAddress = {
        street: session?.shipping_details?.address?.line1,
        city: session?.shipping_details?.address?.city,
        state: session?.shipping_details?.address?.state,
        postalCode: session?.shipping_details?.address?.postal_code,
        country: session?.shipping_details?.address?.country,
      }

      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items.data.price.product"]}
      )

      const lineItems = await retrieveSession?.line_items?.data
*/
    const { line_items, customer: customerInfo } = JSON.parse(await req.text());
    console.log(JSON.stringify(line_items, null, 2), customerInfo)
    const orderItems = line_items?.map((item: any) => {
      return {
        product: item.price.product.metadata.productId,
        color: item.price.product.metadata.color || "N/A",
        size: item.price.product.metadata.size || "N/A",
        quantity: item.quantity,
        images: item.price.product.metadata.images,
        description: item.price.product.metadata.description
      }
    })

    await connectToDB()

    const newOrder = new Order({
      customerClerkId: customerInfo.clerkId,
      products: orderItems,
      shippingAddress: {
        street: 'atlanta',
        city: 'shil phata',
        state: 'maharastra',
        postalCode: '400612',
        country: 'India',
      },
      shippingRate: 0,
      totalAmount: (line_items as Array<any>).reduce((acc: number, item: any) => {
        return acc + (Number(item.price.unit_amount) * Number(item.quantity))
      }, 0),
    })
    console.log(newOrder)
    await newOrder.save()

    let customer = await Customer.findOne({ clerkId: customerInfo.clerkId })

    if (customer) {
      customer.orders.push(newOrder._id)
    } else {
      customer = new Customer({
        ...customerInfo,
        orders: [newOrder._id],
      })
    }

    await customer.save()
    // }

    return new NextResponse("Order created", { status: 200 })
  } catch (err) {
    console.log("[webhooks_POST]", err)
    return new NextResponse("Failed to create the order", { status: 500 })
  }
}