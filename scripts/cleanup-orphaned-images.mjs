import fs from 'node:fs';
import path from 'node:path';

const articlesDir = path.resolve('src/content/articles');

console.log('開始清理文章資料夾...');
console.log('');

if (!fs.existsSync(articlesDir)) {
  console.log('找不到文章資料夾：');
  console.log(articlesDir);
  process.exit(1);
}

const entries = fs.readdirSync(articlesDir, {
  withFileTypes: true,
});

let deletedFiles = 0;
let deletedFolders = 0;

for (const entry of entries) {
  if (!entry.isDirectory()) {
    continue;
  }

  const articleDir = path.join(articlesDir, entry.name);
  const indexFile = path.join(articleDir, 'index.md');
  const indexMdxFile = path.join(articleDir, 'index.mdx');

  const hasArticleFile =
    fs.existsSync(indexFile) || fs.existsSync(indexMdxFile);

  // 有 index.md / index.mdx 的資料夾是正常文章，不處理
  if (hasArticleFile) {
    continue;
  }

  const files = fs.readdirSync(articleDir);

  // 空資料夾直接跳過
  if (files.length === 0) {
    continue;
  }

  console.log(`發現孤兒資料夾：${entry.name}`);

  for (const file of files) {
    const filePath = path.join(articleDir, file);

    if (fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);

      console.log(`  已刪除：${file}`);

      deletedFiles++;
    }
  }

  // 確認資料夾已經沒有檔案後，再刪除資料夾
  const remainingFiles = fs.readdirSync(articleDir);

  if (remainingFiles.length === 0) {
    fs.rmdirSync(articleDir);

    console.log(`  已刪除資料夾：${entry.name}`);
    console.log('');

    deletedFolders++;
  }
}

console.log('------------------------------');
console.log(`共刪除 ${deletedFiles} 個檔案。`);
console.log(`共刪除 ${deletedFolders} 個空資料夾。`);
console.log('');
console.log('清理完成。');
