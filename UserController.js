const {
    PrismaClient
} = require("@prisma/client");

const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

module.exports = {
    async createUser(req, res) {
        try {
            const {
                firstName,
                lastName,
                role,
                age,
                email,
                password
            } = req.body

            const salt = await bcrypt.genSalt();
            console.log(salt)

            const hash = await bcrypt.hash(password, salt)
            console.log(hash)

            const verifyemail = await prisma.UserInfo.findUnique({
                where: {
                    email
                }
            })

            if (verifyemail) {
                return res.send({
                    "error": "email"
                })
            }

            console.log("aqui")

            const user = await prisma.UserInfo.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    role: role,
                    age: age,
                    email: email,
                    password: hash
                }
            });

            return res.send({"sucess" : "true"})

        } catch (error) {
            
            console.log(error)
            

        }
    },

    async login(req, res) {
        try {

            const {email, password} = req.body

            const user = await prisma.UserInfo.findUnique({
                where: {
                    email : req.body.email
                }
            })  
            console.log("aqui")
            
            if(user)  {
                const match = await bcrypt.compare(password, user.password)
                if(match) {
                    return res.send({"sucess": "true"})
                }
                else {
                    return res.send({"sucess": "false"})
                }
                        
            }

        } catch (error) {
            
            return console.log(error)
        }
    }
}