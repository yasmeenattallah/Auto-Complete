// eslint-disable-next-line object-curly-newline
const { handleMain, handleAsset, handleSearchGet, handleSearchPost, handleName } = require('./handler');

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === '/') {
    handleMain(res);
  } else if (endpoint.includes('/public')) {
    handleAsset(res, endpoint);
  } else if (endpoint.includes('/name?q=')) {
    handleSearchGet(req, res);
  } else if (endpoint === '/search' && req.method === 'POST') {
    handleSearchPost(req, res);
  } else if (endpoint === '/name') {
    handleName(res);
  }
};

module.exports = router;
