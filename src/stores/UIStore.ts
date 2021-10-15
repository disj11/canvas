import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

export class UIStore {
    constructor(private readonly rootStore: RootStore) {
        makeAutoObservable(this);
    }
}