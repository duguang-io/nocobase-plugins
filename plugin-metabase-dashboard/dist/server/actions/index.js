var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var actions_exports = {};
__export(actions_exports, {
  getEmbedUrl: () => getEmbedUrl
});
module.exports = __toCommonJS(actions_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
async function getEmbedUrl(ctx, next) {
  const { filterByTk } = ctx.action.params;
  const { resourceName } = ctx.action;
  const repository = ctx.db.getRepository(resourceName);
  const record = await repository.findById(filterByTk);
  if (!record) {
    ctx.body = { error: "Record not found" };
    return;
  }
  const dashboardId = record.get("dashboardId");
  const configRepo = ctx.db.getRepository("metabaseDashboardConfiguration");
  const configRecord = await configRepo.findOne({
    where: { id: 1 }
    // 确保只取 `id=1` 的记录
  });
  if (!configRecord) {
    ctx.body = "No Metabase config found. Please set it in plugin settings.";
    return;
  }
  const METABASE_SITE_URL = configRecord.get("baseUrl");
  const METABASE_SECRET_KEY = configRecord.get("secretKey");
  const payload = {
    resource: { dashboard: Number(dashboardId) },
    params: {},
    exp: Math.round(Date.now() / 1e3) + 10 * 60
  };
  const token = import_jsonwebtoken.default.sign(payload, METABASE_SECRET_KEY);
  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;
  ctx.body = iframeUrl;
  ctx.withoutDataWrapping = true;
  ctx.set({
    "Content-Type": "text/plain; charset=UTF-8"
  });
  await next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getEmbedUrl
});
