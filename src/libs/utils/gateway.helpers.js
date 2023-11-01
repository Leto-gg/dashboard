const validGatewayNamePattern = /^[a-z0-9-]+$/;

export function validateGatewayName(gatewayName) {
  return validGatewayNamePattern.test(gatewayName);
}
