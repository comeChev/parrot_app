import { RegisterForm } from "@/components/register/Register.form";

export default function RegisterPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>S'enregistrer</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
