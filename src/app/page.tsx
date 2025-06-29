"use client";

import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import LapTimeChart from "../components/LapTimeChart";
import DriverCheckboxList from "../components/DriverCheckboxList";

// Define the DriverInfo type to match the backend
interface DriverInfo {
  abbreviation: string;
  full_name: string;
  team: string;
  team_color: string;
  headshot_url: string | null;
}

interface LapTimeData {
  lap_num: number;
  time: number;
}

export default function Home() {
  const [year, setYear] = useState("");
  const [race, setRace] = useState("");
  const [session, setSession] = useState("");
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);

  const [lapData, setLapData] = useState<Record<string, LapTimeData[]>>({});

  const [years, setYears] = useState<string[]>([]);
  const [races, setRaces] = useState<string[]>([]);
  const [sessions, setSessions] = useState<string[]>([]);
  const [drivers, setDrivers] = useState<DriverInfo[]>([]);

  const API = "https://f1-analytics-backend.onrender.com";
  // const API = "http://localhost:8000"; // Uncomment for local development

  useEffect(() => {
    fetch(`${API}/api/years`)
      .then((res) => res.json())
      .then(setYears);
  }, []);

  useEffect(() => {
    if (year) {
      fetch(`${API}/api/races/${year}`)
        .then((res) => res.json())
        .then(setRaces);
      setRace("");
      setSessions([]);
      setDrivers([]);
    }
  }, [year]);

  useEffect(() => {
    if (year && race) {
      fetch(`${API}/api/sessions/${year}/${encodeURIComponent(race)}`)
        .then((res) => res.json())
        .then(setSessions);
      setSession("");
      setDrivers([]);
    }
  }, [race, year]);

  useEffect(() => {
    if (year && race && session) {
      fetch(`${API}/api/drivers/${year}/${encodeURIComponent(race)}/${session}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Drivers data received:", data);
          setDrivers(data);
        });
      setSelectedDrivers([]);
    }
  }, [session, race, year]);

  useEffect(() => {
    if (selectedDrivers.length > 0 && year && race && session) {
      const driverQuery = selectedDrivers.join(",");

      fetch(
        `${API}/api/laptimes/${year}/${encodeURIComponent(
          race
        )}/${session}?drivers=${driverQuery}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
          }
          return res.json();
        })
        .then((data: Record<string, LapTimeData[]>) => {
          console.log("Lap data received:", data);
          setLapData(data);
        })
        .catch((error) => {
          console.error("Error fetching lap times:", error);
        });
    } else {
      setLapData({});
    }
  }, [selectedDrivers, year, race, session]);

  return (
    <main className="py-12 px-28 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">F1 Lap Time Analyzer</h1>

      <Dropdown label="Year" options={years} value={year} onChange={setYear} />
      <Dropdown label="Race" options={races} value={race} onChange={setRace} />
      <Dropdown
        label="Session"
        options={sessions}
        value={session}
        onChange={setSession}
      />
      {drivers.length > 0 && (
        <DriverCheckboxList
          drivers={drivers}
          selectedDrivers={selectedDrivers}
          onChange={setSelectedDrivers}
        />
      )}

      {Object.keys(lapData).length > 0 && <LapTimeChart data={lapData} />}
    </main>
  );
}
