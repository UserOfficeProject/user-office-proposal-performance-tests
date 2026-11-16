export type Role = {
    roleId: number;
    roleName: string;
  };
  export const roles: Record<string, Role> = {
    fapChair: { roleId: 50, roleName: "FAP Chair" },
    fapSecretary: { roleId: 51, roleName: "FAP Secretary" },
    fapMember: { roleId: 52, roleName: "FAP Member" }, //FAP Member is FAP Reviewer in the API
    internalReviewer: { roleId: 53, roleName: "Internal Reviewer" },
  };