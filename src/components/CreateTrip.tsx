// file: src/components/CreateTrip.tsx
import { useState } from "react";

interface Activity {
  time: string;
  name: string;
  location: string;
  description?: string;
}

interface DayPlan {
  date: string;
  activities: Activity[];
}

export interface Trip {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  destinations: string[];
  tags: string[];
  shared_with: string[];
  day_plans: DayPlan[];
  uploadType: "builder";
}

interface Props {
  onCreate: (trip: Trip) => void;
}

export default function CreateTrip({ onCreate }: Props) {
  const [trip, setTrip] = useState<Omit<Trip, "id" | "uploadType">>({
    title: "",
    start_date: "",
    end_date: "",
    destinations: [""],
    tags: [],
    shared_with: [],
    day_plans: [
      {
        date: "",
        activities: [{ time: "", name: "", location: "" }],
      },
    ],
  });

  const handleChange = (field: string, value: any) => {
    setTrip((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newTrip: Trip = {
      ...trip,
      id: Date.now().toString(),
      uploadType: "builder",
    };
    onCreate(newTrip);
    setTrip({
      title: "",
      start_date: "",
      end_date: "",
      destinations: [""],
      tags: [],
      shared_with: [],
      day_plans: [
        {
          date: "",
          activities: [{ time: "", name: "", location: "" }],
        },
      ],
    });
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>🛠 Build a Trip</h2>
      <input
        placeholder="Trip Title"
        value={trip.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="date"
          value={trip.start_date}
          onChange={(e) => handleChange("start_date", e.target.value)}
        />
        <input
          type="date"
          value={trip.end_date}
          onChange={(e) => handleChange("end_date", e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Save Trip</button>
    </div>
  );
}
