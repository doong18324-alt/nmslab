/* ============================================================================
   NMS Lab — i18n  (en / ko / ja / zh)
   ----------------------------------------------------------------------------
   English is the canonical text and stays in the HTML. Translations are an
   overlay: if a key is missing, or this script fails to load, every page still
   reads correctly in English.

   Adding text:   <p data-i18n="some.key">English source</p>
                  then add "some.key" to DICT below. Only ko/ja/zh are stored —
                  "en" always falls back to what is written in the HTML.

   NEVER add data-i18n to:
     · paper titles and journal names (publications.html)
     · people's names
     · ORCID / DOI / email
   These are proper nouns. Translating them breaks citation and search.

   Language resolves as:  ?lang= in the URL  →  saved choice  →  browser  →  en
   So https://nmslab.org/?lang=ja opens the whole site in Japanese, and the
   switcher keeps that parameter in the address bar so the link stays shareable.
   ========================================================================== */
(function () {
  "use strict";

  var LANGS = [
    { code: "en", label: "EN", name: "English" },
    { code: "ko", label: "한", name: "한국어"  },
    { code: "ja", label: "日", name: "日本語"  },
    { code: "zh", label: "中", name: "中文"    }
  ];

  var DICT = {

  /* ══ shared: nav + footer ══════════════════════════════════════════════ */
  "nav.research": { ko:"연구",   ja:"研究",         zh:"研究" },
  "nav.people":   { ko:"구성원", ja:"メンバー",     zh:"团队" },
  "nav.pubs":     { ko:"논문",   ja:"論文",         zh:"论文" },
  "nav.contact":  { ko:"연락처", ja:"お問い合わせ", zh:"联系" },

  "foot.org": {
    ko:"NMS Lab · Novel Medical Science · 광주보건대학교",
    ja:"NMS Lab · Novel Medical Science · 光州保健大学校",
    zh:"NMS Lab · Novel Medical Science · 光州保健大学"
  },
  "foot.loc": { ko:"대한민국 광주", ja:"大韓民国 光州", zh:"韩国 光州" },

  /* ══ document titles ══════════════════════════════════════════════════ */
  "doc.index": {
    ko:"NMS Lab — Novel Medical Science | 광주보건대학교",
    ja:"NMS Lab — Novel Medical Science | 光州保健大学校",
    zh:"NMS Lab — Novel Medical Science | 光州保健大学"
  },
  "doc.research": {
    ko:"연구 — NMS Lab | Novel Medical Science",
    ja:"研究 — NMS Lab | Novel Medical Science",
    zh:"研究 — NMS Lab | Novel Medical Science"
  },
  "doc.people": {
    ko:"구성원 — NMS Lab | Novel Medical Science",
    ja:"メンバー — NMS Lab | Novel Medical Science",
    zh:"团队 — NMS Lab | Novel Medical Science"
  },
  "doc.pubs": {
    ko:"논문 — NMS Lab | Novel Medical Science",
    ja:"論文 — NMS Lab | Novel Medical Science",
    zh:"论文 — NMS Lab | Novel Medical Science"
  },
  "doc.contact": {
    ko:"연락처 — NMS Lab | Novel Medical Science",
    ja:"お問い合わせ — NMS Lab | Novel Medical Science",
    zh:"联系 — NMS Lab | Novel Medical Science"
  },

  /* ══ index: hero ══════════════════════════════════════════════════════ */
  "hero.eyebrow": {
    ko:"광주보건대학교 · 대한민국",
    ja:"光州保健大学校 · 大韓民国",
    zh:"光州保健大学 · 大韩民国"
  },
  "hero.h1": {
    ko:"노화하는 뇌를, <em>몸이 움직이는 동안</em> 측정합니다.",
    ja:"老いゆく脳を、<em>身体が動いているあいだに</em>計測する。",
    zh:"我们在<em>身体运动之时</em>，测量正在老去的大脑。"
  },
  "hero.lede": {
    ko:"노년기 뇌에 대해 알려진 것의 대부분은 가만히 누워 있는 사람에게서 얻어졌습니다. 우리는 보행·이중과제·부하 운동 중의 대뇌 혈역학을 기록합니다. 노쇠가 실제로 드러나는 순간이 바로 그때이기 때문입니다.",
    ja:"高齢者の脳について知られていることの多くは、静かに横たわった人から得られたものです。私たちは歩行・二重課題・負荷運動の最中の大脳血行動態を記録します。フレイルが姿を現すのは、まさにその瞬間だからです。",
    zh:"关于衰老大脑的既有知识，大多来自静卧不动的受试者。我们记录步行、双重任务与负荷运动过程中的皮层血流动力学——因为衰弱正是在那一刻显现。"
  },
  "tag.hemo":   { ko:"대뇌 혈역학", ja:"大脳血行動態", zh:"皮层血流动力学" },
  "tag.geri":   { ko:"노인의학",    ja:"老年医学",     zh:"老年医学" },
  "tag.pt":     { ko:"물리치료학",  ja:"理学療法学",   zh:"物理治疗学" },
  "tag.sports": { ko:"스포츠의학",  ja:"スポーツ医学", zh:"运动医学" },

  /* ══ index + research: the four areas ════════════════════════════════ */
  "sec1.eyebrow": { ko:"연구 주제", ja:"研究テーマ", zh:"研究方向" },
  "areas.h": {
    ko:"네 개의 질문, 하나의 장비 체계.",
    ja:"四つの問い、ひとつの計測系。",
    zh:"四个问题，一套仪器。"
  },
  "areas.note": {
    ko:"노화, 통증, 운동 수행능력은 대개 서로 다른 사람들이 서로 다른 건물에서 연구합니다. 그러나 이들은 하나의 기질을 공유합니다 — 부하를 받는 신체에 피질이 자원을 어떻게 배분하는가. 우리는 그 기질을 직접 연구합니다.",
    ja:"加齢、疼痛、運動パフォーマンスは、通常は別々の研究者が別々の建物で扱います。しかしこれらは一つの基盤を共有しています——負荷のかかった身体に対して、皮質がどのように資源を配分するのか。私たちはその基盤を直接研究します。",
    zh:"衰老、疼痛与运动表现，通常由不同的人在不同的楼里研究。但它们共享同一个基质：皮层如何为承载负荷的身体分配资源。我们直接研究这一基质。"
  },

  "a1.instr": { ko:"fNIRS · 보행 · 이중과제", ja:"fNIRS · 歩行 · 二重課題", zh:"fNIRS · 步行 · 双重任务" },
  "a1.h":     { ko:"뇌 표현형으로서의 노쇠", ja:"脳表現型としてのフレイル", zh:"作为脑表型的衰弱" },
  "a1.p": {
    ko:"노쇠는 신체에서 점수화되지만, 결정되는 곳은 피질입니다. 우리는 신체·인지·정서·사회 축에서 노인을 표현형화하고, 어떤 전전두엽 신호가 아형을 가르는지 묻습니다.",
    ja:"フレイルは身体で採点されますが、決まるのは皮質です。私たちは身体・認知・心理・社会の各軸で高齢者を表現型化し、どの前頭前野シグネチャーがサブタイプを分けるのかを問います。",
    zh:"衰弱在身体上被评分，却在皮层中被决定。我们沿身体、认知、心理与社会四轴对老年人进行表型分层，并追问哪些前额叶特征区分了这些亚型。"
  },
  "a1.p.long": {
    ko:"노쇠는 신체에서 점수화되지만, 결정되는 곳은 피질입니다. 우리는 신체·인지·정서·사회 축에서 노인을 표현형화하고, 어떤 전전두엽 신호가 아형을 가르는지 묻습니다 — 보상이 드러나는 곡선 보행과 이중과제 보행 중의 측정을 포함해서.",
    ja:"フレイルは身体で採点されますが、決まるのは皮質です。私たちは身体・認知・心理・社会の各軸で高齢者を表現型化し、どの前頭前野シグネチャーがサブタイプを分けるのかを問います——代償が可視化される曲線歩行や二重課題歩行の最中の計測を含めて。",
    zh:"衰弱在身体上被评分，却在皮层中被决定。我们沿身体、认知、心理与社会四轴对老年人进行表型分层，并追问哪些前额叶特征区分了这些亚型——包括在曲线行走与双重任务行走中测量，代偿正是在那时显形。"
  },

  "a2.instr": { ko:"tDCS · rTMS · 정량적 감각검사", ja:"tDCS · rTMS · 定量的感覚検査", zh:"tDCS · rTMS · 定量感觉测试" },
  "a2.h":     { ko:"손상보다 오래 남는 통증", ja:"損傷より長く残る痛み", zh:"比损伤活得更久的疼痛" },
  "a2.p": {
    ko:"만성 근골격계 통증에서의 중추감작, 통증신경과학교육, 비침습적 뇌자극 — 조직은 나았으나 지도는 낫지 않은 자리.",
    ja:"慢性筋骨格系疼痛における中枢感作、疼痛神経科学教育、非侵襲的脳刺激——組織は治癒したのに、地図が治っていない場所。",
    zh:"慢性肌骨疼痛中的中枢敏化、疼痛神经科学教育与非侵入性脑刺激——组织已愈合，而皮层的地图尚未愈合。"
  },
  "a2.p.long": {
    ko:"만성 근골격계 통증에서의 중추감작, 통증신경과학교육, 비침습적 뇌자극 — 조직은 나았으나 지도는 낫지 않은 자리. 우리의 임상시험은 PNE와 도수치료를, tDCS와 과제훈련을 짝지어 무엇이 실제로 중추 표상을 바꾸는지 묻습니다.",
    ja:"慢性筋骨格系疼痛における中枢感作、疼痛神経科学教育、非侵襲的脳刺激——組織は治癒したのに、地図が治っていない場所。私たちの試験ではPNEと徒手療法、tDCSと課題訓練を組み合わせ、中枢表象を実際に変えるものは何かを問います。",
    zh:"慢性肌骨疼痛中的中枢敏化、疼痛神经科学教育与非侵入性脑刺激——组织已愈合，而地图尚未愈合。我们的试验将PNE与手法治疗配对、将tDCS与任务训练配对，追问究竟什么真正改变了中枢表征。"
  },

  "a3.instr":  { ko:"3차원 동작분석 · IMU · 힘 측정", ja:"三次元動作解析 · IMU · 力計測", zh:"三维动作分析 · IMU · 力学测量" },
  "a3.instr2": { ko:"3차원 동작분석 · IMU · 관절가동술", ja:"三次元動作解析 · IMU · 関節モビライゼーション", zh:"三维动作分析 · IMU · 关节松动术" },
  "a3.h":      { ko:"부하 아래의 움직임", ja:"負荷下の動作", zh:"负荷下的动作" },
  "a3.p": {
    ko:"정형도수치료와 스포츠의학: 손상 이후 신경근 시스템은 어떻게 재편되는가, 그리고 무엇이 보상과 회복을 가르는가.",
    ja:"整形徒手理学療法とスポーツ医学——損傷後に神経筋システムはどのように再編されるのか、そして代償と回復を分けるものは何か。",
    zh:"骨科手法治疗与运动医学：损伤后神经肌肉系统如何重组，以及什么区分了代偿与真正的恢复。"
  },
  "a3.p.long": {
    ko:"정형도수치료와 스포츠의학: 만성 발목 불안정성, 관절가동술 전략, 혈류제한 훈련, 그리고 스포츠 복귀 판단. 반복되는 질문은 하나입니다 — 무엇이 보상과 회복을 가르는가.",
    ja:"整形徒手理学療法とスポーツ医学——慢性足関節不安定症、関節モビライゼーション戦略、血流制限トレーニング、そしてスポーツ復帰の判断。繰り返し立ち現れる問いは一つです——代償と回復を分けるものは何か。",
    zh:"骨科手法治疗与运动医学：慢性踝关节不稳、关节松动策略、血流限制训练，以及重返运动的决策。反复出现的问题只有一个——什么区分了代偿与真正的恢复。"
  },

  "a4.instr": { ko:"멀티모달 AI · 지역사회 코호트", ja:"マルチモーダルAI · 地域コホート", zh:"多模态AI · 社区队列" },
  "a4.h":     { ko:"임상에 도달하는 예측", ja:"臨床に届く予測", zh:"抵达临床的预测" },
  "a4.p": {
    ko:"코호트·웨어러블·뇌영상 데이터로 구축한 모델 — 홀드아웃 검증셋이 아니라, 리빙랩에서 검증합니다.",
    ja:"コホート・ウェアラブル・脳イメージングのデータから構築したモデル——ホールドアウトのテストセットだけでなく、リビングラボで検証します。",
    zh:"基于队列、可穿戴与脑影像数据构建的模型——在生活实验室中验证，而不只是在留出测试集上。"
  },
  "a4.p.long": {
    ko:"코호트·웨어러블·뇌영상 데이터로 구축한 모델 — 홀드아웃 검증셋이 아니라 리빙랩에서 검증합니다. 도시와 농촌 현장이 설계에 처음부터 들어가 있습니다. 도심에서만 작동하는 모델은 모델이 아니기 때문입니다.",
    ja:"コホート・ウェアラブル・脳イメージングのデータから構築したモデル——ホールドアウトのテストセットだけでなく、リビングラボで検証します。都市部と農村部の拠点は設計段階から組み込まれています。都心でしか動かないモデルは、モデルとは呼べないからです。",
    zh:"基于队列、可穿戴与脑影像数据构建的模型——在生活实验室中验证，而不只是在留出测试集上。城市与乡村站点从设计之初就被纳入。只在市中心奏效的模型，算不上模型。"
  },

  "btn.research": { ko:"연구 보기",      ja:"研究を見る",   zh:"查看研究" },
  "btn.allpubs":  { ko:"전체 논문 보기",  ja:"論文一覧",     zh:"全部论文" },
  "btn.seepubs":  { ko:"논문 보기",      ja:"論文を見る",   zh:"查看论文" },
  "btn.contact":  { ko:"연락하기",       ja:"お問い合わせ", zh:"联系我们" },
  "btn.contactlab":{ko:"랩에 연락하기",   ja:"研究室に連絡する", zh:"联系实验室" },
  "btn.write":    { ko:"랩에 메일 보내기", ja:"研究室にメールする", zh:"来信联系" },

  /* ══ index: publications block ═══════════════════════════════════════ */
  "sec2.eyebrow": { ko:"논문", ja:"論文", zh:"论文" },
  "sec2.h2":      { ko:"기록.", ja:"実績。", zh:"记录。" },
  "sec2.note": {
    ko:"신경재활, 통증과학, 노인운동의학 전반에 걸친 동료심사 논문.",
    ja:"神経リハビリテーション、疼痛科学、高齢者運動医学にわたる査読付き論文。",
    zh:"涵盖神经康复、疼痛科学与老年运动医学的同行评审成果。"
  },
  "stat.papers": {
    ko:"<em>동료심사 논문</em><br>SCI(E) / ESCI / KCI 등재",
    ja:"<em>査読付き論文</em><br>SCI(E) / ESCI / KCI 収録",
    zh:"<em>同行评审论文</em><br>SCI(E) / ESCI / KCI 收录"
  },
  "stat.rev.hd": { ko:"심사 및 편집", ja:"査読・編集", zh:"审稿与编辑" },
  "stat.rev.k": {
    ko:"<em>19개 저널, 41건 심사</em><br><em>Section Board Member</em> · Medicina (MDPI)",
    ja:"<em>19誌・41本の査読</em><br><em>Section Board Member</em> · Medicina (MDPI)",
    zh:"<em>为19本期刊审阅41篇稿件</em><br><em>Section Board Member</em> · Medicina (MDPI)"
  },

  /* ══ index: join us ══════════════════════════════════════════════════ */
  "sec3.eyebrow": { ko:"함께하기", ja:"参加する", zh:"加入我们" },
  "join.h":       { ko:"랩과 함께 연구하기.", ja:"研究室と協働する。", zh:"与实验室合作。" },
  "join.note": {
    ko:"우리는 노화, 통증, 인간 수행능력을 연구하는 임상가·공학자·해외 연구그룹과 협력합니다. fNIRS나 노인재활에 관심 있는 학생의 연락을 환영합니다.",
    ja:"私たちは、加齢・疼痛・ヒトのパフォーマンスに取り組む臨床家、エンジニア、海外の研究グループと協働しています。fNIRSや高齢者リハビリテーションに関心のある学生からのご連絡を歓迎します。",
    zh:"我们与从事衰老、疼痛与人体表现研究的临床医生、工程师及海外研究团队合作。欢迎对fNIRS或老年康复感兴趣的学生来信。"
  },

  /* ══ research: infrastructure ════════════════════════════════════════ */
  "rs.eyebrow": { ko:"연구", ja:"研究", zh:"研究" },
  "inf.eyebrow":{ ko:"인프라", ja:"研究基盤", zh:"研究基础设施" },
  "inf.h": {
    ko:"우리가 실제로 측정할 수 있는 것.",
    ja:"私たちが実際に測定できるもの。",
    zh:"我们真正能测量的东西。"
  },
  "inf.note": {
    ko:"연구실은 그 장비이자, 사람에 대한 접근권입니다. 우리는 둘 다 가지고 있고, 두 번째가 훨씬 얻기 어렵습니다.",
    ja:"研究室とは、その装置であり、人へのアクセスです。私たちはその両方を持っています。そして手に入れにくいのは、後者のほうです。",
    zh:"一个实验室，就是它的仪器，以及它接触到人的能力。两者我们都有——而后者要难得多。"
  },
  "inf.lab":   { ko:"실험실 내", ja:"研究室内",   zh:"实验室内" },
  "inf.field": { ko:"현장",     ja:"フィールド", zh:"现场" },

  "inf.l1": { ko:"<b>fNIRS ×2</b> — 전전두엽 몽타주, 보행 중 측정",
              ja:"<b>fNIRS ×2</b> — 前頭前野モンタージュ、歩行中計測",
              zh:"<b>fNIRS ×2</b> — 前额叶探头布局，可移动记录" },
  "inf.l2": { ko:"<b>비침습적 뇌자극</b> — tDCS 프로토콜",
              ja:"<b>非侵襲的脳刺激</b> — tDCSプロトコル",
              zh:"<b>非侵入性脑刺激</b> — tDCS方案" },
  "inf.l3": { ko:"<b>자율신경 모니터링</b> — HRV, 활동기록계",
              ja:"<b>自律神経モニタリング</b> — HRV、活動量計",
              zh:"<b>自主神经监测</b> — HRV、体动记录仪" },
  "inf.l4": { ko:"<b>동작분석</b> — 마커리스 3D, IMU",
              ja:"<b>動作解析</b> — マーカーレス3D、IMU",
              zh:"<b>动作分析</b> — 无标记三维、IMU" },
  "inf.f1": { ko:"<b>스마트케어빌리지</b> — 주민 5,000명 이상, 종단 접근",
              ja:"<b>スマートケアビレッジ</b> — 住民5,000名以上、縦断的アクセス",
              zh:"<b>智慧照护村</b> — 5,000+ 居民，纵向随访" },
  "inf.f2": { ko:"<b>AI 헬스케어 타워</b> — 도심 리빙랩 거점",
              ja:"<b>AIヘルスケアタワー</b> — 都市部リビングラボ拠点",
              zh:"<b>AI健康塔</b> — 城市生活实验室基地" },
  "inf.f3": { ko:"<b>건강관리센터 ×3</b> — 지역사회 모집",
              ja:"<b>健康管理センター ×3</b> — 地域からのリクルート",
              zh:"<b>健康管理中心 ×3</b> — 社区招募" },
  "inf.f4": { ko:"<b>도시–농촌 설계</b> — 외적 타당도를 설계에 내장",
              ja:"<b>都市–農村デザイン</b> — 外的妥当性を設計に組み込む",
              zh:"<b>城乡设计</b> — 将外部效度内建于设计" },

  /* ══ people ══════════════════════════════════════════════════════════ */
  "pe.eyebrow": { ko:"구성원", ja:"メンバー", zh:"团队" },
  "pe.h1": {
    ko:"기록을 직접 하는 사람들.",
    ja:"計測を実際に行う人たち。",
    zh:"亲手完成记录的人。"
  },
  "pe.lede": {
    ko:"임상가와 과학자로 이루어진 작은 그룹입니다. 이곳의 모두는 데이터를 분석할 뿐 아니라 직접 수집합니다 — 이 랩에서 그 둘은 분리되지 않습니다.",
    ja:"臨床家と科学者からなる小さなグループです。ここでは全員が、データを解析するだけでなく自ら収集します——この研究室において、その二つは切り離せません。",
    zh:"一个由临床医生与科学家组成的小团队。这里的每个人不仅分析数据，也亲自采集数据——在这个实验室里，两者不可分割。"
  },
  "pe.faculty":   { ko:"교수진", ja:"教員", zh:"教师" },
  "pe.faculty.n": { ko:"책임연구자", ja:"研究代表者", zh:"负责人" },
  "pe.pi.role": {
    ko:"PT, PhD · 책임연구자",
    ja:"PT, PhD · 研究代表者",
    zh:"PT, PhD · 负责人"
  },
  "pe.pi.bio": {
    ko:"광주보건대학교 시니어운동처방과 조교수 및 학과장. 그의 연구는 보통 따로 다뤄지는 세 가지를 한자리에 놓습니다 — 신체적 부하 아래에서 노년의 피질이 어떻게 움직이는가, 조직이 다 나은 뒤에도 통증은 왜 남는가, 그리고 예측 모델이 실제 지역사회와 부딪히고도 살아남으려면 무엇이 필요한가.",
    ja:"光州保健大学校シニア運動処方学科 助教授・学科長。彼の研究は、通常は別々に扱われる三つの問題を一つの場に置きます——身体的負荷のもとで高齢者の皮質はどうふるまうのか、組織が治癒した後もなぜ痛みは残るのか、そして予測モデルが現実の地域社会との接触に耐えるには何が必要か。",
    zh:"光州保健大学老年运动处方系 助理教授兼系主任。他的研究把通常被分开处理的三件事放在一起：负荷之下年长者的皮层如何运作、组织愈合之后疼痛为何仍在，以及一个预测模型要经受住真实社区的检验需要什么。"
  },
  "pe.pi.li1": { ko:"AI 스포츠테크 연구센터장", ja:"AIスポーツテック研究センター長", zh:"AI运动科技研究中心 主任" },
  "pe.pi.li2": { ko:"fNIRS · 비침습적 뇌자극 · 통증신경과학",
                 ja:"fNIRS · 非侵襲的脳刺激 · 疼痛神経科学",
                 zh:"fNIRS · 非侵入性脑刺激 · 疼痛神经科学" },

  "pe.res":     { ko:"연구원", ja:"研究員", zh:"研究人员" },
  "pe.res.n":   { ko:"박사후연구원 · 연구스태프", ja:"博士研究員 · 研究スタッフ", zh:"博士后 · 研究人员" },
  "pe.grad":    { ko:"대학원생", ja:"大学院生", zh:"研究生" },
  "pe.grad.n":  { ko:"석사 · 박사과정", ja:"修士 · 博士課程", zh:"硕士 · 博士生" },
  "pe.alum":    { ko:"졸업생", ja:"修了生", zh:"毕业去向" },
  "pe.alum.n":  { ko:"어디로 갔는가", ja:"その後の進路", zh:"他们去了哪里" },

  "role.postdoc": { ko:"박사후연구원", ja:"博士研究員", zh:"博士后研究员" },
  "role.fellow":  { ko:"연구교수",     ja:"研究員（フェロー）", zh:"研究员" },
  "role.ra":      { ko:"연구보조원",   ja:"研究補助員", zh:"研究助理" },
  "role.phd":     { ko:"박사과정",     ja:"博士課程", zh:"博士生" },
  "role.msc":     { ko:"석사과정",     ja:"修士課程", zh:"硕士生" },

  "pe.b1": { ko:"노인의 이중과제 보행 중 전전두엽 혈역학.",
             ja:"高齢者の二重課題歩行における前頭前野の血行動態。",
             zh:"老年人双重任务步行中的前额叶血流动力学。" },
  "pe.b2": { ko:"만성 근골격계 통증에서의 비침습적 뇌자극 프로토콜.",
             ja:"慢性筋骨格系疼痛における非侵襲的脳刺激プロトコル。",
             zh:"慢性肌骨疼痛中的非侵入性脑刺激方案。" },
  "pe.b3": { ko:"지역사회 코호트 모집 및 멀티모달 데이터 수집.",
             ja:"地域コホートのリクルートとマルチモーダルデータ収集。",
             zh:"社区队列招募与多模态数据采集。" },
  "pe.b4": { ko:"노쇠 표현형과 피질 활성 비대칭.",
             ja:"フレイルの表現型と皮質活動の非対称性。",
             zh:"衰弱表型与皮层激活的不对称性。" },
  "pe.b5": { ko:"스포츠 복귀 판단에서의 마커리스 동작분석.",
             ja:"スポーツ復帰の判断におけるマーカーレス動作解析。",
             zh:"重返运动决策中的无标记动作分析。" },
  "pe.b6": { ko:"노쇠의 자율신경 지표로서의 심박변이도.",
             ja:"フレイルの自律神経指標としての心拍変動。",
             zh:"作为衰弱自主神经标志物的心率变异性。" },

  /* ══ openings (people + contact) ═════════════════════════════════════ */
  "op.eyebrow": { ko:"모집", ja:"募集", zh:"招聘" },
  "op.h":       { ko:"두 자리가 비어 있습니다.", ja:"二つの席が空いています。", zh:"我们有两个位置。" },
  "op.note.people": {
    ko:"물리치료·운동학·의공학 배경의 대학원생 1명, 그리고 fNIRS 또는 신호처리 경험이 있는 박사후연구원 1명을 찾고 있습니다. CV와 함께, 무엇을 측정하고 싶은지 한 문단을 적어 보내주세요.",
    ja:"理学療法・運動学・生体医工学のバックグラウンドを持つ大学院生1名と、fNIRSまたは信号処理の経験を持つ博士研究員1名を募集しています。CVに加えて、「何を測定したいのか」を一段落で書いてお送りください。",
    zh:"我们正在寻找一名具有物理治疗、运动学或生物医学工程背景的研究生，以及一名具备fNIRS或信号处理经验的博士后。请附上简历，并用一段话写明你想测量什么。"
  },
  "op.note.contact": {
    ko:"물리치료·운동학·의공학 배경의 대학원생 1명, 그리고 fNIRS 또는 신호처리 경험이 있는 박사후연구원 1명을 찾고 있습니다. CV와 함께, 무엇을 측정하고 싶은지 한 문단을 적어 보내주세요 — 그 한 문단이 CV보다 중요합니다.",
    ja:"理学療法・運動学・生体医工学のバックグラウンドを持つ大学院生1名と、fNIRSまたは信号処理の経験を持つ博士研究員1名を募集しています。CVに加えて、「何を測定したいのか」を一段落で書いてお送りください——その一段落のほうが、CVよりも重要です。",
    zh:"我们正在寻找一名具有物理治疗、运动学或生物医学工程背景的研究生，以及一名具备fNIRS或信号处理经验的博士后。请附上简历，并用一段话写明你想测量什么——那一段话比简历更重要。"
  },

  /* ══ contact ═════════════════════════════════════════════════════════ */
  "ct.eyebrow": { ko:"연락처", ja:"お問い合わせ", zh:"联系" },
  "ct.lede": {
    ko:"우리는 노화, 통증, 인간 수행능력을 연구하는 임상가·공학자·해외 연구그룹과 협력합니다. fNIRS나 노인재활에 관심 있는 학생의 연락을 환영합니다.",
    ja:"私たちは、加齢・疼痛・ヒトのパフォーマンスに取り組む臨床家、エンジニア、海外の研究グループと協働しています。fNIRSや高齢者リハビリテーションに関心のある学生からのご連絡を歓迎します。",
    zh:"我们与从事衰老、疼痛与人体表现研究的临床医生、工程师及海外研究团队合作。欢迎对fNIRS或老年康复感兴趣的学生来信。"
  },
  "ct.pi": { ko:"책임연구자", ja:"研究代表者", zh:"负责人" },
  "ct.affil": {
    ko:"<b style=\"font-weight:500;color:var(--bone)\">김현중</b> (Hyunjoong Kim), PT, PhD<br>조교수 · 학과장<br>시니어운동처방과<br>광주보건대학교<br>대한민국 광주",
    ja:"<b style=\"font-weight:500;color:var(--bone)\">Hyunjoong Kim</b>, PT, PhD<br>助教授・学科長<br>シニア運動処方学科<br>光州保健大学校<br>大韓民国 光州",
    zh:"<b style=\"font-weight:500;color:var(--bone)\">Hyunjoong Kim</b>, PT, PhD<br>助理教授 · 系主任<br>老年运动处方系<br>光州保健大学<br>韩国 光州"
  },
  "ct.else": { ko:"그 밖의 채널", ja:"その他のリンク", zh:"其他链接" },
  "ct.univ": { ko:"<b>소속 대학</b> — 광주보건대학교",
               ja:"<b>所属大学</b> — 光州保健大学校",
               zh:"<b>所属大学</b> — 光州保健大学" },

  /* ══ publications ════════════════════════════════════════════════════ */
  "pb.eyebrow": { ko:"논문", ja:"論文", zh:"论文" },
  "pb.h1":      { ko:"기록.", ja:"実績。", zh:"记录。" },
  "pb.lede": {
    ko:"신경재활, 통증과학, 노인운동의학 전반에 걸친 동료심사 논문. 각 항목은 DOI로 연결됩니다. 최신 전체 목록은 ORCID에 있습니다. (논문 제목과 저널명은 원문 그대로 표기합니다.)",
    ja:"神経リハビリテーション、疼痛科学、高齢者運動医学にわたる査読付き論文。各項目はDOIにリンクしています。最新の完全なリストはORCIDをご覧ください。（論文タイトルと雑誌名は原語のまま表記しています。）",
    zh:"涵盖神经康复、疼痛科学与老年运动医学的同行评审论文。每条均链接至DOI。完整且最新的列表见ORCID。（论文标题与期刊名保留原文。）"
  }

  };

  /* ══ engine ═══════════════════════════════════════════════════════════ */
  var STORE = "nms-lang";
  var codes = LANGS.map(function (l) { return l.code; });

  function save(c) { try { localStorage.setItem(STORE, c); } catch (e) {} }
  function load()  { try { return localStorage.getItem(STORE); } catch (e) { return null; } }

  function resolve() {
    var q = null;
    try { q = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    if (q && codes.indexOf(q) > -1) return q;
    var s = load();
    if (s && codes.indexOf(s) > -1) return s;
    var n = (navigator.language || "en").slice(0, 2).toLowerCase();
    return codes.indexOf(n) > -1 ? n : "en";
  }

  /* Hangul/CJK webfonts load only if that language is actually selected —
     an English visitor downloads nothing extra. */
  var FONT = {
    ko: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@300;400;700&display=swap",
    ja: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@300;400;700&display=swap",
    zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;700&display=swap"
  };
  var fontLoaded = {};
  function ensureFont(c) {
    if (c === "en" || fontLoaded[c] || !FONT[c]) return;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT[c];
    document.head.appendChild(l);
    fontLoaded[c] = true;
  }

  function apply(lang) {
    ensureFont(lang);
    document.documentElement.setAttribute("lang", lang);

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el.getAttribute("data-i18n-en")) el.setAttribute("data-i18n-en", el.innerHTML);
      var entry = DICT[el.getAttribute("data-i18n")];
      el.innerHTML = (lang === "en" || !entry || !entry[lang])
        ? el.getAttribute("data-i18n-en")
        : entry[lang];
    }

    var tkey = document.body.getAttribute("data-i18n-title");
    if (tkey) {
      if (!document.body.getAttribute("data-title-en"))
        document.body.setAttribute("data-title-en", document.title);
      var te = DICT[tkey];
      document.title = (lang === "en" || !te || !te[lang])
        ? document.body.getAttribute("data-title-en")
        : te[lang];
    }

    var btns = document.querySelectorAll(".langsw button");
    for (var j = 0; j < btns.length; j++)
      btns[j].setAttribute("aria-pressed",
        btns[j].getAttribute("data-lang") === lang ? "true" : "false");
  }

  function mount() {
    var host = document.querySelector(".langsw");
    if (host) {
      host.innerHTML = LANGS.map(function (l) {
        return '<button type="button" data-lang="' + l.code + '" lang="' + l.code +
               '" aria-pressed="false" title="' + l.name + '">' + l.label + "</button>";
      }).join("");
      host.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-lang]");
        if (!b) return;
        var c = b.getAttribute("data-lang");
        save(c);
        apply(c);
        try {
          var u = new URL(location.href);
          u.searchParams.set("lang", c);
          history.replaceState(null, "", u);     /* keeps the link shareable */
        } catch (err) {}
      });
    }
    apply(resolve());
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
