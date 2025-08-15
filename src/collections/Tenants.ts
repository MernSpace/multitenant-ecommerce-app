import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
    slug: 'tenants',
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: 'slug',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: "Store Name",
            admin: {
                description: "This is the name of the store(e.g Sifat's Store)"
            }
        },
        {
            name: "slug",
            type: "text",
            index: true,
            required: true,
            unique: true,
            admin: {
                description: "This is the subdomain for the store (e.g. [slug].nachol-bazzar.com)"
            },
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            }
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media"
        },
        {
            name: "stripeAccountId",
            type: "text",
            required: true,
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            },
            admin: {
                description: "StripeAccountIs can be update by Store owner!"
            }
        },
        {
            name: "stripDetailsSubmited",
            type: "checkbox",
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            },
            admin: {
                description: "You cannot create products untils you submit your stripe details"
            }
        }
    ],
}