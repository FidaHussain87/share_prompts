export const filterHelper = (data, searchTerm) => {
  const regex = new RegExp(
    searchTerm.trim().toLowerCase().replace(/\s+/g, "\\s*"),
    "i"
  );
  return data.filter(
    ({ creator, tag, prompt }) =>
      regex.test(creator.username.trim().toLowerCase()) ||
      regex.test(tag.trim().toLowerCase()) ||
      regex.test(prompt.trim().toLowerCase())
  );
};
