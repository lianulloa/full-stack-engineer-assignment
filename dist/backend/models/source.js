"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SourceSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true
    },
    selector: {
        valuesParentSelector: {
            type: String,
            required: true
        },
        buySelector: {
            type: String,
            required: true
        },
        sellSelector: {
            type: String,
            required: true
        }
    },
    active: {
        type: Boolean,
        default: true
    }
});
exports.default = (0, mongoose_1.model)("Source", SourceSchema);
