import React from "react";

interface DriverInfo {
  abbreviation: string;
  full_name: string;
  team: string;
  team_color: string;
  headshot_url: string | null;
}

interface DriverCheckboxListProps {
  drivers: DriverInfo[];
  selectedDrivers: string[];
  onChange: (selectedDrivers: string[]) => void;
}

const DriverCheckboxList: React.FC<DriverCheckboxListProps> = ({
  drivers,
  selectedDrivers,
  onChange,
}) => {
  const handleDriverToggle = (driverAbbr: string) => {
    if (selectedDrivers.includes(driverAbbr)) {
      onChange(selectedDrivers.filter((d) => d !== driverAbbr));
    } else {
      onChange([...selectedDrivers, driverAbbr]);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Select Drivers</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {drivers.map((driver) => (
          <div
            key={driver.abbreviation}
            className="flex items-center space-x-2 p-2 rounded border border-gray-700 hover:bg-gray-800"
            style={{
              borderLeftColor: "#" + driver.team_color,
              borderLeftWidth: "4px",
            }}
          >
            <input
              type="checkbox"
              id={driver.abbreviation}
              checked={selectedDrivers.includes(driver.abbreviation)}
              onChange={() => handleDriverToggle(driver.abbreviation)}
              className="h-5 w-5 rounded"
            />
            <label
              htmlFor={driver.abbreviation}
              className="flex-1 cursor-pointer"
            >
              <div className="font-medium">{driver.full_name}</div>
              <div className="text-sm text-gray-400">{driver.team}</div>
            </label>
            {driver.headshot_url && (
              <img
                src={driver.headshot_url}
                alt={driver.full_name}
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverCheckboxList;
