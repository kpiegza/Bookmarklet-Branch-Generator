# Branch Name Bookmark Generator

Automatically generate normalized Git branch names from issue numbers and descriptions. Supports even older browsers (IE11+).

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Build the bookmarklet

```bash
npm run build
```

The code will be saved to `build/bookmarklet.txt`.

### 3. Add to your browser

#### Chrome / Edge / Brave:
1. Open **Bookmark Manager** (Ctrl+Shift+B)
2. Click **Add new bookmark**
3. Name: `Branch Name Generator`
4. URL: copy the entire code from `build/bookmarklet.txt` (the entire line starting with `javascript:`)
5. Save

#### Firefox:
1. Open **Bookmark Manager** (Ctrl+Shift+O)
2. **Organize** → **Add new bookmark**
3. Name: `Branch Name Generator`
4. Location: copy the entire code from `build/bookmarklet.txt`
5. Save

#### Safari:
1. **Bookmarks** → **Manage bookmarks**
2. **+** in the bottom left corner
3. Name: `Branch Name Generator`
4. Address: copy the entire code from `build/bookmarklet.txt`
5. Add

## Usage

**First, make sure the page contains:**
- An element with class `.issue-link` (e.g., "PROJ-123")
- An element with ID `summary-val` (e.g., "Create user dashboard")

**Then:**

1. Click the bookmark
2. The branch will be copied to clipboard: `PROJ-123-CREATE-USER-DASHBOARD`
3. Paste it in the command: `git checkout -b PROJ-123-CREATE-USER-DASHBOARD`

## Features

✅ **Normalizes diacritical marks** - ą→a, ł→l, é→e, etc. (lodash.deburr)
✅ **Converts to branch format** - UPPERCASE-WITH-DASHES
✅ **Automatically copies to clipboard** - always ready to paste
✅ **IIFE - safe** - doesn't add global variables
✅ **Minified** - 5.5KB with bundled library
✅ **Transpiled to ES5** - supports IE11 and older browsers
✅ **Webpack bundler** - tree-shaking, minification, transpilation in one pipeline
✅ **Supports all languages** - lodash deburr removes accents from all characters

## Architecture

### Build Pipeline (Webpack)

```
src/index.js (ES6+ with import deburr from 'lodash/deburr')
    ↓
[config/webpack.config.js]
    ↓
Webpack bundler + Babel (transpile ES6+ → ES5)
    ↓
Tree-shaking lodash → only deburr (~5KB)
    ↓
Terser (minification + mangling, ecma:5)
    ↓
Webpack IIFE wrap (!function(){...}();)
    ↓
build/bookmarklet-bundled.js [scripts/build-webpack.js adds javascript: prefix]
    ↓
build/bookmarklet.txt (ES5, IIFE, 5.5KB)
```

### Project Structure

```
.
├── src/
│   └── index.js                   # Clean ES6+ code (main source)
├── config/
│   └── webpack.config.js          # Webpack + Babel + Terser configuration
├── scripts/
│   └── build-webpack.js           # Main build script
├── build/
│   ├── bookmarklet-bundled.js     # Intermediate webpack bundle
│   └── bookmarklet.txt            # Final output (ES5, IIFE, 5.5KB)
├── package.json                   # Dependencies: Webpack, Babel, Terser, Lodash
├── .gitignore                     # Ignores build/, node_modules/, dist/
└── README.md                      # This file
```

## Development

If you want to change the logic:

1. **Edit** `src/index.js` (clean ES6+ code)
2. **Run** `npm run build` or `npm run dev`
3. The generated code in `build/bookmarklet.txt` will automatically:
   - Be bundled by webpack
   - Be transpiled to ES5 (Babel via webpack)
   - Be minified (Terser via webpack)
   - Be wrapped in IIFE
   - Have the `javascript:` prefix
   - Be ready to paste in a bookmark

## Configuration

### webpack.config.js (`config/webpack.config.js`)
- **entry**: `src/index.js` - input file
- **output**: `build/bookmarklet-bundled.js` - bundle with IIFE
- **target**: `['web', 'es5']` - full ES5 compatibility
- **babel-loader**: transpilation for IE11+
- **Terser**: minification with `ecma: 5`
- **Tree-shaking**: only `lodash/deburr` is bundled

### Build Script

**`scripts/build-webpack.js`** - main build script
- Runs webpack with `config/webpack.config.js`
- Reads the bundle from `build/bookmarklet-bundled.js`
- Adds the `javascript:` prefix
- Saves the final output to `build/bookmarklet.txt`

## Dependencies

### DevDependencies (build-only):
- **webpack** - application bundler
- **webpack-cli** - CLI for webpack
- **@babel/core** - transpile ES6+ to ES5
- **@babel/preset-env** - preset for IE11+ compatibility
- **babel-loader** - webpack loader for Babel
- **terser** - code minification and mangling
- **terser-webpack-plugin** - Terser integration with webpack

### Dependencies (bundled in bookmarklet):
- **lodash** - utility library (only `deburr` is tree-shaken)

## About Bundling

The bookmarklet contains only the `lodash/deburr` module (tree-shaken by webpack) to:
- Ensure the deburr function works with proven code
- Support all languages (not just Polish)
- Minimize code dedicated to accent removal
- Build in a simple, reliable way

## License

MIT
