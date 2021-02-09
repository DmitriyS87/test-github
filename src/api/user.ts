import { apiRequest } from '../utils';
import { BASE_API_URL, IApiUserRepository } from '.';

export interface IApiUser {
  avatar_url: string;
  bio?: string;
  blog?: string;
  company?: null | string;
  created_at?: string;
  email?: null | string;
  events_url: string;
  followers?: number;
  followers_url: string;
  following?: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable?: null | string;
  html_url: string;
  id: number;
  location?: null | string;
  login: string;
  name?: string;
  node_id: string;
  organizations_url: string;
  public_gists?: number;
  public_repos?: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username?: null | string;
  type: string;
  updated_at?: string;
  url: string;
}

export class ApiUser {
  /**
   * Used to get accounts list
   */

  public static list = async (): Promise<any> =>
    await apiRequest<IApiUser[]>({
      endpoint: `${BASE_API_URL}/users`,
      method: 'GET',
    });
  /**
   * Used to get account repositories data by name
   */

  public static repositoriesList = async ({
    login,
  }: {
    login: IApiUser['login'];
  }): Promise<IApiUserRepository[]> =>
    await apiRequest<IApiUserRepository[]>({
      endpoint: `${BASE_API_URL}/users/${login}/repos`,
      method: 'GET',
    });

  /**
   * Used to get account repository data by name or login
   */

  public static retrieve = async ({
    login,
    name,
  }: {
    login?: IApiUser['login'];
    name?: IApiUser['name'];
  }): Promise<IApiUser> =>
    await apiRequest<IApiUser>({
      endpoint: `${BASE_API_URL}/users/${name ? name : login ? login : ''}`,
      method: 'GET',
    });
}
