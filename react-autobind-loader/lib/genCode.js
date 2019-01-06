module.exports = (hasConstructor, methods) => {
  const computed = methods.map(m => `this.${m} = this.${m}.bind(this);`).join('\n');
  if(hasConstructor) {
    return computed;
  }

  return `\nconstructor(props) {
      super(props);
      ${computed}
  }`;
}