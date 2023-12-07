import { type UseStore, del, get, promisifyRequest, set, update } from 'idb-keyval';

const databases: IDBOpenDBRequest[] = [];

function createStore(): UseStore {
	const request = indexedDB.open('pwa-store');
	const storeName = 'data';
	databases.push(request);
	request.onupgradeneeded = () => request.result.createObjectStore(storeName);
	const dbp = promisifyRequest(request);
	return (txMode, callback) =>
		dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}

let defaultGetStoreFunc: UseStore | undefined;
function defaultGetStore() {
	if (!defaultGetStoreFunc) defaultGetStoreFunc = createStore();

	return defaultGetStoreFunc;
}

export function getIdb<T = any>(key: IDBValidKey) {
	return get<T>(key, defaultGetStore());
}

export function setIdb(key: IDBValidKey, value: any) {
	return set(key, value, defaultGetStore());
}

export function updateIdb<T = any>(key: IDBValidKey, updater: (oldValue: T | undefined) => T) {
	return update(key, updater, defaultGetStore());
}

export function delIdb(key: IDBValidKey) {
	return del(key, defaultGetStore());
}

//  function closeDatabases() {
// 	databases.forEach((db) => {
// 		if (db.result) db.result.close();
// 	});
// 	defaultGetStoreFunc = undefined;
// }

//  function deleteDatabases() {
// 	databases.forEach((db) => {
// 		if (db.result) db.result.close();
// 		indexedDB.deleteDatabase(db.result.name);
// 	});
// 	defaultGetStoreFunc = undefined;
// }
