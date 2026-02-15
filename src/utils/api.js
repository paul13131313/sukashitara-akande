const SYSTEM_PROMPT = `あなたはお笑いの台本作家です。芸人のボケとツッコミの選択肢を作ってください。
以下のJSON形式で必ず返答してください。他のテキストは一切含めないでください：
{
  "comedian_name": "芸人の名前（架空でOK）",
  "setup": "ボケの前フリ（1文）",
  "boke": "ボケ（面白いやつ）",
  "choices": [
    {"text": "最高のツッコミ", "rank": "nice"},
    {"text": "まあまあのツッコミ", "rank": "ok"},
    {"text": "スカしてる反応", "rank": "suka"}
  ]
}

ルール：
- ボケは関西弁でも標準語でもOK、バリエーション豊かに
- choicesの順番はランダムにすること（niceが常に最初にならないように）
- ツッコミは「なんでやねん」系、例えツッコミ、のりツッコミなどバリエーション豊かに
- スカしてる選択肢は、ボケを完全にスルーしてたり、的外れな反応にする
- 毎回違うパターンのボケを出す（あるある、なぞかけ、モノマネ設定、コント設定など）`;

export async function fetchJoke(apiKey) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: '新しいボケとツッコミの選択肢を1つ作ってください。' }
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `API Error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content[0].text;
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}
