import { useEffect, useState } from "react";

function useIndexedDB<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        const initializeDB = async () => {
            try {
                const dbRequest = indexedDB.open("MyAppDB", 1);

                dbRequest.onupgradeneeded = (event) => {
                    const db = dbRequest.result;
                    if (!db.objectStoreNames.contains("KeyValueStore")) {
                        db.createObjectStore("KeyValueStore", { keyPath: "key" });
                    }
                };

                dbRequest.onsuccess = async () => {
                    const db = dbRequest.result;
                    const transaction = db.transaction("KeyValueStore", "readonly");
                    const store = transaction.objectStore("KeyValueStore");

                    const getRequest = store.get(key);

                    getRequest.onsuccess = () => {
                        const result = getRequest.result;
                        if (result) {
                            setStoredValue(result.value);
                        } else {
                            setStoredValue(initialValue);
                        }
                    };

                    getRequest.onerror = () => {
                        console.error("Error reading from IndexedDB");
                    };
                };

                dbRequest.onerror = () => {
                    console.error("Error opening IndexedDB");
                };
            } catch (error) {
                console.error("Error initializing IndexedDB", error);
            }
        };

        initializeDB();
    }, [key, initialValue]);

    const setValue = async (value: T | ((val: T) => T)) => {
        try {
            const dbRequest = indexedDB.open("MyAppDB", 1);

            dbRequest.onsuccess = () => {
                const db = dbRequest.result;
                const transaction = db.transaction("KeyValueStore", "readwrite");
                const store = transaction.objectStore("KeyValueStore");

                const valueToStore = value instanceof Function ? value(storedValue) : value;

                const putRequest = store.put({ key, value: valueToStore });

                putRequest.onsuccess = () => {
                    setStoredValue(valueToStore);
                };

                putRequest.onerror = () => {
                    console.error("Error writing to IndexedDB");
                };
            };

            dbRequest.onerror = () => {
                console.error("Error opening IndexedDB");
            };
        } catch (error) {
            console.error("Error writing to IndexedDB", error);
        }
    };

    return [storedValue, setValue] as const;
}

export default useIndexedDB;
