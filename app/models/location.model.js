module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      type: String,
      longitude: Number,
      latitude: Number,
      description: String,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('location', schema);
};
