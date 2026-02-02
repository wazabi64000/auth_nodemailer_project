import jwt from "jsonwebtoken";
import "dotenv/config";

// middleware pour vérifier si on est authentifié  

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: " Token manquant " });

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token invalide" });
  }
};

// middleware qui va vérifier si on a le bon role pour passer dans une route protégé par un  role 

export const authorize = (roles=[]) => (req, res, next) => {
    if(!roles.includes(req.user.role)) return res.status(403).json({message: "Accès intedit "})
    next()    
}