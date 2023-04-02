import { isNil, isEmpty } from "ramda";

export const isNullOrEmpty = (value: string) => isNil(value) || isEmpty(value);
