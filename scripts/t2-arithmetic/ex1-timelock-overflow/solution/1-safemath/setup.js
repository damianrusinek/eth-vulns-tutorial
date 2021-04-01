// Right click on the script name and hit "Run" to execute
(async () => {
    try {
        console.log('Running setup script...')

        let contract;
        let artifactsPath;
        let contractName;

        let contractTD;

        const accounts = await web3.eth.getAccounts()

        // -----------------------
        // DEPLOY TimeLockDeposit (Deployer: 0)
        
        contractName = 'TimeLockDepositWithSafeMath' // Change this for other contract
    
        // Note that the script needs the ABI which is generated from the compilation artifact.
        // Make sure contract is compiled and artifacts are generated
        artifactsPath = `browser/github/damianrusinek/eth-vulns-tutorial/contracts/t2-arithmetic/ex1-timelock-overflow/solution/1-safemath/artifacts/${contractName}.json` // Change this for different path

        let metadataTD = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        contract = new web3.eth.Contract(metadataTD.abi)

        contract = contract.deploy({
            data: metadataTD.data.bytecode.object,
            arguments: []
        })

        newContractInstance = await contract.send({
            from: accounts[0],
            gas: 3000000,
            gasPrice: '30000000000'
        })
        console.log('TimeLockDepositWithSafeMath deployed at ', newContractInstance.options.address)

        contractTD = new web3.eth.Contract(metadataTD.abi, newContractInstance.options.address)
        
    } catch (e) {
        console.log(e);
    }
  })()