import { Button } from "@/components/ui/Button";

export default function ComponentsPage() {
  return (
    <div className="container mx-auto bg-white">
      <h2>Buttons</h2>
      <Button variant="primary" className="mr-2">
        CONTACT US
      </Button>
      <Button variant="secondary" className="mr-2">
        Secondary
      </Button>
    </div>
  );
}
