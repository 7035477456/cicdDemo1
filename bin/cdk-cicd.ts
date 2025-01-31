#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCicdStack1 } from '../lib/cdk-cicd-stack';

const app = new cdk.App();
new CdkCicdStack1(app, 'CdkCicdStack1', {  //when 'cdk destroy' system use this name 'CdkCicdStack'
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
      }
});

app.synth();