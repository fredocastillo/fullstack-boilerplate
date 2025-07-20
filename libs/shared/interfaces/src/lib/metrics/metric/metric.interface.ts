export interface IMetric {
  id: number;
  name: string;
  type: 'leading' | 'lagging' | 'calculated';
}
