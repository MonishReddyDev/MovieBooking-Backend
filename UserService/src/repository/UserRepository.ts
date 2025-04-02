import { User } from "@prisma/client";

import prisma from "../config/prismaClient";
import { prismaOperation } from "../utils/ExceptionWrappers/PrismaOperationWrapper";

export class UserRepository {
  private prisma = prisma;

  async create(
    email: string,
    password?: string,
    name?: string,
    role: string = "user"
  ): Promise<User> {
    return prismaOperation(
      () =>
        this.prisma.user.create({
          data: { email, password, name, role },
        }),
      "UserRepository.create"
    );
  }

  async findById(id: string): Promise<User | null> {
    return prismaOperation(
      () => this.prisma.user.findUnique({ where: { id } }),
      "UserRepository.findById"
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return prismaOperation(
      () => this.prisma.user.findUnique({ where: { email } }),
      "UserRepository.findByEmail"
    );
  }

  async findAll(): Promise<User[]> {
    return prismaOperation(
      () => this.prisma.user.findMany(),
      "UserRepository.findAll"
    );
  }

  async update(
    id: string,
    updates: Partial<
      Pick<User, "email" | "password" | "name" | "role" | "token">
    >
  ): Promise<User> {
    return prismaOperation(
      () =>
        this.prisma.user.update({
          where: { id },
          data: updates,
        }),
      "UserRepository.update"
    );
  }

  async delete(id: string): Promise<void> {
    return prismaOperation(
      () => this.prisma.user.delete({ where: { id } }).then(() => undefined),
      "UserRepository.delete"
    );
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}
