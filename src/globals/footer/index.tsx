'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SvgFromUrl } from '@/utilities/svgFromUrl';
import { isMedia } from '@/utilities/isMedia';
import { Footer } from '@/payload-types';

interface FooterBlockProps {
    FooterProps: Footer;
}

export function FooterBlock(props: FooterBlockProps) {
    const { FooterProps } = props;
    const {
        blockDisplayBoolean,
        button,
        copyright,
        logo,
        confidentiality,
        socials,
        terms,
        navArray,
        description,
    } = FooterProps;

    return (
        <div
            className={`border-t-primary flex flex-col items-center space-y-6 border px-6 py-18 sm:space-y-10 ${blockDisplayBoolean ? 'hidden' : ''}`}>
            <div className={'relative h-20 w-20 sm:h-40 sm:w-40'}>
                {isMedia(logo) && (
                    <Image
                        src={(logo?.url as string) || ''}
                        alt={logo?.alt}
                        fill
                        className={'object-contain'}
                    />
                )}
            </div>
            <p className={'text-chart-5 text-center text-xs sm:text-base'}>{description}</p>
            <Button
                onClick={() => redirect(button?.url || '')}
                className={
                    'bg-primary hover:bg-primary-foreground h-6 rounded-xl px-4 py-1 text-xs text-white sm:text-base'
                }>
                {button?.label}
            </Button>
            <div className={'flex flex-row space-x-4 text-xs sm:text-xl'}>
                {navArray?.map((item, i) => (
                    <Link key={i} href={item?.navItem?.url || ''} className={'inline'}>
                        <p className={'hover:underline'}> {item?.navItem?.label}</p>
                    </Link>
                ))}
            </div>
            <div
                className={
                    'text-chart-5 flex flex-row justify-between space-x-4 text-xs sm:text-base'
                }>
                <Link href={terms?.url || ''} className={'flex items-center'}>
                    <p className={'hover:underline'}> {terms?.label}</p>
                </Link>
                <Link href={confidentiality?.url || ''} className={'flex items-center'}>
                    <p className={'hover:underline'}> {confidentiality?.label}</p>
                </Link>
                {socials?.map((item, i) => (
                    <Link href={item.social?.url || ''} key={i}>
                        {isMedia(item.social?.icon) && (
                            <SvgFromUrl
                                url={item?.social?.icon?.url as string}
                                alt={item.social.icon.alt}
                                className={'h-4 w-4 sm:h-8 sm:w-8'}
                            />
                        )}
                    </Link>
                ))}
            </div>
            <div className={'text-chart-5 flex flex-row text-xs sm:text-base'}>
                {copyright?.map((item, i) => <p key={i}>{item.text}</p>)}
            </div>
        </div>
    );
}
