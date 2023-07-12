import { Prisma, PrismaClient } from '../prisma';

const client = (url: string | undefined) =>
  new PrismaClient(url ? { datasources: { db: { url } } } : undefined).$extends({
    model: {
      $allModels: {
        async exists<T>(this: T, where: Prisma.Args<T, 'findFirst'>['where']): Promise<boolean> {
          const context = Prisma.getExtensionContext(this);
          const result = await (context as any).count({ where });
          return result > 0;
        }
      }
    }
  });

export type ExtendedPrismaClient = ReturnType<typeof client>;

// Export the prisma client
export const getPrismaClient = (url?: string): ExtendedPrismaClient => {
  // @ts-ignore
  if (typeof window === 'undefined') {
    return client(url);
  }

  // @ts-ignore
  return null;
};

const prisma = getPrismaClient();
export default prisma;

export * from '../prisma';
