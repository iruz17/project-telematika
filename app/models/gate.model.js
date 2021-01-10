module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      locationId: String,
      type: String,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('gate', schema);
};
