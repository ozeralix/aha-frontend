import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const HealthForm = () => {
  const [formData, setFormData] = React.useState({
    steps: "",
    age: "",
    sleepHours: "",
    heartRate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Handle form submission logic
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Health Tracking</CardTitle>
        <CardDescription>Enter your daily health stats below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="steps">Steps Taken</Label>
            <Input id="steps" name="steps" type="number" value={formData.steps} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="sleepHours">Sleep Hours</Label>
            <Input id="sleepHours" name="sleepHours" type="number" step="0.1" value={formData.sleepHours} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
            <Input id="heartRate" name="heartRate" type="number" value={formData.heartRate} onChange={handleChange} required />
          </div>
          <CardFooter className="justify-end">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthForm;
