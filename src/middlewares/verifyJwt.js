import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const SECRET = process.env.JWT_SECRET;

const verifyJwt = (req, res, next) => {
  const token = req.headers['x-access-token'];


  if (!token) {
    return res.status(401).send('Acesso negado. Token não fornecido.');
  }

  try {
    const verified = jwt.verify(token, SECRET);
    req.userid = verified.userid

    console.log(req.userid)

    next(); 
  } catch (err) {
    res.status(400).send('Token inválido.');
  }
};

export default verifyJwt;