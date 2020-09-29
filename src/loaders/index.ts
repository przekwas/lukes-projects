import express from 'express';
import expressLoader from './express';

export default async function ({ app }: { app: express.Application }) {

    await expressLoader({ app });
    console.log('express loaded');
    
}
