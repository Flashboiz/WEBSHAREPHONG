import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    listingId,
    startDate,
    endDate,
    totalPrice
   } = body;

   if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { userId: true }
  });

  if (!listing) {
    throw new Error('Không tìm thấy bài đăng');
  }

  if (listing.userId === currentUser.id) {
    throw new Error('Bạn không thể đặt phòng của chính mình');
  }

  // Nếu người dùng có quyền đặt phòng, tiếp tục tạo đặt chỗ
  const createdReservation = await prisma.reservation.create({
    data: {
      userId: currentUser.id,
      listingId,
      startDate,
      endDate,
      totalPrice
    }
  });

  return NextResponse.json(createdReservation);
}
