// https://stackoverflow.com/questions/62573985/recursively-removing-fields-of-type-never-from-a-type-in-typescript
export type DecayNever<T> = T extends Record<string | number | symbol, unknown>
  ? FilteredKeys<{ [K in keyof T]: DecayNever<T[K]> }> extends never
    ? never
    : Pick<DecayNeverType<T>, FilteredKeys<DecayNeverType<T>>>
  : T;

type DecayNeverType<T> = { [K in keyof T]: DecayNever<T[K]> };

/** Returns a union of all keys of `T` where `T[K]` is not `never` */
type FilteredKeys<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T];
