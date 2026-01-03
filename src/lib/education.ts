/**
 * NewCool Education Platform
 * Courses, lessons, quizzes, and progress tracking
 */

export interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  modules: number;
  lessons: number;
  instructor: string;
  coverUrl: string;
  tags: string[];
  rating: number;
  enrollments: number;
  isFree: boolean;
  price?: number;
  createdAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleIndex: number;
  lessonIndex: number;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'interactive' | 'quiz';
  duration: number; // minutes
  content: {
    videoUrl?: string;
    text?: string;
    resources?: { name: string; url: string }[];
  };
  order: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  lessonId?: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number; // percentage
  timeLimit?: number; // minutes
  attempts: number; // max attempts, 0 = unlimited
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface Progress {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedLessons: string[];
  quizScores: { quizId: string; score: number; attempts: number; passedAt?: string }[];
  progress: number; // 0-100
  status: 'enrolled' | 'in_progress' | 'completed' | 'certified';
  lastAccessedAt: string;
  completedAt?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  userName: string;
  issuedAt: string;
  certificateUrl: string;
  verificationCode: string;
}

// Course Catalog
export const courses: Course[] = [
  // Mathematics
  {
    id: 'math-101',
    title: 'Matemáticas Básicas',
    description: 'Fundamentos de matemáticas para primaria: números, operaciones básicas, y geometría introductoria.',
    subject: 'math',
    grade: '1-3',
    level: 'beginner',
    duration: '4 semanas',
    modules: 4,
    lessons: 16,
    instructor: 'Prof. María González',
    coverUrl: 'https://newcool-cdn.s3.amazonaws.com/courses/math-101.jpg',
    tags: ['números', 'suma', 'resta', 'geometría'],
    rating: 4.8,
    enrollments: 15420,
    isFree: true,
    createdAt: '2025-06-01',
  },
  {
    id: 'math-201',
    title: 'Álgebra Introductoria',
    description: 'Introducción al álgebra: ecuaciones, variables, y expresiones algebraicas.',
    subject: 'math',
    grade: '7-9',
    level: 'intermediate',
    duration: '6 semanas',
    modules: 6,
    lessons: 24,
    instructor: 'Prof. Carlos Mendoza',
    coverUrl: 'https://newcool-cdn.s3.amazonaws.com/courses/math-201.jpg',
    tags: ['álgebra', 'ecuaciones', 'variables'],
    rating: 4.7,
    enrollments: 8900,
    isFree: true,
    createdAt: '2025-07-01',
  },
  {
    id: 'math-301',
    title: 'Cálculo Diferencial',
    description: 'Fundamentos de cálculo: límites, derivadas, y aplicaciones.',
    subject: 'math',
    grade: '10-12',
    level: 'advanced',
    duration: '8 semanas',
    modules: 8,
    lessons: 32,
    instructor: 'Dr. Roberto Silva',
    coverUrl: 'https://newcool-cdn.s3.amazonaws.com/courses/math-301.jpg',
    tags: ['cálculo', 'derivadas', 'límites'],
    rating: 4.9,
    enrollments: 4200,
    isFree: false,
    price: 29.99,
    createdAt: '2025-08-01',
  },

  // Sciences
  {
    id: 'sci-101',
    title: 'Ciencias Naturales',
    description: 'Exploración del mundo natural: seres vivos, medio ambiente, y ciclos naturales.',
    subject: 'science',
    grade: '4-6',
    level: 'beginner',
    duration: '4 semanas',
    modules: 4,
    lessons: 16,
    instructor: 'Prof. Ana Martínez',
    coverUrl: 'https://newcool-cdn.s3.amazonaws.com/courses/sci-101.jpg',
    tags: ['naturaleza', 'seres vivos', 'ecosistemas'],
    rating: 4.6,
    enrollments: 12300,
    isFree: true,
    createdAt: '2025-06-15',
  },
  {
    id: 'chem-201',
    title: 'Química General',
    description: 'Fundamentos de química: átomos, moléculas, reacciones químicas.',
    subject: 'chemistry',
    grade: '7-9',
    level: 'intermediate',
    duration: '5 semanas',
    modules: 5,
    lessons: 20,
    instructor: 'Prof. Diego Vargas',
    coverUrl: 'https://newcool-cdn.s3.amazonaws.com/courses/chem-201.jpg',
    tags: ['química', 'átomos', 'reacciones'],
    rating: 4.5,
    enrollments: 7800,
    isFree: true,
    createdAt: '2025-07-15',
  },

  // Languages
  {
    id: 'eng-101',
    title: 'Inglés para Principiantes',
    description: 'Aprende inglés desde cero: vocabulario básico, gramática, y conversación.',
    subject: 'english',
    grade: '1-3',
    level: 'beginner',
    duration: '8 semanas',
    modules: 8,
    lessons: 32,
    instructor: 'Teacher Sarah Johnson',
    coverUrl: 'https://newcool-cdn.s3.amazonaws.com/courses/eng-101.jpg',
    tags: ['inglés', 'vocabulario', 'gramática'],
    rating: 4.9,
    enrollments: 25600,
    isFree: true,
    createdAt: '2025-06-01',
  },
  {
    id: 'spa-101',
    title: 'Gramática Española',
    description: 'Domina la gramática española: ortografía, puntuación, y redacción.',
    subject: 'spanish',
    grade: '4-6',
    level: 'intermediate',
    duration: '6 semanas',
    modules: 6,
    lessons: 24,
    instructor: 'Prof. Lucía Herrera',
    coverUrl: 'https://newcool-cdn.s3.amazonaws.com/courses/spa-101.jpg',
    tags: ['español', 'gramática', 'ortografía'],
    rating: 4.7,
    enrollments: 9200,
    isFree: true,
    createdAt: '2025-07-01',
  },

  // Social Studies
  {
    id: 'his-101',
    title: 'Historia de Chile',
    description: 'Recorrido por la historia chilena desde la prehistoria hasta la actualidad.',
    subject: 'history',
    grade: '7-9',
    level: 'intermediate',
    duration: '5 semanas',
    modules: 5,
    lessons: 20,
    instructor: 'Prof. Alejandro Rojas',
    coverUrl: 'https://newcool-cdn.s3.amazonaws.com/courses/his-101.jpg',
    tags: ['historia', 'chile', 'independencia'],
    rating: 4.8,
    enrollments: 6780,
    isFree: true,
    createdAt: '2025-08-01',
  },
  {
    id: 'geo-101',
    title: 'Geografía Mundial',
    description: 'Conoce el mundo: continentes, países, climas, y culturas.',
    subject: 'geography',
    grade: '4-6',
    level: 'beginner',
    duration: '4 semanas',
    modules: 4,
    lessons: 16,
    instructor: 'Prof. Camila Torres',
    coverUrl: 'https://newcool-cdn.s3.amazonaws.com/courses/geo-101.jpg',
    tags: ['geografía', 'continentes', 'países'],
    rating: 4.6,
    enrollments: 5430,
    isFree: true,
    createdAt: '2025-07-15',
  },

  // Technology
  {
    id: 'code-101',
    title: 'Programación para Niños',
    description: 'Introducción a la programación con bloques visuales y proyectos divertidos.',
    subject: 'coding',
    grade: '4-6',
    level: 'beginner',
    duration: '6 semanas',
    modules: 6,
    lessons: 24,
    instructor: 'Prof. Felipe Soto',
    coverUrl: 'https://newcool-cdn.s3.amazonaws.com/courses/code-101.jpg',
    tags: ['programación', 'scratch', 'lógica'],
    rating: 4.9,
    enrollments: 18500,
    isFree: true,
    createdAt: '2025-06-01',
  },
  {
    id: 'code-201',
    title: 'Python Básico',
    description: 'Aprende Python desde cero: variables, funciones, y proyectos prácticos.',
    subject: 'coding',
    grade: '7-9',
    level: 'intermediate',
    duration: '8 semanas',
    modules: 8,
    lessons: 32,
    instructor: 'Ing. Martín Pérez',
    coverUrl: 'https://newcool-cdn.s3.amazonaws.com/courses/code-201.jpg',
    tags: ['python', 'programación', 'desarrollo'],
    rating: 4.8,
    enrollments: 12400,
    isFree: false,
    price: 19.99,
    createdAt: '2025-07-01',
  },
];

// Sample lessons for math-101
export const lessons: Lesson[] = [
  // Module 1: Números
  { id: 'l001', courseId: 'math-101', moduleIndex: 1, lessonIndex: 1, title: 'Conociendo los Números', description: 'Introducción a los números del 1 al 100', type: 'video', duration: 15, content: { videoUrl: 'https://newcool-cdn.s3.amazonaws.com/lessons/math-101-l001.mp4' }, order: 1 },
  { id: 'l002', courseId: 'math-101', moduleIndex: 1, lessonIndex: 2, title: 'Contando Objetos', description: 'Aprende a contar objetos de tu entorno', type: 'interactive', duration: 20, content: { text: 'Actividad interactiva de conteo' }, order: 2 },
  { id: 'l003', courseId: 'math-101', moduleIndex: 1, lessonIndex: 3, title: 'Números Pares e Impares', description: 'Diferencia entre números pares e impares', type: 'video', duration: 12, content: { videoUrl: 'https://newcool-cdn.s3.amazonaws.com/lessons/math-101-l003.mp4' }, order: 3 },
  { id: 'l004', courseId: 'math-101', moduleIndex: 1, lessonIndex: 4, title: 'Quiz: Números', description: 'Evalúa tu conocimiento de números', type: 'quiz', duration: 10, content: {}, order: 4 },

  // Module 2: Suma
  { id: 'l005', courseId: 'math-101', moduleIndex: 2, lessonIndex: 1, title: 'Introducción a la Suma', description: 'Qué es sumar y cómo hacerlo', type: 'video', duration: 15, content: { videoUrl: 'https://newcool-cdn.s3.amazonaws.com/lessons/math-101-l005.mp4' }, order: 5 },
  { id: 'l006', courseId: 'math-101', moduleIndex: 2, lessonIndex: 2, title: 'Sumando con los Dedos', description: 'Técnica de suma usando los dedos', type: 'video', duration: 10, content: { videoUrl: 'https://newcool-cdn.s3.amazonaws.com/lessons/math-101-l006.mp4' }, order: 6 },
  { id: 'l007', courseId: 'math-101', moduleIndex: 2, lessonIndex: 3, title: 'Práctica de Sumas', description: 'Ejercicios de suma interactivos', type: 'interactive', duration: 25, content: { text: 'Resuelve las sumas' }, order: 7 },
  { id: 'l008', courseId: 'math-101', moduleIndex: 2, lessonIndex: 4, title: 'Quiz: Suma', description: 'Evalúa tu habilidad de suma', type: 'quiz', duration: 10, content: {}, order: 8 },

  // Module 3: Resta
  { id: 'l009', courseId: 'math-101', moduleIndex: 3, lessonIndex: 1, title: 'Introducción a la Resta', description: 'Qué es restar y cuándo usarlo', type: 'video', duration: 15, content: { videoUrl: 'https://newcool-cdn.s3.amazonaws.com/lessons/math-101-l009.mp4' }, order: 9 },
  { id: 'l010', courseId: 'math-101', moduleIndex: 3, lessonIndex: 2, title: 'Restando Visualmente', description: 'Usa objetos para entender la resta', type: 'interactive', duration: 20, content: { text: 'Actividad de resta visual' }, order: 10 },
  { id: 'l011', courseId: 'math-101', moduleIndex: 3, lessonIndex: 3, title: 'Práctica de Restas', description: 'Ejercicios de resta', type: 'interactive', duration: 25, content: { text: 'Resuelve las restas' }, order: 11 },
  { id: 'l012', courseId: 'math-101', moduleIndex: 3, lessonIndex: 4, title: 'Quiz: Resta', description: 'Evalúa tu habilidad de resta', type: 'quiz', duration: 10, content: {}, order: 12 },

  // Module 4: Geometría
  { id: 'l013', courseId: 'math-101', moduleIndex: 4, lessonIndex: 1, title: 'Formas Básicas', description: 'Círculo, cuadrado, triángulo, rectángulo', type: 'video', duration: 15, content: { videoUrl: 'https://newcool-cdn.s3.amazonaws.com/lessons/math-101-l013.mp4' }, order: 13 },
  { id: 'l014', courseId: 'math-101', moduleIndex: 4, lessonIndex: 2, title: 'Encontrando Formas', description: 'Identifica formas en tu entorno', type: 'interactive', duration: 20, content: { text: 'Busca formas a tu alrededor' }, order: 14 },
  { id: 'l015', courseId: 'math-101', moduleIndex: 4, lessonIndex: 3, title: 'Dibujando Formas', description: 'Aprende a dibujar formas geométricas', type: 'interactive', duration: 25, content: { text: 'Dibuja las formas' }, order: 15 },
  { id: 'l016', courseId: 'math-101', moduleIndex: 4, lessonIndex: 4, title: 'Quiz Final', description: 'Evaluación final del curso', type: 'quiz', duration: 15, content: {}, order: 16 },
];

// Sample quizzes
export const quizzes: Quiz[] = [
  {
    id: 'q001',
    courseId: 'math-101',
    lessonId: 'l004',
    title: 'Quiz: Números',
    description: 'Evalúa tu conocimiento de números del 1 al 100',
    passingScore: 70,
    timeLimit: 10,
    attempts: 3,
    questions: [
      { id: 'q001-1', type: 'multiple_choice', question: '¿Cuál número viene después del 15?', options: ['14', '16', '17', '13'], correctAnswer: '16', points: 10 },
      { id: 'q001-2', type: 'true_false', question: 'El número 8 es un número par', options: ['Verdadero', 'Falso'], correctAnswer: 'Verdadero', points: 10 },
      { id: 'q001-3', type: 'multiple_choice', question: '¿Cuántos dedos tienes en las dos manos?', options: ['5', '8', '10', '12'], correctAnswer: '10', points: 10 },
      { id: 'q001-4', type: 'fill_blank', question: 'El número ___ viene antes del 20', correctAnswer: '19', points: 10 },
      { id: 'q001-5', type: 'multiple_choice', question: '¿Cuál es un número impar?', options: ['2', '4', '7', '10'], correctAnswer: '7', points: 10 },
    ],
  },
  {
    id: 'q002',
    courseId: 'math-101',
    lessonId: 'l008',
    title: 'Quiz: Suma',
    description: 'Demuestra tu habilidad para sumar',
    passingScore: 70,
    timeLimit: 10,
    attempts: 3,
    questions: [
      { id: 'q002-1', type: 'multiple_choice', question: '¿Cuánto es 3 + 4?', options: ['6', '7', '8', '5'], correctAnswer: '7', points: 10 },
      { id: 'q002-2', type: 'multiple_choice', question: '¿Cuánto es 5 + 5?', options: ['9', '10', '11', '8'], correctAnswer: '10', points: 10 },
      { id: 'q002-3', type: 'fill_blank', question: '2 + 6 = ___', correctAnswer: '8', points: 10 },
      { id: 'q002-4', type: 'multiple_choice', question: '¿Cuánto es 1 + 9?', options: ['8', '9', '10', '11'], correctAnswer: '10', points: 10 },
      { id: 'q002-5', type: 'multiple_choice', question: '¿Cuánto es 7 + 2?', options: ['8', '9', '10', '7'], correctAnswer: '9', points: 10 },
    ],
  },
];

// In-memory storage
const progressData: Map<string, Progress> = new Map();
const certificates: Map<string, Certificate> = new Map();

// Helper functions
export function getCourse(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}

export function getCourseLessons(courseId: string): Lesson[] {
  return lessons.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order);
}

export function getLesson(id: string): Lesson | undefined {
  return lessons.find(l => l.id === id);
}

export function getCourseQuizzes(courseId: string): Quiz[] {
  return quizzes.filter(q => q.courseId === courseId);
}

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find(q => q.id === id);
}

export function enrollUser(userId: string, courseId: string): Progress {
  const key = `${userId}-${courseId}`;
  if (progressData.has(key)) {
    return progressData.get(key)!;
  }

  const progress: Progress = {
    id: `prog_${Date.now()}`,
    userId,
    courseId,
    enrolledAt: new Date().toISOString(),
    completedLessons: [],
    quizScores: [],
    progress: 0,
    status: 'enrolled',
    lastAccessedAt: new Date().toISOString(),
  };

  progressData.set(key, progress);

  // Update course enrollments
  const course = courses.find(c => c.id === courseId);
  if (course) {
    course.enrollments += 1;
  }

  return progress;
}

export function getUserProgress(userId: string, courseId: string): Progress | undefined {
  return progressData.get(`${userId}-${courseId}`);
}

export function getAllUserProgress(userId: string): Progress[] {
  return Array.from(progressData.values()).filter(p => p.userId === userId);
}

export function completeLesson(userId: string, courseId: string, lessonId: string): Progress | undefined {
  const key = `${userId}-${courseId}`;
  const progress = progressData.get(key);
  if (!progress) return undefined;

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }

  // Calculate progress percentage
  const courseLessons = getCourseLessons(courseId);
  progress.progress = Math.round((progress.completedLessons.length / courseLessons.length) * 100);
  progress.status = progress.progress === 100 ? 'completed' : 'in_progress';
  progress.lastAccessedAt = new Date().toISOString();

  if (progress.progress === 100) {
    progress.completedAt = new Date().toISOString();
  }

  progressData.set(key, progress);
  return progress;
}

export function submitQuiz(userId: string, courseId: string, quizId: string, score: number): Progress | undefined {
  const key = `${userId}-${courseId}`;
  const progress = progressData.get(key);
  if (!progress) return undefined;

  const quiz = getQuiz(quizId);
  if (!quiz) return undefined;

  const existingScore = progress.quizScores.find(q => q.quizId === quizId);
  if (existingScore) {
    existingScore.attempts += 1;
    if (score > existingScore.score) {
      existingScore.score = score;
    }
    if (score >= quiz.passingScore && !existingScore.passedAt) {
      existingScore.passedAt = new Date().toISOString();
    }
  } else {
    progress.quizScores.push({
      quizId,
      score,
      attempts: 1,
      passedAt: score >= quiz.passingScore ? new Date().toISOString() : undefined,
    });
  }

  progress.lastAccessedAt = new Date().toISOString();
  progressData.set(key, progress);
  return progress;
}

export function issueCertificate(userId: string, courseId: string, userName: string): Certificate | undefined {
  const progress = getUserProgress(userId, courseId);
  if (!progress || progress.progress < 100) return undefined;

  const course = getCourse(courseId);
  if (!course) return undefined;

  const certId = `cert_${Date.now()}`;
  const certificate: Certificate = {
    id: certId,
    userId,
    courseId,
    courseName: course.title,
    userName,
    issuedAt: new Date().toISOString(),
    certificateUrl: `https://newcool.io/certificates/${certId}`,
    verificationCode: `NC-${Date.now().toString(36).toUpperCase()}`,
  };

  certificates.set(certId, certificate);

  // Update progress status
  progress.status = 'certified';
  progressData.set(`${userId}-${courseId}`, progress);

  return certificate;
}

export function getCertificate(id: string): Certificate | undefined {
  return certificates.get(id);
}

export function getUserCertificates(userId: string): Certificate[] {
  return Array.from(certificates.values()).filter(c => c.userId === userId);
}

export function getEducationStats() {
  return {
    totalCourses: courses.length,
    totalLessons: lessons.length,
    totalQuizzes: quizzes.length,
    totalEnrollments: courses.reduce((sum, c) => sum + c.enrollments, 0),
    subjects: [...new Set(courses.map(c => c.subject))],
    levels: ['beginner', 'intermediate', 'advanced'],
    freeCoursesCount: courses.filter(c => c.isFree).length,
    paidCoursesCount: courses.filter(c => !c.isFree).length,
  };
}
