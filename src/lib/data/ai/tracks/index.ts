/** The seven-persona taxonomy — the /ai/learn diagnosis instrument.
 *  Order matches the original learn page (explorer → enterprise). */
import type { Track, TrackId } from '../types';
import { explorer } from './explorer';
import { builder } from './builder';
import { architect } from './architect';
import { strategist } from './strategist';
import { author } from './author';
import { voice } from './voice';
import { enterprise } from './enterprise';

export const tracks: Track[] = [explorer, builder, architect, strategist, author, voice, enterprise];

export const trackById = (id: string): Track | undefined =>
	tracks.find((t) => t.id === (id as TrackId));
