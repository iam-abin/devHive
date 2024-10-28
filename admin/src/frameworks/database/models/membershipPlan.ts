import mongoose from 'mongoose';
import { IMembershipPlan } from '../../types/membershipPlan';

export interface IMembershipPlansDocument extends mongoose.Document, IMembershipPlan {
    isActive: boolean;
}

const membershipPlansSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        features: {
            type: Array<string>,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true,
    },
);

interface MembershipPlansModel extends mongoose.Model<IMembershipPlansDocument> {
    buildMembershipPlan(attributes: IMembershipPlan): IMembershipPlansDocument;
}

membershipPlansSchema.statics.buildMembershipPlan = (attributes: IMembershipPlan) => {
    return new MembershipPlansModel({
        name: attributes.name,
        features: attributes.features,
        description: attributes.description,
        price: attributes.price,
    });
};

export const MembershipPlansModel = mongoose.model<IMembershipPlansDocument, MembershipPlansModel>(
    'MembershipPlan',
    membershipPlansSchema,
);
