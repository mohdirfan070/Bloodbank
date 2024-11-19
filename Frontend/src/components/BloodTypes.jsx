import React from 'react';

const BloodTypes = () => {
  const bloodCompatibility = [
    { type: 'O-', canDonateTo: 'All blood types' },
    { type: 'O+', canDonateTo: 'O+, A+, B+, AB+' },
    { type: 'A-', canDonateTo: 'A-, A+, AB-, AB+' },
    { type: 'A+', canDonateTo: 'A+, AB+' },
    { type: 'B-', canDonateTo: 'B-, B+, AB-, AB+' },
    { type: 'B+', canDonateTo: 'B+, AB+' },
    { type: 'AB-', canDonateTo: 'AB-, AB+' },
    { type: 'AB+', canDonateTo: 'AB+' }
  ];

  return (
    <div className="bg-white p-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">Types of Blood and Donation Compatibility</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Blood Type</th>
            <th className="px-4 py-2">Can Donate To</th>
          </tr>
        </thead>
        <tbody>
          {bloodCompatibility.map((entry, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{entry.type}</td>
              <td className="border px-4 py-2">{entry.canDonateTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodTypes;
