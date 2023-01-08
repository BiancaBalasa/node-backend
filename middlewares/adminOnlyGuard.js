const adminOnlyGuard = (request, response, next) => {
    const isAdmin = request.tokenPayload.role === 'ADMIN';
  
    if(!isAdmin) {
        response.status(403).send({ 'message': 'Not Allowed'});
        return;
    } else {
        next();
    }
  }
  
  module.exports = adminOnlyGuard;