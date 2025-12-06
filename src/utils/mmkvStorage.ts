import {MMKV} from 'react-native-mmkv';
const storage = new MMKV();

export const storeData = (key: string, value: any) => storage.set(key, value);

export const getData = (key: string) => storage.getString(key);

export const getBooleanData = (key: string) => storage.getBoolean(key);

export const deleteData = (key: string) => storage.delete(key);

export const data = () => storage.clearAll();
