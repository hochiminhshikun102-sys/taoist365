import { lowSignalCommerceRuntimeLine } from "./low-signal-commerce-runtime";
import { ambientCommerceGovernanceLine } from "./ambient-commerce-governance";
import { antiConversionPressureLine } from "./anti-conversion-pressure";
import { fulfillmentBackgroundRuntimeLine } from "./fulfillment-background-runtime";
import { objectCommerceRestraintLine } from "./object-commerce-restraint";
import { quietTransactionGovernanceLine } from "./quiet-transaction-governance";
import { nonProductCommerceLine } from "./non-product-commerce";
import { ambientFulfillmentEquilibriumLine } from "./ambient-fulfillment-equilibrium";
import { passiveCommercePresenceLine } from "./passive-commerce-presence";

export type AiNativeCommerceBundle = {
  lowSignalCommerceRuntimeLine: string;
  ambientCommerceGovernanceLine: string;
  antiConversionPressureLine: string;
  fulfillmentBackgroundRuntimeLine: string;
  objectCommerceRestraintLine: string;
  quietTransactionGovernanceLine: string;
  nonProductCommerceLine: string;
  ambientFulfillmentEquilibriumLine: string;
  passiveCommercePresenceLine: string;
};

export function resolveAiNativeCommerceBundle(): AiNativeCommerceBundle {
  return {
    lowSignalCommerceRuntimeLine: lowSignalCommerceRuntimeLine(),
    ambientCommerceGovernanceLine: ambientCommerceGovernanceLine(),
    antiConversionPressureLine: antiConversionPressureLine(),
    fulfillmentBackgroundRuntimeLine: fulfillmentBackgroundRuntimeLine(),
    objectCommerceRestraintLine: objectCommerceRestraintLine(),
    quietTransactionGovernanceLine: quietTransactionGovernanceLine(),
    nonProductCommerceLine: nonProductCommerceLine(),
    ambientFulfillmentEquilibriumLine: ambientFulfillmentEquilibriumLine(),
    passiveCommercePresenceLine: passiveCommercePresenceLine(),
  };
}
