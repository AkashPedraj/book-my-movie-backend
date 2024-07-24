module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      first_name: String,
      last_name: String,
      username: String,
      password: String,
      uuid: String,
      isLoggedIn: Boolean,
      access_token: String,
    },
    { timestamps: true }
  );

  const User = mongoose.model('User', schema);
  return User;
};
