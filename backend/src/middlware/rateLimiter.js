import ratelimit from '../config/upstash.js'

const rateLimiter = async (req,res,next) =>{
   try {
    const {success} = await ratelimit.limit(req.ip)

    console.log(success)

    if(!success) return res.status(429).json({
        message:'to many rerquest, please try again'
    })

    next()
   } catch (error) {
    console.log('rate limit error',error)
    next(error)
   }
}

export default rateLimiter