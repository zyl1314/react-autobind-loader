const genAst = require('./lib/genAst.js');
const getInsertList = require('./lib/getInsertList.js');

module.exports = content => {
  const ast = genAst(content);
  const insertList = getInsertList(ast);
  return process(insertList, content)
} 

function process(insertList, content) {
  let insertLen = 0;
  let result = content;
  insertList.forEach(i => {
    const idx = i.insertPos + insertLen;
    const l = result.slice(0, idx);
    const r = result.slice(idx);
    result = l + i.code + r;
    insertLen += i.code.length;
  });
  return result;
}