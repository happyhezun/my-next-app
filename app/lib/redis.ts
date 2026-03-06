import { createClient } from 'redis';

declare global {
  // 这允许在全局`var`声明
  // eslint-disable-next-line no-var
  var redis: ReturnType<typeof createClient> | undefined;
}

// 在开发环境中，使用全局变量来缓存Redis客户端实例，
// 避免在Next.js热重载时创建多个连接。
const redis = global.redis ?? createClient({ url: process.env.REDIS_URL });

if (process.env.NODE_ENV !== 'production') {
  global.redis = redis;
}

if (!redis.isOpen) {
  redis.connect().catch(console.error);
}

export default redis;