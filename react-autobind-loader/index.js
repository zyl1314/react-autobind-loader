const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

module.exports = content => {
  let ast;
  try {
    ast = parser.parse(content, { 
      sourceType: 'module', 
      plugins: [
        "jsx"
      ]
    });
  } catch(err) {
    ast = parser.parse(content, { 
      sourceType: 'script', 
      plugins: [
        "jsx"
      ]
    });
  }


  traverse(ast, {
    enter(path) {
      if(t.isClassDeclaration(path.node)) {
        content = process(path.node, content);
      }
    }
  })
  console.log(content);
  return content; 
}

function process(node, content) {
  const left = content.slice(0, 341);
  const right = content.slice(341);
  return left + ';\nthis.test = this.test.bind(this);' + right;
}