const addDocumentToCache = async (
  documentName,
  _id = "",
  data,
  redisClient,
  expiryInSeconds = 3600
) => {
  const key = _id ? `${documentName}:${_id.toString()}` : documentName;

  try {
    await redisClient.json.set(key, "$", data);
    console.log(
      `Created or updated ${
        documentName.split(":")[0]
      } with id:${_id} in cache.`
    );

    if (expiryInSeconds !== null && expiryInSeconds !== undefined) {
      await redisClient.expire(key, expiryInSeconds);
      console.log(
        `${
          documentName?.split(":")[0] || documentName
        } with id:${_id} cached successfully with expiration of ${expiryInSeconds} seconds`
      );
    } else {
      console.log(
        `${
          documentName?.split(":")[0] || documentName
        } with id:${_id} cached with no expiration.`
      );
    }
  } catch (error) {
    console.error(
      `Error caching ${
        documentName?.split(":")[0] || documentName
      } with id:${_id}:`,
      error
    );
    throw error;
  }
};

const addDocumentToFullPageCache = async (
  key,
  data,
  redisClient,
  expiryInSeconds = 3600
) => {
  try {
    const pipeline = redisClient.multi();

    const dataArray = Array.isArray(data) ? data : [data];

    pipeline.del(key); // Delete existing cache if it exists for the same key

    if (dataArray.length > 0) {
      dataArray.forEach((item) => {
        pipeline.rPush(key, JSON.stringify(item));
      });
    } else {
      pipeline.set(key, JSON.stringify([]));
    }

    console.log(`Created or updated list cache for search term ${key}.`);

    if (expiryInSeconds !== null && expiryInSeconds !== undefined) {
      pipeline.expire(key, expiryInSeconds);
      console.log(
        `Search data for ${key} cached successfully with expiration of ${expiryInSeconds} seconds`
      );
    } else {
      console.log(`Search term ${key} cached with no expiration.`);
    }

    await pipeline.exec(); // Execute all pipeline commands in one go
  } catch (error) {
    console.error(`Error caching search term ${key} cache list:`, error);
    throw error;
  }
};

const getDocumentFromFullPageCache = async (key, redisClient) => {
  try {
    const keyExists = await redisClient.exists(key);

    if (!keyExists) {
      console.log(`Key '${key}' does not exist in cache.`);
      return null;
    }

    const keyType = await redisClient.type(key);

    if (keyType === "list") {
      const cachedList = await redisClient.lRange(key, 0, -1);
      if (!cachedList || cachedList.length === 0) {
        console.log(`No cached data found for key: ${key}`);
        return [];
      }
      // Parse JSON and return
      const parsedList = cachedList.map((item) => JSON.parse(item));
      console.log(
        `Retrieved ${parsedList.length} cached items for key: ${key}`
      );
      return parsedList;
    } else if (keyType === "string") {
      // Handle the case when an empty array is stored as a string ("[]")
      const cachedString = await redisClient.get(key);
      console.log(`Retrieved cached string for key: ${key}`);
      return JSON.parse(cachedString);
    } else {
      console.log(`Unexpected key type (${keyType}) for key: ${key}`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving cache for key ${key}:`, error);
    throw error;
  }
};

async function getDocumentFromCache(documentName, _id = "", redisClient) {
  try {
    const key = _id ? `${documentName}:${_id.toString()}` : documentName;
    const existingData = await redisClient.json.get(key);

    // check if data exists in the cache
    if (existingData) {
      console.log(
        `Retrieved ${
          documentName?.split(":")[0] || documentName
        } with id:${_id} from cache.`
      );
      return existingData;
    } else {
      console.log(
        `No cached data found for ${
          documentName?.split(":")[0] || documentName
        } with id:${_id}.`
      );
      return null;
    }
  } catch (error) {
    console.error(
      `Error getting document from cache ${
        documentName?.split(":")[0] || documentName
      } with id:${_id}:`,
      error
    );
    throw error;
  }
}

async function deleteDocumentsFromCache(documents, redisClient) {
  try {
    const multi = redisClient.multi();

    documents.forEach(({ documentName, _id }) => {
      const key = _id ? `${documentName}:${_id.toString()}` : documentName;
      multi.del(key);
    });

    const results = await multi.exec();

    documents.forEach(({ documentName, _id }, index) => {
      if (results[index] === 1) {
        console.log(
          `Successfully deleted ${documentName} with ${_id} from cache.`
        );
      } else {
        console.log(
          `No document found for ${documentName} with ${_id} in cache.`
        );
      }
    });
  } catch (error) {
    console.error(`Error deleting documents from cache:`, error);
    throw error;
  }
}

async function deleteDocumentsFromCacheWithPrefix(prefix, redisClient) {
  try {
    let cursor = "0";
    let keys;
    let keysDeleted = false;
    do {
      // Use redis SCAN function to get to keys with prefix
      const result = await redisClient.scan(cursor, {
        MATCH: `${prefix}*`,
        COUNT: 100,
      });
      cursor = String(result.cursor); // new cursor for next iteration
      keys = result && result.keys ? result.keys : []; // keys received from current scan

      if (keys.length > 0) {
        keysDeleted = true;
        const multi = redisClient.multi();
        keys.forEach((key) => multi.del(key));
        const results = await multi.exec();

        keys.forEach((key, index) => {
          if (results[index] === 1) {
            console.log(`Successfully deleted key ${key} from cache.`);
          } else {
            console.log(`No key found for ${key} in cache.`);
          }
        });
      }
    } while (cursor !== "0");
    if (!keysDeleted) {
      console.log(`No matching keys found with prefix '${prefix}' to delete.`);
    }
  } catch (error) {
    console.error(`Error deleting documents from cache:`, error);
    throw error;
  }
}

export {
  addDocumentToCache,
  getDocumentFromCache,
  deleteDocumentsFromCache,
  addDocumentToFullPageCache,
  getDocumentFromFullPageCache,
  deleteDocumentsFromCacheWithPrefix,
};
