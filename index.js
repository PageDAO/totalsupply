const express = require('express')
const ethers = require('ethers');
const app = express()
const cosmwasmclient = require('cosmwasm').CosmWasmClient;
const port = process.env.PORT || 3000

const startupMessage = `--- PAGE TOKEN SUPPLY ---`

app.get('/', async (req, res)=>{
	// todo use ethers to connect to an infura rpc endpoint to query the ERC20 Token contract "0x60e683c6514edd5f758a55b6f393bebbafaa8d5e" totalSupply method
	try {
	  const totalSupply = await getTotalSupply();
	  // change the return type to json and return in the format { result: totalSupply }
	  res.json({ result: totalSupply.toString() });
	} catch (error) {
	  console.log(error);
	  res.status(500).send('Internal Server Error');
	}
  });

app.get('/totalsupply', async (req, res)=>{
	// todo use ethers to connect to an infura rpc endpoint to query the ERC20 Token contract "0x60e683c6514edd5f758a55b6f393bebbafaa8d5e" totalSupply method
	try {
	  const totalSupply = await getTotalSupply();
	  // change the return type to json and return in the format { result: totalSupply }
	  res.json({ result: totalSupply.toString() });
	} catch (error) {
	  console.log(error);
	  res.status(500).send('Internal Server Error');
	}
  });

app.get('/stats', async (req, res)=>{
	try {
		const client = await cosmwasmclient.connect('https://rpc.osmosis.zone');
		console.log(client);

		res.json({ stats: client });
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
});

app.listen(port, () => console.log(`PAGE Tokensupply app listening on port ${port}!`))

async function getTotalSupply() {
	try {
		const provider = new ethers.InfuraProvider('mainnet', process.env.INFURA_API_KEY);
		const contractAddress = '0x60e683c6514edd5f758a55b6f393bebbafaa8d5e';
		const abi = [
		  'function totalSupply() public view returns (uint256)'
		];
		const contract = new ethers.Contract(contractAddress, abi, provider);
		return(await contract.totalSupply());
		// change the return type to json and return in the format { result: totalSupply }
		res.json({ result: totalSupply.toString() });
	  } catch (error) {
		console.log(error);
		return null;
	}
}