import { success, notFound, serverError } from '@/lib/api-response';
import { getNotification, markAsRead, deleteNotification } from '@/lib/notifications';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const notification = getNotification(id);
    if (!notification) {
      return notFound('Notificación no encontrada');
    }

    return success(notification);

  } catch (err) {
    console.error('Get notification error:', err);
    return serverError();
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Mark as read
    if (body.action === 'read' || body.read === true) {
      const notification = markAsRead(id);
      if (!notification) {
        return notFound('Notificación no encontrada');
      }

      return success({
        message: 'Notificación marcada como leída',
        notification,
      });
    }

    return success({ message: 'No action taken' });

  } catch (err) {
    console.error('Update notification error:', err);
    return serverError();
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const deleted = deleteNotification(id);
    if (!deleted) {
      return notFound('Notificación no encontrada');
    }

    return success({
      message: 'Notificación eliminada',
      id,
    });

  } catch (err) {
    console.error('Delete notification error:', err);
    return serverError();
  }
}
