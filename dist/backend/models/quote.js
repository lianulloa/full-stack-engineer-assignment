"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuoteSchema = new mongoose_1.Schema({
    buy_price: {
        type: Number,
        required: [true, "buy_price is required"]
    },
    sell_price: {
        type: Number,
        required: [true, "sell_price is required"]
    },
    source: {
        type: String,
        required: [true, "source is required"]
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
        },
        versionKey: false
    },
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Quote", QuoteSchema);
