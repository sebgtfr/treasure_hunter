"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumeric = void 0;
const isNumeric = (num) => num.length > 0 && !isNaN(+num);
exports.isNumeric = isNumeric;
