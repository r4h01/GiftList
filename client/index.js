const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const merkleTree = new MerkleTree(niceList)
  const root = merkleTree.getRoot()
  const name = "Sidney Kertzmann"
  const index = niceList.findIndex(n => n === name);
  console.log(index)
  const proof = merkleTree.getProof(index)
  console.log(proof)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof:proof, name:name, root:root
  });

  console.log({ gift });
}

main();