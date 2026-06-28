import type { VocabItem } from '../../types'

type Raw = [string, string, 1|2|3|4|5, string, number, string[], string, string, string, string?, string?]

function v(leccion: number, i: number, r: Raw, emoji?: string): VocabItem {
  const [c, py, t, es, tr, rad, ec, ep, ee, nota, origen] = r
  return { id: `${String(leccion).padStart(2,'0')}${String(i).padStart(3,'0')}`, leccion, caracter: c, pinyin: py, tono: t, significado_es: es, trazos: tr, radicales: rad, nota_cultural: nota, origen_pictografico: origen, ejemplos: [{ chino: ec, pinyin: ep, es: ee }], emoji_tema: emoji }
}

const mk = (n: number, emoji: string, rows: Raw[]) => rows.map((r,i)=>v(n,i,r,emoji))

const L2 = mk(2,'😄',[
  ['很','hěn',3,'muy',9,['彳','艮'],'很高兴','Hěn gāoxìng','muy contento'],
  ['高兴','gāoxìng',1,'contento/alegre',10,['高','兴'],'认识你很高兴','Rènshi nǐ hěn gāoxìng','encantado de conocerte','高 muestra un edificio alto','Edificio alto + emoción'],
  ['认识','rènshi',4,'conocer',7,['讠','人'],'认识你','Rènshi nǐ','conocerte'],
  ['喜欢','xǐhuan',1,'gustar',12,['喜','欢'],'我喜欢你','Wǒ xǐhuan nǐ','me gustas'],
  ['漂亮','piàoliang',4,'bonito/a',14,['氵','票'],'很漂亮','Hěn piàoliang','muy bonito'],
  ['爱','ài',4,'amar',10,['爫','冖'],'我爱你','Wǒ ài nǐ','te amo'],
  ['朋友','péngyou',2,'amigo/a',8,['月','月'],'好朋友','Hǎo péngyou','buen amigo'],
  ['高兴','gāoxìng',1,'alegre',10,['高','兴'],'今天很高兴','Jīntiān hěn gāoxìng','hoy estoy muy contento'],
  ['快乐','kuàilè',4,'feliz',7,['忄','夬'],'很快乐','Hěn kuàilè','muy feliz'],
  ['开心','kāixīn',1,'contento',6,['一','廾'],'很开心','Hěn kāixīn','muy contento'],
  ['难过','nánguò',4,'triste',11,['又','咼'],'很难过','Hěn nánguò','muy triste'],
  ['生气','shēngqì',1,'enfadado',9,['生','气'],'别生气','Bié shēngqì','no te enfades'],
  ['累','lèi',4,'cansado',11,['田','累'],'很累','Hěn lèi','muy cansado'],
  ['忙','máng',2,'ocupado',6,['亡','心'],'很忙','Hěn máng','muy ocupado'],
  ['想','xiǎng',3,'pensar/querer',13,['心','相'],'我想你','Wǒ xiǎng nǐ','te echo de menos'],
  ['觉得','juéde',2,'sentir/parecer',11,['见','兑'],'我觉得','Wǒ juéde','yo creo/siento'],
  ['太','tài',4,'demasiado',4,['大','丶'],'太好了','Tài hǎo le','demasiado bueno'],
  ['也','yě',3,'también',3,['也'],'我也去','Wǒ yě qù','yo también voy'],
  ['都','dōu',1,'todos',10,['者','阝'],'我们都','Wǒmen dōu','todos nosotros'],
  ['最','zuì',4,'el más',12,['曰','取'],'最好','Zuì hǎo','el mejor'],
  ['更','gèng',4,'aún más',7,['一','亘'],'更好','Gèng hǎo','aún mejor'],
  ['比较','bǐjiào',3,'comparar/bastante',10,['比','较'],'比较好','Bǐjiào hǎo','bastante bueno'],
  ['一样','yīyàng',4,'igual',6,['一','木'],'一样好','Yīyàng hǎo','igual de bueno'],
  ['不同','bùtóng',2,'diferente',6,['一','冋'],'不同','Bùtóng','diferente'],
  ['见面','jiànmiàn',4,'encontrarse',9,['见','面'],'很高兴见面','Hěn gāoxìng jiànmiàn','encantado de vernos'],
  ['介绍','jièshào',4,'presentar',8,['亻','召'],'介绍一下','Jièshào yīxià','presentar brevemente'],
  ['知道','zhīdào',1,'saber',8,['矢','口'],'不知道','Bù zhīdào','no sé'],
  ['明白','míngbai',2,'entender',8,['日','月'],'明白了','Míngbai le','entendido'],
  ['意思','yìsi',4,'significado',13,['音','心'],'什么意思','Shénme yìsi','¿qué significa?'],
  ['有趣','yǒuqù',3,'interesante',15,['有','曲'],'很有趣','Hěn yǒuqù','muy interesante'],
  ['好玩','hǎowán',3,'divertido',8,['女','子'],'很好玩','Hěn hǎowán','muy divertido'],
  ['音乐','yīnyuè',1,'música',13,['音','乐'],'喜欢音乐','Xǐhuan yīnyuè','me gusta la música'],
])

const L3 = mk(3,'🏠',[
  ['家','jiā',1,'casa/familia',10,['宀','豕'],'回家','Huí jiā','volver a casa','Cerdo bajo un techo = hogar','Un cerdo bajo un techo'],
  ['国家','guójiā',2,'país',8,['囗','玉'],'我的国家','Wǒ de guójiā','mi país'],
  ['地方','dìfang',4,'lugar',6,['土','方'],'什么地方','Shénme dìfang','¿qué lugar?'],
  ['大学','dàxué',4,'universidad',8,['大','学'],'上大学','Shàng dàxué','ir a la universidad'],
  ['一个人','yī gè rén',1,'solo/a',2,['人'],'一个人去','Yī gè rén qù','ir solo'],
  ['爸爸','bàba',4,'papá',8,['父','巴'],'我爸爸','Wǒ bàba','mi papá'],
  ['妈妈','māma',1,'mamá',6,['女','马'],'我妈妈','Wǒ māma','mi mamá'],
  ['哥哥','gēge',1,'hermano mayor',10,['可','可'],'我哥哥','Wǒ gēge','mi hermano mayor'],
  ['弟弟','dìdi',4,'hermano menor',7,['弓','丶'],'我弟弟','Wǒ dìdi','mi hermano menor'],
  ['姐姐','jiějie',3,'hermana mayor',8,['女','且'],'我姐姐','Wǒ jiějie','mi hermana mayor'],
  ['妹妹','mèimei',4,'hermana menor',8,['女','未'],'我妹妹','Wǒ mèimei','mi hermana menor'],
  ['孩子','háizi',2,'niño/a',9,['子','亥'],'孩子们','Háimen','los niños'],
  ['儿子','érzi',2,'hijo',6,['儿','子'],'我儿子','Wǒ érzi','mi hijo'],
  ['女儿','nǚ\'ér',3,'hija',6,['女','儿'],'我女儿','Wǒ nǚ\'ér','mi hija'],
  ['爷爷','yéye',2,'abuelo',6,['父','耶'],'我爷爷','Wǒ yéye','mi abuelo'],
  ['奶奶','nǎinai',3,'abuela',5,['女','乃'],'我奶奶','Wǒ nǎinai','mi abuela'],
  ['家','jiā',1,'familia',10,['宀','豕'],'家人','Jiārén','familiares'],
  ['住','zhù',4,'vivir',7,['亻','主'],'住在北京','Zhù zài Běijīng','vivir en Pekín'],
  ['房间','fángjiān',2,'habitación',8,['户','间'],'我的房间','Wǒ de fángjiān','mi habitación'],
  ['厨房','chúfáng',2,'cocina',12,['厂','房'],'在厨房','Zài chúfáng','en la cocina'],
  ['客厅','kètīng',4,'salón',9,['宀','丁'],'在客厅','Zài kètīng','en el salón'],
  ['学校','xuéxiào',2,'escuela',8,['子','交'],'去学校','Qù xuéxiào','ir a la escuela'],
  ['工作','gōngzuò',1,'trabajo',7,['工','作'],'去工作','Qù gōngzuò','ir a trabajar'],
  ['公司','gōngsī',1,'empresa',5,['公','司'],'在公司','Zài gōngsī','en la empresa'],
  ['医院','yīyuàn',1,'hospital',9,['匸','院'],'去医院','Qù yīyuàn','ir al hospital'],
  ['商店','shāngdiàn',1,'tienda',8,['亠','口'],'去商店','Qù shāngdiàn','ir a la tienda'],
  ['公园','gōngyuán',1,'parque',8,['八','元'],'去公园','Qù gōngyuán','ir al parque'],
  ['城市','chéngshì',2,'ciudad',9,['土','成'],'大城市','Dà chéngshì','gran ciudad'],
  ['农村','nóngcūn',2,'campo/pueblo',7,['冖','寸'],'在农村','Zài nóngcūn','en el campo'],
  ['附近','fùjìn',4,'cerca',8,['阝','付'],'家附近','Jiā fùjìn','cerca de casa'],
  ['远','yuǎn',3,'lejos',7,['辶','袁'],'很远','Hěn yuǎn','muy lejos'],
  ['近','jìn',4,'cerca',7,['辶','斤'],'很近','Hěn jìn','muy cerca'],
])

const L4 = mk(4,'🗺️',[
  ['地图','dìtú',4,'mapa',7,['土','者'],'看地图','Kàn dìtú','mirar el mapa'],
  ['看','kàn',4,'mirar/ver',9,['手','目'],'看书','Kàn shū','leer/libro'],
  ['张','zhāng',1,'clasificador/abrir',7,['弓','长'],'一张地图','Yī zhāng dìtú','un mapa'],
  ['要','yào',4,'querer/necesitar',9,['西','女'],'要什么','Yào shénme','¿qué quieres?'],
  ['行','xíng',2,'vale/ir bien',6,['彳','亍'],'不行','Bù xíng','no vale','Persona caminando = ir/adecuado'],
  ['可以','kěyǐ',3,'poder/se puede',5,['口','以'],'可以吗?','Kěyǐ ma?','¿se puede?'],
  ['想','xiǎng',3,'querer/pensar',13,['心','相'],'我想看','Wǒ xiǎng kàn','quiero ver'],
  ['买','mǎi',3,'comprar',6,['乛','头'],'买东西','Mǎi dōngxi','comprar cosas'],
  ['卖','mài',4,'vender',8,['十','买'],'卖东西','Mài dōngxi','vender cosas'],
  ['东西','dōngxi',1,'cosa/cosas',8,['一','小'],'什么东西','Shénme dōngxi','¿qué cosa?'],
  ['钱','qián',2,'dinero',10,['钅','戋'],'多少钱','Duōshao qián','¿cuánto cuesta?'],
  ['贵','guì',4,'caro',9,['贝','贵'],'太贵了','Tài guì le','demasiado caro'],
  ['便宜','piányi',2,'barato',12,['亻','便'],'很便宜','Hěn piányi','muy barato'],
  ['给','gěi',3,'dar/a',9,['纟','合'],'给我','Gěi wǒ','dame'],
  ['用','yòng',4,'usar',5,['用'],'用什么','Yòng shénme','¿con qué?'],
  ['找','zhǎo',3,'buscar',7,['扌','戈'],'找地图','Zhǎo dìtú','buscar el mapa'],
  ['到','dào',4,'llegar/a',8,['至','刂'],'到了','Dào le','llegué'],
  ['去','qù',4,'ir',5,['土','厶'],'去那里','Qù nàlǐ','ir allí'],
  ['来','lái',2,'venir',7,['一','米'],'来这里','Lái zhèlǐ','venir aquí'],
  ['走','zǒu',3,'caminar/irse',7,['走'],'走吧','Zǒu ba','vámonos'],
  ['路','lù',4,'camino/calle',13,['足','各'],'这条路','Zhè tiáo lù','este camino'],
  ['方向','fāngxiàng',1,'dirección',6,['方','向'],'什么方向','Shénme fāngxiàng','¿qué dirección?'],
  ['东','dōng',1,'este',8,['一','小'],'东边','Dōngbian','lado este'],
  ['西','xī',1,'oeste',6,['西'],'西边','Xībian','lado oeste'],
  ['南','nán',2,'sur',9,['十','冂'],'南边','Nánbian','lado sur'],
  ['北','běi',3,'norte',5,['北'],'北边','Běibian','lado norte'],
  ['左','zuǒ',3,'izquierda',5,['工','一'],'往左','Wǎng zuǒ','hacia la izquierda'],
  ['右','yòu',4,'derecha',5,['口','又'],'往右','Wǎng yòu','hacia la derecha'],
  ['前','qián',2,'delante',9,['刂','月'],'前面','Qiánmiàn','delante'],
  ['后','hòu',4,'detrás',6,['彳','口'],'后面','Hòumiàn','detrás'],
  ['这里','zhèlǐ',3,'aquí',7,['辶','文'],'在这里','Zài zhèlǐ','aquí'],
  ['那里','nàlǐ',4,'allí',7,['辶','那'],'在那里','Zài nàlǐ','allí'],
])

export function getLesson2(){ return L2 }
export function getLesson3(){ return L3 }
export function getLesson4(){ return L4 }
