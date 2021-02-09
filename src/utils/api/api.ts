import { dataIsObject } from '../data';

type IApiRequestBody = { [key: string]: any };
type IApiRequestMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
type IApiRequestQuery = { [key: string]: any };

interface IApiRequestParams {
  body?: IApiRequestBody;
  endpoint: string;
  headers?: string[][];
  method: IApiRequestMethod;
  query?: IApiRequestQuery;
  responseType?: 'blob' | 'json' | 'text';
}

const getHeaders = (
  headers?: string[][],
  body?: IApiRequestBody,
): string[][] => [
  ...(headers || []),
  ...(!(body instanceof FormData)
    ? [['Content-Type', 'application/json']]
    : []),
];

const encodeQueryString = (query: IApiRequestQuery) => {
  const keys = Object.keys(query);
  return keys.length
    ? '?' +
        keys
          .filter((key) => query[key] != null)
          .map(
            (key) =>
              encodeURIComponent(key) + '=' + encodeURIComponent(query[key]),
          )
          .join('&')
    : '';
};

export async function apiRequest<TResponseBody>(
  requestParams: IApiRequestParams,
): Promise<TResponseBody> {
  const {
    body,
    endpoint,
    headers,
    method,
    query = {},
    responseType,
  } = requestParams;

  let response;
  try {
    response = await fetch(
      query ? `${endpoint}${encodeQueryString(query)}` : endpoint,
      {
        body: dataIsObject(body) ? JSON.stringify(body) : (body as BodyInit),
        headers: getHeaders(headers, body),
        method,
        mode: 'cors',
      },
    );
  } catch (error) {
    throw new Error(
      "Can't recieve data from server. Check you internet connection and guard programs.",
    );
  }

  const contentType = response.headers.get('Content-Type');

  const responseBody: TResponseBody = responseType
    ? await response[responseType]()
    : contentType.includes('application/json')
    ? await response.json()
    : contentType === 'text/html'
    ? await response.text()
    : response;

  if (response.status >= 400) {
    throw new Error(
      'Request error. Try to change request params to get access.',
    );
  } else {
    return responseBody;
  }
}
