import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const futuru = localFont({
  src: [
    {
      path: '../fonts/Futuru-Thin-iF66d197b140949.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/Futuru-Extralight-iF66d197b11c68f.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/Futuru-Light-iF66d197b129ae0.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Futuru-Regular-iF66d197b135b45.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Futuru-Medium-iF66d197b1052bd.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Futuru-Semibold-iF66d197b110774.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Futuru-Bold-iF66d197b0e43bd.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Futuru-Extrabold-iF66d197b0ee8c9.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/Futuru-Black-iF66d197b0dbd22.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-futuru',
  display: 'swap',
});

export const behindTheNineties = localFont({
  src: [
    {
      path: '../fonts/Behind-The-Nineties-Rg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Behind-The-Nineties-It.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Behind-The-Nineties-Md.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Behind-The-Nineties-Md-It.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/Behind-The-Nineties-Smbd.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Behind-The-Nineties-Smbd-It.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../fonts/Behind-The-Nineties-Bd.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Behind-The-Nineties-Bd-It.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../fonts/Behind-The-Nineties-Xbd.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/Behind-The-Nineties-Xbd-It.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../fonts/Behind-The-Nineties-Blk.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/Behind-The-Nineties-Blk-It.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-behind-the-nineties',
  display: 'swap',
}); 