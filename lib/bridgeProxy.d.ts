export interface BridgeProxyResult {
  handled: boolean;
  status?: number;
  data?: any;
}

export function forwardToBridge(req: any, targetPath: string): Promise<BridgeProxyResult>;
