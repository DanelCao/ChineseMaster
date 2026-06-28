import type { LessonMeta } from '../types'

export const LESSONS: LessonMeta[] = [
  { id: 0, titulo: 'Lección 0', tema: 'Números del 1 al 10, trazos fundamentales', emoji: '🔢✋', objetivo: 'Aprender los números básicos y los trazos fundamentales del chino.', tipo: 'leccion' },
  { id: 1, titulo: 'Lección 1', tema: 'Saludos y presentarse', emoji: '👋😊', objetivo: 'Saludar, preguntar el nombre y presentarte con cortesía.', tipo: 'leccion' },
  { id: 2, titulo: 'Lección 2', tema: 'Emociones, gustos y conocer gente', emoji: '😄❤️', objetivo: 'Expresar emociones, gustos y conocer a nuevas personas.', tipo: 'leccion' },
  { id: 3, titulo: 'Lección 3', tema: 'Familia, hogar y lugares', emoji: '🏠👨‍👩‍👧', objetivo: 'Hablar de la familia, el hogar y los lugares importantes.', tipo: 'leccion' },
  { id: 4, titulo: 'Lección 4', tema: 'Mapas, ver/mirar y querer algo', emoji: '🗺️👀', objetivo: 'Usar mapas, expresar deseos y hablar de lo que quieres ver.', tipo: 'leccion' },
  { id: 5, titulo: 'Lección 5', tema: 'Hermanos, señor/señora y pedir comida', emoji: '🍜👨‍🍳', objetivo: 'Pedir comida en restaurante y usar títulos de cortesía.', tipo: 'leccion' },
  { id: 6, titulo: 'Lección 6', tema: 'Días de la semana, semestre y la noche', emoji: '📅🌙', objetivo: 'Hablar del tiempo, días de la semana y rutinas nocturnas.', tipo: 'leccion' },
  { id: 7, titulo: 'Lección 7', tema: 'Entrar, vacaciones y días festivos', emoji: '🎉🚪', objetivo: 'Expresar invitaciones, vacaciones y días festivos.', tipo: 'leccion' },
  { id: 8, titulo: 'Lección 8', tema: 'Direcciones, cercanía y el banco', emoji: '🏦📍', objetivo: 'Dar direcciones, hablar de distancias y lugares cercanos.', tipo: 'leccion' },
  { id: 9, titulo: 'Lección 9', tema: 'Animales y mascotas', emoji: '🐶🐟', objetivo: 'Nombrar animales, mascotas y actividades relacionadas.', tipo: 'leccion' },
  { id: 10, titulo: 'Lección 10', tema: 'Vivienda, dormitorio y tipos de comida', emoji: '🛏️🍽️', objetivo: 'Describir vivienda, dormitorio y tipos de comida.', tipo: 'leccion' },
  { id: 11, titulo: 'Lección 11', tema: 'Biblioteca, préstamos y habitaciones', emoji: '📚🔑', objetivo: 'Usar la biblioteca, pedir prestado y describir habitaciones.', tipo: 'leccion' },
  { id: 12, titulo: 'Lección 12', tema: 'Complementos de grado, vida y actividades', emoji: '🎤🌱', objetivo: 'Usar complementos de grado y hablar de actividades diarias.', tipo: 'leccion' },
  { id: 13, titulo: 'Lección 13', tema: 'Clima, temperatura y estaciones', emoji: '☀️🌡️', objetivo: 'Describir el clima, temperatura y estaciones del año.', tipo: 'leccion' },
  { id: 14, titulo: 'Lección 14', tema: 'Geografía, puntos cardinales y zona rural', emoji: '🧭🌾', objetivo: 'Hablar de geografía, direcciones cardinales y el campo.', tipo: 'leccion' },
  { id: 15, titulo: 'Lección 15', tema: 'Presentaciones formales y profesiones', emoji: '🎓💼', objetivo: 'Presentarse formalmente y hablar de profesiones.', tipo: 'leccion' },
  { id: 16, titulo: 'Lección 16', tema: 'Transporte, puntualidad y planes', emoji: '🚲⏰', objetivo: 'Planificar viajes, transporte y puntualidad.', tipo: 'leccion' },
  { id: 17, titulo: 'Lección 17', tema: 'Alquilar, mudarse y vivienda', emoji: '📦🏡', objetivo: 'Alquilar casa, mudarse y usar condicionales.', tipo: 'leccion' },
  { id: 18, titulo: 'Lección 18', tema: 'Cultura china: ópera y artes marciales', emoji: '🎭🥋', objetivo: 'Conocer la ópera de Beijing y las artes marciales.', tipo: 'leccion' },
  { id: 19, titulo: 'Lección 19', tema: 'Problemas cotidianos y objetos perdidos', emoji: '😱☂️', objetivo: 'Expresar problemas cotidianos y objetos perdidos.', tipo: 'leccion' },
  { id: 20, titulo: 'Lección 20', tema: 'Banco, dinero y progreso/fluidez', emoji: '💰📈', objetivo: 'Operaciones bancarias, dinero y expresar progreso.', tipo: 'leccion' },
  { id: 21, titulo: 'Apéndice A', tema: 'Índice de caracteres 汉字索引', emoji: '🔍', objetivo: 'Buscar cualquier carácter del curso por lección.', tipo: 'apendice', apendiceId: 'A' },
  { id: 22, titulo: 'Apéndice B', tema: 'Trazos fundamentales y orden', emoji: '✍️📐', objetivo: 'Dominar los trazos básicos y reglas de orden.', tipo: 'apendice', apendiceId: 'B' },
  { id: 23, titulo: 'Apéndice C', tema: 'Radicales más comunes', emoji: '🧩🈯', objetivo: 'Aprender los radicales esenciales del chino.', tipo: 'apendice', apendiceId: 'C' },
  { id: 24, titulo: 'Apéndice D', tema: 'Banco de respuestas', emoji: '✅', objetivo: 'Autoevaluación y respuestas de ejercicios.', tipo: 'apendice', apendiceId: 'D' },
]

export function getLesson(id: number): LessonMeta | undefined {
  return LESSONS.find((l) => l.id === id)
}

export function getMainLessons(): LessonMeta[] {
  return LESSONS.filter((l) => l.tipo === 'leccion')
}

export function getAppendices(): LessonMeta[] {
  return LESSONS.filter((l) => l.tipo === 'apendice')
}
