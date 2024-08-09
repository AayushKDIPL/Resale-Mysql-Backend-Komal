import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Assuming this is a Sequelize model

export const createJwtToken = (admin, tokenVersion, id) => {
  let fields = { admin, tokenVersion, id };
  const accesstoken = jwt.sign(fields, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '300000s', // Adjust expiration as needed
  });

  // Decode the token to check the exp value
  const decodedToken = jwt.decode(accesstoken);
  console.log('Token created, expires at:', new Date(decodedToken.exp * 1000).toLocaleString());

  return accesstoken;
};

const isTokenExpired = (exp) => Date.now() >= exp * 1000;

export const verifyToken = async (token, secret) => {
  try {
    // Decode the token
    var decoded = jwt.verify(token, secret);

    // Find the user by id using Sequelize
    let user = await User.findOne({ where: { id: decoded.id } });

    if (
      user &&
      !isTokenExpired(decoded.exp) &&
      user.tokenVersion === decoded.tokenVersion
    ) {
      return user;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
