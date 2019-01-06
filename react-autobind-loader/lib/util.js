const t = require('@babel/types');

const isReactComponent = node => {
  if(!node.superClass) { 
    return false;
  }

  if(t.isIdentifier(node.superClass, { name: 'Component' })) {
    return true;
  }

  if(t.isMemberExpression(node.superClass) && t.isIdentifier(node.superClass.object, { name: 'React' }) && t.isIdentifier(node.superClass.property, { name: 'Component' })) {
    return true;
  }

  return false;
}

const hasConstructor = node => {
  const body = node.body.body;
  return body.some(n => n.type === 'ClassMethod' && n.key.name === 'constructor');
}

module.exports = {
  isReactComponent,
  hasConstructor
}