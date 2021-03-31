// Right click on the script name and hit "Run" to execute
(async () => {
    try {
        console.log('Running setup script...')

        let contract;
        let artifactsPath;
        let contractName;
        let contractVT;

        const accounts = await web3.eth.getAccounts()

        // -----------------------
        // DEPLOY Vulnerable Token (Deployer: 0)
        
        contractName = 'Safe_ERC20_Internal' // Change this for other contract
    
        // Note that the script needs the ABI which is generated from the compilation artifact.
        // Make sure contract is compiled and artifacts are generated
        artifactsPath = `browser/github/damianrusinek/eth-vulns-tutorial/contracts/t1-access-control/ex2-internal/solution/artifacts/${contractName}.json` // Change this for different path

        let metadataVT = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        contract = new web3.eth.Contract(metadataVT.abi)

        contract = contract.deploy({
            data: metadataVT.data.bytecode.object,
            arguments: ['MyVulnToken', 'MVT']
        })

        newContractInstance = await contract.send({
            from: accounts[0],
            gas: 3000000,
            gasPrice: '30000000000'
        })
        console.log('[Safe] MyVulnerableToken deployed at ', newContractInstance.options.address)

        contractVT = new web3.eth.Contract(metadataVT.abi, newContractInstance.options.address)
        
    } catch (e) {
        console.log(e);
    }
  })()