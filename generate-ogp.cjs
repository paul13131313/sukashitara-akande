const { createCanvas } = require('canvas');
const fs = require('fs');

// OGP画像 (1200x630)
const w = 1200, h = 630;
const canvas = createCanvas(w, h);
const ctx = canvas.getContext('2d');

// 背景 - ダークネイビー
const bgGrad = ctx.createLinearGradient(0, 0, w, h);
bgGrad.addColorStop(0, '#1a1a2e');
bgGrad.addColorStop(1, '#0f0f23');
ctx.fillStyle = bgGrad;
ctx.fillRect(0, 0, w, h);

// 緞帳（上部）
const curtainGrad = ctx.createLinearGradient(0, 0, 0, 100);
curtainGrad.addColorStop(0, '#8B0000');
curtainGrad.addColorStop(1, '#4a0000');
ctx.fillStyle = curtainGrad;
ctx.fillRect(0, 0, w, 100);
// 緞帳の金ライン
ctx.fillStyle = '#FFD700';
ctx.fillRect(0, 96, w, 8);

// 緞帳の波（scallop）
ctx.fillStyle = '#4a0000';
for (let x = 0; x < w; x += 80) {
  ctx.beginPath();
  ctx.arc(x + 40, 100, 40, 0, Math.PI, false);
  ctx.fill();
}

// スポットライト効果
const spot = ctx.createRadialGradient(w/2, 180, 0, w/2, 180, 400);
spot.addColorStop(0, 'rgba(255, 215, 0, 0.12)');
spot.addColorStop(1, 'transparent');
ctx.fillStyle = spot;
ctx.fillRect(0, 0, w, h);

// サブスポットライト（赤ピンク）
const spot2 = ctx.createRadialGradient(350, 450, 0, 350, 450, 250);
spot2.addColorStop(0, 'rgba(255, 51, 102, 0.08)');
spot2.addColorStop(1, 'transparent');
ctx.fillStyle = spot2;
ctx.fillRect(0, 0, w, h);

// サブスポットライト（ブルー）
const spot3 = ctx.createRadialGradient(850, 450, 0, 850, 450, 250);
spot3.addColorStop(0, 'rgba(74, 144, 217, 0.08)');
spot3.addColorStop(1, 'transparent');
ctx.fillStyle = spot3;
ctx.fillRect(0, 0, w, h);

// マイク絵文字
ctx.font = '120px serif';
ctx.textAlign = 'center';
ctx.fillText('🎤', w/2, 250);

// タイトル「スカしたら」
ctx.font = 'bold 72px sans-serif';
ctx.fillStyle = '#FFFFFF';
ctx.textAlign = 'center';
ctx.shadowColor = 'rgba(255, 51, 102, 0.5)';
ctx.shadowBlur = 40;
ctx.fillText('スカしたら', w/2, 360);

// 「あかんで」（赤ピンク）
ctx.fillStyle = '#FF3366';
ctx.shadowColor = 'rgba(255, 51, 102, 0.7)';
ctx.shadowBlur = 50;
ctx.fillText('あかんで', w/2, 450);

// サブテキスト
ctx.shadowBlur = 0;
ctx.font = '28px sans-serif';
ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
ctx.fillText('芸人のボケにツッコめ！スカしたら…あかんで？', w/2, 530);

// 判定バッジ
const badges = [
  { emoji: '🎯', x: 200, color: '#FF3366' },
  { emoji: '😏', x: 600, color: '#FFB347' },
  { emoji: '💀', x: 1000, color: '#4A90D9' },
];
badges.forEach(b => {
  ctx.beginPath();
  ctx.arc(b.x, 580, 25, 0, Math.PI * 2);
  ctx.fillStyle = b.color + '30';
  ctx.fill();
  ctx.strokeStyle = b.color;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.font = '28px serif';
  ctx.fillText(b.emoji, b.x, 590);
});

// 保存
fs.writeFileSync('public/ogp.png', canvas.toBuffer('image/png'));
console.log('OGP image generated: public/ogp.png');

// favicon (32x32)
const fCanvas = createCanvas(32, 32);
const fCtx = fCanvas.getContext('2d');
const fbg = fCtx.createLinearGradient(0, 0, 32, 32);
fbg.addColorStop(0, '#1a1a2e');
fbg.addColorStop(1, '#FF3366');
fCtx.fillStyle = fbg;
fCtx.beginPath();
fCtx.arc(16, 16, 16, 0, Math.PI * 2);
fCtx.fill();
fCtx.font = '22px serif';
fCtx.textAlign = 'center';
fCtx.textBaseline = 'middle';
fCtx.fillText('🎤', 16, 16);
fs.writeFileSync('public/favicon.png', fCanvas.toBuffer('image/png'));
console.log('Favicon generated: public/favicon.png');
