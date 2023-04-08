import { Call, Fn, Objects, Pipe, Tuples } from "hotscript";
import { DecayNever } from "./decay-never";
import { Doc, Operation } from "./openapi.types";

interface FilterByIn<IN extends string> extends Fn {
  return: this["arg0"]["in"] extends IN ? true : false;
}

type OnlyParamsIn<IN extends "path" | "query", T> = Call<
  Tuples.Filter<FilterByIn<IN>>,
  T
> extends []
  ? never
  : Call<Tuples.Filter<FilterByIn<IN>>, T>;

// { name: "petId", scheme: { type: "number" } => { petId: number }
interface GetArgumentAndType extends Fn {
  _type: this["arg0"]["schema"]["type"];
  _name: this["arg0"]["name"];
  return: {
    [key in this["_name"]]: this["_type"] extends "string"
      ? string
      : this["_type"] extends "integer"
      ? number
      : this["_type"] extends "boolean"
      ? boolean
      : this["_type"] extends "number"
      ? number
      : never;
  };
}

type ParamsIntoArgs<T extends any[]> = Pipe<
  T,
  [
    Tuples.Map<GetArgumentAndType>,

    // [{ petId: number }, { limit: number }] => { petId: number, limit: number }
    // (if any of the param names clash this will be type never)
    Tuples.Reduce<Objects.Assign, {}>
  ]
>;

export type Client<T extends Doc> = {
  [P in keyof T["paths"]]: {
    [M in keyof T["paths"][P]]: T["paths"][P][M] extends Operation
      ? (
          x: DecayNever<{
            params: ParamsIntoArgs<
              OnlyParamsIn<"path", T["paths"][P][M]["parameters"]>
            >;
            query: ParamsIntoArgs<
              OnlyParamsIn<"query", T["paths"][P][M]["parameters"]>
            >;
          }>
        ) => Promise<any>
      : never;
  };
};

export function createApiClient<T extends Doc>(_doc: T): Client<T> {
  return {} as any;
}
