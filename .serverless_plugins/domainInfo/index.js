class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.commands = {
      domainInfo: {
        usage: 'Fetches and prints out the deployed CloudFront domain names',
        lifecycleEvents: ['domainInfo']
      }
    };

    this.hooks = {
      'domainInfo:domainInfo': this.domainInfo.bind(this)
    };
  }

  domainInfo() {
    const provider = this.serverless.getProvider('aws');
    const stackName = provider.naming.getStackName(this.options.stage);
    return provider
      .request(
        'CloudFormation',
        'describeStacks',
        { StackName: stackName },
        this.options.stage,
        this.options.region
      )
      .then((result) => {
        const outputs = result.Stacks[0].Outputs;
        const output = outputs.find(entry => entry.OutputKey === 'WebAppCloudFrontDistributionOutput');
        if (output.OutputValue) {
          this.serverless.cli.log(`Web App Domain: ${output.OutputValue}`);
        } else {
          this.serverless.cli.log('Web App Domain: Not Found');
        }
      });
  }
}

module.exports = ServerlessPlugin;
