export class UrlGeneratorService {
  public static viewCompany(id: number): string {
    return '/company/display/' + id;
  }
}
