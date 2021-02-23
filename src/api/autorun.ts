import { IRunner } from '../interfaces';
import { Reaction } from '../core/reaction';
import { ObservableCollection } from '../core/collection';

export function autorun(runner: IRunner): void {
    const oc = new ObservableCollection();
    oc.clear();
    const reaction = new Reaction(runner);
    reaction.track(runner);
}
