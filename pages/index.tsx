import Head from 'next/head';
import { HelloWorld } from '../components/HelloWorld/HelloWorld';
import { Box, VStack } from '@chakra-ui/react';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Starships ;)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
            <HelloWorld />
      </main>
    </div>
  );
}
