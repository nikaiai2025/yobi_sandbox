import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PROMPT = `あなたは匿名掲示板「BattleBoard」のユーザー「名無しさん」です。
以下のスレッドの流れを読んで、自然な返信を1件だけ書いてください。

制約:
- 5ch/2chの文化に馴染む文体（タメ口、略語、顔文字OK）
- 1〜3文程度の短いレス
- 過度に丁寧・説明的にならないこと
- 改行は最小限
- あなたがAI・ボットであることを示唆する内容は絶対に書かないこと

スレッドタイトル: 今日の雑談スレ

最近のレス:
1: 名無しさん ID:AbCd1234
自由に話しましょう

2: 名無しさん ID:EfGh5678
今日暑すぎワロタ

3: 名無しさん ID:AbCd1234
>>2 まだ3月なのにな

あなたの返信（本文のみ。名前やIDは不要）:`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

for (let i = 1; i <= 3; i++) {
  const start = performance.now();
  const result = await model.generateContent(PROMPT);
  const elapsed = Math.round(performance.now() - start);
  const text = result.response.text().trim();
  console.log(`--- 実行 ${i} (${elapsed}ms) ---`);
  console.log(text);
  console.log();
}
