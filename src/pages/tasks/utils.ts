function removeDuplicates(arr: number[]) {
  const uniqueArr = new Set(arr);
  return Array.from(uniqueArr);
}

export default removeDuplicates;
