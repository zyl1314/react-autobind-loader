const parser = require('@babel/parser');

module.exports = content => {
  let ast = void 0;
  try {
    ast = parser.parse(content, { 
      sourceType: 'module', 
      plugins: [
        "jsx",
        "classProperties"
      ]
    });
  } catch(err) {
    ast = parser.parse(content, { 
      sourceType: 'script', 
      plugins: [
        "jsx",
        "classProperties"
      ]
    });
  }
  return ast;  
}