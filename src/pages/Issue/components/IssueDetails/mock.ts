import { IApiRepositoryIssue, IApiUserSharedData } from '../../../../api';

/* eslint-disable sort-keys */
const userMock: IApiUserSharedData = {
  avatar_url: 'https://avatars.githubusercontent.com/u/706678?v=4',
  events_url: 'https://api.github.com/users/mehmetkose/events{/privacy}',
  followers_url: 'https://api.github.com/users/mehmetkose/followers',
  following_url:
    'https://api.github.com/users/mehmetkose/following{/other_user}',
  gists_url: 'https://api.github.com/users/mehmetkose/gists{/gist_id}',
  gravatar_id: '',
  html_url: 'https://github.com/mehmetkose',
  id: 706678,
  login: 'mehmetkose',
  node_id: 'MDQ6VXNlcjcwNjY3OA==',
  organizations_url: 'https://api.github.com/users/mehmetkose/orgs',
  received_events_url:
    'https://api.github.com/users/mehmetkose/received_events',
  repos_url: 'https://api.github.com/users/mehmetkose/repos',
  site_admin: false,
  starred_url: 'https://api.github.com/users/mehmetkose/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/mehmetkose/subscriptions',
  type: 'User',
  url: 'https://api.github.com/users/mehmetkose',
};

export const issueMock: IApiRepositoryIssue = {
  url:
    'https://api.github.com/repos/preact/blog-example-reflux-auth-flow/issues/2',
  repository_url:
    'https://api.github.com/repos/preact/blog-example-reflux-auth-flow',
  labels_url:
    'https://api.github.com/repos/preact/blog-example-reflux-auth-flow/issues/2/labels{/name}',
  comments_url:
    'https://api.github.com/repos/preact/blog-example-reflux-auth-flow/issues/2/comments',
  events_url:
    'https://api.github.com/repos/preact/blog-example-reflux-auth-flow/issues/2/events',
  html_url: 'https://github.com/preact/blog-example-reflux-auth-flow/pull/2',
  id: 281473018,
  node_id: 'MDExOlB1bGxSZXF1ZXN0MTU3ODkyMjI0',
  number: 2,
  title: 'fixes webpack babel issues',
  labels: [],
  state: 'open',
  locked: false,
  assignee: null,
  assignees: [],
  milestone: null,
  comments: 0,
  created_at: '2017-12-12T17:33:26Z',
  updated_at: '2017-12-12T20:35:32Z',
  closed_at: null,
  author_association: 'NONE',
  active_lock_reason: null,
  pull_request: {
    url:
      'https://api.github.com/repos/preact/blog-example-reflux-auth-flow/pulls/2',
    html_url: 'https://github.com/preact/blog-example-reflux-auth-flow/pull/2',
    diff_url:
      'https://github.com/preact/blog-example-reflux-auth-flow/pull/2.diff',
    patch_url:
      'https://github.com/preact/blog-example-reflux-auth-flow/pull/2.patch',
  },
  body:
    "this fixes issues with babel and escope issues identified here: https://github.com/babel/babel-eslint/issues/243#issuecomment-178080986\r\n\r\nduring build `50% 2/3 build modulesTypeError: Cannot read property 'visitClass' of undefined`\r\n\r\na simple `npm i -D escope@3.3.0` fixed it.\r\n\r\ncloses #1 ",
  performed_via_github_app: null,
  user: userMock,
};
