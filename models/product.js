const { Schema, model } = require('mongoose');
const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'category is required']
    },
    state: {
        type: Boolean,
        default: true
    },
    // img: {
    //     type: String,
    //     required: [true, 'img is required']
    // },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    },
    availability: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

ProductSchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();
    return data;
}


module.exports = model('Product', ProductSchema);