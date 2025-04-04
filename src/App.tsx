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

interface Trip {
  id: string;
  user_id: string;
  title: string;
  start_date: string;
  end_date: string;
  destinations: string[];
  tags: string[];
  shared_with: string[];
  day_plans: DayPlan[];
}

export default function App() {
  const [trip, setTrip] = useState<Partial<Trip>>({
    title: "",
    start_date: "",
    end_date: "",
    destinations: [""],
    user_id: "user-123",
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

  const handleDayPlanChange = (index: number, field: string, value: any) => {
    const newPlans = [...(trip.day_plans || [])];
    newPlans[index][field] = value;
    setTrip((prev) => ({ ...prev, day_plans: newPlans }));
  };

  const handleActivityChange = (dayIndex: number, actIndex: number, field: string, value: any) => {
    const newPlans = [...(trip.day_plans || [])];
    newPlans[dayIndex].activities[actIndex][field] = value;
    setTrip((prev) => ({ ...prev, day_plans: newPlans }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://travelr-backend.onrender.com/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trip),
      });
      const data = await res.json();
      console.log("Trip saved:", data);
      alert("Trip submitted successfully!");
    } catch (error) {
      console.error("Error submitting trip:", error);
      alert("Failed to submit trip.");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Create a New Trip</h1>

      <input
        placeholder="Trip Title"
        value={trip.title}
        onChange={(e) => handleChange("title", e.target.value)}
        style={{ width: '100%', marginBottom: 8, padding: 8 }}
      />

      <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
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

      {(trip.day_plans || []).map((day, i) => (
        <div key={i} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 8 }}>
          <input
            type="date"
            value={day.date}
            onChange={(e) => handleDayPlanChange(i, "date", e.target.value)}
          />
          {day.activities.map((act, j) => (
            <div key={j} style={{ display: 'flex', gap: 10, marginTop: 5 }}>
              <input
                placeholder="Time"
                value={act.time}
                onChange={(e) => handleActivityChange(i, j, "time", e.target.value)}
              />
              <input
                placeholder="Name"
                value={act.name}
                onChange={(e) => handleActivityChange(i, j, "name", e.target.value)}
              />
              <input
                placeholder="Location"
                value={act.location}
                onChange={(e) => handleActivityChange(i, j, "location", e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit} style={{ marginTop: 10, padding: 8 }}>Submit Trip</button>
    </div>
  );
}
