import { executeQuery } from '../database/database.js';
import { bcrypt } from '../deps.js';

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @return null|email
 */
const register = async(email, password) => {
  const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1", email);
  
  if (existingUsers.rowCount > 0) {

    return null;
  }
  
  const hash = await bcrypt.hash(password);

  await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);

  return email;
}

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @return null|user
 */
const authenticate = async(email, password) => {
  const res = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
  if (res.rowCount === 0) {
      
      return null;
  }

  const userObj = res.rowsOfObjects()[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
     
      return null;
  }

  return {
      id: userObj.id,
      email: userObj.email
  };
}

export {authenticate, register};
