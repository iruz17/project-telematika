module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            type: String,
            longitude: Number,
            latitude: Number
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Location = mongoose.model("location", schema);
    return Location;
};