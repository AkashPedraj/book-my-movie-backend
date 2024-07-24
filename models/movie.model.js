module.exports = mongoose => {
  const MovieSchema = mongoose.Schema(
    {
      title: { type: String, required: true },
      status: { type: String, required: true },
      genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
      artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
      releaseDate: { type: Date },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Movie", MovieSchema);
};
