module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      cardId: String,
      name: String,
      age: Number,
      gender: String,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('visitor', schema);
};
