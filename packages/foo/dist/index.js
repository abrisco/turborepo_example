"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClient = void 0;
const prisma_1 = require("../prisma");
const client = (url) => new prisma_1.PrismaClient(url ? { datasources: { db: { url } } } : undefined).$extends({
    model: {
        $allModels: {
            exists(where) {
                return __awaiter(this, void 0, void 0, function* () {
                    const context = prisma_1.Prisma.getExtensionContext(this);
                    const result = yield context.count({ where });
                    return result > 0;
                });
            }
        }
    }
});
// Export the prisma client
const getPrismaClient = (url) => {
    // @ts-ignore
    if (typeof window === 'undefined') {
        return client(url);
    }
    // @ts-ignore
    return null;
};
exports.getPrismaClient = getPrismaClient;
const prisma = (0, exports.getPrismaClient)();
exports.default = prisma;
__exportStar(require("../prisma"), exports);
//# sourceMappingURL=index.js.map