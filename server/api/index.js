module.exports = {
  getAll(entity) {
    return entity.find({});
  },
  findById(entity, id) {
    return entity.findById(id);
  },
  findOne(entity, fields) {
    return entity.findOne(fields);
  }
};
