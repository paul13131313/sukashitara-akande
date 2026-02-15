const fallbackJokes = [
  {
    comedian_name: "田中ボケ太郎",
    setup: "この前、初めてスカイダイビングに挑戦したんですよ",
    boke: "飛び降りる瞬間に「あ、傘忘れた」って言ったら、インストラクターが本気で泣き出して",
    choices: [
      { text: "傘ちゃう！パラシュートや！", rank: "nice" },
      { text: "インストラクターも大変やな", rank: "ok" },
      { text: "スカイダイビングって高いですよね", rank: "suka" }
    ]
  },
  {
    comedian_name: "鈴木ツッコミ之助",
    setup: "うちのおかん、最近スマホデビューしたんやけど",
    boke: "Siriに向かって「もしもし？お世話になっております」って言うてんねん",
    choices: [
      { text: "ビジネスマナーええけど相手AIやぞ！", rank: "nice" },
      { text: "Siriも困るやろな", rank: "ok" },
      { text: "Siriって便利ですよね", rank: "suka" }
    ]
  },
  {
    comedian_name: "佐藤ネタ蔵",
    setup: "昨日、回転寿司に行ったんですよ",
    boke: "隣のおっさんがレーンに乗って回ってきて「大トロです」って自己紹介してきた",
    choices: [
      { text: "人間回すな！しかも大トロ名乗んな！", rank: "nice" },
      { text: "回転寿司もいろいろあるな", rank: "ok" },
      { text: "回転寿司のサーモン美味しいですよね", rank: "suka" }
    ]
  },
  {
    comedian_name: "山田ワラ子",
    setup: "コンビニでバイトしてるんですけど",
    boke: "お客さんが「温めますか？」って聞いたら「お前の心をな」って返してきて",
    choices: [
      { text: "こっちが聞く側やし、心は温められへんわ！", rank: "nice" },
      { text: "なかなかロマンチストやな", rank: "ok" },
      { text: "コンビニのお弁当も進化しましたよね", rank: "suka" }
    ]
  },
  {
    comedian_name: "高橋テンポ良男",
    setup: "最近ジムに通い始めたんですけど",
    boke: "トレーナーに「限界まで追い込んで！」って言われて、確定申告の書類出してもうた",
    choices: [
      { text: "追い込むとこ違うわ！筋肉の話や！", rank: "nice" },
      { text: "確定申告も大事やけどな", rank: "ok" },
      { text: "ジムって月額いくらですか？", rank: "suka" }
    ]
  },
  {
    comedian_name: "中村オチ美",
    setup: "この前、合コンに行ったんやけど",
    boke: "自己紹介で「趣味は人間観察です」って言ったら、全員帰った",
    choices: [
      { text: "言い方！合コンでそれはホラーやろ！", rank: "nice" },
      { text: "まあ確かにちょっと怖いな", rank: "ok" },
      { text: "合コンって何人くらいでやるんですか？", rank: "suka" }
    ]
  },
  {
    comedian_name: "木村ドカン太",
    setup: "うちの猫がめちゃくちゃ賢くて",
    boke: "朝起きたらパソコンで株のデイトレードしとってん。しかも含み益出とる",
    choices: [
      { text: "猫が株やんな！しかも才能あんのかい！", rank: "nice" },
      { text: "賢い猫やなあ", rank: "ok" },
      { text: "猫カフェとか最近流行ってますよね", rank: "suka" }
    ]
  },
  {
    comedian_name: "渡辺ギャグ郎",
    setup: "昨日、初デートでいい雰囲気やったんですよ",
    boke: "「君の瞳に乾杯」って言おうとして「君の瞳に完敗」って言うてもうた",
    choices: [
      { text: "負けてどうすんねん！ロマンチックに勝て！", rank: "nice" },
      { text: "緊張するよな初デート", rank: "ok" },
      { text: "どこのレストラン行ったんですか？", rank: "suka" }
    ]
  }
];

export default fallbackJokes;
