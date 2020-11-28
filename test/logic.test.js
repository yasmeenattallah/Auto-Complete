const { searchFilter } = require('../utils/logic');

const names = [{ name: 'hi' }, { name: 'yasmeen' }];
// eslint-disable-next-line no-undef
test('test search function  return filter data ', () => {
  // eslint-disable-next-line no-undef
  expect(searchFilter(names, 'yasmeen')).toEqual([{ name: 'yasmeen' }]);
});
