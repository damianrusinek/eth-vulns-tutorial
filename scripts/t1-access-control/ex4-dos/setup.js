// Right click on the script name and hit "Run" to execute
(async () => {
    try {
        console.log('Running setup script...')

        let contract;
        let artifactsPath;
        let contractName;

        let contractDT;
        let contractImpl;
        let contractProxy;

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
        // DEPLOY Proxy Implementation (Deployer: 0)
        
        contractName = 'MyDestructibleProxyWalletImplementation' // Change this for other contract
    
        // Note that the script needs the ABI which is generated from the compilation artifact.
        // Make sure contract is compiled and artifacts are generated
        artifactsPath = `browser/github/damianrusinek/eth-vulns-tutorial/contracts/t1-access-control/ex4-dos/artifacts/${contractName}.json` // Change this for different path

        let metadataImpl = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        contract = new web3.eth.Contract(metadataImpl.abi)

        contract = contract.deploy({
            data: metadataImpl.data.bytecode.object,
            arguments: [contractDT.options.address]
        })

        newContractInstance = await contract.send({
            from: accounts[0],
            gas: 3000000,
            gasPrice: '30000000000'
        })
        console.log('MyDestructibleProxyWalletImplementation deployed at ', newContractInstance.options.address)

        contractImpl = new web3.eth.Contract(metadataImpl.abi, newContractInstance.options.address)

        // -----------------------
        // DEPLOY Proxy Wallet (Deployer: 1)
        
        contractName = 'MyDestructibleProxyWallet' // Change this for other contract
    
        // Note that the script needs the ABI which is generated from the compilation artifact.
        // Make sure contract is compiled and artifacts are generated
        artifactsPath = `browser/github/damianrusinek/eth-vulns-tutorial/contracts/t1-access-control/ex4-dos/artifacts/${contractName}.json` // Change this for different path

        let metadataWallet = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        contract = new web3.eth.Contract(metadataWallet.abi)

        contract = contract.deploy({
            data: metadataWallet.data.bytecode.object,
            arguments: [contractImpl.options.address]
        })

        newContractInstance = await contract.send({
            from: accounts[1],
            gas: 3000000,
            gasPrice: '30000000000'
        })
        console.log('MyDestructibleProxyWallet deployed at ', newContractInstance.options.address)


        // -------->>> We use implementation's metadata - not proxy's.
        contractProxy = new web3.eth.Contract(metadataImpl.abi, newContractInstance.options.address)

        await contractProxy.methods.initialize(contractDT.options.address).send({from: accounts[1]})

        // -----------------------
        // Send some DT to wallet

        await contractDT.methods.transfer(contractProxy.options.address, web3.utils.toWei("1")).send({from: accounts[0]})
        
    } catch (e) {
        console.log(e);
    }
  })()