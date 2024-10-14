import * as schema from "@/lib/schema";
import {
  isSameDay,
  now,
  fromDate,
  toCalendarDateTime,
  getLocalTimeZone,
  parseDateTime,
} from "@internationalized/date";

export type User = typeof schema.users.$inferSelect;
export interface SerializedUser
  extends Omit<User, "emailVerified" | "createdAt" | "updatedAt"> {
  emailVerified: string;
  createdAt: string;
  updatedAt: string;
}

export function serializeUser(user: User) {
  // const timeZone = getLocalTimeZone();
  const timeZone = "America/New_York";

  return Object.assign(user, {
    emailVerified: user.emailVerified
      ? toCalendarDateTime(fromDate(user.emailVerified, timeZone)).toString()
      : undefined,
    createdAt: toCalendarDateTime(
      fromDate(user.createdAt, timeZone),
    ).toString(),
    updatedAt: toCalendarDateTime(
      fromDate(user.updatedAt, timeZone),
    ).toString(),
  });
}

export function deserializeUser(user: SerializedUser) {
  // const timeZone = getLocalTimeZone();
  const timeZone = "America/New_York";

  return Object.assign(user, {
    emailVerified: user.emailVerified
      ? parseDateTime(user.emailVerified).toDate(timeZone)
      : undefined,
    createdAt: parseDateTime(user.createdAt).toDate(timeZone),
    updatedAt: parseDateTime(user.updatedAt).toDate(timeZone),
  });
}
