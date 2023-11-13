export const valMapping = {
  "Script": "自定義程式",
  "Mail": "信箱"
}
export const strDataParser = (str: string): string => {
  let strArr = str.split(', ');
  let parsedArr = strArr.map((v: string) => valMapping[v as keyof typeof valMapping]
    ? valMapping[v as keyof typeof valMapping]
    : v);
  return parsedArr.join('、');
};

export const arrDataParser = (arr: string[]): string => {
  let parsedArr = arr.map((str: string) => valMapping[str as keyof typeof valMapping]
    ? valMapping[str as keyof typeof valMapping]
    : str);

  return parsedArr.join('、');
};
