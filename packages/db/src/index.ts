import { OnRampStatus, PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma: ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma
export { OnRampStatus }
// You can also export other types you need:
export type { Prisma } from '@prisma/client'

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma