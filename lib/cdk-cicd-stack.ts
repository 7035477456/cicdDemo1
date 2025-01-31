import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStage';

export class CdkCicdStack1 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'AndrewTonDemo1TranslationPipeline', {
      pipelineName: 'AndrewTonDemo1TranslationPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('7035477456/mycicd', 'branch1'),
        commands: [
          'cd cdk-cicd',
          'npm ci',
          'npm install -g aws-cdk@2.138.0',  // Add this line
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'cdk-cicd/cdk.out'
      })
    });

    const testStage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage', {
      stageName: 'test'
    }));

    testStage.addPre(new CodeBuildStep('unit-tests', {
      commands: [
        'cd cdk-cicd',
        'npm ci',
        'npm test'
      ]
    }))

  }
}
