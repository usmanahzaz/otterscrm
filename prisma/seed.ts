import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('TestPass123!', 10)

    const user = await prisma.user.create({
      data: {
        email: 'demo@leadorbit.com',
        password: hashedPassword,
        fullName: 'Demo User',
        profile: {
          create: {
            fullName: 'Demo User',
            phone: '+1 (555) 123-4567',
          },
        },
        workspaces: {
          create: {
            role: 'owner',
            joinedAt: new Date(),
            workspace: {
              create: {
                name: 'Demo Workspace',
                slug: 'demo-workspace-' + Math.random().toString(36).slice(2, 7),
              },
            },
          },
        },
      },
      include: {
        workspaces: { include: { workspace: true } },
      },
    })

    console.log('\n✅ Test account created!\n')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('LOGIN CREDENTIALS')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`Email:       demo@leadorbit.com`)
    console.log(`Password:    TestPass123!`)
    console.log(`Workspace:   ${user.workspaces[0].workspace.name}`)
    console.log(`User ID:     ${user.id}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('\n⚠️  Account already exists\n')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('LOGIN CREDENTIALS')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log(`Email:       demo@leadorbit.com`)
      console.log(`Password:    TestPass123!`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    } else {
      throw error
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
