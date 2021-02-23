import { IRunner } from './interfaces';
import { Reaction } from './reaction';

export function autorun(runner: IRunner): void {
    const reaction = new Reaction(runner);
    reaction.track(runner);
}
