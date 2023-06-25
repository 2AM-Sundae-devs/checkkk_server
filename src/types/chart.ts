export interface IPlatformConversionStats {
  id: number;
  platform: string;
  appliedCount: number;
  responseCount: number;
  responseRate: string;
}

export interface IApplicationStats {
  countOf: string;
  count: number;
}
