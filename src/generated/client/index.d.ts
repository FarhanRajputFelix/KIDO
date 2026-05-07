
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Child
 * 
 */
export type Child = $Result.DefaultSelection<Prisma.$ChildPayload>
/**
 * Model Content
 * 
 */
export type Content = $Result.DefaultSelection<Prisma.$ContentPayload>
/**
 * Model WatchLog
 * 
 */
export type WatchLog = $Result.DefaultSelection<Prisma.$WatchLogPayload>
/**
 * Model Quiz
 * 
 */
export type Quiz = $Result.DefaultSelection<Prisma.$QuizPayload>
/**
 * Model QuizAttempt
 * 
 */
export type QuizAttempt = $Result.DefaultSelection<Prisma.$QuizAttemptPayload>
/**
 * Model FriendRequest
 * 
 */
export type FriendRequest = $Result.DefaultSelection<Prisma.$FriendRequestPayload>
/**
 * Model ParentAlert
 * 
 */
export type ParentAlert = $Result.DefaultSelection<Prisma.$ParentAlertPayload>
/**
 * Model Classroom
 * 
 */
export type Classroom = $Result.DefaultSelection<Prisma.$ClassroomPayload>
/**
 * Model Lesson
 * 
 */
export type Lesson = $Result.DefaultSelection<Prisma.$LessonPayload>
/**
 * Model ActivityFeed
 * 
 */
export type ActivityFeed = $Result.DefaultSelection<Prisma.$ActivityFeedPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model PeerChallenge
 * 
 */
export type PeerChallenge = $Result.DefaultSelection<Prisma.$PeerChallengePayload>
/**
 * Model Badge
 * 
 */
export type Badge = $Result.DefaultSelection<Prisma.$BadgePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.child`: Exposes CRUD operations for the **Child** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Children
    * const children = await prisma.child.findMany()
    * ```
    */
  get child(): Prisma.ChildDelegate<ExtArgs>;

  /**
   * `prisma.content`: Exposes CRUD operations for the **Content** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contents
    * const contents = await prisma.content.findMany()
    * ```
    */
  get content(): Prisma.ContentDelegate<ExtArgs>;

  /**
   * `prisma.watchLog`: Exposes CRUD operations for the **WatchLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WatchLogs
    * const watchLogs = await prisma.watchLog.findMany()
    * ```
    */
  get watchLog(): Prisma.WatchLogDelegate<ExtArgs>;

  /**
   * `prisma.quiz`: Exposes CRUD operations for the **Quiz** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quizzes
    * const quizzes = await prisma.quiz.findMany()
    * ```
    */
  get quiz(): Prisma.QuizDelegate<ExtArgs>;

  /**
   * `prisma.quizAttempt`: Exposes CRUD operations for the **QuizAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuizAttempts
    * const quizAttempts = await prisma.quizAttempt.findMany()
    * ```
    */
  get quizAttempt(): Prisma.QuizAttemptDelegate<ExtArgs>;

  /**
   * `prisma.friendRequest`: Exposes CRUD operations for the **FriendRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FriendRequests
    * const friendRequests = await prisma.friendRequest.findMany()
    * ```
    */
  get friendRequest(): Prisma.FriendRequestDelegate<ExtArgs>;

  /**
   * `prisma.parentAlert`: Exposes CRUD operations for the **ParentAlert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParentAlerts
    * const parentAlerts = await prisma.parentAlert.findMany()
    * ```
    */
  get parentAlert(): Prisma.ParentAlertDelegate<ExtArgs>;

  /**
   * `prisma.classroom`: Exposes CRUD operations for the **Classroom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classrooms
    * const classrooms = await prisma.classroom.findMany()
    * ```
    */
  get classroom(): Prisma.ClassroomDelegate<ExtArgs>;

  /**
   * `prisma.lesson`: Exposes CRUD operations for the **Lesson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lessons
    * const lessons = await prisma.lesson.findMany()
    * ```
    */
  get lesson(): Prisma.LessonDelegate<ExtArgs>;

  /**
   * `prisma.activityFeed`: Exposes CRUD operations for the **ActivityFeed** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityFeeds
    * const activityFeeds = await prisma.activityFeed.findMany()
    * ```
    */
  get activityFeed(): Prisma.ActivityFeedDelegate<ExtArgs>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs>;

  /**
   * `prisma.peerChallenge`: Exposes CRUD operations for the **PeerChallenge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PeerChallenges
    * const peerChallenges = await prisma.peerChallenge.findMany()
    * ```
    */
  get peerChallenge(): Prisma.PeerChallengeDelegate<ExtArgs>;

  /**
   * `prisma.badge`: Exposes CRUD operations for the **Badge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Badges
    * const badges = await prisma.badge.findMany()
    * ```
    */
  get badge(): Prisma.BadgeDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Child: 'Child',
    Content: 'Content',
    WatchLog: 'WatchLog',
    Quiz: 'Quiz',
    QuizAttempt: 'QuizAttempt',
    FriendRequest: 'FriendRequest',
    ParentAlert: 'ParentAlert',
    Classroom: 'Classroom',
    Lesson: 'Lesson',
    ActivityFeed: 'ActivityFeed',
    Message: 'Message',
    PeerChallenge: 'PeerChallenge',
    Badge: 'Badge'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "child" | "content" | "watchLog" | "quiz" | "quizAttempt" | "friendRequest" | "parentAlert" | "classroom" | "lesson" | "activityFeed" | "message" | "peerChallenge" | "badge"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Child: {
        payload: Prisma.$ChildPayload<ExtArgs>
        fields: Prisma.ChildFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChildFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChildFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          findFirst: {
            args: Prisma.ChildFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChildFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          findMany: {
            args: Prisma.ChildFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>[]
          }
          create: {
            args: Prisma.ChildCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          createMany: {
            args: Prisma.ChildCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChildCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>[]
          }
          delete: {
            args: Prisma.ChildDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          update: {
            args: Prisma.ChildUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          deleteMany: {
            args: Prisma.ChildDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChildUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ChildUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          aggregate: {
            args: Prisma.ChildAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChild>
          }
          groupBy: {
            args: Prisma.ChildGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChildGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChildCountArgs<ExtArgs>
            result: $Utils.Optional<ChildCountAggregateOutputType> | number
          }
        }
      }
      Content: {
        payload: Prisma.$ContentPayload<ExtArgs>
        fields: Prisma.ContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          findFirst: {
            args: Prisma.ContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          findMany: {
            args: Prisma.ContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>[]
          }
          create: {
            args: Prisma.ContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          createMany: {
            args: Prisma.ContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>[]
          }
          delete: {
            args: Prisma.ContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          update: {
            args: Prisma.ContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          deleteMany: {
            args: Prisma.ContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          aggregate: {
            args: Prisma.ContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContent>
          }
          groupBy: {
            args: Prisma.ContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContentCountArgs<ExtArgs>
            result: $Utils.Optional<ContentCountAggregateOutputType> | number
          }
        }
      }
      WatchLog: {
        payload: Prisma.$WatchLogPayload<ExtArgs>
        fields: Prisma.WatchLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WatchLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WatchLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          findFirst: {
            args: Prisma.WatchLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WatchLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          findMany: {
            args: Prisma.WatchLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>[]
          }
          create: {
            args: Prisma.WatchLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          createMany: {
            args: Prisma.WatchLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WatchLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>[]
          }
          delete: {
            args: Prisma.WatchLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          update: {
            args: Prisma.WatchLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          deleteMany: {
            args: Prisma.WatchLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WatchLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WatchLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          aggregate: {
            args: Prisma.WatchLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatchLog>
          }
          groupBy: {
            args: Prisma.WatchLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatchLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WatchLogCountArgs<ExtArgs>
            result: $Utils.Optional<WatchLogCountAggregateOutputType> | number
          }
        }
      }
      Quiz: {
        payload: Prisma.$QuizPayload<ExtArgs>
        fields: Prisma.QuizFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          findFirst: {
            args: Prisma.QuizFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          findMany: {
            args: Prisma.QuizFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>[]
          }
          create: {
            args: Prisma.QuizCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          createMany: {
            args: Prisma.QuizCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>[]
          }
          delete: {
            args: Prisma.QuizDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          update: {
            args: Prisma.QuizUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          deleteMany: {
            args: Prisma.QuizDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuizUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          aggregate: {
            args: Prisma.QuizAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuiz>
          }
          groupBy: {
            args: Prisma.QuizGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizCountArgs<ExtArgs>
            result: $Utils.Optional<QuizCountAggregateOutputType> | number
          }
        }
      }
      QuizAttempt: {
        payload: Prisma.$QuizAttemptPayload<ExtArgs>
        fields: Prisma.QuizAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          findFirst: {
            args: Prisma.QuizAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          findMany: {
            args: Prisma.QuizAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>[]
          }
          create: {
            args: Prisma.QuizAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          createMany: {
            args: Prisma.QuizAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>[]
          }
          delete: {
            args: Prisma.QuizAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          update: {
            args: Prisma.QuizAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          deleteMany: {
            args: Prisma.QuizAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuizAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          aggregate: {
            args: Prisma.QuizAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizAttempt>
          }
          groupBy: {
            args: Prisma.QuizAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<QuizAttemptCountAggregateOutputType> | number
          }
        }
      }
      FriendRequest: {
        payload: Prisma.$FriendRequestPayload<ExtArgs>
        fields: Prisma.FriendRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          findFirst: {
            args: Prisma.FriendRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          findMany: {
            args: Prisma.FriendRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>[]
          }
          create: {
            args: Prisma.FriendRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          createMany: {
            args: Prisma.FriendRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>[]
          }
          delete: {
            args: Prisma.FriendRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          update: {
            args: Prisma.FriendRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          deleteMany: {
            args: Prisma.FriendRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FriendRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          aggregate: {
            args: Prisma.FriendRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriendRequest>
          }
          groupBy: {
            args: Prisma.FriendRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendRequestCountArgs<ExtArgs>
            result: $Utils.Optional<FriendRequestCountAggregateOutputType> | number
          }
        }
      }
      ParentAlert: {
        payload: Prisma.$ParentAlertPayload<ExtArgs>
        fields: Prisma.ParentAlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParentAlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentAlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParentAlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentAlertPayload>
          }
          findFirst: {
            args: Prisma.ParentAlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentAlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParentAlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentAlertPayload>
          }
          findMany: {
            args: Prisma.ParentAlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentAlertPayload>[]
          }
          create: {
            args: Prisma.ParentAlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentAlertPayload>
          }
          createMany: {
            args: Prisma.ParentAlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParentAlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentAlertPayload>[]
          }
          delete: {
            args: Prisma.ParentAlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentAlertPayload>
          }
          update: {
            args: Prisma.ParentAlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentAlertPayload>
          }
          deleteMany: {
            args: Prisma.ParentAlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParentAlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ParentAlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentAlertPayload>
          }
          aggregate: {
            args: Prisma.ParentAlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParentAlert>
          }
          groupBy: {
            args: Prisma.ParentAlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParentAlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParentAlertCountArgs<ExtArgs>
            result: $Utils.Optional<ParentAlertCountAggregateOutputType> | number
          }
        }
      }
      Classroom: {
        payload: Prisma.$ClassroomPayload<ExtArgs>
        fields: Prisma.ClassroomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassroomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassroomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          findFirst: {
            args: Prisma.ClassroomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassroomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          findMany: {
            args: Prisma.ClassroomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>[]
          }
          create: {
            args: Prisma.ClassroomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          createMany: {
            args: Prisma.ClassroomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassroomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>[]
          }
          delete: {
            args: Prisma.ClassroomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          update: {
            args: Prisma.ClassroomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          deleteMany: {
            args: Prisma.ClassroomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassroomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClassroomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          aggregate: {
            args: Prisma.ClassroomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClassroom>
          }
          groupBy: {
            args: Prisma.ClassroomGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassroomGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassroomCountArgs<ExtArgs>
            result: $Utils.Optional<ClassroomCountAggregateOutputType> | number
          }
        }
      }
      Lesson: {
        payload: Prisma.$LessonPayload<ExtArgs>
        fields: Prisma.LessonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          findFirst: {
            args: Prisma.LessonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          findMany: {
            args: Prisma.LessonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>[]
          }
          create: {
            args: Prisma.LessonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          createMany: {
            args: Prisma.LessonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LessonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>[]
          }
          delete: {
            args: Prisma.LessonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          update: {
            args: Prisma.LessonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          deleteMany: {
            args: Prisma.LessonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LessonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          aggregate: {
            args: Prisma.LessonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLesson>
          }
          groupBy: {
            args: Prisma.LessonGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonGroupByOutputType>[]
          }
          count: {
            args: Prisma.LessonCountArgs<ExtArgs>
            result: $Utils.Optional<LessonCountAggregateOutputType> | number
          }
        }
      }
      ActivityFeed: {
        payload: Prisma.$ActivityFeedPayload<ExtArgs>
        fields: Prisma.ActivityFeedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFeedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityFeedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFeedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityFeedPayload>
          }
          findFirst: {
            args: Prisma.ActivityFeedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityFeedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFeedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityFeedPayload>
          }
          findMany: {
            args: Prisma.ActivityFeedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityFeedPayload>[]
          }
          create: {
            args: Prisma.ActivityFeedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityFeedPayload>
          }
          createMany: {
            args: Prisma.ActivityFeedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityFeedCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityFeedPayload>[]
          }
          delete: {
            args: Prisma.ActivityFeedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityFeedPayload>
          }
          update: {
            args: Prisma.ActivityFeedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityFeedPayload>
          }
          deleteMany: {
            args: Prisma.ActivityFeedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityFeedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActivityFeedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityFeedPayload>
          }
          aggregate: {
            args: Prisma.ActivityFeedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityFeed>
          }
          groupBy: {
            args: Prisma.ActivityFeedGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityFeedGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityFeedCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityFeedCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      PeerChallenge: {
        payload: Prisma.$PeerChallengePayload<ExtArgs>
        fields: Prisma.PeerChallengeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PeerChallengeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeerChallengePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PeerChallengeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeerChallengePayload>
          }
          findFirst: {
            args: Prisma.PeerChallengeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeerChallengePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PeerChallengeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeerChallengePayload>
          }
          findMany: {
            args: Prisma.PeerChallengeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeerChallengePayload>[]
          }
          create: {
            args: Prisma.PeerChallengeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeerChallengePayload>
          }
          createMany: {
            args: Prisma.PeerChallengeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PeerChallengeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeerChallengePayload>[]
          }
          delete: {
            args: Prisma.PeerChallengeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeerChallengePayload>
          }
          update: {
            args: Prisma.PeerChallengeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeerChallengePayload>
          }
          deleteMany: {
            args: Prisma.PeerChallengeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PeerChallengeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PeerChallengeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeerChallengePayload>
          }
          aggregate: {
            args: Prisma.PeerChallengeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePeerChallenge>
          }
          groupBy: {
            args: Prisma.PeerChallengeGroupByArgs<ExtArgs>
            result: $Utils.Optional<PeerChallengeGroupByOutputType>[]
          }
          count: {
            args: Prisma.PeerChallengeCountArgs<ExtArgs>
            result: $Utils.Optional<PeerChallengeCountAggregateOutputType> | number
          }
        }
      }
      Badge: {
        payload: Prisma.$BadgePayload<ExtArgs>
        fields: Prisma.BadgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BadgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BadgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          findFirst: {
            args: Prisma.BadgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BadgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          findMany: {
            args: Prisma.BadgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>[]
          }
          create: {
            args: Prisma.BadgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          createMany: {
            args: Prisma.BadgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BadgeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>[]
          }
          delete: {
            args: Prisma.BadgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          update: {
            args: Prisma.BadgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          deleteMany: {
            args: Prisma.BadgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BadgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BadgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          aggregate: {
            args: Prisma.BadgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBadge>
          }
          groupBy: {
            args: Prisma.BadgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<BadgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.BadgeCountArgs<ExtArgs>
            result: $Utils.Optional<BadgeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    children: number
    classrooms: number
    sentMessages: number
    receivedMessages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | UserCountOutputTypeCountChildrenArgs
    classrooms?: boolean | UserCountOutputTypeCountClassroomsArgs
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs
    receivedMessages?: boolean | UserCountOutputTypeCountReceivedMessagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChildWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClassroomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassroomWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type ChildCountOutputType
   */

  export type ChildCountOutputType = {
    quizAttempts: number
    watchLogs: number
    activities: number
    alerts: number
    sentFriendRequests: number
    receivedFriendRequests: number
    sentChallenges: number
    receivedChallenges: number
  }

  export type ChildCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quizAttempts?: boolean | ChildCountOutputTypeCountQuizAttemptsArgs
    watchLogs?: boolean | ChildCountOutputTypeCountWatchLogsArgs
    activities?: boolean | ChildCountOutputTypeCountActivitiesArgs
    alerts?: boolean | ChildCountOutputTypeCountAlertsArgs
    sentFriendRequests?: boolean | ChildCountOutputTypeCountSentFriendRequestsArgs
    receivedFriendRequests?: boolean | ChildCountOutputTypeCountReceivedFriendRequestsArgs
    sentChallenges?: boolean | ChildCountOutputTypeCountSentChallengesArgs
    receivedChallenges?: boolean | ChildCountOutputTypeCountReceivedChallengesArgs
  }

  // Custom InputTypes
  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChildCountOutputType
     */
    select?: ChildCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountQuizAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizAttemptWhereInput
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountWatchLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchLogWhereInput
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityFeedWhereInput
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentAlertWhereInput
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountSentFriendRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountReceivedFriendRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountSentChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeerChallengeWhereInput
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountReceivedChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeerChallengeWhereInput
  }


  /**
   * Count Type ContentCountOutputType
   */

  export type ContentCountOutputType = {
    watchLogs: number
  }

  export type ContentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watchLogs?: boolean | ContentCountOutputTypeCountWatchLogsArgs
  }

  // Custom InputTypes
  /**
   * ContentCountOutputType without action
   */
  export type ContentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentCountOutputType
     */
    select?: ContentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContentCountOutputType without action
   */
  export type ContentCountOutputTypeCountWatchLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchLogWhereInput
  }


  /**
   * Count Type QuizCountOutputType
   */

  export type QuizCountOutputType = {
    attempts: number
  }

  export type QuizCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | QuizCountOutputTypeCountAttemptsArgs
  }

  // Custom InputTypes
  /**
   * QuizCountOutputType without action
   */
  export type QuizCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizCountOutputType
     */
    select?: QuizCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuizCountOutputType without action
   */
  export type QuizCountOutputTypeCountAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizAttemptWhereInput
  }


  /**
   * Count Type ClassroomCountOutputType
   */

  export type ClassroomCountOutputType = {
    lessons: number
  }

  export type ClassroomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lessons?: boolean | ClassroomCountOutputTypeCountLessonsArgs
  }

  // Custom InputTypes
  /**
   * ClassroomCountOutputType without action
   */
  export type ClassroomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassroomCountOutputType
     */
    select?: ClassroomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassroomCountOutputType without action
   */
  export type ClassroomCountOutputTypeCountLessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    avatar: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    role: string
    avatar: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    children?: boolean | User$childrenArgs<ExtArgs>
    classrooms?: boolean | User$classroomsArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | User$childrenArgs<ExtArgs>
    classrooms?: boolean | User$classroomsArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      children: Prisma.$ChildPayload<ExtArgs>[]
      classrooms: Prisma.$ClassroomPayload<ExtArgs>[]
      sentMessages: Prisma.$MessagePayload<ExtArgs>[]
      receivedMessages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      role: string
      avatar: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    children<T extends User$childrenArgs<ExtArgs> = {}>(args?: Subset<T, User$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findMany"> | Null>
    classrooms<T extends User$classroomsArgs<ExtArgs> = {}>(args?: Subset<T, User$classroomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findMany"> | Null>
    sentMessages<T extends User$sentMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany"> | Null>
    receivedMessages<T extends User$receivedMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.children
   */
  export type User$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    where?: ChildWhereInput
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    cursor?: ChildWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }

  /**
   * User.classrooms
   */
  export type User$classroomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    where?: ClassroomWhereInput
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    cursor?: ClassroomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * User.sentMessages
   */
  export type User$sentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.receivedMessages
   */
  export type User$receivedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Child
   */

  export type AggregateChild = {
    _count: ChildCountAggregateOutputType | null
    _avg: ChildAvgAggregateOutputType | null
    _sum: ChildSumAggregateOutputType | null
    _min: ChildMinAggregateOutputType | null
    _max: ChildMaxAggregateOutputType | null
  }

  export type ChildAvgAggregateOutputType = {
    age: number | null
    xp: number | null
    level: number | null
    streak: number | null
    longestStreak: number | null
    totalQuizzes: number | null
    totalWatchTime: number | null
    screenTimeLimit: number | null
  }

  export type ChildSumAggregateOutputType = {
    age: number | null
    xp: number | null
    level: number | null
    streak: number | null
    longestStreak: number | null
    totalQuizzes: number | null
    totalWatchTime: number | null
    screenTimeLimit: number | null
  }

  export type ChildMinAggregateOutputType = {
    id: string | null
    name: string | null
    age: number | null
    grade: string | null
    avatar: string | null
    xp: number | null
    level: number | null
    streak: number | null
    longestStreak: number | null
    lastActiveDate: string | null
    totalQuizzes: number | null
    totalWatchTime: number | null
    screenTimeLimit: number | null
    badges: string | null
    weakSubjects: string | null
    strongSubjects: string | null
    createdAt: Date | null
    updatedAt: Date | null
    parentId: string | null
  }

  export type ChildMaxAggregateOutputType = {
    id: string | null
    name: string | null
    age: number | null
    grade: string | null
    avatar: string | null
    xp: number | null
    level: number | null
    streak: number | null
    longestStreak: number | null
    lastActiveDate: string | null
    totalQuizzes: number | null
    totalWatchTime: number | null
    screenTimeLimit: number | null
    badges: string | null
    weakSubjects: string | null
    strongSubjects: string | null
    createdAt: Date | null
    updatedAt: Date | null
    parentId: string | null
  }

  export type ChildCountAggregateOutputType = {
    id: number
    name: number
    age: number
    grade: number
    avatar: number
    xp: number
    level: number
    streak: number
    longestStreak: number
    lastActiveDate: number
    totalQuizzes: number
    totalWatchTime: number
    screenTimeLimit: number
    badges: number
    weakSubjects: number
    strongSubjects: number
    createdAt: number
    updatedAt: number
    parentId: number
    _all: number
  }


  export type ChildAvgAggregateInputType = {
    age?: true
    xp?: true
    level?: true
    streak?: true
    longestStreak?: true
    totalQuizzes?: true
    totalWatchTime?: true
    screenTimeLimit?: true
  }

  export type ChildSumAggregateInputType = {
    age?: true
    xp?: true
    level?: true
    streak?: true
    longestStreak?: true
    totalQuizzes?: true
    totalWatchTime?: true
    screenTimeLimit?: true
  }

  export type ChildMinAggregateInputType = {
    id?: true
    name?: true
    age?: true
    grade?: true
    avatar?: true
    xp?: true
    level?: true
    streak?: true
    longestStreak?: true
    lastActiveDate?: true
    totalQuizzes?: true
    totalWatchTime?: true
    screenTimeLimit?: true
    badges?: true
    weakSubjects?: true
    strongSubjects?: true
    createdAt?: true
    updatedAt?: true
    parentId?: true
  }

  export type ChildMaxAggregateInputType = {
    id?: true
    name?: true
    age?: true
    grade?: true
    avatar?: true
    xp?: true
    level?: true
    streak?: true
    longestStreak?: true
    lastActiveDate?: true
    totalQuizzes?: true
    totalWatchTime?: true
    screenTimeLimit?: true
    badges?: true
    weakSubjects?: true
    strongSubjects?: true
    createdAt?: true
    updatedAt?: true
    parentId?: true
  }

  export type ChildCountAggregateInputType = {
    id?: true
    name?: true
    age?: true
    grade?: true
    avatar?: true
    xp?: true
    level?: true
    streak?: true
    longestStreak?: true
    lastActiveDate?: true
    totalQuizzes?: true
    totalWatchTime?: true
    screenTimeLimit?: true
    badges?: true
    weakSubjects?: true
    strongSubjects?: true
    createdAt?: true
    updatedAt?: true
    parentId?: true
    _all?: true
  }

  export type ChildAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Child to aggregate.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Children
    **/
    _count?: true | ChildCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChildAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChildSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChildMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChildMaxAggregateInputType
  }

  export type GetChildAggregateType<T extends ChildAggregateArgs> = {
        [P in keyof T & keyof AggregateChild]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChild[P]>
      : GetScalarType<T[P], AggregateChild[P]>
  }




  export type ChildGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChildWhereInput
    orderBy?: ChildOrderByWithAggregationInput | ChildOrderByWithAggregationInput[]
    by: ChildScalarFieldEnum[] | ChildScalarFieldEnum
    having?: ChildScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChildCountAggregateInputType | true
    _avg?: ChildAvgAggregateInputType
    _sum?: ChildSumAggregateInputType
    _min?: ChildMinAggregateInputType
    _max?: ChildMaxAggregateInputType
  }

  export type ChildGroupByOutputType = {
    id: string
    name: string
    age: number
    grade: string | null
    avatar: string | null
    xp: number
    level: number
    streak: number
    longestStreak: number
    lastActiveDate: string | null
    totalQuizzes: number
    totalWatchTime: number
    screenTimeLimit: number
    badges: string
    weakSubjects: string
    strongSubjects: string
    createdAt: Date
    updatedAt: Date
    parentId: string
    _count: ChildCountAggregateOutputType | null
    _avg: ChildAvgAggregateOutputType | null
    _sum: ChildSumAggregateOutputType | null
    _min: ChildMinAggregateOutputType | null
    _max: ChildMaxAggregateOutputType | null
  }

  type GetChildGroupByPayload<T extends ChildGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChildGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChildGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChildGroupByOutputType[P]>
            : GetScalarType<T[P], ChildGroupByOutputType[P]>
        }
      >
    >


  export type ChildSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    age?: boolean
    grade?: boolean
    avatar?: boolean
    xp?: boolean
    level?: boolean
    streak?: boolean
    longestStreak?: boolean
    lastActiveDate?: boolean
    totalQuizzes?: boolean
    totalWatchTime?: boolean
    screenTimeLimit?: boolean
    badges?: boolean
    weakSubjects?: boolean
    strongSubjects?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentId?: boolean
    parent?: boolean | UserDefaultArgs<ExtArgs>
    quizAttempts?: boolean | Child$quizAttemptsArgs<ExtArgs>
    watchLogs?: boolean | Child$watchLogsArgs<ExtArgs>
    activities?: boolean | Child$activitiesArgs<ExtArgs>
    alerts?: boolean | Child$alertsArgs<ExtArgs>
    sentFriendRequests?: boolean | Child$sentFriendRequestsArgs<ExtArgs>
    receivedFriendRequests?: boolean | Child$receivedFriendRequestsArgs<ExtArgs>
    sentChallenges?: boolean | Child$sentChallengesArgs<ExtArgs>
    receivedChallenges?: boolean | Child$receivedChallengesArgs<ExtArgs>
    _count?: boolean | ChildCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["child"]>

  export type ChildSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    age?: boolean
    grade?: boolean
    avatar?: boolean
    xp?: boolean
    level?: boolean
    streak?: boolean
    longestStreak?: boolean
    lastActiveDate?: boolean
    totalQuizzes?: boolean
    totalWatchTime?: boolean
    screenTimeLimit?: boolean
    badges?: boolean
    weakSubjects?: boolean
    strongSubjects?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentId?: boolean
    parent?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["child"]>

  export type ChildSelectScalar = {
    id?: boolean
    name?: boolean
    age?: boolean
    grade?: boolean
    avatar?: boolean
    xp?: boolean
    level?: boolean
    streak?: boolean
    longestStreak?: boolean
    lastActiveDate?: boolean
    totalQuizzes?: boolean
    totalWatchTime?: boolean
    screenTimeLimit?: boolean
    badges?: boolean
    weakSubjects?: boolean
    strongSubjects?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentId?: boolean
  }

  export type ChildInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | UserDefaultArgs<ExtArgs>
    quizAttempts?: boolean | Child$quizAttemptsArgs<ExtArgs>
    watchLogs?: boolean | Child$watchLogsArgs<ExtArgs>
    activities?: boolean | Child$activitiesArgs<ExtArgs>
    alerts?: boolean | Child$alertsArgs<ExtArgs>
    sentFriendRequests?: boolean | Child$sentFriendRequestsArgs<ExtArgs>
    receivedFriendRequests?: boolean | Child$receivedFriendRequestsArgs<ExtArgs>
    sentChallenges?: boolean | Child$sentChallengesArgs<ExtArgs>
    receivedChallenges?: boolean | Child$receivedChallengesArgs<ExtArgs>
    _count?: boolean | ChildCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChildIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ChildPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Child"
    objects: {
      parent: Prisma.$UserPayload<ExtArgs>
      quizAttempts: Prisma.$QuizAttemptPayload<ExtArgs>[]
      watchLogs: Prisma.$WatchLogPayload<ExtArgs>[]
      activities: Prisma.$ActivityFeedPayload<ExtArgs>[]
      alerts: Prisma.$ParentAlertPayload<ExtArgs>[]
      sentFriendRequests: Prisma.$FriendRequestPayload<ExtArgs>[]
      receivedFriendRequests: Prisma.$FriendRequestPayload<ExtArgs>[]
      sentChallenges: Prisma.$PeerChallengePayload<ExtArgs>[]
      receivedChallenges: Prisma.$PeerChallengePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      age: number
      grade: string | null
      avatar: string | null
      xp: number
      level: number
      streak: number
      longestStreak: number
      lastActiveDate: string | null
      totalQuizzes: number
      totalWatchTime: number
      screenTimeLimit: number
      badges: string
      weakSubjects: string
      strongSubjects: string
      createdAt: Date
      updatedAt: Date
      parentId: string
    }, ExtArgs["result"]["child"]>
    composites: {}
  }

  type ChildGetPayload<S extends boolean | null | undefined | ChildDefaultArgs> = $Result.GetResult<Prisma.$ChildPayload, S>

  type ChildCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ChildFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ChildCountAggregateInputType | true
    }

  export interface ChildDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Child'], meta: { name: 'Child' } }
    /**
     * Find zero or one Child that matches the filter.
     * @param {ChildFindUniqueArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChildFindUniqueArgs>(args: SelectSubset<T, ChildFindUniqueArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Child that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ChildFindUniqueOrThrowArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChildFindUniqueOrThrowArgs>(args: SelectSubset<T, ChildFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Child that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindFirstArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChildFindFirstArgs>(args?: SelectSubset<T, ChildFindFirstArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Child that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindFirstOrThrowArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChildFindFirstOrThrowArgs>(args?: SelectSubset<T, ChildFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Children that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Children
     * const children = await prisma.child.findMany()
     * 
     * // Get first 10 Children
     * const children = await prisma.child.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const childWithIdOnly = await prisma.child.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChildFindManyArgs>(args?: SelectSubset<T, ChildFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Child.
     * @param {ChildCreateArgs} args - Arguments to create a Child.
     * @example
     * // Create one Child
     * const Child = await prisma.child.create({
     *   data: {
     *     // ... data to create a Child
     *   }
     * })
     * 
     */
    create<T extends ChildCreateArgs>(args: SelectSubset<T, ChildCreateArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Children.
     * @param {ChildCreateManyArgs} args - Arguments to create many Children.
     * @example
     * // Create many Children
     * const child = await prisma.child.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChildCreateManyArgs>(args?: SelectSubset<T, ChildCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Children and returns the data saved in the database.
     * @param {ChildCreateManyAndReturnArgs} args - Arguments to create many Children.
     * @example
     * // Create many Children
     * const child = await prisma.child.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Children and only return the `id`
     * const childWithIdOnly = await prisma.child.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChildCreateManyAndReturnArgs>(args?: SelectSubset<T, ChildCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Child.
     * @param {ChildDeleteArgs} args - Arguments to delete one Child.
     * @example
     * // Delete one Child
     * const Child = await prisma.child.delete({
     *   where: {
     *     // ... filter to delete one Child
     *   }
     * })
     * 
     */
    delete<T extends ChildDeleteArgs>(args: SelectSubset<T, ChildDeleteArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Child.
     * @param {ChildUpdateArgs} args - Arguments to update one Child.
     * @example
     * // Update one Child
     * const child = await prisma.child.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChildUpdateArgs>(args: SelectSubset<T, ChildUpdateArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Children.
     * @param {ChildDeleteManyArgs} args - Arguments to filter Children to delete.
     * @example
     * // Delete a few Children
     * const { count } = await prisma.child.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChildDeleteManyArgs>(args?: SelectSubset<T, ChildDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Children
     * const child = await prisma.child.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChildUpdateManyArgs>(args: SelectSubset<T, ChildUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Child.
     * @param {ChildUpsertArgs} args - Arguments to update or create a Child.
     * @example
     * // Update or create a Child
     * const child = await prisma.child.upsert({
     *   create: {
     *     // ... data to create a Child
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Child we want to update
     *   }
     * })
     */
    upsert<T extends ChildUpsertArgs>(args: SelectSubset<T, ChildUpsertArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildCountArgs} args - Arguments to filter Children to count.
     * @example
     * // Count the number of Children
     * const count = await prisma.child.count({
     *   where: {
     *     // ... the filter for the Children we want to count
     *   }
     * })
    **/
    count<T extends ChildCountArgs>(
      args?: Subset<T, ChildCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChildCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Child.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChildAggregateArgs>(args: Subset<T, ChildAggregateArgs>): Prisma.PrismaPromise<GetChildAggregateType<T>>

    /**
     * Group by Child.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChildGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChildGroupByArgs['orderBy'] }
        : { orderBy?: ChildGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChildGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChildGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Child model
   */
  readonly fields: ChildFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Child.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChildClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    quizAttempts<T extends Child$quizAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, Child$quizAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findMany"> | Null>
    watchLogs<T extends Child$watchLogsArgs<ExtArgs> = {}>(args?: Subset<T, Child$watchLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findMany"> | Null>
    activities<T extends Child$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Child$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityFeedPayload<ExtArgs>, T, "findMany"> | Null>
    alerts<T extends Child$alertsArgs<ExtArgs> = {}>(args?: Subset<T, Child$alertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentAlertPayload<ExtArgs>, T, "findMany"> | Null>
    sentFriendRequests<T extends Child$sentFriendRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Child$sentFriendRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany"> | Null>
    receivedFriendRequests<T extends Child$receivedFriendRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Child$receivedFriendRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany"> | Null>
    sentChallenges<T extends Child$sentChallengesArgs<ExtArgs> = {}>(args?: Subset<T, Child$sentChallengesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "findMany"> | Null>
    receivedChallenges<T extends Child$receivedChallengesArgs<ExtArgs> = {}>(args?: Subset<T, Child$receivedChallengesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Child model
   */ 
  interface ChildFieldRefs {
    readonly id: FieldRef<"Child", 'String'>
    readonly name: FieldRef<"Child", 'String'>
    readonly age: FieldRef<"Child", 'Int'>
    readonly grade: FieldRef<"Child", 'String'>
    readonly avatar: FieldRef<"Child", 'String'>
    readonly xp: FieldRef<"Child", 'Int'>
    readonly level: FieldRef<"Child", 'Int'>
    readonly streak: FieldRef<"Child", 'Int'>
    readonly longestStreak: FieldRef<"Child", 'Int'>
    readonly lastActiveDate: FieldRef<"Child", 'String'>
    readonly totalQuizzes: FieldRef<"Child", 'Int'>
    readonly totalWatchTime: FieldRef<"Child", 'Int'>
    readonly screenTimeLimit: FieldRef<"Child", 'Int'>
    readonly badges: FieldRef<"Child", 'String'>
    readonly weakSubjects: FieldRef<"Child", 'String'>
    readonly strongSubjects: FieldRef<"Child", 'String'>
    readonly createdAt: FieldRef<"Child", 'DateTime'>
    readonly updatedAt: FieldRef<"Child", 'DateTime'>
    readonly parentId: FieldRef<"Child", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Child findUnique
   */
  export type ChildFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child findUniqueOrThrow
   */
  export type ChildFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child findFirst
   */
  export type ChildFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Children.
     */
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }

  /**
   * Child findFirstOrThrow
   */
  export type ChildFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Children.
     */
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }

  /**
   * Child findMany
   */
  export type ChildFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Children to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }

  /**
   * Child create
   */
  export type ChildCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The data needed to create a Child.
     */
    data: XOR<ChildCreateInput, ChildUncheckedCreateInput>
  }

  /**
   * Child createMany
   */
  export type ChildCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Children.
     */
    data: ChildCreateManyInput | ChildCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Child createManyAndReturn
   */
  export type ChildCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Children.
     */
    data: ChildCreateManyInput | ChildCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Child update
   */
  export type ChildUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The data needed to update a Child.
     */
    data: XOR<ChildUpdateInput, ChildUncheckedUpdateInput>
    /**
     * Choose, which Child to update.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child updateMany
   */
  export type ChildUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Children.
     */
    data: XOR<ChildUpdateManyMutationInput, ChildUncheckedUpdateManyInput>
    /**
     * Filter which Children to update
     */
    where?: ChildWhereInput
  }

  /**
   * Child upsert
   */
  export type ChildUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The filter to search for the Child to update in case it exists.
     */
    where: ChildWhereUniqueInput
    /**
     * In case the Child found by the `where` argument doesn't exist, create a new Child with this data.
     */
    create: XOR<ChildCreateInput, ChildUncheckedCreateInput>
    /**
     * In case the Child was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChildUpdateInput, ChildUncheckedUpdateInput>
  }

  /**
   * Child delete
   */
  export type ChildDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter which Child to delete.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child deleteMany
   */
  export type ChildDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Children to delete
     */
    where?: ChildWhereInput
  }

  /**
   * Child.quizAttempts
   */
  export type Child$quizAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    where?: QuizAttemptWhereInput
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    cursor?: QuizAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * Child.watchLogs
   */
  export type Child$watchLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    where?: WatchLogWhereInput
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    cursor?: WatchLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchLogScalarFieldEnum | WatchLogScalarFieldEnum[]
  }

  /**
   * Child.activities
   */
  export type Child$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedInclude<ExtArgs> | null
    where?: ActivityFeedWhereInput
    orderBy?: ActivityFeedOrderByWithRelationInput | ActivityFeedOrderByWithRelationInput[]
    cursor?: ActivityFeedWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityFeedScalarFieldEnum | ActivityFeedScalarFieldEnum[]
  }

  /**
   * Child.alerts
   */
  export type Child$alertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertInclude<ExtArgs> | null
    where?: ParentAlertWhereInput
    orderBy?: ParentAlertOrderByWithRelationInput | ParentAlertOrderByWithRelationInput[]
    cursor?: ParentAlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParentAlertScalarFieldEnum | ParentAlertScalarFieldEnum[]
  }

  /**
   * Child.sentFriendRequests
   */
  export type Child$sentFriendRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    cursor?: FriendRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * Child.receivedFriendRequests
   */
  export type Child$receivedFriendRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    cursor?: FriendRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * Child.sentChallenges
   */
  export type Child$sentChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
    where?: PeerChallengeWhereInput
    orderBy?: PeerChallengeOrderByWithRelationInput | PeerChallengeOrderByWithRelationInput[]
    cursor?: PeerChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PeerChallengeScalarFieldEnum | PeerChallengeScalarFieldEnum[]
  }

  /**
   * Child.receivedChallenges
   */
  export type Child$receivedChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
    where?: PeerChallengeWhereInput
    orderBy?: PeerChallengeOrderByWithRelationInput | PeerChallengeOrderByWithRelationInput[]
    cursor?: PeerChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PeerChallengeScalarFieldEnum | PeerChallengeScalarFieldEnum[]
  }

  /**
   * Child without action
   */
  export type ChildDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
  }


  /**
   * Model Content
   */

  export type AggregateContent = {
    _count: ContentCountAggregateOutputType | null
    _avg: ContentAvgAggregateOutputType | null
    _sum: ContentSumAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  }

  export type ContentAvgAggregateOutputType = {
    duration: number | null
    ageMin: number | null
    ageMax: number | null
    xpReward: number | null
  }

  export type ContentSumAggregateOutputType = {
    duration: number | null
    ageMin: number | null
    ageMax: number | null
    xpReward: number | null
  }

  export type ContentMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    type: string | null
    subject: string | null
    thumbnailUrl: string | null
    contentUrl: string | null
    duration: number | null
    ageMin: number | null
    ageMax: number | null
    difficulty: string | null
    xpReward: number | null
    isApproved: boolean | null
    createdAt: Date | null
  }

  export type ContentMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    type: string | null
    subject: string | null
    thumbnailUrl: string | null
    contentUrl: string | null
    duration: number | null
    ageMin: number | null
    ageMax: number | null
    difficulty: string | null
    xpReward: number | null
    isApproved: boolean | null
    createdAt: Date | null
  }

  export type ContentCountAggregateOutputType = {
    id: number
    title: number
    description: number
    type: number
    subject: number
    thumbnailUrl: number
    contentUrl: number
    duration: number
    ageMin: number
    ageMax: number
    difficulty: number
    xpReward: number
    isApproved: number
    createdAt: number
    _all: number
  }


  export type ContentAvgAggregateInputType = {
    duration?: true
    ageMin?: true
    ageMax?: true
    xpReward?: true
  }

  export type ContentSumAggregateInputType = {
    duration?: true
    ageMin?: true
    ageMax?: true
    xpReward?: true
  }

  export type ContentMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    subject?: true
    thumbnailUrl?: true
    contentUrl?: true
    duration?: true
    ageMin?: true
    ageMax?: true
    difficulty?: true
    xpReward?: true
    isApproved?: true
    createdAt?: true
  }

  export type ContentMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    subject?: true
    thumbnailUrl?: true
    contentUrl?: true
    duration?: true
    ageMin?: true
    ageMax?: true
    difficulty?: true
    xpReward?: true
    isApproved?: true
    createdAt?: true
  }

  export type ContentCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    subject?: true
    thumbnailUrl?: true
    contentUrl?: true
    duration?: true
    ageMin?: true
    ageMax?: true
    difficulty?: true
    xpReward?: true
    isApproved?: true
    createdAt?: true
    _all?: true
  }

  export type ContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Content to aggregate.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contents
    **/
    _count?: true | ContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContentMaxAggregateInputType
  }

  export type GetContentAggregateType<T extends ContentAggregateArgs> = {
        [P in keyof T & keyof AggregateContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContent[P]>
      : GetScalarType<T[P], AggregateContent[P]>
  }




  export type ContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithAggregationInput | ContentOrderByWithAggregationInput[]
    by: ContentScalarFieldEnum[] | ContentScalarFieldEnum
    having?: ContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContentCountAggregateInputType | true
    _avg?: ContentAvgAggregateInputType
    _sum?: ContentSumAggregateInputType
    _min?: ContentMinAggregateInputType
    _max?: ContentMaxAggregateInputType
  }

  export type ContentGroupByOutputType = {
    id: string
    title: string
    description: string | null
    type: string
    subject: string
    thumbnailUrl: string | null
    contentUrl: string
    duration: number | null
    ageMin: number
    ageMax: number
    difficulty: string
    xpReward: number
    isApproved: boolean
    createdAt: Date
    _count: ContentCountAggregateOutputType | null
    _avg: ContentAvgAggregateOutputType | null
    _sum: ContentSumAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  }

  type GetContentGroupByPayload<T extends ContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContentGroupByOutputType[P]>
            : GetScalarType<T[P], ContentGroupByOutputType[P]>
        }
      >
    >


  export type ContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    subject?: boolean
    thumbnailUrl?: boolean
    contentUrl?: boolean
    duration?: boolean
    ageMin?: boolean
    ageMax?: boolean
    difficulty?: boolean
    xpReward?: boolean
    isApproved?: boolean
    createdAt?: boolean
    watchLogs?: boolean | Content$watchLogsArgs<ExtArgs>
    _count?: boolean | ContentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["content"]>

  export type ContentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    subject?: boolean
    thumbnailUrl?: boolean
    contentUrl?: boolean
    duration?: boolean
    ageMin?: boolean
    ageMax?: boolean
    difficulty?: boolean
    xpReward?: boolean
    isApproved?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["content"]>

  export type ContentSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    subject?: boolean
    thumbnailUrl?: boolean
    contentUrl?: boolean
    duration?: boolean
    ageMin?: boolean
    ageMax?: boolean
    difficulty?: boolean
    xpReward?: boolean
    isApproved?: boolean
    createdAt?: boolean
  }

  export type ContentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watchLogs?: boolean | Content$watchLogsArgs<ExtArgs>
    _count?: boolean | ContentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Content"
    objects: {
      watchLogs: Prisma.$WatchLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      type: string
      subject: string
      thumbnailUrl: string | null
      contentUrl: string
      duration: number | null
      ageMin: number
      ageMax: number
      difficulty: string
      xpReward: number
      isApproved: boolean
      createdAt: Date
    }, ExtArgs["result"]["content"]>
    composites: {}
  }

  type ContentGetPayload<S extends boolean | null | undefined | ContentDefaultArgs> = $Result.GetResult<Prisma.$ContentPayload, S>

  type ContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContentCountAggregateInputType | true
    }

  export interface ContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Content'], meta: { name: 'Content' } }
    /**
     * Find zero or one Content that matches the filter.
     * @param {ContentFindUniqueArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContentFindUniqueArgs>(args: SelectSubset<T, ContentFindUniqueArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Content that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContentFindUniqueOrThrowArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContentFindUniqueOrThrowArgs>(args: SelectSubset<T, ContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Content that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindFirstArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContentFindFirstArgs>(args?: SelectSubset<T, ContentFindFirstArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Content that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindFirstOrThrowArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContentFindFirstOrThrowArgs>(args?: SelectSubset<T, ContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Contents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contents
     * const contents = await prisma.content.findMany()
     * 
     * // Get first 10 Contents
     * const contents = await prisma.content.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contentWithIdOnly = await prisma.content.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContentFindManyArgs>(args?: SelectSubset<T, ContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Content.
     * @param {ContentCreateArgs} args - Arguments to create a Content.
     * @example
     * // Create one Content
     * const Content = await prisma.content.create({
     *   data: {
     *     // ... data to create a Content
     *   }
     * })
     * 
     */
    create<T extends ContentCreateArgs>(args: SelectSubset<T, ContentCreateArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Contents.
     * @param {ContentCreateManyArgs} args - Arguments to create many Contents.
     * @example
     * // Create many Contents
     * const content = await prisma.content.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContentCreateManyArgs>(args?: SelectSubset<T, ContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contents and returns the data saved in the database.
     * @param {ContentCreateManyAndReturnArgs} args - Arguments to create many Contents.
     * @example
     * // Create many Contents
     * const content = await prisma.content.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contents and only return the `id`
     * const contentWithIdOnly = await prisma.content.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContentCreateManyAndReturnArgs>(args?: SelectSubset<T, ContentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Content.
     * @param {ContentDeleteArgs} args - Arguments to delete one Content.
     * @example
     * // Delete one Content
     * const Content = await prisma.content.delete({
     *   where: {
     *     // ... filter to delete one Content
     *   }
     * })
     * 
     */
    delete<T extends ContentDeleteArgs>(args: SelectSubset<T, ContentDeleteArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Content.
     * @param {ContentUpdateArgs} args - Arguments to update one Content.
     * @example
     * // Update one Content
     * const content = await prisma.content.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContentUpdateArgs>(args: SelectSubset<T, ContentUpdateArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Contents.
     * @param {ContentDeleteManyArgs} args - Arguments to filter Contents to delete.
     * @example
     * // Delete a few Contents
     * const { count } = await prisma.content.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContentDeleteManyArgs>(args?: SelectSubset<T, ContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contents
     * const content = await prisma.content.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContentUpdateManyArgs>(args: SelectSubset<T, ContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Content.
     * @param {ContentUpsertArgs} args - Arguments to update or create a Content.
     * @example
     * // Update or create a Content
     * const content = await prisma.content.upsert({
     *   create: {
     *     // ... data to create a Content
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Content we want to update
     *   }
     * })
     */
    upsert<T extends ContentUpsertArgs>(args: SelectSubset<T, ContentUpsertArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Contents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentCountArgs} args - Arguments to filter Contents to count.
     * @example
     * // Count the number of Contents
     * const count = await prisma.content.count({
     *   where: {
     *     // ... the filter for the Contents we want to count
     *   }
     * })
    **/
    count<T extends ContentCountArgs>(
      args?: Subset<T, ContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Content.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContentAggregateArgs>(args: Subset<T, ContentAggregateArgs>): Prisma.PrismaPromise<GetContentAggregateType<T>>

    /**
     * Group by Content.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContentGroupByArgs['orderBy'] }
        : { orderBy?: ContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Content model
   */
  readonly fields: ContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Content.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    watchLogs<T extends Content$watchLogsArgs<ExtArgs> = {}>(args?: Subset<T, Content$watchLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Content model
   */ 
  interface ContentFieldRefs {
    readonly id: FieldRef<"Content", 'String'>
    readonly title: FieldRef<"Content", 'String'>
    readonly description: FieldRef<"Content", 'String'>
    readonly type: FieldRef<"Content", 'String'>
    readonly subject: FieldRef<"Content", 'String'>
    readonly thumbnailUrl: FieldRef<"Content", 'String'>
    readonly contentUrl: FieldRef<"Content", 'String'>
    readonly duration: FieldRef<"Content", 'Int'>
    readonly ageMin: FieldRef<"Content", 'Int'>
    readonly ageMax: FieldRef<"Content", 'Int'>
    readonly difficulty: FieldRef<"Content", 'String'>
    readonly xpReward: FieldRef<"Content", 'Int'>
    readonly isApproved: FieldRef<"Content", 'Boolean'>
    readonly createdAt: FieldRef<"Content", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Content findUnique
   */
  export type ContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content findUniqueOrThrow
   */
  export type ContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content findFirst
   */
  export type ContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contents.
     */
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content findFirstOrThrow
   */
  export type ContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contents.
     */
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content findMany
   */
  export type ContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Contents to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content create
   */
  export type ContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The data needed to create a Content.
     */
    data: XOR<ContentCreateInput, ContentUncheckedCreateInput>
  }

  /**
   * Content createMany
   */
  export type ContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contents.
     */
    data: ContentCreateManyInput | ContentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Content createManyAndReturn
   */
  export type ContentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Contents.
     */
    data: ContentCreateManyInput | ContentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Content update
   */
  export type ContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The data needed to update a Content.
     */
    data: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
    /**
     * Choose, which Content to update.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content updateMany
   */
  export type ContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contents.
     */
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyInput>
    /**
     * Filter which Contents to update
     */
    where?: ContentWhereInput
  }

  /**
   * Content upsert
   */
  export type ContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The filter to search for the Content to update in case it exists.
     */
    where: ContentWhereUniqueInput
    /**
     * In case the Content found by the `where` argument doesn't exist, create a new Content with this data.
     */
    create: XOR<ContentCreateInput, ContentUncheckedCreateInput>
    /**
     * In case the Content was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
  }

  /**
   * Content delete
   */
  export type ContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter which Content to delete.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content deleteMany
   */
  export type ContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contents to delete
     */
    where?: ContentWhereInput
  }

  /**
   * Content.watchLogs
   */
  export type Content$watchLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    where?: WatchLogWhereInput
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    cursor?: WatchLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchLogScalarFieldEnum | WatchLogScalarFieldEnum[]
  }

  /**
   * Content without action
   */
  export type ContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
  }


  /**
   * Model WatchLog
   */

  export type AggregateWatchLog = {
    _count: WatchLogCountAggregateOutputType | null
    _avg: WatchLogAvgAggregateOutputType | null
    _sum: WatchLogSumAggregateOutputType | null
    _min: WatchLogMinAggregateOutputType | null
    _max: WatchLogMaxAggregateOutputType | null
  }

  export type WatchLogAvgAggregateOutputType = {
    duration: number | null
  }

  export type WatchLogSumAggregateOutputType = {
    duration: number | null
  }

  export type WatchLogMinAggregateOutputType = {
    id: string | null
    childId: string | null
    contentId: string | null
    watchedAt: Date | null
    duration: number | null
  }

  export type WatchLogMaxAggregateOutputType = {
    id: string | null
    childId: string | null
    contentId: string | null
    watchedAt: Date | null
    duration: number | null
  }

  export type WatchLogCountAggregateOutputType = {
    id: number
    childId: number
    contentId: number
    watchedAt: number
    duration: number
    _all: number
  }


  export type WatchLogAvgAggregateInputType = {
    duration?: true
  }

  export type WatchLogSumAggregateInputType = {
    duration?: true
  }

  export type WatchLogMinAggregateInputType = {
    id?: true
    childId?: true
    contentId?: true
    watchedAt?: true
    duration?: true
  }

  export type WatchLogMaxAggregateInputType = {
    id?: true
    childId?: true
    contentId?: true
    watchedAt?: true
    duration?: true
  }

  export type WatchLogCountAggregateInputType = {
    id?: true
    childId?: true
    contentId?: true
    watchedAt?: true
    duration?: true
    _all?: true
  }

  export type WatchLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchLog to aggregate.
     */
    where?: WatchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchLogs to fetch.
     */
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WatchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WatchLogs
    **/
    _count?: true | WatchLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WatchLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WatchLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatchLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatchLogMaxAggregateInputType
  }

  export type GetWatchLogAggregateType<T extends WatchLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWatchLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatchLog[P]>
      : GetScalarType<T[P], AggregateWatchLog[P]>
  }




  export type WatchLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchLogWhereInput
    orderBy?: WatchLogOrderByWithAggregationInput | WatchLogOrderByWithAggregationInput[]
    by: WatchLogScalarFieldEnum[] | WatchLogScalarFieldEnum
    having?: WatchLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatchLogCountAggregateInputType | true
    _avg?: WatchLogAvgAggregateInputType
    _sum?: WatchLogSumAggregateInputType
    _min?: WatchLogMinAggregateInputType
    _max?: WatchLogMaxAggregateInputType
  }

  export type WatchLogGroupByOutputType = {
    id: string
    childId: string
    contentId: string
    watchedAt: Date
    duration: number
    _count: WatchLogCountAggregateOutputType | null
    _avg: WatchLogAvgAggregateOutputType | null
    _sum: WatchLogSumAggregateOutputType | null
    _min: WatchLogMinAggregateOutputType | null
    _max: WatchLogMaxAggregateOutputType | null
  }

  type GetWatchLogGroupByPayload<T extends WatchLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatchLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatchLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchLogGroupByOutputType[P]>
            : GetScalarType<T[P], WatchLogGroupByOutputType[P]>
        }
      >
    >


  export type WatchLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    contentId?: boolean
    watchedAt?: boolean
    duration?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
    content?: boolean | ContentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchLog"]>

  export type WatchLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    contentId?: boolean
    watchedAt?: boolean
    duration?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
    content?: boolean | ContentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchLog"]>

  export type WatchLogSelectScalar = {
    id?: boolean
    childId?: boolean
    contentId?: boolean
    watchedAt?: boolean
    duration?: boolean
  }

  export type WatchLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
    content?: boolean | ContentDefaultArgs<ExtArgs>
  }
  export type WatchLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
    content?: boolean | ContentDefaultArgs<ExtArgs>
  }

  export type $WatchLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WatchLog"
    objects: {
      child: Prisma.$ChildPayload<ExtArgs>
      content: Prisma.$ContentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      childId: string
      contentId: string
      watchedAt: Date
      duration: number
    }, ExtArgs["result"]["watchLog"]>
    composites: {}
  }

  type WatchLogGetPayload<S extends boolean | null | undefined | WatchLogDefaultArgs> = $Result.GetResult<Prisma.$WatchLogPayload, S>

  type WatchLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WatchLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WatchLogCountAggregateInputType | true
    }

  export interface WatchLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WatchLog'], meta: { name: 'WatchLog' } }
    /**
     * Find zero or one WatchLog that matches the filter.
     * @param {WatchLogFindUniqueArgs} args - Arguments to find a WatchLog
     * @example
     * // Get one WatchLog
     * const watchLog = await prisma.watchLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchLogFindUniqueArgs>(args: SelectSubset<T, WatchLogFindUniqueArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WatchLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WatchLogFindUniqueOrThrowArgs} args - Arguments to find a WatchLog
     * @example
     * // Get one WatchLog
     * const watchLog = await prisma.watchLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WatchLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WatchLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogFindFirstArgs} args - Arguments to find a WatchLog
     * @example
     * // Get one WatchLog
     * const watchLog = await prisma.watchLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchLogFindFirstArgs>(args?: SelectSubset<T, WatchLogFindFirstArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WatchLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogFindFirstOrThrowArgs} args - Arguments to find a WatchLog
     * @example
     * // Get one WatchLog
     * const watchLog = await prisma.watchLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WatchLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WatchLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WatchLogs
     * const watchLogs = await prisma.watchLog.findMany()
     * 
     * // Get first 10 WatchLogs
     * const watchLogs = await prisma.watchLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const watchLogWithIdOnly = await prisma.watchLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WatchLogFindManyArgs>(args?: SelectSubset<T, WatchLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WatchLog.
     * @param {WatchLogCreateArgs} args - Arguments to create a WatchLog.
     * @example
     * // Create one WatchLog
     * const WatchLog = await prisma.watchLog.create({
     *   data: {
     *     // ... data to create a WatchLog
     *   }
     * })
     * 
     */
    create<T extends WatchLogCreateArgs>(args: SelectSubset<T, WatchLogCreateArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WatchLogs.
     * @param {WatchLogCreateManyArgs} args - Arguments to create many WatchLogs.
     * @example
     * // Create many WatchLogs
     * const watchLog = await prisma.watchLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WatchLogCreateManyArgs>(args?: SelectSubset<T, WatchLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WatchLogs and returns the data saved in the database.
     * @param {WatchLogCreateManyAndReturnArgs} args - Arguments to create many WatchLogs.
     * @example
     * // Create many WatchLogs
     * const watchLog = await prisma.watchLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WatchLogs and only return the `id`
     * const watchLogWithIdOnly = await prisma.watchLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WatchLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WatchLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WatchLog.
     * @param {WatchLogDeleteArgs} args - Arguments to delete one WatchLog.
     * @example
     * // Delete one WatchLog
     * const WatchLog = await prisma.watchLog.delete({
     *   where: {
     *     // ... filter to delete one WatchLog
     *   }
     * })
     * 
     */
    delete<T extends WatchLogDeleteArgs>(args: SelectSubset<T, WatchLogDeleteArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WatchLog.
     * @param {WatchLogUpdateArgs} args - Arguments to update one WatchLog.
     * @example
     * // Update one WatchLog
     * const watchLog = await prisma.watchLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WatchLogUpdateArgs>(args: SelectSubset<T, WatchLogUpdateArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WatchLogs.
     * @param {WatchLogDeleteManyArgs} args - Arguments to filter WatchLogs to delete.
     * @example
     * // Delete a few WatchLogs
     * const { count } = await prisma.watchLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WatchLogDeleteManyArgs>(args?: SelectSubset<T, WatchLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WatchLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WatchLogs
     * const watchLog = await prisma.watchLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WatchLogUpdateManyArgs>(args: SelectSubset<T, WatchLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WatchLog.
     * @param {WatchLogUpsertArgs} args - Arguments to update or create a WatchLog.
     * @example
     * // Update or create a WatchLog
     * const watchLog = await prisma.watchLog.upsert({
     *   create: {
     *     // ... data to create a WatchLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WatchLog we want to update
     *   }
     * })
     */
    upsert<T extends WatchLogUpsertArgs>(args: SelectSubset<T, WatchLogUpsertArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WatchLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogCountArgs} args - Arguments to filter WatchLogs to count.
     * @example
     * // Count the number of WatchLogs
     * const count = await prisma.watchLog.count({
     *   where: {
     *     // ... the filter for the WatchLogs we want to count
     *   }
     * })
    **/
    count<T extends WatchLogCountArgs>(
      args?: Subset<T, WatchLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WatchLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WatchLogAggregateArgs>(args: Subset<T, WatchLogAggregateArgs>): Prisma.PrismaPromise<GetWatchLogAggregateType<T>>

    /**
     * Group by WatchLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WatchLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchLogGroupByArgs['orderBy'] }
        : { orderBy?: WatchLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WatchLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatchLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WatchLog model
   */
  readonly fields: WatchLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WatchLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    content<T extends ContentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContentDefaultArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WatchLog model
   */ 
  interface WatchLogFieldRefs {
    readonly id: FieldRef<"WatchLog", 'String'>
    readonly childId: FieldRef<"WatchLog", 'String'>
    readonly contentId: FieldRef<"WatchLog", 'String'>
    readonly watchedAt: FieldRef<"WatchLog", 'DateTime'>
    readonly duration: FieldRef<"WatchLog", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * WatchLog findUnique
   */
  export type WatchLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter, which WatchLog to fetch.
     */
    where: WatchLogWhereUniqueInput
  }

  /**
   * WatchLog findUniqueOrThrow
   */
  export type WatchLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter, which WatchLog to fetch.
     */
    where: WatchLogWhereUniqueInput
  }

  /**
   * WatchLog findFirst
   */
  export type WatchLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter, which WatchLog to fetch.
     */
    where?: WatchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchLogs to fetch.
     */
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchLogs.
     */
    cursor?: WatchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchLogs.
     */
    distinct?: WatchLogScalarFieldEnum | WatchLogScalarFieldEnum[]
  }

  /**
   * WatchLog findFirstOrThrow
   */
  export type WatchLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter, which WatchLog to fetch.
     */
    where?: WatchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchLogs to fetch.
     */
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchLogs.
     */
    cursor?: WatchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchLogs.
     */
    distinct?: WatchLogScalarFieldEnum | WatchLogScalarFieldEnum[]
  }

  /**
   * WatchLog findMany
   */
  export type WatchLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter, which WatchLogs to fetch.
     */
    where?: WatchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchLogs to fetch.
     */
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WatchLogs.
     */
    cursor?: WatchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchLogs.
     */
    skip?: number
    distinct?: WatchLogScalarFieldEnum | WatchLogScalarFieldEnum[]
  }

  /**
   * WatchLog create
   */
  export type WatchLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * The data needed to create a WatchLog.
     */
    data: XOR<WatchLogCreateInput, WatchLogUncheckedCreateInput>
  }

  /**
   * WatchLog createMany
   */
  export type WatchLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WatchLogs.
     */
    data: WatchLogCreateManyInput | WatchLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WatchLog createManyAndReturn
   */
  export type WatchLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WatchLogs.
     */
    data: WatchLogCreateManyInput | WatchLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WatchLog update
   */
  export type WatchLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * The data needed to update a WatchLog.
     */
    data: XOR<WatchLogUpdateInput, WatchLogUncheckedUpdateInput>
    /**
     * Choose, which WatchLog to update.
     */
    where: WatchLogWhereUniqueInput
  }

  /**
   * WatchLog updateMany
   */
  export type WatchLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WatchLogs.
     */
    data: XOR<WatchLogUpdateManyMutationInput, WatchLogUncheckedUpdateManyInput>
    /**
     * Filter which WatchLogs to update
     */
    where?: WatchLogWhereInput
  }

  /**
   * WatchLog upsert
   */
  export type WatchLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * The filter to search for the WatchLog to update in case it exists.
     */
    where: WatchLogWhereUniqueInput
    /**
     * In case the WatchLog found by the `where` argument doesn't exist, create a new WatchLog with this data.
     */
    create: XOR<WatchLogCreateInput, WatchLogUncheckedCreateInput>
    /**
     * In case the WatchLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchLogUpdateInput, WatchLogUncheckedUpdateInput>
  }

  /**
   * WatchLog delete
   */
  export type WatchLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter which WatchLog to delete.
     */
    where: WatchLogWhereUniqueInput
  }

  /**
   * WatchLog deleteMany
   */
  export type WatchLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchLogs to delete
     */
    where?: WatchLogWhereInput
  }

  /**
   * WatchLog without action
   */
  export type WatchLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
  }


  /**
   * Model Quiz
   */

  export type AggregateQuiz = {
    _count: QuizCountAggregateOutputType | null
    _avg: QuizAvgAggregateOutputType | null
    _sum: QuizSumAggregateOutputType | null
    _min: QuizMinAggregateOutputType | null
    _max: QuizMaxAggregateOutputType | null
  }

  export type QuizAvgAggregateOutputType = {
    xpReward: number | null
    timeLimit: number | null
    ageMin: number | null
    ageMax: number | null
  }

  export type QuizSumAggregateOutputType = {
    xpReward: number | null
    timeLimit: number | null
    ageMin: number | null
    ageMax: number | null
  }

  export type QuizMinAggregateOutputType = {
    id: string | null
    title: string | null
    subject: string | null
    difficulty: string | null
    questions: string | null
    xpReward: number | null
    timeLimit: number | null
    ageMin: number | null
    ageMax: number | null
    createdAt: Date | null
    createdById: string | null
  }

  export type QuizMaxAggregateOutputType = {
    id: string | null
    title: string | null
    subject: string | null
    difficulty: string | null
    questions: string | null
    xpReward: number | null
    timeLimit: number | null
    ageMin: number | null
    ageMax: number | null
    createdAt: Date | null
    createdById: string | null
  }

  export type QuizCountAggregateOutputType = {
    id: number
    title: number
    subject: number
    difficulty: number
    questions: number
    xpReward: number
    timeLimit: number
    ageMin: number
    ageMax: number
    createdAt: number
    createdById: number
    _all: number
  }


  export type QuizAvgAggregateInputType = {
    xpReward?: true
    timeLimit?: true
    ageMin?: true
    ageMax?: true
  }

  export type QuizSumAggregateInputType = {
    xpReward?: true
    timeLimit?: true
    ageMin?: true
    ageMax?: true
  }

  export type QuizMinAggregateInputType = {
    id?: true
    title?: true
    subject?: true
    difficulty?: true
    questions?: true
    xpReward?: true
    timeLimit?: true
    ageMin?: true
    ageMax?: true
    createdAt?: true
    createdById?: true
  }

  export type QuizMaxAggregateInputType = {
    id?: true
    title?: true
    subject?: true
    difficulty?: true
    questions?: true
    xpReward?: true
    timeLimit?: true
    ageMin?: true
    ageMax?: true
    createdAt?: true
    createdById?: true
  }

  export type QuizCountAggregateInputType = {
    id?: true
    title?: true
    subject?: true
    difficulty?: true
    questions?: true
    xpReward?: true
    timeLimit?: true
    ageMin?: true
    ageMax?: true
    createdAt?: true
    createdById?: true
    _all?: true
  }

  export type QuizAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quiz to aggregate.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quizzes
    **/
    _count?: true | QuizCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizMaxAggregateInputType
  }

  export type GetQuizAggregateType<T extends QuizAggregateArgs> = {
        [P in keyof T & keyof AggregateQuiz]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuiz[P]>
      : GetScalarType<T[P], AggregateQuiz[P]>
  }




  export type QuizGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizWhereInput
    orderBy?: QuizOrderByWithAggregationInput | QuizOrderByWithAggregationInput[]
    by: QuizScalarFieldEnum[] | QuizScalarFieldEnum
    having?: QuizScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizCountAggregateInputType | true
    _avg?: QuizAvgAggregateInputType
    _sum?: QuizSumAggregateInputType
    _min?: QuizMinAggregateInputType
    _max?: QuizMaxAggregateInputType
  }

  export type QuizGroupByOutputType = {
    id: string
    title: string
    subject: string
    difficulty: string
    questions: string
    xpReward: number
    timeLimit: number | null
    ageMin: number
    ageMax: number
    createdAt: Date
    createdById: string | null
    _count: QuizCountAggregateOutputType | null
    _avg: QuizAvgAggregateOutputType | null
    _sum: QuizSumAggregateOutputType | null
    _min: QuizMinAggregateOutputType | null
    _max: QuizMaxAggregateOutputType | null
  }

  type GetQuizGroupByPayload<T extends QuizGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizGroupByOutputType[P]>
            : GetScalarType<T[P], QuizGroupByOutputType[P]>
        }
      >
    >


  export type QuizSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subject?: boolean
    difficulty?: boolean
    questions?: boolean
    xpReward?: boolean
    timeLimit?: boolean
    ageMin?: boolean
    ageMax?: boolean
    createdAt?: boolean
    createdById?: boolean
    attempts?: boolean | Quiz$attemptsArgs<ExtArgs>
    _count?: boolean | QuizCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type QuizSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subject?: boolean
    difficulty?: boolean
    questions?: boolean
    xpReward?: boolean
    timeLimit?: boolean
    ageMin?: boolean
    ageMax?: boolean
    createdAt?: boolean
    createdById?: boolean
  }, ExtArgs["result"]["quiz"]>

  export type QuizSelectScalar = {
    id?: boolean
    title?: boolean
    subject?: boolean
    difficulty?: boolean
    questions?: boolean
    xpReward?: boolean
    timeLimit?: boolean
    ageMin?: boolean
    ageMax?: boolean
    createdAt?: boolean
    createdById?: boolean
  }

  export type QuizInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | Quiz$attemptsArgs<ExtArgs>
    _count?: boolean | QuizCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuizIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $QuizPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quiz"
    objects: {
      attempts: Prisma.$QuizAttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      subject: string
      difficulty: string
      questions: string
      xpReward: number
      timeLimit: number | null
      ageMin: number
      ageMax: number
      createdAt: Date
      createdById: string | null
    }, ExtArgs["result"]["quiz"]>
    composites: {}
  }

  type QuizGetPayload<S extends boolean | null | undefined | QuizDefaultArgs> = $Result.GetResult<Prisma.$QuizPayload, S>

  type QuizCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuizFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuizCountAggregateInputType | true
    }

  export interface QuizDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quiz'], meta: { name: 'Quiz' } }
    /**
     * Find zero or one Quiz that matches the filter.
     * @param {QuizFindUniqueArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizFindUniqueArgs>(args: SelectSubset<T, QuizFindUniqueArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Quiz that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuizFindUniqueOrThrowArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Quiz that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindFirstArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizFindFirstArgs>(args?: SelectSubset<T, QuizFindFirstArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Quiz that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindFirstOrThrowArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Quizzes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quizzes
     * const quizzes = await prisma.quiz.findMany()
     * 
     * // Get first 10 Quizzes
     * const quizzes = await prisma.quiz.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizWithIdOnly = await prisma.quiz.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizFindManyArgs>(args?: SelectSubset<T, QuizFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Quiz.
     * @param {QuizCreateArgs} args - Arguments to create a Quiz.
     * @example
     * // Create one Quiz
     * const Quiz = await prisma.quiz.create({
     *   data: {
     *     // ... data to create a Quiz
     *   }
     * })
     * 
     */
    create<T extends QuizCreateArgs>(args: SelectSubset<T, QuizCreateArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Quizzes.
     * @param {QuizCreateManyArgs} args - Arguments to create many Quizzes.
     * @example
     * // Create many Quizzes
     * const quiz = await prisma.quiz.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizCreateManyArgs>(args?: SelectSubset<T, QuizCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quizzes and returns the data saved in the database.
     * @param {QuizCreateManyAndReturnArgs} args - Arguments to create many Quizzes.
     * @example
     * // Create many Quizzes
     * const quiz = await prisma.quiz.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quizzes and only return the `id`
     * const quizWithIdOnly = await prisma.quiz.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Quiz.
     * @param {QuizDeleteArgs} args - Arguments to delete one Quiz.
     * @example
     * // Delete one Quiz
     * const Quiz = await prisma.quiz.delete({
     *   where: {
     *     // ... filter to delete one Quiz
     *   }
     * })
     * 
     */
    delete<T extends QuizDeleteArgs>(args: SelectSubset<T, QuizDeleteArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Quiz.
     * @param {QuizUpdateArgs} args - Arguments to update one Quiz.
     * @example
     * // Update one Quiz
     * const quiz = await prisma.quiz.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizUpdateArgs>(args: SelectSubset<T, QuizUpdateArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Quizzes.
     * @param {QuizDeleteManyArgs} args - Arguments to filter Quizzes to delete.
     * @example
     * // Delete a few Quizzes
     * const { count } = await prisma.quiz.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizDeleteManyArgs>(args?: SelectSubset<T, QuizDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quizzes
     * const quiz = await prisma.quiz.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizUpdateManyArgs>(args: SelectSubset<T, QuizUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Quiz.
     * @param {QuizUpsertArgs} args - Arguments to update or create a Quiz.
     * @example
     * // Update or create a Quiz
     * const quiz = await prisma.quiz.upsert({
     *   create: {
     *     // ... data to create a Quiz
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quiz we want to update
     *   }
     * })
     */
    upsert<T extends QuizUpsertArgs>(args: SelectSubset<T, QuizUpsertArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizCountArgs} args - Arguments to filter Quizzes to count.
     * @example
     * // Count the number of Quizzes
     * const count = await prisma.quiz.count({
     *   where: {
     *     // ... the filter for the Quizzes we want to count
     *   }
     * })
    **/
    count<T extends QuizCountArgs>(
      args?: Subset<T, QuizCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizAggregateArgs>(args: Subset<T, QuizAggregateArgs>): Prisma.PrismaPromise<GetQuizAggregateType<T>>

    /**
     * Group by Quiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuizGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizGroupByArgs['orderBy'] }
        : { orderBy?: QuizGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuizGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quiz model
   */
  readonly fields: QuizFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quiz.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attempts<T extends Quiz$attemptsArgs<ExtArgs> = {}>(args?: Subset<T, Quiz$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Quiz model
   */ 
  interface QuizFieldRefs {
    readonly id: FieldRef<"Quiz", 'String'>
    readonly title: FieldRef<"Quiz", 'String'>
    readonly subject: FieldRef<"Quiz", 'String'>
    readonly difficulty: FieldRef<"Quiz", 'String'>
    readonly questions: FieldRef<"Quiz", 'String'>
    readonly xpReward: FieldRef<"Quiz", 'Int'>
    readonly timeLimit: FieldRef<"Quiz", 'Int'>
    readonly ageMin: FieldRef<"Quiz", 'Int'>
    readonly ageMax: FieldRef<"Quiz", 'Int'>
    readonly createdAt: FieldRef<"Quiz", 'DateTime'>
    readonly createdById: FieldRef<"Quiz", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Quiz findUnique
   */
  export type QuizFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz findUniqueOrThrow
   */
  export type QuizFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz findFirst
   */
  export type QuizFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quizzes.
     */
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz findFirstOrThrow
   */
  export type QuizFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quizzes.
     */
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz findMany
   */
  export type QuizFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quizzes to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz create
   */
  export type QuizCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The data needed to create a Quiz.
     */
    data: XOR<QuizCreateInput, QuizUncheckedCreateInput>
  }

  /**
   * Quiz createMany
   */
  export type QuizCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quizzes.
     */
    data: QuizCreateManyInput | QuizCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quiz createManyAndReturn
   */
  export type QuizCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Quizzes.
     */
    data: QuizCreateManyInput | QuizCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quiz update
   */
  export type QuizUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The data needed to update a Quiz.
     */
    data: XOR<QuizUpdateInput, QuizUncheckedUpdateInput>
    /**
     * Choose, which Quiz to update.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz updateMany
   */
  export type QuizUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quizzes.
     */
    data: XOR<QuizUpdateManyMutationInput, QuizUncheckedUpdateManyInput>
    /**
     * Filter which Quizzes to update
     */
    where?: QuizWhereInput
  }

  /**
   * Quiz upsert
   */
  export type QuizUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The filter to search for the Quiz to update in case it exists.
     */
    where: QuizWhereUniqueInput
    /**
     * In case the Quiz found by the `where` argument doesn't exist, create a new Quiz with this data.
     */
    create: XOR<QuizCreateInput, QuizUncheckedCreateInput>
    /**
     * In case the Quiz was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizUpdateInput, QuizUncheckedUpdateInput>
  }

  /**
   * Quiz delete
   */
  export type QuizDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter which Quiz to delete.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz deleteMany
   */
  export type QuizDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quizzes to delete
     */
    where?: QuizWhereInput
  }

  /**
   * Quiz.attempts
   */
  export type Quiz$attemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    where?: QuizAttemptWhereInput
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    cursor?: QuizAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * Quiz without action
   */
  export type QuizDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
  }


  /**
   * Model QuizAttempt
   */

  export type AggregateQuizAttempt = {
    _count: QuizAttemptCountAggregateOutputType | null
    _avg: QuizAttemptAvgAggregateOutputType | null
    _sum: QuizAttemptSumAggregateOutputType | null
    _min: QuizAttemptMinAggregateOutputType | null
    _max: QuizAttemptMaxAggregateOutputType | null
  }

  export type QuizAttemptAvgAggregateOutputType = {
    score: number | null
    totalQuestions: number | null
    timeTaken: number | null
    xpEarned: number | null
  }

  export type QuizAttemptSumAggregateOutputType = {
    score: number | null
    totalQuestions: number | null
    timeTaken: number | null
    xpEarned: number | null
  }

  export type QuizAttemptMinAggregateOutputType = {
    id: string | null
    childId: string | null
    quizId: string | null
    score: number | null
    totalQuestions: number | null
    answers: string | null
    timeTaken: number | null
    difficulty: string | null
    xpEarned: number | null
    completedAt: Date | null
  }

  export type QuizAttemptMaxAggregateOutputType = {
    id: string | null
    childId: string | null
    quizId: string | null
    score: number | null
    totalQuestions: number | null
    answers: string | null
    timeTaken: number | null
    difficulty: string | null
    xpEarned: number | null
    completedAt: Date | null
  }

  export type QuizAttemptCountAggregateOutputType = {
    id: number
    childId: number
    quizId: number
    score: number
    totalQuestions: number
    answers: number
    timeTaken: number
    difficulty: number
    xpEarned: number
    completedAt: number
    _all: number
  }


  export type QuizAttemptAvgAggregateInputType = {
    score?: true
    totalQuestions?: true
    timeTaken?: true
    xpEarned?: true
  }

  export type QuizAttemptSumAggregateInputType = {
    score?: true
    totalQuestions?: true
    timeTaken?: true
    xpEarned?: true
  }

  export type QuizAttemptMinAggregateInputType = {
    id?: true
    childId?: true
    quizId?: true
    score?: true
    totalQuestions?: true
    answers?: true
    timeTaken?: true
    difficulty?: true
    xpEarned?: true
    completedAt?: true
  }

  export type QuizAttemptMaxAggregateInputType = {
    id?: true
    childId?: true
    quizId?: true
    score?: true
    totalQuestions?: true
    answers?: true
    timeTaken?: true
    difficulty?: true
    xpEarned?: true
    completedAt?: true
  }

  export type QuizAttemptCountAggregateInputType = {
    id?: true
    childId?: true
    quizId?: true
    score?: true
    totalQuestions?: true
    answers?: true
    timeTaken?: true
    difficulty?: true
    xpEarned?: true
    completedAt?: true
    _all?: true
  }

  export type QuizAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizAttempt to aggregate.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuizAttempts
    **/
    _count?: true | QuizAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizAttemptMaxAggregateInputType
  }

  export type GetQuizAttemptAggregateType<T extends QuizAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizAttempt[P]>
      : GetScalarType<T[P], AggregateQuizAttempt[P]>
  }




  export type QuizAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizAttemptWhereInput
    orderBy?: QuizAttemptOrderByWithAggregationInput | QuizAttemptOrderByWithAggregationInput[]
    by: QuizAttemptScalarFieldEnum[] | QuizAttemptScalarFieldEnum
    having?: QuizAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizAttemptCountAggregateInputType | true
    _avg?: QuizAttemptAvgAggregateInputType
    _sum?: QuizAttemptSumAggregateInputType
    _min?: QuizAttemptMinAggregateInputType
    _max?: QuizAttemptMaxAggregateInputType
  }

  export type QuizAttemptGroupByOutputType = {
    id: string
    childId: string
    quizId: string
    score: number
    totalQuestions: number
    answers: string
    timeTaken: number | null
    difficulty: string
    xpEarned: number
    completedAt: Date
    _count: QuizAttemptCountAggregateOutputType | null
    _avg: QuizAttemptAvgAggregateOutputType | null
    _sum: QuizAttemptSumAggregateOutputType | null
    _min: QuizAttemptMinAggregateOutputType | null
    _max: QuizAttemptMaxAggregateOutputType | null
  }

  type GetQuizAttemptGroupByPayload<T extends QuizAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], QuizAttemptGroupByOutputType[P]>
        }
      >
    >


  export type QuizAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    quizId?: boolean
    score?: boolean
    totalQuestions?: boolean
    answers?: boolean
    timeTaken?: boolean
    difficulty?: boolean
    xpEarned?: boolean
    completedAt?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAttempt"]>

  export type QuizAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    quizId?: boolean
    score?: boolean
    totalQuestions?: boolean
    answers?: boolean
    timeTaken?: boolean
    difficulty?: boolean
    xpEarned?: boolean
    completedAt?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAttempt"]>

  export type QuizAttemptSelectScalar = {
    id?: boolean
    childId?: boolean
    quizId?: boolean
    score?: boolean
    totalQuestions?: boolean
    answers?: boolean
    timeTaken?: boolean
    difficulty?: boolean
    xpEarned?: boolean
    completedAt?: boolean
  }

  export type QuizAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }
  export type QuizAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }

  export type $QuizAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizAttempt"
    objects: {
      child: Prisma.$ChildPayload<ExtArgs>
      quiz: Prisma.$QuizPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      childId: string
      quizId: string
      score: number
      totalQuestions: number
      answers: string
      timeTaken: number | null
      difficulty: string
      xpEarned: number
      completedAt: Date
    }, ExtArgs["result"]["quizAttempt"]>
    composites: {}
  }

  type QuizAttemptGetPayload<S extends boolean | null | undefined | QuizAttemptDefaultArgs> = $Result.GetResult<Prisma.$QuizAttemptPayload, S>

  type QuizAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuizAttemptFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuizAttemptCountAggregateInputType | true
    }

  export interface QuizAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuizAttempt'], meta: { name: 'QuizAttempt' } }
    /**
     * Find zero or one QuizAttempt that matches the filter.
     * @param {QuizAttemptFindUniqueArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizAttemptFindUniqueArgs>(args: SelectSubset<T, QuizAttemptFindUniqueArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one QuizAttempt that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuizAttemptFindUniqueOrThrowArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first QuizAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptFindFirstArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizAttemptFindFirstArgs>(args?: SelectSubset<T, QuizAttemptFindFirstArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first QuizAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptFindFirstOrThrowArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more QuizAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuizAttempts
     * const quizAttempts = await prisma.quizAttempt.findMany()
     * 
     * // Get first 10 QuizAttempts
     * const quizAttempts = await prisma.quizAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizAttemptWithIdOnly = await prisma.quizAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizAttemptFindManyArgs>(args?: SelectSubset<T, QuizAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a QuizAttempt.
     * @param {QuizAttemptCreateArgs} args - Arguments to create a QuizAttempt.
     * @example
     * // Create one QuizAttempt
     * const QuizAttempt = await prisma.quizAttempt.create({
     *   data: {
     *     // ... data to create a QuizAttempt
     *   }
     * })
     * 
     */
    create<T extends QuizAttemptCreateArgs>(args: SelectSubset<T, QuizAttemptCreateArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many QuizAttempts.
     * @param {QuizAttemptCreateManyArgs} args - Arguments to create many QuizAttempts.
     * @example
     * // Create many QuizAttempts
     * const quizAttempt = await prisma.quizAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizAttemptCreateManyArgs>(args?: SelectSubset<T, QuizAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuizAttempts and returns the data saved in the database.
     * @param {QuizAttemptCreateManyAndReturnArgs} args - Arguments to create many QuizAttempts.
     * @example
     * // Create many QuizAttempts
     * const quizAttempt = await prisma.quizAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuizAttempts and only return the `id`
     * const quizAttemptWithIdOnly = await prisma.quizAttempt.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a QuizAttempt.
     * @param {QuizAttemptDeleteArgs} args - Arguments to delete one QuizAttempt.
     * @example
     * // Delete one QuizAttempt
     * const QuizAttempt = await prisma.quizAttempt.delete({
     *   where: {
     *     // ... filter to delete one QuizAttempt
     *   }
     * })
     * 
     */
    delete<T extends QuizAttemptDeleteArgs>(args: SelectSubset<T, QuizAttemptDeleteArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one QuizAttempt.
     * @param {QuizAttemptUpdateArgs} args - Arguments to update one QuizAttempt.
     * @example
     * // Update one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizAttemptUpdateArgs>(args: SelectSubset<T, QuizAttemptUpdateArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more QuizAttempts.
     * @param {QuizAttemptDeleteManyArgs} args - Arguments to filter QuizAttempts to delete.
     * @example
     * // Delete a few QuizAttempts
     * const { count } = await prisma.quizAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizAttemptDeleteManyArgs>(args?: SelectSubset<T, QuizAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuizAttempts
     * const quizAttempt = await prisma.quizAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizAttemptUpdateManyArgs>(args: SelectSubset<T, QuizAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QuizAttempt.
     * @param {QuizAttemptUpsertArgs} args - Arguments to update or create a QuizAttempt.
     * @example
     * // Update or create a QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.upsert({
     *   create: {
     *     // ... data to create a QuizAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuizAttempt we want to update
     *   }
     * })
     */
    upsert<T extends QuizAttemptUpsertArgs>(args: SelectSubset<T, QuizAttemptUpsertArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of QuizAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptCountArgs} args - Arguments to filter QuizAttempts to count.
     * @example
     * // Count the number of QuizAttempts
     * const count = await prisma.quizAttempt.count({
     *   where: {
     *     // ... the filter for the QuizAttempts we want to count
     *   }
     * })
    **/
    count<T extends QuizAttemptCountArgs>(
      args?: Subset<T, QuizAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuizAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizAttemptAggregateArgs>(args: Subset<T, QuizAttemptAggregateArgs>): Prisma.PrismaPromise<GetQuizAttemptAggregateType<T>>

    /**
     * Group by QuizAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuizAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizAttemptGroupByArgs['orderBy'] }
        : { orderBy?: QuizAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuizAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuizAttempt model
   */
  readonly fields: QuizAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuizAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    quiz<T extends QuizDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuizDefaultArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuizAttempt model
   */ 
  interface QuizAttemptFieldRefs {
    readonly id: FieldRef<"QuizAttempt", 'String'>
    readonly childId: FieldRef<"QuizAttempt", 'String'>
    readonly quizId: FieldRef<"QuizAttempt", 'String'>
    readonly score: FieldRef<"QuizAttempt", 'Int'>
    readonly totalQuestions: FieldRef<"QuizAttempt", 'Int'>
    readonly answers: FieldRef<"QuizAttempt", 'String'>
    readonly timeTaken: FieldRef<"QuizAttempt", 'Int'>
    readonly difficulty: FieldRef<"QuizAttempt", 'String'>
    readonly xpEarned: FieldRef<"QuizAttempt", 'Int'>
    readonly completedAt: FieldRef<"QuizAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuizAttempt findUnique
   */
  export type QuizAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt findUniqueOrThrow
   */
  export type QuizAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt findFirst
   */
  export type QuizAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizAttempts.
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizAttempts.
     */
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * QuizAttempt findFirstOrThrow
   */
  export type QuizAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizAttempts.
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizAttempts.
     */
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * QuizAttempt findMany
   */
  export type QuizAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempts to fetch.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuizAttempts.
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * QuizAttempt create
   */
  export type QuizAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a QuizAttempt.
     */
    data: XOR<QuizAttemptCreateInput, QuizAttemptUncheckedCreateInput>
  }

  /**
   * QuizAttempt createMany
   */
  export type QuizAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuizAttempts.
     */
    data: QuizAttemptCreateManyInput | QuizAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizAttempt createManyAndReturn
   */
  export type QuizAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many QuizAttempts.
     */
    data: QuizAttemptCreateManyInput | QuizAttemptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizAttempt update
   */
  export type QuizAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a QuizAttempt.
     */
    data: XOR<QuizAttemptUpdateInput, QuizAttemptUncheckedUpdateInput>
    /**
     * Choose, which QuizAttempt to update.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt updateMany
   */
  export type QuizAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuizAttempts.
     */
    data: XOR<QuizAttemptUpdateManyMutationInput, QuizAttemptUncheckedUpdateManyInput>
    /**
     * Filter which QuizAttempts to update
     */
    where?: QuizAttemptWhereInput
  }

  /**
   * QuizAttempt upsert
   */
  export type QuizAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the QuizAttempt to update in case it exists.
     */
    where: QuizAttemptWhereUniqueInput
    /**
     * In case the QuizAttempt found by the `where` argument doesn't exist, create a new QuizAttempt with this data.
     */
    create: XOR<QuizAttemptCreateInput, QuizAttemptUncheckedCreateInput>
    /**
     * In case the QuizAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizAttemptUpdateInput, QuizAttemptUncheckedUpdateInput>
  }

  /**
   * QuizAttempt delete
   */
  export type QuizAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter which QuizAttempt to delete.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt deleteMany
   */
  export type QuizAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizAttempts to delete
     */
    where?: QuizAttemptWhereInput
  }

  /**
   * QuizAttempt without action
   */
  export type QuizAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
  }


  /**
   * Model FriendRequest
   */

  export type AggregateFriendRequest = {
    _count: FriendRequestCountAggregateOutputType | null
    _min: FriendRequestMinAggregateOutputType | null
    _max: FriendRequestMaxAggregateOutputType | null
  }

  export type FriendRequestMinAggregateOutputType = {
    id: string | null
    fromChildId: string | null
    toChildId: string | null
    status: string | null
    parentApproved: boolean | null
    createdAt: Date | null
  }

  export type FriendRequestMaxAggregateOutputType = {
    id: string | null
    fromChildId: string | null
    toChildId: string | null
    status: string | null
    parentApproved: boolean | null
    createdAt: Date | null
  }

  export type FriendRequestCountAggregateOutputType = {
    id: number
    fromChildId: number
    toChildId: number
    status: number
    parentApproved: number
    createdAt: number
    _all: number
  }


  export type FriendRequestMinAggregateInputType = {
    id?: true
    fromChildId?: true
    toChildId?: true
    status?: true
    parentApproved?: true
    createdAt?: true
  }

  export type FriendRequestMaxAggregateInputType = {
    id?: true
    fromChildId?: true
    toChildId?: true
    status?: true
    parentApproved?: true
    createdAt?: true
  }

  export type FriendRequestCountAggregateInputType = {
    id?: true
    fromChildId?: true
    toChildId?: true
    status?: true
    parentApproved?: true
    createdAt?: true
    _all?: true
  }

  export type FriendRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendRequest to aggregate.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FriendRequests
    **/
    _count?: true | FriendRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendRequestMaxAggregateInputType
  }

  export type GetFriendRequestAggregateType<T extends FriendRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateFriendRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendRequest[P]>
      : GetScalarType<T[P], AggregateFriendRequest[P]>
  }




  export type FriendRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithAggregationInput | FriendRequestOrderByWithAggregationInput[]
    by: FriendRequestScalarFieldEnum[] | FriendRequestScalarFieldEnum
    having?: FriendRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendRequestCountAggregateInputType | true
    _min?: FriendRequestMinAggregateInputType
    _max?: FriendRequestMaxAggregateInputType
  }

  export type FriendRequestGroupByOutputType = {
    id: string
    fromChildId: string
    toChildId: string
    status: string
    parentApproved: boolean
    createdAt: Date
    _count: FriendRequestCountAggregateOutputType | null
    _min: FriendRequestMinAggregateOutputType | null
    _max: FriendRequestMaxAggregateOutputType | null
  }

  type GetFriendRequestGroupByPayload<T extends FriendRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendRequestGroupByOutputType[P]>
            : GetScalarType<T[P], FriendRequestGroupByOutputType[P]>
        }
      >
    >


  export type FriendRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromChildId?: boolean
    toChildId?: boolean
    status?: boolean
    parentApproved?: boolean
    createdAt?: boolean
    fromChild?: boolean | ChildDefaultArgs<ExtArgs>
    toChild?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendRequest"]>

  export type FriendRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromChildId?: boolean
    toChildId?: boolean
    status?: boolean
    parentApproved?: boolean
    createdAt?: boolean
    fromChild?: boolean | ChildDefaultArgs<ExtArgs>
    toChild?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendRequest"]>

  export type FriendRequestSelectScalar = {
    id?: boolean
    fromChildId?: boolean
    toChildId?: boolean
    status?: boolean
    parentApproved?: boolean
    createdAt?: boolean
  }

  export type FriendRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromChild?: boolean | ChildDefaultArgs<ExtArgs>
    toChild?: boolean | ChildDefaultArgs<ExtArgs>
  }
  export type FriendRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromChild?: boolean | ChildDefaultArgs<ExtArgs>
    toChild?: boolean | ChildDefaultArgs<ExtArgs>
  }

  export type $FriendRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FriendRequest"
    objects: {
      fromChild: Prisma.$ChildPayload<ExtArgs>
      toChild: Prisma.$ChildPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fromChildId: string
      toChildId: string
      status: string
      parentApproved: boolean
      createdAt: Date
    }, ExtArgs["result"]["friendRequest"]>
    composites: {}
  }

  type FriendRequestGetPayload<S extends boolean | null | undefined | FriendRequestDefaultArgs> = $Result.GetResult<Prisma.$FriendRequestPayload, S>

  type FriendRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FriendRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FriendRequestCountAggregateInputType | true
    }

  export interface FriendRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FriendRequest'], meta: { name: 'FriendRequest' } }
    /**
     * Find zero or one FriendRequest that matches the filter.
     * @param {FriendRequestFindUniqueArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendRequestFindUniqueArgs>(args: SelectSubset<T, FriendRequestFindUniqueArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FriendRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FriendRequestFindUniqueOrThrowArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FriendRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindFirstArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendRequestFindFirstArgs>(args?: SelectSubset<T, FriendRequestFindFirstArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FriendRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindFirstOrThrowArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FriendRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FriendRequests
     * const friendRequests = await prisma.friendRequest.findMany()
     * 
     * // Get first 10 FriendRequests
     * const friendRequests = await prisma.friendRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendRequestWithIdOnly = await prisma.friendRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendRequestFindManyArgs>(args?: SelectSubset<T, FriendRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FriendRequest.
     * @param {FriendRequestCreateArgs} args - Arguments to create a FriendRequest.
     * @example
     * // Create one FriendRequest
     * const FriendRequest = await prisma.friendRequest.create({
     *   data: {
     *     // ... data to create a FriendRequest
     *   }
     * })
     * 
     */
    create<T extends FriendRequestCreateArgs>(args: SelectSubset<T, FriendRequestCreateArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FriendRequests.
     * @param {FriendRequestCreateManyArgs} args - Arguments to create many FriendRequests.
     * @example
     * // Create many FriendRequests
     * const friendRequest = await prisma.friendRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendRequestCreateManyArgs>(args?: SelectSubset<T, FriendRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FriendRequests and returns the data saved in the database.
     * @param {FriendRequestCreateManyAndReturnArgs} args - Arguments to create many FriendRequests.
     * @example
     * // Create many FriendRequests
     * const friendRequest = await prisma.friendRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FriendRequests and only return the `id`
     * const friendRequestWithIdOnly = await prisma.friendRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FriendRequest.
     * @param {FriendRequestDeleteArgs} args - Arguments to delete one FriendRequest.
     * @example
     * // Delete one FriendRequest
     * const FriendRequest = await prisma.friendRequest.delete({
     *   where: {
     *     // ... filter to delete one FriendRequest
     *   }
     * })
     * 
     */
    delete<T extends FriendRequestDeleteArgs>(args: SelectSubset<T, FriendRequestDeleteArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FriendRequest.
     * @param {FriendRequestUpdateArgs} args - Arguments to update one FriendRequest.
     * @example
     * // Update one FriendRequest
     * const friendRequest = await prisma.friendRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendRequestUpdateArgs>(args: SelectSubset<T, FriendRequestUpdateArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FriendRequests.
     * @param {FriendRequestDeleteManyArgs} args - Arguments to filter FriendRequests to delete.
     * @example
     * // Delete a few FriendRequests
     * const { count } = await prisma.friendRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendRequestDeleteManyArgs>(args?: SelectSubset<T, FriendRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FriendRequests
     * const friendRequest = await prisma.friendRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendRequestUpdateManyArgs>(args: SelectSubset<T, FriendRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FriendRequest.
     * @param {FriendRequestUpsertArgs} args - Arguments to update or create a FriendRequest.
     * @example
     * // Update or create a FriendRequest
     * const friendRequest = await prisma.friendRequest.upsert({
     *   create: {
     *     // ... data to create a FriendRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FriendRequest we want to update
     *   }
     * })
     */
    upsert<T extends FriendRequestUpsertArgs>(args: SelectSubset<T, FriendRequestUpsertArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FriendRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestCountArgs} args - Arguments to filter FriendRequests to count.
     * @example
     * // Count the number of FriendRequests
     * const count = await prisma.friendRequest.count({
     *   where: {
     *     // ... the filter for the FriendRequests we want to count
     *   }
     * })
    **/
    count<T extends FriendRequestCountArgs>(
      args?: Subset<T, FriendRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FriendRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendRequestAggregateArgs>(args: Subset<T, FriendRequestAggregateArgs>): Prisma.PrismaPromise<GetFriendRequestAggregateType<T>>

    /**
     * Group by FriendRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FriendRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendRequestGroupByArgs['orderBy'] }
        : { orderBy?: FriendRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FriendRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FriendRequest model
   */
  readonly fields: FriendRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FriendRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fromChild<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    toChild<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FriendRequest model
   */ 
  interface FriendRequestFieldRefs {
    readonly id: FieldRef<"FriendRequest", 'String'>
    readonly fromChildId: FieldRef<"FriendRequest", 'String'>
    readonly toChildId: FieldRef<"FriendRequest", 'String'>
    readonly status: FieldRef<"FriendRequest", 'String'>
    readonly parentApproved: FieldRef<"FriendRequest", 'Boolean'>
    readonly createdAt: FieldRef<"FriendRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FriendRequest findUnique
   */
  export type FriendRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest findUniqueOrThrow
   */
  export type FriendRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest findFirst
   */
  export type FriendRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendRequests.
     */
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest findFirstOrThrow
   */
  export type FriendRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendRequests.
     */
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest findMany
   */
  export type FriendRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequests to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest create
   */
  export type FriendRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a FriendRequest.
     */
    data: XOR<FriendRequestCreateInput, FriendRequestUncheckedCreateInput>
  }

  /**
   * FriendRequest createMany
   */
  export type FriendRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FriendRequests.
     */
    data: FriendRequestCreateManyInput | FriendRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FriendRequest createManyAndReturn
   */
  export type FriendRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FriendRequests.
     */
    data: FriendRequestCreateManyInput | FriendRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FriendRequest update
   */
  export type FriendRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a FriendRequest.
     */
    data: XOR<FriendRequestUpdateInput, FriendRequestUncheckedUpdateInput>
    /**
     * Choose, which FriendRequest to update.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest updateMany
   */
  export type FriendRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FriendRequests.
     */
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyInput>
    /**
     * Filter which FriendRequests to update
     */
    where?: FriendRequestWhereInput
  }

  /**
   * FriendRequest upsert
   */
  export type FriendRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the FriendRequest to update in case it exists.
     */
    where: FriendRequestWhereUniqueInput
    /**
     * In case the FriendRequest found by the `where` argument doesn't exist, create a new FriendRequest with this data.
     */
    create: XOR<FriendRequestCreateInput, FriendRequestUncheckedCreateInput>
    /**
     * In case the FriendRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendRequestUpdateInput, FriendRequestUncheckedUpdateInput>
  }

  /**
   * FriendRequest delete
   */
  export type FriendRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter which FriendRequest to delete.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest deleteMany
   */
  export type FriendRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendRequests to delete
     */
    where?: FriendRequestWhereInput
  }

  /**
   * FriendRequest without action
   */
  export type FriendRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
  }


  /**
   * Model ParentAlert
   */

  export type AggregateParentAlert = {
    _count: ParentAlertCountAggregateOutputType | null
    _min: ParentAlertMinAggregateOutputType | null
    _max: ParentAlertMaxAggregateOutputType | null
  }

  export type ParentAlertMinAggregateOutputType = {
    id: string | null
    childId: string | null
    type: string | null
    title: string | null
    message: string | null
    severity: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type ParentAlertMaxAggregateOutputType = {
    id: string | null
    childId: string | null
    type: string | null
    title: string | null
    message: string | null
    severity: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type ParentAlertCountAggregateOutputType = {
    id: number
    childId: number
    type: number
    title: number
    message: number
    severity: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type ParentAlertMinAggregateInputType = {
    id?: true
    childId?: true
    type?: true
    title?: true
    message?: true
    severity?: true
    isRead?: true
    createdAt?: true
  }

  export type ParentAlertMaxAggregateInputType = {
    id?: true
    childId?: true
    type?: true
    title?: true
    message?: true
    severity?: true
    isRead?: true
    createdAt?: true
  }

  export type ParentAlertCountAggregateInputType = {
    id?: true
    childId?: true
    type?: true
    title?: true
    message?: true
    severity?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type ParentAlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentAlert to aggregate.
     */
    where?: ParentAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentAlerts to fetch.
     */
    orderBy?: ParentAlertOrderByWithRelationInput | ParentAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParentAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParentAlerts
    **/
    _count?: true | ParentAlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParentAlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParentAlertMaxAggregateInputType
  }

  export type GetParentAlertAggregateType<T extends ParentAlertAggregateArgs> = {
        [P in keyof T & keyof AggregateParentAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParentAlert[P]>
      : GetScalarType<T[P], AggregateParentAlert[P]>
  }




  export type ParentAlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentAlertWhereInput
    orderBy?: ParentAlertOrderByWithAggregationInput | ParentAlertOrderByWithAggregationInput[]
    by: ParentAlertScalarFieldEnum[] | ParentAlertScalarFieldEnum
    having?: ParentAlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParentAlertCountAggregateInputType | true
    _min?: ParentAlertMinAggregateInputType
    _max?: ParentAlertMaxAggregateInputType
  }

  export type ParentAlertGroupByOutputType = {
    id: string
    childId: string
    type: string
    title: string
    message: string
    severity: string
    isRead: boolean
    createdAt: Date
    _count: ParentAlertCountAggregateOutputType | null
    _min: ParentAlertMinAggregateOutputType | null
    _max: ParentAlertMaxAggregateOutputType | null
  }

  type GetParentAlertGroupByPayload<T extends ParentAlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParentAlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParentAlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParentAlertGroupByOutputType[P]>
            : GetScalarType<T[P], ParentAlertGroupByOutputType[P]>
        }
      >
    >


  export type ParentAlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    severity?: boolean
    isRead?: boolean
    createdAt?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentAlert"]>

  export type ParentAlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    severity?: boolean
    isRead?: boolean
    createdAt?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentAlert"]>

  export type ParentAlertSelectScalar = {
    id?: boolean
    childId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    severity?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type ParentAlertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }
  export type ParentAlertIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }

  export type $ParentAlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParentAlert"
    objects: {
      child: Prisma.$ChildPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      childId: string
      type: string
      title: string
      message: string
      severity: string
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["parentAlert"]>
    composites: {}
  }

  type ParentAlertGetPayload<S extends boolean | null | undefined | ParentAlertDefaultArgs> = $Result.GetResult<Prisma.$ParentAlertPayload, S>

  type ParentAlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ParentAlertFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ParentAlertCountAggregateInputType | true
    }

  export interface ParentAlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParentAlert'], meta: { name: 'ParentAlert' } }
    /**
     * Find zero or one ParentAlert that matches the filter.
     * @param {ParentAlertFindUniqueArgs} args - Arguments to find a ParentAlert
     * @example
     * // Get one ParentAlert
     * const parentAlert = await prisma.parentAlert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParentAlertFindUniqueArgs>(args: SelectSubset<T, ParentAlertFindUniqueArgs<ExtArgs>>): Prisma__ParentAlertClient<$Result.GetResult<Prisma.$ParentAlertPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ParentAlert that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ParentAlertFindUniqueOrThrowArgs} args - Arguments to find a ParentAlert
     * @example
     * // Get one ParentAlert
     * const parentAlert = await prisma.parentAlert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParentAlertFindUniqueOrThrowArgs>(args: SelectSubset<T, ParentAlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParentAlertClient<$Result.GetResult<Prisma.$ParentAlertPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ParentAlert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAlertFindFirstArgs} args - Arguments to find a ParentAlert
     * @example
     * // Get one ParentAlert
     * const parentAlert = await prisma.parentAlert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParentAlertFindFirstArgs>(args?: SelectSubset<T, ParentAlertFindFirstArgs<ExtArgs>>): Prisma__ParentAlertClient<$Result.GetResult<Prisma.$ParentAlertPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ParentAlert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAlertFindFirstOrThrowArgs} args - Arguments to find a ParentAlert
     * @example
     * // Get one ParentAlert
     * const parentAlert = await prisma.parentAlert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParentAlertFindFirstOrThrowArgs>(args?: SelectSubset<T, ParentAlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParentAlertClient<$Result.GetResult<Prisma.$ParentAlertPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ParentAlerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParentAlerts
     * const parentAlerts = await prisma.parentAlert.findMany()
     * 
     * // Get first 10 ParentAlerts
     * const parentAlerts = await prisma.parentAlert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parentAlertWithIdOnly = await prisma.parentAlert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParentAlertFindManyArgs>(args?: SelectSubset<T, ParentAlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentAlertPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ParentAlert.
     * @param {ParentAlertCreateArgs} args - Arguments to create a ParentAlert.
     * @example
     * // Create one ParentAlert
     * const ParentAlert = await prisma.parentAlert.create({
     *   data: {
     *     // ... data to create a ParentAlert
     *   }
     * })
     * 
     */
    create<T extends ParentAlertCreateArgs>(args: SelectSubset<T, ParentAlertCreateArgs<ExtArgs>>): Prisma__ParentAlertClient<$Result.GetResult<Prisma.$ParentAlertPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ParentAlerts.
     * @param {ParentAlertCreateManyArgs} args - Arguments to create many ParentAlerts.
     * @example
     * // Create many ParentAlerts
     * const parentAlert = await prisma.parentAlert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParentAlertCreateManyArgs>(args?: SelectSubset<T, ParentAlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ParentAlerts and returns the data saved in the database.
     * @param {ParentAlertCreateManyAndReturnArgs} args - Arguments to create many ParentAlerts.
     * @example
     * // Create many ParentAlerts
     * const parentAlert = await prisma.parentAlert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ParentAlerts and only return the `id`
     * const parentAlertWithIdOnly = await prisma.parentAlert.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParentAlertCreateManyAndReturnArgs>(args?: SelectSubset<T, ParentAlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentAlertPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ParentAlert.
     * @param {ParentAlertDeleteArgs} args - Arguments to delete one ParentAlert.
     * @example
     * // Delete one ParentAlert
     * const ParentAlert = await prisma.parentAlert.delete({
     *   where: {
     *     // ... filter to delete one ParentAlert
     *   }
     * })
     * 
     */
    delete<T extends ParentAlertDeleteArgs>(args: SelectSubset<T, ParentAlertDeleteArgs<ExtArgs>>): Prisma__ParentAlertClient<$Result.GetResult<Prisma.$ParentAlertPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ParentAlert.
     * @param {ParentAlertUpdateArgs} args - Arguments to update one ParentAlert.
     * @example
     * // Update one ParentAlert
     * const parentAlert = await prisma.parentAlert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParentAlertUpdateArgs>(args: SelectSubset<T, ParentAlertUpdateArgs<ExtArgs>>): Prisma__ParentAlertClient<$Result.GetResult<Prisma.$ParentAlertPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ParentAlerts.
     * @param {ParentAlertDeleteManyArgs} args - Arguments to filter ParentAlerts to delete.
     * @example
     * // Delete a few ParentAlerts
     * const { count } = await prisma.parentAlert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParentAlertDeleteManyArgs>(args?: SelectSubset<T, ParentAlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParentAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParentAlerts
     * const parentAlert = await prisma.parentAlert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParentAlertUpdateManyArgs>(args: SelectSubset<T, ParentAlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ParentAlert.
     * @param {ParentAlertUpsertArgs} args - Arguments to update or create a ParentAlert.
     * @example
     * // Update or create a ParentAlert
     * const parentAlert = await prisma.parentAlert.upsert({
     *   create: {
     *     // ... data to create a ParentAlert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParentAlert we want to update
     *   }
     * })
     */
    upsert<T extends ParentAlertUpsertArgs>(args: SelectSubset<T, ParentAlertUpsertArgs<ExtArgs>>): Prisma__ParentAlertClient<$Result.GetResult<Prisma.$ParentAlertPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ParentAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAlertCountArgs} args - Arguments to filter ParentAlerts to count.
     * @example
     * // Count the number of ParentAlerts
     * const count = await prisma.parentAlert.count({
     *   where: {
     *     // ... the filter for the ParentAlerts we want to count
     *   }
     * })
    **/
    count<T extends ParentAlertCountArgs>(
      args?: Subset<T, ParentAlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParentAlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParentAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParentAlertAggregateArgs>(args: Subset<T, ParentAlertAggregateArgs>): Prisma.PrismaPromise<GetParentAlertAggregateType<T>>

    /**
     * Group by ParentAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParentAlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParentAlertGroupByArgs['orderBy'] }
        : { orderBy?: ParentAlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParentAlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParentAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParentAlert model
   */
  readonly fields: ParentAlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParentAlert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParentAlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ParentAlert model
   */ 
  interface ParentAlertFieldRefs {
    readonly id: FieldRef<"ParentAlert", 'String'>
    readonly childId: FieldRef<"ParentAlert", 'String'>
    readonly type: FieldRef<"ParentAlert", 'String'>
    readonly title: FieldRef<"ParentAlert", 'String'>
    readonly message: FieldRef<"ParentAlert", 'String'>
    readonly severity: FieldRef<"ParentAlert", 'String'>
    readonly isRead: FieldRef<"ParentAlert", 'Boolean'>
    readonly createdAt: FieldRef<"ParentAlert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ParentAlert findUnique
   */
  export type ParentAlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertInclude<ExtArgs> | null
    /**
     * Filter, which ParentAlert to fetch.
     */
    where: ParentAlertWhereUniqueInput
  }

  /**
   * ParentAlert findUniqueOrThrow
   */
  export type ParentAlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertInclude<ExtArgs> | null
    /**
     * Filter, which ParentAlert to fetch.
     */
    where: ParentAlertWhereUniqueInput
  }

  /**
   * ParentAlert findFirst
   */
  export type ParentAlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertInclude<ExtArgs> | null
    /**
     * Filter, which ParentAlert to fetch.
     */
    where?: ParentAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentAlerts to fetch.
     */
    orderBy?: ParentAlertOrderByWithRelationInput | ParentAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentAlerts.
     */
    cursor?: ParentAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentAlerts.
     */
    distinct?: ParentAlertScalarFieldEnum | ParentAlertScalarFieldEnum[]
  }

  /**
   * ParentAlert findFirstOrThrow
   */
  export type ParentAlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertInclude<ExtArgs> | null
    /**
     * Filter, which ParentAlert to fetch.
     */
    where?: ParentAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentAlerts to fetch.
     */
    orderBy?: ParentAlertOrderByWithRelationInput | ParentAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentAlerts.
     */
    cursor?: ParentAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentAlerts.
     */
    distinct?: ParentAlertScalarFieldEnum | ParentAlertScalarFieldEnum[]
  }

  /**
   * ParentAlert findMany
   */
  export type ParentAlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertInclude<ExtArgs> | null
    /**
     * Filter, which ParentAlerts to fetch.
     */
    where?: ParentAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentAlerts to fetch.
     */
    orderBy?: ParentAlertOrderByWithRelationInput | ParentAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParentAlerts.
     */
    cursor?: ParentAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentAlerts.
     */
    skip?: number
    distinct?: ParentAlertScalarFieldEnum | ParentAlertScalarFieldEnum[]
  }

  /**
   * ParentAlert create
   */
  export type ParentAlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertInclude<ExtArgs> | null
    /**
     * The data needed to create a ParentAlert.
     */
    data: XOR<ParentAlertCreateInput, ParentAlertUncheckedCreateInput>
  }

  /**
   * ParentAlert createMany
   */
  export type ParentAlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParentAlerts.
     */
    data: ParentAlertCreateManyInput | ParentAlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParentAlert createManyAndReturn
   */
  export type ParentAlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ParentAlerts.
     */
    data: ParentAlertCreateManyInput | ParentAlertCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ParentAlert update
   */
  export type ParentAlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertInclude<ExtArgs> | null
    /**
     * The data needed to update a ParentAlert.
     */
    data: XOR<ParentAlertUpdateInput, ParentAlertUncheckedUpdateInput>
    /**
     * Choose, which ParentAlert to update.
     */
    where: ParentAlertWhereUniqueInput
  }

  /**
   * ParentAlert updateMany
   */
  export type ParentAlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParentAlerts.
     */
    data: XOR<ParentAlertUpdateManyMutationInput, ParentAlertUncheckedUpdateManyInput>
    /**
     * Filter which ParentAlerts to update
     */
    where?: ParentAlertWhereInput
  }

  /**
   * ParentAlert upsert
   */
  export type ParentAlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertInclude<ExtArgs> | null
    /**
     * The filter to search for the ParentAlert to update in case it exists.
     */
    where: ParentAlertWhereUniqueInput
    /**
     * In case the ParentAlert found by the `where` argument doesn't exist, create a new ParentAlert with this data.
     */
    create: XOR<ParentAlertCreateInput, ParentAlertUncheckedCreateInput>
    /**
     * In case the ParentAlert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParentAlertUpdateInput, ParentAlertUncheckedUpdateInput>
  }

  /**
   * ParentAlert delete
   */
  export type ParentAlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertInclude<ExtArgs> | null
    /**
     * Filter which ParentAlert to delete.
     */
    where: ParentAlertWhereUniqueInput
  }

  /**
   * ParentAlert deleteMany
   */
  export type ParentAlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentAlerts to delete
     */
    where?: ParentAlertWhereInput
  }

  /**
   * ParentAlert without action
   */
  export type ParentAlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAlert
     */
    select?: ParentAlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentAlertInclude<ExtArgs> | null
  }


  /**
   * Model Classroom
   */

  export type AggregateClassroom = {
    _count: ClassroomCountAggregateOutputType | null
    _min: ClassroomMinAggregateOutputType | null
    _max: ClassroomMaxAggregateOutputType | null
  }

  export type ClassroomMinAggregateOutputType = {
    id: string | null
    name: string | null
    subject: string | null
    joinCode: string | null
    grade: string | null
    teacherId: string | null
    studentIds: string | null
    createdAt: Date | null
  }

  export type ClassroomMaxAggregateOutputType = {
    id: string | null
    name: string | null
    subject: string | null
    joinCode: string | null
    grade: string | null
    teacherId: string | null
    studentIds: string | null
    createdAt: Date | null
  }

  export type ClassroomCountAggregateOutputType = {
    id: number
    name: number
    subject: number
    joinCode: number
    grade: number
    teacherId: number
    studentIds: number
    createdAt: number
    _all: number
  }


  export type ClassroomMinAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    joinCode?: true
    grade?: true
    teacherId?: true
    studentIds?: true
    createdAt?: true
  }

  export type ClassroomMaxAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    joinCode?: true
    grade?: true
    teacherId?: true
    studentIds?: true
    createdAt?: true
  }

  export type ClassroomCountAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    joinCode?: true
    grade?: true
    teacherId?: true
    studentIds?: true
    createdAt?: true
    _all?: true
  }

  export type ClassroomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classroom to aggregate.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classrooms
    **/
    _count?: true | ClassroomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassroomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassroomMaxAggregateInputType
  }

  export type GetClassroomAggregateType<T extends ClassroomAggregateArgs> = {
        [P in keyof T & keyof AggregateClassroom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClassroom[P]>
      : GetScalarType<T[P], AggregateClassroom[P]>
  }




  export type ClassroomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassroomWhereInput
    orderBy?: ClassroomOrderByWithAggregationInput | ClassroomOrderByWithAggregationInput[]
    by: ClassroomScalarFieldEnum[] | ClassroomScalarFieldEnum
    having?: ClassroomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassroomCountAggregateInputType | true
    _min?: ClassroomMinAggregateInputType
    _max?: ClassroomMaxAggregateInputType
  }

  export type ClassroomGroupByOutputType = {
    id: string
    name: string
    subject: string | null
    joinCode: string
    grade: string | null
    teacherId: string
    studentIds: string
    createdAt: Date
    _count: ClassroomCountAggregateOutputType | null
    _min: ClassroomMinAggregateOutputType | null
    _max: ClassroomMaxAggregateOutputType | null
  }

  type GetClassroomGroupByPayload<T extends ClassroomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassroomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassroomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassroomGroupByOutputType[P]>
            : GetScalarType<T[P], ClassroomGroupByOutputType[P]>
        }
      >
    >


  export type ClassroomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subject?: boolean
    joinCode?: boolean
    grade?: boolean
    teacherId?: boolean
    studentIds?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    lessons?: boolean | Classroom$lessonsArgs<ExtArgs>
    _count?: boolean | ClassroomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classroom"]>

  export type ClassroomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subject?: boolean
    joinCode?: boolean
    grade?: boolean
    teacherId?: boolean
    studentIds?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classroom"]>

  export type ClassroomSelectScalar = {
    id?: boolean
    name?: boolean
    subject?: boolean
    joinCode?: boolean
    grade?: boolean
    teacherId?: boolean
    studentIds?: boolean
    createdAt?: boolean
  }

  export type ClassroomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    lessons?: boolean | Classroom$lessonsArgs<ExtArgs>
    _count?: boolean | ClassroomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClassroomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClassroomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Classroom"
    objects: {
      teacher: Prisma.$UserPayload<ExtArgs>
      lessons: Prisma.$LessonPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      subject: string | null
      joinCode: string
      grade: string | null
      teacherId: string
      studentIds: string
      createdAt: Date
    }, ExtArgs["result"]["classroom"]>
    composites: {}
  }

  type ClassroomGetPayload<S extends boolean | null | undefined | ClassroomDefaultArgs> = $Result.GetResult<Prisma.$ClassroomPayload, S>

  type ClassroomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClassroomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClassroomCountAggregateInputType | true
    }

  export interface ClassroomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Classroom'], meta: { name: 'Classroom' } }
    /**
     * Find zero or one Classroom that matches the filter.
     * @param {ClassroomFindUniqueArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassroomFindUniqueArgs>(args: SelectSubset<T, ClassroomFindUniqueArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Classroom that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClassroomFindUniqueOrThrowArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassroomFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassroomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Classroom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindFirstArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassroomFindFirstArgs>(args?: SelectSubset<T, ClassroomFindFirstArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Classroom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindFirstOrThrowArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassroomFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassroomFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Classrooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classrooms
     * const classrooms = await prisma.classroom.findMany()
     * 
     * // Get first 10 Classrooms
     * const classrooms = await prisma.classroom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classroomWithIdOnly = await prisma.classroom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassroomFindManyArgs>(args?: SelectSubset<T, ClassroomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Classroom.
     * @param {ClassroomCreateArgs} args - Arguments to create a Classroom.
     * @example
     * // Create one Classroom
     * const Classroom = await prisma.classroom.create({
     *   data: {
     *     // ... data to create a Classroom
     *   }
     * })
     * 
     */
    create<T extends ClassroomCreateArgs>(args: SelectSubset<T, ClassroomCreateArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Classrooms.
     * @param {ClassroomCreateManyArgs} args - Arguments to create many Classrooms.
     * @example
     * // Create many Classrooms
     * const classroom = await prisma.classroom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassroomCreateManyArgs>(args?: SelectSubset<T, ClassroomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classrooms and returns the data saved in the database.
     * @param {ClassroomCreateManyAndReturnArgs} args - Arguments to create many Classrooms.
     * @example
     * // Create many Classrooms
     * const classroom = await prisma.classroom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classrooms and only return the `id`
     * const classroomWithIdOnly = await prisma.classroom.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassroomCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassroomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Classroom.
     * @param {ClassroomDeleteArgs} args - Arguments to delete one Classroom.
     * @example
     * // Delete one Classroom
     * const Classroom = await prisma.classroom.delete({
     *   where: {
     *     // ... filter to delete one Classroom
     *   }
     * })
     * 
     */
    delete<T extends ClassroomDeleteArgs>(args: SelectSubset<T, ClassroomDeleteArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Classroom.
     * @param {ClassroomUpdateArgs} args - Arguments to update one Classroom.
     * @example
     * // Update one Classroom
     * const classroom = await prisma.classroom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassroomUpdateArgs>(args: SelectSubset<T, ClassroomUpdateArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Classrooms.
     * @param {ClassroomDeleteManyArgs} args - Arguments to filter Classrooms to delete.
     * @example
     * // Delete a few Classrooms
     * const { count } = await prisma.classroom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassroomDeleteManyArgs>(args?: SelectSubset<T, ClassroomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classrooms
     * const classroom = await prisma.classroom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassroomUpdateManyArgs>(args: SelectSubset<T, ClassroomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Classroom.
     * @param {ClassroomUpsertArgs} args - Arguments to update or create a Classroom.
     * @example
     * // Update or create a Classroom
     * const classroom = await prisma.classroom.upsert({
     *   create: {
     *     // ... data to create a Classroom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Classroom we want to update
     *   }
     * })
     */
    upsert<T extends ClassroomUpsertArgs>(args: SelectSubset<T, ClassroomUpsertArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Classrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomCountArgs} args - Arguments to filter Classrooms to count.
     * @example
     * // Count the number of Classrooms
     * const count = await prisma.classroom.count({
     *   where: {
     *     // ... the filter for the Classrooms we want to count
     *   }
     * })
    **/
    count<T extends ClassroomCountArgs>(
      args?: Subset<T, ClassroomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassroomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Classroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassroomAggregateArgs>(args: Subset<T, ClassroomAggregateArgs>): Prisma.PrismaPromise<GetClassroomAggregateType<T>>

    /**
     * Group by Classroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassroomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassroomGroupByArgs['orderBy'] }
        : { orderBy?: ClassroomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassroomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassroomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Classroom model
   */
  readonly fields: ClassroomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Classroom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassroomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    lessons<T extends Classroom$lessonsArgs<ExtArgs> = {}>(args?: Subset<T, Classroom$lessonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Classroom model
   */ 
  interface ClassroomFieldRefs {
    readonly id: FieldRef<"Classroom", 'String'>
    readonly name: FieldRef<"Classroom", 'String'>
    readonly subject: FieldRef<"Classroom", 'String'>
    readonly joinCode: FieldRef<"Classroom", 'String'>
    readonly grade: FieldRef<"Classroom", 'String'>
    readonly teacherId: FieldRef<"Classroom", 'String'>
    readonly studentIds: FieldRef<"Classroom", 'String'>
    readonly createdAt: FieldRef<"Classroom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Classroom findUnique
   */
  export type ClassroomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom findUniqueOrThrow
   */
  export type ClassroomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom findFirst
   */
  export type ClassroomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classrooms.
     */
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom findFirstOrThrow
   */
  export type ClassroomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classrooms.
     */
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom findMany
   */
  export type ClassroomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classrooms to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom create
   */
  export type ClassroomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The data needed to create a Classroom.
     */
    data: XOR<ClassroomCreateInput, ClassroomUncheckedCreateInput>
  }

  /**
   * Classroom createMany
   */
  export type ClassroomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classrooms.
     */
    data: ClassroomCreateManyInput | ClassroomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Classroom createManyAndReturn
   */
  export type ClassroomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Classrooms.
     */
    data: ClassroomCreateManyInput | ClassroomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Classroom update
   */
  export type ClassroomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The data needed to update a Classroom.
     */
    data: XOR<ClassroomUpdateInput, ClassroomUncheckedUpdateInput>
    /**
     * Choose, which Classroom to update.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom updateMany
   */
  export type ClassroomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classrooms.
     */
    data: XOR<ClassroomUpdateManyMutationInput, ClassroomUncheckedUpdateManyInput>
    /**
     * Filter which Classrooms to update
     */
    where?: ClassroomWhereInput
  }

  /**
   * Classroom upsert
   */
  export type ClassroomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The filter to search for the Classroom to update in case it exists.
     */
    where: ClassroomWhereUniqueInput
    /**
     * In case the Classroom found by the `where` argument doesn't exist, create a new Classroom with this data.
     */
    create: XOR<ClassroomCreateInput, ClassroomUncheckedCreateInput>
    /**
     * In case the Classroom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassroomUpdateInput, ClassroomUncheckedUpdateInput>
  }

  /**
   * Classroom delete
   */
  export type ClassroomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter which Classroom to delete.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom deleteMany
   */
  export type ClassroomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classrooms to delete
     */
    where?: ClassroomWhereInput
  }

  /**
   * Classroom.lessons
   */
  export type Classroom$lessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    where?: LessonWhereInput
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    cursor?: LessonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Classroom without action
   */
  export type ClassroomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
  }


  /**
   * Model Lesson
   */

  export type AggregateLesson = {
    _count: LessonCountAggregateOutputType | null
    _avg: LessonAvgAggregateOutputType | null
    _sum: LessonSumAggregateOutputType | null
    _min: LessonMinAggregateOutputType | null
    _max: LessonMaxAggregateOutputType | null
  }

  export type LessonAvgAggregateOutputType = {
    order: number | null
  }

  export type LessonSumAggregateOutputType = {
    order: number | null
  }

  export type LessonMinAggregateOutputType = {
    id: string | null
    classroomId: string | null
    title: string | null
    description: string | null
    contentUrl: string | null
    quizId: string | null
    order: number | null
    createdAt: Date | null
  }

  export type LessonMaxAggregateOutputType = {
    id: string | null
    classroomId: string | null
    title: string | null
    description: string | null
    contentUrl: string | null
    quizId: string | null
    order: number | null
    createdAt: Date | null
  }

  export type LessonCountAggregateOutputType = {
    id: number
    classroomId: number
    title: number
    description: number
    contentUrl: number
    quizId: number
    order: number
    createdAt: number
    _all: number
  }


  export type LessonAvgAggregateInputType = {
    order?: true
  }

  export type LessonSumAggregateInputType = {
    order?: true
  }

  export type LessonMinAggregateInputType = {
    id?: true
    classroomId?: true
    title?: true
    description?: true
    contentUrl?: true
    quizId?: true
    order?: true
    createdAt?: true
  }

  export type LessonMaxAggregateInputType = {
    id?: true
    classroomId?: true
    title?: true
    description?: true
    contentUrl?: true
    quizId?: true
    order?: true
    createdAt?: true
  }

  export type LessonCountAggregateInputType = {
    id?: true
    classroomId?: true
    title?: true
    description?: true
    contentUrl?: true
    quizId?: true
    order?: true
    createdAt?: true
    _all?: true
  }

  export type LessonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lesson to aggregate.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lessons
    **/
    _count?: true | LessonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LessonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LessonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonMaxAggregateInputType
  }

  export type GetLessonAggregateType<T extends LessonAggregateArgs> = {
        [P in keyof T & keyof AggregateLesson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLesson[P]>
      : GetScalarType<T[P], AggregateLesson[P]>
  }




  export type LessonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonWhereInput
    orderBy?: LessonOrderByWithAggregationInput | LessonOrderByWithAggregationInput[]
    by: LessonScalarFieldEnum[] | LessonScalarFieldEnum
    having?: LessonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonCountAggregateInputType | true
    _avg?: LessonAvgAggregateInputType
    _sum?: LessonSumAggregateInputType
    _min?: LessonMinAggregateInputType
    _max?: LessonMaxAggregateInputType
  }

  export type LessonGroupByOutputType = {
    id: string
    classroomId: string
    title: string
    description: string | null
    contentUrl: string | null
    quizId: string | null
    order: number
    createdAt: Date
    _count: LessonCountAggregateOutputType | null
    _avg: LessonAvgAggregateOutputType | null
    _sum: LessonSumAggregateOutputType | null
    _min: LessonMinAggregateOutputType | null
    _max: LessonMaxAggregateOutputType | null
  }

  type GetLessonGroupByPayload<T extends LessonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonGroupByOutputType[P]>
            : GetScalarType<T[P], LessonGroupByOutputType[P]>
        }
      >
    >


  export type LessonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classroomId?: boolean
    title?: boolean
    description?: boolean
    contentUrl?: boolean
    quizId?: boolean
    order?: boolean
    createdAt?: boolean
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lesson"]>

  export type LessonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classroomId?: boolean
    title?: boolean
    description?: boolean
    contentUrl?: boolean
    quizId?: boolean
    order?: boolean
    createdAt?: boolean
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lesson"]>

  export type LessonSelectScalar = {
    id?: boolean
    classroomId?: boolean
    title?: boolean
    description?: boolean
    contentUrl?: boolean
    quizId?: boolean
    order?: boolean
    createdAt?: boolean
  }

  export type LessonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }
  export type LessonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }

  export type $LessonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lesson"
    objects: {
      classroom: Prisma.$ClassroomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      classroomId: string
      title: string
      description: string | null
      contentUrl: string | null
      quizId: string | null
      order: number
      createdAt: Date
    }, ExtArgs["result"]["lesson"]>
    composites: {}
  }

  type LessonGetPayload<S extends boolean | null | undefined | LessonDefaultArgs> = $Result.GetResult<Prisma.$LessonPayload, S>

  type LessonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LessonFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LessonCountAggregateInputType | true
    }

  export interface LessonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lesson'], meta: { name: 'Lesson' } }
    /**
     * Find zero or one Lesson that matches the filter.
     * @param {LessonFindUniqueArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonFindUniqueArgs>(args: SelectSubset<T, LessonFindUniqueArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Lesson that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LessonFindUniqueOrThrowArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Lesson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindFirstArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonFindFirstArgs>(args?: SelectSubset<T, LessonFindFirstArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Lesson that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindFirstOrThrowArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Lessons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lessons
     * const lessons = await prisma.lesson.findMany()
     * 
     * // Get first 10 Lessons
     * const lessons = await prisma.lesson.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonWithIdOnly = await prisma.lesson.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonFindManyArgs>(args?: SelectSubset<T, LessonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Lesson.
     * @param {LessonCreateArgs} args - Arguments to create a Lesson.
     * @example
     * // Create one Lesson
     * const Lesson = await prisma.lesson.create({
     *   data: {
     *     // ... data to create a Lesson
     *   }
     * })
     * 
     */
    create<T extends LessonCreateArgs>(args: SelectSubset<T, LessonCreateArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Lessons.
     * @param {LessonCreateManyArgs} args - Arguments to create many Lessons.
     * @example
     * // Create many Lessons
     * const lesson = await prisma.lesson.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonCreateManyArgs>(args?: SelectSubset<T, LessonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lessons and returns the data saved in the database.
     * @param {LessonCreateManyAndReturnArgs} args - Arguments to create many Lessons.
     * @example
     * // Create many Lessons
     * const lesson = await prisma.lesson.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lessons and only return the `id`
     * const lessonWithIdOnly = await prisma.lesson.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LessonCreateManyAndReturnArgs>(args?: SelectSubset<T, LessonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Lesson.
     * @param {LessonDeleteArgs} args - Arguments to delete one Lesson.
     * @example
     * // Delete one Lesson
     * const Lesson = await prisma.lesson.delete({
     *   where: {
     *     // ... filter to delete one Lesson
     *   }
     * })
     * 
     */
    delete<T extends LessonDeleteArgs>(args: SelectSubset<T, LessonDeleteArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Lesson.
     * @param {LessonUpdateArgs} args - Arguments to update one Lesson.
     * @example
     * // Update one Lesson
     * const lesson = await prisma.lesson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonUpdateArgs>(args: SelectSubset<T, LessonUpdateArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Lessons.
     * @param {LessonDeleteManyArgs} args - Arguments to filter Lessons to delete.
     * @example
     * // Delete a few Lessons
     * const { count } = await prisma.lesson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonDeleteManyArgs>(args?: SelectSubset<T, LessonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lessons
     * const lesson = await prisma.lesson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonUpdateManyArgs>(args: SelectSubset<T, LessonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lesson.
     * @param {LessonUpsertArgs} args - Arguments to update or create a Lesson.
     * @example
     * // Update or create a Lesson
     * const lesson = await prisma.lesson.upsert({
     *   create: {
     *     // ... data to create a Lesson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lesson we want to update
     *   }
     * })
     */
    upsert<T extends LessonUpsertArgs>(args: SelectSubset<T, LessonUpsertArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonCountArgs} args - Arguments to filter Lessons to count.
     * @example
     * // Count the number of Lessons
     * const count = await prisma.lesson.count({
     *   where: {
     *     // ... the filter for the Lessons we want to count
     *   }
     * })
    **/
    count<T extends LessonCountArgs>(
      args?: Subset<T, LessonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LessonAggregateArgs>(args: Subset<T, LessonAggregateArgs>): Prisma.PrismaPromise<GetLessonAggregateType<T>>

    /**
     * Group by Lesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LessonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonGroupByArgs['orderBy'] }
        : { orderBy?: LessonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LessonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lesson model
   */
  readonly fields: LessonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lesson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classroom<T extends ClassroomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassroomDefaultArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lesson model
   */ 
  interface LessonFieldRefs {
    readonly id: FieldRef<"Lesson", 'String'>
    readonly classroomId: FieldRef<"Lesson", 'String'>
    readonly title: FieldRef<"Lesson", 'String'>
    readonly description: FieldRef<"Lesson", 'String'>
    readonly contentUrl: FieldRef<"Lesson", 'String'>
    readonly quizId: FieldRef<"Lesson", 'String'>
    readonly order: FieldRef<"Lesson", 'Int'>
    readonly createdAt: FieldRef<"Lesson", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lesson findUnique
   */
  export type LessonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson findUniqueOrThrow
   */
  export type LessonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson findFirst
   */
  export type LessonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson findFirstOrThrow
   */
  export type LessonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson findMany
   */
  export type LessonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lessons to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson create
   */
  export type LessonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * The data needed to create a Lesson.
     */
    data: XOR<LessonCreateInput, LessonUncheckedCreateInput>
  }

  /**
   * Lesson createMany
   */
  export type LessonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lessons.
     */
    data: LessonCreateManyInput | LessonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lesson createManyAndReturn
   */
  export type LessonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Lessons.
     */
    data: LessonCreateManyInput | LessonCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lesson update
   */
  export type LessonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * The data needed to update a Lesson.
     */
    data: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>
    /**
     * Choose, which Lesson to update.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson updateMany
   */
  export type LessonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lessons.
     */
    data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyInput>
    /**
     * Filter which Lessons to update
     */
    where?: LessonWhereInput
  }

  /**
   * Lesson upsert
   */
  export type LessonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * The filter to search for the Lesson to update in case it exists.
     */
    where: LessonWhereUniqueInput
    /**
     * In case the Lesson found by the `where` argument doesn't exist, create a new Lesson with this data.
     */
    create: XOR<LessonCreateInput, LessonUncheckedCreateInput>
    /**
     * In case the Lesson was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>
  }

  /**
   * Lesson delete
   */
  export type LessonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter which Lesson to delete.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson deleteMany
   */
  export type LessonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lessons to delete
     */
    where?: LessonWhereInput
  }

  /**
   * Lesson without action
   */
  export type LessonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
  }


  /**
   * Model ActivityFeed
   */

  export type AggregateActivityFeed = {
    _count: ActivityFeedCountAggregateOutputType | null
    _avg: ActivityFeedAvgAggregateOutputType | null
    _sum: ActivityFeedSumAggregateOutputType | null
    _min: ActivityFeedMinAggregateOutputType | null
    _max: ActivityFeedMaxAggregateOutputType | null
  }

  export type ActivityFeedAvgAggregateOutputType = {
    xpEarned: number | null
  }

  export type ActivityFeedSumAggregateOutputType = {
    xpEarned: number | null
  }

  export type ActivityFeedMinAggregateOutputType = {
    id: string | null
    childId: string | null
    type: string | null
    title: string | null
    description: string | null
    xpEarned: number | null
    metadata: string | null
    createdAt: Date | null
  }

  export type ActivityFeedMaxAggregateOutputType = {
    id: string | null
    childId: string | null
    type: string | null
    title: string | null
    description: string | null
    xpEarned: number | null
    metadata: string | null
    createdAt: Date | null
  }

  export type ActivityFeedCountAggregateOutputType = {
    id: number
    childId: number
    type: number
    title: number
    description: number
    xpEarned: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type ActivityFeedAvgAggregateInputType = {
    xpEarned?: true
  }

  export type ActivityFeedSumAggregateInputType = {
    xpEarned?: true
  }

  export type ActivityFeedMinAggregateInputType = {
    id?: true
    childId?: true
    type?: true
    title?: true
    description?: true
    xpEarned?: true
    metadata?: true
    createdAt?: true
  }

  export type ActivityFeedMaxAggregateInputType = {
    id?: true
    childId?: true
    type?: true
    title?: true
    description?: true
    xpEarned?: true
    metadata?: true
    createdAt?: true
  }

  export type ActivityFeedCountAggregateInputType = {
    id?: true
    childId?: true
    type?: true
    title?: true
    description?: true
    xpEarned?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityFeedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityFeed to aggregate.
     */
    where?: ActivityFeedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityFeeds to fetch.
     */
    orderBy?: ActivityFeedOrderByWithRelationInput | ActivityFeedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityFeedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityFeeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityFeeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityFeeds
    **/
    _count?: true | ActivityFeedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityFeedAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivityFeedSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityFeedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityFeedMaxAggregateInputType
  }

  export type GetActivityFeedAggregateType<T extends ActivityFeedAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityFeed]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityFeed[P]>
      : GetScalarType<T[P], AggregateActivityFeed[P]>
  }




  export type ActivityFeedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityFeedWhereInput
    orderBy?: ActivityFeedOrderByWithAggregationInput | ActivityFeedOrderByWithAggregationInput[]
    by: ActivityFeedScalarFieldEnum[] | ActivityFeedScalarFieldEnum
    having?: ActivityFeedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityFeedCountAggregateInputType | true
    _avg?: ActivityFeedAvgAggregateInputType
    _sum?: ActivityFeedSumAggregateInputType
    _min?: ActivityFeedMinAggregateInputType
    _max?: ActivityFeedMaxAggregateInputType
  }

  export type ActivityFeedGroupByOutputType = {
    id: string
    childId: string
    type: string
    title: string
    description: string | null
    xpEarned: number
    metadata: string | null
    createdAt: Date
    _count: ActivityFeedCountAggregateOutputType | null
    _avg: ActivityFeedAvgAggregateOutputType | null
    _sum: ActivityFeedSumAggregateOutputType | null
    _min: ActivityFeedMinAggregateOutputType | null
    _max: ActivityFeedMaxAggregateOutputType | null
  }

  type GetActivityFeedGroupByPayload<T extends ActivityFeedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityFeedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityFeedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityFeedGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityFeedGroupByOutputType[P]>
        }
      >
    >


  export type ActivityFeedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    xpEarned?: boolean
    metadata?: boolean
    createdAt?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityFeed"]>

  export type ActivityFeedSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    xpEarned?: boolean
    metadata?: boolean
    createdAt?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityFeed"]>

  export type ActivityFeedSelectScalar = {
    id?: boolean
    childId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    xpEarned?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type ActivityFeedInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }
  export type ActivityFeedIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }

  export type $ActivityFeedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityFeed"
    objects: {
      child: Prisma.$ChildPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      childId: string
      type: string
      title: string
      description: string | null
      xpEarned: number
      metadata: string | null
      createdAt: Date
    }, ExtArgs["result"]["activityFeed"]>
    composites: {}
  }

  type ActivityFeedGetPayload<S extends boolean | null | undefined | ActivityFeedDefaultArgs> = $Result.GetResult<Prisma.$ActivityFeedPayload, S>

  type ActivityFeedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActivityFeedFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActivityFeedCountAggregateInputType | true
    }

  export interface ActivityFeedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityFeed'], meta: { name: 'ActivityFeed' } }
    /**
     * Find zero or one ActivityFeed that matches the filter.
     * @param {ActivityFeedFindUniqueArgs} args - Arguments to find a ActivityFeed
     * @example
     * // Get one ActivityFeed
     * const activityFeed = await prisma.activityFeed.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFeedFindUniqueArgs>(args: SelectSubset<T, ActivityFeedFindUniqueArgs<ExtArgs>>): Prisma__ActivityFeedClient<$Result.GetResult<Prisma.$ActivityFeedPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ActivityFeed that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActivityFeedFindUniqueOrThrowArgs} args - Arguments to find a ActivityFeed
     * @example
     * // Get one ActivityFeed
     * const activityFeed = await prisma.activityFeed.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFeedFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFeedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityFeedClient<$Result.GetResult<Prisma.$ActivityFeedPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ActivityFeed that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFeedFindFirstArgs} args - Arguments to find a ActivityFeed
     * @example
     * // Get one ActivityFeed
     * const activityFeed = await prisma.activityFeed.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFeedFindFirstArgs>(args?: SelectSubset<T, ActivityFeedFindFirstArgs<ExtArgs>>): Prisma__ActivityFeedClient<$Result.GetResult<Prisma.$ActivityFeedPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ActivityFeed that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFeedFindFirstOrThrowArgs} args - Arguments to find a ActivityFeed
     * @example
     * // Get one ActivityFeed
     * const activityFeed = await prisma.activityFeed.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFeedFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFeedFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityFeedClient<$Result.GetResult<Prisma.$ActivityFeedPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ActivityFeeds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFeedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityFeeds
     * const activityFeeds = await prisma.activityFeed.findMany()
     * 
     * // Get first 10 ActivityFeeds
     * const activityFeeds = await prisma.activityFeed.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityFeedWithIdOnly = await prisma.activityFeed.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFeedFindManyArgs>(args?: SelectSubset<T, ActivityFeedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityFeedPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ActivityFeed.
     * @param {ActivityFeedCreateArgs} args - Arguments to create a ActivityFeed.
     * @example
     * // Create one ActivityFeed
     * const ActivityFeed = await prisma.activityFeed.create({
     *   data: {
     *     // ... data to create a ActivityFeed
     *   }
     * })
     * 
     */
    create<T extends ActivityFeedCreateArgs>(args: SelectSubset<T, ActivityFeedCreateArgs<ExtArgs>>): Prisma__ActivityFeedClient<$Result.GetResult<Prisma.$ActivityFeedPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ActivityFeeds.
     * @param {ActivityFeedCreateManyArgs} args - Arguments to create many ActivityFeeds.
     * @example
     * // Create many ActivityFeeds
     * const activityFeed = await prisma.activityFeed.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityFeedCreateManyArgs>(args?: SelectSubset<T, ActivityFeedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityFeeds and returns the data saved in the database.
     * @param {ActivityFeedCreateManyAndReturnArgs} args - Arguments to create many ActivityFeeds.
     * @example
     * // Create many ActivityFeeds
     * const activityFeed = await prisma.activityFeed.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityFeeds and only return the `id`
     * const activityFeedWithIdOnly = await prisma.activityFeed.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityFeedCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityFeedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityFeedPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ActivityFeed.
     * @param {ActivityFeedDeleteArgs} args - Arguments to delete one ActivityFeed.
     * @example
     * // Delete one ActivityFeed
     * const ActivityFeed = await prisma.activityFeed.delete({
     *   where: {
     *     // ... filter to delete one ActivityFeed
     *   }
     * })
     * 
     */
    delete<T extends ActivityFeedDeleteArgs>(args: SelectSubset<T, ActivityFeedDeleteArgs<ExtArgs>>): Prisma__ActivityFeedClient<$Result.GetResult<Prisma.$ActivityFeedPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ActivityFeed.
     * @param {ActivityFeedUpdateArgs} args - Arguments to update one ActivityFeed.
     * @example
     * // Update one ActivityFeed
     * const activityFeed = await prisma.activityFeed.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityFeedUpdateArgs>(args: SelectSubset<T, ActivityFeedUpdateArgs<ExtArgs>>): Prisma__ActivityFeedClient<$Result.GetResult<Prisma.$ActivityFeedPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ActivityFeeds.
     * @param {ActivityFeedDeleteManyArgs} args - Arguments to filter ActivityFeeds to delete.
     * @example
     * // Delete a few ActivityFeeds
     * const { count } = await prisma.activityFeed.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityFeedDeleteManyArgs>(args?: SelectSubset<T, ActivityFeedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityFeeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFeedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityFeeds
     * const activityFeed = await prisma.activityFeed.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityFeedUpdateManyArgs>(args: SelectSubset<T, ActivityFeedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActivityFeed.
     * @param {ActivityFeedUpsertArgs} args - Arguments to update or create a ActivityFeed.
     * @example
     * // Update or create a ActivityFeed
     * const activityFeed = await prisma.activityFeed.upsert({
     *   create: {
     *     // ... data to create a ActivityFeed
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityFeed we want to update
     *   }
     * })
     */
    upsert<T extends ActivityFeedUpsertArgs>(args: SelectSubset<T, ActivityFeedUpsertArgs<ExtArgs>>): Prisma__ActivityFeedClient<$Result.GetResult<Prisma.$ActivityFeedPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ActivityFeeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFeedCountArgs} args - Arguments to filter ActivityFeeds to count.
     * @example
     * // Count the number of ActivityFeeds
     * const count = await prisma.activityFeed.count({
     *   where: {
     *     // ... the filter for the ActivityFeeds we want to count
     *   }
     * })
    **/
    count<T extends ActivityFeedCountArgs>(
      args?: Subset<T, ActivityFeedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityFeedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityFeed.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFeedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityFeedAggregateArgs>(args: Subset<T, ActivityFeedAggregateArgs>): Prisma.PrismaPromise<GetActivityFeedAggregateType<T>>

    /**
     * Group by ActivityFeed.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFeedGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityFeedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityFeedGroupByArgs['orderBy'] }
        : { orderBy?: ActivityFeedGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityFeedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityFeedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityFeed model
   */
  readonly fields: ActivityFeedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityFeed.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityFeedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityFeed model
   */ 
  interface ActivityFeedFieldRefs {
    readonly id: FieldRef<"ActivityFeed", 'String'>
    readonly childId: FieldRef<"ActivityFeed", 'String'>
    readonly type: FieldRef<"ActivityFeed", 'String'>
    readonly title: FieldRef<"ActivityFeed", 'String'>
    readonly description: FieldRef<"ActivityFeed", 'String'>
    readonly xpEarned: FieldRef<"ActivityFeed", 'Int'>
    readonly metadata: FieldRef<"ActivityFeed", 'String'>
    readonly createdAt: FieldRef<"ActivityFeed", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityFeed findUnique
   */
  export type ActivityFeedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedInclude<ExtArgs> | null
    /**
     * Filter, which ActivityFeed to fetch.
     */
    where: ActivityFeedWhereUniqueInput
  }

  /**
   * ActivityFeed findUniqueOrThrow
   */
  export type ActivityFeedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedInclude<ExtArgs> | null
    /**
     * Filter, which ActivityFeed to fetch.
     */
    where: ActivityFeedWhereUniqueInput
  }

  /**
   * ActivityFeed findFirst
   */
  export type ActivityFeedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedInclude<ExtArgs> | null
    /**
     * Filter, which ActivityFeed to fetch.
     */
    where?: ActivityFeedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityFeeds to fetch.
     */
    orderBy?: ActivityFeedOrderByWithRelationInput | ActivityFeedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityFeeds.
     */
    cursor?: ActivityFeedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityFeeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityFeeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityFeeds.
     */
    distinct?: ActivityFeedScalarFieldEnum | ActivityFeedScalarFieldEnum[]
  }

  /**
   * ActivityFeed findFirstOrThrow
   */
  export type ActivityFeedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedInclude<ExtArgs> | null
    /**
     * Filter, which ActivityFeed to fetch.
     */
    where?: ActivityFeedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityFeeds to fetch.
     */
    orderBy?: ActivityFeedOrderByWithRelationInput | ActivityFeedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityFeeds.
     */
    cursor?: ActivityFeedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityFeeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityFeeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityFeeds.
     */
    distinct?: ActivityFeedScalarFieldEnum | ActivityFeedScalarFieldEnum[]
  }

  /**
   * ActivityFeed findMany
   */
  export type ActivityFeedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedInclude<ExtArgs> | null
    /**
     * Filter, which ActivityFeeds to fetch.
     */
    where?: ActivityFeedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityFeeds to fetch.
     */
    orderBy?: ActivityFeedOrderByWithRelationInput | ActivityFeedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityFeeds.
     */
    cursor?: ActivityFeedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityFeeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityFeeds.
     */
    skip?: number
    distinct?: ActivityFeedScalarFieldEnum | ActivityFeedScalarFieldEnum[]
  }

  /**
   * ActivityFeed create
   */
  export type ActivityFeedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityFeed.
     */
    data: XOR<ActivityFeedCreateInput, ActivityFeedUncheckedCreateInput>
  }

  /**
   * ActivityFeed createMany
   */
  export type ActivityFeedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityFeeds.
     */
    data: ActivityFeedCreateManyInput | ActivityFeedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityFeed createManyAndReturn
   */
  export type ActivityFeedCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ActivityFeeds.
     */
    data: ActivityFeedCreateManyInput | ActivityFeedCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityFeed update
   */
  export type ActivityFeedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityFeed.
     */
    data: XOR<ActivityFeedUpdateInput, ActivityFeedUncheckedUpdateInput>
    /**
     * Choose, which ActivityFeed to update.
     */
    where: ActivityFeedWhereUniqueInput
  }

  /**
   * ActivityFeed updateMany
   */
  export type ActivityFeedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityFeeds.
     */
    data: XOR<ActivityFeedUpdateManyMutationInput, ActivityFeedUncheckedUpdateManyInput>
    /**
     * Filter which ActivityFeeds to update
     */
    where?: ActivityFeedWhereInput
  }

  /**
   * ActivityFeed upsert
   */
  export type ActivityFeedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityFeed to update in case it exists.
     */
    where: ActivityFeedWhereUniqueInput
    /**
     * In case the ActivityFeed found by the `where` argument doesn't exist, create a new ActivityFeed with this data.
     */
    create: XOR<ActivityFeedCreateInput, ActivityFeedUncheckedCreateInput>
    /**
     * In case the ActivityFeed was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityFeedUpdateInput, ActivityFeedUncheckedUpdateInput>
  }

  /**
   * ActivityFeed delete
   */
  export type ActivityFeedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedInclude<ExtArgs> | null
    /**
     * Filter which ActivityFeed to delete.
     */
    where: ActivityFeedWhereUniqueInput
  }

  /**
   * ActivityFeed deleteMany
   */
  export type ActivityFeedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityFeeds to delete
     */
    where?: ActivityFeedWhereInput
  }

  /**
   * ActivityFeed without action
   */
  export type ActivityFeedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityFeed
     */
    select?: ActivityFeedSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityFeedInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    senderId: string | null
    receiverId: string | null
    content: string | null
    type: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    senderId: string | null
    receiverId: string | null
    content: string | null
    type: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    senderId: number
    receiverId: number
    content: number
    type: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    content?: true
    type?: true
    isRead?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    content?: true
    type?: true
    isRead?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    content?: true
    type?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    senderId: string
    receiverId: string
    content: string
    type: string
    isRead: boolean
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    content?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    content?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    content?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      sender: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      senderId: string
      receiverId: string
      content: string
      type: string
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */ 
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly senderId: FieldRef<"Message", 'String'>
    readonly receiverId: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly type: FieldRef<"Message", 'String'>
    readonly isRead: FieldRef<"Message", 'Boolean'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model PeerChallenge
   */

  export type AggregatePeerChallenge = {
    _count: PeerChallengeCountAggregateOutputType | null
    _avg: PeerChallengeAvgAggregateOutputType | null
    _sum: PeerChallengeSumAggregateOutputType | null
    _min: PeerChallengeMinAggregateOutputType | null
    _max: PeerChallengeMaxAggregateOutputType | null
  }

  export type PeerChallengeAvgAggregateOutputType = {
    challengerScore: number | null
    challengedScore: number | null
    xpReward: number | null
  }

  export type PeerChallengeSumAggregateOutputType = {
    challengerScore: number | null
    challengedScore: number | null
    xpReward: number | null
  }

  export type PeerChallengeMinAggregateOutputType = {
    id: string | null
    challengerId: string | null
    challengedId: string | null
    quizId: string | null
    subject: string | null
    status: string | null
    challengerScore: number | null
    challengedScore: number | null
    winnerId: string | null
    xpReward: number | null
    createdAt: Date | null
  }

  export type PeerChallengeMaxAggregateOutputType = {
    id: string | null
    challengerId: string | null
    challengedId: string | null
    quizId: string | null
    subject: string | null
    status: string | null
    challengerScore: number | null
    challengedScore: number | null
    winnerId: string | null
    xpReward: number | null
    createdAt: Date | null
  }

  export type PeerChallengeCountAggregateOutputType = {
    id: number
    challengerId: number
    challengedId: number
    quizId: number
    subject: number
    status: number
    challengerScore: number
    challengedScore: number
    winnerId: number
    xpReward: number
    createdAt: number
    _all: number
  }


  export type PeerChallengeAvgAggregateInputType = {
    challengerScore?: true
    challengedScore?: true
    xpReward?: true
  }

  export type PeerChallengeSumAggregateInputType = {
    challengerScore?: true
    challengedScore?: true
    xpReward?: true
  }

  export type PeerChallengeMinAggregateInputType = {
    id?: true
    challengerId?: true
    challengedId?: true
    quizId?: true
    subject?: true
    status?: true
    challengerScore?: true
    challengedScore?: true
    winnerId?: true
    xpReward?: true
    createdAt?: true
  }

  export type PeerChallengeMaxAggregateInputType = {
    id?: true
    challengerId?: true
    challengedId?: true
    quizId?: true
    subject?: true
    status?: true
    challengerScore?: true
    challengedScore?: true
    winnerId?: true
    xpReward?: true
    createdAt?: true
  }

  export type PeerChallengeCountAggregateInputType = {
    id?: true
    challengerId?: true
    challengedId?: true
    quizId?: true
    subject?: true
    status?: true
    challengerScore?: true
    challengedScore?: true
    winnerId?: true
    xpReward?: true
    createdAt?: true
    _all?: true
  }

  export type PeerChallengeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PeerChallenge to aggregate.
     */
    where?: PeerChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeerChallenges to fetch.
     */
    orderBy?: PeerChallengeOrderByWithRelationInput | PeerChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PeerChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeerChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeerChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PeerChallenges
    **/
    _count?: true | PeerChallengeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PeerChallengeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PeerChallengeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PeerChallengeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PeerChallengeMaxAggregateInputType
  }

  export type GetPeerChallengeAggregateType<T extends PeerChallengeAggregateArgs> = {
        [P in keyof T & keyof AggregatePeerChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePeerChallenge[P]>
      : GetScalarType<T[P], AggregatePeerChallenge[P]>
  }




  export type PeerChallengeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeerChallengeWhereInput
    orderBy?: PeerChallengeOrderByWithAggregationInput | PeerChallengeOrderByWithAggregationInput[]
    by: PeerChallengeScalarFieldEnum[] | PeerChallengeScalarFieldEnum
    having?: PeerChallengeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PeerChallengeCountAggregateInputType | true
    _avg?: PeerChallengeAvgAggregateInputType
    _sum?: PeerChallengeSumAggregateInputType
    _min?: PeerChallengeMinAggregateInputType
    _max?: PeerChallengeMaxAggregateInputType
  }

  export type PeerChallengeGroupByOutputType = {
    id: string
    challengerId: string
    challengedId: string
    quizId: string | null
    subject: string
    status: string
    challengerScore: number | null
    challengedScore: number | null
    winnerId: string | null
    xpReward: number
    createdAt: Date
    _count: PeerChallengeCountAggregateOutputType | null
    _avg: PeerChallengeAvgAggregateOutputType | null
    _sum: PeerChallengeSumAggregateOutputType | null
    _min: PeerChallengeMinAggregateOutputType | null
    _max: PeerChallengeMaxAggregateOutputType | null
  }

  type GetPeerChallengeGroupByPayload<T extends PeerChallengeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PeerChallengeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PeerChallengeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PeerChallengeGroupByOutputType[P]>
            : GetScalarType<T[P], PeerChallengeGroupByOutputType[P]>
        }
      >
    >


  export type PeerChallengeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    challengerId?: boolean
    challengedId?: boolean
    quizId?: boolean
    subject?: boolean
    status?: boolean
    challengerScore?: boolean
    challengedScore?: boolean
    winnerId?: boolean
    xpReward?: boolean
    createdAt?: boolean
    challenger?: boolean | ChildDefaultArgs<ExtArgs>
    challenged?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["peerChallenge"]>

  export type PeerChallengeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    challengerId?: boolean
    challengedId?: boolean
    quizId?: boolean
    subject?: boolean
    status?: boolean
    challengerScore?: boolean
    challengedScore?: boolean
    winnerId?: boolean
    xpReward?: boolean
    createdAt?: boolean
    challenger?: boolean | ChildDefaultArgs<ExtArgs>
    challenged?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["peerChallenge"]>

  export type PeerChallengeSelectScalar = {
    id?: boolean
    challengerId?: boolean
    challengedId?: boolean
    quizId?: boolean
    subject?: boolean
    status?: boolean
    challengerScore?: boolean
    challengedScore?: boolean
    winnerId?: boolean
    xpReward?: boolean
    createdAt?: boolean
  }

  export type PeerChallengeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenger?: boolean | ChildDefaultArgs<ExtArgs>
    challenged?: boolean | ChildDefaultArgs<ExtArgs>
  }
  export type PeerChallengeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenger?: boolean | ChildDefaultArgs<ExtArgs>
    challenged?: boolean | ChildDefaultArgs<ExtArgs>
  }

  export type $PeerChallengePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PeerChallenge"
    objects: {
      challenger: Prisma.$ChildPayload<ExtArgs>
      challenged: Prisma.$ChildPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      challengerId: string
      challengedId: string
      quizId: string | null
      subject: string
      status: string
      challengerScore: number | null
      challengedScore: number | null
      winnerId: string | null
      xpReward: number
      createdAt: Date
    }, ExtArgs["result"]["peerChallenge"]>
    composites: {}
  }

  type PeerChallengeGetPayload<S extends boolean | null | undefined | PeerChallengeDefaultArgs> = $Result.GetResult<Prisma.$PeerChallengePayload, S>

  type PeerChallengeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PeerChallengeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PeerChallengeCountAggregateInputType | true
    }

  export interface PeerChallengeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PeerChallenge'], meta: { name: 'PeerChallenge' } }
    /**
     * Find zero or one PeerChallenge that matches the filter.
     * @param {PeerChallengeFindUniqueArgs} args - Arguments to find a PeerChallenge
     * @example
     * // Get one PeerChallenge
     * const peerChallenge = await prisma.peerChallenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PeerChallengeFindUniqueArgs>(args: SelectSubset<T, PeerChallengeFindUniqueArgs<ExtArgs>>): Prisma__PeerChallengeClient<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PeerChallenge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PeerChallengeFindUniqueOrThrowArgs} args - Arguments to find a PeerChallenge
     * @example
     * // Get one PeerChallenge
     * const peerChallenge = await prisma.peerChallenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PeerChallengeFindUniqueOrThrowArgs>(args: SelectSubset<T, PeerChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PeerChallengeClient<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PeerChallenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeerChallengeFindFirstArgs} args - Arguments to find a PeerChallenge
     * @example
     * // Get one PeerChallenge
     * const peerChallenge = await prisma.peerChallenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PeerChallengeFindFirstArgs>(args?: SelectSubset<T, PeerChallengeFindFirstArgs<ExtArgs>>): Prisma__PeerChallengeClient<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PeerChallenge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeerChallengeFindFirstOrThrowArgs} args - Arguments to find a PeerChallenge
     * @example
     * // Get one PeerChallenge
     * const peerChallenge = await prisma.peerChallenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PeerChallengeFindFirstOrThrowArgs>(args?: SelectSubset<T, PeerChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma__PeerChallengeClient<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PeerChallenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeerChallengeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PeerChallenges
     * const peerChallenges = await prisma.peerChallenge.findMany()
     * 
     * // Get first 10 PeerChallenges
     * const peerChallenges = await prisma.peerChallenge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const peerChallengeWithIdOnly = await prisma.peerChallenge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PeerChallengeFindManyArgs>(args?: SelectSubset<T, PeerChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PeerChallenge.
     * @param {PeerChallengeCreateArgs} args - Arguments to create a PeerChallenge.
     * @example
     * // Create one PeerChallenge
     * const PeerChallenge = await prisma.peerChallenge.create({
     *   data: {
     *     // ... data to create a PeerChallenge
     *   }
     * })
     * 
     */
    create<T extends PeerChallengeCreateArgs>(args: SelectSubset<T, PeerChallengeCreateArgs<ExtArgs>>): Prisma__PeerChallengeClient<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PeerChallenges.
     * @param {PeerChallengeCreateManyArgs} args - Arguments to create many PeerChallenges.
     * @example
     * // Create many PeerChallenges
     * const peerChallenge = await prisma.peerChallenge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PeerChallengeCreateManyArgs>(args?: SelectSubset<T, PeerChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PeerChallenges and returns the data saved in the database.
     * @param {PeerChallengeCreateManyAndReturnArgs} args - Arguments to create many PeerChallenges.
     * @example
     * // Create many PeerChallenges
     * const peerChallenge = await prisma.peerChallenge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PeerChallenges and only return the `id`
     * const peerChallengeWithIdOnly = await prisma.peerChallenge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PeerChallengeCreateManyAndReturnArgs>(args?: SelectSubset<T, PeerChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PeerChallenge.
     * @param {PeerChallengeDeleteArgs} args - Arguments to delete one PeerChallenge.
     * @example
     * // Delete one PeerChallenge
     * const PeerChallenge = await prisma.peerChallenge.delete({
     *   where: {
     *     // ... filter to delete one PeerChallenge
     *   }
     * })
     * 
     */
    delete<T extends PeerChallengeDeleteArgs>(args: SelectSubset<T, PeerChallengeDeleteArgs<ExtArgs>>): Prisma__PeerChallengeClient<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PeerChallenge.
     * @param {PeerChallengeUpdateArgs} args - Arguments to update one PeerChallenge.
     * @example
     * // Update one PeerChallenge
     * const peerChallenge = await prisma.peerChallenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PeerChallengeUpdateArgs>(args: SelectSubset<T, PeerChallengeUpdateArgs<ExtArgs>>): Prisma__PeerChallengeClient<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PeerChallenges.
     * @param {PeerChallengeDeleteManyArgs} args - Arguments to filter PeerChallenges to delete.
     * @example
     * // Delete a few PeerChallenges
     * const { count } = await prisma.peerChallenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PeerChallengeDeleteManyArgs>(args?: SelectSubset<T, PeerChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PeerChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeerChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PeerChallenges
     * const peerChallenge = await prisma.peerChallenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PeerChallengeUpdateManyArgs>(args: SelectSubset<T, PeerChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PeerChallenge.
     * @param {PeerChallengeUpsertArgs} args - Arguments to update or create a PeerChallenge.
     * @example
     * // Update or create a PeerChallenge
     * const peerChallenge = await prisma.peerChallenge.upsert({
     *   create: {
     *     // ... data to create a PeerChallenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PeerChallenge we want to update
     *   }
     * })
     */
    upsert<T extends PeerChallengeUpsertArgs>(args: SelectSubset<T, PeerChallengeUpsertArgs<ExtArgs>>): Prisma__PeerChallengeClient<$Result.GetResult<Prisma.$PeerChallengePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PeerChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeerChallengeCountArgs} args - Arguments to filter PeerChallenges to count.
     * @example
     * // Count the number of PeerChallenges
     * const count = await prisma.peerChallenge.count({
     *   where: {
     *     // ... the filter for the PeerChallenges we want to count
     *   }
     * })
    **/
    count<T extends PeerChallengeCountArgs>(
      args?: Subset<T, PeerChallengeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PeerChallengeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PeerChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeerChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PeerChallengeAggregateArgs>(args: Subset<T, PeerChallengeAggregateArgs>): Prisma.PrismaPromise<GetPeerChallengeAggregateType<T>>

    /**
     * Group by PeerChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeerChallengeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PeerChallengeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PeerChallengeGroupByArgs['orderBy'] }
        : { orderBy?: PeerChallengeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PeerChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPeerChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PeerChallenge model
   */
  readonly fields: PeerChallengeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PeerChallenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PeerChallengeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    challenger<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    challenged<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PeerChallenge model
   */ 
  interface PeerChallengeFieldRefs {
    readonly id: FieldRef<"PeerChallenge", 'String'>
    readonly challengerId: FieldRef<"PeerChallenge", 'String'>
    readonly challengedId: FieldRef<"PeerChallenge", 'String'>
    readonly quizId: FieldRef<"PeerChallenge", 'String'>
    readonly subject: FieldRef<"PeerChallenge", 'String'>
    readonly status: FieldRef<"PeerChallenge", 'String'>
    readonly challengerScore: FieldRef<"PeerChallenge", 'Int'>
    readonly challengedScore: FieldRef<"PeerChallenge", 'Int'>
    readonly winnerId: FieldRef<"PeerChallenge", 'String'>
    readonly xpReward: FieldRef<"PeerChallenge", 'Int'>
    readonly createdAt: FieldRef<"PeerChallenge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PeerChallenge findUnique
   */
  export type PeerChallengeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
    /**
     * Filter, which PeerChallenge to fetch.
     */
    where: PeerChallengeWhereUniqueInput
  }

  /**
   * PeerChallenge findUniqueOrThrow
   */
  export type PeerChallengeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
    /**
     * Filter, which PeerChallenge to fetch.
     */
    where: PeerChallengeWhereUniqueInput
  }

  /**
   * PeerChallenge findFirst
   */
  export type PeerChallengeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
    /**
     * Filter, which PeerChallenge to fetch.
     */
    where?: PeerChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeerChallenges to fetch.
     */
    orderBy?: PeerChallengeOrderByWithRelationInput | PeerChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PeerChallenges.
     */
    cursor?: PeerChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeerChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeerChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PeerChallenges.
     */
    distinct?: PeerChallengeScalarFieldEnum | PeerChallengeScalarFieldEnum[]
  }

  /**
   * PeerChallenge findFirstOrThrow
   */
  export type PeerChallengeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
    /**
     * Filter, which PeerChallenge to fetch.
     */
    where?: PeerChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeerChallenges to fetch.
     */
    orderBy?: PeerChallengeOrderByWithRelationInput | PeerChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PeerChallenges.
     */
    cursor?: PeerChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeerChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeerChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PeerChallenges.
     */
    distinct?: PeerChallengeScalarFieldEnum | PeerChallengeScalarFieldEnum[]
  }

  /**
   * PeerChallenge findMany
   */
  export type PeerChallengeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
    /**
     * Filter, which PeerChallenges to fetch.
     */
    where?: PeerChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeerChallenges to fetch.
     */
    orderBy?: PeerChallengeOrderByWithRelationInput | PeerChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PeerChallenges.
     */
    cursor?: PeerChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeerChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeerChallenges.
     */
    skip?: number
    distinct?: PeerChallengeScalarFieldEnum | PeerChallengeScalarFieldEnum[]
  }

  /**
   * PeerChallenge create
   */
  export type PeerChallengeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
    /**
     * The data needed to create a PeerChallenge.
     */
    data: XOR<PeerChallengeCreateInput, PeerChallengeUncheckedCreateInput>
  }

  /**
   * PeerChallenge createMany
   */
  export type PeerChallengeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PeerChallenges.
     */
    data: PeerChallengeCreateManyInput | PeerChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PeerChallenge createManyAndReturn
   */
  export type PeerChallengeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PeerChallenges.
     */
    data: PeerChallengeCreateManyInput | PeerChallengeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PeerChallenge update
   */
  export type PeerChallengeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
    /**
     * The data needed to update a PeerChallenge.
     */
    data: XOR<PeerChallengeUpdateInput, PeerChallengeUncheckedUpdateInput>
    /**
     * Choose, which PeerChallenge to update.
     */
    where: PeerChallengeWhereUniqueInput
  }

  /**
   * PeerChallenge updateMany
   */
  export type PeerChallengeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PeerChallenges.
     */
    data: XOR<PeerChallengeUpdateManyMutationInput, PeerChallengeUncheckedUpdateManyInput>
    /**
     * Filter which PeerChallenges to update
     */
    where?: PeerChallengeWhereInput
  }

  /**
   * PeerChallenge upsert
   */
  export type PeerChallengeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
    /**
     * The filter to search for the PeerChallenge to update in case it exists.
     */
    where: PeerChallengeWhereUniqueInput
    /**
     * In case the PeerChallenge found by the `where` argument doesn't exist, create a new PeerChallenge with this data.
     */
    create: XOR<PeerChallengeCreateInput, PeerChallengeUncheckedCreateInput>
    /**
     * In case the PeerChallenge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PeerChallengeUpdateInput, PeerChallengeUncheckedUpdateInput>
  }

  /**
   * PeerChallenge delete
   */
  export type PeerChallengeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
    /**
     * Filter which PeerChallenge to delete.
     */
    where: PeerChallengeWhereUniqueInput
  }

  /**
   * PeerChallenge deleteMany
   */
  export type PeerChallengeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PeerChallenges to delete
     */
    where?: PeerChallengeWhereInput
  }

  /**
   * PeerChallenge without action
   */
  export type PeerChallengeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeerChallenge
     */
    select?: PeerChallengeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeerChallengeInclude<ExtArgs> | null
  }


  /**
   * Model Badge
   */

  export type AggregateBadge = {
    _count: BadgeCountAggregateOutputType | null
    _avg: BadgeAvgAggregateOutputType | null
    _sum: BadgeSumAggregateOutputType | null
    _min: BadgeMinAggregateOutputType | null
    _max: BadgeMaxAggregateOutputType | null
  }

  export type BadgeAvgAggregateOutputType = {
    xpReward: number | null
  }

  export type BadgeSumAggregateOutputType = {
    xpReward: number | null
  }

  export type BadgeMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    icon: string | null
    category: string | null
    requirement: string | null
    xpReward: number | null
  }

  export type BadgeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    icon: string | null
    category: string | null
    requirement: string | null
    xpReward: number | null
  }

  export type BadgeCountAggregateOutputType = {
    id: number
    name: number
    description: number
    icon: number
    category: number
    requirement: number
    xpReward: number
    _all: number
  }


  export type BadgeAvgAggregateInputType = {
    xpReward?: true
  }

  export type BadgeSumAggregateInputType = {
    xpReward?: true
  }

  export type BadgeMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    category?: true
    requirement?: true
    xpReward?: true
  }

  export type BadgeMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    category?: true
    requirement?: true
    xpReward?: true
  }

  export type BadgeCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    category?: true
    requirement?: true
    xpReward?: true
    _all?: true
  }

  export type BadgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Badge to aggregate.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Badges
    **/
    _count?: true | BadgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BadgeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BadgeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BadgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BadgeMaxAggregateInputType
  }

  export type GetBadgeAggregateType<T extends BadgeAggregateArgs> = {
        [P in keyof T & keyof AggregateBadge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBadge[P]>
      : GetScalarType<T[P], AggregateBadge[P]>
  }




  export type BadgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BadgeWhereInput
    orderBy?: BadgeOrderByWithAggregationInput | BadgeOrderByWithAggregationInput[]
    by: BadgeScalarFieldEnum[] | BadgeScalarFieldEnum
    having?: BadgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BadgeCountAggregateInputType | true
    _avg?: BadgeAvgAggregateInputType
    _sum?: BadgeSumAggregateInputType
    _min?: BadgeMinAggregateInputType
    _max?: BadgeMaxAggregateInputType
  }

  export type BadgeGroupByOutputType = {
    id: string
    name: string
    description: string
    icon: string
    category: string
    requirement: string
    xpReward: number
    _count: BadgeCountAggregateOutputType | null
    _avg: BadgeAvgAggregateOutputType | null
    _sum: BadgeSumAggregateOutputType | null
    _min: BadgeMinAggregateOutputType | null
    _max: BadgeMaxAggregateOutputType | null
  }

  type GetBadgeGroupByPayload<T extends BadgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BadgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BadgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BadgeGroupByOutputType[P]>
            : GetScalarType<T[P], BadgeGroupByOutputType[P]>
        }
      >
    >


  export type BadgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    category?: boolean
    requirement?: boolean
    xpReward?: boolean
  }, ExtArgs["result"]["badge"]>

  export type BadgeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    category?: boolean
    requirement?: boolean
    xpReward?: boolean
  }, ExtArgs["result"]["badge"]>

  export type BadgeSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    category?: boolean
    requirement?: boolean
    xpReward?: boolean
  }


  export type $BadgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Badge"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      icon: string
      category: string
      requirement: string
      xpReward: number
    }, ExtArgs["result"]["badge"]>
    composites: {}
  }

  type BadgeGetPayload<S extends boolean | null | undefined | BadgeDefaultArgs> = $Result.GetResult<Prisma.$BadgePayload, S>

  type BadgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BadgeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BadgeCountAggregateInputType | true
    }

  export interface BadgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Badge'], meta: { name: 'Badge' } }
    /**
     * Find zero or one Badge that matches the filter.
     * @param {BadgeFindUniqueArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BadgeFindUniqueArgs>(args: SelectSubset<T, BadgeFindUniqueArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Badge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BadgeFindUniqueOrThrowArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BadgeFindUniqueOrThrowArgs>(args: SelectSubset<T, BadgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Badge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindFirstArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BadgeFindFirstArgs>(args?: SelectSubset<T, BadgeFindFirstArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Badge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindFirstOrThrowArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BadgeFindFirstOrThrowArgs>(args?: SelectSubset<T, BadgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Badges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Badges
     * const badges = await prisma.badge.findMany()
     * 
     * // Get first 10 Badges
     * const badges = await prisma.badge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const badgeWithIdOnly = await prisma.badge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BadgeFindManyArgs>(args?: SelectSubset<T, BadgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Badge.
     * @param {BadgeCreateArgs} args - Arguments to create a Badge.
     * @example
     * // Create one Badge
     * const Badge = await prisma.badge.create({
     *   data: {
     *     // ... data to create a Badge
     *   }
     * })
     * 
     */
    create<T extends BadgeCreateArgs>(args: SelectSubset<T, BadgeCreateArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Badges.
     * @param {BadgeCreateManyArgs} args - Arguments to create many Badges.
     * @example
     * // Create many Badges
     * const badge = await prisma.badge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BadgeCreateManyArgs>(args?: SelectSubset<T, BadgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Badges and returns the data saved in the database.
     * @param {BadgeCreateManyAndReturnArgs} args - Arguments to create many Badges.
     * @example
     * // Create many Badges
     * const badge = await prisma.badge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Badges and only return the `id`
     * const badgeWithIdOnly = await prisma.badge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BadgeCreateManyAndReturnArgs>(args?: SelectSubset<T, BadgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Badge.
     * @param {BadgeDeleteArgs} args - Arguments to delete one Badge.
     * @example
     * // Delete one Badge
     * const Badge = await prisma.badge.delete({
     *   where: {
     *     // ... filter to delete one Badge
     *   }
     * })
     * 
     */
    delete<T extends BadgeDeleteArgs>(args: SelectSubset<T, BadgeDeleteArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Badge.
     * @param {BadgeUpdateArgs} args - Arguments to update one Badge.
     * @example
     * // Update one Badge
     * const badge = await prisma.badge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BadgeUpdateArgs>(args: SelectSubset<T, BadgeUpdateArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Badges.
     * @param {BadgeDeleteManyArgs} args - Arguments to filter Badges to delete.
     * @example
     * // Delete a few Badges
     * const { count } = await prisma.badge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BadgeDeleteManyArgs>(args?: SelectSubset<T, BadgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Badges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Badges
     * const badge = await prisma.badge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BadgeUpdateManyArgs>(args: SelectSubset<T, BadgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Badge.
     * @param {BadgeUpsertArgs} args - Arguments to update or create a Badge.
     * @example
     * // Update or create a Badge
     * const badge = await prisma.badge.upsert({
     *   create: {
     *     // ... data to create a Badge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Badge we want to update
     *   }
     * })
     */
    upsert<T extends BadgeUpsertArgs>(args: SelectSubset<T, BadgeUpsertArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Badges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeCountArgs} args - Arguments to filter Badges to count.
     * @example
     * // Count the number of Badges
     * const count = await prisma.badge.count({
     *   where: {
     *     // ... the filter for the Badges we want to count
     *   }
     * })
    **/
    count<T extends BadgeCountArgs>(
      args?: Subset<T, BadgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BadgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Badge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BadgeAggregateArgs>(args: Subset<T, BadgeAggregateArgs>): Prisma.PrismaPromise<GetBadgeAggregateType<T>>

    /**
     * Group by Badge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BadgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BadgeGroupByArgs['orderBy'] }
        : { orderBy?: BadgeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BadgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBadgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Badge model
   */
  readonly fields: BadgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Badge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BadgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Badge model
   */ 
  interface BadgeFieldRefs {
    readonly id: FieldRef<"Badge", 'String'>
    readonly name: FieldRef<"Badge", 'String'>
    readonly description: FieldRef<"Badge", 'String'>
    readonly icon: FieldRef<"Badge", 'String'>
    readonly category: FieldRef<"Badge", 'String'>
    readonly requirement: FieldRef<"Badge", 'String'>
    readonly xpReward: FieldRef<"Badge", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Badge findUnique
   */
  export type BadgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge findUniqueOrThrow
   */
  export type BadgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge findFirst
   */
  export type BadgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Badges.
     */
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge findFirstOrThrow
   */
  export type BadgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Badges.
     */
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge findMany
   */
  export type BadgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Filter, which Badges to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge create
   */
  export type BadgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * The data needed to create a Badge.
     */
    data: XOR<BadgeCreateInput, BadgeUncheckedCreateInput>
  }

  /**
   * Badge createMany
   */
  export type BadgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Badges.
     */
    data: BadgeCreateManyInput | BadgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Badge createManyAndReturn
   */
  export type BadgeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Badges.
     */
    data: BadgeCreateManyInput | BadgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Badge update
   */
  export type BadgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * The data needed to update a Badge.
     */
    data: XOR<BadgeUpdateInput, BadgeUncheckedUpdateInput>
    /**
     * Choose, which Badge to update.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge updateMany
   */
  export type BadgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Badges.
     */
    data: XOR<BadgeUpdateManyMutationInput, BadgeUncheckedUpdateManyInput>
    /**
     * Filter which Badges to update
     */
    where?: BadgeWhereInput
  }

  /**
   * Badge upsert
   */
  export type BadgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * The filter to search for the Badge to update in case it exists.
     */
    where: BadgeWhereUniqueInput
    /**
     * In case the Badge found by the `where` argument doesn't exist, create a new Badge with this data.
     */
    create: XOR<BadgeCreateInput, BadgeUncheckedCreateInput>
    /**
     * In case the Badge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BadgeUpdateInput, BadgeUncheckedUpdateInput>
  }

  /**
   * Badge delete
   */
  export type BadgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Filter which Badge to delete.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge deleteMany
   */
  export type BadgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Badges to delete
     */
    where?: BadgeWhereInput
  }

  /**
   * Badge without action
   */
  export type BadgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ChildScalarFieldEnum: {
    id: 'id',
    name: 'name',
    age: 'age',
    grade: 'grade',
    avatar: 'avatar',
    xp: 'xp',
    level: 'level',
    streak: 'streak',
    longestStreak: 'longestStreak',
    lastActiveDate: 'lastActiveDate',
    totalQuizzes: 'totalQuizzes',
    totalWatchTime: 'totalWatchTime',
    screenTimeLimit: 'screenTimeLimit',
    badges: 'badges',
    weakSubjects: 'weakSubjects',
    strongSubjects: 'strongSubjects',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    parentId: 'parentId'
  };

  export type ChildScalarFieldEnum = (typeof ChildScalarFieldEnum)[keyof typeof ChildScalarFieldEnum]


  export const ContentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    type: 'type',
    subject: 'subject',
    thumbnailUrl: 'thumbnailUrl',
    contentUrl: 'contentUrl',
    duration: 'duration',
    ageMin: 'ageMin',
    ageMax: 'ageMax',
    difficulty: 'difficulty',
    xpReward: 'xpReward',
    isApproved: 'isApproved',
    createdAt: 'createdAt'
  };

  export type ContentScalarFieldEnum = (typeof ContentScalarFieldEnum)[keyof typeof ContentScalarFieldEnum]


  export const WatchLogScalarFieldEnum: {
    id: 'id',
    childId: 'childId',
    contentId: 'contentId',
    watchedAt: 'watchedAt',
    duration: 'duration'
  };

  export type WatchLogScalarFieldEnum = (typeof WatchLogScalarFieldEnum)[keyof typeof WatchLogScalarFieldEnum]


  export const QuizScalarFieldEnum: {
    id: 'id',
    title: 'title',
    subject: 'subject',
    difficulty: 'difficulty',
    questions: 'questions',
    xpReward: 'xpReward',
    timeLimit: 'timeLimit',
    ageMin: 'ageMin',
    ageMax: 'ageMax',
    createdAt: 'createdAt',
    createdById: 'createdById'
  };

  export type QuizScalarFieldEnum = (typeof QuizScalarFieldEnum)[keyof typeof QuizScalarFieldEnum]


  export const QuizAttemptScalarFieldEnum: {
    id: 'id',
    childId: 'childId',
    quizId: 'quizId',
    score: 'score',
    totalQuestions: 'totalQuestions',
    answers: 'answers',
    timeTaken: 'timeTaken',
    difficulty: 'difficulty',
    xpEarned: 'xpEarned',
    completedAt: 'completedAt'
  };

  export type QuizAttemptScalarFieldEnum = (typeof QuizAttemptScalarFieldEnum)[keyof typeof QuizAttemptScalarFieldEnum]


  export const FriendRequestScalarFieldEnum: {
    id: 'id',
    fromChildId: 'fromChildId',
    toChildId: 'toChildId',
    status: 'status',
    parentApproved: 'parentApproved',
    createdAt: 'createdAt'
  };

  export type FriendRequestScalarFieldEnum = (typeof FriendRequestScalarFieldEnum)[keyof typeof FriendRequestScalarFieldEnum]


  export const ParentAlertScalarFieldEnum: {
    id: 'id',
    childId: 'childId',
    type: 'type',
    title: 'title',
    message: 'message',
    severity: 'severity',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type ParentAlertScalarFieldEnum = (typeof ParentAlertScalarFieldEnum)[keyof typeof ParentAlertScalarFieldEnum]


  export const ClassroomScalarFieldEnum: {
    id: 'id',
    name: 'name',
    subject: 'subject',
    joinCode: 'joinCode',
    grade: 'grade',
    teacherId: 'teacherId',
    studentIds: 'studentIds',
    createdAt: 'createdAt'
  };

  export type ClassroomScalarFieldEnum = (typeof ClassroomScalarFieldEnum)[keyof typeof ClassroomScalarFieldEnum]


  export const LessonScalarFieldEnum: {
    id: 'id',
    classroomId: 'classroomId',
    title: 'title',
    description: 'description',
    contentUrl: 'contentUrl',
    quizId: 'quizId',
    order: 'order',
    createdAt: 'createdAt'
  };

  export type LessonScalarFieldEnum = (typeof LessonScalarFieldEnum)[keyof typeof LessonScalarFieldEnum]


  export const ActivityFeedScalarFieldEnum: {
    id: 'id',
    childId: 'childId',
    type: 'type',
    title: 'title',
    description: 'description',
    xpEarned: 'xpEarned',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type ActivityFeedScalarFieldEnum = (typeof ActivityFeedScalarFieldEnum)[keyof typeof ActivityFeedScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    receiverId: 'receiverId',
    content: 'content',
    type: 'type',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const PeerChallengeScalarFieldEnum: {
    id: 'id',
    challengerId: 'challengerId',
    challengedId: 'challengedId',
    quizId: 'quizId',
    subject: 'subject',
    status: 'status',
    challengerScore: 'challengerScore',
    challengedScore: 'challengedScore',
    winnerId: 'winnerId',
    xpReward: 'xpReward',
    createdAt: 'createdAt'
  };

  export type PeerChallengeScalarFieldEnum = (typeof PeerChallengeScalarFieldEnum)[keyof typeof PeerChallengeScalarFieldEnum]


  export const BadgeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    icon: 'icon',
    category: 'category',
    requirement: 'requirement',
    xpReward: 'xpReward'
  };

  export type BadgeScalarFieldEnum = (typeof BadgeScalarFieldEnum)[keyof typeof BadgeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    children?: ChildListRelationFilter
    classrooms?: ClassroomListRelationFilter
    sentMessages?: MessageListRelationFilter
    receivedMessages?: MessageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    children?: ChildOrderByRelationAggregateInput
    classrooms?: ClassroomOrderByRelationAggregateInput
    sentMessages?: MessageOrderByRelationAggregateInput
    receivedMessages?: MessageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    children?: ChildListRelationFilter
    classrooms?: ClassroomListRelationFilter
    sentMessages?: MessageListRelationFilter
    receivedMessages?: MessageListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ChildWhereInput = {
    AND?: ChildWhereInput | ChildWhereInput[]
    OR?: ChildWhereInput[]
    NOT?: ChildWhereInput | ChildWhereInput[]
    id?: StringFilter<"Child"> | string
    name?: StringFilter<"Child"> | string
    age?: IntFilter<"Child"> | number
    grade?: StringNullableFilter<"Child"> | string | null
    avatar?: StringNullableFilter<"Child"> | string | null
    xp?: IntFilter<"Child"> | number
    level?: IntFilter<"Child"> | number
    streak?: IntFilter<"Child"> | number
    longestStreak?: IntFilter<"Child"> | number
    lastActiveDate?: StringNullableFilter<"Child"> | string | null
    totalQuizzes?: IntFilter<"Child"> | number
    totalWatchTime?: IntFilter<"Child"> | number
    screenTimeLimit?: IntFilter<"Child"> | number
    badges?: StringFilter<"Child"> | string
    weakSubjects?: StringFilter<"Child"> | string
    strongSubjects?: StringFilter<"Child"> | string
    createdAt?: DateTimeFilter<"Child"> | Date | string
    updatedAt?: DateTimeFilter<"Child"> | Date | string
    parentId?: StringFilter<"Child"> | string
    parent?: XOR<UserRelationFilter, UserWhereInput>
    quizAttempts?: QuizAttemptListRelationFilter
    watchLogs?: WatchLogListRelationFilter
    activities?: ActivityFeedListRelationFilter
    alerts?: ParentAlertListRelationFilter
    sentFriendRequests?: FriendRequestListRelationFilter
    receivedFriendRequests?: FriendRequestListRelationFilter
    sentChallenges?: PeerChallengeListRelationFilter
    receivedChallenges?: PeerChallengeListRelationFilter
  }

  export type ChildOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    grade?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
    lastActiveDate?: SortOrderInput | SortOrder
    totalQuizzes?: SortOrder
    totalWatchTime?: SortOrder
    screenTimeLimit?: SortOrder
    badges?: SortOrder
    weakSubjects?: SortOrder
    strongSubjects?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentId?: SortOrder
    parent?: UserOrderByWithRelationInput
    quizAttempts?: QuizAttemptOrderByRelationAggregateInput
    watchLogs?: WatchLogOrderByRelationAggregateInput
    activities?: ActivityFeedOrderByRelationAggregateInput
    alerts?: ParentAlertOrderByRelationAggregateInput
    sentFriendRequests?: FriendRequestOrderByRelationAggregateInput
    receivedFriendRequests?: FriendRequestOrderByRelationAggregateInput
    sentChallenges?: PeerChallengeOrderByRelationAggregateInput
    receivedChallenges?: PeerChallengeOrderByRelationAggregateInput
  }

  export type ChildWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChildWhereInput | ChildWhereInput[]
    OR?: ChildWhereInput[]
    NOT?: ChildWhereInput | ChildWhereInput[]
    name?: StringFilter<"Child"> | string
    age?: IntFilter<"Child"> | number
    grade?: StringNullableFilter<"Child"> | string | null
    avatar?: StringNullableFilter<"Child"> | string | null
    xp?: IntFilter<"Child"> | number
    level?: IntFilter<"Child"> | number
    streak?: IntFilter<"Child"> | number
    longestStreak?: IntFilter<"Child"> | number
    lastActiveDate?: StringNullableFilter<"Child"> | string | null
    totalQuizzes?: IntFilter<"Child"> | number
    totalWatchTime?: IntFilter<"Child"> | number
    screenTimeLimit?: IntFilter<"Child"> | number
    badges?: StringFilter<"Child"> | string
    weakSubjects?: StringFilter<"Child"> | string
    strongSubjects?: StringFilter<"Child"> | string
    createdAt?: DateTimeFilter<"Child"> | Date | string
    updatedAt?: DateTimeFilter<"Child"> | Date | string
    parentId?: StringFilter<"Child"> | string
    parent?: XOR<UserRelationFilter, UserWhereInput>
    quizAttempts?: QuizAttemptListRelationFilter
    watchLogs?: WatchLogListRelationFilter
    activities?: ActivityFeedListRelationFilter
    alerts?: ParentAlertListRelationFilter
    sentFriendRequests?: FriendRequestListRelationFilter
    receivedFriendRequests?: FriendRequestListRelationFilter
    sentChallenges?: PeerChallengeListRelationFilter
    receivedChallenges?: PeerChallengeListRelationFilter
  }, "id">

  export type ChildOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    grade?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
    lastActiveDate?: SortOrderInput | SortOrder
    totalQuizzes?: SortOrder
    totalWatchTime?: SortOrder
    screenTimeLimit?: SortOrder
    badges?: SortOrder
    weakSubjects?: SortOrder
    strongSubjects?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentId?: SortOrder
    _count?: ChildCountOrderByAggregateInput
    _avg?: ChildAvgOrderByAggregateInput
    _max?: ChildMaxOrderByAggregateInput
    _min?: ChildMinOrderByAggregateInput
    _sum?: ChildSumOrderByAggregateInput
  }

  export type ChildScalarWhereWithAggregatesInput = {
    AND?: ChildScalarWhereWithAggregatesInput | ChildScalarWhereWithAggregatesInput[]
    OR?: ChildScalarWhereWithAggregatesInput[]
    NOT?: ChildScalarWhereWithAggregatesInput | ChildScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Child"> | string
    name?: StringWithAggregatesFilter<"Child"> | string
    age?: IntWithAggregatesFilter<"Child"> | number
    grade?: StringNullableWithAggregatesFilter<"Child"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"Child"> | string | null
    xp?: IntWithAggregatesFilter<"Child"> | number
    level?: IntWithAggregatesFilter<"Child"> | number
    streak?: IntWithAggregatesFilter<"Child"> | number
    longestStreak?: IntWithAggregatesFilter<"Child"> | number
    lastActiveDate?: StringNullableWithAggregatesFilter<"Child"> | string | null
    totalQuizzes?: IntWithAggregatesFilter<"Child"> | number
    totalWatchTime?: IntWithAggregatesFilter<"Child"> | number
    screenTimeLimit?: IntWithAggregatesFilter<"Child"> | number
    badges?: StringWithAggregatesFilter<"Child"> | string
    weakSubjects?: StringWithAggregatesFilter<"Child"> | string
    strongSubjects?: StringWithAggregatesFilter<"Child"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Child"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Child"> | Date | string
    parentId?: StringWithAggregatesFilter<"Child"> | string
  }

  export type ContentWhereInput = {
    AND?: ContentWhereInput | ContentWhereInput[]
    OR?: ContentWhereInput[]
    NOT?: ContentWhereInput | ContentWhereInput[]
    id?: StringFilter<"Content"> | string
    title?: StringFilter<"Content"> | string
    description?: StringNullableFilter<"Content"> | string | null
    type?: StringFilter<"Content"> | string
    subject?: StringFilter<"Content"> | string
    thumbnailUrl?: StringNullableFilter<"Content"> | string | null
    contentUrl?: StringFilter<"Content"> | string
    duration?: IntNullableFilter<"Content"> | number | null
    ageMin?: IntFilter<"Content"> | number
    ageMax?: IntFilter<"Content"> | number
    difficulty?: StringFilter<"Content"> | string
    xpReward?: IntFilter<"Content"> | number
    isApproved?: BoolFilter<"Content"> | boolean
    createdAt?: DateTimeFilter<"Content"> | Date | string
    watchLogs?: WatchLogListRelationFilter
  }

  export type ContentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    subject?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    contentUrl?: SortOrder
    duration?: SortOrderInput | SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    difficulty?: SortOrder
    xpReward?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    watchLogs?: WatchLogOrderByRelationAggregateInput
  }

  export type ContentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContentWhereInput | ContentWhereInput[]
    OR?: ContentWhereInput[]
    NOT?: ContentWhereInput | ContentWhereInput[]
    title?: StringFilter<"Content"> | string
    description?: StringNullableFilter<"Content"> | string | null
    type?: StringFilter<"Content"> | string
    subject?: StringFilter<"Content"> | string
    thumbnailUrl?: StringNullableFilter<"Content"> | string | null
    contentUrl?: StringFilter<"Content"> | string
    duration?: IntNullableFilter<"Content"> | number | null
    ageMin?: IntFilter<"Content"> | number
    ageMax?: IntFilter<"Content"> | number
    difficulty?: StringFilter<"Content"> | string
    xpReward?: IntFilter<"Content"> | number
    isApproved?: BoolFilter<"Content"> | boolean
    createdAt?: DateTimeFilter<"Content"> | Date | string
    watchLogs?: WatchLogListRelationFilter
  }, "id">

  export type ContentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    subject?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    contentUrl?: SortOrder
    duration?: SortOrderInput | SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    difficulty?: SortOrder
    xpReward?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    _count?: ContentCountOrderByAggregateInput
    _avg?: ContentAvgOrderByAggregateInput
    _max?: ContentMaxOrderByAggregateInput
    _min?: ContentMinOrderByAggregateInput
    _sum?: ContentSumOrderByAggregateInput
  }

  export type ContentScalarWhereWithAggregatesInput = {
    AND?: ContentScalarWhereWithAggregatesInput | ContentScalarWhereWithAggregatesInput[]
    OR?: ContentScalarWhereWithAggregatesInput[]
    NOT?: ContentScalarWhereWithAggregatesInput | ContentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Content"> | string
    title?: StringWithAggregatesFilter<"Content"> | string
    description?: StringNullableWithAggregatesFilter<"Content"> | string | null
    type?: StringWithAggregatesFilter<"Content"> | string
    subject?: StringWithAggregatesFilter<"Content"> | string
    thumbnailUrl?: StringNullableWithAggregatesFilter<"Content"> | string | null
    contentUrl?: StringWithAggregatesFilter<"Content"> | string
    duration?: IntNullableWithAggregatesFilter<"Content"> | number | null
    ageMin?: IntWithAggregatesFilter<"Content"> | number
    ageMax?: IntWithAggregatesFilter<"Content"> | number
    difficulty?: StringWithAggregatesFilter<"Content"> | string
    xpReward?: IntWithAggregatesFilter<"Content"> | number
    isApproved?: BoolWithAggregatesFilter<"Content"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Content"> | Date | string
  }

  export type WatchLogWhereInput = {
    AND?: WatchLogWhereInput | WatchLogWhereInput[]
    OR?: WatchLogWhereInput[]
    NOT?: WatchLogWhereInput | WatchLogWhereInput[]
    id?: StringFilter<"WatchLog"> | string
    childId?: StringFilter<"WatchLog"> | string
    contentId?: StringFilter<"WatchLog"> | string
    watchedAt?: DateTimeFilter<"WatchLog"> | Date | string
    duration?: IntFilter<"WatchLog"> | number
    child?: XOR<ChildRelationFilter, ChildWhereInput>
    content?: XOR<ContentRelationFilter, ContentWhereInput>
  }

  export type WatchLogOrderByWithRelationInput = {
    id?: SortOrder
    childId?: SortOrder
    contentId?: SortOrder
    watchedAt?: SortOrder
    duration?: SortOrder
    child?: ChildOrderByWithRelationInput
    content?: ContentOrderByWithRelationInput
  }

  export type WatchLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WatchLogWhereInput | WatchLogWhereInput[]
    OR?: WatchLogWhereInput[]
    NOT?: WatchLogWhereInput | WatchLogWhereInput[]
    childId?: StringFilter<"WatchLog"> | string
    contentId?: StringFilter<"WatchLog"> | string
    watchedAt?: DateTimeFilter<"WatchLog"> | Date | string
    duration?: IntFilter<"WatchLog"> | number
    child?: XOR<ChildRelationFilter, ChildWhereInput>
    content?: XOR<ContentRelationFilter, ContentWhereInput>
  }, "id">

  export type WatchLogOrderByWithAggregationInput = {
    id?: SortOrder
    childId?: SortOrder
    contentId?: SortOrder
    watchedAt?: SortOrder
    duration?: SortOrder
    _count?: WatchLogCountOrderByAggregateInput
    _avg?: WatchLogAvgOrderByAggregateInput
    _max?: WatchLogMaxOrderByAggregateInput
    _min?: WatchLogMinOrderByAggregateInput
    _sum?: WatchLogSumOrderByAggregateInput
  }

  export type WatchLogScalarWhereWithAggregatesInput = {
    AND?: WatchLogScalarWhereWithAggregatesInput | WatchLogScalarWhereWithAggregatesInput[]
    OR?: WatchLogScalarWhereWithAggregatesInput[]
    NOT?: WatchLogScalarWhereWithAggregatesInput | WatchLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WatchLog"> | string
    childId?: StringWithAggregatesFilter<"WatchLog"> | string
    contentId?: StringWithAggregatesFilter<"WatchLog"> | string
    watchedAt?: DateTimeWithAggregatesFilter<"WatchLog"> | Date | string
    duration?: IntWithAggregatesFilter<"WatchLog"> | number
  }

  export type QuizWhereInput = {
    AND?: QuizWhereInput | QuizWhereInput[]
    OR?: QuizWhereInput[]
    NOT?: QuizWhereInput | QuizWhereInput[]
    id?: StringFilter<"Quiz"> | string
    title?: StringFilter<"Quiz"> | string
    subject?: StringFilter<"Quiz"> | string
    difficulty?: StringFilter<"Quiz"> | string
    questions?: StringFilter<"Quiz"> | string
    xpReward?: IntFilter<"Quiz"> | number
    timeLimit?: IntNullableFilter<"Quiz"> | number | null
    ageMin?: IntFilter<"Quiz"> | number
    ageMax?: IntFilter<"Quiz"> | number
    createdAt?: DateTimeFilter<"Quiz"> | Date | string
    createdById?: StringNullableFilter<"Quiz"> | string | null
    attempts?: QuizAttemptListRelationFilter
  }

  export type QuizOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    subject?: SortOrder
    difficulty?: SortOrder
    questions?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrderInput | SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    attempts?: QuizAttemptOrderByRelationAggregateInput
  }

  export type QuizWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuizWhereInput | QuizWhereInput[]
    OR?: QuizWhereInput[]
    NOT?: QuizWhereInput | QuizWhereInput[]
    title?: StringFilter<"Quiz"> | string
    subject?: StringFilter<"Quiz"> | string
    difficulty?: StringFilter<"Quiz"> | string
    questions?: StringFilter<"Quiz"> | string
    xpReward?: IntFilter<"Quiz"> | number
    timeLimit?: IntNullableFilter<"Quiz"> | number | null
    ageMin?: IntFilter<"Quiz"> | number
    ageMax?: IntFilter<"Quiz"> | number
    createdAt?: DateTimeFilter<"Quiz"> | Date | string
    createdById?: StringNullableFilter<"Quiz"> | string | null
    attempts?: QuizAttemptListRelationFilter
  }, "id">

  export type QuizOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    subject?: SortOrder
    difficulty?: SortOrder
    questions?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrderInput | SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    _count?: QuizCountOrderByAggregateInput
    _avg?: QuizAvgOrderByAggregateInput
    _max?: QuizMaxOrderByAggregateInput
    _min?: QuizMinOrderByAggregateInput
    _sum?: QuizSumOrderByAggregateInput
  }

  export type QuizScalarWhereWithAggregatesInput = {
    AND?: QuizScalarWhereWithAggregatesInput | QuizScalarWhereWithAggregatesInput[]
    OR?: QuizScalarWhereWithAggregatesInput[]
    NOT?: QuizScalarWhereWithAggregatesInput | QuizScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Quiz"> | string
    title?: StringWithAggregatesFilter<"Quiz"> | string
    subject?: StringWithAggregatesFilter<"Quiz"> | string
    difficulty?: StringWithAggregatesFilter<"Quiz"> | string
    questions?: StringWithAggregatesFilter<"Quiz"> | string
    xpReward?: IntWithAggregatesFilter<"Quiz"> | number
    timeLimit?: IntNullableWithAggregatesFilter<"Quiz"> | number | null
    ageMin?: IntWithAggregatesFilter<"Quiz"> | number
    ageMax?: IntWithAggregatesFilter<"Quiz"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Quiz"> | Date | string
    createdById?: StringNullableWithAggregatesFilter<"Quiz"> | string | null
  }

  export type QuizAttemptWhereInput = {
    AND?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    OR?: QuizAttemptWhereInput[]
    NOT?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    id?: StringFilter<"QuizAttempt"> | string
    childId?: StringFilter<"QuizAttempt"> | string
    quizId?: StringFilter<"QuizAttempt"> | string
    score?: IntFilter<"QuizAttempt"> | number
    totalQuestions?: IntFilter<"QuizAttempt"> | number
    answers?: StringFilter<"QuizAttempt"> | string
    timeTaken?: IntNullableFilter<"QuizAttempt"> | number | null
    difficulty?: StringFilter<"QuizAttempt"> | string
    xpEarned?: IntFilter<"QuizAttempt"> | number
    completedAt?: DateTimeFilter<"QuizAttempt"> | Date | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
    quiz?: XOR<QuizRelationFilter, QuizWhereInput>
  }

  export type QuizAttemptOrderByWithRelationInput = {
    id?: SortOrder
    childId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    totalQuestions?: SortOrder
    answers?: SortOrder
    timeTaken?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    xpEarned?: SortOrder
    completedAt?: SortOrder
    child?: ChildOrderByWithRelationInput
    quiz?: QuizOrderByWithRelationInput
  }

  export type QuizAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    OR?: QuizAttemptWhereInput[]
    NOT?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    childId?: StringFilter<"QuizAttempt"> | string
    quizId?: StringFilter<"QuizAttempt"> | string
    score?: IntFilter<"QuizAttempt"> | number
    totalQuestions?: IntFilter<"QuizAttempt"> | number
    answers?: StringFilter<"QuizAttempt"> | string
    timeTaken?: IntNullableFilter<"QuizAttempt"> | number | null
    difficulty?: StringFilter<"QuizAttempt"> | string
    xpEarned?: IntFilter<"QuizAttempt"> | number
    completedAt?: DateTimeFilter<"QuizAttempt"> | Date | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
    quiz?: XOR<QuizRelationFilter, QuizWhereInput>
  }, "id">

  export type QuizAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    childId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    totalQuestions?: SortOrder
    answers?: SortOrder
    timeTaken?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    xpEarned?: SortOrder
    completedAt?: SortOrder
    _count?: QuizAttemptCountOrderByAggregateInput
    _avg?: QuizAttemptAvgOrderByAggregateInput
    _max?: QuizAttemptMaxOrderByAggregateInput
    _min?: QuizAttemptMinOrderByAggregateInput
    _sum?: QuizAttemptSumOrderByAggregateInput
  }

  export type QuizAttemptScalarWhereWithAggregatesInput = {
    AND?: QuizAttemptScalarWhereWithAggregatesInput | QuizAttemptScalarWhereWithAggregatesInput[]
    OR?: QuizAttemptScalarWhereWithAggregatesInput[]
    NOT?: QuizAttemptScalarWhereWithAggregatesInput | QuizAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuizAttempt"> | string
    childId?: StringWithAggregatesFilter<"QuizAttempt"> | string
    quizId?: StringWithAggregatesFilter<"QuizAttempt"> | string
    score?: IntWithAggregatesFilter<"QuizAttempt"> | number
    totalQuestions?: IntWithAggregatesFilter<"QuizAttempt"> | number
    answers?: StringWithAggregatesFilter<"QuizAttempt"> | string
    timeTaken?: IntNullableWithAggregatesFilter<"QuizAttempt"> | number | null
    difficulty?: StringWithAggregatesFilter<"QuizAttempt"> | string
    xpEarned?: IntWithAggregatesFilter<"QuizAttempt"> | number
    completedAt?: DateTimeWithAggregatesFilter<"QuizAttempt"> | Date | string
  }

  export type FriendRequestWhereInput = {
    AND?: FriendRequestWhereInput | FriendRequestWhereInput[]
    OR?: FriendRequestWhereInput[]
    NOT?: FriendRequestWhereInput | FriendRequestWhereInput[]
    id?: StringFilter<"FriendRequest"> | string
    fromChildId?: StringFilter<"FriendRequest"> | string
    toChildId?: StringFilter<"FriendRequest"> | string
    status?: StringFilter<"FriendRequest"> | string
    parentApproved?: BoolFilter<"FriendRequest"> | boolean
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
    fromChild?: XOR<ChildRelationFilter, ChildWhereInput>
    toChild?: XOR<ChildRelationFilter, ChildWhereInput>
  }

  export type FriendRequestOrderByWithRelationInput = {
    id?: SortOrder
    fromChildId?: SortOrder
    toChildId?: SortOrder
    status?: SortOrder
    parentApproved?: SortOrder
    createdAt?: SortOrder
    fromChild?: ChildOrderByWithRelationInput
    toChild?: ChildOrderByWithRelationInput
  }

  export type FriendRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FriendRequestWhereInput | FriendRequestWhereInput[]
    OR?: FriendRequestWhereInput[]
    NOT?: FriendRequestWhereInput | FriendRequestWhereInput[]
    fromChildId?: StringFilter<"FriendRequest"> | string
    toChildId?: StringFilter<"FriendRequest"> | string
    status?: StringFilter<"FriendRequest"> | string
    parentApproved?: BoolFilter<"FriendRequest"> | boolean
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
    fromChild?: XOR<ChildRelationFilter, ChildWhereInput>
    toChild?: XOR<ChildRelationFilter, ChildWhereInput>
  }, "id">

  export type FriendRequestOrderByWithAggregationInput = {
    id?: SortOrder
    fromChildId?: SortOrder
    toChildId?: SortOrder
    status?: SortOrder
    parentApproved?: SortOrder
    createdAt?: SortOrder
    _count?: FriendRequestCountOrderByAggregateInput
    _max?: FriendRequestMaxOrderByAggregateInput
    _min?: FriendRequestMinOrderByAggregateInput
  }

  export type FriendRequestScalarWhereWithAggregatesInput = {
    AND?: FriendRequestScalarWhereWithAggregatesInput | FriendRequestScalarWhereWithAggregatesInput[]
    OR?: FriendRequestScalarWhereWithAggregatesInput[]
    NOT?: FriendRequestScalarWhereWithAggregatesInput | FriendRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FriendRequest"> | string
    fromChildId?: StringWithAggregatesFilter<"FriendRequest"> | string
    toChildId?: StringWithAggregatesFilter<"FriendRequest"> | string
    status?: StringWithAggregatesFilter<"FriendRequest"> | string
    parentApproved?: BoolWithAggregatesFilter<"FriendRequest"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"FriendRequest"> | Date | string
  }

  export type ParentAlertWhereInput = {
    AND?: ParentAlertWhereInput | ParentAlertWhereInput[]
    OR?: ParentAlertWhereInput[]
    NOT?: ParentAlertWhereInput | ParentAlertWhereInput[]
    id?: StringFilter<"ParentAlert"> | string
    childId?: StringFilter<"ParentAlert"> | string
    type?: StringFilter<"ParentAlert"> | string
    title?: StringFilter<"ParentAlert"> | string
    message?: StringFilter<"ParentAlert"> | string
    severity?: StringFilter<"ParentAlert"> | string
    isRead?: BoolFilter<"ParentAlert"> | boolean
    createdAt?: DateTimeFilter<"ParentAlert"> | Date | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }

  export type ParentAlertOrderByWithRelationInput = {
    id?: SortOrder
    childId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    child?: ChildOrderByWithRelationInput
  }

  export type ParentAlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ParentAlertWhereInput | ParentAlertWhereInput[]
    OR?: ParentAlertWhereInput[]
    NOT?: ParentAlertWhereInput | ParentAlertWhereInput[]
    childId?: StringFilter<"ParentAlert"> | string
    type?: StringFilter<"ParentAlert"> | string
    title?: StringFilter<"ParentAlert"> | string
    message?: StringFilter<"ParentAlert"> | string
    severity?: StringFilter<"ParentAlert"> | string
    isRead?: BoolFilter<"ParentAlert"> | boolean
    createdAt?: DateTimeFilter<"ParentAlert"> | Date | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }, "id">

  export type ParentAlertOrderByWithAggregationInput = {
    id?: SortOrder
    childId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: ParentAlertCountOrderByAggregateInput
    _max?: ParentAlertMaxOrderByAggregateInput
    _min?: ParentAlertMinOrderByAggregateInput
  }

  export type ParentAlertScalarWhereWithAggregatesInput = {
    AND?: ParentAlertScalarWhereWithAggregatesInput | ParentAlertScalarWhereWithAggregatesInput[]
    OR?: ParentAlertScalarWhereWithAggregatesInput[]
    NOT?: ParentAlertScalarWhereWithAggregatesInput | ParentAlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ParentAlert"> | string
    childId?: StringWithAggregatesFilter<"ParentAlert"> | string
    type?: StringWithAggregatesFilter<"ParentAlert"> | string
    title?: StringWithAggregatesFilter<"ParentAlert"> | string
    message?: StringWithAggregatesFilter<"ParentAlert"> | string
    severity?: StringWithAggregatesFilter<"ParentAlert"> | string
    isRead?: BoolWithAggregatesFilter<"ParentAlert"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ParentAlert"> | Date | string
  }

  export type ClassroomWhereInput = {
    AND?: ClassroomWhereInput | ClassroomWhereInput[]
    OR?: ClassroomWhereInput[]
    NOT?: ClassroomWhereInput | ClassroomWhereInput[]
    id?: StringFilter<"Classroom"> | string
    name?: StringFilter<"Classroom"> | string
    subject?: StringNullableFilter<"Classroom"> | string | null
    joinCode?: StringFilter<"Classroom"> | string
    grade?: StringNullableFilter<"Classroom"> | string | null
    teacherId?: StringFilter<"Classroom"> | string
    studentIds?: StringFilter<"Classroom"> | string
    createdAt?: DateTimeFilter<"Classroom"> | Date | string
    teacher?: XOR<UserRelationFilter, UserWhereInput>
    lessons?: LessonListRelationFilter
  }

  export type ClassroomOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrderInput | SortOrder
    joinCode?: SortOrder
    grade?: SortOrderInput | SortOrder
    teacherId?: SortOrder
    studentIds?: SortOrder
    createdAt?: SortOrder
    teacher?: UserOrderByWithRelationInput
    lessons?: LessonOrderByRelationAggregateInput
  }

  export type ClassroomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    joinCode?: string
    AND?: ClassroomWhereInput | ClassroomWhereInput[]
    OR?: ClassroomWhereInput[]
    NOT?: ClassroomWhereInput | ClassroomWhereInput[]
    name?: StringFilter<"Classroom"> | string
    subject?: StringNullableFilter<"Classroom"> | string | null
    grade?: StringNullableFilter<"Classroom"> | string | null
    teacherId?: StringFilter<"Classroom"> | string
    studentIds?: StringFilter<"Classroom"> | string
    createdAt?: DateTimeFilter<"Classroom"> | Date | string
    teacher?: XOR<UserRelationFilter, UserWhereInput>
    lessons?: LessonListRelationFilter
  }, "id" | "joinCode">

  export type ClassroomOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrderInput | SortOrder
    joinCode?: SortOrder
    grade?: SortOrderInput | SortOrder
    teacherId?: SortOrder
    studentIds?: SortOrder
    createdAt?: SortOrder
    _count?: ClassroomCountOrderByAggregateInput
    _max?: ClassroomMaxOrderByAggregateInput
    _min?: ClassroomMinOrderByAggregateInput
  }

  export type ClassroomScalarWhereWithAggregatesInput = {
    AND?: ClassroomScalarWhereWithAggregatesInput | ClassroomScalarWhereWithAggregatesInput[]
    OR?: ClassroomScalarWhereWithAggregatesInput[]
    NOT?: ClassroomScalarWhereWithAggregatesInput | ClassroomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Classroom"> | string
    name?: StringWithAggregatesFilter<"Classroom"> | string
    subject?: StringNullableWithAggregatesFilter<"Classroom"> | string | null
    joinCode?: StringWithAggregatesFilter<"Classroom"> | string
    grade?: StringNullableWithAggregatesFilter<"Classroom"> | string | null
    teacherId?: StringWithAggregatesFilter<"Classroom"> | string
    studentIds?: StringWithAggregatesFilter<"Classroom"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Classroom"> | Date | string
  }

  export type LessonWhereInput = {
    AND?: LessonWhereInput | LessonWhereInput[]
    OR?: LessonWhereInput[]
    NOT?: LessonWhereInput | LessonWhereInput[]
    id?: StringFilter<"Lesson"> | string
    classroomId?: StringFilter<"Lesson"> | string
    title?: StringFilter<"Lesson"> | string
    description?: StringNullableFilter<"Lesson"> | string | null
    contentUrl?: StringNullableFilter<"Lesson"> | string | null
    quizId?: StringNullableFilter<"Lesson"> | string | null
    order?: IntFilter<"Lesson"> | number
    createdAt?: DateTimeFilter<"Lesson"> | Date | string
    classroom?: XOR<ClassroomRelationFilter, ClassroomWhereInput>
  }

  export type LessonOrderByWithRelationInput = {
    id?: SortOrder
    classroomId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    contentUrl?: SortOrderInput | SortOrder
    quizId?: SortOrderInput | SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    classroom?: ClassroomOrderByWithRelationInput
  }

  export type LessonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LessonWhereInput | LessonWhereInput[]
    OR?: LessonWhereInput[]
    NOT?: LessonWhereInput | LessonWhereInput[]
    classroomId?: StringFilter<"Lesson"> | string
    title?: StringFilter<"Lesson"> | string
    description?: StringNullableFilter<"Lesson"> | string | null
    contentUrl?: StringNullableFilter<"Lesson"> | string | null
    quizId?: StringNullableFilter<"Lesson"> | string | null
    order?: IntFilter<"Lesson"> | number
    createdAt?: DateTimeFilter<"Lesson"> | Date | string
    classroom?: XOR<ClassroomRelationFilter, ClassroomWhereInput>
  }, "id">

  export type LessonOrderByWithAggregationInput = {
    id?: SortOrder
    classroomId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    contentUrl?: SortOrderInput | SortOrder
    quizId?: SortOrderInput | SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    _count?: LessonCountOrderByAggregateInput
    _avg?: LessonAvgOrderByAggregateInput
    _max?: LessonMaxOrderByAggregateInput
    _min?: LessonMinOrderByAggregateInput
    _sum?: LessonSumOrderByAggregateInput
  }

  export type LessonScalarWhereWithAggregatesInput = {
    AND?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[]
    OR?: LessonScalarWhereWithAggregatesInput[]
    NOT?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lesson"> | string
    classroomId?: StringWithAggregatesFilter<"Lesson"> | string
    title?: StringWithAggregatesFilter<"Lesson"> | string
    description?: StringNullableWithAggregatesFilter<"Lesson"> | string | null
    contentUrl?: StringNullableWithAggregatesFilter<"Lesson"> | string | null
    quizId?: StringNullableWithAggregatesFilter<"Lesson"> | string | null
    order?: IntWithAggregatesFilter<"Lesson"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Lesson"> | Date | string
  }

  export type ActivityFeedWhereInput = {
    AND?: ActivityFeedWhereInput | ActivityFeedWhereInput[]
    OR?: ActivityFeedWhereInput[]
    NOT?: ActivityFeedWhereInput | ActivityFeedWhereInput[]
    id?: StringFilter<"ActivityFeed"> | string
    childId?: StringFilter<"ActivityFeed"> | string
    type?: StringFilter<"ActivityFeed"> | string
    title?: StringFilter<"ActivityFeed"> | string
    description?: StringNullableFilter<"ActivityFeed"> | string | null
    xpEarned?: IntFilter<"ActivityFeed"> | number
    metadata?: StringNullableFilter<"ActivityFeed"> | string | null
    createdAt?: DateTimeFilter<"ActivityFeed"> | Date | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }

  export type ActivityFeedOrderByWithRelationInput = {
    id?: SortOrder
    childId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    xpEarned?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    child?: ChildOrderByWithRelationInput
  }

  export type ActivityFeedWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityFeedWhereInput | ActivityFeedWhereInput[]
    OR?: ActivityFeedWhereInput[]
    NOT?: ActivityFeedWhereInput | ActivityFeedWhereInput[]
    childId?: StringFilter<"ActivityFeed"> | string
    type?: StringFilter<"ActivityFeed"> | string
    title?: StringFilter<"ActivityFeed"> | string
    description?: StringNullableFilter<"ActivityFeed"> | string | null
    xpEarned?: IntFilter<"ActivityFeed"> | number
    metadata?: StringNullableFilter<"ActivityFeed"> | string | null
    createdAt?: DateTimeFilter<"ActivityFeed"> | Date | string
    child?: XOR<ChildRelationFilter, ChildWhereInput>
  }, "id">

  export type ActivityFeedOrderByWithAggregationInput = {
    id?: SortOrder
    childId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    xpEarned?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActivityFeedCountOrderByAggregateInput
    _avg?: ActivityFeedAvgOrderByAggregateInput
    _max?: ActivityFeedMaxOrderByAggregateInput
    _min?: ActivityFeedMinOrderByAggregateInput
    _sum?: ActivityFeedSumOrderByAggregateInput
  }

  export type ActivityFeedScalarWhereWithAggregatesInput = {
    AND?: ActivityFeedScalarWhereWithAggregatesInput | ActivityFeedScalarWhereWithAggregatesInput[]
    OR?: ActivityFeedScalarWhereWithAggregatesInput[]
    NOT?: ActivityFeedScalarWhereWithAggregatesInput | ActivityFeedScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityFeed"> | string
    childId?: StringWithAggregatesFilter<"ActivityFeed"> | string
    type?: StringWithAggregatesFilter<"ActivityFeed"> | string
    title?: StringWithAggregatesFilter<"ActivityFeed"> | string
    description?: StringNullableWithAggregatesFilter<"ActivityFeed"> | string | null
    xpEarned?: IntWithAggregatesFilter<"ActivityFeed"> | number
    metadata?: StringNullableWithAggregatesFilter<"ActivityFeed"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActivityFeed"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    receiverId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    type?: StringFilter<"Message"> | string
    isRead?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    sender?: XOR<UserRelationFilter, UserWhereInput>
    receiver?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    sender?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    senderId?: StringFilter<"Message"> | string
    receiverId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    type?: StringFilter<"Message"> | string
    isRead?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    sender?: XOR<UserRelationFilter, UserWhereInput>
    receiver?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    senderId?: StringWithAggregatesFilter<"Message"> | string
    receiverId?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    type?: StringWithAggregatesFilter<"Message"> | string
    isRead?: BoolWithAggregatesFilter<"Message"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type PeerChallengeWhereInput = {
    AND?: PeerChallengeWhereInput | PeerChallengeWhereInput[]
    OR?: PeerChallengeWhereInput[]
    NOT?: PeerChallengeWhereInput | PeerChallengeWhereInput[]
    id?: StringFilter<"PeerChallenge"> | string
    challengerId?: StringFilter<"PeerChallenge"> | string
    challengedId?: StringFilter<"PeerChallenge"> | string
    quizId?: StringNullableFilter<"PeerChallenge"> | string | null
    subject?: StringFilter<"PeerChallenge"> | string
    status?: StringFilter<"PeerChallenge"> | string
    challengerScore?: IntNullableFilter<"PeerChallenge"> | number | null
    challengedScore?: IntNullableFilter<"PeerChallenge"> | number | null
    winnerId?: StringNullableFilter<"PeerChallenge"> | string | null
    xpReward?: IntFilter<"PeerChallenge"> | number
    createdAt?: DateTimeFilter<"PeerChallenge"> | Date | string
    challenger?: XOR<ChildRelationFilter, ChildWhereInput>
    challenged?: XOR<ChildRelationFilter, ChildWhereInput>
  }

  export type PeerChallengeOrderByWithRelationInput = {
    id?: SortOrder
    challengerId?: SortOrder
    challengedId?: SortOrder
    quizId?: SortOrderInput | SortOrder
    subject?: SortOrder
    status?: SortOrder
    challengerScore?: SortOrderInput | SortOrder
    challengedScore?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    xpReward?: SortOrder
    createdAt?: SortOrder
    challenger?: ChildOrderByWithRelationInput
    challenged?: ChildOrderByWithRelationInput
  }

  export type PeerChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PeerChallengeWhereInput | PeerChallengeWhereInput[]
    OR?: PeerChallengeWhereInput[]
    NOT?: PeerChallengeWhereInput | PeerChallengeWhereInput[]
    challengerId?: StringFilter<"PeerChallenge"> | string
    challengedId?: StringFilter<"PeerChallenge"> | string
    quizId?: StringNullableFilter<"PeerChallenge"> | string | null
    subject?: StringFilter<"PeerChallenge"> | string
    status?: StringFilter<"PeerChallenge"> | string
    challengerScore?: IntNullableFilter<"PeerChallenge"> | number | null
    challengedScore?: IntNullableFilter<"PeerChallenge"> | number | null
    winnerId?: StringNullableFilter<"PeerChallenge"> | string | null
    xpReward?: IntFilter<"PeerChallenge"> | number
    createdAt?: DateTimeFilter<"PeerChallenge"> | Date | string
    challenger?: XOR<ChildRelationFilter, ChildWhereInput>
    challenged?: XOR<ChildRelationFilter, ChildWhereInput>
  }, "id">

  export type PeerChallengeOrderByWithAggregationInput = {
    id?: SortOrder
    challengerId?: SortOrder
    challengedId?: SortOrder
    quizId?: SortOrderInput | SortOrder
    subject?: SortOrder
    status?: SortOrder
    challengerScore?: SortOrderInput | SortOrder
    challengedScore?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    xpReward?: SortOrder
    createdAt?: SortOrder
    _count?: PeerChallengeCountOrderByAggregateInput
    _avg?: PeerChallengeAvgOrderByAggregateInput
    _max?: PeerChallengeMaxOrderByAggregateInput
    _min?: PeerChallengeMinOrderByAggregateInput
    _sum?: PeerChallengeSumOrderByAggregateInput
  }

  export type PeerChallengeScalarWhereWithAggregatesInput = {
    AND?: PeerChallengeScalarWhereWithAggregatesInput | PeerChallengeScalarWhereWithAggregatesInput[]
    OR?: PeerChallengeScalarWhereWithAggregatesInput[]
    NOT?: PeerChallengeScalarWhereWithAggregatesInput | PeerChallengeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PeerChallenge"> | string
    challengerId?: StringWithAggregatesFilter<"PeerChallenge"> | string
    challengedId?: StringWithAggregatesFilter<"PeerChallenge"> | string
    quizId?: StringNullableWithAggregatesFilter<"PeerChallenge"> | string | null
    subject?: StringWithAggregatesFilter<"PeerChallenge"> | string
    status?: StringWithAggregatesFilter<"PeerChallenge"> | string
    challengerScore?: IntNullableWithAggregatesFilter<"PeerChallenge"> | number | null
    challengedScore?: IntNullableWithAggregatesFilter<"PeerChallenge"> | number | null
    winnerId?: StringNullableWithAggregatesFilter<"PeerChallenge"> | string | null
    xpReward?: IntWithAggregatesFilter<"PeerChallenge"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PeerChallenge"> | Date | string
  }

  export type BadgeWhereInput = {
    AND?: BadgeWhereInput | BadgeWhereInput[]
    OR?: BadgeWhereInput[]
    NOT?: BadgeWhereInput | BadgeWhereInput[]
    id?: StringFilter<"Badge"> | string
    name?: StringFilter<"Badge"> | string
    description?: StringFilter<"Badge"> | string
    icon?: StringFilter<"Badge"> | string
    category?: StringFilter<"Badge"> | string
    requirement?: StringFilter<"Badge"> | string
    xpReward?: IntFilter<"Badge"> | number
  }

  export type BadgeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    category?: SortOrder
    requirement?: SortOrder
    xpReward?: SortOrder
  }

  export type BadgeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BadgeWhereInput | BadgeWhereInput[]
    OR?: BadgeWhereInput[]
    NOT?: BadgeWhereInput | BadgeWhereInput[]
    name?: StringFilter<"Badge"> | string
    description?: StringFilter<"Badge"> | string
    icon?: StringFilter<"Badge"> | string
    category?: StringFilter<"Badge"> | string
    requirement?: StringFilter<"Badge"> | string
    xpReward?: IntFilter<"Badge"> | number
  }, "id">

  export type BadgeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    category?: SortOrder
    requirement?: SortOrder
    xpReward?: SortOrder
    _count?: BadgeCountOrderByAggregateInput
    _avg?: BadgeAvgOrderByAggregateInput
    _max?: BadgeMaxOrderByAggregateInput
    _min?: BadgeMinOrderByAggregateInput
    _sum?: BadgeSumOrderByAggregateInput
  }

  export type BadgeScalarWhereWithAggregatesInput = {
    AND?: BadgeScalarWhereWithAggregatesInput | BadgeScalarWhereWithAggregatesInput[]
    OR?: BadgeScalarWhereWithAggregatesInput[]
    NOT?: BadgeScalarWhereWithAggregatesInput | BadgeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Badge"> | string
    name?: StringWithAggregatesFilter<"Badge"> | string
    description?: StringWithAggregatesFilter<"Badge"> | string
    icon?: StringWithAggregatesFilter<"Badge"> | string
    category?: StringWithAggregatesFilter<"Badge"> | string
    requirement?: StringWithAggregatesFilter<"Badge"> | string
    xpReward?: IntWithAggregatesFilter<"Badge"> | number
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildCreateNestedManyWithoutParentInput
    classrooms?: ClassroomCreateNestedManyWithoutTeacherInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildUncheckedCreateNestedManyWithoutParentInput
    classrooms?: ClassroomUncheckedCreateNestedManyWithoutTeacherInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildUpdateManyWithoutParentNestedInput
    classrooms?: ClassroomUpdateManyWithoutTeacherNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildUncheckedUpdateManyWithoutParentNestedInput
    classrooms?: ClassroomUncheckedUpdateManyWithoutTeacherNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildCreateInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: UserCreateNestedOneWithoutChildrenInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogCreateNestedManyWithoutChildInput
    activities?: ActivityFeedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeCreateNestedManyWithoutChallengedInput
  }

  export type ChildUncheckedCreateInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId: string
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutChildInput
    activities?: ActivityFeedUncheckedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertUncheckedCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengedInput
  }

  export type ChildUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UserUpdateOneRequiredWithoutChildrenNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUncheckedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUncheckedUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUncheckedUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUncheckedUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengedNestedInput
  }

  export type ChildCreateManyInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId: string
  }

  export type ChildUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
  }

  export type ContentCreateInput = {
    id?: string
    title: string
    description?: string | null
    type?: string
    subject: string
    thumbnailUrl?: string | null
    contentUrl: string
    duration?: number | null
    ageMin?: number
    ageMax?: number
    difficulty?: string
    xpReward?: number
    isApproved?: boolean
    createdAt?: Date | string
    watchLogs?: WatchLogCreateNestedManyWithoutContentInput
  }

  export type ContentUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    type?: string
    subject: string
    thumbnailUrl?: string | null
    contentUrl: string
    duration?: number | null
    ageMin?: number
    ageMax?: number
    difficulty?: string
    xpReward?: number
    isApproved?: boolean
    createdAt?: Date | string
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutContentInput
  }

  export type ContentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchLogs?: WatchLogUpdateManyWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchLogs?: WatchLogUncheckedUpdateManyWithoutContentNestedInput
  }

  export type ContentCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    type?: string
    subject: string
    thumbnailUrl?: string | null
    contentUrl: string
    duration?: number | null
    ageMin?: number
    ageMax?: number
    difficulty?: string
    xpReward?: number
    isApproved?: boolean
    createdAt?: Date | string
  }

  export type ContentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchLogCreateInput = {
    id?: string
    watchedAt?: Date | string
    duration?: number
    child: ChildCreateNestedOneWithoutWatchLogsInput
    content: ContentCreateNestedOneWithoutWatchLogsInput
  }

  export type WatchLogUncheckedCreateInput = {
    id?: string
    childId: string
    contentId: string
    watchedAt?: Date | string
    duration?: number
  }

  export type WatchLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    child?: ChildUpdateOneRequiredWithoutWatchLogsNestedInput
    content?: ContentUpdateOneRequiredWithoutWatchLogsNestedInput
  }

  export type WatchLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    contentId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type WatchLogCreateManyInput = {
    id?: string
    childId: string
    contentId: string
    watchedAt?: Date | string
    duration?: number
  }

  export type WatchLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type WatchLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    contentId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type QuizCreateInput = {
    id?: string
    title: string
    subject: string
    difficulty?: string
    questions: string
    xpReward?: number
    timeLimit?: number | null
    ageMin?: number
    ageMax?: number
    createdAt?: Date | string
    createdById?: string | null
    attempts?: QuizAttemptCreateNestedManyWithoutQuizInput
  }

  export type QuizUncheckedCreateInput = {
    id?: string
    title: string
    subject: string
    difficulty?: string
    questions: string
    xpReward?: number
    timeLimit?: number | null
    ageMin?: number
    ageMax?: number
    createdAt?: Date | string
    createdById?: string | null
    attempts?: QuizAttemptUncheckedCreateNestedManyWithoutQuizInput
  }

  export type QuizUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    attempts?: QuizAttemptUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    attempts?: QuizAttemptUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type QuizCreateManyInput = {
    id?: string
    title: string
    subject: string
    difficulty?: string
    questions: string
    xpReward?: number
    timeLimit?: number | null
    ageMin?: number
    ageMax?: number
    createdAt?: Date | string
    createdById?: string | null
  }

  export type QuizUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuizUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuizAttemptCreateInput = {
    id?: string
    score: number
    totalQuestions: number
    answers: string
    timeTaken?: number | null
    difficulty: string
    xpEarned?: number
    completedAt?: Date | string
    child: ChildCreateNestedOneWithoutQuizAttemptsInput
    quiz: QuizCreateNestedOneWithoutAttemptsInput
  }

  export type QuizAttemptUncheckedCreateInput = {
    id?: string
    childId: string
    quizId: string
    score: number
    totalQuestions: number
    answers: string
    timeTaken?: number | null
    difficulty: string
    xpEarned?: number
    completedAt?: Date | string
  }

  export type QuizAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalQuestions?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: ChildUpdateOneRequiredWithoutQuizAttemptsNestedInput
    quiz?: QuizUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type QuizAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalQuestions?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptCreateManyInput = {
    id?: string
    childId: string
    quizId: string
    score: number
    totalQuestions: number
    answers: string
    timeTaken?: number | null
    difficulty: string
    xpEarned?: number
    completedAt?: Date | string
  }

  export type QuizAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalQuestions?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalQuestions?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestCreateInput = {
    id?: string
    status?: string
    parentApproved?: boolean
    createdAt?: Date | string
    fromChild: ChildCreateNestedOneWithoutSentFriendRequestsInput
    toChild: ChildCreateNestedOneWithoutReceivedFriendRequestsInput
  }

  export type FriendRequestUncheckedCreateInput = {
    id?: string
    fromChildId: string
    toChildId: string
    status?: string
    parentApproved?: boolean
    createdAt?: Date | string
  }

  export type FriendRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parentApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromChild?: ChildUpdateOneRequiredWithoutSentFriendRequestsNestedInput
    toChild?: ChildUpdateOneRequiredWithoutReceivedFriendRequestsNestedInput
  }

  export type FriendRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromChildId?: StringFieldUpdateOperationsInput | string
    toChildId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parentApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestCreateManyInput = {
    id?: string
    fromChildId: string
    toChildId: string
    status?: string
    parentApproved?: boolean
    createdAt?: Date | string
  }

  export type FriendRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parentApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromChildId?: StringFieldUpdateOperationsInput | string
    toChildId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parentApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentAlertCreateInput = {
    id?: string
    type: string
    title: string
    message: string
    severity?: string
    isRead?: boolean
    createdAt?: Date | string
    child: ChildCreateNestedOneWithoutAlertsInput
  }

  export type ParentAlertUncheckedCreateInput = {
    id?: string
    childId: string
    type: string
    title: string
    message: string
    severity?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ParentAlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: ChildUpdateOneRequiredWithoutAlertsNestedInput
  }

  export type ParentAlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentAlertCreateManyInput = {
    id?: string
    childId: string
    type: string
    title: string
    message: string
    severity?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ParentAlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentAlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassroomCreateInput = {
    id?: string
    name: string
    subject?: string | null
    joinCode: string
    grade?: string | null
    studentIds?: string
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutClassroomsInput
    lessons?: LessonCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUncheckedCreateInput = {
    id?: string
    name: string
    subject?: string | null
    joinCode: string
    grade?: string | null
    teacherId: string
    studentIds?: string
    createdAt?: Date | string
    lessons?: LessonUncheckedCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    joinCode?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    studentIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutClassroomsNestedInput
    lessons?: LessonUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    joinCode?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: StringFieldUpdateOperationsInput | string
    studentIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessons?: LessonUncheckedUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomCreateManyInput = {
    id?: string
    name: string
    subject?: string | null
    joinCode: string
    grade?: string | null
    teacherId: string
    studentIds?: string
    createdAt?: Date | string
  }

  export type ClassroomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    joinCode?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    studentIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassroomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    joinCode?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: StringFieldUpdateOperationsInput | string
    studentIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonCreateInput = {
    id?: string
    title: string
    description?: string | null
    contentUrl?: string | null
    quizId?: string | null
    order?: number
    createdAt?: Date | string
    classroom: ClassroomCreateNestedOneWithoutLessonsInput
  }

  export type LessonUncheckedCreateInput = {
    id?: string
    classroomId: string
    title: string
    description?: string | null
    contentUrl?: string | null
    quizId?: string | null
    order?: number
    createdAt?: Date | string
  }

  export type LessonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroom?: ClassroomUpdateOneRequiredWithoutLessonsNestedInput
  }

  export type LessonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    classroomId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonCreateManyInput = {
    id?: string
    classroomId: string
    title: string
    description?: string | null
    contentUrl?: string | null
    quizId?: string | null
    order?: number
    createdAt?: Date | string
  }

  export type LessonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    classroomId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityFeedCreateInput = {
    id?: string
    type: string
    title: string
    description?: string | null
    xpEarned?: number
    metadata?: string | null
    createdAt?: Date | string
    child: ChildCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityFeedUncheckedCreateInput = {
    id?: string
    childId: string
    type: string
    title: string
    description?: string | null
    xpEarned?: number
    metadata?: string | null
    createdAt?: Date | string
  }

  export type ActivityFeedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: ChildUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityFeedUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityFeedCreateManyInput = {
    id?: string
    childId: string
    type: string
    title: string
    description?: string | null
    xpEarned?: number
    metadata?: string | null
    createdAt?: Date | string
  }

  export type ActivityFeedUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityFeedUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutSentMessagesInput
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    senderId: string
    receiverId: string
    content: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    senderId: string
    receiverId: string
    content: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeerChallengeCreateInput = {
    id?: string
    quizId?: string | null
    subject: string
    status?: string
    challengerScore?: number | null
    challengedScore?: number | null
    winnerId?: string | null
    xpReward?: number
    createdAt?: Date | string
    challenger: ChildCreateNestedOneWithoutSentChallengesInput
    challenged: ChildCreateNestedOneWithoutReceivedChallengesInput
  }

  export type PeerChallengeUncheckedCreateInput = {
    id?: string
    challengerId: string
    challengedId: string
    quizId?: string | null
    subject: string
    status?: string
    challengerScore?: number | null
    challengedScore?: number | null
    winnerId?: string | null
    xpReward?: number
    createdAt?: Date | string
  }

  export type PeerChallengeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    challengerScore?: NullableIntFieldUpdateOperationsInput | number | null
    challengedScore?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    xpReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenger?: ChildUpdateOneRequiredWithoutSentChallengesNestedInput
    challenged?: ChildUpdateOneRequiredWithoutReceivedChallengesNestedInput
  }

  export type PeerChallengeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengerId?: StringFieldUpdateOperationsInput | string
    challengedId?: StringFieldUpdateOperationsInput | string
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    challengerScore?: NullableIntFieldUpdateOperationsInput | number | null
    challengedScore?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    xpReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeerChallengeCreateManyInput = {
    id?: string
    challengerId: string
    challengedId: string
    quizId?: string | null
    subject: string
    status?: string
    challengerScore?: number | null
    challengedScore?: number | null
    winnerId?: string | null
    xpReward?: number
    createdAt?: Date | string
  }

  export type PeerChallengeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    challengerScore?: NullableIntFieldUpdateOperationsInput | number | null
    challengedScore?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    xpReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeerChallengeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengerId?: StringFieldUpdateOperationsInput | string
    challengedId?: StringFieldUpdateOperationsInput | string
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    challengerScore?: NullableIntFieldUpdateOperationsInput | number | null
    challengedScore?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    xpReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadgeCreateInput = {
    id?: string
    name: string
    description: string
    icon: string
    category: string
    requirement: string
    xpReward?: number
  }

  export type BadgeUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    icon: string
    category: string
    requirement: string
    xpReward?: number
  }

  export type BadgeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requirement?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
  }

  export type BadgeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requirement?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
  }

  export type BadgeCreateManyInput = {
    id?: string
    name: string
    description: string
    icon: string
    category: string
    requirement: string
    xpReward?: number
  }

  export type BadgeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requirement?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
  }

  export type BadgeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requirement?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ChildListRelationFilter = {
    every?: ChildWhereInput
    some?: ChildWhereInput
    none?: ChildWhereInput
  }

  export type ClassroomListRelationFilter = {
    every?: ClassroomWhereInput
    some?: ClassroomWhereInput
    none?: ClassroomWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ChildOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassroomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type QuizAttemptListRelationFilter = {
    every?: QuizAttemptWhereInput
    some?: QuizAttemptWhereInput
    none?: QuizAttemptWhereInput
  }

  export type WatchLogListRelationFilter = {
    every?: WatchLogWhereInput
    some?: WatchLogWhereInput
    none?: WatchLogWhereInput
  }

  export type ActivityFeedListRelationFilter = {
    every?: ActivityFeedWhereInput
    some?: ActivityFeedWhereInput
    none?: ActivityFeedWhereInput
  }

  export type ParentAlertListRelationFilter = {
    every?: ParentAlertWhereInput
    some?: ParentAlertWhereInput
    none?: ParentAlertWhereInput
  }

  export type FriendRequestListRelationFilter = {
    every?: FriendRequestWhereInput
    some?: FriendRequestWhereInput
    none?: FriendRequestWhereInput
  }

  export type PeerChallengeListRelationFilter = {
    every?: PeerChallengeWhereInput
    some?: PeerChallengeWhereInput
    none?: PeerChallengeWhereInput
  }

  export type QuizAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WatchLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityFeedOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParentAlertOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FriendRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PeerChallengeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChildCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    grade?: SortOrder
    avatar?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
    lastActiveDate?: SortOrder
    totalQuizzes?: SortOrder
    totalWatchTime?: SortOrder
    screenTimeLimit?: SortOrder
    badges?: SortOrder
    weakSubjects?: SortOrder
    strongSubjects?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentId?: SortOrder
  }

  export type ChildAvgOrderByAggregateInput = {
    age?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
    totalQuizzes?: SortOrder
    totalWatchTime?: SortOrder
    screenTimeLimit?: SortOrder
  }

  export type ChildMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    grade?: SortOrder
    avatar?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
    lastActiveDate?: SortOrder
    totalQuizzes?: SortOrder
    totalWatchTime?: SortOrder
    screenTimeLimit?: SortOrder
    badges?: SortOrder
    weakSubjects?: SortOrder
    strongSubjects?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentId?: SortOrder
  }

  export type ChildMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    grade?: SortOrder
    avatar?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
    lastActiveDate?: SortOrder
    totalQuizzes?: SortOrder
    totalWatchTime?: SortOrder
    screenTimeLimit?: SortOrder
    badges?: SortOrder
    weakSubjects?: SortOrder
    strongSubjects?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentId?: SortOrder
  }

  export type ChildSumOrderByAggregateInput = {
    age?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
    totalQuizzes?: SortOrder
    totalWatchTime?: SortOrder
    screenTimeLimit?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ContentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    thumbnailUrl?: SortOrder
    contentUrl?: SortOrder
    duration?: SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    difficulty?: SortOrder
    xpReward?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
  }

  export type ContentAvgOrderByAggregateInput = {
    duration?: SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    xpReward?: SortOrder
  }

  export type ContentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    thumbnailUrl?: SortOrder
    contentUrl?: SortOrder
    duration?: SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    difficulty?: SortOrder
    xpReward?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
  }

  export type ContentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    thumbnailUrl?: SortOrder
    contentUrl?: SortOrder
    duration?: SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    difficulty?: SortOrder
    xpReward?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
  }

  export type ContentSumOrderByAggregateInput = {
    duration?: SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    xpReward?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ChildRelationFilter = {
    is?: ChildWhereInput
    isNot?: ChildWhereInput
  }

  export type ContentRelationFilter = {
    is?: ContentWhereInput
    isNot?: ContentWhereInput
  }

  export type WatchLogCountOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    contentId?: SortOrder
    watchedAt?: SortOrder
    duration?: SortOrder
  }

  export type WatchLogAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type WatchLogMaxOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    contentId?: SortOrder
    watchedAt?: SortOrder
    duration?: SortOrder
  }

  export type WatchLogMinOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    contentId?: SortOrder
    watchedAt?: SortOrder
    duration?: SortOrder
  }

  export type WatchLogSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type QuizCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subject?: SortOrder
    difficulty?: SortOrder
    questions?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
  }

  export type QuizAvgOrderByAggregateInput = {
    xpReward?: SortOrder
    timeLimit?: SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
  }

  export type QuizMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subject?: SortOrder
    difficulty?: SortOrder
    questions?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
  }

  export type QuizMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subject?: SortOrder
    difficulty?: SortOrder
    questions?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
  }

  export type QuizSumOrderByAggregateInput = {
    xpReward?: SortOrder
    timeLimit?: SortOrder
    ageMin?: SortOrder
    ageMax?: SortOrder
  }

  export type QuizRelationFilter = {
    is?: QuizWhereInput
    isNot?: QuizWhereInput
  }

  export type QuizAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    totalQuestions?: SortOrder
    answers?: SortOrder
    timeTaken?: SortOrder
    difficulty?: SortOrder
    xpEarned?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizAttemptAvgOrderByAggregateInput = {
    score?: SortOrder
    totalQuestions?: SortOrder
    timeTaken?: SortOrder
    xpEarned?: SortOrder
  }

  export type QuizAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    totalQuestions?: SortOrder
    answers?: SortOrder
    timeTaken?: SortOrder
    difficulty?: SortOrder
    xpEarned?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    totalQuestions?: SortOrder
    answers?: SortOrder
    timeTaken?: SortOrder
    difficulty?: SortOrder
    xpEarned?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizAttemptSumOrderByAggregateInput = {
    score?: SortOrder
    totalQuestions?: SortOrder
    timeTaken?: SortOrder
    xpEarned?: SortOrder
  }

  export type FriendRequestCountOrderByAggregateInput = {
    id?: SortOrder
    fromChildId?: SortOrder
    toChildId?: SortOrder
    status?: SortOrder
    parentApproved?: SortOrder
    createdAt?: SortOrder
  }

  export type FriendRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    fromChildId?: SortOrder
    toChildId?: SortOrder
    status?: SortOrder
    parentApproved?: SortOrder
    createdAt?: SortOrder
  }

  export type FriendRequestMinOrderByAggregateInput = {
    id?: SortOrder
    fromChildId?: SortOrder
    toChildId?: SortOrder
    status?: SortOrder
    parentApproved?: SortOrder
    createdAt?: SortOrder
  }

  export type ParentAlertCountOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type ParentAlertMaxOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type ParentAlertMinOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonListRelationFilter = {
    every?: LessonWhereInput
    some?: LessonWhereInput
    none?: LessonWhereInput
  }

  export type LessonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassroomCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    joinCode?: SortOrder
    grade?: SortOrder
    teacherId?: SortOrder
    studentIds?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassroomMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    joinCode?: SortOrder
    grade?: SortOrder
    teacherId?: SortOrder
    studentIds?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassroomMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    joinCode?: SortOrder
    grade?: SortOrder
    teacherId?: SortOrder
    studentIds?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassroomRelationFilter = {
    is?: ClassroomWhereInput
    isNot?: ClassroomWhereInput
  }

  export type LessonCountOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    contentUrl?: SortOrder
    quizId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type LessonMaxOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    contentUrl?: SortOrder
    quizId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonMinOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    contentUrl?: SortOrder
    quizId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ActivityFeedCountOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    xpEarned?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityFeedAvgOrderByAggregateInput = {
    xpEarned?: SortOrder
  }

  export type ActivityFeedMaxOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    xpEarned?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityFeedMinOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    xpEarned?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityFeedSumOrderByAggregateInput = {
    xpEarned?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type PeerChallengeCountOrderByAggregateInput = {
    id?: SortOrder
    challengerId?: SortOrder
    challengedId?: SortOrder
    quizId?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    challengerScore?: SortOrder
    challengedScore?: SortOrder
    winnerId?: SortOrder
    xpReward?: SortOrder
    createdAt?: SortOrder
  }

  export type PeerChallengeAvgOrderByAggregateInput = {
    challengerScore?: SortOrder
    challengedScore?: SortOrder
    xpReward?: SortOrder
  }

  export type PeerChallengeMaxOrderByAggregateInput = {
    id?: SortOrder
    challengerId?: SortOrder
    challengedId?: SortOrder
    quizId?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    challengerScore?: SortOrder
    challengedScore?: SortOrder
    winnerId?: SortOrder
    xpReward?: SortOrder
    createdAt?: SortOrder
  }

  export type PeerChallengeMinOrderByAggregateInput = {
    id?: SortOrder
    challengerId?: SortOrder
    challengedId?: SortOrder
    quizId?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    challengerScore?: SortOrder
    challengedScore?: SortOrder
    winnerId?: SortOrder
    xpReward?: SortOrder
    createdAt?: SortOrder
  }

  export type PeerChallengeSumOrderByAggregateInput = {
    challengerScore?: SortOrder
    challengedScore?: SortOrder
    xpReward?: SortOrder
  }

  export type BadgeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    category?: SortOrder
    requirement?: SortOrder
    xpReward?: SortOrder
  }

  export type BadgeAvgOrderByAggregateInput = {
    xpReward?: SortOrder
  }

  export type BadgeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    category?: SortOrder
    requirement?: SortOrder
    xpReward?: SortOrder
  }

  export type BadgeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    category?: SortOrder
    requirement?: SortOrder
    xpReward?: SortOrder
  }

  export type BadgeSumOrderByAggregateInput = {
    xpReward?: SortOrder
  }

  export type ChildCreateNestedManyWithoutParentInput = {
    create?: XOR<ChildCreateWithoutParentInput, ChildUncheckedCreateWithoutParentInput> | ChildCreateWithoutParentInput[] | ChildUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ChildCreateOrConnectWithoutParentInput | ChildCreateOrConnectWithoutParentInput[]
    createMany?: ChildCreateManyParentInputEnvelope
    connect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
  }

  export type ClassroomCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ClassroomCreateWithoutTeacherInput, ClassroomUncheckedCreateWithoutTeacherInput> | ClassroomCreateWithoutTeacherInput[] | ClassroomUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutTeacherInput | ClassroomCreateOrConnectWithoutTeacherInput[]
    createMany?: ClassroomCreateManyTeacherInputEnvelope
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ChildUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<ChildCreateWithoutParentInput, ChildUncheckedCreateWithoutParentInput> | ChildCreateWithoutParentInput[] | ChildUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ChildCreateOrConnectWithoutParentInput | ChildCreateOrConnectWithoutParentInput[]
    createMany?: ChildCreateManyParentInputEnvelope
    connect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
  }

  export type ClassroomUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ClassroomCreateWithoutTeacherInput, ClassroomUncheckedCreateWithoutTeacherInput> | ClassroomCreateWithoutTeacherInput[] | ClassroomUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutTeacherInput | ClassroomCreateOrConnectWithoutTeacherInput[]
    createMany?: ClassroomCreateManyTeacherInputEnvelope
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ChildUpdateManyWithoutParentNestedInput = {
    create?: XOR<ChildCreateWithoutParentInput, ChildUncheckedCreateWithoutParentInput> | ChildCreateWithoutParentInput[] | ChildUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ChildCreateOrConnectWithoutParentInput | ChildCreateOrConnectWithoutParentInput[]
    upsert?: ChildUpsertWithWhereUniqueWithoutParentInput | ChildUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ChildCreateManyParentInputEnvelope
    set?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    disconnect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    delete?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    connect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    update?: ChildUpdateWithWhereUniqueWithoutParentInput | ChildUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ChildUpdateManyWithWhereWithoutParentInput | ChildUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ChildScalarWhereInput | ChildScalarWhereInput[]
  }

  export type ClassroomUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ClassroomCreateWithoutTeacherInput, ClassroomUncheckedCreateWithoutTeacherInput> | ClassroomCreateWithoutTeacherInput[] | ClassroomUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutTeacherInput | ClassroomCreateOrConnectWithoutTeacherInput[]
    upsert?: ClassroomUpsertWithWhereUniqueWithoutTeacherInput | ClassroomUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ClassroomCreateManyTeacherInputEnvelope
    set?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    disconnect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    delete?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    update?: ClassroomUpdateWithWhereUniqueWithoutTeacherInput | ClassroomUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ClassroomUpdateManyWithWhereWithoutTeacherInput | ClassroomUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ChildUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<ChildCreateWithoutParentInput, ChildUncheckedCreateWithoutParentInput> | ChildCreateWithoutParentInput[] | ChildUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ChildCreateOrConnectWithoutParentInput | ChildCreateOrConnectWithoutParentInput[]
    upsert?: ChildUpsertWithWhereUniqueWithoutParentInput | ChildUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ChildCreateManyParentInputEnvelope
    set?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    disconnect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    delete?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    connect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    update?: ChildUpdateWithWhereUniqueWithoutParentInput | ChildUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ChildUpdateManyWithWhereWithoutParentInput | ChildUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ChildScalarWhereInput | ChildScalarWhereInput[]
  }

  export type ClassroomUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ClassroomCreateWithoutTeacherInput, ClassroomUncheckedCreateWithoutTeacherInput> | ClassroomCreateWithoutTeacherInput[] | ClassroomUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutTeacherInput | ClassroomCreateOrConnectWithoutTeacherInput[]
    upsert?: ClassroomUpsertWithWhereUniqueWithoutTeacherInput | ClassroomUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ClassroomCreateManyTeacherInputEnvelope
    set?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    disconnect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    delete?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    update?: ClassroomUpdateWithWhereUniqueWithoutTeacherInput | ClassroomUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ClassroomUpdateManyWithWhereWithoutTeacherInput | ClassroomUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutChildrenInput = {
    create?: XOR<UserCreateWithoutChildrenInput, UserUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: UserCreateOrConnectWithoutChildrenInput
    connect?: UserWhereUniqueInput
  }

  export type QuizAttemptCreateNestedManyWithoutChildInput = {
    create?: XOR<QuizAttemptCreateWithoutChildInput, QuizAttemptUncheckedCreateWithoutChildInput> | QuizAttemptCreateWithoutChildInput[] | QuizAttemptUncheckedCreateWithoutChildInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutChildInput | QuizAttemptCreateOrConnectWithoutChildInput[]
    createMany?: QuizAttemptCreateManyChildInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type WatchLogCreateNestedManyWithoutChildInput = {
    create?: XOR<WatchLogCreateWithoutChildInput, WatchLogUncheckedCreateWithoutChildInput> | WatchLogCreateWithoutChildInput[] | WatchLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutChildInput | WatchLogCreateOrConnectWithoutChildInput[]
    createMany?: WatchLogCreateManyChildInputEnvelope
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
  }

  export type ActivityFeedCreateNestedManyWithoutChildInput = {
    create?: XOR<ActivityFeedCreateWithoutChildInput, ActivityFeedUncheckedCreateWithoutChildInput> | ActivityFeedCreateWithoutChildInput[] | ActivityFeedUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ActivityFeedCreateOrConnectWithoutChildInput | ActivityFeedCreateOrConnectWithoutChildInput[]
    createMany?: ActivityFeedCreateManyChildInputEnvelope
    connect?: ActivityFeedWhereUniqueInput | ActivityFeedWhereUniqueInput[]
  }

  export type ParentAlertCreateNestedManyWithoutChildInput = {
    create?: XOR<ParentAlertCreateWithoutChildInput, ParentAlertUncheckedCreateWithoutChildInput> | ParentAlertCreateWithoutChildInput[] | ParentAlertUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ParentAlertCreateOrConnectWithoutChildInput | ParentAlertCreateOrConnectWithoutChildInput[]
    createMany?: ParentAlertCreateManyChildInputEnvelope
    connect?: ParentAlertWhereUniqueInput | ParentAlertWhereUniqueInput[]
  }

  export type FriendRequestCreateNestedManyWithoutFromChildInput = {
    create?: XOR<FriendRequestCreateWithoutFromChildInput, FriendRequestUncheckedCreateWithoutFromChildInput> | FriendRequestCreateWithoutFromChildInput[] | FriendRequestUncheckedCreateWithoutFromChildInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutFromChildInput | FriendRequestCreateOrConnectWithoutFromChildInput[]
    createMany?: FriendRequestCreateManyFromChildInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type FriendRequestCreateNestedManyWithoutToChildInput = {
    create?: XOR<FriendRequestCreateWithoutToChildInput, FriendRequestUncheckedCreateWithoutToChildInput> | FriendRequestCreateWithoutToChildInput[] | FriendRequestUncheckedCreateWithoutToChildInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutToChildInput | FriendRequestCreateOrConnectWithoutToChildInput[]
    createMany?: FriendRequestCreateManyToChildInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type PeerChallengeCreateNestedManyWithoutChallengerInput = {
    create?: XOR<PeerChallengeCreateWithoutChallengerInput, PeerChallengeUncheckedCreateWithoutChallengerInput> | PeerChallengeCreateWithoutChallengerInput[] | PeerChallengeUncheckedCreateWithoutChallengerInput[]
    connectOrCreate?: PeerChallengeCreateOrConnectWithoutChallengerInput | PeerChallengeCreateOrConnectWithoutChallengerInput[]
    createMany?: PeerChallengeCreateManyChallengerInputEnvelope
    connect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
  }

  export type PeerChallengeCreateNestedManyWithoutChallengedInput = {
    create?: XOR<PeerChallengeCreateWithoutChallengedInput, PeerChallengeUncheckedCreateWithoutChallengedInput> | PeerChallengeCreateWithoutChallengedInput[] | PeerChallengeUncheckedCreateWithoutChallengedInput[]
    connectOrCreate?: PeerChallengeCreateOrConnectWithoutChallengedInput | PeerChallengeCreateOrConnectWithoutChallengedInput[]
    createMany?: PeerChallengeCreateManyChallengedInputEnvelope
    connect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
  }

  export type QuizAttemptUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<QuizAttemptCreateWithoutChildInput, QuizAttemptUncheckedCreateWithoutChildInput> | QuizAttemptCreateWithoutChildInput[] | QuizAttemptUncheckedCreateWithoutChildInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutChildInput | QuizAttemptCreateOrConnectWithoutChildInput[]
    createMany?: QuizAttemptCreateManyChildInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type WatchLogUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<WatchLogCreateWithoutChildInput, WatchLogUncheckedCreateWithoutChildInput> | WatchLogCreateWithoutChildInput[] | WatchLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutChildInput | WatchLogCreateOrConnectWithoutChildInput[]
    createMany?: WatchLogCreateManyChildInputEnvelope
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
  }

  export type ActivityFeedUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<ActivityFeedCreateWithoutChildInput, ActivityFeedUncheckedCreateWithoutChildInput> | ActivityFeedCreateWithoutChildInput[] | ActivityFeedUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ActivityFeedCreateOrConnectWithoutChildInput | ActivityFeedCreateOrConnectWithoutChildInput[]
    createMany?: ActivityFeedCreateManyChildInputEnvelope
    connect?: ActivityFeedWhereUniqueInput | ActivityFeedWhereUniqueInput[]
  }

  export type ParentAlertUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<ParentAlertCreateWithoutChildInput, ParentAlertUncheckedCreateWithoutChildInput> | ParentAlertCreateWithoutChildInput[] | ParentAlertUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ParentAlertCreateOrConnectWithoutChildInput | ParentAlertCreateOrConnectWithoutChildInput[]
    createMany?: ParentAlertCreateManyChildInputEnvelope
    connect?: ParentAlertWhereUniqueInput | ParentAlertWhereUniqueInput[]
  }

  export type FriendRequestUncheckedCreateNestedManyWithoutFromChildInput = {
    create?: XOR<FriendRequestCreateWithoutFromChildInput, FriendRequestUncheckedCreateWithoutFromChildInput> | FriendRequestCreateWithoutFromChildInput[] | FriendRequestUncheckedCreateWithoutFromChildInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutFromChildInput | FriendRequestCreateOrConnectWithoutFromChildInput[]
    createMany?: FriendRequestCreateManyFromChildInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type FriendRequestUncheckedCreateNestedManyWithoutToChildInput = {
    create?: XOR<FriendRequestCreateWithoutToChildInput, FriendRequestUncheckedCreateWithoutToChildInput> | FriendRequestCreateWithoutToChildInput[] | FriendRequestUncheckedCreateWithoutToChildInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutToChildInput | FriendRequestCreateOrConnectWithoutToChildInput[]
    createMany?: FriendRequestCreateManyToChildInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type PeerChallengeUncheckedCreateNestedManyWithoutChallengerInput = {
    create?: XOR<PeerChallengeCreateWithoutChallengerInput, PeerChallengeUncheckedCreateWithoutChallengerInput> | PeerChallengeCreateWithoutChallengerInput[] | PeerChallengeUncheckedCreateWithoutChallengerInput[]
    connectOrCreate?: PeerChallengeCreateOrConnectWithoutChallengerInput | PeerChallengeCreateOrConnectWithoutChallengerInput[]
    createMany?: PeerChallengeCreateManyChallengerInputEnvelope
    connect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
  }

  export type PeerChallengeUncheckedCreateNestedManyWithoutChallengedInput = {
    create?: XOR<PeerChallengeCreateWithoutChallengedInput, PeerChallengeUncheckedCreateWithoutChallengedInput> | PeerChallengeCreateWithoutChallengedInput[] | PeerChallengeUncheckedCreateWithoutChallengedInput[]
    connectOrCreate?: PeerChallengeCreateOrConnectWithoutChallengedInput | PeerChallengeCreateOrConnectWithoutChallengedInput[]
    createMany?: PeerChallengeCreateManyChallengedInputEnvelope
    connect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutChildrenNestedInput = {
    create?: XOR<UserCreateWithoutChildrenInput, UserUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: UserCreateOrConnectWithoutChildrenInput
    upsert?: UserUpsertWithoutChildrenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChildrenInput, UserUpdateWithoutChildrenInput>, UserUncheckedUpdateWithoutChildrenInput>
  }

  export type QuizAttemptUpdateManyWithoutChildNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutChildInput, QuizAttemptUncheckedCreateWithoutChildInput> | QuizAttemptCreateWithoutChildInput[] | QuizAttemptUncheckedCreateWithoutChildInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutChildInput | QuizAttemptCreateOrConnectWithoutChildInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutChildInput | QuizAttemptUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: QuizAttemptCreateManyChildInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutChildInput | QuizAttemptUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutChildInput | QuizAttemptUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type WatchLogUpdateManyWithoutChildNestedInput = {
    create?: XOR<WatchLogCreateWithoutChildInput, WatchLogUncheckedCreateWithoutChildInput> | WatchLogCreateWithoutChildInput[] | WatchLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutChildInput | WatchLogCreateOrConnectWithoutChildInput[]
    upsert?: WatchLogUpsertWithWhereUniqueWithoutChildInput | WatchLogUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: WatchLogCreateManyChildInputEnvelope
    set?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    disconnect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    delete?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    update?: WatchLogUpdateWithWhereUniqueWithoutChildInput | WatchLogUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: WatchLogUpdateManyWithWhereWithoutChildInput | WatchLogUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
  }

  export type ActivityFeedUpdateManyWithoutChildNestedInput = {
    create?: XOR<ActivityFeedCreateWithoutChildInput, ActivityFeedUncheckedCreateWithoutChildInput> | ActivityFeedCreateWithoutChildInput[] | ActivityFeedUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ActivityFeedCreateOrConnectWithoutChildInput | ActivityFeedCreateOrConnectWithoutChildInput[]
    upsert?: ActivityFeedUpsertWithWhereUniqueWithoutChildInput | ActivityFeedUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ActivityFeedCreateManyChildInputEnvelope
    set?: ActivityFeedWhereUniqueInput | ActivityFeedWhereUniqueInput[]
    disconnect?: ActivityFeedWhereUniqueInput | ActivityFeedWhereUniqueInput[]
    delete?: ActivityFeedWhereUniqueInput | ActivityFeedWhereUniqueInput[]
    connect?: ActivityFeedWhereUniqueInput | ActivityFeedWhereUniqueInput[]
    update?: ActivityFeedUpdateWithWhereUniqueWithoutChildInput | ActivityFeedUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ActivityFeedUpdateManyWithWhereWithoutChildInput | ActivityFeedUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ActivityFeedScalarWhereInput | ActivityFeedScalarWhereInput[]
  }

  export type ParentAlertUpdateManyWithoutChildNestedInput = {
    create?: XOR<ParentAlertCreateWithoutChildInput, ParentAlertUncheckedCreateWithoutChildInput> | ParentAlertCreateWithoutChildInput[] | ParentAlertUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ParentAlertCreateOrConnectWithoutChildInput | ParentAlertCreateOrConnectWithoutChildInput[]
    upsert?: ParentAlertUpsertWithWhereUniqueWithoutChildInput | ParentAlertUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ParentAlertCreateManyChildInputEnvelope
    set?: ParentAlertWhereUniqueInput | ParentAlertWhereUniqueInput[]
    disconnect?: ParentAlertWhereUniqueInput | ParentAlertWhereUniqueInput[]
    delete?: ParentAlertWhereUniqueInput | ParentAlertWhereUniqueInput[]
    connect?: ParentAlertWhereUniqueInput | ParentAlertWhereUniqueInput[]
    update?: ParentAlertUpdateWithWhereUniqueWithoutChildInput | ParentAlertUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ParentAlertUpdateManyWithWhereWithoutChildInput | ParentAlertUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ParentAlertScalarWhereInput | ParentAlertScalarWhereInput[]
  }

  export type FriendRequestUpdateManyWithoutFromChildNestedInput = {
    create?: XOR<FriendRequestCreateWithoutFromChildInput, FriendRequestUncheckedCreateWithoutFromChildInput> | FriendRequestCreateWithoutFromChildInput[] | FriendRequestUncheckedCreateWithoutFromChildInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutFromChildInput | FriendRequestCreateOrConnectWithoutFromChildInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutFromChildInput | FriendRequestUpsertWithWhereUniqueWithoutFromChildInput[]
    createMany?: FriendRequestCreateManyFromChildInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutFromChildInput | FriendRequestUpdateWithWhereUniqueWithoutFromChildInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutFromChildInput | FriendRequestUpdateManyWithWhereWithoutFromChildInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type FriendRequestUpdateManyWithoutToChildNestedInput = {
    create?: XOR<FriendRequestCreateWithoutToChildInput, FriendRequestUncheckedCreateWithoutToChildInput> | FriendRequestCreateWithoutToChildInput[] | FriendRequestUncheckedCreateWithoutToChildInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutToChildInput | FriendRequestCreateOrConnectWithoutToChildInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutToChildInput | FriendRequestUpsertWithWhereUniqueWithoutToChildInput[]
    createMany?: FriendRequestCreateManyToChildInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutToChildInput | FriendRequestUpdateWithWhereUniqueWithoutToChildInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutToChildInput | FriendRequestUpdateManyWithWhereWithoutToChildInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type PeerChallengeUpdateManyWithoutChallengerNestedInput = {
    create?: XOR<PeerChallengeCreateWithoutChallengerInput, PeerChallengeUncheckedCreateWithoutChallengerInput> | PeerChallengeCreateWithoutChallengerInput[] | PeerChallengeUncheckedCreateWithoutChallengerInput[]
    connectOrCreate?: PeerChallengeCreateOrConnectWithoutChallengerInput | PeerChallengeCreateOrConnectWithoutChallengerInput[]
    upsert?: PeerChallengeUpsertWithWhereUniqueWithoutChallengerInput | PeerChallengeUpsertWithWhereUniqueWithoutChallengerInput[]
    createMany?: PeerChallengeCreateManyChallengerInputEnvelope
    set?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    disconnect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    delete?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    connect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    update?: PeerChallengeUpdateWithWhereUniqueWithoutChallengerInput | PeerChallengeUpdateWithWhereUniqueWithoutChallengerInput[]
    updateMany?: PeerChallengeUpdateManyWithWhereWithoutChallengerInput | PeerChallengeUpdateManyWithWhereWithoutChallengerInput[]
    deleteMany?: PeerChallengeScalarWhereInput | PeerChallengeScalarWhereInput[]
  }

  export type PeerChallengeUpdateManyWithoutChallengedNestedInput = {
    create?: XOR<PeerChallengeCreateWithoutChallengedInput, PeerChallengeUncheckedCreateWithoutChallengedInput> | PeerChallengeCreateWithoutChallengedInput[] | PeerChallengeUncheckedCreateWithoutChallengedInput[]
    connectOrCreate?: PeerChallengeCreateOrConnectWithoutChallengedInput | PeerChallengeCreateOrConnectWithoutChallengedInput[]
    upsert?: PeerChallengeUpsertWithWhereUniqueWithoutChallengedInput | PeerChallengeUpsertWithWhereUniqueWithoutChallengedInput[]
    createMany?: PeerChallengeCreateManyChallengedInputEnvelope
    set?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    disconnect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    delete?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    connect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    update?: PeerChallengeUpdateWithWhereUniqueWithoutChallengedInput | PeerChallengeUpdateWithWhereUniqueWithoutChallengedInput[]
    updateMany?: PeerChallengeUpdateManyWithWhereWithoutChallengedInput | PeerChallengeUpdateManyWithWhereWithoutChallengedInput[]
    deleteMany?: PeerChallengeScalarWhereInput | PeerChallengeScalarWhereInput[]
  }

  export type QuizAttemptUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutChildInput, QuizAttemptUncheckedCreateWithoutChildInput> | QuizAttemptCreateWithoutChildInput[] | QuizAttemptUncheckedCreateWithoutChildInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutChildInput | QuizAttemptCreateOrConnectWithoutChildInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutChildInput | QuizAttemptUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: QuizAttemptCreateManyChildInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutChildInput | QuizAttemptUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutChildInput | QuizAttemptUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type WatchLogUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<WatchLogCreateWithoutChildInput, WatchLogUncheckedCreateWithoutChildInput> | WatchLogCreateWithoutChildInput[] | WatchLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutChildInput | WatchLogCreateOrConnectWithoutChildInput[]
    upsert?: WatchLogUpsertWithWhereUniqueWithoutChildInput | WatchLogUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: WatchLogCreateManyChildInputEnvelope
    set?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    disconnect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    delete?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    update?: WatchLogUpdateWithWhereUniqueWithoutChildInput | WatchLogUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: WatchLogUpdateManyWithWhereWithoutChildInput | WatchLogUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
  }

  export type ActivityFeedUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<ActivityFeedCreateWithoutChildInput, ActivityFeedUncheckedCreateWithoutChildInput> | ActivityFeedCreateWithoutChildInput[] | ActivityFeedUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ActivityFeedCreateOrConnectWithoutChildInput | ActivityFeedCreateOrConnectWithoutChildInput[]
    upsert?: ActivityFeedUpsertWithWhereUniqueWithoutChildInput | ActivityFeedUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ActivityFeedCreateManyChildInputEnvelope
    set?: ActivityFeedWhereUniqueInput | ActivityFeedWhereUniqueInput[]
    disconnect?: ActivityFeedWhereUniqueInput | ActivityFeedWhereUniqueInput[]
    delete?: ActivityFeedWhereUniqueInput | ActivityFeedWhereUniqueInput[]
    connect?: ActivityFeedWhereUniqueInput | ActivityFeedWhereUniqueInput[]
    update?: ActivityFeedUpdateWithWhereUniqueWithoutChildInput | ActivityFeedUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ActivityFeedUpdateManyWithWhereWithoutChildInput | ActivityFeedUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ActivityFeedScalarWhereInput | ActivityFeedScalarWhereInput[]
  }

  export type ParentAlertUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<ParentAlertCreateWithoutChildInput, ParentAlertUncheckedCreateWithoutChildInput> | ParentAlertCreateWithoutChildInput[] | ParentAlertUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ParentAlertCreateOrConnectWithoutChildInput | ParentAlertCreateOrConnectWithoutChildInput[]
    upsert?: ParentAlertUpsertWithWhereUniqueWithoutChildInput | ParentAlertUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ParentAlertCreateManyChildInputEnvelope
    set?: ParentAlertWhereUniqueInput | ParentAlertWhereUniqueInput[]
    disconnect?: ParentAlertWhereUniqueInput | ParentAlertWhereUniqueInput[]
    delete?: ParentAlertWhereUniqueInput | ParentAlertWhereUniqueInput[]
    connect?: ParentAlertWhereUniqueInput | ParentAlertWhereUniqueInput[]
    update?: ParentAlertUpdateWithWhereUniqueWithoutChildInput | ParentAlertUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ParentAlertUpdateManyWithWhereWithoutChildInput | ParentAlertUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ParentAlertScalarWhereInput | ParentAlertScalarWhereInput[]
  }

  export type FriendRequestUncheckedUpdateManyWithoutFromChildNestedInput = {
    create?: XOR<FriendRequestCreateWithoutFromChildInput, FriendRequestUncheckedCreateWithoutFromChildInput> | FriendRequestCreateWithoutFromChildInput[] | FriendRequestUncheckedCreateWithoutFromChildInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutFromChildInput | FriendRequestCreateOrConnectWithoutFromChildInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutFromChildInput | FriendRequestUpsertWithWhereUniqueWithoutFromChildInput[]
    createMany?: FriendRequestCreateManyFromChildInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutFromChildInput | FriendRequestUpdateWithWhereUniqueWithoutFromChildInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutFromChildInput | FriendRequestUpdateManyWithWhereWithoutFromChildInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type FriendRequestUncheckedUpdateManyWithoutToChildNestedInput = {
    create?: XOR<FriendRequestCreateWithoutToChildInput, FriendRequestUncheckedCreateWithoutToChildInput> | FriendRequestCreateWithoutToChildInput[] | FriendRequestUncheckedCreateWithoutToChildInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutToChildInput | FriendRequestCreateOrConnectWithoutToChildInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutToChildInput | FriendRequestUpsertWithWhereUniqueWithoutToChildInput[]
    createMany?: FriendRequestCreateManyToChildInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutToChildInput | FriendRequestUpdateWithWhereUniqueWithoutToChildInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutToChildInput | FriendRequestUpdateManyWithWhereWithoutToChildInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type PeerChallengeUncheckedUpdateManyWithoutChallengerNestedInput = {
    create?: XOR<PeerChallengeCreateWithoutChallengerInput, PeerChallengeUncheckedCreateWithoutChallengerInput> | PeerChallengeCreateWithoutChallengerInput[] | PeerChallengeUncheckedCreateWithoutChallengerInput[]
    connectOrCreate?: PeerChallengeCreateOrConnectWithoutChallengerInput | PeerChallengeCreateOrConnectWithoutChallengerInput[]
    upsert?: PeerChallengeUpsertWithWhereUniqueWithoutChallengerInput | PeerChallengeUpsertWithWhereUniqueWithoutChallengerInput[]
    createMany?: PeerChallengeCreateManyChallengerInputEnvelope
    set?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    disconnect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    delete?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    connect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    update?: PeerChallengeUpdateWithWhereUniqueWithoutChallengerInput | PeerChallengeUpdateWithWhereUniqueWithoutChallengerInput[]
    updateMany?: PeerChallengeUpdateManyWithWhereWithoutChallengerInput | PeerChallengeUpdateManyWithWhereWithoutChallengerInput[]
    deleteMany?: PeerChallengeScalarWhereInput | PeerChallengeScalarWhereInput[]
  }

  export type PeerChallengeUncheckedUpdateManyWithoutChallengedNestedInput = {
    create?: XOR<PeerChallengeCreateWithoutChallengedInput, PeerChallengeUncheckedCreateWithoutChallengedInput> | PeerChallengeCreateWithoutChallengedInput[] | PeerChallengeUncheckedCreateWithoutChallengedInput[]
    connectOrCreate?: PeerChallengeCreateOrConnectWithoutChallengedInput | PeerChallengeCreateOrConnectWithoutChallengedInput[]
    upsert?: PeerChallengeUpsertWithWhereUniqueWithoutChallengedInput | PeerChallengeUpsertWithWhereUniqueWithoutChallengedInput[]
    createMany?: PeerChallengeCreateManyChallengedInputEnvelope
    set?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    disconnect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    delete?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    connect?: PeerChallengeWhereUniqueInput | PeerChallengeWhereUniqueInput[]
    update?: PeerChallengeUpdateWithWhereUniqueWithoutChallengedInput | PeerChallengeUpdateWithWhereUniqueWithoutChallengedInput[]
    updateMany?: PeerChallengeUpdateManyWithWhereWithoutChallengedInput | PeerChallengeUpdateManyWithWhereWithoutChallengedInput[]
    deleteMany?: PeerChallengeScalarWhereInput | PeerChallengeScalarWhereInput[]
  }

  export type WatchLogCreateNestedManyWithoutContentInput = {
    create?: XOR<WatchLogCreateWithoutContentInput, WatchLogUncheckedCreateWithoutContentInput> | WatchLogCreateWithoutContentInput[] | WatchLogUncheckedCreateWithoutContentInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutContentInput | WatchLogCreateOrConnectWithoutContentInput[]
    createMany?: WatchLogCreateManyContentInputEnvelope
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
  }

  export type WatchLogUncheckedCreateNestedManyWithoutContentInput = {
    create?: XOR<WatchLogCreateWithoutContentInput, WatchLogUncheckedCreateWithoutContentInput> | WatchLogCreateWithoutContentInput[] | WatchLogUncheckedCreateWithoutContentInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutContentInput | WatchLogCreateOrConnectWithoutContentInput[]
    createMany?: WatchLogCreateManyContentInputEnvelope
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type WatchLogUpdateManyWithoutContentNestedInput = {
    create?: XOR<WatchLogCreateWithoutContentInput, WatchLogUncheckedCreateWithoutContentInput> | WatchLogCreateWithoutContentInput[] | WatchLogUncheckedCreateWithoutContentInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutContentInput | WatchLogCreateOrConnectWithoutContentInput[]
    upsert?: WatchLogUpsertWithWhereUniqueWithoutContentInput | WatchLogUpsertWithWhereUniqueWithoutContentInput[]
    createMany?: WatchLogCreateManyContentInputEnvelope
    set?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    disconnect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    delete?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    update?: WatchLogUpdateWithWhereUniqueWithoutContentInput | WatchLogUpdateWithWhereUniqueWithoutContentInput[]
    updateMany?: WatchLogUpdateManyWithWhereWithoutContentInput | WatchLogUpdateManyWithWhereWithoutContentInput[]
    deleteMany?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
  }

  export type WatchLogUncheckedUpdateManyWithoutContentNestedInput = {
    create?: XOR<WatchLogCreateWithoutContentInput, WatchLogUncheckedCreateWithoutContentInput> | WatchLogCreateWithoutContentInput[] | WatchLogUncheckedCreateWithoutContentInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutContentInput | WatchLogCreateOrConnectWithoutContentInput[]
    upsert?: WatchLogUpsertWithWhereUniqueWithoutContentInput | WatchLogUpsertWithWhereUniqueWithoutContentInput[]
    createMany?: WatchLogCreateManyContentInputEnvelope
    set?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    disconnect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    delete?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    update?: WatchLogUpdateWithWhereUniqueWithoutContentInput | WatchLogUpdateWithWhereUniqueWithoutContentInput[]
    updateMany?: WatchLogUpdateManyWithWhereWithoutContentInput | WatchLogUpdateManyWithWhereWithoutContentInput[]
    deleteMany?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
  }

  export type ChildCreateNestedOneWithoutWatchLogsInput = {
    create?: XOR<ChildCreateWithoutWatchLogsInput, ChildUncheckedCreateWithoutWatchLogsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutWatchLogsInput
    connect?: ChildWhereUniqueInput
  }

  export type ContentCreateNestedOneWithoutWatchLogsInput = {
    create?: XOR<ContentCreateWithoutWatchLogsInput, ContentUncheckedCreateWithoutWatchLogsInput>
    connectOrCreate?: ContentCreateOrConnectWithoutWatchLogsInput
    connect?: ContentWhereUniqueInput
  }

  export type ChildUpdateOneRequiredWithoutWatchLogsNestedInput = {
    create?: XOR<ChildCreateWithoutWatchLogsInput, ChildUncheckedCreateWithoutWatchLogsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutWatchLogsInput
    upsert?: ChildUpsertWithoutWatchLogsInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutWatchLogsInput, ChildUpdateWithoutWatchLogsInput>, ChildUncheckedUpdateWithoutWatchLogsInput>
  }

  export type ContentUpdateOneRequiredWithoutWatchLogsNestedInput = {
    create?: XOR<ContentCreateWithoutWatchLogsInput, ContentUncheckedCreateWithoutWatchLogsInput>
    connectOrCreate?: ContentCreateOrConnectWithoutWatchLogsInput
    upsert?: ContentUpsertWithoutWatchLogsInput
    connect?: ContentWhereUniqueInput
    update?: XOR<XOR<ContentUpdateToOneWithWhereWithoutWatchLogsInput, ContentUpdateWithoutWatchLogsInput>, ContentUncheckedUpdateWithoutWatchLogsInput>
  }

  export type QuizAttemptCreateNestedManyWithoutQuizInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type QuizAttemptUncheckedCreateNestedManyWithoutQuizInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type QuizAttemptUpdateManyWithoutQuizNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutQuizInput | QuizAttemptUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutQuizInput | QuizAttemptUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutQuizInput | QuizAttemptUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type QuizAttemptUncheckedUpdateManyWithoutQuizNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutQuizInput | QuizAttemptUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutQuizInput | QuizAttemptUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutQuizInput | QuizAttemptUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type ChildCreateNestedOneWithoutQuizAttemptsInput = {
    create?: XOR<ChildCreateWithoutQuizAttemptsInput, ChildUncheckedCreateWithoutQuizAttemptsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutQuizAttemptsInput
    connect?: ChildWhereUniqueInput
  }

  export type QuizCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutAttemptsInput
    connect?: QuizWhereUniqueInput
  }

  export type ChildUpdateOneRequiredWithoutQuizAttemptsNestedInput = {
    create?: XOR<ChildCreateWithoutQuizAttemptsInput, ChildUncheckedCreateWithoutQuizAttemptsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutQuizAttemptsInput
    upsert?: ChildUpsertWithoutQuizAttemptsInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutQuizAttemptsInput, ChildUpdateWithoutQuizAttemptsInput>, ChildUncheckedUpdateWithoutQuizAttemptsInput>
  }

  export type QuizUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutAttemptsInput
    upsert?: QuizUpsertWithoutAttemptsInput
    connect?: QuizWhereUniqueInput
    update?: XOR<XOR<QuizUpdateToOneWithWhereWithoutAttemptsInput, QuizUpdateWithoutAttemptsInput>, QuizUncheckedUpdateWithoutAttemptsInput>
  }

  export type ChildCreateNestedOneWithoutSentFriendRequestsInput = {
    create?: XOR<ChildCreateWithoutSentFriendRequestsInput, ChildUncheckedCreateWithoutSentFriendRequestsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutSentFriendRequestsInput
    connect?: ChildWhereUniqueInput
  }

  export type ChildCreateNestedOneWithoutReceivedFriendRequestsInput = {
    create?: XOR<ChildCreateWithoutReceivedFriendRequestsInput, ChildUncheckedCreateWithoutReceivedFriendRequestsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutReceivedFriendRequestsInput
    connect?: ChildWhereUniqueInput
  }

  export type ChildUpdateOneRequiredWithoutSentFriendRequestsNestedInput = {
    create?: XOR<ChildCreateWithoutSentFriendRequestsInput, ChildUncheckedCreateWithoutSentFriendRequestsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutSentFriendRequestsInput
    upsert?: ChildUpsertWithoutSentFriendRequestsInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutSentFriendRequestsInput, ChildUpdateWithoutSentFriendRequestsInput>, ChildUncheckedUpdateWithoutSentFriendRequestsInput>
  }

  export type ChildUpdateOneRequiredWithoutReceivedFriendRequestsNestedInput = {
    create?: XOR<ChildCreateWithoutReceivedFriendRequestsInput, ChildUncheckedCreateWithoutReceivedFriendRequestsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutReceivedFriendRequestsInput
    upsert?: ChildUpsertWithoutReceivedFriendRequestsInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutReceivedFriendRequestsInput, ChildUpdateWithoutReceivedFriendRequestsInput>, ChildUncheckedUpdateWithoutReceivedFriendRequestsInput>
  }

  export type ChildCreateNestedOneWithoutAlertsInput = {
    create?: XOR<ChildCreateWithoutAlertsInput, ChildUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutAlertsInput
    connect?: ChildWhereUniqueInput
  }

  export type ChildUpdateOneRequiredWithoutAlertsNestedInput = {
    create?: XOR<ChildCreateWithoutAlertsInput, ChildUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutAlertsInput
    upsert?: ChildUpsertWithoutAlertsInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutAlertsInput, ChildUpdateWithoutAlertsInput>, ChildUncheckedUpdateWithoutAlertsInput>
  }

  export type UserCreateNestedOneWithoutClassroomsInput = {
    create?: XOR<UserCreateWithoutClassroomsInput, UserUncheckedCreateWithoutClassroomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClassroomsInput
    connect?: UserWhereUniqueInput
  }

  export type LessonCreateNestedManyWithoutClassroomInput = {
    create?: XOR<LessonCreateWithoutClassroomInput, LessonUncheckedCreateWithoutClassroomInput> | LessonCreateWithoutClassroomInput[] | LessonUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutClassroomInput | LessonCreateOrConnectWithoutClassroomInput[]
    createMany?: LessonCreateManyClassroomInputEnvelope
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
  }

  export type LessonUncheckedCreateNestedManyWithoutClassroomInput = {
    create?: XOR<LessonCreateWithoutClassroomInput, LessonUncheckedCreateWithoutClassroomInput> | LessonCreateWithoutClassroomInput[] | LessonUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutClassroomInput | LessonCreateOrConnectWithoutClassroomInput[]
    createMany?: LessonCreateManyClassroomInputEnvelope
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutClassroomsNestedInput = {
    create?: XOR<UserCreateWithoutClassroomsInput, UserUncheckedCreateWithoutClassroomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClassroomsInput
    upsert?: UserUpsertWithoutClassroomsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClassroomsInput, UserUpdateWithoutClassroomsInput>, UserUncheckedUpdateWithoutClassroomsInput>
  }

  export type LessonUpdateManyWithoutClassroomNestedInput = {
    create?: XOR<LessonCreateWithoutClassroomInput, LessonUncheckedCreateWithoutClassroomInput> | LessonCreateWithoutClassroomInput[] | LessonUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutClassroomInput | LessonCreateOrConnectWithoutClassroomInput[]
    upsert?: LessonUpsertWithWhereUniqueWithoutClassroomInput | LessonUpsertWithWhereUniqueWithoutClassroomInput[]
    createMany?: LessonCreateManyClassroomInputEnvelope
    set?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    update?: LessonUpdateWithWhereUniqueWithoutClassroomInput | LessonUpdateWithWhereUniqueWithoutClassroomInput[]
    updateMany?: LessonUpdateManyWithWhereWithoutClassroomInput | LessonUpdateManyWithWhereWithoutClassroomInput[]
    deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[]
  }

  export type LessonUncheckedUpdateManyWithoutClassroomNestedInput = {
    create?: XOR<LessonCreateWithoutClassroomInput, LessonUncheckedCreateWithoutClassroomInput> | LessonCreateWithoutClassroomInput[] | LessonUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutClassroomInput | LessonCreateOrConnectWithoutClassroomInput[]
    upsert?: LessonUpsertWithWhereUniqueWithoutClassroomInput | LessonUpsertWithWhereUniqueWithoutClassroomInput[]
    createMany?: LessonCreateManyClassroomInputEnvelope
    set?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    update?: LessonUpdateWithWhereUniqueWithoutClassroomInput | LessonUpdateWithWhereUniqueWithoutClassroomInput[]
    updateMany?: LessonUpdateManyWithWhereWithoutClassroomInput | LessonUpdateManyWithWhereWithoutClassroomInput[]
    deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[]
  }

  export type ClassroomCreateNestedOneWithoutLessonsInput = {
    create?: XOR<ClassroomCreateWithoutLessonsInput, ClassroomUncheckedCreateWithoutLessonsInput>
    connectOrCreate?: ClassroomCreateOrConnectWithoutLessonsInput
    connect?: ClassroomWhereUniqueInput
  }

  export type ClassroomUpdateOneRequiredWithoutLessonsNestedInput = {
    create?: XOR<ClassroomCreateWithoutLessonsInput, ClassroomUncheckedCreateWithoutLessonsInput>
    connectOrCreate?: ClassroomCreateOrConnectWithoutLessonsInput
    upsert?: ClassroomUpsertWithoutLessonsInput
    connect?: ClassroomWhereUniqueInput
    update?: XOR<XOR<ClassroomUpdateToOneWithWhereWithoutLessonsInput, ClassroomUpdateWithoutLessonsInput>, ClassroomUncheckedUpdateWithoutLessonsInput>
  }

  export type ChildCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<ChildCreateWithoutActivitiesInput, ChildUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: ChildCreateOrConnectWithoutActivitiesInput
    connect?: ChildWhereUniqueInput
  }

  export type ChildUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<ChildCreateWithoutActivitiesInput, ChildUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: ChildCreateOrConnectWithoutActivitiesInput
    upsert?: ChildUpsertWithoutActivitiesInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutActivitiesInput, ChildUpdateWithoutActivitiesInput>, ChildUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedMessagesInput = {
    create?: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    upsert?: UserUpsertWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentMessagesInput, UserUpdateWithoutSentMessagesInput>, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedMessagesNestedInput = {
    create?: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput
    upsert?: UserUpsertWithoutReceivedMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedMessagesInput, UserUpdateWithoutReceivedMessagesInput>, UserUncheckedUpdateWithoutReceivedMessagesInput>
  }

  export type ChildCreateNestedOneWithoutSentChallengesInput = {
    create?: XOR<ChildCreateWithoutSentChallengesInput, ChildUncheckedCreateWithoutSentChallengesInput>
    connectOrCreate?: ChildCreateOrConnectWithoutSentChallengesInput
    connect?: ChildWhereUniqueInput
  }

  export type ChildCreateNestedOneWithoutReceivedChallengesInput = {
    create?: XOR<ChildCreateWithoutReceivedChallengesInput, ChildUncheckedCreateWithoutReceivedChallengesInput>
    connectOrCreate?: ChildCreateOrConnectWithoutReceivedChallengesInput
    connect?: ChildWhereUniqueInput
  }

  export type ChildUpdateOneRequiredWithoutSentChallengesNestedInput = {
    create?: XOR<ChildCreateWithoutSentChallengesInput, ChildUncheckedCreateWithoutSentChallengesInput>
    connectOrCreate?: ChildCreateOrConnectWithoutSentChallengesInput
    upsert?: ChildUpsertWithoutSentChallengesInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutSentChallengesInput, ChildUpdateWithoutSentChallengesInput>, ChildUncheckedUpdateWithoutSentChallengesInput>
  }

  export type ChildUpdateOneRequiredWithoutReceivedChallengesNestedInput = {
    create?: XOR<ChildCreateWithoutReceivedChallengesInput, ChildUncheckedCreateWithoutReceivedChallengesInput>
    connectOrCreate?: ChildCreateOrConnectWithoutReceivedChallengesInput
    upsert?: ChildUpsertWithoutReceivedChallengesInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutReceivedChallengesInput, ChildUpdateWithoutReceivedChallengesInput>, ChildUncheckedUpdateWithoutReceivedChallengesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ChildCreateWithoutParentInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    quizAttempts?: QuizAttemptCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogCreateNestedManyWithoutChildInput
    activities?: ActivityFeedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeCreateNestedManyWithoutChallengedInput
  }

  export type ChildUncheckedCreateWithoutParentInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutChildInput
    activities?: ActivityFeedUncheckedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertUncheckedCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengedInput
  }

  export type ChildCreateOrConnectWithoutParentInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutParentInput, ChildUncheckedCreateWithoutParentInput>
  }

  export type ChildCreateManyParentInputEnvelope = {
    data: ChildCreateManyParentInput | ChildCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type ClassroomCreateWithoutTeacherInput = {
    id?: string
    name: string
    subject?: string | null
    joinCode: string
    grade?: string | null
    studentIds?: string
    createdAt?: Date | string
    lessons?: LessonCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUncheckedCreateWithoutTeacherInput = {
    id?: string
    name: string
    subject?: string | null
    joinCode: string
    grade?: string | null
    studentIds?: string
    createdAt?: Date | string
    lessons?: LessonUncheckedCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomCreateOrConnectWithoutTeacherInput = {
    where: ClassroomWhereUniqueInput
    create: XOR<ClassroomCreateWithoutTeacherInput, ClassroomUncheckedCreateWithoutTeacherInput>
  }

  export type ClassroomCreateManyTeacherInputEnvelope = {
    data: ClassroomCreateManyTeacherInput | ClassroomCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutSenderInput = {
    id?: string
    content: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: string
    receiverId: string
    content: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutReceiverInput = {
    id?: string
    content: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateWithoutReceiverInput = {
    id?: string
    senderId: string
    content: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageCreateManyReceiverInputEnvelope = {
    data: MessageCreateManyReceiverInput | MessageCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type ChildUpsertWithWhereUniqueWithoutParentInput = {
    where: ChildWhereUniqueInput
    update: XOR<ChildUpdateWithoutParentInput, ChildUncheckedUpdateWithoutParentInput>
    create: XOR<ChildCreateWithoutParentInput, ChildUncheckedCreateWithoutParentInput>
  }

  export type ChildUpdateWithWhereUniqueWithoutParentInput = {
    where: ChildWhereUniqueInput
    data: XOR<ChildUpdateWithoutParentInput, ChildUncheckedUpdateWithoutParentInput>
  }

  export type ChildUpdateManyWithWhereWithoutParentInput = {
    where: ChildScalarWhereInput
    data: XOR<ChildUpdateManyMutationInput, ChildUncheckedUpdateManyWithoutParentInput>
  }

  export type ChildScalarWhereInput = {
    AND?: ChildScalarWhereInput | ChildScalarWhereInput[]
    OR?: ChildScalarWhereInput[]
    NOT?: ChildScalarWhereInput | ChildScalarWhereInput[]
    id?: StringFilter<"Child"> | string
    name?: StringFilter<"Child"> | string
    age?: IntFilter<"Child"> | number
    grade?: StringNullableFilter<"Child"> | string | null
    avatar?: StringNullableFilter<"Child"> | string | null
    xp?: IntFilter<"Child"> | number
    level?: IntFilter<"Child"> | number
    streak?: IntFilter<"Child"> | number
    longestStreak?: IntFilter<"Child"> | number
    lastActiveDate?: StringNullableFilter<"Child"> | string | null
    totalQuizzes?: IntFilter<"Child"> | number
    totalWatchTime?: IntFilter<"Child"> | number
    screenTimeLimit?: IntFilter<"Child"> | number
    badges?: StringFilter<"Child"> | string
    weakSubjects?: StringFilter<"Child"> | string
    strongSubjects?: StringFilter<"Child"> | string
    createdAt?: DateTimeFilter<"Child"> | Date | string
    updatedAt?: DateTimeFilter<"Child"> | Date | string
    parentId?: StringFilter<"Child"> | string
  }

  export type ClassroomUpsertWithWhereUniqueWithoutTeacherInput = {
    where: ClassroomWhereUniqueInput
    update: XOR<ClassroomUpdateWithoutTeacherInput, ClassroomUncheckedUpdateWithoutTeacherInput>
    create: XOR<ClassroomCreateWithoutTeacherInput, ClassroomUncheckedCreateWithoutTeacherInput>
  }

  export type ClassroomUpdateWithWhereUniqueWithoutTeacherInput = {
    where: ClassroomWhereUniqueInput
    data: XOR<ClassroomUpdateWithoutTeacherInput, ClassroomUncheckedUpdateWithoutTeacherInput>
  }

  export type ClassroomUpdateManyWithWhereWithoutTeacherInput = {
    where: ClassroomScalarWhereInput
    data: XOR<ClassroomUpdateManyMutationInput, ClassroomUncheckedUpdateManyWithoutTeacherInput>
  }

  export type ClassroomScalarWhereInput = {
    AND?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
    OR?: ClassroomScalarWhereInput[]
    NOT?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
    id?: StringFilter<"Classroom"> | string
    name?: StringFilter<"Classroom"> | string
    subject?: StringNullableFilter<"Classroom"> | string | null
    joinCode?: StringFilter<"Classroom"> | string
    grade?: StringNullableFilter<"Classroom"> | string | null
    teacherId?: StringFilter<"Classroom"> | string
    studentIds?: StringFilter<"Classroom"> | string
    createdAt?: DateTimeFilter<"Classroom"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    receiverId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    type?: StringFilter<"Message"> | string
    isRead?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
  }

  export type MessageUpdateManyWithWhereWithoutReceiverInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutReceiverInput>
  }

  export type UserCreateWithoutChildrenInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classrooms?: ClassroomCreateNestedManyWithoutTeacherInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateWithoutChildrenInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classrooms?: ClassroomUncheckedCreateNestedManyWithoutTeacherInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserCreateOrConnectWithoutChildrenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChildrenInput, UserUncheckedCreateWithoutChildrenInput>
  }

  export type QuizAttemptCreateWithoutChildInput = {
    id?: string
    score: number
    totalQuestions: number
    answers: string
    timeTaken?: number | null
    difficulty: string
    xpEarned?: number
    completedAt?: Date | string
    quiz: QuizCreateNestedOneWithoutAttemptsInput
  }

  export type QuizAttemptUncheckedCreateWithoutChildInput = {
    id?: string
    quizId: string
    score: number
    totalQuestions: number
    answers: string
    timeTaken?: number | null
    difficulty: string
    xpEarned?: number
    completedAt?: Date | string
  }

  export type QuizAttemptCreateOrConnectWithoutChildInput = {
    where: QuizAttemptWhereUniqueInput
    create: XOR<QuizAttemptCreateWithoutChildInput, QuizAttemptUncheckedCreateWithoutChildInput>
  }

  export type QuizAttemptCreateManyChildInputEnvelope = {
    data: QuizAttemptCreateManyChildInput | QuizAttemptCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type WatchLogCreateWithoutChildInput = {
    id?: string
    watchedAt?: Date | string
    duration?: number
    content: ContentCreateNestedOneWithoutWatchLogsInput
  }

  export type WatchLogUncheckedCreateWithoutChildInput = {
    id?: string
    contentId: string
    watchedAt?: Date | string
    duration?: number
  }

  export type WatchLogCreateOrConnectWithoutChildInput = {
    where: WatchLogWhereUniqueInput
    create: XOR<WatchLogCreateWithoutChildInput, WatchLogUncheckedCreateWithoutChildInput>
  }

  export type WatchLogCreateManyChildInputEnvelope = {
    data: WatchLogCreateManyChildInput | WatchLogCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type ActivityFeedCreateWithoutChildInput = {
    id?: string
    type: string
    title: string
    description?: string | null
    xpEarned?: number
    metadata?: string | null
    createdAt?: Date | string
  }

  export type ActivityFeedUncheckedCreateWithoutChildInput = {
    id?: string
    type: string
    title: string
    description?: string | null
    xpEarned?: number
    metadata?: string | null
    createdAt?: Date | string
  }

  export type ActivityFeedCreateOrConnectWithoutChildInput = {
    where: ActivityFeedWhereUniqueInput
    create: XOR<ActivityFeedCreateWithoutChildInput, ActivityFeedUncheckedCreateWithoutChildInput>
  }

  export type ActivityFeedCreateManyChildInputEnvelope = {
    data: ActivityFeedCreateManyChildInput | ActivityFeedCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type ParentAlertCreateWithoutChildInput = {
    id?: string
    type: string
    title: string
    message: string
    severity?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ParentAlertUncheckedCreateWithoutChildInput = {
    id?: string
    type: string
    title: string
    message: string
    severity?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ParentAlertCreateOrConnectWithoutChildInput = {
    where: ParentAlertWhereUniqueInput
    create: XOR<ParentAlertCreateWithoutChildInput, ParentAlertUncheckedCreateWithoutChildInput>
  }

  export type ParentAlertCreateManyChildInputEnvelope = {
    data: ParentAlertCreateManyChildInput | ParentAlertCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type FriendRequestCreateWithoutFromChildInput = {
    id?: string
    status?: string
    parentApproved?: boolean
    createdAt?: Date | string
    toChild: ChildCreateNestedOneWithoutReceivedFriendRequestsInput
  }

  export type FriendRequestUncheckedCreateWithoutFromChildInput = {
    id?: string
    toChildId: string
    status?: string
    parentApproved?: boolean
    createdAt?: Date | string
  }

  export type FriendRequestCreateOrConnectWithoutFromChildInput = {
    where: FriendRequestWhereUniqueInput
    create: XOR<FriendRequestCreateWithoutFromChildInput, FriendRequestUncheckedCreateWithoutFromChildInput>
  }

  export type FriendRequestCreateManyFromChildInputEnvelope = {
    data: FriendRequestCreateManyFromChildInput | FriendRequestCreateManyFromChildInput[]
    skipDuplicates?: boolean
  }

  export type FriendRequestCreateWithoutToChildInput = {
    id?: string
    status?: string
    parentApproved?: boolean
    createdAt?: Date | string
    fromChild: ChildCreateNestedOneWithoutSentFriendRequestsInput
  }

  export type FriendRequestUncheckedCreateWithoutToChildInput = {
    id?: string
    fromChildId: string
    status?: string
    parentApproved?: boolean
    createdAt?: Date | string
  }

  export type FriendRequestCreateOrConnectWithoutToChildInput = {
    where: FriendRequestWhereUniqueInput
    create: XOR<FriendRequestCreateWithoutToChildInput, FriendRequestUncheckedCreateWithoutToChildInput>
  }

  export type FriendRequestCreateManyToChildInputEnvelope = {
    data: FriendRequestCreateManyToChildInput | FriendRequestCreateManyToChildInput[]
    skipDuplicates?: boolean
  }

  export type PeerChallengeCreateWithoutChallengerInput = {
    id?: string
    quizId?: string | null
    subject: string
    status?: string
    challengerScore?: number | null
    challengedScore?: number | null
    winnerId?: string | null
    xpReward?: number
    createdAt?: Date | string
    challenged: ChildCreateNestedOneWithoutReceivedChallengesInput
  }

  export type PeerChallengeUncheckedCreateWithoutChallengerInput = {
    id?: string
    challengedId: string
    quizId?: string | null
    subject: string
    status?: string
    challengerScore?: number | null
    challengedScore?: number | null
    winnerId?: string | null
    xpReward?: number
    createdAt?: Date | string
  }

  export type PeerChallengeCreateOrConnectWithoutChallengerInput = {
    where: PeerChallengeWhereUniqueInput
    create: XOR<PeerChallengeCreateWithoutChallengerInput, PeerChallengeUncheckedCreateWithoutChallengerInput>
  }

  export type PeerChallengeCreateManyChallengerInputEnvelope = {
    data: PeerChallengeCreateManyChallengerInput | PeerChallengeCreateManyChallengerInput[]
    skipDuplicates?: boolean
  }

  export type PeerChallengeCreateWithoutChallengedInput = {
    id?: string
    quizId?: string | null
    subject: string
    status?: string
    challengerScore?: number | null
    challengedScore?: number | null
    winnerId?: string | null
    xpReward?: number
    createdAt?: Date | string
    challenger: ChildCreateNestedOneWithoutSentChallengesInput
  }

  export type PeerChallengeUncheckedCreateWithoutChallengedInput = {
    id?: string
    challengerId: string
    quizId?: string | null
    subject: string
    status?: string
    challengerScore?: number | null
    challengedScore?: number | null
    winnerId?: string | null
    xpReward?: number
    createdAt?: Date | string
  }

  export type PeerChallengeCreateOrConnectWithoutChallengedInput = {
    where: PeerChallengeWhereUniqueInput
    create: XOR<PeerChallengeCreateWithoutChallengedInput, PeerChallengeUncheckedCreateWithoutChallengedInput>
  }

  export type PeerChallengeCreateManyChallengedInputEnvelope = {
    data: PeerChallengeCreateManyChallengedInput | PeerChallengeCreateManyChallengedInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutChildrenInput = {
    update: XOR<UserUpdateWithoutChildrenInput, UserUncheckedUpdateWithoutChildrenInput>
    create: XOR<UserCreateWithoutChildrenInput, UserUncheckedCreateWithoutChildrenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChildrenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChildrenInput, UserUncheckedUpdateWithoutChildrenInput>
  }

  export type UserUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classrooms?: ClassroomUpdateManyWithoutTeacherNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classrooms?: ClassroomUncheckedUpdateManyWithoutTeacherNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type QuizAttemptUpsertWithWhereUniqueWithoutChildInput = {
    where: QuizAttemptWhereUniqueInput
    update: XOR<QuizAttemptUpdateWithoutChildInput, QuizAttemptUncheckedUpdateWithoutChildInput>
    create: XOR<QuizAttemptCreateWithoutChildInput, QuizAttemptUncheckedCreateWithoutChildInput>
  }

  export type QuizAttemptUpdateWithWhereUniqueWithoutChildInput = {
    where: QuizAttemptWhereUniqueInput
    data: XOR<QuizAttemptUpdateWithoutChildInput, QuizAttemptUncheckedUpdateWithoutChildInput>
  }

  export type QuizAttemptUpdateManyWithWhereWithoutChildInput = {
    where: QuizAttemptScalarWhereInput
    data: XOR<QuizAttemptUpdateManyMutationInput, QuizAttemptUncheckedUpdateManyWithoutChildInput>
  }

  export type QuizAttemptScalarWhereInput = {
    AND?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
    OR?: QuizAttemptScalarWhereInput[]
    NOT?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
    id?: StringFilter<"QuizAttempt"> | string
    childId?: StringFilter<"QuizAttempt"> | string
    quizId?: StringFilter<"QuizAttempt"> | string
    score?: IntFilter<"QuizAttempt"> | number
    totalQuestions?: IntFilter<"QuizAttempt"> | number
    answers?: StringFilter<"QuizAttempt"> | string
    timeTaken?: IntNullableFilter<"QuizAttempt"> | number | null
    difficulty?: StringFilter<"QuizAttempt"> | string
    xpEarned?: IntFilter<"QuizAttempt"> | number
    completedAt?: DateTimeFilter<"QuizAttempt"> | Date | string
  }

  export type WatchLogUpsertWithWhereUniqueWithoutChildInput = {
    where: WatchLogWhereUniqueInput
    update: XOR<WatchLogUpdateWithoutChildInput, WatchLogUncheckedUpdateWithoutChildInput>
    create: XOR<WatchLogCreateWithoutChildInput, WatchLogUncheckedCreateWithoutChildInput>
  }

  export type WatchLogUpdateWithWhereUniqueWithoutChildInput = {
    where: WatchLogWhereUniqueInput
    data: XOR<WatchLogUpdateWithoutChildInput, WatchLogUncheckedUpdateWithoutChildInput>
  }

  export type WatchLogUpdateManyWithWhereWithoutChildInput = {
    where: WatchLogScalarWhereInput
    data: XOR<WatchLogUpdateManyMutationInput, WatchLogUncheckedUpdateManyWithoutChildInput>
  }

  export type WatchLogScalarWhereInput = {
    AND?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
    OR?: WatchLogScalarWhereInput[]
    NOT?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
    id?: StringFilter<"WatchLog"> | string
    childId?: StringFilter<"WatchLog"> | string
    contentId?: StringFilter<"WatchLog"> | string
    watchedAt?: DateTimeFilter<"WatchLog"> | Date | string
    duration?: IntFilter<"WatchLog"> | number
  }

  export type ActivityFeedUpsertWithWhereUniqueWithoutChildInput = {
    where: ActivityFeedWhereUniqueInput
    update: XOR<ActivityFeedUpdateWithoutChildInput, ActivityFeedUncheckedUpdateWithoutChildInput>
    create: XOR<ActivityFeedCreateWithoutChildInput, ActivityFeedUncheckedCreateWithoutChildInput>
  }

  export type ActivityFeedUpdateWithWhereUniqueWithoutChildInput = {
    where: ActivityFeedWhereUniqueInput
    data: XOR<ActivityFeedUpdateWithoutChildInput, ActivityFeedUncheckedUpdateWithoutChildInput>
  }

  export type ActivityFeedUpdateManyWithWhereWithoutChildInput = {
    where: ActivityFeedScalarWhereInput
    data: XOR<ActivityFeedUpdateManyMutationInput, ActivityFeedUncheckedUpdateManyWithoutChildInput>
  }

  export type ActivityFeedScalarWhereInput = {
    AND?: ActivityFeedScalarWhereInput | ActivityFeedScalarWhereInput[]
    OR?: ActivityFeedScalarWhereInput[]
    NOT?: ActivityFeedScalarWhereInput | ActivityFeedScalarWhereInput[]
    id?: StringFilter<"ActivityFeed"> | string
    childId?: StringFilter<"ActivityFeed"> | string
    type?: StringFilter<"ActivityFeed"> | string
    title?: StringFilter<"ActivityFeed"> | string
    description?: StringNullableFilter<"ActivityFeed"> | string | null
    xpEarned?: IntFilter<"ActivityFeed"> | number
    metadata?: StringNullableFilter<"ActivityFeed"> | string | null
    createdAt?: DateTimeFilter<"ActivityFeed"> | Date | string
  }

  export type ParentAlertUpsertWithWhereUniqueWithoutChildInput = {
    where: ParentAlertWhereUniqueInput
    update: XOR<ParentAlertUpdateWithoutChildInput, ParentAlertUncheckedUpdateWithoutChildInput>
    create: XOR<ParentAlertCreateWithoutChildInput, ParentAlertUncheckedCreateWithoutChildInput>
  }

  export type ParentAlertUpdateWithWhereUniqueWithoutChildInput = {
    where: ParentAlertWhereUniqueInput
    data: XOR<ParentAlertUpdateWithoutChildInput, ParentAlertUncheckedUpdateWithoutChildInput>
  }

  export type ParentAlertUpdateManyWithWhereWithoutChildInput = {
    where: ParentAlertScalarWhereInput
    data: XOR<ParentAlertUpdateManyMutationInput, ParentAlertUncheckedUpdateManyWithoutChildInput>
  }

  export type ParentAlertScalarWhereInput = {
    AND?: ParentAlertScalarWhereInput | ParentAlertScalarWhereInput[]
    OR?: ParentAlertScalarWhereInput[]
    NOT?: ParentAlertScalarWhereInput | ParentAlertScalarWhereInput[]
    id?: StringFilter<"ParentAlert"> | string
    childId?: StringFilter<"ParentAlert"> | string
    type?: StringFilter<"ParentAlert"> | string
    title?: StringFilter<"ParentAlert"> | string
    message?: StringFilter<"ParentAlert"> | string
    severity?: StringFilter<"ParentAlert"> | string
    isRead?: BoolFilter<"ParentAlert"> | boolean
    createdAt?: DateTimeFilter<"ParentAlert"> | Date | string
  }

  export type FriendRequestUpsertWithWhereUniqueWithoutFromChildInput = {
    where: FriendRequestWhereUniqueInput
    update: XOR<FriendRequestUpdateWithoutFromChildInput, FriendRequestUncheckedUpdateWithoutFromChildInput>
    create: XOR<FriendRequestCreateWithoutFromChildInput, FriendRequestUncheckedCreateWithoutFromChildInput>
  }

  export type FriendRequestUpdateWithWhereUniqueWithoutFromChildInput = {
    where: FriendRequestWhereUniqueInput
    data: XOR<FriendRequestUpdateWithoutFromChildInput, FriendRequestUncheckedUpdateWithoutFromChildInput>
  }

  export type FriendRequestUpdateManyWithWhereWithoutFromChildInput = {
    where: FriendRequestScalarWhereInput
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyWithoutFromChildInput>
  }

  export type FriendRequestScalarWhereInput = {
    AND?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
    OR?: FriendRequestScalarWhereInput[]
    NOT?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
    id?: StringFilter<"FriendRequest"> | string
    fromChildId?: StringFilter<"FriendRequest"> | string
    toChildId?: StringFilter<"FriendRequest"> | string
    status?: StringFilter<"FriendRequest"> | string
    parentApproved?: BoolFilter<"FriendRequest"> | boolean
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
  }

  export type FriendRequestUpsertWithWhereUniqueWithoutToChildInput = {
    where: FriendRequestWhereUniqueInput
    update: XOR<FriendRequestUpdateWithoutToChildInput, FriendRequestUncheckedUpdateWithoutToChildInput>
    create: XOR<FriendRequestCreateWithoutToChildInput, FriendRequestUncheckedCreateWithoutToChildInput>
  }

  export type FriendRequestUpdateWithWhereUniqueWithoutToChildInput = {
    where: FriendRequestWhereUniqueInput
    data: XOR<FriendRequestUpdateWithoutToChildInput, FriendRequestUncheckedUpdateWithoutToChildInput>
  }

  export type FriendRequestUpdateManyWithWhereWithoutToChildInput = {
    where: FriendRequestScalarWhereInput
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyWithoutToChildInput>
  }

  export type PeerChallengeUpsertWithWhereUniqueWithoutChallengerInput = {
    where: PeerChallengeWhereUniqueInput
    update: XOR<PeerChallengeUpdateWithoutChallengerInput, PeerChallengeUncheckedUpdateWithoutChallengerInput>
    create: XOR<PeerChallengeCreateWithoutChallengerInput, PeerChallengeUncheckedCreateWithoutChallengerInput>
  }

  export type PeerChallengeUpdateWithWhereUniqueWithoutChallengerInput = {
    where: PeerChallengeWhereUniqueInput
    data: XOR<PeerChallengeUpdateWithoutChallengerInput, PeerChallengeUncheckedUpdateWithoutChallengerInput>
  }

  export type PeerChallengeUpdateManyWithWhereWithoutChallengerInput = {
    where: PeerChallengeScalarWhereInput
    data: XOR<PeerChallengeUpdateManyMutationInput, PeerChallengeUncheckedUpdateManyWithoutChallengerInput>
  }

  export type PeerChallengeScalarWhereInput = {
    AND?: PeerChallengeScalarWhereInput | PeerChallengeScalarWhereInput[]
    OR?: PeerChallengeScalarWhereInput[]
    NOT?: PeerChallengeScalarWhereInput | PeerChallengeScalarWhereInput[]
    id?: StringFilter<"PeerChallenge"> | string
    challengerId?: StringFilter<"PeerChallenge"> | string
    challengedId?: StringFilter<"PeerChallenge"> | string
    quizId?: StringNullableFilter<"PeerChallenge"> | string | null
    subject?: StringFilter<"PeerChallenge"> | string
    status?: StringFilter<"PeerChallenge"> | string
    challengerScore?: IntNullableFilter<"PeerChallenge"> | number | null
    challengedScore?: IntNullableFilter<"PeerChallenge"> | number | null
    winnerId?: StringNullableFilter<"PeerChallenge"> | string | null
    xpReward?: IntFilter<"PeerChallenge"> | number
    createdAt?: DateTimeFilter<"PeerChallenge"> | Date | string
  }

  export type PeerChallengeUpsertWithWhereUniqueWithoutChallengedInput = {
    where: PeerChallengeWhereUniqueInput
    update: XOR<PeerChallengeUpdateWithoutChallengedInput, PeerChallengeUncheckedUpdateWithoutChallengedInput>
    create: XOR<PeerChallengeCreateWithoutChallengedInput, PeerChallengeUncheckedCreateWithoutChallengedInput>
  }

  export type PeerChallengeUpdateWithWhereUniqueWithoutChallengedInput = {
    where: PeerChallengeWhereUniqueInput
    data: XOR<PeerChallengeUpdateWithoutChallengedInput, PeerChallengeUncheckedUpdateWithoutChallengedInput>
  }

  export type PeerChallengeUpdateManyWithWhereWithoutChallengedInput = {
    where: PeerChallengeScalarWhereInput
    data: XOR<PeerChallengeUpdateManyMutationInput, PeerChallengeUncheckedUpdateManyWithoutChallengedInput>
  }

  export type WatchLogCreateWithoutContentInput = {
    id?: string
    watchedAt?: Date | string
    duration?: number
    child: ChildCreateNestedOneWithoutWatchLogsInput
  }

  export type WatchLogUncheckedCreateWithoutContentInput = {
    id?: string
    childId: string
    watchedAt?: Date | string
    duration?: number
  }

  export type WatchLogCreateOrConnectWithoutContentInput = {
    where: WatchLogWhereUniqueInput
    create: XOR<WatchLogCreateWithoutContentInput, WatchLogUncheckedCreateWithoutContentInput>
  }

  export type WatchLogCreateManyContentInputEnvelope = {
    data: WatchLogCreateManyContentInput | WatchLogCreateManyContentInput[]
    skipDuplicates?: boolean
  }

  export type WatchLogUpsertWithWhereUniqueWithoutContentInput = {
    where: WatchLogWhereUniqueInput
    update: XOR<WatchLogUpdateWithoutContentInput, WatchLogUncheckedUpdateWithoutContentInput>
    create: XOR<WatchLogCreateWithoutContentInput, WatchLogUncheckedCreateWithoutContentInput>
  }

  export type WatchLogUpdateWithWhereUniqueWithoutContentInput = {
    where: WatchLogWhereUniqueInput
    data: XOR<WatchLogUpdateWithoutContentInput, WatchLogUncheckedUpdateWithoutContentInput>
  }

  export type WatchLogUpdateManyWithWhereWithoutContentInput = {
    where: WatchLogScalarWhereInput
    data: XOR<WatchLogUpdateManyMutationInput, WatchLogUncheckedUpdateManyWithoutContentInput>
  }

  export type ChildCreateWithoutWatchLogsInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: UserCreateNestedOneWithoutChildrenInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutChildInput
    activities?: ActivityFeedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeCreateNestedManyWithoutChallengedInput
  }

  export type ChildUncheckedCreateWithoutWatchLogsInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId: string
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutChildInput
    activities?: ActivityFeedUncheckedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertUncheckedCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengedInput
  }

  export type ChildCreateOrConnectWithoutWatchLogsInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutWatchLogsInput, ChildUncheckedCreateWithoutWatchLogsInput>
  }

  export type ContentCreateWithoutWatchLogsInput = {
    id?: string
    title: string
    description?: string | null
    type?: string
    subject: string
    thumbnailUrl?: string | null
    contentUrl: string
    duration?: number | null
    ageMin?: number
    ageMax?: number
    difficulty?: string
    xpReward?: number
    isApproved?: boolean
    createdAt?: Date | string
  }

  export type ContentUncheckedCreateWithoutWatchLogsInput = {
    id?: string
    title: string
    description?: string | null
    type?: string
    subject: string
    thumbnailUrl?: string | null
    contentUrl: string
    duration?: number | null
    ageMin?: number
    ageMax?: number
    difficulty?: string
    xpReward?: number
    isApproved?: boolean
    createdAt?: Date | string
  }

  export type ContentCreateOrConnectWithoutWatchLogsInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutWatchLogsInput, ContentUncheckedCreateWithoutWatchLogsInput>
  }

  export type ChildUpsertWithoutWatchLogsInput = {
    update: XOR<ChildUpdateWithoutWatchLogsInput, ChildUncheckedUpdateWithoutWatchLogsInput>
    create: XOR<ChildCreateWithoutWatchLogsInput, ChildUncheckedCreateWithoutWatchLogsInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutWatchLogsInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutWatchLogsInput, ChildUncheckedUpdateWithoutWatchLogsInput>
  }

  export type ChildUpdateWithoutWatchLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UserUpdateOneRequiredWithoutChildrenNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUncheckedUpdateWithoutWatchLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUncheckedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUncheckedUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUncheckedUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUncheckedUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengedNestedInput
  }

  export type ContentUpsertWithoutWatchLogsInput = {
    update: XOR<ContentUpdateWithoutWatchLogsInput, ContentUncheckedUpdateWithoutWatchLogsInput>
    create: XOR<ContentCreateWithoutWatchLogsInput, ContentUncheckedCreateWithoutWatchLogsInput>
    where?: ContentWhereInput
  }

  export type ContentUpdateToOneWithWhereWithoutWatchLogsInput = {
    where?: ContentWhereInput
    data: XOR<ContentUpdateWithoutWatchLogsInput, ContentUncheckedUpdateWithoutWatchLogsInput>
  }

  export type ContentUpdateWithoutWatchLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentUncheckedUpdateWithoutWatchLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptCreateWithoutQuizInput = {
    id?: string
    score: number
    totalQuestions: number
    answers: string
    timeTaken?: number | null
    difficulty: string
    xpEarned?: number
    completedAt?: Date | string
    child: ChildCreateNestedOneWithoutQuizAttemptsInput
  }

  export type QuizAttemptUncheckedCreateWithoutQuizInput = {
    id?: string
    childId: string
    score: number
    totalQuestions: number
    answers: string
    timeTaken?: number | null
    difficulty: string
    xpEarned?: number
    completedAt?: Date | string
  }

  export type QuizAttemptCreateOrConnectWithoutQuizInput = {
    where: QuizAttemptWhereUniqueInput
    create: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput>
  }

  export type QuizAttemptCreateManyQuizInputEnvelope = {
    data: QuizAttemptCreateManyQuizInput | QuizAttemptCreateManyQuizInput[]
    skipDuplicates?: boolean
  }

  export type QuizAttemptUpsertWithWhereUniqueWithoutQuizInput = {
    where: QuizAttemptWhereUniqueInput
    update: XOR<QuizAttemptUpdateWithoutQuizInput, QuizAttemptUncheckedUpdateWithoutQuizInput>
    create: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput>
  }

  export type QuizAttemptUpdateWithWhereUniqueWithoutQuizInput = {
    where: QuizAttemptWhereUniqueInput
    data: XOR<QuizAttemptUpdateWithoutQuizInput, QuizAttemptUncheckedUpdateWithoutQuizInput>
  }

  export type QuizAttemptUpdateManyWithWhereWithoutQuizInput = {
    where: QuizAttemptScalarWhereInput
    data: XOR<QuizAttemptUpdateManyMutationInput, QuizAttemptUncheckedUpdateManyWithoutQuizInput>
  }

  export type ChildCreateWithoutQuizAttemptsInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: UserCreateNestedOneWithoutChildrenInput
    watchLogs?: WatchLogCreateNestedManyWithoutChildInput
    activities?: ActivityFeedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeCreateNestedManyWithoutChallengedInput
  }

  export type ChildUncheckedCreateWithoutQuizAttemptsInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId: string
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutChildInput
    activities?: ActivityFeedUncheckedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertUncheckedCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengedInput
  }

  export type ChildCreateOrConnectWithoutQuizAttemptsInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutQuizAttemptsInput, ChildUncheckedCreateWithoutQuizAttemptsInput>
  }

  export type QuizCreateWithoutAttemptsInput = {
    id?: string
    title: string
    subject: string
    difficulty?: string
    questions: string
    xpReward?: number
    timeLimit?: number | null
    ageMin?: number
    ageMax?: number
    createdAt?: Date | string
    createdById?: string | null
  }

  export type QuizUncheckedCreateWithoutAttemptsInput = {
    id?: string
    title: string
    subject: string
    difficulty?: string
    questions: string
    xpReward?: number
    timeLimit?: number | null
    ageMin?: number
    ageMax?: number
    createdAt?: Date | string
    createdById?: string | null
  }

  export type QuizCreateOrConnectWithoutAttemptsInput = {
    where: QuizWhereUniqueInput
    create: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
  }

  export type ChildUpsertWithoutQuizAttemptsInput = {
    update: XOR<ChildUpdateWithoutQuizAttemptsInput, ChildUncheckedUpdateWithoutQuizAttemptsInput>
    create: XOR<ChildCreateWithoutQuizAttemptsInput, ChildUncheckedCreateWithoutQuizAttemptsInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutQuizAttemptsInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutQuizAttemptsInput, ChildUncheckedUpdateWithoutQuizAttemptsInput>
  }

  export type ChildUpdateWithoutQuizAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UserUpdateOneRequiredWithoutChildrenNestedInput
    watchLogs?: WatchLogUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUncheckedUpdateWithoutQuizAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    watchLogs?: WatchLogUncheckedUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUncheckedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUncheckedUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUncheckedUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUncheckedUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengedNestedInput
  }

  export type QuizUpsertWithoutAttemptsInput = {
    update: XOR<QuizUpdateWithoutAttemptsInput, QuizUncheckedUpdateWithoutAttemptsInput>
    create: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
    where?: QuizWhereInput
  }

  export type QuizUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: QuizWhereInput
    data: XOR<QuizUpdateWithoutAttemptsInput, QuizUncheckedUpdateWithoutAttemptsInput>
  }

  export type QuizUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuizUncheckedUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    ageMin?: IntFieldUpdateOperationsInput | number
    ageMax?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChildCreateWithoutSentFriendRequestsInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: UserCreateNestedOneWithoutChildrenInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogCreateNestedManyWithoutChildInput
    activities?: ActivityFeedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertCreateNestedManyWithoutChildInput
    receivedFriendRequests?: FriendRequestCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeCreateNestedManyWithoutChallengedInput
  }

  export type ChildUncheckedCreateWithoutSentFriendRequestsInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId: string
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutChildInput
    activities?: ActivityFeedUncheckedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertUncheckedCreateNestedManyWithoutChildInput
    receivedFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengedInput
  }

  export type ChildCreateOrConnectWithoutSentFriendRequestsInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutSentFriendRequestsInput, ChildUncheckedCreateWithoutSentFriendRequestsInput>
  }

  export type ChildCreateWithoutReceivedFriendRequestsInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: UserCreateNestedOneWithoutChildrenInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogCreateNestedManyWithoutChildInput
    activities?: ActivityFeedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestCreateNestedManyWithoutFromChildInput
    sentChallenges?: PeerChallengeCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeCreateNestedManyWithoutChallengedInput
  }

  export type ChildUncheckedCreateWithoutReceivedFriendRequestsInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId: string
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutChildInput
    activities?: ActivityFeedUncheckedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertUncheckedCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutFromChildInput
    sentChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengedInput
  }

  export type ChildCreateOrConnectWithoutReceivedFriendRequestsInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutReceivedFriendRequestsInput, ChildUncheckedCreateWithoutReceivedFriendRequestsInput>
  }

  export type ChildUpsertWithoutSentFriendRequestsInput = {
    update: XOR<ChildUpdateWithoutSentFriendRequestsInput, ChildUncheckedUpdateWithoutSentFriendRequestsInput>
    create: XOR<ChildCreateWithoutSentFriendRequestsInput, ChildUncheckedCreateWithoutSentFriendRequestsInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutSentFriendRequestsInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutSentFriendRequestsInput, ChildUncheckedUpdateWithoutSentFriendRequestsInput>
  }

  export type ChildUpdateWithoutSentFriendRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UserUpdateOneRequiredWithoutChildrenNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUpdateManyWithoutChildNestedInput
    receivedFriendRequests?: FriendRequestUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUncheckedUpdateWithoutSentFriendRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUncheckedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUncheckedUpdateManyWithoutChildNestedInput
    receivedFriendRequests?: FriendRequestUncheckedUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUpsertWithoutReceivedFriendRequestsInput = {
    update: XOR<ChildUpdateWithoutReceivedFriendRequestsInput, ChildUncheckedUpdateWithoutReceivedFriendRequestsInput>
    create: XOR<ChildCreateWithoutReceivedFriendRequestsInput, ChildUncheckedCreateWithoutReceivedFriendRequestsInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutReceivedFriendRequestsInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutReceivedFriendRequestsInput, ChildUncheckedUpdateWithoutReceivedFriendRequestsInput>
  }

  export type ChildUpdateWithoutReceivedFriendRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UserUpdateOneRequiredWithoutChildrenNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUpdateManyWithoutFromChildNestedInput
    sentChallenges?: PeerChallengeUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUncheckedUpdateWithoutReceivedFriendRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUncheckedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUncheckedUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUncheckedUpdateManyWithoutFromChildNestedInput
    sentChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengedNestedInput
  }

  export type ChildCreateWithoutAlertsInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: UserCreateNestedOneWithoutChildrenInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogCreateNestedManyWithoutChildInput
    activities?: ActivityFeedCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeCreateNestedManyWithoutChallengedInput
  }

  export type ChildUncheckedCreateWithoutAlertsInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId: string
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutChildInput
    activities?: ActivityFeedUncheckedCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengedInput
  }

  export type ChildCreateOrConnectWithoutAlertsInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutAlertsInput, ChildUncheckedCreateWithoutAlertsInput>
  }

  export type ChildUpsertWithoutAlertsInput = {
    update: XOR<ChildUpdateWithoutAlertsInput, ChildUncheckedUpdateWithoutAlertsInput>
    create: XOR<ChildCreateWithoutAlertsInput, ChildUncheckedCreateWithoutAlertsInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutAlertsInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutAlertsInput, ChildUncheckedUpdateWithoutAlertsInput>
  }

  export type ChildUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UserUpdateOneRequiredWithoutChildrenNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUncheckedUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUncheckedUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUncheckedUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUncheckedUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengedNestedInput
  }

  export type UserCreateWithoutClassroomsInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildCreateNestedManyWithoutParentInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateWithoutClassroomsInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildUncheckedCreateNestedManyWithoutParentInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserCreateOrConnectWithoutClassroomsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClassroomsInput, UserUncheckedCreateWithoutClassroomsInput>
  }

  export type LessonCreateWithoutClassroomInput = {
    id?: string
    title: string
    description?: string | null
    contentUrl?: string | null
    quizId?: string | null
    order?: number
    createdAt?: Date | string
  }

  export type LessonUncheckedCreateWithoutClassroomInput = {
    id?: string
    title: string
    description?: string | null
    contentUrl?: string | null
    quizId?: string | null
    order?: number
    createdAt?: Date | string
  }

  export type LessonCreateOrConnectWithoutClassroomInput = {
    where: LessonWhereUniqueInput
    create: XOR<LessonCreateWithoutClassroomInput, LessonUncheckedCreateWithoutClassroomInput>
  }

  export type LessonCreateManyClassroomInputEnvelope = {
    data: LessonCreateManyClassroomInput | LessonCreateManyClassroomInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutClassroomsInput = {
    update: XOR<UserUpdateWithoutClassroomsInput, UserUncheckedUpdateWithoutClassroomsInput>
    create: XOR<UserCreateWithoutClassroomsInput, UserUncheckedCreateWithoutClassroomsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClassroomsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClassroomsInput, UserUncheckedUpdateWithoutClassroomsInput>
  }

  export type UserUpdateWithoutClassroomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildUpdateManyWithoutParentNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateWithoutClassroomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildUncheckedUpdateManyWithoutParentNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type LessonUpsertWithWhereUniqueWithoutClassroomInput = {
    where: LessonWhereUniqueInput
    update: XOR<LessonUpdateWithoutClassroomInput, LessonUncheckedUpdateWithoutClassroomInput>
    create: XOR<LessonCreateWithoutClassroomInput, LessonUncheckedCreateWithoutClassroomInput>
  }

  export type LessonUpdateWithWhereUniqueWithoutClassroomInput = {
    where: LessonWhereUniqueInput
    data: XOR<LessonUpdateWithoutClassroomInput, LessonUncheckedUpdateWithoutClassroomInput>
  }

  export type LessonUpdateManyWithWhereWithoutClassroomInput = {
    where: LessonScalarWhereInput
    data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyWithoutClassroomInput>
  }

  export type LessonScalarWhereInput = {
    AND?: LessonScalarWhereInput | LessonScalarWhereInput[]
    OR?: LessonScalarWhereInput[]
    NOT?: LessonScalarWhereInput | LessonScalarWhereInput[]
    id?: StringFilter<"Lesson"> | string
    classroomId?: StringFilter<"Lesson"> | string
    title?: StringFilter<"Lesson"> | string
    description?: StringNullableFilter<"Lesson"> | string | null
    contentUrl?: StringNullableFilter<"Lesson"> | string | null
    quizId?: StringNullableFilter<"Lesson"> | string | null
    order?: IntFilter<"Lesson"> | number
    createdAt?: DateTimeFilter<"Lesson"> | Date | string
  }

  export type ClassroomCreateWithoutLessonsInput = {
    id?: string
    name: string
    subject?: string | null
    joinCode: string
    grade?: string | null
    studentIds?: string
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutClassroomsInput
  }

  export type ClassroomUncheckedCreateWithoutLessonsInput = {
    id?: string
    name: string
    subject?: string | null
    joinCode: string
    grade?: string | null
    teacherId: string
    studentIds?: string
    createdAt?: Date | string
  }

  export type ClassroomCreateOrConnectWithoutLessonsInput = {
    where: ClassroomWhereUniqueInput
    create: XOR<ClassroomCreateWithoutLessonsInput, ClassroomUncheckedCreateWithoutLessonsInput>
  }

  export type ClassroomUpsertWithoutLessonsInput = {
    update: XOR<ClassroomUpdateWithoutLessonsInput, ClassroomUncheckedUpdateWithoutLessonsInput>
    create: XOR<ClassroomCreateWithoutLessonsInput, ClassroomUncheckedCreateWithoutLessonsInput>
    where?: ClassroomWhereInput
  }

  export type ClassroomUpdateToOneWithWhereWithoutLessonsInput = {
    where?: ClassroomWhereInput
    data: XOR<ClassroomUpdateWithoutLessonsInput, ClassroomUncheckedUpdateWithoutLessonsInput>
  }

  export type ClassroomUpdateWithoutLessonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    joinCode?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    studentIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutClassroomsNestedInput
  }

  export type ClassroomUncheckedUpdateWithoutLessonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    joinCode?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: StringFieldUpdateOperationsInput | string
    studentIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildCreateWithoutActivitiesInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: UserCreateNestedOneWithoutChildrenInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogCreateNestedManyWithoutChildInput
    alerts?: ParentAlertCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeCreateNestedManyWithoutChallengedInput
  }

  export type ChildUncheckedCreateWithoutActivitiesInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId: string
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertUncheckedCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengerInput
    receivedChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengedInput
  }

  export type ChildCreateOrConnectWithoutActivitiesInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutActivitiesInput, ChildUncheckedCreateWithoutActivitiesInput>
  }

  export type ChildUpsertWithoutActivitiesInput = {
    update: XOR<ChildUpdateWithoutActivitiesInput, ChildUncheckedUpdateWithoutActivitiesInput>
    create: XOR<ChildCreateWithoutActivitiesInput, ChildUncheckedCreateWithoutActivitiesInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutActivitiesInput, ChildUncheckedUpdateWithoutActivitiesInput>
  }

  export type ChildUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UserUpdateOneRequiredWithoutChildrenNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUncheckedUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUncheckedUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUncheckedUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengedNestedInput
  }

  export type UserCreateWithoutSentMessagesInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildCreateNestedManyWithoutParentInput
    classrooms?: ClassroomCreateNestedManyWithoutTeacherInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildUncheckedCreateNestedManyWithoutParentInput
    classrooms?: ClassroomUncheckedCreateNestedManyWithoutTeacherInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
  }

  export type UserCreateWithoutReceivedMessagesInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildCreateNestedManyWithoutParentInput
    classrooms?: ClassroomCreateNestedManyWithoutTeacherInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutReceivedMessagesInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildUncheckedCreateNestedManyWithoutParentInput
    classrooms?: ClassroomUncheckedCreateNestedManyWithoutTeacherInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutReceivedMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
  }

  export type UserUpsertWithoutSentMessagesInput = {
    update: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildUpdateManyWithoutParentNestedInput
    classrooms?: ClassroomUpdateManyWithoutTeacherNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildUncheckedUpdateManyWithoutParentNestedInput
    classrooms?: ClassroomUncheckedUpdateManyWithoutTeacherNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type UserUpsertWithoutReceivedMessagesInput = {
    update: XOR<UserUpdateWithoutReceivedMessagesInput, UserUncheckedUpdateWithoutReceivedMessagesInput>
    create: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedMessagesInput, UserUncheckedUpdateWithoutReceivedMessagesInput>
  }

  export type UserUpdateWithoutReceivedMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildUpdateManyWithoutParentNestedInput
    classrooms?: ClassroomUpdateManyWithoutTeacherNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildUncheckedUpdateManyWithoutParentNestedInput
    classrooms?: ClassroomUncheckedUpdateManyWithoutTeacherNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type ChildCreateWithoutSentChallengesInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: UserCreateNestedOneWithoutChildrenInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogCreateNestedManyWithoutChildInput
    activities?: ActivityFeedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestCreateNestedManyWithoutToChildInput
    receivedChallenges?: PeerChallengeCreateNestedManyWithoutChallengedInput
  }

  export type ChildUncheckedCreateWithoutSentChallengesInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId: string
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutChildInput
    activities?: ActivityFeedUncheckedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertUncheckedCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutToChildInput
    receivedChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengedInput
  }

  export type ChildCreateOrConnectWithoutSentChallengesInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutSentChallengesInput, ChildUncheckedCreateWithoutSentChallengesInput>
  }

  export type ChildCreateWithoutReceivedChallengesInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: UserCreateNestedOneWithoutChildrenInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogCreateNestedManyWithoutChildInput
    activities?: ActivityFeedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeCreateNestedManyWithoutChallengerInput
  }

  export type ChildUncheckedCreateWithoutReceivedChallengesInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parentId: string
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutChildInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutChildInput
    activities?: ActivityFeedUncheckedCreateNestedManyWithoutChildInput
    alerts?: ParentAlertUncheckedCreateNestedManyWithoutChildInput
    sentFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutFromChildInput
    receivedFriendRequests?: FriendRequestUncheckedCreateNestedManyWithoutToChildInput
    sentChallenges?: PeerChallengeUncheckedCreateNestedManyWithoutChallengerInput
  }

  export type ChildCreateOrConnectWithoutReceivedChallengesInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutReceivedChallengesInput, ChildUncheckedCreateWithoutReceivedChallengesInput>
  }

  export type ChildUpsertWithoutSentChallengesInput = {
    update: XOR<ChildUpdateWithoutSentChallengesInput, ChildUncheckedUpdateWithoutSentChallengesInput>
    create: XOR<ChildCreateWithoutSentChallengesInput, ChildUncheckedCreateWithoutSentChallengesInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutSentChallengesInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutSentChallengesInput, ChildUncheckedUpdateWithoutSentChallengesInput>
  }

  export type ChildUpdateWithoutSentChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UserUpdateOneRequiredWithoutChildrenNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUpdateManyWithoutToChildNestedInput
    receivedChallenges?: PeerChallengeUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUncheckedUpdateWithoutSentChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUncheckedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUncheckedUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUncheckedUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUncheckedUpdateManyWithoutToChildNestedInput
    receivedChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUpsertWithoutReceivedChallengesInput = {
    update: XOR<ChildUpdateWithoutReceivedChallengesInput, ChildUncheckedUpdateWithoutReceivedChallengesInput>
    create: XOR<ChildCreateWithoutReceivedChallengesInput, ChildUncheckedCreateWithoutReceivedChallengesInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutReceivedChallengesInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutReceivedChallengesInput, ChildUncheckedUpdateWithoutReceivedChallengesInput>
  }

  export type ChildUpdateWithoutReceivedChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UserUpdateOneRequiredWithoutChildrenNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUpdateManyWithoutChallengerNestedInput
  }

  export type ChildUncheckedUpdateWithoutReceivedChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUncheckedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUncheckedUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUncheckedUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUncheckedUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengerNestedInput
  }

  export type ChildCreateManyParentInput = {
    id?: string
    name: string
    age: number
    grade?: string | null
    avatar?: string | null
    xp?: number
    level?: number
    streak?: number
    longestStreak?: number
    lastActiveDate?: string | null
    totalQuizzes?: number
    totalWatchTime?: number
    screenTimeLimit?: number
    badges?: string
    weakSubjects?: string
    strongSubjects?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClassroomCreateManyTeacherInput = {
    id?: string
    name: string
    subject?: string | null
    joinCode: string
    grade?: string | null
    studentIds?: string
    createdAt?: Date | string
  }

  export type MessageCreateManySenderInput = {
    id?: string
    receiverId: string
    content: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MessageCreateManyReceiverInput = {
    id?: string
    senderId: string
    content: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ChildUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quizAttempts?: QuizAttemptUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutChildNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutChildNestedInput
    activities?: ActivityFeedUncheckedUpdateManyWithoutChildNestedInput
    alerts?: ParentAlertUncheckedUpdateManyWithoutChildNestedInput
    sentFriendRequests?: FriendRequestUncheckedUpdateManyWithoutFromChildNestedInput
    receivedFriendRequests?: FriendRequestUncheckedUpdateManyWithoutToChildNestedInput
    sentChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengerNestedInput
    receivedChallenges?: PeerChallengeUncheckedUpdateManyWithoutChallengedNestedInput
  }

  export type ChildUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    lastActiveDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuizzes?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    screenTimeLimit?: IntFieldUpdateOperationsInput | number
    badges?: StringFieldUpdateOperationsInput | string
    weakSubjects?: StringFieldUpdateOperationsInput | string
    strongSubjects?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassroomUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    joinCode?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    studentIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessons?: LessonUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    joinCode?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    studentIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessons?: LessonUncheckedUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    joinCode?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    studentIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptCreateManyChildInput = {
    id?: string
    quizId: string
    score: number
    totalQuestions: number
    answers: string
    timeTaken?: number | null
    difficulty: string
    xpEarned?: number
    completedAt?: Date | string
  }

  export type WatchLogCreateManyChildInput = {
    id?: string
    contentId: string
    watchedAt?: Date | string
    duration?: number
  }

  export type ActivityFeedCreateManyChildInput = {
    id?: string
    type: string
    title: string
    description?: string | null
    xpEarned?: number
    metadata?: string | null
    createdAt?: Date | string
  }

  export type ParentAlertCreateManyChildInput = {
    id?: string
    type: string
    title: string
    message: string
    severity?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type FriendRequestCreateManyFromChildInput = {
    id?: string
    toChildId: string
    status?: string
    parentApproved?: boolean
    createdAt?: Date | string
  }

  export type FriendRequestCreateManyToChildInput = {
    id?: string
    fromChildId: string
    status?: string
    parentApproved?: boolean
    createdAt?: Date | string
  }

  export type PeerChallengeCreateManyChallengerInput = {
    id?: string
    challengedId: string
    quizId?: string | null
    subject: string
    status?: string
    challengerScore?: number | null
    challengedScore?: number | null
    winnerId?: string | null
    xpReward?: number
    createdAt?: Date | string
  }

  export type PeerChallengeCreateManyChallengedInput = {
    id?: string
    challengerId: string
    quizId?: string | null
    subject: string
    status?: string
    challengerScore?: number | null
    challengedScore?: number | null
    winnerId?: string | null
    xpReward?: number
    createdAt?: Date | string
  }

  export type QuizAttemptUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalQuestions?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quiz?: QuizUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type QuizAttemptUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalQuestions?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalQuestions?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchLogUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    content?: ContentUpdateOneRequiredWithoutWatchLogsNestedInput
  }

  export type WatchLogUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type WatchLogUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type ActivityFeedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityFeedUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityFeedUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentAlertUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentAlertUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentAlertUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUpdateWithoutFromChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parentApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toChild?: ChildUpdateOneRequiredWithoutReceivedFriendRequestsNestedInput
  }

  export type FriendRequestUncheckedUpdateWithoutFromChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    toChildId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parentApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyWithoutFromChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    toChildId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parentApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUpdateWithoutToChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parentApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromChild?: ChildUpdateOneRequiredWithoutSentFriendRequestsNestedInput
  }

  export type FriendRequestUncheckedUpdateWithoutToChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromChildId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parentApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyWithoutToChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromChildId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parentApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeerChallengeUpdateWithoutChallengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    challengerScore?: NullableIntFieldUpdateOperationsInput | number | null
    challengedScore?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    xpReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenged?: ChildUpdateOneRequiredWithoutReceivedChallengesNestedInput
  }

  export type PeerChallengeUncheckedUpdateWithoutChallengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengedId?: StringFieldUpdateOperationsInput | string
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    challengerScore?: NullableIntFieldUpdateOperationsInput | number | null
    challengedScore?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    xpReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeerChallengeUncheckedUpdateManyWithoutChallengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengedId?: StringFieldUpdateOperationsInput | string
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    challengerScore?: NullableIntFieldUpdateOperationsInput | number | null
    challengedScore?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    xpReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeerChallengeUpdateWithoutChallengedInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    challengerScore?: NullableIntFieldUpdateOperationsInput | number | null
    challengedScore?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    xpReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenger?: ChildUpdateOneRequiredWithoutSentChallengesNestedInput
  }

  export type PeerChallengeUncheckedUpdateWithoutChallengedInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengerId?: StringFieldUpdateOperationsInput | string
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    challengerScore?: NullableIntFieldUpdateOperationsInput | number | null
    challengedScore?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    xpReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeerChallengeUncheckedUpdateManyWithoutChallengedInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengerId?: StringFieldUpdateOperationsInput | string
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    challengerScore?: NullableIntFieldUpdateOperationsInput | number | null
    challengedScore?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    xpReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchLogCreateManyContentInput = {
    id?: string
    childId: string
    watchedAt?: Date | string
    duration?: number
  }

  export type WatchLogUpdateWithoutContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    child?: ChildUpdateOneRequiredWithoutWatchLogsNestedInput
  }

  export type WatchLogUncheckedUpdateWithoutContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type WatchLogUncheckedUpdateManyWithoutContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type QuizAttemptCreateManyQuizInput = {
    id?: string
    childId: string
    score: number
    totalQuestions: number
    answers: string
    timeTaken?: number | null
    difficulty: string
    xpEarned?: number
    completedAt?: Date | string
  }

  export type QuizAttemptUpdateWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalQuestions?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: ChildUpdateOneRequiredWithoutQuizAttemptsNestedInput
  }

  export type QuizAttemptUncheckedUpdateWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalQuestions?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptUncheckedUpdateManyWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalQuestions?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonCreateManyClassroomInput = {
    id?: string
    title: string
    description?: string | null
    contentUrl?: string | null
    quizId?: string | null
    order?: number
    createdAt?: Date | string
  }

  export type LessonUpdateWithoutClassroomInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonUncheckedUpdateWithoutClassroomInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonUncheckedUpdateManyWithoutClassroomInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    quizId?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChildCountOutputTypeDefaultArgs instead
     */
    export type ChildCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChildCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContentCountOutputTypeDefaultArgs instead
     */
    export type ContentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuizCountOutputTypeDefaultArgs instead
     */
    export type QuizCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuizCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClassroomCountOutputTypeDefaultArgs instead
     */
    export type ClassroomCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassroomCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChildDefaultArgs instead
     */
    export type ChildArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChildDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContentDefaultArgs instead
     */
    export type ContentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WatchLogDefaultArgs instead
     */
    export type WatchLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WatchLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuizDefaultArgs instead
     */
    export type QuizArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuizDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuizAttemptDefaultArgs instead
     */
    export type QuizAttemptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuizAttemptDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FriendRequestDefaultArgs instead
     */
    export type FriendRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FriendRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ParentAlertDefaultArgs instead
     */
    export type ParentAlertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ParentAlertDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClassroomDefaultArgs instead
     */
    export type ClassroomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassroomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LessonDefaultArgs instead
     */
    export type LessonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LessonDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActivityFeedDefaultArgs instead
     */
    export type ActivityFeedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActivityFeedDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MessageDefaultArgs instead
     */
    export type MessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MessageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PeerChallengeDefaultArgs instead
     */
    export type PeerChallengeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PeerChallengeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BadgeDefaultArgs instead
     */
    export type BadgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BadgeDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}