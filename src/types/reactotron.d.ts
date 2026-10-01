import {Reactotron} from 'reactotron-core-client';

declare global {
  interface Console {
    /**
     * Reactotron logger - use console.tron.log() instead of console.log() in development
     * to see logs in Reactotron desktop app
     */
    tron: Reactotron<any>;
  }
}

export {};
