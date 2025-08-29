import { and, eq, gt } from 'drizzle-orm';
import { db } from '../client.js';
import { users, sessions, userRoles, roles, apps } from '../schema.js';