require('dotenv').config()

const connectDB = require('./database/connect')
const Skill = require('./models/Skill')

const skills = require('./skills.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Skill.deleteMany()

    const newSkills = skills.map((skill) => {
      return { skill: skill }
    })

    await Skill.create(newSkills)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
