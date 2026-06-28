import type { VocabItem } from '../../types'

type Raw = [string, string, 1|2|3|4|5, string, number, string[], string, string, string, string?, string?]

function v(leccion: number, i: number, [c, py, t, es, tr, rad, ec, ep, ee, nota, origen]: Raw, emoji?: string): VocabItem {
  return {
    id: `${String(leccion).padStart(2,'0')}${String(i).padStart(3,'0')}`,
    leccion, caracter: c, pinyin: py, tono: t, significado_es: es, trazos: tr, radicales: rad,
    nota_cultural: nota, origen_pictografico: origen,
    ejemplos: [{ chino: ec, pinyin: ep, es: ee }], emoji_tema: emoji,
  }
}

const L0: Raw[] = [
  ['一','yī',1,'uno',1,['一'],'一个人','Yī gè rén','una persona','El trazo horizontal es el primero que se aprende.'],
  ['二','èr',4,'dos',2,['二'],'二月','Èr yuè','febrero'],
  ['三','sān',1,'tres',3,['三'],'三个','Sān gè','tres (objetos)'],
  ['四','sì',4,'cuatro',5,['囗','儿'],'四个','Sì gè','cuatro'],
  ['五','wǔ',3,'cinco',4,['五'],'五个人','Wǔ gè rén','cinco personas'],
  ['六','liù',4,'seis',4,['亠','八'],'六点','Liù diǎn','seis en punto'],
  ['七','qī',1,'siete',2,['一','乚'],'七天','Qī tiān','siete días'],
  ['八','bā',1,'ocho',2,['八'],'八个','Bā gè','ocho'],
  ['九','jiǔ',3,'nueve',2,['九'],'九月','Jiǔ yuè','septiembre'],
  ['十','shí',2,'diez',2,['十'],'十分','Shí fēn','muy/mucho'],
  ['零','líng',2,'cero',13,['雨','令'],'零点','Líng diǎn','medianoche'],
  ['百','bǎi',3,'cien',6,['白'],'一百','Yī bǎi','cien'],
  ['千','qiān',1,'mil',3,['千'],'一千','Yī qiān','mil'],
  ['万','wàn',4,'diez mil',3,['一','力'],'一万','Yī wàn','diez mil'],
  ['两','liǎng',3,'dos (cantidad)',8,['一','冂','人'],'两个','Liǎng gè','dos (objetos)'],
  ['第','dì',4,'ordinal',11,['⺮','弟'],'第一','Dì yī','primero'],
  ['个','gè',4,'clasificador general',3,['人','丨'],'一个','Yī gè','uno/un'],
  ['点','diǎn',3,'punto/o\'clock',9,['占'],'几点','Jǐ diǎn','¿qué hora es?'],
  ['手','shǒu',3,'mano',4,['手'],'用手','Yòng shǒu','usar la mano','Los números se cuentan con los dedos.'],
  ['指','zhǐ',3,'dedo/señalar',9,['扌','旨'],'手指','Shǒu zhǐ','dedo'],
  ['数','shù',4,'número/contar',13,['米','大'],'数字','Shù zì','número/dígito'],
  ['多','duō',1,'muchos',6,['夕','夕'],'很多','Hěn duō','muchos'],
  ['少','shǎo',3,'pocos',4,['小','丿'],'很少','Hěn shǎo','muy pocos'],
  ['半','bàn',4,'medio',5,['八','牛'],'一半','Yī bàn','la mitad'],
  ['对','duì',4,'correcto/par',5,['又','寸'],'不对','Bú duì','incorrecto'],
  ['写','xiě',3,'escribir',5,['冖','与'],'写字','Xiě zì','escribir caracteres'],
  ['字','zì',4,'carácter/letra',6,['宀','子'],'汉字','Hàn zì','carácter chino'],
  ['横','héng',2,'trazo horizontal',15,['木'],'一横','Yī héng','un trazo horizontal'],
  ['竖','shù',4,'trazo vertical',9,['丨'],'一竖','Yī shù','un trazo vertical'],
  ['撇','piě',3,'trazo diagonal',14,['丿'],'一撇','Yī piě','trazo piě'],
  ['捺','nà',4,'trazo nà',8,['扌','奈'],'一捺','Yī nà','trazo nà'],
  ['钩','gōu',1,'gancho',9,['钅','勾'],'竖钩','Shù gōu','gancho vertical'],
]

const L1: Raw[] = [
  ['您','nín',2,'usted (formal)',11,['你','心'],'您好!','Nín hǎo!','¡Hola! (formal)','心 indica respeto hacia la persona.','Persona + corazón = respeto'],
  ['好','hǎo',3,'bueno/bien',6,['女','子'],'很好','Hěn hǎo','muy bien','Mujer + hijo = armonía = bien'],
  ['你','nǐ',3,'tú',7,['亻','尔'],'你好','Nǐ hǎo','hola (informal)'],
  ['我','wǒ',3,'yo',7,['手','戈'],'我是','Wǒ shì','yo soy'],
  ['姓','xìng',4,'apellido',8,['女','生'],'你姓什么?','Nǐ xìng shénme?','¿cómo te apellidas?'],
  ['名','míng',2,'nombre',6,['夕','口'],'名字','Míngzi','nombre'],
  ['叫','jiào',4,'llamarse',5,['口','丩'],'我叫王','Wǒ jiào Wáng','me llamo Wang'],
  ['是','shì',4,'ser/es',9,['日','正'],'是不是','Shì bu shì','¿sí o no?'],
  ['什么','shénme',2,'qué',9,['亻','申'],'什么名字','Shénme míngzi','¿qué nombre?'],
  ['吗','ma',5,'partícula interrogativa',6,['口','马'],'你好吗?','Nǐ hǎo ma?','¿cómo estás?'],
  ['王','Wáng',2,'apellido Wang',4,['王'],'我姓王','Wǒ xìng Wáng','mi apellido es Wang'],
  ['李','Lǐ',3,'apellido Li',7,['木','子'],'我姓李','Wǒ xìng Lǐ','mi apellido es Li'],
  ['张','Zhāng',1,'apellido Zhang',7,['弓','长'],'我姓张','Wǒ xìng Zhāng','mi apellido es Zhang'],
  ['贵','guì',4,'honorable/caro',9,['贝','中'],'您贵姓?','Nín guì xìng?','¿cuál es su apellido? (formal)'],
  ['姓','xìng',4,'apellido',8,['女','生'],'贵姓','Guì xìng','apellido honorable'],
  ['中国','Zhōngguó',1,'China',8,['口','玉'],'我是中国人','Wǒ shì Zhōngguó rén','soy chino'],
  ['中','zhōng',1,'medio/China',4,['丨','口'],'中文','Zhōngwén','idioma chino'],
  ['国','guó',2,'país',8,['囗','玉'],'国家','Guójiā','país/nación'],
  ['人','rén',2,'persona',2,['人'],'中国人','Zhōngguó rén','persona china'],
  ['法国','Fǎguó',3,'Francia',8,['氵','去'],'我是法国人','Wǒ shì Fǎguó rén','soy francés'],
  ['法','fǎ',3,'ley/método',8,['氵','去'],'法语','Fǎyǔ','idioma francés'],
  ['美国','Měiguó',3,'Estados Unidos',8,['羊','大'],'美国人','Měiguó rén','estadounidense'],
  ['日本','Rìběn',4,'Japón',4,['日','木'],'日本人','Rìběn rén','japonés'],
  ['西班牙','Xībānyá',1,'España',12,['西','班'],'西班牙人','Xībānyá rén','español'],
  ['学生','xuésheng',2,'estudiante',8,['子','生'],'我是学生','Wǒ shì xuésheng','soy estudiante'],
  ['学','xué',2,'estudiar',8,['子','冖'],'学习','Xuéxí','estudiar'],
  ['生','shēng',1,'nacer/vida',5,['生'],'先生','Xiānsheng','señor'],
  ['老师','lǎoshī',3,'profesor/a',6,['老','师'],'我的老师','Wǒ de lǎoshī','mi profesor/a'],
  ['老','lǎo',3,'viejo',6,['老'],'老朋友','Lǎo péngyou','viejo amigo'],
  ['师','shī',1,'maestro',6,['巾','帅'],'师傅','Shīfu','maestro (oficio)'],
  ['请','qǐng',3,'por favor/invitar',10,['讠','青'],'请进','Qǐng jìn','pase adelante'],
  ['问','wèn',4,'preguntar',6,['门','口'],'请问','Qǐng wèn','disculpe (pregunta)'],
  ['谢','xiè',4,'agradecer',12,['讠','射'],'谢谢','Xièxie','gracias'],
  ['不','bù',4,'no',4,['一','丿'],'不是','Bú shì','no es'],
  ['客气','kèqi',4,'formalidad',9,['宀','各'],'不客气','Bú kèqi','de nada'],
]

export function getLesson0(): VocabItem[] { return L0.map((r,i)=>v(0,i,r,'🔢')) }
export function getLesson1(): VocabItem[] { return L1.map((r,i)=>v(1,i,r,'👋')) }
