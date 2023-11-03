const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// to give the user authentication to access the routes

const authMiddleware = async (req, res, next) => {

  if(req.headers.authorization){
    let [tokenSyn, token] = req.headers.authorization.trim().split(" ");
  
    try {
      if (tokenSyn=="Bearer") {
            const decodedToken = jwt.verify(token, "WITHIYC");
            req.body.venderId = decodedToken.userid;
            next();
        
      } else {
        res.status.json({error : "Token not authorized."});
        return;
      }
    } catch (e) {
      res.status(500).json({error : "Token not authorized."});
    }
  }
  };

  module.exports = { authMiddleware }

  