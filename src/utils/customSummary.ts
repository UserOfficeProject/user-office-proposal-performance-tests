type Metric = Record<string, Record<string, object | string> | string>;

export type SummaryData = Record<string, Record<string, Metric>>;
function cleanKeyText(text: string): string {
  return text
    .replace(/(?<=\S)\s(?=\S)|(?<=\S)[{}:](?=\S)/g, '_')
    .replace(/[ {}:]/g, '')
    .trim();
}
function getKeyValue(prefix: string, values: Record<string, object>): string {
  const result: string[] = [];
  if (typeof values === 'object' && values !== null) {
    for (const valueKey in values) {
      result.push(`${prefix}_${cleanKeyText(valueKey)}=${values[valueKey]}`);
    }
  }

  return result.join(' ');
}
export function generateTextSummary(summaryData: SummaryData) {
  const lines: string[] = [];
  const timestamp = new Date();
  const metrics = summaryData['metrics'];
  const state = summaryData['state'];
  for (const key in metrics) {
    const metric = metrics[key];
    const metricValues: string[] = [
      `timestamp=${timestamp.toISOString()} metric=summary_${cleanKeyText(key)}`,
    ];
    if (typeof metric === 'object' && metric !== null) {
      for (const innerMetricKey in metric) {
        const innerMetric = metric[innerMetricKey];
        if (typeof innerMetric === 'object' && innerMetric !== null) {
          for (const innerDeepKey in innerMetric) {
            if (
              typeof innerMetric[innerDeepKey] === 'object' &&
              innerMetric[innerDeepKey] !== null
            ) {
              metricValues.push(
                getKeyValue(
                  cleanKeyText(innerDeepKey),
                  innerMetric[innerDeepKey] as Record<string, Metric>
                )
              );
            } else {
              metricValues.push(
                `${cleanKeyText(innerDeepKey)}=${innerMetric[innerDeepKey]}`
              );
            }
          }
        } else {
          metricValues.push(`${cleanKeyText(innerMetricKey)}=${innerMetric}`);
        }
      }
    }
    lines.push(metricValues.join(' '));
  }
  if (typeof state === 'object' && state !== null) {
    const testRunDurationMs = state['testRunDurationMs'];
    lines.push(
      `timestamp=${timestamp.toISOString()} metric=summary_test_run_duration value=${testRunDurationMs}`
    );
  }

  return lines.join('\n');
}
