import { groupByDepartment, fetchUsers } from "../services/userService";

describe("User Service", () => {
  it("groups users by department", async () => {
    const users = await fetchUsers();
    const grouped = groupByDepartment(users);
    expect(Object.keys(grouped).length).toBeGreaterThan(0);
    expect(grouped["Marketing"]).toBeDefined();
    // Add more specific tests
  });
});
