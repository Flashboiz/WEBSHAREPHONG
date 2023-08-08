import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('ID không hợp lệ');
  }
// Trước khi xóa, hãy kiểm tra xem người dùng hiện tại có quyền xóa đặt chỗ không
const reservation = await prisma.reservation.findUnique({
  where: { id: reservationId },
  select: { userId: true }
});

if (!reservation) {
  throw new Error('Không tìm thấy đặt chỗ');
}

if (reservation.userId !== currentUser.id) {
  throw new Error('Bạn không có quyền xóa đặt chỗ này');
}

// Nếu người dùng có quyền xóa, tiếp tục xử lý xóa
const deletedReservation = await prisma.reservation.delete({
  where: { id: reservationId }
});

return NextResponse.json(deletedReservation);
}
