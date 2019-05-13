# xoom-graphql-workshop <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1024px-GraphQL_Logo.svg.png" width="50">

[![PRs Welcome][prs-badge]][prs]
[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

In this session, we will build a GraphQL server based on the [Movie DB REST API](https://developers.themoviedb.org/3/getting-started/introduction).

### Running on CodeSandbox

[![Edit graphql-server-workshop](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mstuart/xoom-graphql-workshop/tree/01-apollo-server/?fontsize=14)

1. Click the button above to navigate to the CodeSandbox. Fork it to your account by clicking Fork in the top menu.
2. That's it! CodeSandbox features HMR, a console, and a test runner. It's pretty awesome. 😍 If you see an error message, don't worry - it's because we haven't built our server yet.

### Running the app locally

1. Ensure you're using at least `node@8` and `npm@5`
2. Clone, install, and run the server

```
$ git clone https://github.com/mstuart/graphql-workshop.git
$ cd graphql-workshop
$ npm install
```

To get the app up and running (and really see if it worked), run:

```
$ npm start
$ open http://localhost:4000
```

### Branches

If you get stuck at any time, click the sandbox for the exercise you want and fork it. Every step has a problem and solution branch.

- [`00-tour`](https://codesandbox.io/s/github/mstuart/xoom-graphql-workshop/tree/00-tour): Tour of Apollo Server
- [`01-apollo-server`](https://codesandbox.io/s/github/mstuart/xoom-graphql-workshop/tree/01-apollo-server): Setting up Apollo Server
- [`02-schema`](https://codesandbox.io/s/github/mstuart/xoom-graphql-workshop/tree/02-schema): Writing your schema
- [`03-data-sources`](https://codesandbox.io/s/github/mstuart/xoom-graphql-workshop/tree/03-data-sources): Building data sources
- [`04-authentication`](https://codesandbox.io/s/github/mstuart/xoom-graphql-workshop/tree/04-authentication): Implementing authentication
- [`05-final`](https://codesandbox.io/s/github/mstuart/xoom-graphql-workshop): Hooking everything up to resolvers

### Helpful links

- [Apollo platform docs](https://www.apollographql.com/docs/)
- [Writing a schema](https://www.apollographql.com/docs/apollo-server/essentials/schema.html)
- [Learn about resolvers here](https://www.apollographql.com/docs/graphql-tools/resolvers.html)
- [Data sources docs](https://www.apollographql.com/docs/apollo-server/features/data-sources.html)

## Running locally

1. Clone the repo: `git clone https://github.com/mstuart/xoom-graphql-workshop`
2. Install the dependencies: `npm i`
3. Start the server: `npm start`. Your server will be running on port 4000. Your GraphQL server is available at `localhost:4000/graphql` and your GraphQL Playground is available at `localhost:4000/graphql`.

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[license-badge]: https://img.shields.io/github/license/mashape/apistatus.svg
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/mstuart/graphql-workshop.svg?style=social
[github-watch]: https://github.com/mstuart/graphql-workshop/watchers
[github-star-badge]: https://img.shields.io/github/stars/mstuart/graphql-workshop.svg?style=social
[github-star]: https://github.com/mstuart/graphql-workshop/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20graphql-workshop%20by%20@mstuart%20https://github.com/mstuart/graphql-workshop%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/mstuart/graphql-workshop.svg?style=social
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/mstuart/graphql-workshop/issues/new
[win-build-badge]: https://img.shields.io/appveyor/ci/mstuart/graphql-workshop.svg?style=flat-square&logo=appveyor
[win-build]: https://ci.appveyor.com/project/mstuart/graphql-workshop