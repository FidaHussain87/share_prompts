export const filterHelper = (data, searchTerm) => {
  // const searchProperties = ["creator.username", "tag", "prompt"];
  // const filteredData = data.filter((item) =>
  //   searchProperties.some((property) =>
  //     item[property]?.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );

  const regex = new RegExp(searchTerm, "i"); // 'i' flag for case-insensitive search
  return data.filter(
    (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
  );
  return filteredData;
  return regex;
};
