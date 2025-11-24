# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-24

### ⚠️ BREAKING CHANGES

**None for users!** This is a major version bump due to internal restructuring, but there are **zero breaking changes** for package consumers using `require()`.

### Added

- ✨ **ES Module support** - Native ESM as the primary module format
- 📦 **Dual package exports** - Seamless support for both `import` and `require`
- 🔨 **Build system** - Automated transpilation from ESM to CommonJS
- 📁 **Source directory structure** - `src/` for ESM source, `dist/` for CJS builds
- 📝 **Comprehensive documentation** - Migration guide, quick start, and detailed README
- ✅ **Test scripts** - Verification for both module systems
- 🎯 **Modern package.json** - Conditional exports with `import` and `require` fields

### Changed

- 🏗️ **Package structure** - Reorganized into `src/` (source) and `dist/` (built) directories
- 📄 **Module format** - Source code now uses ES Modules syntax
- 🔧 **Build process** - Added `build.js` script to generate CommonJS from ESM
- 📦 **Package.json** - Updated with `"type": "module"` and dual exports configuration

### Maintained

- ✅ **Full backward compatibility** - All existing CommonJS code works without changes
- ✅ **Same API** - All methods and signatures remain unchanged
- ✅ **Same behavior** - Functionality is identical to v1.x

### Technical Details

**New file structure:**
```
Before (v1.x):          After (v2.0.0):
├── index.js            ├── src/
├── request.js          │   ├── index.js (ESM)
└── package.json        │   └── request.js (ESM)
                        ├── dist/
                        │   ├── index.cjs (built)
                        │   └── request.cjs (built)
                        ├── build.js
                        └── package.json
```

**Module resolution:**
- `import` → uses `src/index.js` (ESM)
- `require` → uses `dist/index.cjs` (CommonJS)

**Build automation:**
- `npm run build` - Manual build command
- `prepublishOnly` - Automatic build before publishing

### Migration

**For package users:**
```javascript
// v1.x - works exactly the same in v2.0.0
const { BoostGPT } = require('boostgpt');

// v2.0.0 - new ESM option (optional)
import { BoostGPT } from 'boostgpt';
```

**For package contributors:**
- Edit source files in `src/` directory
- Run `npm run build` to generate `dist/`
- Commit both `src/` and `dist/` changes

### Dependencies

- node-fetch: ^2.6.9 (unchanged)

### Compatibility

- Node.js: >= 12.20.0
- npm: >= 6.0.0
- ES Modules: Node.js >= 14.0.0 (recommended)

## [1.1.6] - Previous Release

### Features

- Bot management (create, read, update, delete, reset)
- Chat operations (send messages, fetch conversations)
- Training/source management (create, read, update, delete)
- Search functionality
- Vector-based semantic search
- CommonJS module system

### API Methods

- Bot: createBot, fetchBot, fetchBots, updateBot, resetBot, deleteBot
- Chat: chat, fetchChat, fetchChats, deleteChat, search
- Training: startTraining, fetchTraining, fetchTrainings, updateTraining, deleteTraining

---

## Version Comparison

| Feature | v1.1.6 | v2.0.0 |
|---------|--------|--------|
| CommonJS support | ✅ | ✅ |
| ES Modules support | ❌ | ✅ |
| Source format | CJS | ESM |
| Build process | None | Automatic |
| Dual exports | ❌ | ✅ |
| Tree-shaking | Limited | Full |
| Breaking changes | - | None |

## Upgrade Guide

### From v1.x to v2.0.0

**If you use `require()` (CommonJS):**
```bash
npm install boostgpt@latest
```
✅ No code changes needed!

**If you want to use `import` (ESM):**
```bash
npm install boostgpt@latest
```

Update your code:
```javascript
// Before
const { BoostGPT } = require('boostgpt');

// After  
import { BoostGPT } from 'boostgpt';
```

And either:
1. Use `.mjs` file extension, or
2. Add `"type": "module"` to your package.json

## Future Plans

- [ ] TypeScript type definitions
- [ ] Additional test coverage
- [ ] Performance optimizations
- [ ] Streaming response support improvements
- [ ] Enhanced error handling

## Support

- 📖 [Documentation](./README.md)
- 🚀 [Quick Start](./QUICKSTART.md)
- 🐛 [Issue Tracker](https://github.com/boostgpt/boostgpt-node/issues)

---

For more details, see the [full README](./README.md).