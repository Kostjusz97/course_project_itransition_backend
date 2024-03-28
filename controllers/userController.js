const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
      {id, email, role}, 
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
      )
  }

class UserController {
    async registration(req, res, next) {
        const {nickname, email, password} = req.body
        if (!email || !password) {
          return next(ApiError.badRequest('Incorrect email or password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
          return next(ApiError.badRequest('User with email already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, nickname, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
          return res.json({token})
      }
    
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
          return next(ApiError.internal('User is not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
          return next(ApiError.internal('Wrong password specified'))
            }
        const token = generateJwt(user.id, user.email, user.role)
          return res.json({token})
      }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email ,req.user.role)
        return res.json({token})
      }

    async getAll(req, res) {
        try {
            const users = await User.findAll()
            res.json(users)
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve users' })
        }
      }

    async remove(req, res) {
        const id = req.params.id
        try {
            const user = await User.findByPk(id)
            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }
            await user.destroy()
            return res.json({ message: 'User removed successfully' })
        } catch (error) {
            return res.status(500).json({ error: 'Failed to remove user' })
        }
      }

    async update(req, res) {
        const id = req.params.id;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const { role, status } = req.body;
            await user.update({ role, status }); 
            return res.json({ message: 'User updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update user' });
        }
    }
}

module.exports = new UserController()