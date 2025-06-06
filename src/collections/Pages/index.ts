import type {CollectionConfig} from 'payload'
import {loggedIn} from './access/loggedIn'
import {formatSlug} from './hooks/formatSlug'
import {ResponsiveGallery} from "@/blocks/responsive-gallery/config";
import {Hero} from "@/blocks/hero/config";
import {GridOrCarousel} from "@/blocks/grid-or-carousel/config";


export const Pages: CollectionConfig = {
    slug: 'pages',
    access: {
        create: loggedIn,
        delete: loggedIn,
        read: () => true,
        update: loggedIn,
    },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt'],
        livePreview: {
            url: ({data}) => {
                const isHomePage = data.slug === 'home'
                return `${process.env.NEXT_PUBLIC_SERVER_URL}${!isHomePage ? `/${data.slug}` : ''}`
            },
        },
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [formatSlug('title')],
            },
            index: true,
            label: 'Slug',
        }, {
            name: 'layout',
            label: 'Layout',
            type: 'blocks',
            blocks: [ResponsiveGallery, Hero, GridOrCarousel],
        },
    ],
    versions: {
        drafts: {
            autosave: {
                interval: 375,
            },
        },
    },
}
