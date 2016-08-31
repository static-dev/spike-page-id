module.exports = function pageId (ctx) {
  return ctx.resourcePath.replace(`${ctx.options.context}/`, '').replace(/(.*)?(\..+?$)/, '$1').replace(new RegExp(`(?:${ctx.options.spike.dumpDirs.join('|')})/`), '').replace(/\//g, '-')
}
