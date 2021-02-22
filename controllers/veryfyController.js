const isVerify = async (req, res) => {
  try {
    res.status(200).json(true);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = { isVerify: isVerify };
