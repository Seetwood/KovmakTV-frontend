export enum ROLE {
  SUPER_USER = 'SUPER_USER',
  USER = 'USER',
}
export const ROLE_MAPPER: { [key: string]: string } = {
  [ROLE.SUPER_USER]: 'SUPER_USER',
  [ROLE.USER]: 'USER',
};