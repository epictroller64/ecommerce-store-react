
import { NextResponse } from "next/server";
import { LocalApi } from "../../../lib/api/LocalApi";

//todo: test if cookies can be accessed when LocalApi is called from server side, id avoid passing them in
export async function GET() {
    const response = await LocalApi.getOrders();
    return NextResponse.json(response);
}