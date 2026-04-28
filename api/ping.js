module.exports = (req, res) => {
  res.json({ status: 'pong', mongo_set: !!process.env.MONGO_URI });
};
