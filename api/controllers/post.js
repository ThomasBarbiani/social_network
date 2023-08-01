import {db} from "../connect.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Não está logado!")

    jwt.verify(token, "secretKey", (err, userInfo) =>{
        if (err) return res.status(403).json("Token não é válido")
    
        const q = `
        SELECT p.*, u.id AS userId, name, profilePic 
        FROM posts AS p 
        JOIN users AS u ON (u.id = p.userId)
        LEFT JOIN relationships AS r ON (p.userId = r.followedUserId)
        WHERE r.followerUserId = ? OR p.userId = ?`

        db.query(q, [userInfo.id, userInfo.id], (err, data)=>{
            if(err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })    
}