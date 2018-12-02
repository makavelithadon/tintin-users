if (!("flat" in Array.prototype)) {
  const flat = function flat() {
    return this.reduce((a, b) => a.concat(Array.isArray(b) ? b.flat() : b), []);
  };
  Array.prototype.flat = flat;
}
