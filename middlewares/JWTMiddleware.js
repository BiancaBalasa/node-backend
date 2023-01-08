const jwt = require('jsonwebtoken');

const JWTMiddleware = (request, response, next) => {
  const authorization = request.headers.authorization;
  if(!authorization) {
      next();
      return;
  }

  const token = authorization.replace('Bearer ', '');    

  try {
      const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
      request.tokenPayload = tokenPayload;
      next();
  } catch (e) {
      next();
      return;
  }    
}

module.exports = JWTMiddleware;