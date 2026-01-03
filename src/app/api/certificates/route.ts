import { success, notFound, error, serverError } from '@/lib/api-response';
import { getUserCertificates, getCertificate, issueCertificate, getUserProgress, getCourse } from '@/lib/education';
import { z } from 'zod';

const issueSchema = z.object({
  userId: z.string().optional(),
  courseId: z.string(),
  userName: z.string().min(2).max(100),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo-user';
    const certId = searchParams.get('id');
    const verificationCode = searchParams.get('verify');

    // Verify certificate by code
    if (verificationCode) {
      const allCerts = getUserCertificates(userId);
      const cert = allCerts.find(c => c.verificationCode === verificationCode);
      if (!cert) {
        return notFound('Certificado no encontrado o código inválido');
      }
      return success({
        valid: true,
        certificate: cert,
      });
    }

    // Get specific certificate
    if (certId) {
      const cert = getCertificate(certId);
      if (!cert) {
        return notFound('Certificado no encontrado');
      }
      return success(cert);
    }

    // Get all user certificates
    const certificates = getUserCertificates(userId);

    return success({
      userId,
      certificates,
      total: certificates.length,
    });

  } catch (err) {
    console.error('Certificates error:', err);
    return serverError();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Invalid request');
    }

    const { userId = 'demo-user', courseId, userName } = validation.data;

    // Check if user completed the course
    const progress = getUserProgress(userId, courseId);
    if (!progress) {
      return error('No estás inscrito en este curso');
    }

    if (progress.progress < 100) {
      return error(`Debes completar el curso primero. Progreso actual: ${progress.progress}%`);
    }

    if (progress.status === 'certified') {
      return error('Ya tienes un certificado para este curso');
    }

    const course = getCourse(courseId);
    if (!course) {
      return notFound('Curso no encontrado');
    }

    const certificate = issueCertificate(userId, courseId, userName);
    if (!certificate) {
      return error('No se pudo emitir el certificado');
    }

    return success({
      message: '¡Felicitaciones! Tu certificado ha sido emitido.',
      certificate,
    });

  } catch (err) {
    console.error('Issue certificate error:', err);
    return serverError();
  }
}
