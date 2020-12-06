module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            cardId: String,
            name: String,
            age: Number,
            gender: String,
            city: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Visitor = mongoose.model("visitor", schema);
    return Visitor;
};