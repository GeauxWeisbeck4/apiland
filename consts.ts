// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

/** Contains constants used throughout the API server.
 *
 * @module
 */

/** A symbol used to indicate the root of something. */
export const ROOT_SYMBOL = "$$root$$";

/** These constants represent the Google Datastore kinds that are used across
 * the API server. */
export const kinds = {
  /** An object which contains information about the usage of built-in APIs. */
  API_STATS_KIND: "api_stats",
  /** A cached version of the meta data associated with a code page view. */
  CODE_PAGE_KIND: "code_page",
  /** A single entity which holds configuration, specifically related to API
   * token authentication. */
  CONFIG_KIND: "config",
  /** An error that was generated when doing the dependency analysis of a
   * module. */
  DEP_ERROR_KIND: "dependency_error",
  /** A cache of information about each dependency source. */
  DEP_METRICS_KIND: "dependency_metrics",
  /** A representation of a doc node generated by `deno_doc` which has been
   * serialized to an entity which can be stored in the Google Datastore. */
  DOC_NODE_KIND: "doc_node",
  /** Cached version of the meta data related to a documentation page. */
  DOC_PAGE_KIND: "doc_page",
  /** A doc work item, which indicates a module that needs to be doc'ed. */
  DOC_WORK_ITEM: "doc_work_item",
  /** Cached information about global symbols that are available in Deno CLI. */
  GLOBAL_SYMBOLS_KIND: "global_symbols",
  /** Cached version of the meta data for an info page of a module. */
  INFO_PAGE_KIND: "info_page",
  /** Meta data about a library (e.g. Deno Stable). */
  LIBRARY_KIND: "library",
  /** Meta data associated with a specific version of a library. */
  LIBRARY_VERSION_KIND: "library_version",
  /** Daily and version related usage for a module. */
  METRIC_USAGE_KIND: "metric_usage",
  /** A dependency of a module. */
  MODULE_DEP_KIND: "module_dependency",
  /** A file or directory that is associated with a specific module version, along
   * with other meta data associated with that entry. */
  MODULE_ENTRY_KIND: "module_entry",
  /** A cache of the index of a directory within a module */
  MODULE_INDEX_KIND: "module_index",
  /** The meta data associated with a module. */
  MODULE_KIND: "module",
  /** Metrics for modules.  */
  MODULE_METRICS_KIND: "module_metrics",
  /** Meta data related to a specific version of a module.  */
  MODULE_VERSION_KIND: "module_version",
  /** A cached version of the navigation index for a module dir. */
  NAV_INDEX_KIND: "nav_index",
  /** A cached version of an index of paths used for generating completions. */
  PATH_COMPLETIONS_KIND: "path_completions",
  /** Represents dependency metric information by source type. */
  SOURCE_METRIC_KIND: "dependency_metrics",
  /** Metrics for a submodule. */
  SUBMODULE_METRICS_KIND: "submodule_metrics",
  /** A cache of symbols within the scope of a module. */
  SYMBOL_INDEX_KIND: "symbol_index",
  /** A cache of symbol items for libraries. */
  SYMBOL_ITEMS_KIND: "symbol_items",
} as const;

/** Different libraries are that are stored in the datastore. */
export const libs = {
  /** The name of the stable built-in APIs */
  DENO_STABLE_NAME: "deno_stable",
  /** The name of the unstable built-in APIs (which includes stable) */
  DENO_UNSTABLE_NAME: "deno_unstable",
  /** The name of the esnext build-in APIs */
  ESNEXT_NAME: "esnext",
};

/** These constants represent the different algolia index which are generated
 * from data contained within datastore. */
export const indexes = {
  /** The index which contains all the _symbols_ which are generated from
   * modules and libraries. */
  SYMBOL_INDEX: "doc_nodes",
  /** The index which contains all the modules (and some submodules). */
  MODULE_INDEX: "modules",
};

/** A set of URL patterns that are used to parse specifiers to determine their
 * source. */
export const patterns = {
  /** Modules that or external to the current module, but hosted on
   * `deno.land/x`. */
  "deno.land/x": [
    new URLPattern({
      protocol: "https",
      hostname: "deno.land",
      pathname: "/x/:pkg{@:ver}?/:mod*",
      search: "*",
      hash: "*",
    }),
  ],
  /** Modules that are being read directly off the deno.land CDN. */
  "cdn.deno.land": [
    // https://cdn.deno.land/mimetypes/versions/v1.0.0/raw/mod.ts
    new URLPattern("https://cdn.deno.land/:pkg/versions/:ver/raw/:mod+"),
  ],
  /** Dependency that originates from the Deno `std` library. */
  "std": [
    new URLPattern({
      protocol: "https",
      hostname: "deno.land",
      pathname: "/std{@:ver}?/:mod*",
      search: "*",
      hash: "*",
    }),
  ],
  /** Modules/packages hosted on nest.land. */
  "nest.land": [new URLPattern("https://x.nest.land/:pkg@:ver/:mod*")],
  /** Modules hosted on crux.land. */
  "crux.land": [new URLPattern("https://crux.land/:pkg@:ver")],
  /** Content hosted on GitHub. */
  "github.com": [
    new URLPattern({
      protocol: "https",
      hostname: "raw.githubusercontent.com",
      pathname: "/:org/:pkg/:ver/:mod*",
      search: "*",
    }),
    // https://github.com/denoland/deno_std/raw/main/http/mod.ts
    new URLPattern(
      "https://github.com/:org/:pkg/raw/:ver/:mod*",
    ),
  ],
  /** Content that is hosted in a GitHub gist. */
  "gist.github.com": [
    new URLPattern(
      "https://gist.githubusercontent.com/:org/:pkg/raw/:ver/:mod*",
    ),
  ],
  /** Packages that are hosted on esm.sh. */
  "esm.sh": [
    new URLPattern({
      protocol: "http{s}?",
      hostname: "{cdn.}?esm.sh",
      pathname: "/:org(@[^/]+)?/:pkg{@:ver}?/:mod*",
      search: "*",
    }),
    // https://esm.sh/v92/preact@10.10.0/src/index.d.ts
    new URLPattern({
      protocol: "http{s}?",
      hostname: "{cdn.}?esm.sh",
      pathname: "/:regver(stable|v[0-9]+)/:org(@[^/]+)?/:pkg{@:ver}?/:mod*",
      search: "*",
    }),
  ],
  "denopkg.com": [
    new URLPattern({
      protocol: "https",
      hostname: "denopkg.com",
      pathname: "/:org(@[^/]+)?/:pkg{@:ver}?/:mod*",
      search: "*",
      hash: "*",
    }),
  ],
  "denolib.com": [
    new URLPattern({
      protocol: "https",
      hostname: "denolib.com",
      pathname: "/:org(@[^/]+)?/:pkg{@:ver}?/:mod*",
      search: "*",
      hash: "*",
    }),
  ],
  "lib.deno.dev": [
    new URLPattern({
      protocol: "https",
      hostname: "lib.deno.dev",
      pathname: "/x/:pkg{@:ver}?/:mod*",
      search: "*",
      hash: "*",
    }),
  ],
  /** a github proxy */
  "pax.deno.dev": [
    // https://pax.deno.dev/windchime-yk/deno-util@v1.1.1/file.ts
    new URLPattern("https://pax.deno.dev/:org/:pkg{@:ver}?/:mod*"),
  ],
  /** a github proxy */
  "ghuc.cc": [
    // https://ghuc.cc/qwtel/kv-storage-interface/index.d.ts
    new URLPattern("https://ghuc.cc/:org/:pkg{@:ver}?/:mod*"),
  ],
  "ghc.deno.dev": [
    // https://ghc.deno.dev/tbjgolden/deno-htmlparser2@1f76cdf/htmlparser2/Parser.ts
    new URLPattern("https://ghc.deno.dev/:org/:pkg{@:ver}?/:mod*"),
  ],
  /** jspm.dev and jspm.io packages */
  "jspm.dev": [
    // https://jspm.dev/@angular/compiler@11.0.5
    new URLPattern(
      "https://jspm.dev/:org((?:npm:)?@[^/]+)?/:pkg{@:ver([^!/]+)}?{(![^/]+)}?/:mod*",
    ),
    // https://dev.jspm.io/markdown-it@11.0.1
    new URLPattern(
      "https://dev.jspm.io/:org((?:npm:)?@[^/]+)?/:pkg{@:ver([^!/]+)}?{(![^/]+)}?/:mod*",
    ),
  ],
  /** Packages that are hosted on skypack.dev */
  "skypack.dev": [
    new URLPattern({
      protocol: "https",
      hostname: "cdn.skypack.dev",
      pathname: "/:org(@[^/]+)?/:pkg{@:ver}?/:mod*",
      search: "*",
    }),
    // https://cdn.shopstic.com/pin/ajv-formats@v2.1.1-vcFtNZ2SctUV93FmiL2Q/dist=es2020,mode=types/dist/index.d.ts
    // this cdn simply redirects to skypack.dev
    new URLPattern({
      protocol: "https",
      hostname: "cdn.shopstic.com",
      pathname: "/pin/:org(@[^/]+)?/:pkg{@:ver([^-/]+)}:hash/:mod*",
      search: "*",
    }),
    // https://cdn.skypack.dev/-/@firebase/firestore@v3.4.3-A3UEhS17OZ2Vgra7HCZF/dist=es2019,mode=types/dist/index.d.ts
    new URLPattern(
      "https://cdn.skypack.dev/-/:org(@[^/]+)?/:pkg@:ver([^-]+):hash/:mod*",
    ),
    // https://cdn.pika.dev/class-transformer@^0.2.3
    new URLPattern({
      protocol: "https",
      hostname: "cdn.pika.dev",
      pathname: "/:org(@[^/]+)?/:pkg{@:ver}?/:mod*",
      search: "*",
    }),
  ],
  /** Packages that are hosted on jsdeliver.net */
  "jsdeliver.net": [
    new URLPattern(
      "https://cdn.jsdelivr.net/npm/:org(@[^/]+)?/:pkg{@:ver}?/:mod*",
    ),
    new URLPattern(
      "https://cdn.jsdelivr.net/gh/:org/:pkg{@:ver}?/:mod*",
    ),
  ],
  /** Packages that are hosted on unpkg.com */
  "unpkg.com": [
    new URLPattern(
      "https://unpkg.com/:org(@[^/]+)?/:pkg{@:ver}?/:mod*",
    ),
  ],

  /** Not really a package/module host, but performs codegen for aws APIs. */
  "aws-api": [
    // https://aws-api.deno.dev/latest/services/sqs.ts
    new URLPattern({
      protocol: "https",
      hostname: "aws-api.deno.dev",
      pathname: "/:ver/services/:pkg{(\\.ts)}",
      search: "*",
    }),
  ],

  /** Not really a package/module host, but performs codegen for google cloud
   * APIs. */
  "googleapis": [
    new URLPattern({
      protocol: "https",
      hostname: "googleapis.deno.dev",
      pathname: "/v1/:pkg([^:]+){(:)}:ver{(\\.ts)}",
      search: "*",
    }),
  ],
};
