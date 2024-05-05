import axios from "axios";

interface User {
  id: number;
  gender: string;
  age: number;
  hair: {
    color: string;
  };
  company: {
    department: string;
  };
  firstName: string;
  lastName: string;
  address: {
    postalCode: string;
  };
}

interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
}

export async function fetchUsers() {
  const response = await axios.get<{ users: User[] }>(
    "https://dummyjson.com/users"
  );
  return response.data.users;
}

export function groupByDepartment(
  users: User[]
): Record<string, DepartmentSummary> {
  return users.reduce((acc, user) => {
    const department = user.company.department;
    const fullName = user.firstName + user.lastName;
    if (!acc[department]) {
      acc[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      };
    }
    const dept = acc[department];
    dept[user.gender === "male" ? "male" : "female"]++;
    dept.hair[user.hair.color] = (dept.hair[user.hair.color] || 0) + 1;
    dept.addressUser[fullName] = user.address.postalCode;

    // Update age range logic
    const age = user.age;
    const ageRange = dept.ageRange.split("-").map(Number);
    if (!dept.ageRange || age < ageRange[0]) ageRange[0] = age;
    if (!dept.ageRange || age > ageRange[1]) ageRange[1] = age;
    dept.ageRange = `${ageRange[0]}-${ageRange[1]}`;

    return acc;
  }, {} as Record<string, DepartmentSummary>);
}
