const { MongoClient } = require("mongodb");
const assert = require("assert");
const url = "mongodb://localhost:27017";
const dbName = "circulation";

const circulationRepo = require("./repos/circulaRepos");
const data = require("./circulatation.json");

async function main() {
  const client = new MongoClient(url);
  await client.connect();

  try {
    const results = await circulationRepo.loadData(data);
    // assert.equal(data.length, results.insertCount);

    const getData = await circulationRepo.get();
    // console.log(getData);
    // assert.equal(data.length, getData.length);

    // const filterData = await circulationRepo.get({
    //   Newspapers: getData[4].Newspapers,
    // });
    // assert.deepEqual(filterData[0], getData[4]);

    // const limitData = await circulationRepo.get({}, 3);
    // assert.deepEqual(limitData.length, 3);
    // const getId = await circulationRepo.getById(getData[4]._id);
    // console.log(getId);

    const newItem = {
      Newspaper: "Linh",
      "Daily Circulation, 2004": 2,
      "Daily Circulation, 2013": 3,
      "Change in Daily Circulation, 2004-2013": -34,
      "Pulitzer Prize Winners and Finalists, 1990-2003": 44,
      "Pulitzer Prize Winners and Finalists, 2004-2014": 41,
      "Pulitzer Prize Winners and Finalists, 1990-2014": 85,
    };
    const addItem = await circulationRepo.add(newItem);
    // console.log(addItem.ops[0]);

    const updateItem = await circulationRepo.update(addItem.ops[0]._id, {
      Newspaper: "Ngoc",
      "Daily Circulation, 2004": 2,
      "Daily Circulation, 2013": 3,
      "Change in Daily Circulation, 2004-2013": -34,
      "Pulitzer Prize Winners and Finalists, 1990-2003": 44,
      "Pulitzer Prize Winners and Finalists, 2004-2014": 41,
      "Pulitzer Prize Winners and Finalists, 1990-2014": 85,
    });
    // console.log(updateItem);

    const newAddItemQuery = await circulationRepo.getById(addItem.ops[0]._id);

    // console.log(newAddItemQuery);

    const removeItem = await circulationRepo.remove(newAddItemQuery._id);

    console.log(newAddItemQuery);
  } catch (error) {
    console.log(error);
  } finally {
    const admin = client.db(dbName).admin();

    // await client.db(dbName).dropDatabase();
    console.log(await admin.listDatabases());
    // console.log(results.insertCount, results.ops);

    client.close();
  }
}
main();
