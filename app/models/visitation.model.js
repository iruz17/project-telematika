module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            VisitorID: String,
            GateID: String,
            Timestamp: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Visitation = mongoose.model("Visitation", schema);
    return Visitation;
};