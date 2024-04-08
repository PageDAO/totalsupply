const express = require('express')
const ethers = require('ethers');
const app = express()
const port = process.env.PORT || 3000

const startupMessage = `--- PAGE TOKEN SUPPLY ---`

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/totalsupply', async (req, res)=>{
	// todo use ethers to connect to an infura rpc endpoint to query the ERC20 Token contract "0x60e683c6514edd5f758a55b6f393bebbafaa8d5e" totalSupply method
	try {
	  const provider = new ethers.InfuraProvider('mainnet', process.env.INFURA_API_KEY);
	  const contractAddress = '0x60e683c6514edd5f758a55b6f393bebbafaa8d5e';
	  const abi = [
		'function totalSupply() public view returns (uint256)'
	  ];
	  const contract = new ethers.Contract(contractAddress, abi, provider);
	  const totalSupply = await contract.totalSupply();
	  // change the return type to json and return in the format { result: totalSupply }
	  res.json({ result: totalSupply.toString() });
	} catch (error) {
	  console.log(error);
	  res.status(500).send('Internal Server Error');
	}
  });

app.listen(port, () => console.log(`PAGE Tokensupply app listening on port ${port}!`))
