/**
 * Adds quote marks for normalize routes.
 * @param path Path to add quotes.
 */
export function quotePath(path: string) {
  let arr = path.split(/(\\|\/)/gi)
  let out = ''
  for (const item of arr) {
    if (item.match(/^(\\|\/)$/gi)) {
      continue
    }
    
    if (out.length > 0) {
      out += (process.platform == 'win32') ? '\\' : '/'
      out += `"${item}"`
    } else {
      out += item
    }
  }

  return out
}