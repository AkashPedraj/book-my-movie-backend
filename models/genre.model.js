module.exports = mongoose => {
  const GenreSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Genre", GenreSchema);
};
