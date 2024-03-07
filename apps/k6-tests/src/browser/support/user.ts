export class User {
  constructor(
    private baseUrl: string,
    private sessionId: string
  ) {}

  getLoginURL(): string {
    return `${this.baseUrl}/external-auth?token=${this.sessionId}`;
  }
  getLoggedInMessage(): string {
    return '//h1[contains(text(), "User Office Dashboard")]';
  }
}
