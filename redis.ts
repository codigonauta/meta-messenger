import ioredis from 'ioredis'

const redis = new ioredis(process.env.REDIS_URL!)

export default redis
