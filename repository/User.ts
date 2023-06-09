export class User {
  constructor(
    public userId: string,
    public userName: string,
    public firstName?: string,
    public familyName?: string
  ) {}
}
