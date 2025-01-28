import jwt from 'jsonwebtoken';

const generateAccessToken = async (userId) => {
  const accessToken = jwt.sign(
    { _id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    {
      expiresIn: '1h',
    }
  );
  return accessToken;
};

export default generateAccessToken;
