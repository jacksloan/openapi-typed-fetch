import { ReadonlyDeep } from "type-fest";
import { OpenAPIV3 as OpenAPI } from "openapi-types";

export type Doc = ReadonlyDeep<OpenAPI.Document>;
export type Path = ReadonlyDeep<OpenAPI.PathItemObject>;
export type Operation = ReadonlyDeep<OpenAPI.OperationObject>;
export type Param = ReadonlyDeep<OpenAPI.ParameterObject>;
export type Body = ReadonlyDeep<OpenAPI.RequestBodyObject>;
export type Media = ReadonlyDeep<OpenAPI.MediaTypeObject>;
export type Schema = ReadonlyDeep<OpenAPI.SchemaObject>;
export type Ref = ReadonlyDeep<OpenAPI.ReferenceObject>;
