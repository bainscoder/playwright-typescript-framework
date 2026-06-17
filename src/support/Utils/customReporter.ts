import fs from 'fs';
import path from 'path';

import type {
  FullResult,
  Reporter,
  Suite,
  TestCase
} from '@playwright/test/reporter';

import {
  saveExecutionHistory,
  compareExecution
} from './executionHistory';

import {
  generateDashboard
} from './generateReportDashboard';

class CustomReporter implements Reporter {

  private rootSuite!: Suite;

  onBegin(
    config: any,
    suite: Suite
  ) {
    this.rootSuite = suite;
  }

  onEnd(
    result: FullResult
  ) {

    let passed = 0;
    let failed = 0;
    let skipped = 0;

    const allTests =
      this.rootSuite.allTests();

    allTests.forEach(
      (test: TestCase) => {

        const finalResult =
          test.results[
            test.results.length - 1
          ];

        switch (
          finalResult?.status
        ) {

          case 'passed':
            passed++;
            break;

          case 'failed':
            failed++;
            break;

          case 'skipped':
            skipped++;
            break;
        }
      }
    );

    const currentRun = {

      runDate:
        new Date().toISOString(),

      projectName:
        'AI_TEST_CASE_GENERATOR',

      passed,

      failed,

      skipped,

      duration:
        `${(
          result.duration / 1000
        ).toFixed(2)}s`
    };

    const comparison =
      compareExecution(
        currentRun
      );

    saveExecutionHistory(
      currentRun
    );

    const reportData = {

      projectName:
        currentRun.projectName,

      currentRun,

      previousRun:
        comparison?.previous ||
        null,

      comparison
    };

    const reportPath =
      path.join(
        process.cwd(),
        'execution-data',
        'comparison-data.json'
      );

    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        reportData,
        null,
        2
      )
    );

    generateDashboard();

    console.log(
      '\n===== Dashboard Summary ====='
    );

    console.log(
      `Total: ${
        passed +
        failed +
        skipped
      }`
    );

    console.log(
      `Passed: ${passed}`
    );

    console.log(
      `Failed: ${failed}`
    );

    console.log(
      `Skipped: ${skipped}`
    );

    console.log(
      'Execution dashboard generated'
    );
  }
}

export default CustomReporter;