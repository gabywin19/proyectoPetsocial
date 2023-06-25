const {create, remove} = require("../Controllers/comentarios.controller");
const{authenticate}= require("../Config/jwt.config");
 

module.exports = (app) => {
  app.post("/api/comentarios/:id",authenticate,create);
  app.delete("/api/comentarios/:id",authenticate,remove);
 
};