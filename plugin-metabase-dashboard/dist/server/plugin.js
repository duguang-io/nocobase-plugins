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
var plugin_exports = {};
__export(plugin_exports, {
  PluginBlockMetabaseDashboardServer: () => PluginBlockMetabaseDashboardServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_path = __toESM(require("path"));
var import_actions = require("./actions");
class PluginBlockMetabaseDashboardServer extends import_server.Plugin {
  async load() {
    await this.importCollections(import_path.default.resolve(__dirname, "collections"));
    this.app.actions({
      "metabaseDashboard:getEmbedUrl": import_actions.getEmbedUrl
    });
    this.app.acl.allow("metabaseDashboard", "getEmbedUrl", "loggedIn");
    this.app.acl.allow("metabaseDashboardConfiguration", "*", "loggedIn");
    this.app.acl.registerSnippet({
      name: "ui.metabaseDashboard",
      actions: ["metabaseDashboard:*"]
    });
  }
  async install(options) {
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = PluginBlockMetabaseDashboardServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginBlockMetabaseDashboardServer
});
