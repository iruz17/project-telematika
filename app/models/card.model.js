module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            id: String,
            validityDate: String,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Card = mongoose.model("Card", schema);
    return Card;
};