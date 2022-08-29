import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { TypeBoxFastifySchema } from '@naven/common';
import type {
  ContextConfigDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';
import type { RouteGenericInterface } from 'fastify/types/route';

export type TypeBoxRouteHandlerMethod<T extends TypeBoxFastifySchema> =
  RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    RouteGenericInterface,
    ContextConfigDefault,
    T,
    TypeBoxTypeProvider
  >;
