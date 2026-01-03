import { success, notFound, error, serverError } from '@/lib/api-response';
import { getQuiz, submitQuiz, getUserProgress, getCourse } from '@/lib/education';
import { z } from 'zod';

interface Params {
  params: Promise<{ id: string }>;
}

const submitSchema = z.object({
  userId: z.string().optional(),
  answers: z.array(z.object({
    questionId: z.string(),
    answer: z.union([z.string(), z.array(z.string())]),
  })),
});

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const includeAnswers = searchParams.get('includeAnswers') === 'true';

    const quiz = getQuiz(id);
    if (!quiz) {
      return notFound('Quiz no encontrado');
    }

    const course = getCourse(quiz.courseId);

    // Don't include correct answers unless requested (for review)
    const questions = quiz.questions.map(q => ({
      id: q.id,
      type: q.type,
      question: q.question,
      options: q.options,
      points: q.points,
      ...(includeAnswers ? { correctAnswer: q.correctAnswer, explanation: q.explanation } : {}),
    }));

    return success({
      id: quiz.id,
      courseId: quiz.courseId,
      lessonId: quiz.lessonId,
      title: quiz.title,
      description: quiz.description,
      passingScore: quiz.passingScore,
      timeLimit: quiz.timeLimit,
      attempts: quiz.attempts,
      questions,
      totalPoints: quiz.questions.reduce((sum, q) => sum + q.points, 0),
      course: course ? { id: course.id, title: course.title } : null,
    });

  } catch (err) {
    console.error('Get quiz error:', err);
    return serverError();
  }
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = submitSchema.safeParse(body);
    if (!validation.success) {
      return error(validation.error.issues[0]?.message || 'Invalid submission');
    }

    const { userId = 'demo-user', answers } = validation.data;

    const quiz = getQuiz(id);
    if (!quiz) {
      return notFound('Quiz no encontrado');
    }

    // Check if user is enrolled
    const progress = getUserProgress(userId, quiz.courseId);
    if (!progress) {
      return error('Debes estar inscrito en el curso para tomar el quiz');
    }

    // Check attempts
    const existingScore = progress.quizScores.find(q => q.quizId === id);
    if (existingScore && quiz.attempts > 0 && existingScore.attempts >= quiz.attempts) {
      return error(`Has alcanzado el máximo de ${quiz.attempts} intentos`);
    }

    // Grade the quiz
    let correctCount = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    const results = quiz.questions.map(question => {
      const userAnswer = answers.find(a => a.questionId === question.id);
      totalPoints += question.points;

      let isCorrect = false;
      if (userAnswer) {
        if (Array.isArray(question.correctAnswer)) {
          isCorrect = Array.isArray(userAnswer.answer) &&
            question.correctAnswer.every(a => userAnswer.answer.includes(a)) &&
            userAnswer.answer.length === question.correctAnswer.length;
        } else {
          isCorrect = userAnswer.answer === question.correctAnswer;
        }
      }

      if (isCorrect) {
        correctCount++;
        earnedPoints += question.points;
      }

      return {
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer?.answer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        points: isCorrect ? question.points : 0,
        explanation: question.explanation,
      };
    });

    const score = Math.round((earnedPoints / totalPoints) * 100);
    const passed = score >= quiz.passingScore;

    // Update progress
    submitQuiz(userId, quiz.courseId, id, score);

    return success({
      quizId: id,
      score,
      passed,
      passingScore: quiz.passingScore,
      correctCount,
      totalQuestions: quiz.questions.length,
      earnedPoints,
      totalPoints,
      results,
      message: passed ? '¡Felicitaciones! Has aprobado el quiz.' : 'No has alcanzado el puntaje mínimo. Intenta de nuevo.',
    });

  } catch (err) {
    console.error('Submit quiz error:', err);
    return serverError();
  }
}
