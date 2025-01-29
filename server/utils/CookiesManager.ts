import { lucia } from "~/server/utils/auth";

export class CookiesManager {
  private cookies: AstroCookies;
  private request: Request;

  constructor(cookie: AstroCookies, request: Request) {
    this.cookies = cookie;
    this.request = request;
  }

  public async validate() {
    try {
      const sessionID = this.getSessionID();
      if (sessionID) {
        const { session, user } = await lucia.validateSession(sessionID);

        if (session) {
          //await this.create(session.userId);
          return { isValid: true, session, user };
        }
      }

      return { isValid: false };
    } catch (error) {
      throw error;
    }
  }

  public async create(userID: string) {
    try {
      const { id } = await lucia.createSession(userID, {});
      const { name, attributes, value } = lucia.createSessionCookie(id);
      this.cookies.set(name, value, attributes);
    } catch (error) {
      throw error;
    }
  }
  public async invalidateAndDelete() {
    try {
      await this.invalidate();
      this.delete();
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  private delete() {
    const sessionCookie = lucia.createBlankSessionCookie();

    this.request.headers.set("Set-Cookie", sessionCookie.serialize());

    this.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }

  private async invalidate() {
    try {
      const sessionID = this.getSessionID();
      if (sessionID) {
        await lucia.invalidateSession(sessionID);
      }
      await lucia.deleteExpiredSessions();
    } catch (error) {
      throw error;
    }
  }

  private getSessionID() {
    return this.cookies.get(lucia.sessionCookieName)?.value;
  }
}
