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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {drivers.map((driver) => {
          const isSelected = selectedDrivers.includes(driver.abbreviation);
          return (
            <div key={driver.abbreviation}>
              <input
                type="checkbox"
                id={driver.abbreviation}
                checked={isSelected}
                onChange={() => handleDriverToggle(driver.abbreviation)}
                className="h-5 w-5 rounded hidden"
              />
              <label
                htmlFor={driver.abbreviation}
                className="flex-1 cursor-pointer text-center"
              >
                <div
                  className={`flex flex-col items-center justify-center py-4 rounded-[40px] transition-all duration-200 hover:bg-accent border relative`}
                  style={{
                    backdropFilter: isSelected ? "blur(2px)" : "none",
                    boxShadow: isSelected
                      ? `0 0 80px 1px ${driver.team_color}66 inset`
                      : "none",
                    border: !isSelected
                      ? `2px dotted ${driver.team_color}33`
                      : "2px solid transparent",
                  }}
                >
                  {driver.headshot_url && (
                    <img
                      src={driver.headshot_url}
                      alt={driver.full_name}
                      className="h-20 w-20 rounded-full object-cover mx-auto mt-2"
                    />
                  )}
                  <div className="font-medium">{driver.full_name}</div>
                  <div className="text-sm text-gray-400">{driver.team}</div>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriverCheckboxList;
