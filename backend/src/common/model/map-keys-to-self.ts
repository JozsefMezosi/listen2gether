export type MapKeysToSelf<T extends string | number | symbol> = {
    [K in T]: K;
};
