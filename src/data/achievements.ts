import type { Achievement, StrokeBasic, RadicalInfo } from '../types'

export const DEFAULT_ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  { id: 'first-steps', titulo: 'Primeros pasos', descripcion: 'Completar Lección 0', emoji: '🌱' },
  { id: 'icebreaker', titulo: 'Rompehielos', descripcion: 'Completar tu primera conversación de saludo', emoji: '🧊' },
  { id: 'chars-100', titulo: '100 caracteres', descripcion: 'Acumular 100 caracteres aprendidos', emoji: '🈵' },
  { id: 'writer-bronze', titulo: 'Escritor de bronce', descripcion: 'Precisión de escritura del 70%+', emoji: '✍️' },
  { id: 'writer-silver', titulo: 'Escritor de plata', descripcion: 'Precisión de escritura del 85%+', emoji: '🥈' },
  { id: 'writer-gold', titulo: 'Escritor de oro', descripcion: 'Precisión de escritura del 95%+', emoji: '🥇' },
  { id: 'streak-7', titulo: 'Racha de 7 días', descripcion: 'Estudiar 7 días seguidos', emoji: '🔥' },
  { id: 'streak-30', titulo: 'Racha de 30 días', descripcion: 'Estudiar 30 días seguidos', emoji: '🔥🔥' },
  { id: 'streak-100', titulo: 'Racha de 100 días', descripcion: 'Estudiar 100 días seguidos', emoji: '🔥🔥🔥' },
  { id: 'radical-master', titulo: 'Maestro de radicales', descripcion: 'Dominar los 30 radicales del Apéndice C', emoji: '🧩' },
  { id: 'polyglot', titulo: 'Políglota en construcción', descripcion: 'Completar las 20 lecciones', emoji: '🐉' },
  { id: 'hsk1', titulo: 'Examen HSK 1 simulado', descripcion: 'Superar el examen acumulativo final', emoji: '📜' },
]

export const BASIC_STROKES: StrokeBasic[] = [
  { nombre: '横 héng', simbolo: '一', descripcion: 'Trazo horizontal, de izquierda a derecha' },
  { nombre: '竖 shù', simbolo: '丨', descripcion: 'Trazo vertical, de arriba abajo' },
  { nombre: '撇 piě', simbolo: '丿', descripcion: 'Trazo diagonal hacia abajo-izquierda' },
  { nombre: '点 diǎn', simbolo: '丶', descripcion: 'Punto, de arriba hacia abajo-derecha' },
  { nombre: '捺 nà', simbolo: '乀', descripcion: 'Trazo diagonal hacia abajo-derecha' },
  { nombre: '折 zhé', simbolo: '𠃍', descripcion: 'Trazo que cambia de dirección (esquina)' },
  { nombre: '钩 gōu', simbolo: '亅', descripcion: 'Gancho al final de un trazo' },
]

export const COMMON_RADICALS: RadicalInfo[] = [
  { radical: '亻', significado: 'persona', ejemplo: '你', ejemploSignificado: 'tú' },
  { radical: '女', significado: 'mujer', ejemplo: '妈', ejemploSignificado: 'mamá' },
  { radical: '氵', significado: 'agua', ejemplo: '河', ejemploSignificado: 'río' },
  { radical: '木', significado: 'árbol/madera', ejemplo: '林', ejemploSignificado: 'bosque' },
  { radical: '言', significado: 'habla', ejemplo: '说', ejemploSignificado: 'hablar' },
  { radical: '口', significado: 'boca', ejemplo: '吃', ejemploSignificado: 'comer' },
  { radical: '饣', significado: 'comida', ejemplo: '饭', ejemploSignificado: 'arroz/comida' },
  { radical: '日', significado: 'sol/día', ejemplo: '明', ejemploSignificado: 'brillante' },
  { radical: '目', significado: 'ojo', ejemplo: '看', ejemploSignificado: 'mirar' },
  { radical: '忄', significado: 'corazón (emoción)', ejemplo: '您', ejemploSignificado: 'usted (formal)' },
  { radical: '土', significado: 'tierra', ejemplo: '地', ejemploSignificado: 'tierra/suelo' },
  { radical: '扌', significado: 'mano', ejemplo: '打', ejemploSignificado: 'golpear' },
  { radical: '阝', significado: 'colina/ciudad', ejemplo: '院', ejemploSignificado: 'patio' },
  { radical: '子', significado: 'hijo', ejemplo: '字', ejemploSignificado: 'carácter/letra' },
  { radical: '纟', significado: 'seda/hilo', ejemplo: '红', ejemploSignificado: 'rojo' },
  { radical: '王', significado: 'jade/rey', ejemplo: '玩', ejemploSignificado: 'jugar' },
  { radical: '车', significado: 'vehículo', ejemplo: '辆', ejemploSignificado: 'clasificador vehículos' },
  { radical: '火', significado: 'fuego', ejemplo: '热', ejemploSignificado: 'calor/caliente' },
  { radical: '心', significado: 'corazón', ejemplo: '想', ejemploSignificado: 'pensar/querer' },
  { radical: '手', significado: 'mano', ejemplo: '拿', ejemploSignificado: 'tomar/coger' },
  { radical: '足', significado: 'pie', ejemplo: '跑', ejemploSignificado: 'correr' },
  { radical: '山', significado: 'montaña', ejemplo: '岛', ejemploSignificado: 'isla' },
  { radical: '石', significado: 'piedra', ejemplo: '硬', ejemploSignificado: 'duro' },
  { radical: '虫', significado: 'insecto', ejemplo: '蚊', ejemploSignificado: 'mosquito' },
  { radical: '竹', significado: 'bambú', ejemplo: '笔', ejemploSignificado: 'pluma/lápiz' },
  { radical: '米', significado: 'arroz', ejemplo: '粉', ejemploSignificado: 'polvo/fideos' },
  { radical: '衣', significado: 'ropa', ejemplo: '被', ejemploSignificado: 'edredón' },
  { radical: '金', significado: 'metal/oro', ejemplo: '钱', ejemploSignificado: 'dinero' },
  { radical: '雨', significado: 'lluvia', ejemplo: '雪', ejemploSignificado: 'nieve' },
  { radical: '门', significado: 'puerta', ejemplo: '问', ejemploSignificado: 'preguntar' },
  { radical: '马', significado: 'caballo', ejemplo: '骑', ejemploSignificado: 'montar' },
]

export const RADICAL_PAIRS: { base: string; radical: string; result: string; meaning: string }[] = [
  { base: '也', radical: '女', result: '她', meaning: 'ella' },
  { base: '青', radical: '氵', result: '清', meaning: 'claro/limpio' },
  { base: '主', radical: '氵', result: '注', meaning: 'anotar/prestar atención' },
  { base: '可', radical: '口', result: '何', meaning: 'qué (en preguntas)' },
  { base: '子', radical: '女', result: '好', meaning: 'bueno/bien' },
  { base: '马', radical: '女', result: '妈', meaning: 'mamá' },
]

export const WORD_FORMATIONS: { base: string; words: string[]; meanings: string[] }[] = [
  { base: '高', words: ['高兴', '高大', '高中'], meanings: ['alegre', 'alto/grandote', 'instituto'] },
  { base: '学', words: ['学习', '学校', '学生'], meanings: ['estudiar', 'escuela', 'estudiante'] },
  { base: '中', words: ['中国', '中文', '中间'], meanings: ['China', 'chino', 'medio/centro'] },
  { base: '大', words: ['大学', '大家', '大小'], meanings: ['universidad', 'todos', 'tamaño'] },
  { base: '家', words: ['家人', '国家', '回家'], meanings: ['familia', 'país', 'volver a casa'] },
]
