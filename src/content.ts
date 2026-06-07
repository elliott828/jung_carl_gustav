export type Lang = 'zh' | 'en' | 'ja'
export type Track = 'people' | 'theories'

export interface LocalizedText {
  zh: string
  en: string
  ja: string
}

export interface Source {
  label: string
  url: string
}

export interface TimelineEntry {
  year: string
  text: LocalizedText
}

export interface BookLink {
  lang: Lang
  label: string
  url: string
}

export interface WorkItem {
  title: LocalizedText
  coverUrl?: string
  links?: BookLink[]
}

export interface ProfileSection {
  title: LocalizedText
  body: LocalizedText
}

export interface NodeItem {
  id: string
  track: Track
  title: LocalizedText
  subtitle: LocalizedText
  summary: LocalizedText
  tags: string[]
  year?: string
  weight: number
  color: string
  related: string[]
  timeline: TimelineEntry[]
  works: WorkItem[]
  achievements: LocalizedText[]
  influence: LocalizedText
  sources: Source[]
  nationality?: LocalizedText
  places?: LocalizedText
  generation?: 'Jung' | '+1' | '+2' | '+3'
  firstContact?: string
  photoUrl?: string
  photoCredit?: string
  sections?: ProfileSection[]
}

export interface LinkItem {
  source: string
  target: string
  label: LocalizedText
}

const t = (zh: string, en: string, ja: string): LocalizedText => ({ zh, en, ja })

const searchLinks = (query: string): BookLink[] => [
  { lang: 'zh', label: '豆瓣', url: `https://search.douban.com/book/subject_search?search_text=${encodeURIComponent(query)}` },
  { lang: 'en', label: 'Goodreads', url: `https://www.goodreads.com/search?q=${encodeURIComponent(query)}` },
  { lang: 'ja', label: '読書メーター', url: `https://bookmeter.com/search?keyword=${encodeURIComponent(query)}` },
]

const cover = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`

const jungSources: Source[] = [
  { label: 'Britannica: Carl Jung', url: 'https://www.britannica.com/biography/Carl-Jung' },
  { label: 'Philemon Foundation', url: 'https://philemonfoundation.org/' },
]

const instituteSource: Source = { label: 'C. G. Jung Institute Zurich: History', url: 'https://junginstitut.ch/en/About-Us/History' }

export const nodes: NodeItem[] = [
  {
    id: 'jung',
    track: 'people',
    title: t('卡尔·古斯塔夫·荣格', 'Carl Gustav Jung', 'カール・グスタフ・ユング'),
    subtitle: t('分析心理学的创立者', 'Founder of analytical psychology', '分析心理学の創始者'),
    summary: t(
      '瑞士精神科医生与心理学家。他把临床经验、梦、神话、宗教象征和人格发展组织成分析心理学体系。',
      'Swiss psychiatrist and psychologist who organized clinical work, dreams, myth, religious symbolism, and personality development into analytical psychology.',
      'スイスの精神科医・心理学者。臨床、夢、神話、宗教象徴、人格発達を分析心理学として組織した。',
    ),
    nationality: t('瑞士', 'Swiss', 'スイス'),
    places: t('巴塞尔、苏黎世、库斯纳赫特、布尔格赫尔茨利医院', 'Basel, Zurich, Kusnacht, Burgholzli clinic', 'バーゼル、チューリヒ、キュスナハト、ブルクヘルツリ病院'),
    generation: 'Jung',
    firstContact: '1900',
    tags: ['founder', 'Zurich', '1875-1961'],
    year: '1875-1961',
    weight: 30,
    color: '#00a7a5',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/ETH-BIB-Jung%2C_Carl_Gustav_%281875-1961%29-Portrait-Portr_14163_%28cropped%29.tif/lossy-page1-330px-ETH-BIB-Jung%2C_Carl_Gustav_%281875-1961%29-Portrait-Portr_14163_%28cropped%29.tif.jpg',
    photoCredit: 'Wikimedia Commons / ETH-Bibliothek',
    related: ['analytical-psychology', 'collective-unconscious', 'archetypes', 'individuation', 'freud', 'von-franz', 'jacobi', 'hannah'],
    timeline: [
      { year: '1875', text: t('出生于瑞士凯斯维尔。', 'Born in Kesswil, Switzerland.', 'スイス・ケスヴィルに生まれる。') },
      { year: '1900', text: t('进入苏黎世布尔格赫尔茨利医院，在布洛伊勒体系内工作。', 'Joined the Burgholzli clinic in Zurich under the Bleuler milieu.', 'チューリヒのブルクヘルツリ病院でブロイラーのもと勤務。') },
      { year: '1907-1913', text: t('与弗洛伊德密切合作，随后因 libido、宗教和无意识理论分歧而决裂。', 'Worked with Freud, then split over libido, religion, and theories of the unconscious.', 'フロイトと協力後、リビドー・宗教・無意識論をめぐって分岐。') },
      { year: '1948', text: t('苏黎世 C. G. Jung Institute 成立，荣格体系开始制度化传承。', 'The C. G. Jung Institute Zurich was founded, institutionalizing Jungian training.', 'C. G. ユング研究所が設立され、教育制度が整う。') },
      { year: '1961', text: t('逝世于瑞士库斯纳赫特。', 'Died in Kusnacht, Switzerland.', 'スイス・キュスナハトで没する。') },
    ],
    sections: [
      { title: t('生平', 'Life', '生涯'), body: t('荣格先在医学和精神病学语境中工作，随后把临床材料与宗教史、神话学和象征研究结合起来。他的工作地点长期围绕苏黎世与库斯纳赫特展开。', 'Jung began within medicine and psychiatry, then combined clinical material with religious history, mythology, and symbolism. Zurich and Kusnacht remained the center of his work.', '医学・精神医学から出発し、臨床素材を宗教史、神話学、象徴研究と結びつけた。活動の中心はチューリヒとキュスナハトだった。') },
      { title: t('贡献', 'Contribution', '貢献'), body: t('其核心贡献在于把个人无意识之外的集体层面、反复出现的原型图像、人格面具/阴影、阿尼玛/阿尼姆斯和个体化过程连成一个解释系统。', 'His core contribution was to connect collective unconscious, archetypal images, persona/shadow, anima/animus, and individuation into one interpretive system.', '集合的無意識、元型イメージ、ペルソナ／影、アニマ／アニムス、個性化を一つの解釈体系に結びつけた。') },
    ],
    works: [
      { title: t('《心理类型》', 'Psychological Types', '『タイプ論』'), coverUrl: cover('0691018138'), links: searchLinks('Psychological Types Carl Jung') },
      { title: t('《原型与集体无意识》', 'The Archetypes and the Collective Unconscious', '『元型と集合的無意識』'), coverUrl: cover('0691018332'), links: searchLinks('The Archetypes and the Collective Unconscious') },
      { title: t('《回忆·梦·思考》', 'Memories, Dreams, Reflections', '『ユング自伝』'), coverUrl: cover('0679723951'), links: searchLinks('Memories Dreams Reflections Jung') },
    ],
    achievements: [
      t('建立分析心理学体系。', 'Established analytical psychology.', '分析心理学の体系を築いた。'),
      t('将梦、神话、宗教、炼金术和象征纳入心理学解释。', 'Integrated dreams, myth, religion, alchemy, and symbols into psychological interpretation.', '夢、神話、宗教、錬金術、象徴を心理学的解釈へ取り込んだ。'),
    ],
    influence: t('影响心理治疗、宗教学、文学批评、艺术理论、人格类型文化和后荣格派理论。', 'Influenced psychotherapy, religious studies, literary criticism, art theory, personality culture, and post-Jungian theory.', '心理療法、宗教学、文芸批評、芸術理論、人格類型文化、ポスト・ユング理論に影響。'),
    sources: jungSources,
  },
  {
    id: 'freud',
    track: 'people',
    title: t('西格蒙德·弗洛伊德', 'Sigmund Freud', 'ジークムント・フロイト'),
    subtitle: t('精神分析创立者，荣格早期关键关联人物', 'Founder of psychoanalysis and Jung’s early counterpart', '精神分析の創始者、ユング初期の重要人物'),
    summary: t('弗洛伊德不是荣格学生，却是人物线的起点性关联：荣格体系的独立正是在与精神分析的合作与分裂中成形。', 'Freud was not Jung’s student, but the collaboration and split with psychoanalysis shaped Jung’s independent system.', 'フロイトは弟子ではないが、協力と分裂がユング体系の独立を形作った。'),
    nationality: t('奥地利', 'Austrian', 'オーストリア'),
    places: t('维也纳、伦敦；与荣格通过国际精神分析运动产生联系', 'Vienna and London; connected with Jung through the psychoanalytic movement', 'ウィーン、ロンドン；精神分析運動を通じてユングと接点'),
    generation: 'Jung',
    firstContact: '1907',
    tags: ['psychoanalysis', 'split', '1907'],
    year: '1856-1939',
    weight: 19,
    color: '#ff5c7a',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Sigmund_Freud%2C_by_Max_Halberstadt_%28cropped%29.jpg/330px-Sigmund_Freud%2C_by_Max_Halberstadt_%28cropped%29.jpg',
    photoCredit: 'Wikimedia Commons / Max Halberstadt',
    related: ['jung', 'analytical-psychology', 'collective-unconscious'],
    timeline: [
      { year: '1907', text: t('荣格与弗洛伊德首次会面。', 'Jung and Freud first met.', 'ユングとフロイトが初めて会う。') },
      { year: '1913', text: t('两人的理论与组织关系破裂。', 'Their theoretical and institutional relationship broke down.', '理論的・組織的関係が決裂。') },
    ],
    sections: [
      { title: t('与荣格的关系', 'Relation to Jung', 'ユングとの関係'), body: t('弗洛伊德为荣格提供了无意识研究和国际精神分析组织的入口；荣格则在宗教象征、集体无意识和 libido 理解上走向独立。', 'Freud gave Jung an entry into unconscious research and the psychoanalytic movement; Jung departed over religious symbolism, collective unconscious, and libido.', 'フロイトは無意識研究と精神分析運動への入口を与え、ユングは宗教象徴、集合的無意識、リビドー理解で独立した。') },
    ],
    works: [
      { title: t('《梦的解析》', 'The Interpretation of Dreams', '『夢判断』'), coverUrl: cover('0465019773'), links: searchLinks('The Interpretation of Dreams Freud') },
      { title: t('《精神分析引论》', 'Introductory Lectures on Psycho-Analysis', '『精神分析入門』'), coverUrl: cover('0393007433'), links: searchLinks('Introductory Lectures on Psycho-Analysis Freud') },
    ],
    achievements: [
      t('创立精神分析。', 'Founded psychoanalysis.', '精神分析を創始した。'),
      t('把无意识、梦和症状解释推入现代思想中心。', 'Made unconscious, dreams, and symptoms central to modern thought.', '無意識、夢、症状解釈を近代思想の中心にした。'),
    ],
    influence: t('荣格体系既继承精神分析的问题意识，也通过象征和集体层面的理论与之分离。', 'Jung inherited psychoanalytic questions while separating through symbolism and collective layers.', 'ユングは問題意識を継承しつつ、象徴と集合的層によって分岐した。'),
    sources: [{ label: 'Britannica: Sigmund Freud', url: 'https://www.britannica.com/biography/Sigmund-Freud' }],
  },
  {
    id: 'emma-jung',
    track: 'people',
    title: t('艾玛·荣格', 'Emma Jung', 'エンマ・ユング'),
    subtitle: t('早期荣格圈成员，阿尼玛/阿尼姆斯研究者', 'Early Jungian circle member; writer on anima/animus', '初期ユング派、アニマ／アニムス研究者'),
    summary: t('艾玛·荣格既是荣格生活伴侣，也是早期分析心理学圈的重要参与者，尤其围绕性别化内在形象和圣杯象征展开研究。', 'Emma Jung was Jung’s partner and an important participant in the early analytical psychology circle, especially around gendered inner images and Grail symbolism.', 'ユングの伴侶であり初期分析心理学圏の重要人物。性別化された内的イメージと聖杯象徴を研究した。'),
    nationality: t('瑞士', 'Swiss', 'スイス'),
    places: t('库斯纳赫特、苏黎世', 'Kusnacht and Zurich', 'キュスナハト、チューリヒ'),
    generation: '+1',
    firstContact: '1903',
    tags: ['+1', 'anima', 'grail'],
    year: '1882-1955',
    weight: 16,
    color: '#f6b73c',
    related: ['jung', 'anima-animus', 'archetypes', 'von-franz'],
    timeline: [
      { year: '1903', text: t('与荣格结婚，并进入其生活与思想圈。', 'Married Jung and entered his life and intellectual circle.', 'ユングと結婚し、生活と思想の圏に入る。') },
      { year: '1955', text: t('逝世；其圣杯研究后由冯·弗兰茨协助完成出版。', 'Died; her Grail study was later completed for publication with von Franz’s help.', '没後、聖杯研究はフォン・フランツの助力で刊行された。') },
    ],
    sections: [
      { title: t('贡献', 'Contribution', '貢献'), body: t('她把阿尼玛/阿尼姆斯从荣格理论中提取出来，结合临床经验和象征材料进行更集中讨论。', 'She focused anima/animus as a theme in Jungian theory, combining clinical experience with symbolic material.', 'アニマ／アニムスをユング理論から主題化し、臨床経験と象徴資料を結びつけた。') },
    ],
    works: [
      { title: t('《阿尼玛与阿尼姆斯》', 'Animus and Anima', '『アニムスとアニマ』'), coverUrl: cover('0882143017'), links: searchLinks('Emma Jung Animus and Anima') },
      { title: t('《圣杯传说》', 'The Grail Legend', '『聖杯伝説』'), coverUrl: cover('0691020604'), links: searchLinks('Emma Jung The Grail Legend') },
    ],
    achievements: [t('拓展阿尼玛/阿尼姆斯概念的象征解释。', 'Developed symbolic readings of anima and animus.', 'アニマ／アニムス概念の象徴的解釈を発展させた。')],
    influence: t('帮助后来的荣格派理解性别化内在形象、关系投射和中世纪象征材料。', 'Helped later Jungians read gendered inner images, projection, and medieval symbolism.', '後のユング派による内的イメージ、投影、中世象徴の理解に影響。'),
    sources: [{ label: 'Inner City Books: Emma Jung', url: 'https://innercitybooks.net/authors/emma-jung/' }],
  },
  {
    id: 'jacobi',
    track: 'people',
    title: t('约兰德·雅各比', 'Jolande Jacobi', 'ヨランデ・ヤコービ'),
    subtitle: t('荣格理论的系统化阐释者', 'Systematizer of Jungian theory', 'ユング理論の体系的解説者'),
    summary: t('雅各比 1927 年与荣格相识，后来参与苏黎世 C. G. Jung Institute 的创立与课程建设，被视为荣格理论的重要整理者。', 'Jacobi met Jung in 1927 and later helped shape the C. G. Jung Institute Zurich; she became a key expositor of Jung’s system.', '1927年にユングと出会い、C. G. ユング研究所の形成に関わった重要な解説者。'),
    nationality: t('匈牙利出生，后在瑞士工作', 'Hungarian-born; worked in Switzerland', 'ハンガリー生まれ、スイスで活動'),
    places: t('维也纳、苏黎世', 'Vienna and Zurich', 'ウィーン、チューリヒ'),
    generation: '+1',
    firstContact: '1927',
    tags: ['+1', 'Zurich Institute', 'expositor'],
    year: '1890-1973',
    weight: 17,
    color: '#6c5ce7',
    related: ['jung', 'analytical-psychology', 'archetypes'],
    timeline: [
      { year: '1927', text: t('与荣格相识。', 'Met Jung.', 'ユングと出会う。') },
      { year: '1948', text: t('参与 C. G. Jung Institute Zurich 早期建设。', 'Helped establish the C. G. Jung Institute Zurich.', 'C. G. ユング研究所の初期形成に関与。') },
    ],
    sections: [
      { title: t('贡献', 'Contribution', '貢献'), body: t('她的工作把荣格复杂的概念整理为更可教学、可阅读的理论结构，在荣格派训练中具有基础性作用。', 'Her work made Jung’s complex concepts teachable and readable, giving her a foundational role in Jungian training.', '複雑な概念を教育可能で読みやすい構造へ整理し、訓練上の基礎となった。') },
    ],
    works: [
      { title: t('《荣格心理学》', 'The Psychology of C. G. Jung', '『C・G・ユングの心理学』'), coverUrl: cover('0300016747'), links: searchLinks('The Psychology of C.G. Jung Jolande Jacobi') },
      { title: t('《复杂、原型与象征》', 'Complex, Archetype, Symbol', '『コンプレックス・元型・象徴』'), coverUrl: cover('0691017743'), links: searchLinks('Complex Archetype Symbol Jolande Jacobi') },
    ],
    achievements: [t('系统化阐释荣格理论。', 'Systematized Jungian theory.', 'ユング理論を体系的に解説した。')],
    influence: t('成为读者和训练者进入荣格体系的重要入口。', 'Became a major entry point into Jung’s system for readers and trainees.', '読者と訓練生がユング体系に入る主要な入口となった。'),
    sources: [instituteSource, { label: 'Yale University Press: The Psychology of C. G. Jung', url: 'https://yalebooks.yale.edu/book/9780300016741/the-psychology-of-c-g-jung/' }],
  },
  {
    id: 'hannah',
    track: 'people',
    title: t('芭芭拉·汉娜', 'Barbara Hannah', 'バーバラ・ハンナ'),
    subtitle: t('荣格亲近学生与传记作者', 'Close Jungian student and biographer', 'ユングに近い弟子・伝記作者'),
    summary: t('汉娜 1929 年到苏黎世追随荣格，长期作为分析师、教师和作者工作，以贴近荣格生活与人格的传记写作知名。', 'Hannah joined Jung in Zurich in 1929 and worked as analyst, teacher, and author; her biography is valued for its proximity to Jung’s life.', '1929年にチューリヒでユングに合流し、分析家・教師・著者として活動。近い距離からの伝記で知られる。'),
    nationality: t('英国', 'British', 'イギリス'),
    places: t('布莱顿、苏黎世、库斯纳赫特', 'Brighton, Zurich, Kusnacht', 'ブライトン、チューリヒ、キュスナハト'),
    generation: '+1',
    firstContact: '1929',
    tags: ['+1', 'biography', 'active imagination'],
    year: '1891-1986',
    weight: 17,
    color: '#ff7675',
    related: ['jung', 'von-franz', 'active-imagination', 'individuation'],
    timeline: [
      { year: '1929', text: t('到苏黎世加入荣格周围的学习与分析圈。', 'Moved to Zurich and joined Jung’s circle.', 'チューリヒに移りユングの周辺に加わる。') },
      { year: '1976', text: t('出版《荣格：生平与工作》。', 'Published Jung: His Life and Work.', '『ユング：その生涯と仕事』を出版。') },
    ],
    sections: [
      { title: t('主要经历', 'Life and work', '主な経歴'), body: t('汉娜早年受绘画训练，后来在瑞士长期从事荣格派分析与教学。她与冯·弗兰茨关系密切，二人共同生活多年。', 'Trained first as a painter, Hannah later practiced and taught Jungian analysis in Switzerland. She was close to Marie-Louise von Franz and lived with her for many years.', '画家として訓練を受けた後、スイスで分析と教育に携わった。フォン・フランツと親しく、長く共同生活を送った。') },
      { title: t('贡献', 'Contribution', '貢献'), body: t('她的价值在于把荣格作为人、分析师和思想家的生活细节保留下来，同时继续发展积极想象与个体化主题。', 'Her importance lies in preserving Jung’s life as person, analyst, and thinker, while developing themes of active imagination and individuation.', '人物、分析家、思想家としてのユングの生活を保存し、能動的想像と個性化の主題を発展させた。') },
    ],
    works: [
      { title: t('《荣格：生平与工作》', 'Jung: His Life and Work', '『ユング：その生涯と仕事』'), coverUrl: cover('087773455X'), links: searchLinks('Barbara Hannah Jung His Life and Work') },
      { title: t('《与灵魂相遇》', 'Encounters with the Soul', '『魂との出会い』'), coverUrl: cover('1888602022'), links: searchLinks('Barbara Hannah Encounters with the Soul') },
    ],
    achievements: [t('保存并阐释荣格身边的第一手经验。', 'Preserved and interpreted first-hand experience of Jung’s circle.', 'ユング周辺の一次的経験を保存し解釈した。')],
    influence: t('对理解荣格人格、日常工作方式和积极想象实践很重要。', 'Important for understanding Jung’s personality, daily working style, and active imagination.', 'ユングの人格、日常の仕事、能動的想像を理解するうえで重要。'),
    sources: [{ label: 'Tandfonline: The introverted Jung, conversations with Barbara Hannah', url: 'https://www.tandfonline.com/doi/abs/10.1080/00332928808410422' }, { label: 'Assisi Institute: Founding Women of Jungian Psychology', url: 'https://www.assisiinstitute.com/founding-women-jungian-psychology.html' }],
  },
  {
    id: 'von-franz',
    track: 'people',
    title: t('玛丽-路易丝·冯·弗兰茨', 'Marie-Louise von Franz', 'マリー＝ルイーズ・フォン・フランツ'),
    subtitle: t('童话、炼金术与积极想象的核心继承者', 'Major successor on fairy tales, alchemy, and active imagination', '童話・錬金術・能動的想像の主要継承者'),
    summary: t('冯·弗兰茨 1933 年开始接触荣格，长期协助其研究，后成为童话、梦、炼金术和数等主题的代表性荣格派作者。', 'Von Franz began contact with Jung in 1933, assisted his research, and became a major Jungian author on fairy tales, dreams, alchemy, and number.', '1933年からユングと関わり、研究を助け、童話・夢・錬金術・数の代表的著者となった。'),
    nationality: t('瑞士', 'Swiss', 'スイス'),
    places: t('苏黎世、库斯纳赫特、博林根', 'Zurich, Kusnacht, Bollingen', 'チューリヒ、キュスナハト、ボリンゲン'),
    generation: '+1',
    firstContact: '1933',
    tags: ['+1', 'fairy tales', 'alchemy'],
    year: '1915-1998',
    weight: 20,
    color: '#00cec9',
    related: ['jung', 'hannah', 'active-imagination', 'archetypes', 'individuation'],
    timeline: [
      { year: '1933', text: t('开始接触荣格并进入其工作圈。', 'Began contact with Jung and entered his working circle.', 'ユングとの関わりが始まる。') },
      { year: '1940s-1990s', text: t('持续出版童话、梦、炼金术与积极想象相关著作。', 'Published widely on fairy tales, dreams, alchemy, and active imagination.', '童話、夢、錬金術、能動的想像に関する著作を刊行。') },
    ],
    sections: [
      { title: t('贡献', 'Contribution', '貢献'), body: t('她将荣格原型理论应用到大量童话和炼金术材料，提供了细密的文本解释范式。', 'She applied archetypal theory to extensive fairy-tale and alchemical material, offering a detailed model of textual interpretation.', '元型理論を童話・錬金術資料へ適用し、精密な解釈モデルを示した。') },
    ],
    works: [
      { title: t('《童话中的原型模式》', 'Archetypal Patterns in Fairy Tales', '『童話における元型的パターン』'), coverUrl: cover('0919123774'), links: searchLinks('Archetypal Patterns in Fairy Tales von Franz') },
      { title: t('《积极想象》', 'On Active Imagination', '『能動的想像について』'), coverUrl: cover('1570621981'), links: searchLinks('Marie-Louise von Franz Active Imagination') },
    ],
    achievements: [t('将童话解释发展为荣格派训练中的核心材料。', 'Made fairy-tale interpretation a core Jungian training material.', '童話解釈をユング派訓練の中心的素材にした。')],
    influence: t('是荣格后继者中最重要、最广泛阅读的作者之一。', 'One of the most important and widely read successors of Jung.', 'ユング後継者の中でも最重要かつ広く読まれる著者の一人。'),
    sources: [{ label: 'C. G. Jung Institute Zurich: Marie-Louise von Franz', url: 'https://junginstitut.ch/en/about-us/history/marie-louise-von-franz/' }],
  },
  {
    id: 'neumann',
    track: 'people',
    title: t('埃里希·诺伊曼', 'Erich Neumann', 'エーリヒ・ノイマン'),
    subtitle: t('意识发展与大母神理论的扩展者', 'Theorist of consciousness development and the Great Mother', '意識発達とグレート・マザーの理論家'),
    summary: t('诺伊曼将荣格理论扩展到文化史、神话和意识起源叙事，尤其以“大母神”和意识发展图式著称。', 'Neumann extended Jungian theory into cultural history, myth, and narratives of consciousness development.', 'ユング理論を文化史、神話、意識発達の物語へ拡張した。'),
    nationality: t('德国出生，后在以色列工作', 'German-born; later worked in Israel', 'ドイツ生まれ、後にイスラエルで活動'),
    places: t('柏林、特拉维夫、与荣格通信往来', 'Berlin, Tel Aviv, correspondence with Jung', 'ベルリン、テルアビブ、ユングとの書簡交流'),
    generation: '+1',
    firstContact: '1930s',
    tags: ['+1', 'great mother', 'consciousness'],
    year: '1905-1960',
    weight: 19,
    color: '#0984e3',
    related: ['jung', 'archetypes', 'collective-unconscious', 'individuation'],
    timeline: [
      { year: '1949', text: t('出版《意识的起源与历史》。', 'Published The Origins and History of Consciousness.', '『意識の起源と歴史』を出版。') },
      { year: '1955', text: t('出版《大母神》。', 'Published The Great Mother.', '『グレート・マザー』を出版。') },
    ],
    sections: [
      { title: t('贡献', 'Contribution', '貢献'), body: t('他把个体化和原型理论转写为意识从无意识母体中分化的文化心理学叙事。', 'He recast individuation and archetypes as a cultural-psychological narrative of consciousness differentiating from the unconscious matrix.', '個性化と元型を、無意識の母胎から意識が分化する文化心理学的物語として再構成した。') },
    ],
    works: [
      { title: t('《意识的起源与历史》', 'The Origins and History of Consciousness', '『意識の起源と歴史』'), coverUrl: cover('0691163596'), links: searchLinks('The Origins and History of Consciousness Erich Neumann') },
      { title: t('《大母神》', 'The Great Mother', '『グレート・マザー』'), coverUrl: cover('0691017808'), links: searchLinks('The Great Mother Erich Neumann') },
    ],
    achievements: [t('把荣格理论带入文化史和神话结构研究。', 'Brought Jungian theory into cultural history and mythic structure.', 'ユング理論を文化史と神話構造研究へ導入した。')],
    influence: t('影响神话学、宗教学、发展叙事和女性原型研究。', 'Influenced mythology, religious studies, developmental narrative, and feminine archetype studies.', '神話学、宗教学、発達叙述、女性元型研究に影響。'),
    sources: [{ label: 'Eranos Foundation: Erich Neumann', url: 'https://www.eranosfoundation.org/erich-neumann' }],
  },
  {
    id: 'harding',
    track: 'people',
    title: t('玛丽·埃丝特·哈丁', 'Mary Esther Harding', 'メアリー・エスター・ハーディング'),
    subtitle: t('美国荣格派传播的重要先驱', 'Major pioneer of Jungian analysis in the United States', '米国ユング派分析の先駆者'),
    summary: t('哈丁是英国出生的医生和荣格派分析师，长期在纽约工作，被视为美国早期荣格派分析的重要奠基者。', 'Harding was a British-born physician and Jungian analyst who worked mainly in New York and helped establish early Jungian analysis in the United States.', '英国生まれの医師・ユング派分析家。ニューヨークで活動し米国ユング派の基礎を築いた。'),
    nationality: t('英国 / 美国', 'British / American', 'イギリス／アメリカ'),
    places: t('伦敦、苏黎世、纽约', 'London, Zurich, New York', 'ロンドン、チューリヒ、ニューヨーク'),
    generation: '+1',
    firstContact: '1920s',
    tags: ['+1', 'United States', 'women'],
    year: '1888-1971',
    weight: 16,
    color: '#fd79a8',
    related: ['jung', 'archetypes', 'individuation'],
    timeline: [
      { year: '1920s', text: t('在欧洲接触荣格思想与分析训练。', 'Encountered Jungian thought and training in Europe.', 'ヨーロッパでユング思想と分析訓練に接する。') },
      { year: '1936', text: t('参与纽约荣格派社群的早期建设。', 'Helped build early Jungian communities in New York.', 'ニューヨークの初期ユング派共同体形成に関与。') },
    ],
    sections: [
      { title: t('贡献', 'Contribution', '貢献'), body: t('她把荣格理论应用于女性心理、宗教冲动和人生后半段的心理发展，对英语世界读者影响明显。', 'She applied Jungian theory to women’s psychology, religious instinct, and later-life development, influencing English-language readers.', '女性心理、宗教的衝動、人生後半の発達へユング理論を応用した。') },
    ],
    works: [
      { title: t('《所有女人之路》', 'The Way of All Women', '『すべての女性の道』'), coverUrl: cover('1570626274'), links: searchLinks('Mary Esther Harding The Way of All Women') },
      { title: t('《女性的神秘》', 'Woman’s Mysteries', '『女性の神秘』'), coverUrl: cover('1570626282'), links: searchLinks('Mary Esther Harding Woman Mysteries') },
    ],
    achievements: [t('推动荣格心理学在美国落地。', 'Helped establish Jungian psychology in the United States.', '米国でユング心理学を定着させた。')],
    influence: t('影响纽约荣格派社群、女性心理学和宗教心理学讨论。', 'Influenced New York Jungian circles, women’s psychology, and psychology of religion.', 'ニューヨークのユング派、女性心理学、宗教心理学に影響。'),
    sources: [{ label: 'Encyclopedia.com: Harding, Mary Esther', url: 'https://www.encyclopedia.com/arts/news-wires-white-papers-and-books/harding-mary-esther' }],
  },
  {
    id: 'fordham',
    track: 'people',
    title: t('迈克尔·福特汉姆', 'Michael Fordham', 'マイケル・フォーダム'),
    subtitle: t('伦敦学派与儿童分析代表人物', 'London School and child analysis figure', 'ロンドン学派と児童分析の代表者'),
    summary: t('福特汉姆是英国儿童精神科医生和荣格派分析师，把荣格的自性理论带入婴幼儿发展、儿童治疗和临床观察。', 'Fordham was an English child psychiatrist and Jungian analyst who brought the Self into infant development, child therapy, and clinical observation.', '英国の児童精神科医・ユング派分析家。自己の概念を乳幼児発達と児童治療へ導入した。'),
    nationality: t('英国', 'British', 'イギリス'),
    places: t('伦敦、英国 Society of Analytical Psychology', 'London and the Society of Analytical Psychology', 'ロンドン、分析心理学協会'),
    generation: '+2',
    firstContact: '1930s-1940s',
    tags: ['+2', 'child analysis', 'London School'],
    year: '1905-1995',
    weight: 17,
    color: '#55efc4',
    related: ['jung', 'individuation', 'analytical-psychology'],
    timeline: [
      { year: '1940s', text: t('参与英国荣格派机构和训练体系建设。', 'Helped shape British Jungian institutions and training.', '英国のユング派機関と訓練体系形成に関与。') },
      { year: '1950s-1970s', text: t('发展儿童分析与自性发展理论。', 'Developed child analysis and theories of Self development.', '児童分析と自己発達理論を発展。') },
    ],
    sections: [
      { title: t('贡献', 'Contribution', '貢献'), body: t('他代表更临床、发展心理学取向的后荣格路线，使荣格理论能与儿童精神医学和精神分析对象关系理论对话。', 'He represents a more clinical, developmental post-Jungian line, connecting Jung with child psychiatry and object-relations psychoanalysis.', 'より臨床的・発達的なポスト・ユング路線として、児童精神医学と対象関係論との対話を開いた。') },
    ],
    works: [
      { title: t('《儿童作为个体》', 'Children as Individuals', '『個としての子ども』'), coverUrl: cover('0340151835'), links: searchLinks('Michael Fordham Children as Individuals') },
      { title: t('《荣格分析技术》', 'Technique in Jungian Analysis', '『ユング分析の技法』'), coverUrl: cover('0946439035'), links: searchLinks('Michael Fordham Technique in Jungian Analysis') },
    ],
    achievements: [t('形成伦敦学派中儿童分析和发展取向的荣格派路径。', 'Formed a developmental and child-analysis path within the London School.', 'ロンドン学派に発達・児童分析の道筋を形成した。')],
    influence: t('影响英国荣格派临床训练、儿童心理治疗和后荣格理论分化。', 'Influenced British Jungian clinical training, child psychotherapy, and post-Jungian differentiation.', '英国ユング派訓練、児童心理療法、ポスト・ユング理論の分化に影響。'),
    sources: [{ label: 'Society of Analytical Psychology: Michael Fordham', url: 'https://www.thesap.org.uk/resources/articles-on-jungian-psychology-2/michael-fordham/' }],
  },
  {
    id: 'kawai',
    track: 'people',
    title: t('河合隼雄', 'Hayao Kawai', '河合隼雄'),
    subtitle: t('日本分析心理学与临床心理学奠基者', 'Founder figure of Japanese analytical and clinical psychology', '日本の分析心理学・臨床心理学の基礎を築いた人物'),
    summary: t('河合隼雄是日本第一位取得苏黎世 Jung Institute 分析师资格的人之一，推动沙盘疗法、临床心理学制度和日本文化心理学研究。', 'Kawai was among the first Japanese analysts trained at the Jung Institute in Zurich and helped develop sandplay therapy, clinical psychology institutions, and Japanese cultural psychology.', 'チューリヒのユング研究所で資格を得た日本初期の分析家で、箱庭療法、臨床心理制度、日本文化心理学を発展させた。'),
    nationality: t('日本', 'Japanese', '日本'),
    places: t('兵库、京都、苏黎世、日本文化厅', 'Hyogo, Kyoto, Zurich, Agency for Cultural Affairs', '兵庫、京都、チューリヒ、文化庁'),
    generation: '+2',
    firstContact: '1960s',
    tags: ['+2', 'Japan', 'sandplay'],
    year: '1928-2007',
    weight: 19,
    color: '#ff9f43',
    photoUrl: 'https://www.kawaihayao.jp/en/kawaihayao_cms_en/wp-content/themes/kawaihayao_en/images/title_work.jpg',
    photoCredit: 'Kawai Hayao Foundation',
    related: ['jung', 'archetypes', 'individuation', 'active-imagination'],
    timeline: [
      { year: '1952', text: t('毕业于京都大学理学部。', 'Graduated from Kyoto University’s Faculty of Science.', '京都大学理学部を卒業。') },
      { year: '1960s', text: t('赴欧美学习，后在苏黎世 Jung Institute 取得荣格派分析师资格。', 'Studied abroad and later qualified as a Jungian analyst at the Jung Institute in Zurich.', '欧米で学び、チューリヒのユング研究所で分析家資格を取得。') },
      { year: '1982', text: t('《日本人的心灵》获大佛次郎奖。', 'The Japanese Psyche won the Osaragi Jiro Prize.', '『昔話と日本人の心』で大佛次郎賞を受賞。') },
      { year: '2002-2007', text: t('担任日本文化厅长官。', 'Served as Commissioner of Cultural Affairs in Japan.', '文化庁長官を務める。') },
    ],
    sections: [
      { title: t('主要经历', 'Life and work', '主な経歴'), body: t('河合把荣格分析训练带回日本，同时参与临床心理士制度、沙盘疗法组织和文化政策。他的写作常在日本故事、佛教和荣格心理学之间建立桥梁。', 'Kawai brought Jungian analytic training back to Japan while shaping clinical psychology credentials, sandplay organizations, and cultural policy. His writing bridges Japanese tales, Buddhism, and Jungian psychology.', 'ユング派訓練を日本へ持ち帰り、臨床心理士制度、箱庭療法組織、文化政策に関わった。日本昔話、仏教、ユング心理学を橋渡しした。') },
      { title: t('贡献', 'Contribution', '貢献'), body: t('他不是简单引进荣格，而是把荣格理论与日本文化、无我、物语和临床沉默经验结合起来。', 'He did not merely import Jung; he reworked Jungian ideas through Japanese culture, no-self, narrative, and clinical silence.', '単なる輸入ではなく、日本文化、無我、物語、臨床の沈黙を通じてユング思想を再構成した。') },
    ],
    works: [
      { title: t('《日本人的心灵》', 'The Japanese Psyche', '『昔話と日本人の心』'), coverUrl: cover('0882143688'), links: searchLinks('Hayao Kawai The Japanese Psyche') },
      { title: t('《佛教与心理治疗艺术》', 'Buddhism and the Art of Psychotherapy', '『仏教と心理療法』'), coverUrl: cover('0892540205'), links: searchLinks('Hayao Kawai Buddhism and the Art of Psychotherapy') },
      { title: t('《明惠：梦的生活》', 'The Buddhist Priest Myoe', '『明恵 夢を生きる』'), coverUrl: cover('1880656115'), links: searchLinks('河合隼雄 明恵 夢を生きる') },
    ],
    achievements: [
      t('将荣格心理学带入日本临床与文化研究。', 'Brought Jungian psychology into Japanese clinical and cultural study.', 'ユング心理学を日本の臨床と文化研究へ導入した。'),
      t('推动沙盘疗法和临床心理学制度化。', 'Helped institutionalize sandplay therapy and clinical psychology.', '箱庭療法と臨床心理学の制度化を促した。'),
    ],
    influence: t('是荣格体系跨文化传播到东亚时最关键的人物之一。', 'One of the key figures in the cross-cultural transmission of Jungian psychology to East Asia.', 'ユング心理学が東アジアへ伝播する上で最重要人物の一人。'),
    sources: [{ label: 'Kawai Hayao Foundation: Profile', url: 'https://www.kawaihayao.jp/en/profile/' }],
  },
  {
    id: 'hillman',
    track: 'people',
    title: t('詹姆斯·希尔曼', 'James Hillman', 'ジェイムズ・ヒルマン'),
    subtitle: t('原型心理学与后荣格转向', 'Archetypal psychology and post-Jungian turn', '元型的心理学とポスト・ユング的転回'),
    summary: t('希尔曼曾在苏黎世 Jung Institute 学习并任教，后来发展原型心理学，强调图像、灵魂、多神论想象和去临床中心化。', 'Hillman studied and taught at the C. G. Jung Institute Zurich, later developing archetypal psychology with an emphasis on image, soul, polytheistic imagination, and de-clinicalization.', 'C. G. ユング研究所で学び教え、後にイメージ、魂、多神教的想像、脱臨床化を強調する元型的心理学を発展させた。'),
    nationality: t('美国', 'American', 'アメリカ'),
    places: t('苏黎世、达拉斯、康涅狄格', 'Zurich, Dallas, Connecticut', 'チューリヒ、ダラス、コネチカット'),
    generation: '+2',
    firstContact: '1950s',
    tags: ['+2', 'archetypal psychology', 'image'],
    year: '1926-2011',
    weight: 18,
    color: '#a29bfe',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/James_Hillman_2004.jpg/330px-James_Hillman_2004.jpg',
    photoCredit: 'Wikimedia Commons',
    related: ['jung', 'archetypes', 'analytical-psychology'],
    timeline: [
      { year: '1950s-1960s', text: t('在苏黎世 Jung Institute 学习并参与教学。', 'Studied and taught at the C. G. Jung Institute Zurich.', 'C. G. ユング研究所で学び、教えた。') },
      { year: '1975', text: t('出版《重审心理学》。', 'Published Re-Visioning Psychology.', '『心理学の再構想』を出版。') },
    ],
    sections: [
      { title: t('贡献', 'Contribution', '貢献'), body: t('他把后荣格理论从自性整合叙事转向图像自身、灵魂语言和文化想象，使荣格传统进入文学、艺术和生态批评。', 'He shifted post-Jungian theory from Self-integration narratives toward images themselves, soul language, and cultural imagination.', '自己統合の物語から、イメージそのもの、魂の言語、文化的想像力へ焦点を移した。') },
    ],
    works: [
      { title: t('《重审心理学》', 'Re-Visioning Psychology', '『心理学の再構想』'), coverUrl: cover('0060905638'), links: searchLinks('James Hillman Re-Visioning Psychology') },
      { title: t('《灵魂的密码》', 'The Soul’s Code', '『魂のコード』'), coverUrl: cover('0399180141'), links: searchLinks('James Hillman The Soul Code') },
    ],
    achievements: [t('发展原型心理学。', 'Developed archetypal psychology.', '元型的心理学を発展させた。')],
    influence: t('影响文学、艺术、生态心理学、后荣格派治疗和文化批评。', 'Influenced literature, art, ecopsychology, post-Jungian therapy, and cultural criticism.', '文学、芸術、エコ心理学、ポスト・ユング派治療、文化批評に影響。'),
    sources: [{ label: 'Wikipedia summary: James Hillman', url: 'https://en.wikipedia.org/wiki/James_Hillman' }, { label: 'Dallas Institute: James Hillman', url: 'https://dallasinstitute.org/james-hillman/' }],
  },
  {
    id: 'woodman',
    track: 'people',
    title: t('玛丽安·伍德曼', 'Marion Woodman', 'マリオン・ウッドマン'),
    subtitle: t('身体、成瘾与女性心理的后荣格作者', 'Post-Jungian writer on body, addiction, and feminine psychology', '身体・依存・女性心理を論じたポスト・ユング派'),
    summary: t('伍德曼把荣格派象征工作与身体经验、饮食障碍、成瘾和女性心理结合起来，是英语世界影响很大的后荣格作者。', 'Woodman joined Jungian symbolic work with body experience, eating disorders, addiction, and feminine psychology, becoming a widely read post-Jungian author.', '象徴作業を身体経験、摂食障害、依存、女性心理と結びつけた広く読まれる著者。'),
    nationality: t('加拿大', 'Canadian', 'カナダ'),
    places: t('加拿大、苏黎世训练、英语世界讲学', 'Canada, Zurich training, English-language lecture circuits', 'カナダ、チューリヒ訓練、英語圏での講演'),
    generation: '+3',
    firstContact: '1970s',
    tags: ['+3', 'body', 'feminine'],
    year: '1928-2018',
    weight: 15,
    color: '#e84393',
    related: ['jung', 'archetypes', 'individuation'],
    timeline: [
      { year: '1970s', text: t('接受荣格派分析训练并开始发展身体取向写作。', 'Undertook Jungian analytic training and developed body-oriented writing.', 'ユング派訓練を受け、身体志向の著述を発展。') },
      { year: '1980', text: t('出版《猫头鹰是面包师的女儿》。', 'Published The Owl Was a Baker’s Daughter.', '『梟はパン屋の娘だった』を出版。') },
    ],
    sections: [
      { title: t('贡献', 'Contribution', '貢献'), body: t('她把荣格派图像、梦和个体化语言带入身体、饮食和女性身份议题，是 +3 代中传播力很强的人物。', 'She brought Jungian images, dreams, and individuation into body, food, and feminine identity issues.', 'ユング派のイメージ、夢、個性化を身体、食、女性アイデンティティの問題へ導入した。') },
    ],
    works: [
      { title: t('《猫头鹰是面包师的女儿》', 'The Owl Was a Baker’s Daughter', '『梟はパン屋の娘だった』'), coverUrl: cover('0919123162'), links: searchLinks('Marion Woodman The Owl Was a Baker Daughter') },
      { title: t('《沉迷于完美》', 'Addiction to Perfection', '『完全性への依存』'), coverUrl: cover('0919123111'), links: searchLinks('Marion Woodman Addiction to Perfection') },
    ],
    achievements: [t('把荣格心理学与身体和女性经验连接起来。', 'Connected Jungian psychology with body and women’s experience.', 'ユング心理学を身体と女性経験へ結びつけた。')],
    influence: t('影响女性心理学、身体心理治疗和大众荣格阅读。', 'Influenced women’s psychology, body psychotherapy, and popular Jungian reading.', '女性心理学、身体心理療法、大衆的ユング読書に影響。'),
    sources: [{ label: 'Marion Woodman Foundation', url: 'https://mwoodmanfoundation.org/' }],
  },
  {
    id: 'samuels',
    track: 'people',
    title: t('安德鲁·塞缪尔斯', 'Andrew Samuels', 'アンドリュー・サミュエルズ'),
    subtitle: t('后荣格理论分类与政治心理学作者', 'Post-Jungian mapper and political psychology writer', 'ポスト・ユング理論と政治心理学の著者'),
    summary: t('塞缪尔斯以梳理后荣格流派、推动政治心理学和多元临床观点闻名，是 +3 代中理论整理贡献突出的人物。', 'Samuels is known for mapping post-Jungian schools, political psychology, and plural clinical perspectives.', 'ポスト・ユング派の流派整理、政治心理学、多元的臨床観で知られる。'),
    nationality: t('英国', 'British', 'イギリス'),
    places: t('伦敦、埃塞克斯大学、国际分析心理学社群', 'London, University of Essex, international analytical psychology community', 'ロンドン、エセックス大学、国際分析心理学共同体'),
    generation: '+3',
    firstContact: '1970s-1980s',
    tags: ['+3', 'post-Jungian', 'politics'],
    year: '1949-',
    weight: 14,
    color: '#00b894',
    related: ['fordham', 'hillman', 'analytical-psychology'],
    timeline: [
      { year: '1985', text: t('出版《荣格与后荣格》。', 'Published Jung and the Post-Jungians.', '『ユングとポスト・ユング派』を出版。') },
      { year: '1993', text: t('出版《政治心理》。', 'Published The Political Psyche.', '『政治的プシュケー』を出版。') },
    ],
    sections: [
      { title: t('贡献', 'Contribution', '貢献'), body: t('他帮助读者区分经典派、发展派和原型派等后荣格路径，并把分析心理学带入政治、公共生活和社会批评。', 'He helped distinguish classical, developmental, and archetypal post-Jungian paths and brought analytical psychology into politics and public life.', '古典派、発達派、元型派を区別し、分析心理学を政治と公共生活へ導入した。') },
    ],
    works: [
      { title: t('《荣格与后荣格》', 'Jung and the Post-Jungians', '『ユングとポスト・ユング派』'), coverUrl: cover('0415059047'), links: searchLinks('Andrew Samuels Jung and the Post-Jungians') },
      { title: t('《政治心理》', 'The Political Psyche', '『政治的プシュケー』'), coverUrl: cover('0415081026'), links: searchLinks('Andrew Samuels The Political Psyche') },
    ],
    achievements: [t('清晰标注后荣格理论分化。', 'Mapped post-Jungian theoretical differentiation.', 'ポスト・ユング理論の分化を整理した。')],
    influence: t('影响后荣格研究、心理治疗政治维度和公共心理学。', 'Influenced post-Jungian studies, politics of psychotherapy, and public psychology.', 'ポスト・ユング研究、心理療法の政治性、公共心理学に影響。'),
    sources: [{ label: 'Andrew Samuels official site', url: 'https://andrewsamuels.com/' }],
  },
  {
    id: 'shamdasani',
    track: 'people',
    title: t('索努·沙姆达萨尼', 'Sonu Shamdasani', 'ソヌ・シャムダサニ'),
    subtitle: t('荣格史与《红书》编辑研究者', 'Jung historian and editor of The Red Book', 'ユング史研究者、『赤の書』編集者'),
    summary: t('沙姆达萨尼不是临床继承者，而是 +3 代中对荣格文本史和档案研究贡献最突出的学者之一，推动《红书》等材料进入公共研究。', 'Shamdasani is not a clinical successor but one of the most important Jung historians of the +3 generation, bringing archival materials such as The Red Book into public scholarship.', '臨床的後継者ではないが、『赤の書』などの資料を公共研究へ開いた重要なユング史研究者。'),
    nationality: t('英国', 'British', 'イギリス'),
    places: t('伦敦大学学院、Philemon Foundation、荣格档案研究', 'University College London, Philemon Foundation, Jung archival scholarship', 'UCL、フィレモン財団、ユング文献研究'),
    generation: '+3',
    firstContact: '1990s-2000s',
    tags: ['+3', 'history', 'Red Book'],
    year: '1962-',
    weight: 14,
    color: '#fdcb6e',
    related: ['jung', 'active-imagination', 'analytical-psychology'],
    timeline: [
      { year: '2003', text: t('Philemon Foundation 成立，推动荣格未刊文本出版。', 'The Philemon Foundation was founded to publish Jung’s unpublished writings.', 'フィレモン財団が設立され、未刊行資料出版を推進。') },
      { year: '2009', text: t('《红书》出版，沙姆达萨尼任编辑并撰写导论。', 'The Red Book was published, edited and introduced by Shamdasani.', '『赤の書』が刊行され、編集・導入を担当。') },
    ],
    sections: [
      { title: t('贡献', 'Contribution', '貢献'), body: t('他把荣格研究从二手叙述拉回文本、档案和历史语境，使许多理论概念能被重新校准。', 'He returned Jung studies from secondary legend to texts, archives, and historical context, recalibrating many concepts.', '二次的伝説からテキスト、アーカイブ、歴史文脈へ研究を戻し、多くの概念を再調整した。') },
    ],
    works: [
      { title: t('《红书》编辑本', 'The Red Book', '『赤の書』'), coverUrl: cover('0393065677'), links: searchLinks('The Red Book C.G. Jung Sonu Shamdasani') },
      { title: t('《荣格与现代心理学的形成》', 'Jung and the Making of Modern Psychology', '『ユングと近代心理学の形成』'), coverUrl: cover('0521539099'), links: searchLinks('Sonu Shamdasani Jung and the Making of Modern Psychology') },
    ],
    achievements: [t('推动荣格未刊文本和档案研究。', 'Advanced publication and archival research of Jung’s unpublished materials.', 'ユング未刊資料の出版と文献研究を推進した。')],
    influence: t('改变当代学界理解荣格理论来源、文本谱系和《红书》地位的方式。', 'Changed how scholars understand Jung’s sources, textual lineage, and The Red Book.', 'ユングの源泉、テキスト系譜、『赤の書』の位置づけを変えた。'),
    sources: [{ label: 'Philemon Foundation', url: 'https://philemonfoundation.org/' }, { label: 'UCL: Sonu Shamdasani', url: 'https://www.ucl.ac.uk/pals/people/sonu-shamdasani' }],
  },
  {
    id: 'analytical-psychology',
    track: 'theories',
    title: t('分析心理学', 'Analytical Psychology', '分析心理学'),
    subtitle: t('荣格理论体系的总称', 'The broad name for Jung’s system', 'ユング体系の総称'),
    summary: t('分析心理学关注无意识、象征、梦、人格发展和个体化，是人物线所有分支的共同母体。', 'Analytical psychology studies the unconscious, symbols, dreams, personality development, and individuation; it is the shared matrix of the people line.', '無意識、象徴、夢、人格発達、個性化を扱い、人物線の共通母体となる。'),
    tags: ['system', 'therapy', 'symbol'],
    weight: 27,
    color: '#00a7a5',
    related: ['jung', 'collective-unconscious', 'archetypes', 'individuation'],
    timeline: [
      { year: '1910s', text: t('荣格与精神分析分离后逐渐形成独立体系。', 'Took shape after Jung’s split from psychoanalysis.', '精神分析からの分岐後に独自体系として形成。') },
      { year: '1948', text: t('苏黎世 C. G. Jung Institute 成立。', 'The C. G. Jung Institute Zurich was founded.', 'C. G. ユング研究所が設立。') },
    ],
    works: [
      { title: t('《心理类型》', 'Psychological Types', '『タイプ論』'), coverUrl: cover('0691018138'), links: searchLinks('Psychological Types Carl Jung') },
    ],
    achievements: [t('提供梦、神话、宗教象征和人格发展解释框架。', 'Provides a framework for dreams, myths, religious symbols, and personality development.', '夢、神話、宗教象徴、人格発達を理解する枠組みを提供。')],
    influence: t('成为荣格派治疗、训练机构和后荣格理论的共同基础。', 'Forms the basis for Jungian psychotherapy, training institutions, and post-Jungian theory.', 'ユング派心理療法、訓練機関、ポスト・ユング理論の基盤。'),
    sources: jungSources,
  },
  {
    id: 'collective-unconscious',
    track: 'theories',
    title: t('集体无意识', 'Collective Unconscious', '集合的無意識'),
    subtitle: t('超越个人经验的深层心理结构', 'Deep psychic structure beyond personal experience', '個人的経験を超える深層構造'),
    summary: t('荣格用该概念说明跨文化神话、梦和象征中反复出现的心理模式。', 'Jung used it to explain recurring patterns in myths, dreams, and symbols across cultures.', '文化を越えて夢・神話・象徴に反復する心理的パターンを説明する概念。'),
    tags: ['unconscious', 'myth', 'symbol'],
    weight: 24,
    color: '#0984e3',
    related: ['jung', 'archetypes', 'neumann'],
    timeline: [{ year: '1910s-1930s', text: t('从荣格对精神病、梦和神话材料的研究中成形。', 'Formed through Jung’s work on psychosis, dreams, and mythic material.', '精神病、夢、神話資料の研究から形成。') }],
    works: [{ title: t('《原型与集体无意识》', 'The Archetypes and the Collective Unconscious', '『元型と集合的無意識』'), coverUrl: cover('0691018332'), links: searchLinks('The Archetypes and the Collective Unconscious') }],
    achievements: [t('为原型、象征和跨文化心理模式提供理论基础。', 'Grounds archetypes, symbolism, and cross-cultural psychic patterns.', '元型、象徴、異文化横断的心理パターンの基礎。')],
    influence: t('影响宗教学、神话学和文化心理学，同时也持续受到经验检验方面的争议。', 'Influential in religious studies, mythology, and cultural psychology, while empirically debated.', '宗教学、神話学、文化心理学に影響しつつ、経験的検証をめぐる議論もある。'),
    sources: [{ label: 'Britannica: Collective unconscious', url: 'https://www.britannica.com/science/collective-unconscious' }, ...jungSources],
  },
  {
    id: 'archetypes',
    track: 'theories',
    title: t('原型', 'Archetypes', '元型'),
    subtitle: t('反复出现的心理图式与象征模式', 'Recurring psychic and symbolic patterns', '反復する心理的・象徴的パターン'),
    summary: t('原型不是固定图像，而是倾向于产生某类图像、情感和叙事结构的心理模式。', 'Archetypes are not fixed images but patterns that tend to generate images, affects, and narratives.', '元型は固定画像ではなく、イメージ・感情・物語を生む傾向。'),
    tags: ['image', 'symbol', 'pattern'],
    weight: 25,
    color: '#6c5ce7',
    related: ['jung', 'collective-unconscious', 'shadow-persona', 'anima-animus', 'hillman'],
    timeline: [{ year: '1930s-1950s', text: t('荣格在神话、梦、宗教和炼金术研究中系统阐述原型。', 'Jung elaborated archetypes through myth, dreams, religion, and alchemy.', '神話、夢、宗教、錬金術研究を通じて展開。') }],
    works: [{ title: t('《原型与集体无意识》', 'The Archetypes and the Collective Unconscious', '『元型と集合的無意識』'), coverUrl: cover('0691018332'), links: searchLinks('The Archetypes and the Collective Unconscious') }],
    achievements: [t('连接个人心理经验与跨文化象征材料。', 'Connects individual experience with cross-cultural symbolic material.', '個人経験と異文化横断的象徴資料を結びつける。')],
    influence: t('影响文学、影视、神话学和后荣格派心理学。', 'Influenced literature, film, mythology, and post-Jungian psychology.', '文学、映画、神話学、ポスト・ユング派心理学に影響。'),
    sources: jungSources,
  },
  {
    id: 'shadow-persona',
    track: 'theories',
    title: t('阴影与人格面具', 'Shadow and Persona', '影とペルソナ'),
    subtitle: t('社会角色与被压抑面向', 'Social role and disowned psychic material', '社会的役割と否認された心理内容'),
    summary: t('人格面具指个体适应社会的角色外观；阴影指自我不愿承认但仍影响行为的内容。', 'Persona is the social face; shadow refers to disowned material that still shapes behavior.', 'ペルソナは社会的な顔、影は自我が認めにくいが行動に作用する内容。'),
    tags: ['ego', 'persona', 'shadow'],
    weight: 20,
    color: '#2d3436',
    related: ['jung', 'archetypes', 'individuation'],
    timeline: [{ year: '1920s', text: t('在荣格人格理论和治疗实践中逐渐成形。', 'Took shape in Jung’s personality theory and clinical practice.', '人格理論と臨床実践の中で形成。') }],
    works: [{ title: t('《自我与无意识的关系》', 'Two Essays on Analytical Psychology', '『分析心理学二論』'), coverUrl: cover('0691017824'), links: searchLinks('Two Essays on Analytical Psychology Jung') }],
    achievements: [t('提供投射识别、自我反省和人格整合工具。', 'Offers tools for projection work, self-reflection, and integration.', '投影の認識、自己省察、統合の道具。')],
    influence: t('阴影整合成为个体化叙事中最常被引用的主题之一。', 'Shadow integration became one of the most cited themes in individuation narratives.', '影の統合は個性化で頻繁に参照される。'),
    sources: jungSources,
  },
  {
    id: 'anima-animus',
    track: 'theories',
    title: t('阿尼玛与阿尼姆斯', 'Anima and Animus', 'アニマとアニムス'),
    subtitle: t('内在异性形象与关系模式', 'Inner contrasexual images and relational patterns', '内的異性像と関係パターン'),
    summary: t('荣格用阿尼玛和阿尼姆斯描述无意识中与性别化形象、投射和关系经验相关的结构。', 'Jung used anima and animus for unconscious structures tied to gendered images, projection, and relationship.', '性別化されたイメージ、投影、関係経験に関わる無意識構造。'),
    tags: ['relationship', 'projection', 'inner image'],
    weight: 19,
    color: '#f6b73c',
    related: ['jung', 'emma-jung', 'archetypes', 'individuation'],
    timeline: [{ year: '1920s-1950s', text: t('概念在荣格及艾玛·荣格著作中继续展开。', 'Developed in works by Jung and Emma Jung.', 'ユングとエンマ・ユングの著作で展開。') }],
    works: [{ title: t('《阿尼玛与阿尼姆斯》', 'Animus and Anima', '『アニムスとアニマ』'), coverUrl: cover('0882143017'), links: searchLinks('Emma Jung Animus and Anima') }],
    achievements: [t('解释关系投射、梦中人物和内在心理对话。', 'Explains relational projection, dream figures, and inner dialogue.', '関係投影、夢の人物、内的対話を説明。')],
    influence: t('当代使用时需要结合性别研究语境，避免把历史概念简单本质化。', 'Contemporary use requires gender-aware interpretation rather than simple essentialism.', '現代ではジェンダー研究の文脈を踏まえる必要がある。'),
    sources: [{ label: 'Inner City Books: Emma Jung', url: 'https://innercitybooks.net/authors/emma-jung/' }, ...jungSources],
  },
  {
    id: 'individuation',
    track: 'theories',
    title: t('个体化', 'Individuation', '個性化'),
    subtitle: t('人格整合与自性实现过程', 'Process of psychic integration and Self-realization', '人格統合と自己実現の過程'),
    summary: t('个体化是人格逐渐整合意识与无意识内容、形成更完整自我的过程。', 'Individuation is the process through which conscious and unconscious contents are integrated into a fuller personality.', '意識と無意識の内容が統合され、より全体的な人格へ向かう過程。'),
    tags: ['self', 'integration', 'development'],
    weight: 23,
    color: '#00b894',
    related: ['jung', 'shadow-persona', 'anima-animus', 'active-imagination'],
    timeline: [{ year: '1928', text: t('荣格在《自我与无意识的关系》等文本中系统讨论。', 'Jung discussed it systematically in texts such as The Relations between the Ego and the Unconscious.', '『自我と無意識の関係』などで体系的に論じられる。') }],
    works: [{ title: t('《自我与无意识的关系》', 'The Relations between the Ego and the Unconscious', '『自我と無意識の関係』'), coverUrl: cover('0691017824'), links: searchLinks('The Relations between the Ego and the Unconscious Jung') }],
    achievements: [t('成为荣格派治疗和生命发展叙事的核心概念。', 'Became central to Jungian therapy and life-development narratives.', 'ユング派治療と人生発達叙述の中心概念となる。')],
    influence: t('影响心理治疗、灵性写作和自我发展文化。', 'Influenced psychotherapy, spiritual writing, and self-development culture.', '心理療法、スピリチュアルな著述、自己発達文化に影響。'),
    sources: jungSources,
  },
  {
    id: 'active-imagination',
    track: 'theories',
    title: t('积极想象', 'Active Imagination', '能動的想像'),
    subtitle: t('与无意识图像对话的方法', 'Method of dialoguing with unconscious images', '無意識イメージとの対話法'),
    summary: t('积极想象通过书写、绘画、内在对话等方式，让意识与梦样图像互动。', 'Active imagination uses writing, drawing, and inner dialogue to engage dream-like images.', '書く、描く、内的対話を通じて夢的イメージと関わる方法。'),
    tags: ['method', 'dreams', 'image'],
    weight: 18,
    color: '#ff7675',
    related: ['jung', 'von-franz', 'hannah', 'individuation'],
    timeline: [{ year: '1913-1916', text: t('荣格在个人危机与《红书》时期发展相关实践。', 'Jung developed related practices during the period associated with The Red Book.', '『赤の書』に関わる時期に関連実践が発展。') }],
    works: [{ title: t('《红书》', 'The Red Book', '『赤の書』'), coverUrl: cover('0393065677'), links: searchLinks('The Red Book C.G. Jung') }],
    achievements: [t('为梦、幻想和象征材料的临床工作提供方法。', 'Gives a method for clinical work with dreams, fantasy, and symbols.', '夢、空想、象徴素材を扱う臨床的方法を与える。')],
    influence: t('影响艺术治疗、梦工作和后荣格派实践。', 'Influenced art therapy, dream work, and post-Jungian practice.', '芸術療法、夢作業、ポスト・ユング派実践に影響。'),
    sources: [{ label: 'Philemon Foundation', url: 'https://philemonfoundation.org/' }, ...jungSources],
  },
]

export const links: LinkItem[] = [
  { source: 'jung', target: 'freud', label: t('合作/分裂', 'collaboration/split', '協力／分岐') },
  { source: 'jung', target: 'emma-jung', label: t('家庭与理论圈', 'family and circle', '家族と理論圏') },
  { source: 'jung', target: 'jacobi', label: t('1927 相识', 'met 1927', '1927年接点') },
  { source: 'jung', target: 'hannah', label: t('1929 入圈', 'joined 1929', '1929年参加') },
  { source: 'jung', target: 'von-franz', label: t('1933 入圈', 'joined 1933', '1933年参加') },
  { source: 'jung', target: 'neumann', label: t('通信与理论扩展', 'correspondence', '書簡と拡張') },
  { source: 'jung', target: 'harding', label: t('美国传播', 'US transmission', '米国展開') },
  { source: 'jung', target: 'fordham', label: t('发展派', 'developmental line', '発達派') },
  { source: 'jung', target: 'kawai', label: t('日本传播', 'Japan transmission', '日本展開') },
  { source: 'jung', target: 'hillman', label: t('原型心理学', 'archetypal turn', '元型的転回') },
  { source: 'hillman', target: 'samuels', label: t('后荣格整理', 'post-Jungian mapping', 'ポスト・ユング整理') },
  { source: 'fordham', target: 'samuels', label: t('发展派脉络', 'developmental line', '発達派系譜') },
  { source: 'von-franz', target: 'hannah', label: t('长期合作', 'long collaboration', '長期協働') },
  { source: 'jung', target: 'shamdasani', label: t('文本史重估', 'textual history', '文献史再評価') },
  { source: 'jung', target: 'woodman', label: t('身体/女性心理', 'body/feminine', '身体／女性心理') },
  { source: 'analytical-psychology', target: 'collective-unconscious', label: t('基础结构', 'foundation', '基礎') },
  { source: 'collective-unconscious', target: 'archetypes', label: t('表现为原型', 'expressed as archetypes', '元型として表れる') },
  { source: 'archetypes', target: 'shadow-persona', label: t('人格原型', 'personality archetypes', '人格元型') },
  { source: 'archetypes', target: 'anima-animus', label: t('关系原型', 'relational archetypes', '関係元型') },
  { source: 'shadow-persona', target: 'individuation', label: t('整合路径', 'integration path', '統合の道') },
  { source: 'anima-animus', target: 'individuation', label: t('内在关系整合', 'inner integration', '内的統合') },
  { source: 'individuation', target: 'active-imagination', label: t('实践方法', 'practice', '実践') },
]

export const copy = {
  appTitle: t('荣格心理学体系', 'Jungian Psychology System', 'ユング心理学体系'),
  appSubtitle: t('沿时间与代际展开的人物网络，以及理论概念的动态脉络', 'A generational people network and a dynamic map of core ideas', '世代別人物ネットワークと中核概念の動的マップ'),
  people: t('人物线', 'People', '人物'),
  theories: t('理论线', 'Theories', '理論'),
  timeline: t('时间线', 'Timeline', '年表'),
  works: t('相关著作', 'Works', '関連著作'),
  achievements: t('主要成就', 'Achievements', '主な業績'),
  influence: t('影响', 'Influence', '影響'),
  related: t('关联节点', 'Related', '関連'),
  sources: t('来源', 'Sources', '出典'),
  profile: t('人物档案', 'Profile', 'プロフィール'),
  nationality: t('国籍/身份', 'Nationality / identity', '国籍・立場'),
  places: t('生活与工作地点', 'Life and work', '生活と仕事の場所'),
  generation: t('代际', 'Generation', '世代'),
  firstContact: t('关联时间', 'Contact point', '接点時期'),
  selectedHint: t('点击气泡查看详情；人物线按与荣格发生联系的时间和代际展开。', 'Click a bubble for details; the people line is arranged by contact time and generation.', 'バブルをクリックして詳細表示。人物線は接点時期と世代で展開します。'),
  sourceNote: t('照片、著作与事实说明尽量使用可追溯来源；无法确认的图片不强行嵌入。', 'Photos, works, and facts use traceable sources where possible; uncertain images are not forced in.', '写真・著作・事実は可能な限り追跡可能な出典を使用。不確かな画像は無理に埋め込みません。'),
}
