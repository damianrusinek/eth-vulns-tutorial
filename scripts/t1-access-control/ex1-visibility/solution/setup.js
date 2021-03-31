// Right click on the script name and hit "Run" to execute
(async () => {
    try {
        console.log('Running setup script...')

        let contract;
        let artifactsPath;
        let contractName;

        let contractDT;
        let contractVT;

        const accounts = await web3.eth.getAccounts()
        
        // -----------------------
        // DEPLOY Dummy Token (Deployer: 0)
        
        contractName = 'DummyToken' // Change this for other contract
        
        // Note that the script needs the ABI which is generated from the compilation artifact.
        // Make sure contract is compiled and artifacts are generated
        artifactsPath = `browser/github/damianrusinek/eth-vulns-tutorial/contracts/common/token/artifacts/${contractName}.json` // Change this for different path

        let metadataDT = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        contract = new web3.eth.Contract(metadataDT.abi)

        contract = contract.deploy({
            data: metadataDT.data.bytecode.object,
            arguments: []
        })

        newContractInstance = await contract.send({
            from: accounts[0],
            gas: 3000000,
            gasPrice: '30000000000'
        })
        console.log('DummyToken deployed at ', newContractInstance.options.address)

        contractDT = new web3.eth.Contract(metadataDT.abi, newContractInstance.options.address)

        // -----------------------
        // DEPLOY Vulnerable Token (Deployer: 1)
        
        contractName = 'Safe_ERC20_Visibility' // Change this for other contract
    
        // Note that the script needs the ABI which is generated from the compilation artifact.
        // Make sure contract is compiled and artifacts are generated
        artifactsPath = `browser/github/damianrusinek/eth-vulns-tutorial/contracts/t1-access-control/ex1-visibility/solution/artifacts/${contractName}.json` // Change this for different path

        let metadataVT = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        contract = new web3.eth.Contract(metadataVT.abi)

        contract = contract.deploy({
            data: metadataVT.data.bytecode.object,
            arguments: ['MyVulnToken', 'MVT']
        })

        newContractInstance = await contract.send({
            from: accounts[1],
            gas: 3000000,
            gasPrice: '30000000000'
        })
        console.log('[Safe] MyVulnerableToken deployed at ', newContractInstance.options.address)

        contractVT = new web3.eth.Contract(metadataVT.abi, newContractInstance.options.address)

        // -----------------------
        // Send some DT to vulnerable Token
        await contractDT.methods.transfer(contractVT.options.address, web3.utils.toWei("1")).send({from: accounts[0]})
        
    } catch (e) {
        console.log(e);
    }
  })()