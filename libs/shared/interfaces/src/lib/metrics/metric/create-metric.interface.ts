export interface ICreateMetric {
  name: string;
  type: 'leading' | 'lagging' | 'calculated';
}
