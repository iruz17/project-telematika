module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            LocationID: String,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Gate = mongoose.model("Gate", schema);
    return Gate;
};