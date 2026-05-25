import type { BrandKit as PrismaBrandKit, Project as PrismaProject, User as PrismaUser } from '@prisma/client';
import { prisma } from './prisma';

export type Template = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

export type Plan = {
  id: string;
  name: string;
  price: string;
  frequency: string;
  features: string[];
};

export type User = PrismaUser;

export type Project = PrismaProject;

export type BrandKit = {
  id: string;
  name: string;
  colors: string[];
  fonts: string[];
  logoUrl: string;
  ownerId: string;
  createdAt: Date;
};

export type DashboardSummary = {
  totalProjects: number;
  savedBrandKits: number;
  activeCredits: number;
  recentActivities: string[];
};

export type AIStylePreset = {
  id: string;
  name: string;
  description: string;
};

const templates: Template[] = [
  {
    id: 'revival-hero',
    title: 'Revival Night',
    category: 'Revival',
    description: 'Cinematic revival poster with glowing gradients, bold headline, and atmospheric artwork.',
    image: '/templates/revival-hero.png',
  },
  {
    id: 'worship-impact',
    title: 'Worship Impact',
    category: 'Worship',
    description: 'Modern worship event design with layered light effects and premium type styling.',
    image: '/templates/worship-impact.png',
  },
  {
    id: 'conference-stage',
    title: 'Conference Stage',
    category: 'Conference',
    description: 'Elegant conference flyer with structured sections, color overlays, and event details.',
    image: '/templates/conference-stage.png',
  },
];

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$19',
    frequency: 'month',
    features: ['5 AI poster credits', 'Basic template access', '1 brand kit'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$49',
    frequency: 'month',
    features: ['20 AI poster credits', 'Premium templates', '3 brand kits', 'export PDF/JPG/PNG'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99',
    frequency: 'month',
    features: ['Unlimited AI credits', 'Team collaboration', 'Advanced export presets', 'Priority support'],
  },
];

const stylePresets: AIStylePreset[] = [
  {
    id: 'cinematic-glow',
    name: 'Cinematic Glow',
    description: 'Bold contrast, ambient lighting, and rich gradients for premium gospel events.',
  },
  {
    id: 'modern-ministry',
    name: 'Modern Ministry',
    description: 'Clean layouts with strong headlines, subtle textures, and contemporary church styling.',
  },
  {
    id: 'vintage-revival',
    name: 'Vintage Revival',
    description: 'Warm tonal palette, layered typography, and a soulful worship atmosphere.',
  },
];

export function getTemplates() {
  return templates;
}

export function getPlans() {
  return plans;
}

export async function getUsers() {
  return prisma.user.findMany();
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function createUser(name: string, email: string, password: string) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}

export async function getProjects(ownerId?: string) {
  return prisma.project.findMany({
    where: ownerId ? { ownerId } : undefined,
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: {
      id,
    },
  });
}

export async function createProject(name: string, ownerId: string) {
  return prisma.project.create({
    data: {
      name,
      status: 'draft',
      thumbnail: '/projects/default.png',
      ownerId,
    },
  });
}

export async function updateProject(id: string, update: Partial<Project>) {
  const project = await getProjectById(id);
  if (!project) return null;
  return prisma.project.update({
    where: { id },
    data: {
      ...update,
    },
  });
}

export async function getBrandKits(ownerId?: string) {
  const records = await prisma.brandKit.findMany({
    where: ownerId ? { ownerId } : undefined,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return records.map((record) => ({
    ...record,
    colors: JSON.parse(record.colors) as string[],
    fonts: JSON.parse(record.fonts) as string[],
  }));
}

export async function createBrandKit(ownerId: string, name: string, colors: string[], fonts: string[], logoUrl: string) {
  const record = await prisma.brandKit.create({
    data: {
      name,
      colors: JSON.stringify(colors),
      fonts: JSON.stringify(fonts),
      logoUrl,
      ownerId,
    },
  });

  return {
    ...record,
    colors,
    fonts,
  };
}

export async function getDashboardSummary(ownerId?: string): Promise<DashboardSummary> {
  const [projectCount, brandKitCount] = await Promise.all([
    prisma.project.count({ where: ownerId ? { ownerId } : undefined }),
    prisma.brandKit.count({ where: ownerId ? { ownerId } : undefined }),
  ]);

  return {
    totalProjects: projectCount,
    savedBrandKits: brandKitCount,
    activeCredits: 56,
    recentActivities: [
      'Generated new worship poster concept',
      'Saved a brand kit palette',
      'Exported draft as PNG',
    ],
  };
}

export function getStylePresets() {
  return stylePresets;
}
