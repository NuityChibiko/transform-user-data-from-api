import React, { useEffect, useState } from "react";
import { fetchUsers, groupByDepartment } from "./services/userService";

interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
}

const App: React.FC = () => {
  const [departmentData, setDepartmentData] = useState<
    Record<string, DepartmentSummary>
  >({});

  useEffect(() => {
    const getData = async () => {
      const users = await fetchUsers();
      const groupedData = groupByDepartment(users);
      setDepartmentData(groupedData);
    };
    getData();
  }, []);

  return (
    <div className="tw-p-4 tw-max-w-4xl tw-mx-auto">
      <h1 className="tw-text-2xl tw-text-center tw-font-bold tw-mb-5">
        Department Data Summary
      </h1>
      <div>
        {Object.entries(departmentData).map(([department, summary]) => (
          <div key={department} className="tw-mb-4 tw-p-4 tw-shadow tw-rounded">
            <h2 className="tw-font-semibold tw-text-xl">{department}</h2>
            <p>Male: {summary.male}</p>
            <p>Female: {summary.female}</p>
            <p>Age Range: {summary.ageRange}</p>
            <div>
              <h3 className="tw-font-semibold">Hair Colors:</h3>
              {Object.entries(summary.hair).map(([color, count]) => (
                <p key={color}>
                  {color}: {count}
                </p>
              ))}
            </div>
            <div>
              <h3 className="tw-font-semibold">User Addresses:</h3>
              {Object.entries(summary.addressUser).map(([name, postalCode]) => (
                <p key={name}>
                  {name}: {postalCode}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
