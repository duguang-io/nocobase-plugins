var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var metabase_dashboard_exports = {};
__export(metabase_dashboard_exports, {
  default: () => metabase_dashboard_default
});
module.exports = __toCommonJS(metabase_dashboard_exports);
var metabase_dashboard_default = {
  name: "metabaseDashboard",
  createdBy: true,
  updatedBy: true,
  fields: [
    {
      type: "uid",
      // 主键
      name: "id",
      primaryKey: true
    },
    {
      type: "string",
      // 存实际的 dashboard 编号
      name: "dashboardId",
      required: true
    }
  ]
};
