module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      visitorId: String,
      gateId: String,
      timestamp: String,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('visitation', schema);
};
