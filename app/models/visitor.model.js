module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            CardID: String,
            Name: String,
            Age: Number,
            Gender: String,
            City: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Visitor = mongoose.model("Visitor", schema);
    return Visitor;
};