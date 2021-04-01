// Right click on the script name and hit "Run" to execute
(async () => {
    try {
        console.log('Running setup script...')

        let contract;
        let artifactsPath;
        let contractName;

        let contractBT;

        const accounts = await web3.eth.getAccounts()

        // -----------------------
        // DEPLOY BatchToken (Deployer: 0)
        
        contractName = 'BatchTokenWithSafeMath' // Change this for other contract
    
        // Note that the script needs the ABI which is generated from the compilation artifact.
        // Make sure contract is compiled and artifacts are generated
        artifactsPath = `browser/github/damianrusinek/eth-vulns-tutorial/contracts/t2-arithmetic/ex2-batch-overflow/solution/1-safemath/artifacts/${contractName}.json` // Change this for different path

        let metadataBT = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        contract = new web3.eth.Contract(metadataBT.abi)

        contract = contract.deploy({
            data: metadataBT.data.bytecode.object,
            arguments: []
        })

        newContractInstance = await contract.send({
            from: accounts[0],
            gas: 3000000,
            gasPrice: '30000000000'
        })
        console.log('BatchTokenWithSafeMath deployed at ', newContractInstance.options.address)

        contractBT = new web3.eth.Contract(metadataBT.abi, newContractInstance.options.address)
        
    } catch (e) {
        console.log(e);
    }
  })()