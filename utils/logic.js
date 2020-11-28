function searchFilter(array, value) {
  return array.filter(
    (item) => item.name.toLowerCase().includes(value.toLowerCase()),
  );
}

module.exports = { searchFilter };
