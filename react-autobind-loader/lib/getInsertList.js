const traverse = require('@babel/traverse').default;
const { isReactComponent, hasConstructor } = require('./util.js');
const genCode = require('./genCode');

const processWithConstructor = (node, insertList) => {
  const body = node.body.body;
  const insertPos = body.filter(n => n.type === 'ClassMethod' && n.key.name === 'constructor')[0].end - 1;
  const m = body.filter(n => n.type === 'ClassMethod' && n.key.name !== 'constructor' && n.key.name !== 'render').map(n => n.key.name);
  
  m.length && insertList.push({
    insertPos,
    code: genCode(true, m)
  })
}

const processWithNonConstructor = (node, insertList) => {
  const body = node.body.body;
  const insertPos = node.body.start + 1;
  const m = body.filter(n => n.type === 'ClassMethod' && n.key.name !== 'constructor' && n.key.name !== 'render').map(n => n.key.name);
  
  m.length && insertList.push({
    insertPos,
    code: genCode(false, m)
  })
}

const _traverse = ast => {
  const insertList = [];

  const processNode = node => {
    hasConstructor(node) ? processWithConstructor(node, insertList) : processWithNonConstructor(node, insertList); 
  }
  
  const filterReactComponent = path => {
    if(isReactComponent(path.node)) return processNode(path.node);
  }
  const visitor = {
    ClassExpression: filterReactComponent,
    ClassDeclaration: filterReactComponent
  }
  
  traverse(ast, visitor);
  return insertList;
}

module.exports = ast => _traverse(ast)