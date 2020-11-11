module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            ID: String,
            ValidityDate: String,
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