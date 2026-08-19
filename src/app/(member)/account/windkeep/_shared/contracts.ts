export const windKeepRoutes = {
  overview: "/account/windkeep",
  objects: "/account/windkeep/objects",
  objectNew: "/account/windkeep/objects/new",
  objectDetail: (objectId: string) => `/account/windkeep/objects/${objectId}`,
  objectEdit: (objectId: string) => `/account/windkeep/objects/${objectId}/edit`,
  requests: "/account/windkeep/requests",
  transfers: "/account/windkeep/transfers",
  transferDetail: (transferId: string) => `/account/windkeep/transfers/${transferId}`,
  deposits: "/account/windkeep/deposits",
  disputes: "/account/windkeep/disputes",
  disputeDetail: (disputeId: string) => `/account/windkeep/disputes/${disputeId}`,
} as const;

export const windKeepRelatedRoutes = {
  policies: "/account/policies",
  support: "/account/support",
  journal: "/account/journal",
  billing: "/account/billing",
} as const;

export const windKeepReadiness = {
  overview: true,
  objects: true,
  objectNew: false,
  objectDetail: false,
  objectEdit: false,
  requests: false,
  transfers: false,
  transferDetail: false,
  deposits: false,
  disputes: false,
  disputeDetail: false,
} as const;

export const windKeepRelatedReadiness = {
  policies: false,
  support: false,
  journal: true,
  billing: false,
} as const;

export const windKeepPolicyBindings = {
  participation: {
    policyKey: "windkeep_participation_rules",
    policyVersion: "NOT_AVAILABLE",
    effectiveDate: "NOT_AVAILABLE",
    requiresReacceptance: true,
  },
  objectSubmission: {
    policyKey: "windkeep_object_submission_rules",
    policyVersion: "NOT_AVAILABLE",
    effectiveDate: "NOT_AVAILABLE",
    requiresReacceptance: true,
  },
  privacy: {
    policyKey: "windkeep_privacy_and_contact_rules",
    policyVersion: "NOT_AVAILABLE",
    effectiveDate: "NOT_AVAILABLE",
    requiresReacceptance: false,
  },
} as const;

export const windKeepCapability = {
  dataSource: "fixture_until_api_ready",
  objectListApi: "NOT_AVAILABLE",
  objectMutationApi: "NOT_AVAILABLE",
  permissionApi: "NOT_AVAILABLE",
  policyApi: "NOT_AVAILABLE",
  consentApi: "NOT_AVAILABLE",
  oaReviewWorkspace: "RESERVED:OA/WK/ObjectReview",
  auditEventContract: "READY",
  fakeSuccessForbidden: true,
} as const;

export type WindKeepObjectStatus =
  | "Draft"
  | "Under Review"
  | "Published"
  | "In Transfer"
  | "Archived";

export type WindKeepObject = {
  id: string;
  title: string;
  image: string;
  source: "DOHARA Curated" | "User Submitted";
  relation: "Owner" | "Submitter" | "Receiver" | "Requester" | "Saved" | "Participant";
  status: WindKeepObjectStatus;
  path: "Swap Objects" | "Open Offers" | "Auction Intent";
  story: "Draft" | "Complete";
  visibility: "Private" | "Public";
  country: string;
  review: "Not Submitted" | "Pending" | "Approved" | "Changes Requested";
  journalNotes: number;
  nextAction: string;
};
